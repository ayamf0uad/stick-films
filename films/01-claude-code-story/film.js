// The Claude Code story, 4:10. Beats, copy and scenes only —
// everything reusable lives in engine/.

// ─── extra poses this scene needs ───────────────────────────────────
POSES["wave-a"]  = P({ar1:112,ar2:146,al1:-24,al2:-30,h:-3});
POSES["wave-b"]  = P({ar1:118,ar2:178,al1:-24,al2:-30,h:-4});
POSES["settle"]  = P({al1:-26,al2:-34,ar1:26,ar2:34});
POSES["sit"]     = P({f:0,t:-5,dy:24,ll1:88,ll2:2,lr1:93,lr2:-3,
                      ar1:46,ar2:4,al1:38,al2:-2,h:2});
POSES["beckon"]  = P({f:.35,t:4,ar1:104,ar2:150,al1:-22,al2:-28,h:6,
                      ll1:-6,ll2:-4,lr1:12,lr2:7});
// a straight point the way she is about to walk. Front-facing, so it reads as an
// instruction to the room; the turn to profile then happens as she sets off.
POSES["point-go"] = P({t:5,h:5,ar1:94,ar2:99,al1:-22,al2:-28,
                       ll1:-7,ll2:-5,lr1:11,lr2:7});

// ─── scene 2: seated at the desk ────────────────────────────────────
// The hand-* poses in the rig are STANDING. Seated versions reuse the sit
// pose's legs and root drop and swap only the arms, so the two beats cut
// together without the hips jumping.
const SEATED = {f:0, dy:24, ll1:88, ll2:2, lr1:93, lr2:-3};
POSES["sit-slump"] = P({...SEATED, t:17, h:-24, dy:27, ar1:50, ar2:20, al1:44, al2:12});
POSES["sit-up"]    = P({...SEATED, t:-3,  h:3,   ar1:46, ar2:4,  al1:38, al2:-2});
POSES["sit-desk"]  = P({...SEATED, t:7,   h:-2,  ar1:64, ar2:86, al1:44, al2:58});
POSES["sit-cheek"] = P({...SEATED, t:4,   h:-7,  ar1:118,ar2:176,al1:40, al2:2});
POSES["sit-idea"]  = P({...SEATED, t:-7,  h:-9,  ar1:134,ar2:154,al1:36, al2:-4, dy:21});
// the hand travels cheek -> chin/mouth -> back while she thinks. Both reach:
// elbow up (not on the desk) puts the hand 62-65 above the hip, which is where
// her face is. sit-open is the one beat the hand leaves her face entirely, and
// it clears the desk top by 16 units so the gesture stays visible.
POSES["sit-mouth"] = P({...SEATED, t: 9, h:-13, ar1: 88, ar2:140, al1:40, al2: 2});
POSES["sit-open"]  = P({...SEATED, t:-3, h:  3, ar1: 86, ar2:118, al1:40, al2: 2});
// The laptop occupies everything forward of her, so a gesture aimed that way
// disappears behind it. These go UP instead: one on the desk side, one on the
// open side, which is also the only way to make two seated gestures look
// different at all — at f:0 the shoulders stack, so an al lift and an ar lift
// with the same angles draw the identical polyline.
POSES["sit-hands"] = P({...SEATED, t: 8, h: -3, ar1: 42, ar2:150, al1: 54, al2:136});
POSES["sit-lift-a"]= P({...SEATED, t:-4, h:  6, ar1:126, ar2:146, al1: 38, al2: -2});
POSES["sit-lift-b"]= P({...SEATED, t: 3, h: -4, ar1: 46, ar2:  4, al1:-124, al2:-154});
// h is a clockwise rotation, and she faces right, so NEGATIVE h looks UP.
POSES["sit-oh"]    = P({...SEATED, t:-7, h:-19, ar1:104, ar2:150, al1:38, al2: 0});
POSES["sit-look"]  = P({...SEATED, t:-2, h: -6, ar1: 44, ar2:  6, al1:38, al2:-2});
// fist into palm. At ar1 88 / ar2 150 the hands sit 75 units above ground and the
// desk top is at 52.5, so the gesture clears the slab instead of hiding behind it.
const STAND = {f:0, ll1:-8, ll2:-5, lr1:8, lr2:5, dy:0};
POSES["stand-apart"]= P({...STAND, t: 1, h:-5, ar1:126, ar2:176, al1: 60, al2:114});
POSES["stand-fist"] = P({...STAND, t: 4, h:-2, ar1: 88, ar2:124, al1: 72, al2:126});
// a shrug only reads front-on, so she turns to the room for it
POSES["stand-shrug"]= P({...STAND, f:1, t:0, h:9, ar1:28, ar2:118, al1:-28, al2:-118, dy:-1.5});
POSES["stand-watch"]= P({...STAND, t:2, h:-4, ar1:50, ar2:26, al1:-26, al2:-34});
POSES["stand-read"] = P({...STAND, t:7, h: 3, ar1:38, ar2:12, al1:-24, al2:-30});
// front-on for both of these: an offer and a wag are invisible in profile
POSES["stand-offer"]= P({...STAND, f:1, t:2, h:-2, ar1: 82, ar2:110, al1:-24, al2:-30});
// holds the glass up at the screen. Profile, so the arm reads as reaching toward
// the thing she is inspecting rather than across her own body.
POSES["stand-glass"]= P({...STAND, t:3, h:-3, ar1: 78, ar2: 96, al1:-26, al2:-34});
// fist to the chin, chin up. IK-solved so the hand lands ON the chin: shoulder to
// chin is only 15 units, so the elbow has to fold right up and swing out wide.
POSES["stand-chin"] = P({...STAND, t:1, h:-12, ar1:104, ar2:-126, al1:-26, al2:-34});
// points the line out, weight back, head cocked
POSES["stand-smug"] = P({...STAND, f:.75, t:-6, h:9, ar1:92, ar2:97, al1:-24, al2:-30});
// three-quarter toward him, so the pair reads as facing each other. The rig has
// no profile-LEFT (the eye offset uses |f|), so he simply faces the room.
POSES["stand-face"] = P({...STAND, f:.55, t:2, h:0, ar1:34, ar2:6, al1:-26, al2:-34});
POSES["stand-front"]= P({...STAND, f:1, t:0, h:0, ar1:28, ar2:34, al1:-28, al2:-34});
// two talking shapes on offset clocks. One arm pumping on a single sine reads
// mechanical; two overlapping gestures read as someone actually talking.
// the gesturing hand is the one AWAY from him, so her arm never crosses the
// space between them while she talks
POSES["talk-a"]     = P({...STAND, f:.55, t: 2, h: 1, ar1: 34, ar2: 6, al1:-64, al2:-42});
POSES["talk-b"]     = P({...STAND, f:.55, t:-1, h:-2, ar1: 30, ar2: 8, al1:-58, al2:-98});
POSES["stand-hip"]  = P({...STAND, f:.55, t:-2, h:3, ar1:34, ar2:6, al1:-37, al2:36});
// turned toward the screen for the walkthrough, one pose per height she points at
POSES["pt-up"]      = P({...STAND, f:.30, t:2, h:-4, ar1:118, ar2:124, al1:-24, al2:-30});
POSES["pt-mid"]     = P({...STAND, f:.30, t:2, h:-1, ar1: 92, ar2: 97, al1:-24, al2:-30});
POSES["pt-dn"]      = P({...STAND, f:.30, t:4, h: 3, ar1: 62, ar2: 56, al1:-24, al2:-30});
POSES["bot-watch"]  = P({f:.40, t:1, h:-2, ar1:30, ar2:34, al1:-28, al2:-32});
POSES["sweep-up"]   = P({...STAND, f:1, t:-4, h:-6, ar1:150, ar2:172, al1:-24, al2:-30, dy:-2});
POSES["stand-giggle"]=P({...STAND, f:1, t:5, h:7, ar1:116, ar2:170, al1:-24, al2:-30});
// palm to the face, on the FAR hand: he stands to her right, so the near arm
// crosses her body and lands the hand on top of the conversation. IK-solved and
// then mirrored: shoulder to face is 24 units, so the elbow swings high and wide
// for the hand to land on the face rather than short of it.
POSES["stand-palm"] = P({...STAND, f:1, t:-3, h:-24, al1:-164, al2:127, ar1:24, ar2:30, hf:1});
POSES["bot-idle"]   = P({f:1, ar1:26, ar2:32, al1:-26, al2:-32});
POSES["bot-talk"]   = P({f:1, t:-2, ar1:64, ar2:96, al1:-24, al2:-30});
POSES["bot-talk2"]  = P({f:1, t: 2, ar1:28, ar2:34, al1:-62, al2:-96});
// it presents the result to her, and she is on its left
POSES["bot-tell"]   = P({f:1, t:-1, h:2, ar1:26, ar2:32, al1:-94, al2:-100});
// thumbs up: forearm straight up, hand above the fist. It agrees without talking.
POSES["bot-thumb"]  = P({f:1, t:-2, h:-3, ar1:52, ar2:178, al1:-26, al2:-32, dy:-1});
POSES["bot-wave"]   = P({f:1, t:-3, ar1:126, ar2:168, al1:-28, al2:-36, dy:-1});
POSES["bot-shrug"]  = P({f:1, t:0, h:0, ar1:28, ar2:118, al1:-28, al2:-118, dy:-1.2});
// the hand it raises is the one on her side of the frame, so the gesture is
// aimed at her rather than at the audience
POSES["bot-raise"]  = P({f:1, t:1, h:2, ar1:26, ar2:32, al1:-118, al2:-160});
// hand to its own chin. IK-solved against the square head, whose chin sits at
// -55.7 from the hip rather than the round head's -52.
POSES["bot-think"]  = P({f:1, t:1, h:0, ar1:118, ar2:-124, al1:-26, al2:-32, hf:1});
// "of course I did." One hand on the waist, the other open toward the card,
// weight back, head cocked.
// Two symmetric attempts failed first, both for the same reason: any pose that
// brings BOTH hands in to the body centre closes the arms into a diamond around
// the torso line, and the figure reads as holding a kite. Folded arms cannot
// work at all here (forearm 16, elbow 12 out, so it cannot cross the midline),
// and hands-on-hips has nothing to rest on because the rig's hips are 4.5 wide.
// Asymmetry is the fix: one triangle, one open arm, no enclosed shape. The waist
// hand is IK-solved so it sits ON the body rather than near it.
POSES["stand-arms"] = P({...STAND, f:1, t:-5, h:6, dy:-1.0,
                         al1:-37, al2:36, ar1:46, ar2:74});

// ─── dance poses restored from the ORIGINAL pose sheet (poses.json) ──
// Measured off the original SVG paths rather than re-authored, so later scenes
// dance the dance from the first video. dance-3 IS dance-1 stepped sideways,
// which is why DANCE_DX exists: the rig has no dx of its own.
POSES["dance-1"]      = P({t: 0,h: 0,al1:-118,al2:-152,ar1:118,ar2:152,ll1:-18,ll2: -6,lr1:18,lr2:  6,dy:1.3});
POSES["dance-2"]      = P({t: 0,h: 0,al1: -78,al2: -90,ar1: 78,ar2: 90,ll1:-22,ll2: -4,lr1:22,lr2:  4,dy:1.9});
POSES["dance-3"]      = P({t: 0,h: 0,al1:-118,al2:-152,ar1:118,ar2:152,ll1:-18,ll2: -6,lr1:18,lr2:  6,dy:1.3});
POSES["dance-4"]      = P({t: 6,h:-1,al1: -70,al2:  30,ar1:118,ar2:154,ll1:-24,ll2:-10,lr1:22,lr2: 10,dy:2.2});
POSES["dance-side-1"] = P({t:-6,h: 1,al1: -46,al2:   4,ar1:112,ar2:144,ll1: 20,ll2:-34,lr1:36,lr2:-26,dy:6.1,f:0});
POSES["dance-side-2"] = P({t:-4,h: 1,al1: -68,al2: -22,ar1:136,ar2:168,ll1:  6,ll2:-42,lr1:24,lr2:-34,dy:6.8,f:0});
const DANCE = ["dance-1","dance-2","dance-3","dance-4",
               "dance-side-1","dance-2","dance-side-2","dance-2"];
// Onset analysis of meme.mp4 gives 0.500s = 120.0 BPM, but only from ~16s in;
// over 32-56s the phase is stable at 0.380s. Starting the clip at 32.38 puts a
// beat boundary on every dance snap without any further offset arithmetic.
// Her marks, in clip seconds: start at 20, she dances from 29, he enters at 43
// and dances from 45. The .47 is the measured beat phase for the 20-32 window,
// so the dance grid still lands on the music.
const BEAT=0.5, CLIP_START=20.47, DANCE_LEAD=0.11;
const CLIP_AT=(sec)=>sec-CLIP_START;          // clip second -> beat-local second
const SHE_DANCES=CLIP_AT(29);
// he comes in well before the dance, looks up at the clip, looks over at her,
// shrugs at the room, and only then joins in
const HE_ARRIVES=CLIP_AT(37), HE_HERE=CLIP_AT(39.4),
      HE_TOHER=CLIP_AT(41.2), HE_SHRUG=CLIP_AT(42.8), HE_DANCE=CLIP_AT(45);
const DANCE_DX = {"dance-1":-10.6,"dance-2":0,"dance-3":10.6,"dance-4":12.2,
                  "dance-side-1":0,"dance-side-2":0};

// ─── title wording options ──────────────────────────────────────────
const COPY = [
  {id:"B", note:"chosen",
   title:"My Claude Code journey",
   sub:"Sidequested so hard I built a product",
   why:"Final."}
];
let copyIdx = 0;

