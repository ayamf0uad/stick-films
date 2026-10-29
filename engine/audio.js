// The music bed and the recording graph.
// Expects the film to provide: vid (the clip element, or null),
// AT/TOTAL, and BED_CURVE naming the beats the level curve turns on.

// ─── candidate music beds ───────────────────────────────────────────
// Each file is a seamless loop, pre-levelled to about -24 LUFS. It follows the
// film's own clock rather than free-running, so a scrub lands the music where
// the picture is instead of wherever playback happened to reach.
// whichever beds the film shipped — the engine does not know their names
const MUS={}, MUSKEYS=[...document.querySelectorAll('audio[id^="mus-"]')]
  .map(el => el.id.slice(4));
// Three knobs, because describing a music bed in words is hopeless and turning
// it while watching is not: how loud it sits, how far it drops under the lessons,
// and what it does while the clip is playing.
const mvol=document.getElementById("mvol"), mlow=document.getElementById("mlow"),
      mclip=document.getElementById("mclip");
// "muffled" is the one that reads as a single soundtrack: the bed keeps playing
// underneath but is dropped AND low-passed, so it sounds like it stepped behind
// a wall rather than stopping and starting again.
let ac=null, mixDest=null, acFailed=false, lastClip=0;
const CLIPMODE=[["muffled",0.16,1],["silent",0,0],["quiet",0.10,0],
                ["half",0.35,0],["full",1,0]];
let clipIdx=0;
mclip.onclick=()=>{ clipIdx=(clipIdx+1)%CLIPMODE.length;
  mclip.textContent=CLIPMODE[clipIdx][0];
  mclip.classList.toggle("on",clipIdx===0) };
function bedLevel(time){
  const cl=(x)=>Math.max(0,Math.min(1,x));
  const BED=mvol.value/100, LOW=mlow.value/100;
  const BACK=AT["memeup"]+2.4;
  // section level: full through the opening, down for the lessons, full again
  // once the clip is behind us
  let base=BED+(LOW-BED)*cl((time-AT["l1head"])/1.4);
  base=base+(BED-base)*cl((time-BACK)/1.8);
  // and the clip window scales whatever that section level is
  const inClip=cl((time-AT["tomeme"])/1.30)*(1-cl((time-BACK)/1.4));
  const edge=Math.min(cl((time-0.2)/1.6),1-cl((time-(TOTAL-2.6))/2.2));
  lastClip=inClip;
  return Math.max(0,Math.min(1,base*(1-inClip*(1-CLIPMODE[clipIdx][1]))*edge));
}
function syncMusic(time){
  if(!musKey){ mustag.textContent="no bed"; if(bedGain) bedGain.gain.value=0; return }
  const lv=bedLevel(time);
  if(bedGain) bedGain.gain.value = playing ? lv : 0;
  mustag.textContent=musKey+"  bed "+mvol.value+"  less "+mlow.value
                    +"  clip "+CLIPMODE[clipIdx][0]+"  now "+lv.toFixed(2);
  // the low-pass is what stops the step-down sounding like a different track
  if(bedFilt) bedFilt.frequency.value =
    CLIPMODE[clipIdx][2] ? 20000*Math.pow(340/20000,lastClip) : 20000;
}
const mustag=document.getElementById("mustag");
let musKey=(document.querySelector(".mus.on")||{dataset:{}}).dataset.m || "";
document.querySelectorAll(".mus").forEach(b=>b.onclick=()=>{
  document.querySelectorAll(".mus").forEach(x=>x.classList.toggle("on",x===b));
  musKey=b.dataset.m;
  if(musKey) bedStart(musKey); else { bedStop(); bedGain=null; bedFilt=null }
});
// any first interaction is enough to give the sound back
const unblock=()=>{ vid.muted=false;
  // the first gesture is what lets an AudioContext start, so the tone control
  // for the bed is built here rather than waiting for a recording
  bedStart(musKey);
  const b=document.getElementById("mute");
  b.textContent="Mute clip"; b.classList.add("on");
  removeEventListener("pointerdown",unblock); removeEventListener("keydown",unblock) };
// The canvas stream is picture only, so a recording came out silent. The clip and
// every bed are routed through ONE Web Audio graph that feeds both the speakers
// and a stream destination, so the file carries exactly what was heard. Built on
// the Record click, which is itself the user gesture the AudioContext needs.
function audioGraph(){
  if(mixDest||acFailed) return mixDest;
  try{
    ac=new (window.AudioContext||window.webkitAudioContext)();
    mixDest=ac.createMediaStreamDestination();
    const src=ac.createMediaElementSource(vid);
    src.connect(ac.destination); src.connect(mixDest);
  }catch(err){ ac=null; mixDest=null; acFailed=true }  // picture-only, as before
  return mixDest;
}
// the <audio> elements are only carriers for the data now; nothing plays them
const bedBuf={};
let bedSrc=null, bedGain=null, bedFilt=null, bedBusy=false;
function bedStop(){
  if(bedSrc){ try{bedSrc.stop()}catch(e){} bedSrc.disconnect(); bedSrc=null }
}
async function bedStart(key){
  if(bedBusy||!key) return; bedBusy=true;
  try{
    audioGraph(); if(!ac) return;
    if(ac.state==="suspended") await ac.resume();
    if(!bedBuf[key]){
      const r=await fetch(MUS[key].src);
      bedBuf[key]=await ac.decodeAudioData(await r.arrayBuffer());
    }
    const buf=bedBuf[key];
    // MP3 decoding leaves the encoder's padding as silence at both ends. Looping
    // over it is exactly the gap you can hear, so the loop points are set to the
    // first and last samples that actually carry signal.
    const d=buf.getChannelData(0), sr=buf.sampleRate;
    let a=0; while(a<d.length && Math.abs(d[a])<2e-4) a++;
    let z=d.length-1; while(z>a && Math.abs(d[z])<2e-4) z--;
    bedStop();
    bedGain=ac.createGain(); bedGain.gain.value=0;
    bedFilt=ac.createBiquadFilter();
    bedFilt.type="lowpass"; bedFilt.frequency.value=20000;
    bedSrc=ac.createBufferSource();
    bedSrc.buffer=buf; bedSrc.loop=true;
    bedSrc.loopStart=a/sr; bedSrc.loopEnd=(z+1)/sr;
    bedSrc.connect(bedFilt); bedFilt.connect(bedGain);
    bedGain.connect(ac.destination); bedGain.connect(mixDest);
    bedSrc.start(0,bedSrc.loopStart);
  }catch(err){ bedStop() }
  finally{ bedBusy=false }
}
