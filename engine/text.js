// Type on screen: wrapping, typing, fades, speech callouts.

const outQuint = u => 1-Math.pow(1-u,5);

function wrap(g,text,maxW){
  const words=text.split(" "); const lines=[]; let cur=words[0];
  for(let i=1;i<words.length;i++){
    if(g.measureText(cur+" "+words[i]).width<maxW) cur+=" "+words[i];
    else {lines.push(cur); cur=words[i];}
  }
  lines.push(cur); return lines;
}

const fade2=(time,a,dur)=>Math.max(0,Math.min(1,(time-a)/dur));
const fade=(time,a,b,dur)=>Math.max(0,Math.min(1,(time-a)/dur))*
                           (b==null?1:1-Math.max(0,Math.min(1,(time-b)/dur)));

// Copy is written on rather than simply appearing. NOW is the frame's own clock,
// so the reveal is a pure function of time and a paused scrub shows the right
// number of characters.
let NOW=0;
const TYPE_CPS=46;
function typed(text,from){
  if(from==null) return null;
  const n=text.length;
  return Math.max(0,Math.min(1,(NOW-from)/(n/TYPE_CPS)));
}
// draw only the first `prog` of the wrapped text, with a caret while it writes
function drawTyped(g,lines,x,y,lh,prog,align,cx){
  let left=prog==null?Infinity:Math.round(lines.reduce((n,l)=>n+l.length,0)*prog);
  let cy=y, caret=null;
  for(const l of lines){
    const n=Math.max(0,Math.min(l.length,left)); left-=l.length;
    const sh=l.slice(0,n);
    if(n>0){
      const px = align==="center" ? cx : x;
      g.fillText(sh,px,cy);
      caret=[ (align==="center" ? px+g.measureText(sh).width/2 : px+g.measureText(sh).width), cy];
    }
    if(n<l.length) break;
    cy+=lh;
  }
  if(prog!=null && prog>.02 && prog<1 && caret)
    g.fillRect(caret[0]+5,caret[1]-lh*.60,3,lh*.66);
}
function line2(g,text,x,y,alpha,font,col,maxW,lh,from){
  if(alpha<=0) return;
  g.save(); g.globalAlpha=alpha; g.textAlign="left"; g.font=font; g.fillStyle=col;
  g.translate(0,(1-outQuint(alpha))*14);
  drawTyped(g,wrap(g,text,maxW),x,y,lh,typed(text,from),"left");
  g.restore();
}

function line(g,text,cx,y,alpha,font,col,maxW,lh,from){
  if(alpha<=0) return;
  g.save(); g.globalAlpha=alpha; g.textAlign="center"; g.font=font; g.fillStyle=col;
  g.translate(0,(1-outQuint(alpha))*18);
  drawTyped(g,wrap(g,text,maxW),0,y,lh,typed(text,from),"center",cx);
  g.restore();
}

// thought bubble: filled with the stage colour so the ground line cannot show
// through it, then stroked. An unset fill defaults to black, which has bitten before.
function bubble(g,cx,cy,text,alpha,tailX,tailY){
  if(alpha<=0) return;
  g.save(); g.globalAlpha=alpha;
  g.font="400 25px 'IBM Plex Mono', monospace";
  const lines=wrap(g,text,300), pad=22, lh=34;
  const w=Math.max(...lines.map(l=>g.measureText(l).width))+pad*2;
  const h=lines.length*lh+pad*2-10, x=cx-w/2, y=cy-h/2, r=20;
  g.translate(0,(1-outQuint(alpha))*14);
  g.beginPath();
  g.moveTo(x+r,y); g.arcTo(x+w,y,x+w,y+h,r); g.arcTo(x+w,y+h,x,y+h,r);
  g.arcTo(x,y+h,x,y,r); g.arcTo(x,y,x+w,y,r); g.closePath();
  g.fillStyle="#FBFBFA"; g.fill();
  g.strokeStyle="#9AA3BF"; g.lineWidth=2.6; g.stroke();
  // two dots trailing toward her head
  const ex=tailX>cx?x+w:x, dx=(tailX-ex)/3, dy=(tailY-(y+h))/3;
  [[.45,7],[.9,4.5]].forEach(([k,rr])=>{
    g.beginPath(); g.arc(ex+dx*k*3*.42, y+h+dy*k*3*.42, rr,0,7);
    g.fillStyle="#FBFBFA"; g.fill(); g.stroke();
  });
  g.fillStyle="#3A3D45"; g.textAlign="center";
  lines.forEach((l,i)=>g.fillText(l,cx,y+pad+22+i*lh));
  g.restore();
}

