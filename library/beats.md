# Beats

A film is a list of beats. Each has a `kind` (which pose logic runs), a `dur`, a
world `x`, a camera `cam`, and an optional `lab` that names it on the timeline.

```js
const SEQ = [
  {kind:"walk",   dur:2.50, x0:-.10, x1:.50, cam:0},
  {kind:"hold",   dur:1.70, x:.50, pose:"settle", from:"settle", cam:0, lab:"setin"},
  {kind:"seated", dur:3.10, x:SEAT_X, cam:0, pose:"sit-slump", from:"sit", lab:"bored"},
];
let TOTAL = SEQ.reduce((s,a)=>s+a.dur, 0);
retime();                      // fills AT{} with each label's start time
```

**Never hand-type cue seconds.** Derive them from `AT["label"] + offset`, or every
duration change silently drifts every cue after it.

## The kinds in film 1

| kind | what it does |
|---|---|
| `walk` | travels between two x, stride driven by distance |
| `turn` / `hold` / `wave` | opening beats, pose blends |
| `sit` / `rest` / `seated` | settle into a named pose, then breathe |
| `seat2` | two poses in one beat: settle, hold, move to the second |
| `raise` | one deliberate gesture up and back down |
| `think` | continuous hand drift (**deprecated** — reads as fidgeting) |
| `idea` | bulb pops, camera opens the frame |
| `recall` | head turns to each line as it is written |
| `locked` | stands out of the chair, hands meet, impact lines |
| `ask` / `hand` / `tdd` | presenting to a screen |
| `zoom` / `watch2` / `prod` / `noticed` | the big screen sequence |
| `l*head` / `dialog*` / `l*end` | a lesson: card, exchange, takeaways |
| `tomeme` / `meme` / `memeup` | the video clip slides in, plays, lifts away |
| `show` | presents a built card, tracking each element as it lands |
| `bow` | curtain call (the pose is a wave — see rules.md) |

## Beat template

```js
{kind:"<kind>", dur:<seconds>, x:<world 0..1>, cam:<world>, lab:"<name>"}
```

Rules of thumb from film 1:

- Leave **0.25s of empty stage** between beats. Consistent gaps are what makes pacing
  feel deliberate rather than accidental.
- A beat carrying copy needs `beat length ≥ cue offset + reading time`. `check.js`
  will tell you when it does not.
- Set pieces **slide in and out in world space**, not screen space. A screen-space
  offset gets dragged back into frame the moment the camera pans.
- The order things appear is a decision. Say what it is, then show it — film 1 had
  the Claude Code screen arriving 0.6s *before* its own headline and it read as
  backwards until that was flipped.
