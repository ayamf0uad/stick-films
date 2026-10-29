// The figure itself. A pose is twelve absolute joint angles in degrees:
// 0 = straight down, +90 = right, -90 = left, 180 = straight up.

const R = {
  torso:46, headGap:6, headR:13.5, shoulderDrop:8,
  upper:19, fore:16, handR:3.6, thigh:24, shin:24,
  hipX:4.5, shX:2.5, lw:3.4
};

// pose = absolute segment angles in degrees.
// 0° = straight down, +90° = right, -90° = left, 180° = straight up.
// t torso lean · h head tilt · a*=arms(1 upper,2 fore) · l*=legs(1 thigh,2 shin)
// dy root lift · f facing: 1 front, 0 profile-right, -1 profile-left
const P = (o)=>Object.assign({t:0,h:0,al1:-25,al2:-32,ar1:25,ar2:32,
  ll1:-8,ll2:-5,lr1:8,lr2:5,dy:0,f:1},o);

const POSES = {
  // ── standing
  "neutral":        P({}),
  "arms-wide":      P({al1:-95,al2:-100,ar1:95,ar2:100}),
  "cheer":          P({al1:-130,al2:-152,ar1:130,ar2:152,dy:-2}),
  "presents":       P({al1:-70,al2:-105,ar1:70,ar2:105,h:-3}),

  // ── pointing, eight directions (right arm leads)
  "point-up":       P({ar1:150,ar2:166,al1:-20,al2:-26}),
  "point-up-right": P({ar1:138,ar2:145,al1:-20,al2:-26}),
  "point-right":    P({ar1:92,ar2:96,al1:-20,al2:-26}),
  "point-dn-right": P({ar1:52,ar2:46,al1:-20,al2:-26}),
  "point-down":     P({ar1:28,ar2:18,al1:-20,al2:-26}),
  "point-dn-left":  P({al1:-56,al2:-44,ar1:20,ar2:26}),
  "point-left":     P({al1:-92,al2:-96,ar1:20,ar2:26}),
  "point-up-left":  P({al1:-138,al2:-145,ar1:20,ar2:26}),

  // ── desk → cheek → mouth → the idea
  "hand-desk":      P({f:0,t:6,ar1:62,ar2:88,al1:-30,al2:-40,ll1:-6,ll2:-4,lr1:10,lr2:6}),
  "hand-cheek":     P({f:0,t:5,ar1:118,ar2:168,al1:-28,al2:-38,h:-6}),
  "hand-mouth":     P({f:0,t:8,ar1:126,ar2:176,al1:-26,al2:-36,h:-9}),
  "reach-idea":     P({f:0,t:-4,ar1:136,ar2:156,al1:-34,al2:-44,h:-6,dy:-3}),

  // ── dance
  "dance-1":        P({al1:-128,al2:-150,ar1:128,ar2:150,ll1:-14,ll2:-9,lr1:14,lr2:9,h:-4}),
  "dance-2":        P({al1:-134,al2:-152,ar1:38,ar2:58,t:7,ll1:-4,ll2:-2,lr1:20,lr2:12,h:5}),
  "dance-3":        P({al1:-70,al2:-142,ar1:70,ar2:142,ll1:-18,ll2:-11,lr1:18,lr2:11}),
  "dance-4":        P({al1:-132,al2:-154,ar1:132,ar2:154,ll1:-22,ll2:-32,lr1:22,lr2:32,dy:-16}),
  "dance-side-1":   P({f:0,al1:-142,al2:-160,ar1:150,ar2:170,t:-6,ll1:-10,ll2:8,lr1:16,lr2:-6}),
  "dance-side-2":   P({f:0,al1:40,al2:96,ar1:-118,ar2:-150,t:9,ll1:14,ll2:-10,lr1:-12,lr2:10}),

  // ── walk cycle in profile, 6 frames, loopable
  "walk-side-1":    P({f:0,al1:-24,al2:-34,ar1:26,ar2:44,ll1:26,ll2:30,lr1:-26,lr2:-18,t:3}),
  "walk-side-2":    P({f:0,al1:-16,al2:-26,ar1:18,ar2:36,ll1:16,ll2:26,lr1:-16,lr2:-32,t:4,dy:4}),
  "walk-side-3":    P({f:0,al1:-6,al2:-14,ar1:6,ar2:20,ll1:2,ll2:6,lr1:-6,lr2:-46,t:3,dy:1}),
  "walk-side-4":    P({f:0,al1:8,al2:16,ar1:-8,ar2:-18,ll1:-8,ll2:-2,lr1:12,lr2:-26,t:2,dy:-3}),
  "walk-side-5":    P({f:0,al1:26,al2:44,ar1:-24,ar2:-34,ll1:-26,ll2:-18,lr1:26,lr2:30,t:3}),
  "walk-side-6":    P({f:0,al1:6,al2:20,ar1:-6,ar2:-14,ll1:-6,ll2:-46,lr1:2,lr2:6,t:3,dy:1}),

  // ── run, leap
  "run-side-1":     P({f:0,t:14,al1:-56,al2:-118,ar1:62,ar2:126,ll1:44,ll2:34,lr1:-40,lr2:-70}),
  "run-side-2":     P({f:0,t:16,al1:-30,al2:-96,ar1:34,ar2:104,ll1:8,ll2:-12,lr1:-16,lr2:-96,dy:-8}),
  "run-side-3":     P({f:0,t:13,al1:62,al2:126,ar1:-56,ar2:-118,ll1:-40,ll2:-70,lr1:44,lr2:34}),
  "leap-side":      P({f:0,t:9,al1:-120,al2:-158,ar1:128,ar2:162,ll1:40,ll2:52,lr1:-34,lr2:-72,dy:-26}),
  "kick-side":      P({f:0,t:-8,al1:-70,al2:-110,ar1:74,ar2:118,ll1:74,ll2:80,lr1:-8,lr2:-2}),

  // ── turn (front → profile)
  "turn-1":         P({f:1,al1:-25,al2:-32,ar1:25,ar2:32}),
  "turn-2":         P({f:.5,al1:-22,al2:-30,ar1:22,ar2:30,h:4}),
  "turn-3":         P({f:0,al1:-20,al2:-28,ar1:20,ar2:28,h:6})
};