// wrap on the FULL string first, then reveal characters, so lines never reflow
// mid-type. Revealing before wrapping makes the block jump every few frames.
function typeBlock(g,text,x,y,prog,font,col,maxW,lh,alpha,noCaret){
  if(alpha<=0) return;
  g.save(); g.globalAlpha=alpha; g.font=font; g.fillStyle=col; g.textAlign="left";
  const lines=wrap(g,text,maxW);
  let left=Math.round(lines.reduce((n,l)=>n+l.length,0)*prog);
  let cy=y, caretX=x, caretY=y;
  for(const l of lines){
    const n=Math.max(0,Math.min(l.length,left)); left-=l.length;
    const shown=l.slice(0,n);
    if(n>0){ g.fillText(shown,x,cy); caretX=x+g.measureText(shown).width; caretY=cy; }
    if(n<l.length) break;
    cy+=lh;
  }
  if(prog>0.02 && prog<1 && !noCaret) g.fillRect(caretX+5,caretY-lh*.60,3,lh*.70);
  g.restore();
}

// a callout, not a thought bubble: it has a pointed tail because the words are
// on the screen, not in her head
function drawCallout(g,cx,cy,text,prog,alpha,tailX,tailY,col,leftTail,cut){
  if(alpha<=0) return;
  g.save(); g.globalAlpha=alpha;
  const font="500 33px 'Space Grotesk', sans-serif", maxW=520, lh=44;
  g.font=font;
  const lines=wrap(g,text,maxW), pad=30;
  // width is measured on the FULL text so lines never reflow mid-type, but the
  // height grows with what has actually been written and the box is anchored at
  // its top. Otherwise a full-size empty box sits on screen waiting to be filled.
  const w=Math.max(...lines.map(l=>g.measureText(l).width))+pad*2;
  const hFull=lines.length*lh+pad*2-12;
  const grown=1+(lines.length-1)*Math.min(1,prog*1.18);
  const h=grown*lh+pad*2-12, x=cx-w/2, y=cy-hFull/2, r=16;
  g.translate(0,(1-outQuint(alpha))*16);
  g.beginPath();
  g.moveTo(x+r,y); g.arcTo(x+w,y,x+w,y+h,r); g.arcTo(x+w,y+h,x,y+h,r);
  g.arcTo(x,y+h,x,y,r); g.arcTo(x,y,x+w,y,r); g.closePath();
  g.fillStyle="#FBFBFA"; g.fill();
  g.strokeStyle=col; g.lineWidth=2.8; g.stroke();
  // tail toward the screen, drawn as a filled wedge then re-stroked so the box
  // outline does not run through it. Off the left edge when the screen is beside
  // the box rather than below it.
  // the bottom tail used to run from a fixed offset near the box's left edge,
  // which made a long thin sliver whenever the tip was not under that spot. It is
  // now a fixed-width wedge centred on the tip, so it reads as a tail.
  const tw=17, tx=Math.max(x+18,Math.min(x+w-18,tailX));
  const a1 = leftTail ? [x, y+h*.34] : [tx-tw, y+h];
  const a2 = leftTail ? [x, y+h*.62] : [tx+tw, y+h];
  const nx = leftTail ? 2 : 0, ny = leftTail ? 0 : 2;
  g.beginPath();
  g.moveTo(a1[0]+nx,a1[1]+ny); g.lineTo(a2[0]+nx,a2[1]-ny); g.lineTo(tailX,tailY);
  g.closePath(); g.fillStyle="#FBFBFA"; g.fill();
  g.beginPath(); g.moveTo(a1[0],a1[1]); g.lineTo(tailX,tailY); g.lineTo(a2[0],a2[1]);
  g.stroke();
  g.restore();
  // a cut line keeps being written, but everything past the cut goes grey: he is
  // still talking and she has already answered over the top of him
  if(cut!=null){
    typeBlock(g,text,cx-w/2+pad,y+pad+26,prog,font,"#AEB4C2",maxW,lh,alpha);
    typeBlock(g,text,cx-w/2+pad,y+pad+26,Math.min(prog,cut),font,"#23252B",
              maxW,lh,alpha,true);
  } else
    typeBlock(g,text,cx-w/2+pad,y+pad+26,prog,font,"#23252B",maxW,lh,alpha);
}
