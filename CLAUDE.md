# CLAUDE.md — Stick Films

## What this is

A studio for making short animated stick-figure films that explain things. Each film
is a `<canvas>` animation driven by a parametric rig, delivered as **one
double-clickable HTML file** with video, music and images embedded — no build step for
the viewer, no server, no dependencies.

The first film (`films/01-claude-code-story`) tells the story of building a CRO
heuristic evaluator with Claude Code. It is 4:10 and was made over one long session;
everything that session learned the hard way is written down in `library/`.

## Owner

Aya — Senior QA contractor. Films are for internal audiences (Slack, company meetings).
She reviews by watching, not by reading code. That shapes everything below.

## The three things that make this work

1. **A pose is twelve numbers.** Consistency is structural, not something a model has to
   maintain. Generating *frames* fails — the figure drifts. See `library/poses.md`.
2. **Verify on rendered frames.** Never assume a change looks right. Render it and look.
   Every visual claim in a handoff should be backed by a frame you actually viewed.
3. **Plan the film before animating it.** `/new-film` runs an interview and produces a
   beat sheet for sign-off. Animation starts only after that is approved.

## Backlog

`BACKLOG.md` is the single source of truth for what needs doing. Read it at the start
of every session. Its Principles section is short and load-bearing — read that before
making a design choice. When work finishes, mark it done with the date; when
something new surfaces mid-session, file it there rather than mentioning it once.

## Repo layout

```
engine/     film-agnostic code: rig, motion, stage, text, audio, player, shell
films/NN-name/  brief.md · film.js · assets/ · NN-name-OPEN-ME.html
library/    the templates and hard-won rules — read before designing anything
tools/      verification harness + packager
.claude/skills/  /new-film · /new-character · /check-film
```

## Commands

```bash
node tools/check.js films/01-claude-code-story     # full verification suite
python3 tools/build.py films/01-claude-code-story  # → the OPEN-ME.html artifact
node tools/shot.js films/01-claude-code-story 42 96.5   # render frames at times
```

## Working rules

These are not style preferences. Each one is here because breaking it cost real time.

### Editing
- **Every scripted edit asserts its match count.** A silent no-op replace once left a
  card rendering over a screen for several handoffs before anyone noticed. If an edit
  script can't find its anchor, it must fail loudly and write nothing.
- **Read the exact bytes before matching.** Indentation is six spaces in some blocks and
  four in others; guessing wastes a round trip.

### Verifying
- Render frames and **look at them**. `tools/shot.js` renders from the *built* artifact.
- Anything involving the video clip or audio must be verified against the **built**
  file over `file://`. The local preview server has no HTTP Range support, so the video
  cannot be seeked there and every screenshot silently shows frame zero.
- Before any handoff: `err` (no page errors) → `sweep` (no non-finite pose values across
  every frame) → `timing` (all copy readable) → `iso` (artifact resolves from an empty
  directory — catches assets that were referenced but never inlined).
- The empty-directory check is not optional. An asset referenced by filename instead of
  inlined looked perfect locally and was broken on Aya's machine for several sends.

### Rendering
- **No wall-clock in `frame()`.** `Date.now()`, `Math.random()`, and un-anchored
  `performance.now()` phases make renders non-reproducible and break seeking. Animation
  phase comes from the timeline, not the clock.
- Drive strides from **distance covered**, never from elapsed time, or feet slide and
  phantom steps appear after a figure stops.
- `mix()` interpolates angles only. Any non-angle field on a pose (draw order, mouth
  shape) must be carried across, not silently dropped.

### Copy on screen
- Reading time is `0.45 + chars × 0.045` seconds. `tools/timing.js` enforces it; a line
  that can't be read in the time it's up is a bug.
- Text types at 46 chars/sec. **Footnotes are the exception — they appear whole**;
  watching an aside type itself pulls the eye off the thing it annotates.
- Footnotes live below the floor line. That's where annotations belong.
- **Never put a number on screen that can't be traced to a source.** No invented
  percentages, no unverifiable claims. If Aya asserts a figure, it can go up; if it
  came from nowhere, it can't.

### Sound
- The music bed plays from a decoded `AudioBuffer` with a looping source node.
  `<audio loop>` restarts the decoder at the wrap and puts an audible gap there no
  matter how good the file is.
- Ducking alone doesn't make one soundtrack — the ear hears a track being *cut*. Drop
  **and** low-pass it under a clip so it reads as stepping behind a wall.

### Honesty
- If something can't be done, say so, show what was tried, and offer what can. Three
  failed attempts at folded arms were worth more than one silent substitution.
- When a fix is partial or a caveat exists, state it in the handoff.

## What not to do

- Don't generate frames with an image model. It was tried; the figure drifts.
- Don't add a bundler or npm dependencies. One HTML file is the delivery format.
- Don't put copy on screen that hasn't been through the reading-time audit.
- Don't hand over a film without having looked at rendered frames of what changed.
- Don't start animating before the beat sheet is approved.