// ─── timeline ───────────────────────────────────────────────────────
const CHAIR_X=0.50;   // the chair comes to her, so it lives here now
const SEAT_X=CHAIR_X-.016;
const CAM3=0.26;   // scene 3 reframes her to the left to open room for the recalls
const LOCK_T=1.45; // when the hands actually meet, in beat-local seconds
// She does not go to the screen; it is already there. Same camera as scene 3, so
// nothing pans and nothing walks between the desk clearing and the plan landing.
const CAM4=CAM3, ASK_X=CAM3+.29, MON_X=CAM3+.47;
const CLAUDE="#D97757";
const ALSO_LAG=0.28;   // she cuts in a beat after he starts, not a second after   // Claude is orange everywhere: mark, label, arrow, its lines
// Nothing walks here either. She stays put, he waves himself off, and the clip
// slides in from the right. The clip sits right of centre so she is clear of it.
const CAM5=CAM4, MEME_X=CAM4+0.166;   // clear of the clip, dance travel and arm reach included
const FIN_X=CAM4+0.145;   // she presents from the left; the shots take the rest
// Where she is looking during each closing beat: [beat time, x, y] in screen px,
// timed to the moment the thing she is looking at lands. Her head and her arm
// both track it, so the gaze is not one fixed stare over a beat where four
// separate things appear. These mirror the layouts in drawFinale: move a card
// there and its target here moves with it.
const GAZE={
  f1:[[1.10, 524,479],[2.52, 760,479],[4.85, 996,479],[7.18,1232,479],[9.52,1468,479]],
  f2:[[1.10, 995,248],[3.25, 995,410],[5.40, 995,574],[7.55, 995,736]],
  f3:[[1.00, 562,394],[1.75, 842,394],[2.50,1122,394],[3.25,1402,394],[4.60, 982,640]],
  f4:[[0.90, 518,350],[1.60,1071,360],[4.40,1000,660]]
};
const SHOULD_X=232, SHOULD_Y=539;   // her shoulder, at FIN_X, in screen px
// The funnel steps all sit at one height and she stands well to the left, so the
// true angles from her shoulder to them differ by nine degrees: seventeen pixels
// of hand travel over eight seconds, which is no movement at all. Each beat's
// sweep is widened about its own mean until it spans roughly thirty degrees.
// Beats that already sweep more than that are left alone.
const GAZE_TUNE={};
for(const k in GAZE){
  const A=GAZE[k].map(([,x,y])=>Math.atan2(x-SHOULD_X,y-SHOULD_Y)*180/Math.PI);
  const lo=Math.min(...A), hi=Math.max(...A), span=hi-lo;
  GAZE_TUNE[k]={mean:(lo+hi)/2,
                gain:span<1?1:Math.max(1,Math.min(3.4,30/span))};
}
// the clip sits in the middle of the frame, both of them beside it
// the clip is world-anchored, so the camera pan slides it in from the right by
// itself rather than it fading up in place. No bezel: it is the clip, not a screen.
const MEME_W=CAM5+0.50, MEME={w:760, h:563, cy:440};   // centred at screen 800
// The screen grows in place instead of the camera panning. A zoom rather than a
// pan is a deliberate change of grammar: every scene break so far has been a pan,
// so this one reads as going INTO something rather than moving along.
const WATCH_X=ASK_X;   // she does not move into this scene, the screen comes to her
const BIG={x:790, y:1223, s:8.53};   // screen 380..1200 x 199..780, clear of the floor at 810
                                  // x 334..1246, y 157..803
const DESK_X=CHAIR_X+.026;      // in front of her; she sits facing right
// cam is declared PER BEAT, never derived from the beat's index — inserting a
// beat anywhere used to move the camera silently.
const SEQ=[
  // Seven steps. Four covers 510px and the gap from off-frame to centre is 890,
  // so four could only ever leave her short of the mark.
  // Seven steps at a flat 0.35s each. She does not walk anywhere after this:
  // the set comes to her, which is truer anyway since she never moved.
  {kind:"walk",  dur:2.45, x0:-.058, x1:.50, cam:0},
  {kind:"turn",  dur:.70,  x:.50,          cam:0},
  {kind:"hold",  dur:.28,  x:.50, pose:"settle", from:"turn-1", cam:0},
  {kind:"wave",  dur:1.70, x:.50,           cam:0},
  {kind:"hold",  dur:1.50, x:.50, pose:"settle", from:"wave-a", cam:0},
  {kind:"hold",  dur:1.20, x:.50, pose:"settle", from:"settle", cam:0, lab:"setin"},
  {kind:"sit",   dur:.85,  x:SEAT_X,        cam:0},
  {kind:"rest",  dur:0.40, x:SEAT_X,        cam:0},
  // ─── scene 2 ───
  {kind:"seated",dur:3.10, x:SEAT_X, cam:0, pose:"sit-slump", from:"sit",      lab:"bored"},
  {kind:"seated",dur:2.90, x:SEAT_X, cam:0, pose:"sit-up",    from:"sit-slump",lab:"remember"},
  {kind:"raise", dur:2.10, x:SEAT_X, cam:0, from:"sit-up",    rest:"sit-up",
                                          lift:"sit-lift-a", lab:"think-a"},
  {kind:"seat2", dur:2.90, x:SEAT_X, cam:0, from:"sit-up",
                 pose:"sit-hands", pose2:"sit-cheek", at:1.60, lab:"think-b"},
  {kind:"seated",dur:2.90, x:SEAT_X, cam:0, pose:"sit-idea",  from:"sit-cheek",lab:"need"},
  // ─── scene 3: the idea ───
  {kind:"idea",  dur:3.70, x:SEAT_X, lab:"idea"},
  {kind:"recall",dur:2.70, x:SEAT_X, cam:CAM3, from:"sit-oh",   look:-14, lab:"recall-1"},
  {kind:"recall",dur:4.10, x:SEAT_X, cam:CAM3, from:"sit-look", look:  0, lab:"recall-2"},
  {kind:"locked",dur:4.40, x0:SEAT_X, x1:ASK_X, cam:CAM3, lab:"locked"},
  // ─── scene 4: asking the thing itself ───
  {kind:"ask",   dur:2.60, x:ASK_X, cam:CAM4, lab:"howto"},
  {kind:"hand",  dur:3.40, x:ASK_X, cam:CAM4, lab:"hand"},
  {kind:"tdd",   dur:5.00, x:ASK_X, cam:CAM4, lab:"tdd"},
  // ─── scene 5: watching it work ───
  {kind:"zoom",  dur:2.00, x:ASK_X, cam:CAM4, lab:"zoom"},
  {kind:"watch2",dur:2.40, x:WATCH_X, cam:CAM4, lab:"watch"},
  {kind:"prod",  dur:2.80, x:WATCH_X, cam:CAM4, lab:"prod"},
  {kind:"noticed",dur:3.60, x:WATCH_X, cam:CAM4, lab:"noticed"},
  // ─── learning one ───
  {kind:"say",   dur:2.60, x:WATCH_X, cam:CAM4, lab:"l1head"},
  {kind:"say",   dur:22.1, x:WATCH_X, cam:CAM4, lab:"dialog"},
  {kind:"say",   dur:3.60, x:WATCH_X, cam:CAM4, lab:"l1end"},
  // ─── learning two ───
  {kind:"say",   dur:2.40, x:WATCH_X, cam:CAM4, lab:"l2head"},
  {kind:"say",   dur:32.4, x:WATCH_X, cam:CAM4, lab:"dialog2"},
  {kind:"say",   dur:4.40, x:WATCH_X, cam:CAM4, lab:"l2end"},
  // ─── learning three ───
  {kind:"say",   dur:2.40, x:WATCH_X, cam:CAM4, lab:"l3head"},
  {kind:"say",   dur:35.6, x:WATCH_X, cam:CAM4, lab:"dialog3"},
  {kind:"say",   dur:5.00, x:WATCH_X, cam:CAM4, lab:"l3end"},
  // ─── 3am ───
  {kind:"tomeme",dur:1.70, x:WATCH_X, cam:CAM5, lab:"tomeme"},
  {kind:"meme",  dur:30.0, x:MEME_X, cam:CAM5, lab:"meme"},
  {kind:"memeup",dur:4.40, x:MEME_X, cam:CAM5, lab:"memeup"},
  // ─── what got built ───
  {kind:"show",  dur:11.5,  x:FIN_X, cam:CAM4, lab:"f1"},
  {kind:"show",  dur:12.5, x:FIN_X, cam:CAM4, lab:"f2"},
  {kind:"show",  dur:10.0, x:FIN_X, cam:CAM4, lab:"f3"},
  {kind:"show",  dur:11.0, x:FIN_X, cam:CAM4, lab:"f4"},
  {kind:"bow",   dur:9.00, x:FIN_X, cam:CAM4, lab:"f5"}
];
let TOTAL=SEQ.reduce((s,a)=>s+a.dur,0);
// The title block leaves before the cue line arrives, so the cue takes its slot
// rather than sharing the frame with it. Subtitle goes first, then the title, so
// the block clears from the bottom up instead of vanishing all at once.
const T_TITLE=3.45, T_SUB=4.35,
      T_SUB_OUT=6.50, T_TITLE_OUT=6.68,
      T_CUE=7.15;                    // lands as she points

// ─── scene 2 copy + cues (absolute seconds) ─────────────────────────
const DESKF="500 44px 'Space Grotesk', sans-serif";
const S2 = {
  l1a:"It started the same way all my stories begin...",
  l1b:"I was bored on a weekend...",
  l1c:"Nothing to do...",
  line2:"Then I remembered. There's a lot of hype around Claude Code.",
  line3:"I wanted to understand how it works. And its flows.",
  line4:"But I need a test project."
};
retime();
// the opening line starts while the chair is still coming in, so there is no
// dead air between her sitting down and the story beginning
// the third line waits for her to be back in the chair: the slump settles over
// its first 0.75s, so it cues off the beat, not off a fixed cadence
const L1_AT=[AT["setin"]+.40, AT["setin"]+1.20, AT["bored"]+.90];
const C1_IN=AT["setin"]+.40,  C1_OUT=AT["remember"]+.30,
      C2_IN=AT["remember"]+.35,
      BA_IN=AT["think-a"]+.25, BB_IN=AT["think-b"]+.25;

// ─── scene 3 copy ───────────────────────────────────────────────────
const S3 = {
  hit:"It hit me.",
  can:"I can build a heuristic evaluator.",
  canNote:"A heuristic evaluation: an expert walks a site and judges it against known usability and conversion principles.",
  r1 :"I worked closely with CROs for 3 years.",
  r2 :"I know what a good evaluation looks like.",
  lock:"Project locked."
};
// every recall: anchor x, baseline y, and where her head has to point to read it
// three ticked reasons under the line that names the project
const RECALLS=[
  {key:"r1", x:640, y:340, lab:"recall-1"},
  {key:"r2", x:640, y:448, lab:"recall-2"}
];
const HEAD_Y_SIT=528;   // her head centre while seated, in screen px
const CARD_CX=866;      // scene-3 card centre: clear of her, ticks included

// ─── scene 4 copy ───────────────────────────────────────────────────
const S4 = {
  // every requirement here is one she actually wrote into CLAUDE.md
  head :"How I started",
  l1   :"Handed it a CLAUDE.md and a product plan from the proof of concept.",
  l2   :"Insisted on TDD. And on watching the test fail first.",
  note :"Test-driven development: write the failing test before the code that makes it pass."
};

