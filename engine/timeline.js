// Beat start times, derived from the beat list. Hand-typed cue seconds
// drift the moment a duration changes; these never do.
// The film declares SEQ and TOTAL, then calls retime().

// beat start times, derived. Hand-typed cue seconds drift the moment a duration
// changes, which is the same class of bug as the index-keyed camera.
const AT={};
const READ=(t)=>0.45+String(t||"").replace(/\s+/g,' ').length*0.045;
function retime(){                       // recompute beat starts and the total
  for(const k in AT) delete AT[k];
  let a=0; for(const b of SEQ){ if(b.lab&&!(b.lab in AT)) AT[b.lab]=a; a+=b.dur }
  TOTAL=a;
}
