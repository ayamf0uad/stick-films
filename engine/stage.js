// The canvas, and the props that stand on it.

// ─── stage ──────────────────────────────────────────────────────────
const cv=document.getElementById("c"), ctx=cv.getContext("2d");
const W=cv.width, H=cv.height;
// ─── chair, drawn in the same line language as the figure ───────────
function drawChair(g,ox,oy,sc){
  g.save(); g.translate(ox,oy); g.scale(sc,sc);
  g.strokeStyle="#9AA3BF"; g.lineWidth=R.lw*.95; g.lineCap="round"; g.lineJoin="round";
  const L=(x1,y1,x2,y2)=>{g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke()};
  L(-16,2, 21,2);        // seat
  L(-16,2, -19,-38);     // back post
  L(-19,-38, -9,-36);    // top rail
  L(-17,-19, -8,-18);    // mid slat
  L(19,2, 22,24);        // front leg
  L(-14,2, -16,24);      // back leg
  L(20,12, -15,12);      // stretcher
  g.restore();
}
// ─── desk + laptop, same line language as the chair ─────────────────
// She cannot prop her chin on a hand while seated: elbow-on-desk puts the hand
// 44 units above the hip and her face is at 65. Same reach limit the rig already
// documents. So the desk is set dressing, not something she touches, and the
// thinking poses lift the elbow into the air instead.
function drawDesk(g,ox,oy,sc){
  g.save(); g.translate(ox,oy); g.scale(sc,sc);
  g.strokeStyle="#9AA3BF"; g.lineWidth=R.lw*.95; g.lineCap="round"; g.lineJoin="round";
  const L=(x1,y1,x2,y2)=>{g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke()};
  // the slab is filled, not just outlined: it has to occlude her lower body or she
  // reads as sitting NEXT to the desk rather than at it
  g.fillStyle="#FBFBFA";
  g.fillRect(-26,-52,76,4.6);
  L(-26,-52, 50,-52);      // top
  L(-26,-48, 50,-48);      // front lip, so it reads as a slab not a line
  L(46,-48, 48,0);         // far leg
  L(-22,-48, -24,0);       // near leg
  // laptop, hinged at the far side so the screen faces her
  g.lineWidth=R.lw*.8;
  L(-6,-53, 16,-53);       // base
  L(16,-53, 23,-77);       // screen, tilted back
  L(23,-77, 1,-77);        // screen top
  L(1,-77, -6,-53);        // screen near edge
  g.restore();
}

function drawBulb(g,cx,cy,sc,pop,ray){
  if(pop<=0) return;
  const grow=outQuint(Math.min(1,pop*2.2));
  const over=Math.sin(Math.PI*Math.min(1,pop*1.6))*.20*(1-Math.min(1,pop));
  const k=grow*(1+over);
  const base=Math.min(1,pop*3);
  g.save(); g.translate(cx,cy); g.scale(sc*k,sc*k); g.globalAlpha=base;
  g.lineCap="round"; g.lineJoin="round";
  const L=(x1,y1,x2,y2)=>{g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke()};

  // glow first, under everything. A radial falloff is what reads as "lit" — a flat
  // yellow fill on a near-white stage just looks like a pale circle.
  const lit=.82+.18*Math.sin(pop*7.5);          // it settles rather than sitting flat
  const glow=g.createRadialGradient(0,-6,4,0,-6,42);
  glow.addColorStop(0,   "rgba(255,206,58,"+(.60*lit).toFixed(3)+")");
  glow.addColorStop(.45, "rgba(255,206,58,"+(.26*lit).toFixed(3)+")");
  glow.addColorStop(1,   "rgba(255,206,58,0)");
  g.fillStyle=glow; g.beginPath(); g.arc(0,-6,42,0,7); g.fill();

  // glass
  g.beginPath(); g.arc(0,-6,15,0,7);
  g.fillStyle="#FFD23F"; g.fill();
  g.strokeStyle="#E0A100"; g.lineWidth=2.6; g.stroke();
  // screw base stays metal, or the whole thing reads as a lemon
  g.strokeStyle="#8A8F9E"; g.lineWidth=2.6;
  L(-6,7,-6,12); L(6,7,6,12);
  L(-7,13,7,13); L(-6,17,6,17); L(-4,21,4,21);
  // filament, dark enough to show against the yellow
  g.strokeStyle="#B07C00"; g.lineWidth=2.1;
  g.beginPath(); g.moveTo(-5,1); g.lineTo(-2,-5); g.lineTo(1,1); g.lineTo(4,-5);
  g.stroke();
  if(ray>0){                                         // rays flash out and fade
    g.globalAlpha=base*Math.max(0,1-ray)*.95; g.lineWidth=3.0;
    g.strokeStyle="#F5B400";
    for(let i=0;i<8;i++){
      const a=(i/8)*Math.PI*2-Math.PI/2, r0=21+ray*9, r1=r0+10+ray*8;
      L(Math.cos(a)*r0,-6+Math.sin(a)*r0, Math.cos(a)*r1,-6+Math.sin(a)*r1);
    }
  }
  g.restore();
}