function stateAt(time){
  let t=time%TOTAL, i=0;
  while(i<SEQ.length-1 && t>SEQ[i].dur){t-=SEQ[i].dur;i++}
  const a=SEQ[i], u=Math.min(1,t/a.dur);
  let pose,x=a.x??0,label,cam=a.cam??0,zoom=0,dx=0,flip=false;
  if(a.kind==="walk"){
    // decelerate into the mark — distance and cycle finish together
    // nearly constant cadence, easing off only at the very end
    // one pace, start to finish: linear travel, so the step rate never changes
    x=a.x0+(a.x1-a.x0)*u;
    pose=stridePose((x-a.x0)*W);
    // settle onto both feet at the very end, so the turn has somewhere to start
    if(u>.92) pose=mix(pose,POSES["walk-side-3"],ease((u-.92)/.08));
    label="walk";
  }else if(a.kind==="turn"){
    const k=ease(u), TN=["walk-side-3","turn-3","turn-2","turn-1"];
    const g=k*(TN.length-1), i2=Math.min(TN.length-2,Math.floor(g));
    pose=mix(POSES[TN[i2]],POSES[TN[i2+1]],ease(g-i2));
    label="turn";
  }else if(a.kind==="wave"){
    const f=t*4.6, k=Math.floor(f);           // ~4 waves
    const sw=(Math.sin(f*Math.PI)+1)/2;
    pose=mix(POSES["wave-a"],POSES["wave-b"],sw);
    // ease into the wave from the settled stance
    if(t<.28) pose=mix(POSES["settle"],pose,ease(t/.28));
    label="wave";
  }else if(a.kind==="cue"){
    // points the way, then starts coming round on the tail of the beat
    pose=mix(POSES["settle"],POSES["point-go"],ease(Math.min(1,t/.5)));
    const turn=ease(Math.max(0,(t-.72)/(a.dur-.72)));
    pose={...pose, f:pose.f-(pose.f-.5)*turn};
    label="point";
  }else if(a.kind==="travel"){
    const e=ease(u);
    x=a.x0+(a.x1-a.x0)*e;
    pose=stridePose((x-a.x0)*W);
    if(t<.5) pose=mix({...POSES["point-go"],f:.5},pose,ease(t/.5));
    cam=e-.06*Math.sin(e*Math.PI);   // camera lags mid-pan so she leads a little
    label="travel";
  }else if(a.kind==="sit"){
    pose=mix(POSES["settle"],POSES["sit"],ease(u));
    label="sit";
  }else if(a.kind==="go4"){
    const e=ease(u);
    x=a.x0+(a.x1-a.x0)*e;
    pose=stridePose((x-a.x0)*W);
    if(t<.4) pose=mix({...POSES["stand-shrug"],f:.5},pose,ease(t/.4));
    cam=CAM3+(CAM4-CAM3)*(e-.06*Math.sin(e*Math.PI));   // same deliberate lag
    label="walk4";
  }else if(a.kind==="ask"){
    // she ended the last beat standing with her hands together, so this beat has
    // to start from THAT, not from a mid-stride frame: the old start snapped her
    // legs out of a step she never took.
    pose=mix(POSES["stand-fist"],POSES["stand-watch"],ease(Math.min(1,t/.6)));
    const br=Math.sin(time*1.6)*1.0;
    pose={...pose, t:pose.t+br*.3, dy:pose.dy+br*.5};
    label="ask";
  }else if(a.kind==="hand"){
    // hands it over: one arm opens out toward the line as it lands
    const p2=mix(POSES["stand-watch"],POSES["stand-offer"],ease(Math.min(1,t/.8)));
    const br=Math.sin(time*1.6)*1.0;
    pose={...p2, t:p2.t+br*.3, dy:p2.dy+br*.5};
    label="hand";
  }else if(a.kind==="tdd"){
    // folds her arms and settles back. A confident HOLD rather than a busy
    // gesture: the beat also has to let you read two lines and a footnote, and
    // motion beside the text competes with reading it.
    const up=ease(Math.min(1,t/.85));
    const p2=mix(POSES["stand-offer"],POSES["stand-arms"],up);
    const nod=t>1.6 ? Math.sin(Math.PI*Math.min(1,(t-1.6)/1.0))*5 : 0;
    const br=Math.sin(time*1.6)*1.0;
    // the open hand turns over once, a small "there you go"
    const turn=t>2.2 ? Math.sin(Math.PI*Math.min(1,(t-2.2)/1.1))*10 : 0;
    pose={...p2, h:p2.h+nod, ar2:p2.ar2+turn*up, t:p2.t+br*.3, dy:p2.dy+br*.5};
    label="tdd";
  }else if(a.kind==="zoom"){
    // she just turns back to the screen. The zoom is the movement in this beat,
    // so walking as well made two things move at once and neither read.
    const e=ease(u);
    pose=mix(POSES["stand-arms"],POSES["stand-watch"],ease(Math.min(1,t/1.1)));
    const br=Math.sin(time*1.6)*1.0;
    pose={...pose, t:pose.t+br*.3, dy:pose.dy+br*.5};
    zoom=e; label="zoom";
  }else if(a.kind==="watch2"){
    // fist to the chin, chin up. Watching, not inspecting: the glass comes later.
    const p2=mix(POSES["stand-watch"],POSES["stand-chin"],ease(Math.min(1,(t-.35)/1.0)));
    const br=Math.sin(time*1.6)*1.0;
    pose={...p2, h:p2.h+Math.sin(time*.9)*2.4, t:p2.t+br*.3, dy:p2.dy+br*.5};
    zoom=1; label="watch";
  }else if(a.kind==="prod"){
    // now she inspects: chin down, glass up at the report
    const p2=mix(POSES["stand-chin"],POSES["stand-glass"],ease(Math.min(1,t/.9)));
    const br=Math.sin(time*1.6)*1.0;
    pose={...p2, h:p2.h+Math.sin(time*1.05)*2.0, t:p2.t+br*.3, dy:p2.dy+br*.5};
    zoom=1; label="prod";
  }else if(a.kind==="noticed"){
    // glass down, and she points the line out. Two jabs rather than one: a single
    // extend reads as reaching, a repeat reads as "and there it is".
    const up=ease(Math.min(1,t/.9));
    const jab=t>1.05&&t<2.3 ? Math.max(0,Math.sin((t-1.05)*Math.PI/.34)) : 0;
    const p2=mix(POSES["stand-glass"],POSES["stand-smug"],up);
    const br=Math.sin(time*1.6)*1.0;
    pose={...p2, ar1:p2.ar1+jab*7*up, ar2:p2.ar2+jab*9*up,
          t:p2.t+br*.3, dy:p2.dy+br*.5};
    zoom=1; label="noticed";
  }else if(a.kind==="say"){
    // the conversation. Whoever is talking gets a small lift; the other holds.
    const talk=(a.lab==="dialog") ? Math.sin(time*5.2) : 0;
    let p2;
    const L=lessonAt(time);
    if(a.lab==="l1head"){
      p2=mix(POSES["stand-smug"],POSES["stand-front"],ease(Math.min(1,t/.9)));
    }else if(/^l\d+(head|end)$/.test(a.lab)){   // every card beat, not a hand-listed few
      p2=POSES["stand-front"];        // turned out to the room between exchanges
    }else{
      // hand comes up as it starts conceding and drops again to agree
      const dl=L.at(time), pAmt=fade(time,L.palmIn,L.palmOut,.45);
      // she moves out of the way of the screen rather than toward him: "closer"
      // has to leave the thing she is pointing at visible
      x = a.x - .021*fade(time,L.nearIn,L.nearOut,.7);
      // the talking shape is the resting state, and every deliberate gesture eases
      // out of it and back into it before the line ends. Snapping between the two
      // was what made the gestures look bolted on.
      // one light gesture, and only on her own lines. The two-armed version moved
      // her hands while the other one was talking, which is the tell that it was
      // being applied unconditionally rather than to the speaker.
      let talk=POSES["stand-face"];
      if(dl.line.who!==1)
        talk=mix(POSES["stand-face"],POSES["talk-a"],
                 .16+((Math.sin(time*3.4)+1)/2)*.28);
      let base=talk;
      const gest = dl.line.pt!=null ? POSES[dl.line.pt===2?"pt-dn":"pt-mid"]
                 : dl.line.fast ? mix(POSES["pt-mid"],POSES["pt-dn"],(Math.sin(time*5.6)+1)/2)
                 : dl.line.hip  ? POSES["stand-hip"] : null;
      if(gest){
        const inR=Math.min(1,dl.t/.55);
        const outR=1-Math.max(0,Math.min(1,(dl.t-(dl.line.dur-.5))/.5));
        // the gesture used to be gated on the palm being almost gone, so it
        // appeared at whatever value it had already eased to: a jump. It now
        // takes over AS the palm falls, weighted by what is left of it.
        base=mix(talk,gest,ease(Math.min(inR,outR))*(1-pAmt));
      }
      p2=mix(base,POSES["stand-palm"],pAmt);
      // it landed on the cut before, which read as a face pulled in advance. It
      // arrives partway through the line instead, as the point lands.
      if(dl.line.who===0 && dl.line.smirk &&
         dl.t > Math.max(.95, dl.line.dur*.45)) p2={...p2, mouth:"smirk"};
    }
    const br=Math.sin(time*1.6)*1.0;
    const mine=SAY_MINE(time);
    pose={...p2, ar1:p2.ar1+(mine?talk*4:0), t:p2.t+br*.3, dy:p2.dy+br*.5};
    zoom=1; label=a.lab;
  }else if(a.kind==="tomeme"){
    // two steps left to make room for the clip. Driven off distance covered, so
    // the feet cannot slide, and mirrored because the rig has no profile-left.
    const TRV=(WATCH_X-MEME_X)*W;
    const wu=Math.max(0,Math.min(1,(t-.25)/(TRV/182.3))), dist=wu*TRV;
    x = WATCH_X - dist/W;
    if(wu>0 && wu<1){ pose=stridePose(dist); flip=true }
    else pose=POSES["stand-front"];
    const br=Math.sin(time*1.6)*1.0;
    pose={...pose, dy:pose.dy+br*.5};
    zoom=1; label="tomeme";
  }else if(a.kind==="meme"){
    // the dance, beat-locked. Snap on the boundary then hold, and carry the
    // sheet's own lateral travel or it collapses into arms flapping on the spot.
    const d2=t-SHE_DANCES;
    if(d2<0){
      // she watches, then cracks up, then it gets going and she is off
      const g=Math.max(0,Math.min(1,(t-1.1)/.55))*(1-Math.max(0,Math.min(1,(t-(SHE_DANCES-.7))/.7)));
      pose=mix(POSES["stand-front"],POSES["stand-giggle"],g);
      pose={...pose, dy:pose.dy+Math.sin(time*13.5)*1.7*g,
                     h:pose.h+Math.sin(time*13.5)*2.6*g};
    }else{
      const b=(d2+DANCE_LEAD)/BEAT, k=Math.floor(b)%DANCE.length, frac=b-Math.floor(b);
      const snap=Math.min(1,frac*2.3);
      const A=DANCE[k], B=DANCE[(k+1)%DANCE.length];
      pose=mix(POSES[A],POSES[B],snap);
      dx=(DANCE_DX[A]||0)+((DANCE_DX[B]||0)-(DANCE_DX[A]||0))*snap;
      const bob=Math.abs(Math.sin(Math.PI*b));
      pose={...pose, dy:pose.dy-bob*3.5};
      if(d2<.5) pose=mix(POSES["stand-front"],pose,ease(d2/.5));
    }
    zoom=1; label="meme";
  }else if(a.kind==="memeup"){
    // she sweeps it away and it goes up with her hand
    const e=ease(Math.min(1,t/.9));
    pose=mix(POSES["stand-front"],POSES["sweep-up"],e);
    const br=Math.sin(time*1.6)*1.0;
    pose={...pose, dy:pose.dy+br*.5};
    zoom=1; label="memeup";
  }else if(a.kind==="show"){
    // she presents, and follows each thing as it arrives: the arm angle is solved
    // from her shoulder to the target, and the head tilts with its height.
    const g=GAZE[a.lab];
    let tx=1000, ty=460;
    if(g){
      tx=g[0][1]; ty=g[0][2];
      for(let k=1;k<g.length;k++){       // each target pulls her toward it in turn
        const u=ease(Math.max(0,Math.min(1,(t-(g[k][0]-.25))/.5)));
        tx+=(g[k][1]-tx)*u; ty+=(g[k][2]-ty)*u;
      }
    }
    const tune=GAZE_TUNE[a.lab]||{mean:90,gain:1};
    const raw=Math.atan2(tx-SHOULD_X,ty-SHOULD_Y)*180/Math.PI;
    const ang=tune.mean+(raw-tune.mean)*tune.gain;
    // the head follows the arm rather than the raw height, so it moves on a
    // sideways sweep too and not only when the target changes level
    const point={...POSES["pt-mid"], ar1:ang, ar2:ang+5,
                 h:Math.max(-11,Math.min(13,(ang-90)*.42))};
    const p2=mix(POSES["stand-front"],point,
                 ease(Math.max(0,Math.min(1,(t-.55)/.6))*(1-Math.max(0,Math.min(1,(t-(a.dur-.9))/.7)))));
    const br=Math.sin(time*1.6)*1.0;
    pose={...p2, t:p2.t+br*.3, dy:p2.dy+br*.5};
    zoom=1; label=a.lab;
  }else if(a.kind==="bow"){
    // she waits, then steps out so that both of them land on the middle at the
    // same moment: he has 820px to cover from off frame, she has 328
    const wu=Math.max(0,Math.min(1,(t-2.70)/1.8)), dist=wu*328;
    x = a.x + dist/W;
    if(wu>0 && wu<1){ pose=stridePose(dist) }
    else{
      // the film opened on a wave, so it closes on one. A bow cannot read from
      // the front: the legs stay splayed while the torso goes over, which draws
      // a table rather than a person bending.
      const wv=Math.max(0,Math.min(1,(t-4.75)/.45))
              *(1-Math.max(0,Math.min(1,(t-8.10)/.55)));
      const sw=(Math.sin(t*4.6*Math.PI)+1)/2;
      pose=mix(POSES["stand-front"],
               mix(POSES["wave-a"],POSES["wave-b"],sw),wv);
      const br=Math.sin(time*1.6)*1.0;
      pose={...pose, dy:pose.dy+br*.5};
    }
    zoom=1; label="f5";
  }else if(a.kind==="idea"){
    // she straightens and looks up as the bulb lands; camera opens the right side
    // the pan used to run the whole beat, so the desk was still travelling under
    // "I can build a heuristic evaluator". It settles first now.
    const e=ease(Math.min(1,t/1.70));
    cam=(CAM3)*e;
    pose=mix(POSES["sit-idea"],POSES["sit-oh"],ease(Math.min(1,t/.85)));
    const br=Math.sin(time*1.55)*1.0;
    pose={...pose, dy:pose.dy+br*.45};
    label="idea";
  }else if(a.kind==="recall"){
    // head turns to the phrase being written, then holds while it finishes
    const p=mix(POSES[a.from],POSES["sit-look"],ease(Math.min(1,t/.55)));
    const br=Math.sin(time*1.55)*1.0;
    pose={...p, h:p.h+(a.look-p.h)*ease(Math.min(1,t/.7)), t:p.t+br*.3,
          dy:p.dy+br*.45};
    label=a.lab;
  }else if(a.kind==="locked"){
    // she stands and steps clear of the desk first, then the hands come together.
    // The recoil after the meeting is what sells it as an impact rather than a pose.
    const up=ease(Math.min(1,t/.85));
    x=a.x0+(a.x1-a.x0)*up;
    // accelerate INTO the hit rather than easing into it, or it reads as a reach
    const k=t<LOCK_T ? Math.pow(Math.max(0,(t-.62)/(LOCK_T-.62)),2.4)
                     : 1-.18*Math.sin(Math.PI*Math.min(1,(t-LOCK_T)/.36));
    const arms=mix(POSES["stand-apart"],POSES["stand-fist"],Math.min(1,k));
    // she was sitting in sit-look, not sit-idea: starting the stand from a pose
    // she was never in snapped her hand up to her face for a frame first
    pose=mix(POSES["sit-look"],arms,up);
    const br=Math.sin(time*1.55)*.8;
    // she takes the impact through the body, not just the arms
    const jolt=t>=LOCK_T ? 2.6*Math.sin(Math.PI*Math.min(1,(t-LOCK_T)/.30)) : 0;
    pose={...pose, dy:pose.dy+br*.4+jolt};
    label="locked";
  }else if(a.kind==="raise"){
    // one deliberate gesture for the line, then the hand comes back down. The
    // thinking beat used to drift the hand between cheek and mouth on two sines
    // for its whole length, which reads as fidgeting rather than thinking.
    const gd=Math.max(.9,a.dur-1.15);
    const g=Math.sin(Math.PI*Math.max(0,Math.min(1,(t-.55)/gd)));
    const rest=mix(POSES[a.from],POSES[a.rest],ease(Math.min(1,t/.55)));
    pose=mix(rest,POSES[a.lift],g*.95);
    const br=Math.sin(time*1.55)*1.0;
    pose={...pose, t:pose.t+br*.3, dy:pose.dy+br*.45};
    label=a.lab;
  }else if(a.kind==="think"){
    // a thinking hand does not hold still. It drifts between cheek and mouth on a
    // sine plus a slower second sine, so it wanders instead of ticking, and the
    // head tilt follows the hand rather than moving on its own clock.
    const w=(Math.sin(time*1.9)+.45*Math.sin(time*1.13))/1.45;     // -1..1, uneven
    let p=mix(POSES["sit-cheek"],POSES["sit-mouth"],(w+1)/2);
    if(a.gesture){
      // one beat where the hand leaves her face entirely: the "and also" gesture
      const g=Math.sin(Math.PI*Math.min(1,Math.max(0,(t-.5)/1.25)));
      p=mix(p,POSES["sit-open"],g*.92);
    }
    pose=mix(POSES[a.from],p,ease(Math.min(1,t/.6)));
    const br=Math.sin(time*1.55)*1.0;
    pose={...pose, t:pose.t+br*.3+w*1.4, dy:pose.dy+br*.45, h:pose.h+Math.sin(time*.83)*3.6};
    label=a.lab;
  }else if(a.kind==="seat2"){
    // two poses inside one beat: it settles into the first, holds, then moves to
    // the second, so a change of mind does not need a whole extra beat
    const p1=mix(POSES[a.from],POSES[a.pose],ease(Math.min(1,t/.55)));
    pose=mix(p1,POSES[a.pose2],ease(Math.max(0,Math.min(1,(t-a.at)/.6))));
    const br=Math.sin(time*1.55)*1.0;
    pose={...pose, t:pose.t+br*.3, dy:pose.dy+br*.45};
    label=a.lab;
  }else if(a.kind==="seated"){
    // settle into the beat's pose, then keep breathing so the hold isn't frozen
    pose=mix(POSES[a.from],POSES[a.pose],ease(Math.min(1,t/.75)));
    const br=Math.sin(time*1.55)*1.0;
    pose={...pose, t:pose.t+br*.3, dy:pose.dy+br*.45};
    label=a.lab;
  }else if(a.kind==="rest"){
    const br=Math.sin(time*1.6)*1.0;
    pose={...POSES["sit"], t:POSES["sit"].t+br*.3, dy:POSES["sit"].dy+br*.4};
    label="rest";
  }else{
    pose=mix(POSES[a.from],POSES[a.pose],ease(Math.min(1,t/.45)));
    // quiet breathing so the hold isn't frozen
    const br=Math.sin(time*1.7)*1.1;
    pose={...pose, t:pose.t+br*.35, dy:pose.dy+br*.5};
    label="hold";
  }
  return {pose,x,cam,label,zoom,dx,flip,t:time%TOTAL};
}

