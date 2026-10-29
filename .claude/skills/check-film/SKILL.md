---
name: check-film
description: Run the verification suite on a film — page errors, non-finite pose values across every frame, reading-time audit, and self-containment from an empty directory. Use before any handoff, or when a film misbehaves.
---

# /check-film

```bash
python3 tools/build.py films/NN-slug     # always verify the BUILT artifact
node tools/check.js films/NN-slug
```

Four checks, in the order they catch things:

| check | catches |
|---|---|
| `errors` | anything thrown at load |
| `sweep` | a non-finite pose value on any frame — a NaN angle draws nothing at all, and the figure quietly loses a limb |
| `timing` | copy that is on screen for less time than it takes to read |
| `isolated` | an asset referenced by filename instead of inlined. Looks perfect locally; broken on the viewer's machine |

The isolation check is not optional. It exists because a report screenshot went
missing for several handoffs — it loaded fine from the build folder and was blank
everywhere else.

## After a refactor

```bash
node tools/pixdiff.js <reference.html> <candidate.html> --skip=<clipStart>,<clipEnd>
```

Hashes canvas pixels at intervals in both. Identical hash means an identical frame.
Skip any video-clip window: HTML video seeking is not frame-exact, so two loads can
land on different frames of the clip without anything being wrong.

## When something fails

Do not narrow the check to make it pass. Find the cause, fix it, re-run. If it cannot
be fixed, say so explicitly in the handover rather than quietly shipping around it.