// annotation arrow: a sampled cubic, so it can draw itself on and the head can
// be placed wherever the draw has actually reached
function drawTick(g,x,y,prog,color,alpha){
  if(prog<=0||alpha<=0) return;
  const k=Math.min(1,prog);
  g.save(); g.globalAlpha=alpha??1; g.strokeStyle=color; g.lineWidth=4.2; g.lineCap="round"; g.lineJoin="round";
  g.beginPath(); g.moveTo(x,y);
  const m=Math.min(1,k/.42);                 // short leg first, then the long one
  g.lineTo(x+9*m,y+11*m);
  if(k>.42){ const n=(k-.42)/.58; g.lineTo(x+9+17*n, y+11-24*n) }
  g.stroke(); g.restore();
}

function drawArrow(g,P,prog,color,w,alpha){
  if(prog<=0||alpha<=0) return;
  const N=48, at=(t)=>{const u=1-t;
    return [u*u*u*P[0][0]+3*u*u*t*P[1][0]+3*u*t*t*P[2][0]+t*t*t*P[3][0],
            u*u*u*P[0][1]+3*u*u*t*P[1][1]+3*u*t*t*P[2][1]+t*t*t*P[3][1]]};
  const k=Math.max(1,Math.round(N*Math.min(1,prog)));
  g.save(); g.globalAlpha=alpha??1;
  g.strokeStyle=color; g.lineWidth=w; g.lineCap="round"; g.lineJoin="round";
  g.beginPath();
  for(let i=0;i<=k;i++){const q=at(i/N); i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1])}
  g.stroke();
  if(prog>=1){                                  // head only once it has arrived
    const e=at(1), b=at(.93), ang=Math.atan2(e[1]-b[1],e[0]-b[0]), L=16, S=.44;
    g.beginPath();
    g.moveTo(e[0],e[1]); g.lineTo(e[0]-L*Math.cos(ang-S), e[1]-L*Math.sin(ang-S));
    g.moveTo(e[0],e[1]); g.lineTo(e[0]-L*Math.cos(ang+S), e[1]-L*Math.sin(ang+S));
    g.stroke();
  }
  g.restore();
}

// Claude's mark, stylised: a radial burst of tapered spokes. Drawn rather than
// traced, and only ever used to say "this is the app she is in".
function drawClaudeMark(g,cx,cy,r,col){
  g.save(); g.translate(cx,cy); g.fillStyle=col;
  const N=11;
  for(let i=0;i<N;i++){
    const a=(i/N)*Math.PI*2-Math.PI/2, w=r*.15, r0=r*.14, r1=r*(i%2?.88:1);
    const cx1=Math.cos(a)*r0, cy1=Math.sin(a)*r0;
    g.beginPath();
    g.moveTo(Math.cos(a)*r1,Math.sin(a)*r1);
    g.lineTo(cx1+Math.cos(a+Math.PI/2)*w, cy1+Math.sin(a+Math.PI/2)*w);
    g.lineTo(cx1+Math.cos(a-Math.PI/2)*w, cy1+Math.sin(a-Math.PI/2)*w);
    g.closePath(); g.fill();
  }
  g.restore();
}

