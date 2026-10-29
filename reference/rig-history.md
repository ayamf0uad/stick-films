# Stick-figure animation — handoff

Context for picking this up in a new conversation. Attach `opening.html` and
`stick-rig.html` alongside this file.

---

## The problem this solves

I started with two PDFs of a stick-figure storyboard (`AI_coding_agent_storyboard.pdf`
and `..._pose_rig.pdf`) — around 34 hand-drawn poses: a 6-frame walk cycle, 8 pointing
directions, dance poses, profile walk/run, a turn, and a desk→cheek→mouth→idea beat.
There was also a purple square-headed "Claude" figure using the same rig.

Earlier attempts asked a model to generate *frames*. That fails: every regeneration
re-guesses proportions and the figure visibly drifts.

**The fix: it isn't a frame problem, it's a rig problem.** The PDFs were Chrome-printed
vector, and every pose was the same skeleton at different joint angles. So I rebuilt it
as one parametric skeleton drawn on `<canvas>`, where a pose is just twelve numbers.
Consistency becomes structural rather than something a model has to maintain, and
in-betweens are computed instead of drawn.

Generative video tools (Kling, Runway, Veo, Sora) were ruled out for this — they redraw
pixels and can't hold flat line art stable. If the hand-coded approach ever gets too
tedious, **Rive** is the sensible upgrade: the poses map to states and it has a real
timeline GUI.

---

## The two files

Both are standalone HTML — no build, no dependencies. Open in a browser.
Fonts (Space Grotesk, IBM Plex Mono) load from Google Fonts, so first paint needs
network; canvas text draws after `document.fonts.ready`.

| File | What it is |
|---|---|
| `stick-rig.html` | Pose library + a demo where she presents three slides and dances. Shows all 36 poses as clickable thumbnails. Good for browsing/authoring poses. |
| `opening.html` | **The live one.** The actual opening scene, 13.7s. This is where the work continues. |

---

## Rig conventions — read this before editing poses

**Angles are absolute, in degrees, measured from straight-down.**
`0°` = pointing down · `90°` = right · `-90°` = left · `180°` = straight up.
Absolute (not relative-to-parent) is what makes interpolation behave.

A pose is created with the `P({...})` helper, which fills in defaults:

| Key | Meaning |
|---|---|
| `t` | torso lean (0 = vertical, + = lean right) |
| `h` | head tilt |
| `al1`, `al2` | left arm — upper, then forearm |
| `ar1`, `ar2` | right arm — upper, then forearm |
| `ll1`, `ll2` | left leg — thigh, then shin |
| `lr1`, `lr2` | right leg — thigh, then shin |
| `dy` | root lift; **negative = up** (jumps), positive = down (sitting) |
| `f` | facing: `1` = front, `0` = profile |

**`f` is the clever bit.** At `f:1` shoulders and hips separate and the eyes centre;
at `f:0` they stack and the eyes shift toward the facing direction. So the front-view
and profile poses are one rig, and a turn is just `f` sliding 1 → 0. Fractional values
work — the beckon pose uses `f:.35` to sit mid-turn.

Proportions (`const R`, local units): `torso:46, headGap:6, headR:13.5, shoulderDrop:8,
upper:19, fore:16, handR:3.6, thigh:24, shin:24, hipX:4.5, shX:2.5, lw:3.4`.
`drawFigure()` takes the **hip** as its origin.

**Known constraint:** arm span is 35 units but the shoulder sits 38 above the hip, so
a seated figure's hands *cannot* reach her lap. This is real geometry, not a bug — the
seated pose bends the elbow forward to compensate. Don't "fix" it by lengthening arms
without checking every other pose.

---

## opening.html — how the scene is built

### World coordinates and the camera

The scene is a strip **two screens wide**. `x` values are world fractions of screen
width, not screen positions. Screen position is `(x - cam) * W`.

- Scene one sits at world `0`
- The chair sits at `CHAIR_X = 1.50`
- `cam` pans `0 → 1` during the `travel` beat

Title, subtitle and cue text are all pinned to scene one, so panning slides them off
left by itself — **nothing fades**. Ground ticks are drawn in world space too; without
them, once the text leaves frame there's no motion cue and she looks like she's on a
treadmill.

The camera deliberately **lags** mid-pan (`cam = e - 0.06·sin(e·π)`). Without this she
holds a fixed screen position and only the background moves, which reads wrong. The lag
lets her pull ahead, then the camera catches up as she arrives.

### The beats (`SEQ`, total 13.73s)

| Beat | Dur | What happens |
|---|---|---|
| `walk` | 2.05 | walks in from world −0.10 to 0.50 |
| `turn` | 0.50 | turns to face front via `f` |
| `hold` | 0.28 | settles |
| `wave` | 2.00 | ~4 waves |
| `hold` | 2.30 | stands, breathing |
| `cue` | 1.15 | half-turns and beckons |
| `travel` | 2.70 | **camera pans 0 → 1**, she walks to the chair |
| `sit` | 0.85 | sits |
| `rest` | 1.90 | seated, breathing |

Text cues: `T_TITLE = 3.45`, `T_SUB = 4.35`, `T_CUE = 7.11` (seconds).

Each beat is a `kind` handled in `stateAt(time)`, returning `{pose, x, cam, label}`.
Adding a beat = one entry in `SEQ` + one branch in `stateAt`.

### Final copy

> **My Claude Code journey**
> Sidequested so hard I built a product

Chosen from three options. "A story of how" was cut because the title/subtitle split
already does that work, and the leading "I" was dropped so it reads as a caption rather
than a confession. Title is Space Grotesk 76px bold; subtitle IBM Plex Mono 33px.
Cue line ("Walk with me to know what happened") is Space Grotesk 40px in the accent
blue — deliberately a different voice, since it's an instruction to the viewer rather
than part of the title block.

### Palette

Sampled from the original PDFs. `--ink #3D5BD9` (figure) · `--claude #7C4DD6`
(the square-headed variant, not yet used in a scene) · `#FBFBFA` stage ·
`#F0EEE6` page · `#9AA3BF` chair · `#23252B` text · `#767C8A` muted.

### Export

"Record WebM" uses `canvas.captureStream()` + `MediaRecorder`. It records in **real
time** — let the full 13.7s play. WebM likely needs converting to MP4 for
PowerPoint/Keynote.

---

## Decisions worth knowing

- Text pans rather than fades, so scene changes read as one continuous space.
- The chair isn't animated in. It's parked at world 1.5 and enters when the camera
  passes ~0.45 — the premise is that scene two was always there.
- The chair is drawn **shallower than a real chair**. A stick figure has no depth, so
  at true depth the backrest sat ~80px behind her single-line torso and she looked
  perched in front of it rather than in it.
- The walk decelerates onto its mark on a single squared ease, so travel and step cycle
  end together. An earlier version crawled the last 7% of the distance and produced
  four phantom steps after she'd visually arrived.

## Known rough edges

- The hand circle overlaps the thigh line when seated — muddy at small sizes. Fix by
  dropping the hand circle on seated poses only.
- She sits in one motion, with no weight shift. Real sitting lowers and settles.
- The purple square-headed Claude figure from the original sheet is supported by the
  renderer (`drawFigure(..., color, square)`) but doesn't appear in any scene yet.
- The desk poses (`hand-desk`, `hand-cheek`, `hand-mouth`) exist in `stick-rig.html`
  but there's no desk prop drawn.

## Where it left off

The opening ends with her seated, facing right, breathing. **The next scene's content
is undecided** — that was the open question. The chair is at world 1.5 and the camera
is parked at 1, so scene two builds outward from there.
