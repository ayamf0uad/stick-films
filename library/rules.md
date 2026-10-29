# Hard rules of the rig

Things that cannot be done, and why. Read this before designing a shot — every
entry below is here because it was attempted, rendered, and looked wrong.

## The figure is drawn from one skeleton

A pose is twelve absolute angles. `0°` = straight down, `+90°` = right, `-90°` =
left, `180°` = straight up. Angles are **absolute in world space**, not relative to
the parent joint — so an arm at `ar1: 6` is hanging vertically no matter what the
torso is doing.

```
t    torso lean          h    head tilt (negative = down)
al1/al2  left arm  (upper, forearm)     ar1/ar2  right arm
ll1/ll2  left leg  (thigh, shin)        lr1/lr2  right leg
dy   root lift (negative = up)          f    facing: 1 front, 0 profile-right
```

`al` is the **screen-left** arm, `ar` the screen-right one, regardless of which way
the figure faces.

## Profile stacks the shoulders

At `f: 0` the shoulder spread is `|f| = 0`, so **both arms leave the same point**.
Consequences, all discovered the hard way:

- **No crossed arms.** Two forearms from one origin either overlap into one thick
  line or, angled far enough apart to cross, fold back over each other into a solid
  blob. Three geometries were tried on the seated figure. None read.
- **No left-hand / right-hand distinction.** An `al` lift and an `ar` lift with the
  same angles draw the *identical polyline*. If two gestures need to look different
  in profile, they must differ by **direction or height**, not by side.
- **There is no profile-left.** The eye offset uses `Math.abs(p.f)`. Facing left means
  mirroring the whole figure about its own x — `st.flip` does this in the player.

## Reach limits

Arm span is 35 units. The shoulder sits 38 above the hip.

- **A seated figure cannot reach its own lap.**
- **No chin-on-hand while seated at a desk.** Elbow-on-desk puts the hand 44 above
  the hip; the face is at 65.
- **A raised hand cannot clear the top of the head.** Head centre is 27 above the
  shoulder plus a 13.5 radius = 40.5, beyond the 35 of reach. Gestures go *beside* or
  *forward of* the head, never over it.

## The desk occludes forearms

The desk surface sits 29.5 units above the hip; the shoulder is at 38. A forearm
resting naturally on a desk lands about 15 below the shoulder — **behind the desk's
front edge, invisible**. Anything meant to read at a desk has to sit at roughly
shoulder height, which is higher than realistic but is the only version you can see.

## A bow does not read front-on

At `f: 1` both legs stay splayed toward the viewer while the torso goes over, which
draws a table with a head on it. A bow only works in profile. **Film 1 closes on a
wave instead** — which also bookends the opening wave, so the constraint improved it.

## The head paints over the arms

The head is filled with the stage colour and drawn after the torso. A hand on the
face is geometrically correct and **completely invisible** unless the pose sets
`hf: 1`, which defers the arms until after the head.

## mix() only interpolates angles

`KEYS` is the twelve angles. Any other field on a pose — `hf` draw order, `mouth`
shape — is carried from whichever side of the blend dominates. Dropping them
silently is how a facepalm ended up behind the head.

## Symmetric two-handed gestures

Any pose bringing both hands to the body **centre** closes the arms into a diamond
around the torso line. Folded arms, hands-on-hips-both-sides, fist-into-palm held:
all off the table, standing or seated.

**Both hands to one SIDE draws fine** — that is a different shape. In profile,
where the shoulders stack, separate the two grips *along* the line rather than
across it: solve the back arm so its hand lands about 11 units nearer at the same
height, and the two arms fork visibly while both stay on the line.

**A prop can go where a hand cannot.** Her arm reaches 110px; the clip stops 36px
beyond that, so she can never touch it. A rope covers that gap.

## Effort has a rhythm, and a beat has neighbours

Both facts above came out of a tug-of-war haul that was built for the clip beat and
then **reverted**. The geometry was right and it still failed, for two reasons worth
remembering:

- **A continuous pull reads as mechanical.** Real hauling is rhythmic — grab, haul,
  re-grip, haul. One smooth eased motion from grip to finish looks like a machine
  winding something in. Any effort action needs to be built in repeats, not as a
  single blend.
- **A beat has to wait for the previous one to clear.** The haul started 0.2s in,
  while Claude was still walking out of the scene. A new action that overlaps an
  exit reads as clutter no matter how good the action is.

The poses and the rope are gone from `film.js`; this note exists so the next attempt
starts from what actually went wrong rather than from scratch.

## Determinism

`Date.now()`, `Math.random()`, and un-anchored `performance.now()` phases must never
reach the render. They break seeking, make frame renders non-reproducible, and make
the pixel-diff gate meaningless. Oscillation phase comes from beat-local time.

## Feet

Drive strides from **distance covered**, never elapsed time. Clock-driven feet keep
stepping after a decelerating walk has arrived — phantom steps on every mark.

## When something can't be done

Say so, show what was tried, and offer what can be done instead. Three failed
attempts at folded arms were worth more than one silent substitution — the
replacement that got chosen (hands together on the desk) was a different idea, and
it needed to be a decision, not a swap.