function drawMonitor(g,ox,oy,sc,alpha,chat){
  if(alpha<=0) return;
  g.save(); g.globalAlpha=alpha; g.translate(ox,oy); g.scale(sc,sc);
  g.strokeStyle="#9AA3BF"; g.lineWidth=R.lw*.95*3.15/sc;
  g.lineCap="round"; g.lineJoin="round";
  const L=(x1,y1,x2,y2)=>{g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke()};
  g.fillStyle="#FBFBFA";
  g.beginPath(); g.rect(-48,-120,96,68); g.fill(); g.stroke();   // screen
  L(0,-52,0,-33); L(-17,-33,17,-33);                             // stand + base
  // the mark identifies the app; the lines below suggest a session rather than
  // spelling one out. Their turns left in orange, hers right in blue. Once the
  // screen becomes the room, this content gives way to the run itself.
  if(chat>0){
    g.save(); g.globalAlpha=alpha*chat;
    drawClaudeMark(g,-34,-105,8.5,CLAUDE);
    g.lineWidth=R.lw*.62; g.strokeStyle="#B9C0D2";
    L(-19,-108,34,-108); L(-19,-101,16,-101);
    g.strokeStyle=CLAUDE;
    L(-40,-88,-2,-88); L(-40,-81,-16,-81);
    g.strokeStyle="#3D5BD9";
    L(40,-70,6,-70); L(40,-63,18,-63);
    g.restore();
  }
  g.restore();
}

// the run itself: lines scrolling up behind her. Line shapes come from a hash of
// the line index, not a random call, so the same second always draws the same
// screen and a frame render is reproducible.
function drawCode(g,x0,y0,w,h,t,alpha){
  if(alpha<=0) return;
  const rnd=(i)=>{const v=Math.sin(i*12.9898)*43758.5453; return v-Math.floor(v)};
  g.save(); g.globalAlpha=alpha;
  g.beginPath(); g.rect(x0,y0,w,h); g.clip();
  const LH=36, SPD=52, N=Math.ceil(h/LH)+3;
  const off=(t*SPD)%LH, base=Math.floor(t*SPD/LH);
  g.lineCap="round"; g.lineWidth=6;
  for(let i=0;i<N;i++){
    const k=base+i, y=y0+h-off-i*LH;
    const ind=Math.floor(rnd(k)*3)*30, len=w*(.16+rnd(k+99)*.46), c=rnd(k+7);
    g.strokeStyle = c<.16 ? CLAUDE : (c<.27 ? "#3D5BD9" : "#C9CEDA");
    g.beginPath(); g.moveTo(x0+40+ind,y); g.lineTo(x0+40+ind+len,y); g.stroke();
  }
  g.restore();
}

// where a hand is, in rig units from the hip, so a held prop sits IN it
function handAtL(p){
  const sp=Math.abs(p.f), sh={x:-2.5*sp, y:-(R.torso-R.shoulderDrop)};
  const rad=(d)=>d*Math.PI/180;
  return {x: sh.x + R.upper*Math.sin(rad(p.al1)) + R.fore*Math.sin(rad(p.al2)),
          y: sh.y + R.upper*Math.cos(rad(p.al1)) + R.fore*Math.cos(rad(p.al2))};
}
function handAt(p){
  const sp=Math.abs(p.f), sh={x:2.5*sp, y:-(R.torso-R.shoulderDrop)};
  const rad=(d)=>d*Math.PI/180;
  return {x: sh.x + R.upper*Math.sin(rad(p.ar1)) + R.fore*Math.sin(rad(p.ar2)),
          y: sh.y + R.upper*Math.cos(rad(p.ar1)) + R.fore*Math.cos(rad(p.ar2))};
}

function drawGlass(g,hx,hy,ang,alpha,sc){
  if(alpha<=0) return;
  g.save(); g.globalAlpha=alpha; g.translate(hx,hy); g.rotate(ang); g.scale(sc,sc);
  g.strokeStyle="#3D5BD9"; g.lineWidth=3.4; g.lineCap="round";
  g.beginPath(); g.moveTo(0,0); g.lineTo(13,-13); g.stroke();     // handle
  g.beginPath(); g.arc(23,-23,15,0,7);
  g.fillStyle="rgba(255,255,255,.55)"; g.fill(); g.stroke();      // lens
  g.restore();
}