function drawText(time,cam){
  ctx.save(); ctx.translate(-cam*W,0);
  const c=COPY[copyIdx];
  ctx.textAlign="center";
  ctx.font="700 76px 'Space Grotesk', sans-serif";
  const tl=wrap(ctx,c.title,W*.80);
  const baseY=196;


  // eyebrow rule sweeps open above the title
  const rampIn=(x,a,d)=>Math.max(0,Math.min(1,(x-a)/d));
  const ta=rampIn(time,T_TITLE,.75)*(1-rampIn(time,T_TITLE_OUT,.34));
  if(ta>0){
    const uw=outQuint(Math.min(1,ta*1.25))*86;
    ctx.save(); ctx.globalAlpha=ta;
    ctx.strokeStyle="#3D5BD9"; ctx.lineWidth=5; ctx.lineCap="round";
    ctx.beginPath(); ctx.moveTo(W*.5-uw,baseY-74); ctx.lineTo(W*.5+uw,baseY-74); ctx.stroke();
    ctx.restore();
  }
  // title rises and fades in
  if(ta>0){
    ctx.save(); ctx.globalAlpha=ta;
    ctx.translate(0,(1-outQuint(Math.min(1,(time-T_TITLE)/.75)))*24);
    ctx.fillStyle="#23252B"; ctx.font="700 76px 'Space Grotesk', sans-serif";
    tl.forEach((l,i)=>ctx.fillText(l,W*.5,baseY+i*84));
    ctx.restore();
  }
  // subtitle follows a beat later
  const sa=rampIn(time,T_SUB,.75)*(1-rampIn(time,T_SUB_OUT,.34));
  if(sa>0){
    ctx.save(); ctx.globalAlpha=sa;
    ctx.translate(0,(1-outQuint(Math.min(1,(time-T_SUB)/.75)))*16);
    ctx.fillStyle="#767C8A"; ctx.font="400 33px 'IBM Plex Mono', monospace";
    wrap(ctx,c.sub,W*.72).forEach((l,i)=>
      ctx.fillText(l,W*.5,baseY+(tl.length-1)*84+58+i*46));
    ctx.restore();
  }

  ctx.restore();
}

// ─── scene 2 text, pinned to scene two ──────────────────────────────
const S2X = 0.50;           // world centre of the second screen
function drawScene2(time,cam){
  const cx=(S2X-cam)*W, headX=(SEAT_X-cam)*W, headY=528;
  ctx.save();
  [S2.l1a,S2.l1b,S2.l1c].forEach((tx,i)=>
    line(ctx,tx,cx,190+i*78,fade(time,L1_AT[i],C1_OUT,.6),
         DESKF,"#23252B",W*.92,56,L1_AT[i]));
  // both blocks sit on the same three baselines at the same size, so the scene
  // reads as one page being written rather than three unrelated captions
  line(ctx,S2.line2,cx,190,fade(time,C2_IN,AT["idea"]+.15,.55),
       DESKF,"#23252B",W*.92,56,C2_IN);
  line(ctx,S2.line3,cx,268,fade(time,BA_IN,AT["idea"]+.15,.55),
       DESKF,"#23252B",W*.92,56,BA_IN);
  line(ctx,S2.line4,cx,346,fade(time,BB_IN,AT["idea"]+.15,.55),
       "700 44px 'Space Grotesk', sans-serif","#3D5BD9",W*.92,56,BB_IN);
  ctx.restore();
}

// ─── scene 3: bulb, the three recalls, the lock ─────────────────────
const IDEA_POP=AT["idea"]+.35, IDEA_RAY=AT["idea"]+.55,
      HIT_IN=AT["idea"]+.50,   HIT_OUT=AT["recall-1"]+.20,
      LOCK_HIT=AT["locked"]+LOCK_T, REC_OUT=AT["locked"]+.35;

function drawScene3(time,cam,st){
  const figX=(SEAT_X-cam)*W;
  // scene-3 copy is authored in screen coordinates for the parked camera, so it
  // has to be shifted by however far the camera has moved on, or it stays put
  // while the world slides out from under it
  const px=-(cam-CAM3)*W;
  const bulbA=fade(time,IDEA_POP,AT["recall-1"]+.10,.45);
  if(bulbA>0){
    ctx.save(); ctx.globalAlpha=bulbA;
    drawBulb(ctx,figX+4,HEAD_Y_SIT-104,1.55,
             Math.max(0,(time-IDEA_POP)/.55),
             Math.max(0,Math.min(1,(time-IDEA_RAY)/.75)));
    ctx.restore();
  }
  // the setup sits above the payoff, so reading order matches the order the two
  // lines actually arrive in
  line(ctx,S3.hit,CARD_CX+px,168,fade(time,HIT_IN,HIT_OUT,.5),
       "700 48px 'Space Grotesk', sans-serif","#3D5BD9",1240,58,HIT_IN);

  line(ctx,S3.can,CARD_CX+px,262,fade(time,AT["idea"]+2.05,REC_OUT,.55),
       "700 58px 'Space Grotesk', sans-serif","#23252B",1240,68,AT["idea"]+2.05);
  // footnotes live below the floor line, where annotations belong
  line(ctx,S3.canNote,800+px,862,fade(time,AT["idea"]+2.75,REC_OUT,.55),
       "400 24px 'IBM Plex Mono', monospace","#767C8A",1320,32);
  // the ticks hang into the left margin and the TEXT block is centred under the
  // heading, so both share one centre line. Items step down by their own measured
  // height, so a wrapping line can never land on the next item.
  const RECF="500 38px 'Space Grotesk', sans-serif";
  ctx.save(); ctx.font=RECF;
  const rwrap=RECALLS.map(r=>wrap(ctx,S3[r.key],900));
  const rw=Math.max(...rwrap.flat().map(l=>ctx.measureText(l).width));
  ctx.restore();
  const rlx=CARD_CX+px-rw/2+26;
  let ry=430;
  RECALLS.forEach((r,i)=>{
    const t0=AT[r.lab]+.45, a=fade(time,t0-.15,REC_OUT,.45);
    drawTick(ctx,rlx-52,ry-12,(time-t0+.30)/.45,"#3D5BD9",a);
    typeBlock(ctx,S3[r.key],rlx,ry,Math.max(0,Math.min(1,(time-t0)/1.45)),
      RECF,"#23252B",900,48,a);
    ry+=rwrap[i].length*48+20;
  });

  // impact: short lines flashing off the point where the hands meet
  const im=(time-LOCK_HIT)/.34;
  if(im>=0 && im<1){
    // hip is the figure origin; the hands meet ~31 units forward, ~44 above it
    const S=3.15, hipY=H*.90-48*S+st.pose.dy*S;
    const hx=(st.x-cam)*W+31*S, hy=hipY-44*S;
    ctx.save(); ctx.globalAlpha=(1-im)*.95;
    ctx.strokeStyle="#3D5BD9"; ctx.lineWidth=3; ctx.lineCap="round";
    for(let i=0;i<5;i++){
      const a=(-140+i*35)*Math.PI/180, r0=16+im*16, r1=r0+13;
      ctx.beginPath();
      ctx.moveTo(hx+Math.cos(a)*r0,hy+Math.sin(a)*r0);
      ctx.lineTo(hx+Math.cos(a)*r1,hy+Math.sin(a)*r1);
      ctx.stroke();
    }
    ctx.restore();
  }
  line(ctx,S3.lock,1090+px,412,fade(time,LOCK_HIT,AT["howto"]-.30,.45),
       "700 78px 'Space Grotesk', sans-serif","#3D5BD9",W*.5,90,LOCK_HIT);
}

// ─── scene 5 copy ───────────────────────────────────────────────────
const S5 = {
  watch:"I watched it work closely.",
  test :"And I tested the output (of course).",
  seen :"And that's what I learned.",
  oc   :"And of course...",
  m3   :"Most of this happened at 3am"
};
const WATCH_IN=AT["zoom"]+1.35, TEST_IN=AT["prod"]+.55, SEEN_IN=AT["noticed"]+.95;

// ─── the lessons ────────────────────────────────────────────────────
// Each lesson is a numbered card, an exchange, then what it left behind. Adding
// a third means one more entry here plus three beats, nothing else.
const LESSONS = [
  { num:"ONE", head:"l1head", dlg:"dialog", end:"l1end",
    title:"A line in CLAUDE.md is a wish, not a rule.",
    take:["A wish gets forgotten. A rule gets checked."],
    lines:[
      {who:0, dur:2.0, txt:"Aren't we doing TDD?"},
      {who:1, dur:1.2, txt:"Yes."},
      {who:1, dur:1.9, txt:"Every test passes."},
      {who:0, dur:2.2, txt:"Then why is this bug back?"},
      {who:1, dur:1.6, txt:"Let me fix."},
      // her "No." is written at the same moment, not after: `also` puts a second
      // bubble on the other side of the same beat
      {who:1, dur:2.0, txt:"*vibing*", wave:1, hold:2.2, cut:5/8,
       also:{who:0, txt:"No."}},
      {who:0, dur:2.3, txt:"Do you watch the test fail first?", sad:1},
      {who:1, dur:2.0, txt:"...No. You're right.", sad:1, palm:1},
      {who:1, dur:2.1, txt:"Red first, then green.", palm:1},
      {who:0, dur:2.4, txt:"Let's make it a hard rule.", thumbs:1, hold:2.4}
    ]},
  { num:"TWO", head:"l2head", dlg:"dialog2", end:"l2end",
    title:"It fails silently.",
    take:["Nothing is really \u201Cdone\u201D because it says so.",
          "And when it fails, it has to fail loudly."],
    // no X mouth in this one: it is not being told off, it is working the problem
    lines:[
      {who:0, dur:3.4, txt:"Add to cart succeeded. So why did the evaluator miss the cart?", hip:1},
      {who:1, dur:2.1, txt:"Let me check instead of guess."},
      {who:1, dur:2.4, txt:"*Discombobulating*", think:1},
      {who:1, dur:1.7, txt:"Should be fixed now."},
      {who:0, dur:1.2, txt:"It isn't."},
      {who:1, dur:1.4, txt:"You're right."},
      {who:1, dur:1.9, txt:"Maybe it's the site?", shrug:1},
      {who:0, dur:1.7, txt:"It isn't the site.", smirk:1},
      {who:1, dur:2.5, txt:"You're right to push back on this.", raise:1},
      {who:1, dur:2.7, txt:"It never checked that add to cart worked.", palm:1},
      {who:1, dur:2.7, txt:"It counted a variant click as add to cart.", hip:1},
      {who:0, dur:2.1, txt:"Then nothing was verifying it!"},
      {who:0, dur:2.4, txt:"Every step has to prove it happened."},
      {who:0, dur:3.3, txt:"Let's fix it, and add a Definition of Done gate.",
       note:"Definition of Done: the checklist a change has to pass before it can be committed."}
    ]},
  { num:"THREE", head:"l3head", dlg:"dialog3", end:"l3end",
    title:"From generic to genuine.",
    take:["Your version of the solution is usually better than its solution.",
          "So show it what good looks like before it starts."],
    // near = they close the gap · scr = the screen is up · pt = what she points at
    lines:[
      {who:0, dur:3.6, txt:"I've read the report from this run. I'm not happy with it.", smirk:1},
      {who:1, dur:1.8, txt:"What's wrong?", raise:1},
      {who:0, dur:2.0, txt:"It feels generic.", hip:1},
      {who:0, dur:2.9, txt:"It's missing everything a person would notice."},
      {who:0, dur:2.9, txt:"Let me show you what a real one looks like.", near:1},
      {who:0, dur:3.0, txt:"This blocks the user the second they land.", near:1, scr:1, pt:0},
      {who:0, dur:2.2, txt:"This banner is hideous.", near:1, scr:1, pt:1},
      {who:0, dur:2.7, txt:"And the CTA isn't above the fold.", near:1, scr:1, pt:2, scroll:1},
      {who:0, dur:2.6, txt:"", cap:"and so on", near:1, scr:1, fast:1, scroll:1, rush:1, hold:2.6},
      {who:1, dur:1.4, txt:"Got it.", near:1},
      {who:1, dur:1.2, txt:"*planning*", think:1},
      {who:1, dur:1.1, txt:"*vibing*", think:1},
      {who:1, dur:1.2, txt:"*determining*", think:1},
      {who:1, dur:1.1, txt:"*coding*", think:1},
      {who:1, dur:2.6, txt:"What do you think of this report?", tell:1},
      {who:0, dur:2.0, txt:"Much better."}
    ]}
];
// per-lesson timing, derived from the line durations so retiming one line cannot
// leave a gesture or a mouth behind
// Every line was hand-timed with 30-40% more air than reading needs. Pace them
// from the same model the audit checks against, with a fixed 18% of headroom,
// and the whole film loses a quarter of a minute without a line getting tight.
// Every line had 30-40% more air than reading needs. Pace them from the same
// model the audit checks against, with a fixed 18% of headroom, then shrink each
// dialogue beat to exactly what its exchange takes. A quarter of a minute comes
// back and nothing gets tight.
LESSONS.forEach(L=>{
  L.lines.forEach(l=>{ l.dur=Math.max(l.hold||0,.95,READ(l.txt||l.cap)*1.18) });
  const b=SEQ.find(x=>x.lab===L.dlg);
  if(b) b.dur=+(L.lines.reduce((n,l)=>n+l.dur,0)+.80).toFixed(2);
});
retime();                          // the beats moved, so the map must too
LESSONS.forEach(L=>{
  L.start=AT[L.dlg]+.45;
  L.cum=(n)=>L.start+L.lines.slice(0,n).reduce((a,l)=>a+l.dur,0);
  L.at=(time)=>{ let a=L.start;
    for(let i=0;i<L.lines.length;i++){
      if(time<a+L.lines[i].dur) return {i,t:time-a,line:L.lines[i]};
      a+=L.lines[i].dur }
    return {i:L.lines.length-1,t:9,line:L.lines[L.lines.length-1]} };
  const win=(pred)=>{ let fi=-1,la=-1;
    L.lines.forEach((l,i)=>{ if(pred(l)){ if(fi<0) fi=i; la=i } });
    return fi<0?[Infinity,Infinity]:[L.cum(fi),L.cum(la+1)] };
  [L.palmIn,L.palmOut]=win(l=>l.palm);
  [L.nearIn,L.nearOut]=win(l=>l.near);
  [L.scrIn ,L.scrOut ]=win(l=>l.scr);
  [L.sclIn ,L.sclOut ]=win(l=>l.scroll);
  [L.rushIn,L.rushOut]=win(l=>l.rush);
  [L.thinkIn,L.thinkOut]=win(l=>l.think);
  const pi=L.lines.findIndex(l=>l.pt===0);
  L.popOut = pi<0?Infinity:L.cum(pi+1);
});
// beats run in order, so the live lesson is the last one that has started
const lessonAt=(time)=>{
  for(let i=LESSONS.length-1;i>=0;i--) if(time>=AT[LESSONS[i].head]-.35) return LESSONS[i];
  return LESSONS[0];
};
const SAY_MINE=(time)=>lessonAt(time).at(time).line.who!==1;
const BOT_X=1150;   // he stands here, in screen px

