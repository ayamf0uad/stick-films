// Walking. Strides are driven by distance covered, never by the clock.

const WALK=["walk-side-1","walk-side-2","walk-side-3","walk-side-4","walk-side-5","walk-side-6"];
// Feet driven by the clock keep stepping after a decelerating walk has arrived,
// which is the phantom steps on every mark. Driving them by distance covered
// stops the cycle exactly when the travel does, and the step rate follows the
// speed for free.
// The six walk poses only yield FOUR distinct silhouettes in profile: at f:0 the
// hips and shoulders stack, so walk-side-5 draws identically to walk-side-1 and
// -6 to -3 (they are the same pose with the left and right limbs relabelled).
// Running them 1..6 therefore renders 1,2,3,4,1,3 — the cycle stutters and then
// reverses, which is what made every walk look wrong. The correct profile cycle
// is a ping-pong through the four distinct frames, and that is exactly one step.
const WALKC=["walk-side-1","walk-side-2","walk-side-3","walk-side-4",
             "walk-side-3","walk-side-2"];
// one step advances the body by the pose sheet's own foot spread, 40.5 rig units
const STRIDE=40.5*3.15;
function stridePose(distPx){
  const n=WALKC.length, f=((((distPx/STRIDE)%1)+1)%1)*n, k=Math.floor(f);
  return mix(POSES[WALKC[k%n]],POSES[WALKC[(k+1)%n]],f-k);
}
