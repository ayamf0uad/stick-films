# Sound

## Preparing a music bed

```bash
python3 tools/loopfind.py track.mp3 films/NN-slug/assets/mus-score.mp3
```

Source tracks are mastered loud (around −10 LUFS) and end rather than repeat, so
they cannot loop as-is. `loopfind.py` cuts one into a seamless loop. Three things
it knows that are easy to get wrong:

**A crossfade hides a click, not a musical mismatch.** If the loop length is not a
whole number of bars, the downbeat lands in the wrong place on every wrap and you
hear it even though the waveform is continuous. The bar length is measured from the
track's own self-similarity — the lags at which it repeats are multiples of the bar,
so their spacing gives it directly. Only whole-bar loops are ever considered.

**Never level with `loudnorm`.** It is a *dynamic* normaliser: it applies
time-varying gain, which pulls the two ends of the loop to different levels and
undoes exactly the continuity the crossfade was built for. Measure with `ebur128`
and apply one static `volume` gain instead.

**Two different joins have to work.** The crossfade blends the tail over the head,
so those must be alike — but the wrap itself runs straight through the cut point,
so the level either side of *that* must match too. A section boundary there is
completely invisible in the first test. Checking only the first produced a loop with
a 43% volume jump at the wrap.

**Score, then measure.** Scoring a loop is a model; building it and measuring the
wrap is a fact. The tool shortlists by score and then actually renders each
candidate and measures it. On film 1's track the top three by score all measured
around 21%; the fifth measured 3.1%. The table it prints is a shortlist, not a
verdict — listen before shipping one.

## Play it from a buffer, not an element

**`<audio loop>` puts an audible gap at the wrap** — it restarts the decoder — no
matter how good the file is. Decode once into an `AudioBuffer` and play it with a
looping source node, which wraps sample-accurately.

Measure the seam: the jump between the last sample before the wrap and the first
after should be a percent or two of full scale. Film 1's is 0.0136.

## Ducking under a clip

Dropping the volume is not enough — the ear hears a track being **cut**, and it
reads as two soundtracks. Drop **and low-pass** it (20kHz → ~340Hz) so it sounds
like the music stepped behind a wall. That is the `muffled` mode, and it is the
default.

## Choosing a track

Match tempo to what is on screen. Film 1's walk is 86 BPM at the stride cycle and
the clip is locked to 120.0 BPM; the chosen bed is 83 BPM, which lands the animation
in time for free and sits furthest from the clip. A bed within a few BPM of the clip
beats against it — worse than one far away.

A dark track (less energy above 2kHz) sits under content. A bright one competes.

## The mixer

Three knobs in the control bar, because describing a music bed in words is hopeless
and turning it while watching is not: **bed** (overall level), **lessons** (how far it
drops for the dialogue section), **clip** (muffled / silent / quiet / half / full).
The readout prints the exact settings so they can be quoted back and baked in.

## Recording

The canvas stream carries picture only. The clip and the bed route through one Web
Audio graph feeding both the speakers and a `MediaStreamDestination`, so the export
carries exactly what was heard. Built on the Record click, which is also the gesture
the AudioContext needs.

Verify a recording rather than assuming: `ffprobe` for a real audio stream, and
`volumedetect` to confirm it is not silent.