// ─── scene 4: the screen and the prompt ─────────────────────────────
// the headline states what this is, THEN the thing it was done in arrives, THEN
// what was handed to it. The screen used to precede its own caption.
const HEAD_IN=AT["howto"]+.25, MON_IN=AT["howto"]+1.30,
      LBL_IN=AT["howto"]+1.95, L1_IN=AT["hand"]+.35, L2_IN=AT["tdd"]+.35,
      NOTE_IN=AT["tdd"]+1.60;

// the report on screen: cards, chips, a header. Deliberately unlike the code
// block so the cut from "running" to "what it produced" reads without a caption.
function drawReport(g,x0,y0,w,h,alpha){
  if(alpha<=0) return;
  g.save(); g.globalAlpha=alpha;
  g.beginPath(); g.rect(x0,y0,w,h); g.clip();
  const L=(x1,y1,x2,y2,c,lw)=>{g.strokeStyle=c; g.lineWidth=lw; g.lineCap="round";
    g.beginPath(); g.moveTo(x1,y1); g.lineTo(x2,y2); g.stroke()};
  const P=x0+42, IW=w-84;
  L(P,y0+52,P+IW*.44,y0+52,"#3A3D45",11);            // report title
  L(P,y0+80,P+IW*.26,y0+80,"#C9CEDA",6);
  for(let i=0;i<5;i++){                              // the funnel it walked
    const bw=IW*.115, bx=P+i*(bw+IW*.028);
    g.strokeStyle="#B9C0D2"; g.lineWidth=3.4;
    g.strokeRect(bx,y0+104,bw,IW*.045);
  }
  // the middle tag used to be the exact blue the figure is drawn in, so the two
  // read as one object on screen. Amber keeps three distinct tags, no clash.
  const CH=[CLAUDE,"#E0A63C","#9AA3BF"];             // findings, each tagged
  for(let i=0;i<3;i++){
    const cy=y0+164+i*(h*.20);
    g.strokeStyle="#C9CEDA"; g.lineWidth=3.4;
    g.beginPath(); g.roundRect(P,cy,IW,h*.155,10); g.stroke();
    g.fillStyle=CH[i]; g.beginPath(); g.roundRect(P+18,cy+18,IW*.10,16,8); g.fill();
    L(P+18+IW*.13,cy+26,P+IW*(.30+i*.12),cy+26,"#3A3D45",7);
    L(P+18,cy+56,P+IW*(.62-i*.09),cy+56,"#C9CEDA",5);
    L(P+18,cy+76,P+IW*(.44+i*.06),cy+76,"#C9CEDA",5);
  }
  g.restore();
}

function drawScene4(time,cam,st){
  const gy=H*.90, z=st.zoom||0, ez=z*z*(3-2*z);
  // the monitor IS the big screen: same object, interpolated, so the change of
  // scale reads as moving into it rather than cutting to something else
  const monX=(MON_X-cam)*W;
  const ox=monX+(BIG.x-monX)*ez, oy=gy+(BIG.y-gy)*ez, sc=3.15+(BIG.s-3.15)*ez;
  const ma=fade(time,MON_IN,AT["noticed"]+.35,.6);
  drawMonitor(ctx,ox,oy,sc,ma,1-Math.min(1,z*1.6));
  if(z>0){
    const sw=96*sc, sh=68*sc, sx=ox-48*sc, sy=oy-120*sc;
    // the screen shows three things in turn: the chat it came from, the run, then
    // what the run produced
    drawCode(ctx,sx,sy,sw,sh,Math.max(0,time-AT["zoom"]-.6),
             ma*Math.min(1,Math.max(0,(z-.35)/.4))*(1-fade2(time,AT["prod"]-.15,.55)));
    drawReport(ctx,sx,sy,sw,sh, ma*fade(time,AT["prod"]+.10,AT["noticed"]+.25,.55));
  }
  // label the screen before the prompt starts typing, so you know what you are
  // reading a prompt INTO
  const la=fade(time,LBL_IN,null,.42)*(1-ez);
  line(ctx,"Claude Code",monX-150,182,la,
       "500 30px 'IBM Plex Mono', monospace",CLAUDE,460,38);
  drawArrow(ctx,[[monX-146,202],[monX-28,214],[monX-16,356],[monX-78,422]],
    Math.max(0,Math.min(1,(time-LBL_IN-.18)/.85)),CLAUDE,3,la);
  // ── the card: heading, two ticked lines, one footnote ──────────────
  const TX=992, hx=1250;
  const ha=fade(time,HEAD_IN,null,.55)*(1-ez);
  if(ha>0){                                   // same eyebrow rule as the title
    ctx.save(); ctx.globalAlpha=ha;
    const uw=outQuint(Math.min(1,ha*1.3))*62;
    ctx.strokeStyle="#3D5BD9"; ctx.lineWidth=5; ctx.lineCap="round";
    ctx.beginPath(); ctx.moveTo(hx-uw,152); ctx.lineTo(hx+uw,152); ctx.stroke();
    ctx.restore();
  }
  line(ctx,S4.head,hx,214,ha,"700 60px 'Space Grotesk', sans-serif","#23252B",620,70,HEAD_IN);

  ctx.save(); ctx.globalAlpha=1-ez;
  const CHKF="500 34px 'Space Grotesk', sans-serif", CHW=600;
  const chk=[[S4.l1,L1_IN],[S4.l2,L2_IN]];
  ctx.save(); ctx.font=CHKF;
  const cwrap=chk.map(([t])=>wrap(ctx,t,CHW));
  const cw=Math.max(...cwrap.flat().map(l=>ctx.measureText(l).width));
  ctx.restore();
  const clx=hx-cw/2+26;
  let cy=292;
  chk.forEach(([txt,at],i)=>{
    drawTick(ctx,clx-46,cy-10,(time-at)/.45,"#3D5BD9",1-ez);
    line2(ctx,txt,clx,cy,fade(time,at+.20,null,.5)*(1-ez),
          CHKF,"#23252B",CHW,46,at+.20);
    cy+=cwrap[i].length*46+38;
  });
  line(ctx,S4.note,800,862,fade(time,NOTE_IN,null,.5)*(1-ez),
       "400 24px 'IBM Plex Mono', monospace","#767C8A",1320,32);
  ctx.restore();

  if(z<=0) return;
  const sw=96*sc, sh=68*sc, sx=ox-48*sc, sy=oy-120*sc;
  // the glass has to be IN her hand, so its anchor is solved from the pose rather
  // than parked at a constant that drifts the moment the pose changes
  // she is holding the report she is unhappy about, until the screen takes over,
  // and it is back in her hand for the verdict
  {
    const L3=LESSONS[2];
    if(L3 && time>=L3.start-.3 && time<AT[L3.end]+.3){
      const lastAt=L3.cum(L3.lines.length-1);
      const sheetA = fade(time,L3.start-.25,L3.scrIn-.35,.4)
                   + fade(time,lastAt-.15,AT[L3.end]+.25,.4);
      if(sheetA>0){
        const S2s=3.15, fx=(st.x-cam)*W, hy2=gy-48*S2s+st.pose.dy*S2s, hd2=handAtL(st.pose);
        drawSheet(ctx,fx+hd2.x*S2s,hy2+hd2.y*S2s,Math.min(1,sheetA),1.15);
      }
    }
  }
  // the glass belongs to the testing beat only. Watching is not inspecting.
  const S=3.15, figX=(st.x-cam)*W, hipY=gy-48*S+st.pose.dy*S, hd=handAt(st.pose);
  drawGlass(ctx,figX+hd.x*S,hipY+hd.y*S,-0.16,
            fade(time,AT["prod"]+.35,AT["noticed"]+.30,.45),1.6);

  line(ctx,S5.watch,790,112,fade(time,WATCH_IN,TEST_IN-.30,.55),
       "500 42px 'Space Grotesk', sans-serif","#23252B",1400,52,WATCH_IN);
  line(ctx,S5.test,790,112,fade(time,TEST_IN,SEEN_IN-.35,.55),
       "500 42px 'Space Grotesk', sans-serif","#23252B",1400,52,TEST_IN);
  // the last line arrives on the way out, over a stage that is emptying
  // she points at it, so it has to sit to her right rather than over her
  line(ctx,S5.seen,1060,398,fade(time,SEEN_IN,AT["l1head"]+.30,.55),
       "700 58px 'Space Grotesk', sans-serif","#3D5BD9",900,70,SEEN_IN);
}

// ─── the page on screen for the walkthrough ─────────────────────────
// Page-space layout, taller than the screen so there is a fold to be below.
const PAGE = {
  h:2000,
  banner:{x:.045, y:336, w:.91, h:64},
  cta:   {x:.40, y:706, w:.22, h:58}
};
function drawPage(g,x0,y0,w,h,scroll,pop,alpha){
  if(alpha<=0) return;
  g.save(); g.globalAlpha=alpha;
  g.beginPath(); g.rect(x0,y0,w,h); g.clip();
  g.translate(0,-scroll);
  const L=(x1,y1,x2,y2,c,lw)=>{g.strokeStyle=c; g.lineWidth=lw; g.lineCap="round";
    g.beginPath(); g.moveTo(x0+x1,y0+y1); g.lineTo(x0+x2,y0+y2); g.stroke()};
  const box=(x,y,ww,hh,c,fill)=>{ g.beginPath(); g.roundRect(x0+x,y0+y,ww,hh,8);
    if(fill){ g.fillStyle=c; g.fill() } else { g.strokeStyle=c; g.lineWidth=3.4; g.stroke() } };
  L(.05*w,30,.30*w,30,"#3A3D45",9);                     // logo
  [.62,.72,.82,.92].forEach(f=>L(f*w,30,f*w+38,30,"#C9CEDA",5));
  box(.05*w,66,w*.90,150,"#E7E9F0",true);               // hero
  L(.05*w,250,.62*w,250,"#3A3D45",10);
  L(.05*w,286,.44*w,286,"#C9CEDA",6);
  box(PAGE.banner.x*w,PAGE.banner.y,w*PAGE.banner.w,PAGE.banner.h,"#FF3D8B",true);
  for(let i=0;i<5;i++) L(.05*w,450+i*34,(.05+.62-i*.07)*w,450+i*34,"#C9CEDA",5);
  box(PAGE.cta.x*w,PAGE.cta.y,w*PAGE.cta.w,PAGE.cta.h,"#3D5BD9",true);
  // the fast scroll used to run off the end of the page and leave a blank
  // screen, so the tail keeps going well past where it can get to
  const rnd=(i)=>{const v=Math.sin(i*12.9898)*43758.5453; return v-Math.floor(v)};
  for(let i=0;i<34;i++){
    const y=806+i*34;
    L(.05*w,y,(.05+.20+rnd(i)*.46)*w,y,"#C9CEDA",5);
    if(i%9===4) box(.05*w,y+12,w*.90,120,"#E7E9F0",true);
  }
  g.translate(0,scroll);
  if(pop>0){                                            // the interstitial
    g.globalAlpha=alpha*pop;
    const pw=w*.46, ph=h*.34, px=x0+(w-pw)/2, py=y0+(h-ph)/2;
    g.beginPath(); g.rect(x0,y0,w,h); g.fillStyle="rgba(35,37,43,.28)"; g.fill();
    g.beginPath(); g.roundRect(px,py,pw,ph,12); g.fillStyle="#FBFBFA"; g.fill();
    g.strokeStyle="#9AA3BF"; g.lineWidth=3.4; g.stroke();
    g.strokeStyle="#767C8A"; g.lineWidth=3;
    g.beginPath(); g.moveTo(px+pw-34,py+22); g.lineTo(px+pw-18,py+38);
    g.moveTo(px+pw-18,py+22); g.lineTo(px+pw-34,py+38); g.stroke();
    g.strokeStyle="#3A3D45"; g.lineWidth=8; g.lineCap="round";
    g.beginPath(); g.moveTo(px+34,py+ph*.42); g.lineTo(px+pw*.66,py+ph*.42); g.stroke();
    g.strokeStyle="#C9CEDA"; g.lineWidth=5;
    g.beginPath(); g.moveTo(px+34,py+ph*.60); g.lineTo(px+pw*.48,py+ph*.60); g.stroke();
  }
  g.restore();
}
// what she is pointing at, in screen coords, given the scroll
function pointRect(i,x0,y0,w,h,scroll){
  if(i===0){ const pw=w*.46, ph=h*.34; return [x0+(w-pw)/2,y0+(h-ph)/2,pw,ph] }
  const r = i===1 ? PAGE.banner : PAGE.cta;
  return [x0+r.x*w, y0+r.y-scroll, w*r.w, r.h];
}
function drawMark(g,r,alpha,clip){
  if(alpha<=0) return;
  g.save(); g.globalAlpha=alpha;
  if(clip){ g.beginPath(); g.rect(clip[0],clip[1],clip[2],clip[3]); g.clip() }
  g.strokeStyle="#3D5BD9"; g.lineWidth=4; g.setLineDash([13,9]);
  g.beginPath(); g.roundRect(r[0]-9,r[1]-9,r[2]+18,r[3]+18,10); g.stroke();
  g.restore();
}

// ─── 3am ────────────────────────────────────────────────────────────
const vid=document.getElementById("v");
const M0=()=>AT["meme"], MU=()=>AT["memeup"];
// he comes back for the middle of it and leaves again
const BOT_IN=()=>M0()+HE_ARRIVES, BOT_DANCE=()=>M0()+HE_DANCE;

