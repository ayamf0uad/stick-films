# Assets — bring your own

Media is not committed to this repo. The build inlines whatever is in this folder,
so put the files here before running `tools/build.py`. Missing files stop the build
with `asset not found: <name>`.

Film 1 expects (see `../meta.json`):

| file | role |
|---|---|
| `meme.mp4` | the video clip for the 3am beat; onset analysis assumed ~120 BPM from ~16s in |
| `mus-score.mp3` | the main music bed, cut into a seamless loop with `tools/loopfind.py` |
| `mus-comedy.mp3` | sting |
| `mus-cartoon.mp3` | sting |
| `mus-corporate.mp3` | sting |
| `mus-blooper.mp3` | sting |

Use media you made or hold a licence for. `library/sound.md` explains how to prepare
a music bed.
