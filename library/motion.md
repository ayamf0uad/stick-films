# Movement

## Walking

**0.35 seconds per step.** One stride cycle is two steps, so 0.70s, and `STRIDE` is
40.5 rig units. A figure at scale `S` covers `40.5 × S` pixels per cycle.

Drive the pose from **distance covered**:

```js
pose = stridePose(distanceInPixels)     // never stridePose(elapsedTime)
```

The walk cycle is **four distinct silhouettes, not six**. At `f: 0` the hips and
shoulders stack, so walk-side-5 draws identically to -1 and -6 to -3 — they are the
same pose with the limbs relabelled. Running 1..6 renders 1,2,3,4,1,3: the cycle
stutters and then reverses. `WALKC` is the correct 1,2,3,4,3,2 sequence.

A smaller figure steps quicker. A figure at 40% of hero scale wants about 0.22s per
step; film 1's cart-pushing Claude uses 0.25s at scale 1.25.

Walking left means mirroring (`st.flip`) — see `rules.md`.

## Gestures

- **One deliberate gesture per line**, then back to rest. Continuous drift between
  two poses on overlapping sines reads as fidgeting, not thinking.
- Ease **out of** the resting pose and **back into** it before the line ends.
  Snapping between the two makes gestures look bolted on.
- Gesture on the speaker's own lines, not while the other character is talking.
- During dialogue, movement uses the arm **away from** the other character, unless
  pointing at something.
- Two poses can share one beat: settle into the first, hold, move to the second.
  That is what `seat2` does — a change of mind without a whole extra beat.

## Handing over between poses

Never gate one gesture behind another having "almost finished". It will appear at
whatever value it already eased to, which is a visible jump. Weight the incoming
gesture by what is left of the outgoing one:

```js
base = mix(rest, gesture, ease(inOut) * (1 - palmAmount));
```

## Tracking things on screen

Solve the arm angle from the shoulder to the target:

```js
ang = Math.atan2(targetX - shoulderX, targetY - shoulderY) * 180 / Math.PI;
```

Head tilt follows the arm, not the raw target height, so it moves on a sideways sweep
too.

**Widen a flat sweep.** If every target sits at the same height, the true angles
between them can differ by nine degrees — seventeen pixels of hand travel over eight
seconds, which is no movement at all. Exaggerate about the beat's own mean until the
sweep spans roughly thirty degrees; leave beats that already sweep more alone.