// the clip follows the timeline rather than the wall clock, so a paused scrub
// shows the right frame instead of wherever playback happened to be
function syncMeme(time){
  if(!vid || vid.readyState<1) return;
  const local=time-M0();
  if(local<0 || time>MU()+1.2){ if(!vid.paused) vid.pause(); return }
  // the TikTok end card starts around 52.5s, so the clip is clamped short of it
  const CLIP_END=51.6;
  const want=Math.min(CLIP_END,CLIP_START+local);   // plays once, never restarts
  if(playing){ if(vid.paused) vid.play().catch(()=>{        // blocked unmuted
      vid.muted=true; vid.play().catch(()=>{});
      const b=document.getElementById("mute");
      b.textContent="Unmute clip"; b.classList.remove("on") });
    if(Math.abs(vid.currentTime-want)>0.35) vid.currentTime=want }
  else { vid.pause(); if(Math.abs(vid.currentTime-want)>0.05) vid.currentTime=want }
}

function drawMeme(time,cam){
  const gy=H*.90, S=3.15;
  const a1=fade(time,AT["tomeme"]+.10,null,.5);
  if(a1<=0) return;
  // it lifts and fades on her sweep rather than simply switching off
  const up=ease(Math.max(0,Math.min(1,(time-MU()-.35)/1.7)));
  const al=a1*(1-up);
  if(al>0){
    // it slides in from off frame right, since the camera no longer moves
    const arrive=ease(Math.max(0,Math.min(1,(time-AT["tomeme"]-.25)/1.35)));
    const cx=(MEME_W-cam)*W+(1-arrive)*980, sw=MEME.w, sh=MEME.h;
    const sx=cx-sw/2, sy=MEME.cy-sh/2-up*600;
    ctx.save(); ctx.globalAlpha=al;
    ctx.fillStyle="#111318"; ctx.fillRect(sx,sy,sw,sh);
    if(vid && vid.readyState>=2){
      const vr=vid.videoWidth/vid.videoHeight, fr=sw/sh;   // cover-fit, no letterbox
      let dw=sw, dh=sh, ox=0, oy=0;
      if(vr>fr){ dw=sh*vr; ox=(sw-dw)/2 } else { dh=sw/vr; oy=(sh-dh)/2 }
      ctx.save(); ctx.beginPath(); ctx.rect(sx,sy,sw,sh); ctx.clip();
      ctx.drawImage(vid,sx+ox,sy+oy,dw,dh); ctx.restore();
    }
    ctx.strokeStyle="#C9CEDA"; ctx.lineWidth=2.5; ctx.strokeRect(sx,sy,sw,sh);
    ctx.restore();
  }

  // he joins late and leaves on her sweep, not before it
  const OUT0=MU()+.30, OUT1=MU()+2.1;
  if(time>=BOT_IN()-.1 && time<OUT1+.3){
    let bx, mirror=false, bp;
    const arrivedAt=M0()+HE_HERE;
    if(time<arrivedAt){
      const q=ease(Math.min(1,(time-BOT_IN())/(arrivedAt-BOT_IN())));
      bx=1760+(1430-1760)*q; mirror=true;
    }else if(time<OUT0){ bx=1430 }
    else{ bx=1430+(1780-1430)*ease(Math.min(1,(time-OUT0)/(OUT1-OUT0))) }
    const tl=time-M0();
    if(time<M0()+HE_DANCE && time>=arrivedAt){
      // takes in the screen, then her, then turns to us and shrugs
      if(tl<HE_TOHER){ bp={...POSES["bot-watch"], h:-14}; mirror=true }
      else if(tl<HE_SHRUG){ bp={...POSES["bot-watch"], h:2}; mirror=true }
      else bp=mix(POSES["bot-idle"],POSES["bot-shrug"],
                  ease(Math.min(1,(tl-HE_SHRUG)/.5)));
    }else if(time>=BOT_DANCE() && time<OUT0){
      const b2=(time-BOT_DANCE()+DANCE_LEAD)/BEAT, k=Math.floor(b2)%DANCE.length;
      const snap=Math.min(1,(b2-Math.floor(b2))*2.3);
      bp=mix(POSES[DANCE[k]],POSES[DANCE[(k+1)%DANCE.length]],snap);
      bp={...bp, f:1, dy:bp.dy-Math.abs(Math.sin(Math.PI*b2))*3.5};
    }else{
      bp=stridePose(Math.abs(bx-1720));   // his pace follows his own travel too
    }
    // the dance poses are profile-right; she is on his left, so he is mirrored
    // for the dance as well as the walk in
    const flip = mirror || (time>=BOT_DANCE() && time<OUT0);
    ctx.save(); ctx.globalAlpha=fade(time,BOT_IN()-.1,OUT1+.2,.3);
    if(flip){ ctx.translate(bx,0); ctx.scale(-1,1); ctx.translate(-bx,0) }
    drawFigure(ctx,bp,bx,gy-48*S,S,CLAUDE,true);
    ctx.restore();
  }

  // one sentence, written in two goes: the aside rises to the top and settles,
  // then the rest of the line is typed alongside it rather than under the clip
  {
    const OCF="500 46px 'Space Grotesk', sans-serif";
    ctx.save(); ctx.font=OCF;
    const wOC=ctx.measureText(S5.oc+"  ").width;
    const wTot=wOC+ctx.measureText(S5.m3).width;
    ctx.restore();
    const ox=800-wTot/2, ocIn=AT["tomeme"]+.20, m3In=M0()+.35, gone=MU()+1.20;
    const oy=152+(104-152)*ease(Math.max(0,Math.min(1,(time-(ocIn+.75))/.65)));
    line2(ctx,S5.oc,ox,oy,fade(time,ocIn,gone,.35),OCF,"#23252B",900,56,ocIn);
    line2(ctx,S5.m3,ox+wOC,oy,fade(time,m3In,gone,.35),OCF,"#23252B",900,56,m3In);
  }
  line(ctx,"Now let's see what got built.",950,430,
       fade(time,MU()+1.35,AT["f1"]-.55,.55),
       "700 58px 'Space Grotesk', sans-serif","#3D5BD9",1100,70,MU()+1.35);
}

// ─── what got built ─────────────────────────────────────────────────
// Five closing beats. She presents; the pictures are the real report, not
// mock-ups, so nothing here can drift away from what the tool actually does.
const CHAIN_PAD=34;
const CHAIN_B="500 27px 'Space Grotesk', sans-serif";
const CHAIN_L="500 22px 'IBM Plex Mono', monospace";
const CHAIN_S="400 21px 'IBM Plex Mono', monospace";
const CHAIN=[
  {lab:"ROOT CAUSE",
   txt:"Promo code requires manual entry, with no auto-apply in the funnel.",
   sub:"P1 \u00b7 Anchoring \u00b7 homepage, collection, product"},
  {lab:"PROBLEM",
   txt:"The CTA reads 'SHOP NOW WITH CODE JOLLY' but never says it gets applied for you."},
  {lab:"HYPOTHESIS",
   txt:"If the code is applied on click, and the button says so, more people finish checkout."},
  {lab:"EXPERIMENT",
   txt:"Auto-apply JOLLY on click, and put 'no code needed' under the CTA.",
   sub:"Metric: checkout completion rate \u00b7 Effort: medium"}
];
// one card of the chain, with the link down to whatever comes next
function chainCard(g,x,y,w,c,lines,h,alpha,at,linkA){
  if(alpha<=0) return;
  g.save(); g.globalAlpha=alpha;
  g.translate(0,(1-outQuint(alpha))*14);
  g.beginPath(); g.roundRect(x,y,w,h,12);
  g.fillStyle="#F2F1EC"; g.fill();
  g.strokeStyle="#DEDCD3"; g.lineWidth=2.4; g.stroke();
  g.beginPath(); g.roundRect(x+5,y+11,6,h-22,3);
  g.fillStyle="#3D5BD9"; g.fill();
  if(linkA>0){                    // the link down to the next one
    g.globalAlpha=linkA*.5;
    g.strokeStyle="#9AA3BF"; g.lineWidth=2.6; g.lineCap="round";
    const mx=x+w/2;
    g.beginPath(); g.moveTo(mx,h+y+4); g.lineTo(mx,h+y+15);
    g.moveTo(mx-6,h+y+9); g.lineTo(mx,h+y+16); g.lineTo(mx+6,h+y+9);
    g.stroke();
  }
  g.restore();
  line2(g,c.lab,x+CHAIN_PAD,y+38,alpha,CHAIN_L,"#3D5BD9",700,28,at);
  line2(g,c.txt,x+CHAIN_PAD,y+74,alpha,CHAIN_B,"#23252B",
        w-CHAIN_PAD*2-14,34,at+.28);
  if(c.sub)
    line2(g,c.sub,x+CHAIN_PAD,y+74+lines.length*34+8,alpha,CHAIN_S,"#6A7080",
          w-CHAIN_PAD*2,28,at+.62);
}
const S6={
  t1:"It walks the funnel like a shopper.",
  c2:"If a step fails, it says so and tries another product.",
  t2:"Every finding is a chain.",
  t3:"Under the hood",
  t3b:"4 agents",
  det:"Rule-based checks",
  detc:"Speed, forms, links, alt text. Measured, never judged.",
  t4:"Same page in, same findings out.",
  c4a:"Ask an AI the same thing twice: two different answers.",
  c4b:"Not this one. The labels come from code, not the model.",
  c4c:"Verified across 12 runs.",
  end:"That's all, folks."
};
// The real strip is in the report, but its labels render at about ten pixels
// here, so the funnel is drawn instead. The step names are the report's own.
const FSTEPS=["homepage","collection","product","cart","checkout"];
const FB={x0:428, y:440, w:192, h:78, gap:44};
const fbX=(i)=>FB.x0+i*(FB.w+FB.gap);
function funnelStep(g,i,alpha){
  if(alpha<=0) return;
  const x=fbX(i);
  g.save(); g.globalAlpha=alpha;
  g.translate(0,(1-outQuint(alpha))*18);
  if(i>0){                       // the arrow arrives with the step it points at
    g.strokeStyle="#9AA3BF"; g.lineWidth=3; g.lineCap="round"; g.lineJoin="round";
    const ax=x-FB.gap/2, ay=FB.y+FB.h/2;
    g.beginPath(); g.moveTo(ax-15,ay); g.lineTo(ax+12,ay);
    g.moveTo(ax+3,ay-8); g.lineTo(ax+12,ay); g.lineTo(ax+3,ay+8); g.stroke();
  }
  g.beginPath(); g.roundRect(x,FB.y,FB.w,FB.h,12);
  g.fillStyle="#F2F1EC"; g.fill();
  g.strokeStyle="#DEDCD3"; g.lineWidth=2.6; g.stroke();
  g.restore();
  line(g,FSTEPS[i],x+FB.w/2,FB.y+FB.h/2+11,alpha,
       "700 30px 'Space Grotesk', sans-serif","#23252B",FB.w-20,36,null);
}
// twelve identical little findings. The repetition IS the point, so every card
// is drawn from the same numbers.
function miniCard(g,x,y,w,h,alpha){
  if(alpha<=0) return;
  g.save(); g.globalAlpha=alpha;
  g.translate(0,(1-outQuint(alpha))*10);
  g.beginPath(); g.roundRect(x,y,w,h,8);
  g.fillStyle="#F2F1EC"; g.fill();
  g.strokeStyle="#DEDCD3"; g.lineWidth=2; g.stroke();
  [["#E8833A",26],["#3D5BD9",22],["#E8833A",30]].forEach(([col,pw],i)=>{
    const ry=y+16+i*24;
    g.beginPath(); g.roundRect(x+11,ry,pw,9,4.5); g.fillStyle=col; g.fill();
    g.beginPath(); g.roundRect(x+11+pw+7,ry+1,w-pw-29,7,3.5);
    g.fillStyle="#C9CEDA"; g.fill();
  });
  g.restore();
}
function cart(g,cx,gy,sc,fill){
  g.save(); g.translate(cx,gy); g.scale(sc,sc);
  g.strokeStyle=CLAUDE; g.lineWidth=2.6; g.lineCap="round"; g.lineJoin="round";
  g.beginPath(); g.moveTo(-13,-22); g.lineTo(15,-22); g.lineTo(11,-6);
  g.lineTo(-9,-6); g.closePath();
  g.fillStyle="#FBFBFA"; g.fill(); g.stroke();
  g.beginPath(); g.moveTo(-13,-22); g.lineTo(-19,-28); g.stroke();
  [[-6,-2],[8,-2]].forEach(([wx,wy])=>{ g.beginPath(); g.arc(wx,wy,3.2,0,7);
    g.fillStyle=CLAUDE; g.fill() });
  for(let i=0;i<fill;i++){ g.beginPath();
    g.arc(-6+i*6.5,-12-(i%2)*4,3.4,0,7); g.fillStyle=CLAUDE; g.fill() }
  g.restore();
}
function icon(g,kind,cx,cy,alpha){
  g.save(); g.globalAlpha=alpha; g.translate(cx,cy);
  g.strokeStyle="#3D5BD9"; g.fillStyle="#3D5BD9";
  g.lineWidth=3; g.lineCap="round"; g.lineJoin="round";
  if(kind==="eye"){                                   // Observer: it looks
    g.beginPath(); g.moveTo(-24,0); g.quadraticCurveTo(0,-18,24,0);
    g.quadraticCurveTo(0,18,-24,0); g.closePath(); g.stroke();
    g.beginPath(); g.arc(0,0,6.5,0,7); g.fill();
  }else if(kind==="scale"){                           // Evaluator: it judges
    g.beginPath(); g.moveTo(0,-18); g.lineTo(0,16); g.stroke();
    g.beginPath(); g.moveTo(-22,-12); g.lineTo(22,-12); g.stroke();
    g.beginPath(); g.moveTo(-12,16); g.lineTo(12,16); g.stroke();
    [-22,22].forEach(x=>{ g.beginPath(); g.moveTo(x-9,-2); g.lineTo(x,-12);
      g.lineTo(x+9,-2); g.stroke() });
  }else if(kind==="cluster"){                         // Diagnose: many into one
    g.lineWidth=2.8;
    [[-11,-6],[11,-6],[0,10]].forEach(([x,y])=>{ g.beginPath();
      g.arc(x,y,11.5,0,7); g.stroke() });
  }else if(kind==="list"){                            // deterministic: it counts
    for(let i=0;i<3;i++){ const y=-14+i*14;
      g.beginPath(); g.moveTo(-22,y-3); g.lineTo(-16,y+3); g.lineTo(-6,y-9);
      g.stroke();
      g.beginPath(); g.moveTo(2,y); g.lineTo(24,y); g.stroke() }
  }
  g.restore();
}

