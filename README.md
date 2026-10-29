# Stick Films

Short animated stick-figure films that explain things. Each one ships as a single
double-clickable HTML file with video, music and images embedded.

```bash
python3 tools/build.py films/01-claude-code-story    # → the OPEN-ME.html
node tools/check.js  films/01-claude-code-story      # verification suite
node tools/shot.js   films/01-claude-code-story 24.5 107   # render frames to look at
```

## Media

Clips and music are not committed. Each film's `assets/README.md` lists what its build
expects; drop in files you made or hold a licence for, then build.

## Making a new one

Ask for it. `/new-film` runs a structured interview, writes a brief and a beat sheet,
and waits for sign-off before anything gets animated. `/new-character` does the same
for a new figure. `/check-film` runs the checks.

## Where things are

| | |
|---|---|
| `engine/` | the reusable parts: rig, motion, text, stage, timeline, audio, player |
| `films/NN-slug/` | one film: `brief.md`, `film.js`, `assets/`, the built artifact |
| `library/` | how to design one — beats, characters, poses, motion, copy, sound, and the hard rules of the rig |
| `tools/` | build, verify, render frames, pixel-diff a refactor |
| `reference/` | film 1 as originally written, kept as the pixel-diff baseline |
| `BACKLOG.md` | what needs doing, and the principles behind how these get made |

Read `library/rules.md` before designing a shot. Every entry in it is something that
was tried, rendered, and looked wrong.