// ─── interpolation ──────────────────────────────────────────────────
const KEYS = ["t","h","al1","al2","ar1","ar2","ll1","ll2","lr1","lr2","dy","f"];
function mix(a,b,u){const o={};for(const k of KEYS)o[k]=a[k]+(b[k]-a[k])*u;
  // KEYS are angles. Anything else on a pose (draw order, mouth shape) cannot be
  // interpolated, and dropping it silently is how the facepalm ended up behind
  // the head. Carry every non-angle field over from whichever side dominates.
  const d=(u<.5?a:b);
  for(const k in d) if(!(k in o)) o[k]=d[k];
  return o}
const ease = u => u<.5 ? 4*u*u*u : 1-Math.pow(-2*u+2,3)/2;

// ─── drawing ────────────────────────────────────────────────────────
const D = (x,y,deg,len)=>{const r=deg*Math.PI/180;
  return {x:x+len*Math.sin(r), y:y+len*Math.cos(r)};};

function drawFigure(ctx,p,ox,oy,scale,color,square){
  ctx.save();
  ctx.translate(ox,oy); ctx.scale(scale,scale); ctx.translate(0,p.dy);
  ctx.strokeStyle=color; ctx.fillStyle=color;
  ctx.lineWidth=R.lw; ctx.lineCap="round"; ctx.lineJoin="round";

  const hip={x:0,y:0};
  const neck=D(hip.x,hip.y,180+p.t,R.torso);
  const shoulder=D(hip.x,hip.y,180+p.t,R.torso-R.shoulderDrop);
  const spread=Math.abs(p.f); // 1 front → shoulders/hips apart, 0 profile → stacked

  const line=(a,b)=>{ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()};
  const limb=(root,a1,a2,l1,l2,hand)=>{
    const j=D(root.x,root.y,a1,l1), e=D(j.x,j.y,a2,l2);
    line(root,j); line(j,e);
    if(hand){ctx.beginPath();ctx.arc(e.x,e.y,R.handR,0,7);
      ctx.fillStyle="#FBFBFA";ctx.fill();ctx.stroke();ctx.fillStyle=color}
    return e;
  };

  // legs (back leg first, slightly lighter read in profile)
  const hipL={x:hip.x-R.hipX*spread,y:hip.y}, hipR={x:hip.x+R.hipX*spread,y:hip.y};
  limb(hipL,p.ll1,p.ll2,R.thigh,R.shin,false);
  limb(hipR,p.lr1,p.lr2,R.thigh,R.shin,false);

  // torso
  line(hip,neck);

  // arms
  const shL={x:shoulder.x-R.shX*spread,y:shoulder.y}, shR={x:shoulder.x+R.shX*spread,y:shoulder.y};
  const arms=()=>{ limb(shL,p.al1,p.al2,R.upper,R.fore,true);
                   limb(shR,p.ar1,p.ar2,R.upper,R.fore,true) };
  // The head is filled, so it paints over anything drawn before it. That makes a
  // hand ON the face impossible in the normal order: the facepalm just vanishes.
  // p.hf flips the order for the poses that need the hand in front.
  if(!p.hf) arms();

  // head
  const hc=D(neck.x,neck.y,180+p.t+p.h*.4,R.headGap+R.headR);
  ctx.save(); ctx.translate(hc.x,hc.y); ctx.rotate((p.t+p.h)*Math.PI/180);
  ctx.beginPath();
  if(square){const w=R.headR*1.86, hh=R.headR*1.46, r=4.5, x=-w/2, y=-hh/2;
    ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+hh,r);ctx.arcTo(x+w,y+hh,x,y+hh,r);
    ctx.arcTo(x,y+hh,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();
  } else ctx.arc(0,0,R.headR,0,7);
  ctx.fillStyle="#FBFBFA"; ctx.fill(); ctx.stroke(); ctx.fillStyle=color;

  // ponytail on the human rig
  if(!square){
    const side = p.f>=.5 ? -1 : -1.05;
    ctx.beginPath(); ctx.lineWidth=R.lw*.85;
    ctx.moveTo(side*R.headR*.86,-R.headR*.34);
    ctx.quadraticCurveTo(side*R.headR*1.75,-R.headR*.15,side*R.headR*1.5,R.headR*.62);
    ctx.stroke(); ctx.lineWidth=R.lw;
  }
  // face — eyes shift toward facing direction. The square rig gets dashes for
  // eyes rather than dots, which is what makes it read as a device and not a person.
  const ex = (1-Math.abs(p.f))*3.4;
  ctx.lineWidth=R.lw*.72;
  if(square){
    ctx.beginPath();
    ctx.moveTo(-6.4+ex,-2.4); ctx.lineTo(-2.2+ex,-2.4);
    ctx.moveTo( 2.2+ex,-2.4); ctx.lineTo( 6.4+ex,-2.4);
    ctx.stroke();
  }else{
    ctx.beginPath(); ctx.arc(-4.2+ex,-2.2,1.7,0,7); ctx.fill();
    ctx.beginPath(); ctx.arc( 4.2+ex,-2.2,1.7,0,7); ctx.fill();
  }
  ctx.beginPath(); ctx.lineWidth=R.lw*.7;
  if(p.mouth==="x"){                      // the moment it realises
    const m=2.3, cx=ex*.7, cy=4.0;
    ctx.moveTo(cx-m,cy-m); ctx.lineTo(cx+m,cy+m);
    ctx.moveTo(cx+m,cy-m); ctx.lineTo(cx-m,cy+m);
  }else if(p.mouth==="think"){            // pursed and off-centre: working on it
    const cx=ex*.7;
    ctx.moveTo(cx-2.6,3.0); ctx.lineTo(cx+1.8,3.6);
  }else if(p.mouth==="smirk"){            // the same mouth, just tilted
    const cx=ex*.7;
    ctx.save(); ctx.translate(cx,1.0); ctx.rotate(15*Math.PI/180); ctx.translate(-cx,-1.0);
    ctx.arc(cx,1.0,5.2,0.35*Math.PI,0.65*Math.PI);
    ctx.restore();
  }else{
    ctx.arc(ex*.7,1.0,5.2,0.35*Math.PI,0.65*Math.PI);
  }
  ctx.stroke();
  ctx.restore();
  if(p.hf) arms();
  ctx.restore();
}
