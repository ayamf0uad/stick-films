// Transport: the loop, the scrubber, seeking, and the WebM recorder.

// ─── loop + controls ────────────────────────────────────────────────
let t=0, playing=true, last=performance.now();
const tag=document.getElementById("tag"), scrub=document.getElementById("scrub");
function loop(now){
  const dt=(now-last)/1000; last=now;
  if(playing){t+=dt; const st=frame(t); tag.textContent=st.label;
    scrub.value=Math.round(st.t/TOTAL*1000);}
  requestAnimationFrame(loop);
}
Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,2500))])
  .then(()=>requestAnimationFrame(loop));
// deterministic seek — t and playing are lexical, a harness cannot reach them
window.__seek=(tt)=>{playing=false;t=tt;const st=frame(t);tag.textContent=st.label;
  scrub.value=Math.round(st.t/TOTAL*1000);return st.label};
window.__TOTAL=TOTAL;

document.getElementById("play").onclick=e=>{playing=!playing;
  e.target.textContent=playing?"Pause":"Play"; e.target.classList.toggle("on",playing)};
document.getElementById("back").onclick=()=>{t=0};

document.getElementById("mute").onclick=e=>{vid.muted=!vid.muted;
  e.target.textContent=vid.muted?"Unmute clip":"Mute clip";
  e.target.classList.toggle("on",!vid.muted)};
// rAF stops when the tab hides, so nothing would pause the clip and it would
// keep playing from a tab you cannot see. That exact bug has bitten before.
document.addEventListener("visibilitychange",()=>{ if(document.hidden){
  playing=false; vid.pause(); if(bedGain) bedGain.gain.value=0;
  const b=document.getElementById("play"); b.textContent="Play"; b.classList.remove("on") } });
window.addEventListener("pagehide",()=>{vid.pause(); bedStop()});
scrub.oninput=e=>{t=e.target.value/1000*TOTAL; const st=frame(t); tag.textContent=st.label};

let recorder=null;
document.getElementById("rec").onclick=e=>{
  if(recorder){recorder.stop();return}
  const chunks=[], stream=cv.captureStream(60);
  const md=audioGraph();
  if(md){ if(ac.state==="suspended") ac.resume();
          md.stream.getAudioTracks().forEach(tr=>stream.addTrack(tr)) }
  const mime=md&&MediaRecorder.isTypeSupported("video/webm;codecs=vp9,opus")
    ? "video/webm;codecs=vp9,opus" : "video/webm;codecs=vp9";
  recorder=new MediaRecorder(stream,{mimeType:mime,videoBitsPerSecond:8e6,
                                     audioBitsPerSecond:128e3});
  recorder.ondataavailable=ev=>chunks.push(ev.data);
  recorder.onstop=()=>{
    const url=URL.createObjectURL(new Blob(chunks,{type:"video/webm"}));
    const a=document.createElement("a"); a.href=url;
    a.download="story.webm"; a.click();
    recorder=null; e.target.textContent="Record WebM"; e.target.classList.remove("on")};
  t=0; playing=true; vid.muted=false;
  document.getElementById("play").textContent="Pause";
  document.getElementById("play").classList.add("on");
  recorder.start(); e.target.textContent="Stop + save"; e.target.classList.add("on");
  setTimeout(()=>{if(recorder)recorder.stop()}, TOTAL*1000+150);
};