const F=(k)=>AT[k];
function drawFinale(time){
  if(time<F("f1")-.8) return;
  const CX=1000;
  const TT="700 54px 'Space Grotesk', sans-serif";
  const BODY="400 34px 'IBM Plex Mono', monospace";

  // ── 1. it walks the funnel ──
  {
    const t0=F("f1"), out=F("f2")-.25, a=fade(time,t0,out,.5);
    if(a>0){
      line(ctx,S6.t1,CX,132,a,TT,"#23252B",980,64,t0);
      const IY=FB.y, IX=FB.x0, ih=FB.h;
      // he arrives at a step and the step appears. The cue times are solved from
      // his own travel, so the reveal cannot drift if the walk is retimed.
      const W1=t0+1.10, WDU=9.0, S0=1.25, TRV0=911, X00=IX+32;
      const segAt=(i)=>Math.max(W1,W1+WDU*((fbX(i)-48*S0-X00)/TRV0));
      for(let i=0;i<5;i++)
        funnelStep(ctx,i,fade(time,segAt(i),out,.30));
      const ia=fade(time,W1,out,.5);
      // a small Claude walks the strip, dropping things in the cart as it goes
      const W0=W1, WD=WDU, u=Math.max(0,Math.min(1,(time-W0)/WD));
      if(ia>0 && time>W0-.2){
        // a small figure steps quicker than the hero does, which is also what
        // keeps the feet planted: 40.5 units of stride at S, one stride per cycle
        const S=S0, X0=X00, TRV=TRV0, CYC=0.50, bx=X0+u*TRV;
        const pz=stridePose(Math.max(0,(time-W0))/CYC*40.5*3.15);
        ctx.save(); ctx.globalAlpha=ia;
        drawFigure(ctx,pz,bx,IY-48*S,S,CLAUDE,true);
        const cx2=bx+48*S;
        cart(ctx,cx2,IY,1.47*S,Math.min(3,Math.floor((time-W0-1.2)/2.3)+1));
        // things arc off the shelves into it
        [1.8,4.1,6.4].forEach((lt,i)=>{
          const p2=(time-W0-lt)/.75; if(p2<0||p2>1) return;
          const sx=X0+(u*TRV)-44+i*4, sy=IY-112*S;
          const ex=cx2, ey=IY-22*S;
          ctx.beginPath();
          ctx.arc(sx+(ex-sx)*p2, sy+(ey-sy)*p2-58*Math.sin(Math.PI*p2),5,0,7);
          ctx.fillStyle=CLAUDE; ctx.fill();
        });
        ctx.restore();
      }
      const c2=t0+5.2;
      line(ctx,S6.c2,
           CX,IY+ih+62,fade(time,c2,out,.5),BODY,"#6A7080",1150,44,c2);
    }
  }

  // ── 2. the chain, drawn ──
  // The report's own words, set in the film's own hand. A screenshot of the card
  // could not be read at this size and made the beat a picture of a thing rather
  // than the thing itself.
  {
    const t0=F("f2"), out=F("f3")-.25, a=fade(time,t0,out,.5);
    if(a>0){
      line(ctx,S6.t2,CX,110,a,TT,"#23252B",1100,64,t0);
      const CX0=430, CW=1130, GAP=22, TOP=178, FLOOR=806;
      // measure every card first, then centre the stack in the band it has, so a
      // line that wraps one further can never push the last card past the floor
      ctx.save(); ctx.font=CHAIN_B;
      const wrapped=CHAIN.map(c=>wrap(ctx,c.txt,CW-CHAIN_PAD*2-14));
      ctx.restore();
      const hs=wrapped.map((ls,i)=>18+26+12+ls.length*34+(CHAIN[i].sub?30:0)+18);
      const total=hs.reduce((n,h)=>n+h,0)+GAP*3;
      let y=TOP+Math.max(0,((FLOOR-TOP)-total)/2);
      const ats=CHAIN.map((c,i)=>t0+1.1+i*2.15);
      const als=ats.map(at=>fade(time,at,out,.45));
      CHAIN.forEach((c,i)=>{
        // the link belongs to what it points AT, or it hangs there aiming at
        // an empty stage for two seconds
        chainCard(ctx,CX0,y,CW,c,wrapped[i],hs[i],als[i],ats[i],
                  i<3?als[i+1]:0);
        y+=hs[i]+GAP;
      });
    }
  }

  // ── 3. under the hood ──
  {
    const t0=F("f3"), out=F("f4")-.25, a=fade(time,t0,out,.5);
    if(a>0){
      line(ctx,S6.t3,CX,124,a,TT,"#23252B",980,64,t0);
      line(ctx,S6.t3b,CX,172,fade(time,t0+.5,out,.5),
           "400 27px 'IBM Plex Mono', monospace","#6A7080",900,34,t0+.5);
      const CARDS=[["eye","Observer","Takes notes. Never verdicts."],
                   ["scale","Evaluator","Judges from the notes alone."],
                   ["cluster","Diagnose","Groups problems into root causes."],
                   ["cluster","Recommend","One experiment per fix."]];
      const X0=436, CW=252, GAP=28, CH=252, CY=268;
      CARDS.forEach(([ic,name,copy],i)=>{
        const at=t0+1.0+i*.75, ca=fade(time,at,out,.45);
        if(ca<=0) return;
        const x=X0+i*(CW+GAP);
        ctx.save(); ctx.globalAlpha=ca;
        ctx.translate(0,(1-outQuint(ca))*14);
        ctx.beginPath(); ctx.roundRect(x,CY,CW,CH,16);
        ctx.fillStyle="#F2F1EC"; ctx.fill();
        ctx.strokeStyle="#DEDCD3"; ctx.lineWidth=2.4; ctx.stroke();
        ctx.restore();
        if(i===3) drawBulb(ctx,x+CW/2,CY+80,.95,Math.min(1,(time-at)/.5),0);
        else icon(ctx,ic,x+CW/2,CY+66,ca);
        line(ctx,name,x+CW/2,CY+140,ca,
             "700 30px 'Space Grotesk', sans-serif","#23252B",CW-26,38,at);
        line(ctx,copy,x+CW/2,CY+180,ca,
             "400 21px 'IBM Plex Mono', monospace","#6A7080",CW-30,28,at+.25);
        if(i<3){ ctx.save(); ctx.globalAlpha=ca*.5;
          ctx.strokeStyle="#9AA3BF"; ctx.lineWidth=2.6; ctx.lineCap="round";
          const ax=x+CW+GAP/2, ay=CY+CH/2;
          ctx.beginPath(); ctx.moveTo(ax-8,ay); ctx.lineTo(ax+7,ay);
          ctx.moveTo(ax+1,ay-6); ctx.lineTo(ax+7,ay); ctx.lineTo(ax+1,ay+6);
          ctx.stroke(); ctx.restore() }
      });
      const dAt=t0+4.6, da=fade(time,dAt,out,.5), DY=566;
      if(da>0){
        ctx.save(); ctx.globalAlpha=da;
        ctx.translate(0,(1-outQuint(da))*14);
        ctx.beginPath(); ctx.roundRect(X0,DY,4*CW+3*GAP,148,16);
        ctx.fillStyle="#F2F1EC"; ctx.fill();
        ctx.strokeStyle="#DEDCD3"; ctx.lineWidth=2.4; ctx.stroke();
        ctx.restore();
        icon(ctx,"list",X0+78,DY+74,da);
        line2(ctx,S6.det,X0+150,DY+58,da,
              "700 32px 'Space Grotesk', sans-serif","#23252B",760,40,dAt);
        line2(ctx,S6.detc,
              X0+150,DY+104,da,"400 24px 'IBM Plex Mono', monospace",
              "#6A7080",800,32,dAt+.3);
      }
    }
  }

  // ── 4. the half that measures ──
  {
    const t0=F("f4"), out=F("f5")-.25, a=fade(time,t0,out,.5);
    if(a>0){
      line(ctx,S6.t4,CX,124,a,TT,"#23252B",1150,64,t0);
      // one page on the left, twelve identical result sets on the right
      const pa=fade(time,t0+.9,out,.45), PX=452, PY=266, PW=132, PH=168;
      if(pa>0){
        ctx.save(); ctx.globalAlpha=pa;
        ctx.translate(0,(1-outQuint(pa))*12);
        ctx.beginPath(); ctx.roundRect(PX,PY,PW,PH,10);
        ctx.fillStyle="#F2F1EC"; ctx.fill();
        ctx.strokeStyle="#DEDCD3"; ctx.lineWidth=2.4; ctx.stroke();
        ctx.strokeStyle="#C9CEDA"; ctx.lineWidth=3; ctx.lineCap="round";
        [0,1,2,3,4].forEach(i=>{ ctx.beginPath();
          ctx.moveTo(PX+18,PY+34+i*26);
          ctx.lineTo(PX+PW-(i===4?58:18),PY+34+i*26); ctx.stroke() });
        ctx.restore();
        line(ctx,"one page",PX+PW/2,PY+PH+42,pa,
             "400 24px 'IBM Plex Mono', monospace","#6A7080",240,32,t0+.9);
        ctx.save(); ctx.globalAlpha=pa*.6;
        ctx.strokeStyle="#9AA3BF"; ctx.lineWidth=2.8; ctx.lineCap="round";
        const ax=PX+PW+46, ay=PY+PH/2;
        ctx.beginPath(); ctx.moveTo(ax-22,ay); ctx.lineTo(ax+18,ay);
        ctx.moveTo(ax+8,ay-9); ctx.lineTo(ax+18,ay); ctx.lineTo(ax+8,ay+9);
        ctx.stroke(); ctx.restore();
      }
      const GX=700, GY=258, GW=112, GH=92, GG=14;
      for(let i=0;i<12;i++)
        miniCard(ctx,GX+(i%6)*(GW+GG),GY+Math.floor(i/6)*(GH+20),GW,GH,
                 fade(time,t0+1.6+i*.14,out,.30));
      const gA=t0+3.6;
      line(ctx,S6.c4c,GX+(6*GW+5*GG)/2,GY+2*GH+20+52,fade(time,gA,out,.45),
           "400 26px 'IBM Plex Mono', monospace","#6A7080",760,34,gA);
      const cA=t0+4.4, cB=t0+7.0;
      line(ctx,S6.c4a,CX,644,fade(time,cA,out,.5),BODY,"#6A7080",1180,44,cA);
      line(ctx,S6.c4b,CX,706,fade(time,cB,out,.5),BODY,"#6A7080",1180,44,cB);
    }
  }

  // ── 5. curtain ──
  {
    const t0=F("f5"), a=fade(time,t0+5.05,null,.6);
    if(a>0)
      line(ctx,S6.end,720,215,a,
           "700 92px 'Space Grotesk', sans-serif","#3D5BD9",1000,104,t0+5.05);
    // he comes on from the right for the bow, walking the way he always walks
    const gy=H*.90, S=3.15;
    const arr=Math.max(0,Math.min(1,(time-t0)/4.50));
    if(time>=t0-.1){
      const dist=arr*820, bx=1700-dist;   // starts off frame, same 0.35s stride
      const waving=Math.max(0,Math.min(1,(time-t0-4.85)/.45))
                  *(1-Math.max(0,Math.min(1,(time-t0-8.20)/.55)));
      const bw={...POSES["bot-wave"]};
      bw.ar2=150+38*((Math.sin((time-t0)*4.6*Math.PI)+1)/2);
      const pz = arr<1 ? stridePose(dist)
                       : mix(POSES["bot-idle"],bw,waving);
      ctx.save();
      if(arr<1){ ctx.translate(bx,0); ctx.scale(-1,1); ctx.translate(-bx,0) }
      drawFigure(ctx,pz,bx,gy-48*S,S,CLAUDE,true);
      ctx.restore();
    }
  }
}

// ─── the lessons, drawn ─────────────────────────────────────────────
// the report she is unhappy about, held in her hand. Anchored off the pose the
// same way the magnifier is, so it stays in the hand when the arm moves.
function drawSheet(g,hx,hy,alpha,sc){
  if(alpha<=0) return;
  g.save(); g.globalAlpha=alpha; g.translate(hx,hy); g.rotate(.13); g.scale(sc,sc);
  g.beginPath(); g.roundRect(-4,-46,48,62,4);
  g.fillStyle="#FBFBFA"; g.fill();
  g.strokeStyle="#9AA3BF"; g.lineWidth=2.6; g.stroke();
  g.strokeStyle="#C9CEDA"; g.lineWidth=2.2; g.lineCap="round";
  [[-34,30],[-26,36],[-18,22],[-10,32],[-2,26]].forEach(([y,w2])=>{
    g.beginPath(); g.moveTo(4,y+10); g.lineTo(4+w2,y+10); g.stroke() });
  g.restore();
}

function drawLessons(time){
  const gy=H*.90, S=3.15;
  const first=AT[LESSONS[0].head];
  if(time<first-.6) return;
  const LV=lessonAt(time), dv=LV.at(time);

  // the walkthrough screen. Drawn first so both figures stand in front of it.
  const scrA=fade(time,LV.scrIn,LV.scrOut,.55);
  // a steady scroll while she works through it, then it runs away during the
  // "and so on" beat: the page motion is what makes the montage read
  const scl=300*ease(Math.max(0,Math.min(1,(time-LV.sclIn)/1.8)))
          + 520*ease(Math.max(0,Math.min(1,(time-LV.rushIn)/1.5)));
  if(scrA>0){
    const sc=BIG.s, sw=96*sc, sh=68*sc, sx=BIG.x-48*sc, sy=BIG.y-120*sc;
    drawMonitor(ctx,BIG.x,BIG.y,sc,scrA,0);
    drawPage(ctx,sx,sy,sw,sh,scl,1-fade2(time,LV.popOut,.45),scrA);
    if(dv.line.pt!=null)
      drawMark(ctx,pointRect(dv.line.pt,sx,sy,sw,sh,scl),
               scrA*Math.min(1,dv.t/.4),[sx,sy,sw,sh]);
    // her aside sits above the screen as a caption, not in her mouth
    // between the two of them, blinking twice, so it reads as an aside rather
    // than another caption competing with the lesson title
    if(dv.line.cap){
      line(ctx,dv.line.cap,807,470,scrA*Math.min(1,dv.t/.25),
           "700 52px 'Space Grotesk', sans-serif","#23252B",520,60);
    }
  }

  // it walks on from the right for its first appearance. The rig has no
  // profile-LEFT, so the figure is mirrored about its own x while walking and
  // drawn normally once it turns to face the room.
  const IN0=first+.35, IN1=first+1.75;
  const walkIn = time>=IN0 && time<IN1;
  const wp = walkIn ? (time-IN0)/(IN1-IN0) : 1;
  // he watches from where he stands. Walking him over crowded her and put him in
  // front of the very thing she was pointing at.
  const nearA=fade(time,LV.nearIn,LV.nearOut,.7);
  const botX = walkIn ? 1700+(BOT_X-1700)*(1-Math.pow(1-wp,2.2)) : BOT_X;

  const ba=fade(time,first+.30,AT["tomeme"]+.20,.4);
  let botFlip=false;
  if(ba>0){
    const L0=lessonAt(time), d0=L0.at(time), mine=d0.line.who===0;
    const inChat = time>=L0.start && time<AT[L0.end];
    const talking = inChat && !mine;
    let bp=POSES["bot-idle"];
    if(talking) bp=mix(bp,POSES["bot-talk"],.16+((Math.sin(time*3.4)+1)/2)*.28);
    // the face falls AND the hand comes down the instant her "No." finishes
    // being written, not when the line began
    const alsoAt = d0.line.also ? ALSO_LAG+d0.line.also.txt.length/46+.15 : null;
    const alsoDone = alsoAt!=null && d0.t>alsoAt;
    if(inChat && d0.line.wave){                    // oblivious, mid-wave
      const w=(Math.sin(d0.t*15)+1)/2;
      const caught=alsoDone ? Math.max(0,1-(d0.t-alsoAt)/.26) : 1;
      bp=mix(bp,POSES["bot-wave"],Math.min(1,d0.t/.16)*caught);
      bp={...bp, ar2:bp.ar2-w*26*caught, dy:bp.dy-w*1.6*caught};
    }
    // the hand goes to its chin once and stays there for the whole run, rather
    // than swinging up and down on every status word
    const thk=fade(time,L0.thinkIn,L0.thinkOut,.45);
    if(thk>0){
      bp=mix(bp,POSES["bot-think"],thk);
      bp={...bp, mouth:"think", h:bp.h+Math.sin(time*1.1)*2.4};
    }
    if(inChat && d0.line.thumbs)
      bp=mix(bp,POSES["bot-thumb"],Math.min(1,Math.max(0,(d0.t-.5)/.45)));
    if(inChat && d0.line.tell){
      const inR=Math.min(1,d0.t/.5);
      const outR=1-Math.max(0,Math.min(1,(d0.t-(d0.line.dur-.45))/.45));
      bp=mix(bp,POSES["bot-tell"],ease(Math.min(inR,outR)));
    }
    const bg = d0.line.shrug ? POSES["bot-shrug"]
             : d0.line.raise ? POSES["bot-raise"] : null;
    if(inChat && bg){
      const inR=Math.min(1,d0.t/.5);
      const outR=1-Math.max(0,Math.min(1,(d0.t-(d0.line.dur-.45))/.45));
      bp=mix(bp,bg,ease(Math.min(inR,outR)));
    }
    if(inChat && (d0.line.sad || alsoDone)) bp={...bp, mouth:"x"};
    if(nearA>.05){                                  // turned to the screen, listening
      bp=mix(bp,POSES["bot-watch"],nearA);
      botFlip=nearA>.5;                             // the screen is on his left
      if(d0.line.fast) bp={...bp, h:bp.h+Math.sin(time*4.4)*5};
    }
    if(walkIn){
      bp=stridePose(1700-botX);
      if(wp>.72) bp=mix(bp,POSES["bot-idle"],ease((wp-.72)/.28));
    }
    ctx.save(); ctx.globalAlpha=ba;
    if((walkIn && wp<=.72) || botFlip){
      ctx.translate(botX,0); ctx.scale(-1,1); ctx.translate(-botX,0) }
    drawFigure(ctx,{...bp, dy:bp.dy+Math.sin(time*1.5)*.5},
               botX,gy-48*S,S,CLAUDE,true);
    ctx.restore();

    // named on arrival, then it clears before anyone speaks
    const la=fade(time,first+.75,LESSONS[0].start-.35,.45);
    line(ctx,"Claude Code",1372,206,la,
         "500 30px 'IBM Plex Mono', monospace",CLAUDE,460,38);
    drawArrow(ctx,[[1372,228],[1330,300],[1268,330],[BOT_X+64,404]],
      Math.max(0,Math.min(1,(time-first-.95)/.8)),CLAUDE,3,la);
  }

  LESSONS.forEach((L,li)=>{
    const nxt=LESSONS[li+1];
    // number and title clear when the takeaway lands; the takeaway clears when
    // the next lesson's number arrives
    const cardOut=AT[L.end]+.55;
    const ha=fade(time,AT[L.head]+.35,cardOut,.5);
    line(ctx,"LESSON "+L.num,800,96,ha,"500 30px 'IBM Plex Mono', monospace","#3D5BD9",600,38);
    line(ctx,L.title,800,152,ha,"700 46px 'Space Grotesk', sans-serif","#23252B",1300,58,
         AT[L.head]+.35);

    const takeOut = nxt ? AT[nxt.head]+.30 : AT["tomeme"]-.55;
    const TF="700 46px 'Space Grotesk', sans-serif";
    ctx.font=TF;
    let ty=140;
    L.take.forEach((tx,i)=>{
      // each takeaway waits for the one above it to finish writing, rather than
      // starting on a fixed offset that a longer line overruns
      const t0=AT[L.end]+.85+L.take.slice(0,i)
        .reduce((a,q)=>a+q.length/TYPE_CPS+.55,0);
      line(ctx,tx,800,ty,fade(time,t0,takeOut,.55),TF,"#3D5BD9",1300,58,t0);
      ctx.font=TF;                       // line() leaves its own font behind
      ty += wrap(ctx,tx,1300).length*58 + 26;   // stack by what actually wrapped
    });

    if(time<L.start-.25 || time>=AT[L.end]+.4) return;
    const d=L.at(time);
    const one=(idx,al)=>{
      if(idx<0||idx>=L.lines.length||al<=0) return;
      const Ln=L.lines[idx];
      if(!Ln.txt) return;                     // caption-only beats have no bubble
      // directly above the speaker, tail stopping just short of the head top
      const put=(hx,col,tx,from,cut)=>drawCallout(ctx,hx,246,tx,
        Math.max(0,Math.min(1,(time-(from??L.cum(idx)))/(tx.length/46))),
        al,hx,402,col,false,cut);
      if(Ln.who===2){ put(464,"#3D5BD9",Ln.txt); put(BOT_X,CLAUDE,Ln.txt) }
      else put(Ln.who===0?464:BOT_X, Ln.who===0?"#3D5BD9":CLAUDE, Ln.txt,null,Ln.cut);
      // the second bubble starts writing a second into the first, not alongside it
      if(Ln.also && time>=L.cum(idx)+ALSO_LAG)
        put(Ln.also.who===0?464:BOT_X,
            Ln.also.who===0?"#3D5BD9":CLAUDE, Ln.also.txt, L.cum(idx)+ALSO_LAG);
    };
    const out=1-fade2(time,AT[L.end],.4);
    // only the line being spoken is on screen. The finished one used to stay as a
    // greyed ghost, which read as a disabled control rather than a past line.
    one(d.i,Math.min(1,d.t/.26)*out);
    // a line can carry a footnote; it sits below the stage so it never fights
    // the figures for room
    if(d.line.note)
      line(ctx,d.line.note,800,862,Math.min(1,Math.max(0,(d.t-.45)/.5))*out,
           "400 24px 'IBM Plex Mono', monospace","#767C8A",1320,32);
  });
}

// ─── timing audit surface ───────────────────────────────────────────
// Every piece of copy with a bounded window, so a script can check that each one
// is actually on screen long enough to read. Reading speed is not something to
// eyeball across a two-minute film.
window.__timed = (()=>{
  const T=[], add=(w,t,i,o)=>T.push({where:w,txt:t,in:i,out:o});
  const c=COPY[0];
  add("s1.title",c.title,T_TITLE,T_TITLE_OUT);
  add("s1.sub",c.sub,T_SUB,T_SUB_OUT);
  ["l1a","l1b","l1c"].forEach((k,i)=>add("s2."+k,S2[k],L1_AT[i],C1_OUT));
  add("s2.line3",S2.line3,BA_IN,AT["idea"]+.15);
  add("s2.line4",S2.line4,BB_IN,AT["idea"]+.15);
  add("s2.line2",S2.line2,C2_IN,AT["idea"]+.15);
  add("s3.hit",S3.hit,HIT_IN,HIT_OUT);
  add("s3.can",S3.can,AT["idea"]+1.55,REC_OUT);
  RECALLS.forEach(r=>add("s3."+r.key,S3[r.key],AT[r.lab]+.45+1.45,REC_OUT));
  add("s3.lock",S3.lock,LOCK_HIT,AT["howto"]-.30);
  add("s4.head",S4.head,HEAD_IN,AT["zoom"]+1.3);
  add("s4.l1",S4.l1,L1_IN+.20,AT["zoom"]+1.3);
  add("s4.l2",S4.l2,L2_IN+.20,AT["zoom"]+1.3);
  add("s4.note",S4.note,NOTE_IN,AT["zoom"]+1.3);
  add("s5.watch",S5.watch,WATCH_IN,TEST_IN-.30);
  add("s5.test",S5.test,TEST_IN,SEEN_IN-.35);
  add("s5.seen",S5.seen,SEEN_IN,AT["l1head"]+.30);
  LESSONS.forEach((L,i)=>{
    const nxt=LESSONS[i+1];
    add(L.num+".title",L.title,AT[L.head]+.35,AT[L.end]+.55);
    L.take.forEach((tx,j)=>add(L.num+".take"+(j+1),tx,
      AT[L.end]+.85+L.take.slice(0,j).reduce((a,q)=>a+q.length/46+.55,0),
      nxt?AT[nxt.head]+.30:null));
    L.lines.forEach((ln,j)=>add(L.num+".line"+j,ln.txt,L.cum(j),L.cum(j+1)));
  });
  add("f1.title",S6.t1,AT["f1"],AT["f2"]-.25);
  add("f1.c2",S6.c2,AT["f1"]+5.2,AT["f2"]-.25);
  add("f2.title",S6.t2,AT["f2"],AT["f3"]-.25);
  add("f3.title",S6.t3,AT["f3"],AT["f4"]-.25);
  add("f3.t3b",S6.t3b,AT["f3"]+.5,AT["f4"]-.25);
  add("f3.det",S6.det,AT["f3"]+4.6,AT["f4"]-.25);
  add("f3.detc",S6.detc,AT["f3"]+4.9,AT["f4"]-.25);
  add("f4.title",S6.t4,AT["f4"],AT["f5"]-.25);
  add("f4.c4c",S6.c4c,AT["f4"]+3.6,AT["f5"]-.25);
  add("f4.c4a",S6.c4a,AT["f4"]+4.4,AT["f5"]-.25);
  add("f4.c4b",S6.c4b,AT["f4"]+7.0,AT["f5"]-.25);
  add("f5.end",S6.end,AT["f5"]+5.05,null);
  return T;
})();

function frame(time){
  NOW=time;
  ctx.fillStyle="#FBFBFA"; ctx.fillRect(0,0,W,H);
  const st=stateAt(time), gy=H*.90, cam=st.cam;

  ctx.strokeStyle="#DEDCD3"; ctx.lineWidth=2;
  ctx.beginPath(); ctx.moveTo(0,gy); ctx.lineTo(W,gy); ctx.stroke();

  // ground ticks live in world space — they scroll, which is what sells the pan
  ctx.strokeStyle="#DCDAD0"; ctx.lineWidth=2;
  for(let k=-2;k<26;k++){
    const sx=(k*.085-cam)*W;
    if(sx<-20||sx>W+20) continue;
    ctx.beginPath(); ctx.moveTo(sx,gy); ctx.lineTo(sx,gy+9); ctx.stroke();
  }

  drawText(st.t,cam);
  drawScene2(st.t,cam);
  drawScene3(st.t,cam,st);
  drawScene4(st.t,cam,st);
  drawLessons(st.t);
  drawMeme(st.t,cam);
  drawFinale(st.t);
  syncMeme(st.t);
  syncMusic(st.t);
  // The set clears when she stands: chair out left, desk out right, together.
  // The offset is in WORLD units, not screen. My first attempt offset them in
  // screen space, so the moment the camera panned right it shoved the desk back
  // into frame — which is exactly what you saw at the Claude Code scene.
  // One world-space offset carries the set both ways: it slides IN from off frame
  // (chair from the left, desk from the right) instead of her walking to it, and
  // back OUT the same way when she stands. World units, not screen: a screen
  // offset was what let the camera pan drag the desk back into shot.
  const inU=Math.max(0,Math.min(1,(st.t-(AT["setin"]+.10))/0.80));
  const clrU=Math.max(0,Math.min(1,(st.t-(AT["locked"]+.30))/0.80));
  const clr=1.05*(1-ease(inU)) + 1.05*ease(clrU);
  const slideA=Math.min(Math.max(0,Math.min(1,(inU-.05)/.45)),
                        1-Math.max(0,Math.min(1,(clrU-.55)/.45)));
  const bigScreen = Math.max(st.zoom||0, lessonAt(st.t).scrIn<=st.t?1:0,
                             st.t>=AT["tomeme"]?1:0);
  const setA = (1-Math.max(0,Math.min(1,bigScreen)))*slideA;
  const chairX=(CHAIR_X-clr-cam)*W;   // chair rides the offset out to the left
  if(setA>0 && chairX>-160 && chairX<W+160){
    ctx.save(); ctx.globalAlpha=setA;
    drawChair(ctx,chairX,gy-24*3.15,3.15); ctx.restore(); }
  const figX=(st.x-cam)*W+(st.dx||0)*3.15;
  ctx.save();
  // the rig only draws profile-right, so walking left means mirroring the whole
  // figure about its own x rather than authoring a second set of walk poses
  if(st.flip){ ctx.translate(figX,0); ctx.scale(-1,1); ctx.translate(-figX,0) }
  drawFigure(ctx,st.pose,figX,gy-48*3.15,3.15,"#3D5BD9",false);
  ctx.restore();
  const deskX=(DESK_X+clr-cam)*W;
  if(setA>0 && deskX>-260 && deskX<W+260){
    ctx.save(); ctx.globalAlpha=setA;
    drawDesk(ctx,deskX,gy,3.15); ctx.restore(); }
  return st;
}

// ─── copy picker ────────────────────────────────────────────────────
const opts=document.getElementById("opts");
COPY.forEach((c,i)=>{
  const b=document.createElement("button");
  b.className="opt"+(i===0?" on":"");
  b.innerHTML='<em>'+c.id+'</em><span><b>'+c.title+'</b><i>'+c.sub+
              '</i><span class="why">'+c.why+'</span></span>';
  b.onclick=()=>{copyIdx=i;
    [...opts.children].forEach((el,j)=>el.classList.toggle("on",j===i));
    t=T_TITLE-.35; playing=true;
    document.getElementById("play").textContent="Pause";
    document.getElementById("play").classList.add("on");};
  opts.append(b);
});

MUSKEYS.forEach(k=>MUS[k]=document.getElementById("mus-"+k));
addEventListener("pointerdown",unblock); addEventListener("keydown",unblock);
