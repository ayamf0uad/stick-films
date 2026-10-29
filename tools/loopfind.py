#!/usr/bin/env python3
"""Turn a music track into a seamless loop, by finding where it repeats itself.

    python3 tools/loopfind.py track.mp3 out.mp3 [--max=60] [--search=62]

Why this is not just "cut 55 seconds and crossfade": a crossfade hides a *click*,
it does not hide a *musical* mismatch. If the loop length is not a whole number of
bars, the downbeat lands in the wrong place on every wrap and you hear it even
though the waveform is continuous.

So: measure the bar length from the track's own self-similarity, then only ever
consider loops that are a whole number of bars, then pick the one whose crossfade
overlap is most similar.

Prints the seam measurements so the result is checkable rather than hopeful.
"""
import json, math, os, struct, subprocess, sys, tempfile

src = sys.argv[1]
dst = sys.argv[2] if len(sys.argv) > 2 and not sys.argv[2].startswith("--") else "loop.mp3"
arg = lambda n, d: float(next((a.split("=")[1] for a in sys.argv if a.startswith(f"--{n}=")), d))
SEARCH = arg("search", 62)      # only look inside the first N seconds
MAXLEN = arg("max", 60)         # longest loop to consider
XF = arg("xf", 1.5)             # crossfade length


def bands(path):
    """Eight log-spaced band energies per frame — enough to tell 'same part of
    the tune' from 'different part', which is all a loop join depends on."""
    raw = subprocess.run(["ffmpeg", "-v", "quiet", "-i", path, "-ac", "1", "-ar", "11025",
                          "-f", "s16le", "-"], capture_output=True).stdout
    s = struct.unpack(f"<{len(raw)//2}h", raw[:len(raw)//2*2])
    N, HOP, SR = 512, 256, 11025
    win = [0.5 - 0.5*math.cos(2*math.pi*i/N) for i in range(N)]
    edges = [1, 3, 6, 11, 20, 36, 64, 114, 200]
    idx = range(0, N, 4)                                   # decimated DFT
    cs = [[math.cos(-2*math.pi*k*i/N) for i in idx] for k in range(200)]
    sn = [[math.sin(-2*math.pi*k*i/N) for i in idx] for k in range(200)]
    F, E = [], []
    for st in range(0, len(s) - N, HOP):
        x_ = x = [s[st+i]*win[i] for i in idx]
        b = []
        for lo, hi in zip(edges[:-1], edges[1:]):
            e = 0.0
            for k in range(lo, hi):
                ck, sk = cs[k], sn[k]
                re = sum(x[j]*ck[j] for j in range(len(x)))
                im = sum(x[j]*sk[j] for j in range(len(x)))
                e += re*re + im*im
            b.append(math.log1p(e/(hi-lo)))
        m = sum(b)/8 or 1
        # normalised bands say WHICH part of the tune this is; the raw level says
        # how loud it is. Both matter: a join can match harmonically and still
        # step in volume, which is just as audible as a wrong downbeat.
        F.append([v/m for v in b])
        E.append(math.sqrt(sum(x*x for x in x_) / len(x_)))
    return F, E, SR/HOP


F, E, fps = bands(src)
EMED = sorted(E)[len(E)//2] or 1
end = min(len(F), int(SEARCH*fps))
print(f"{len(F)/fps:.1f}s of audio, searching the first {end/fps:.0f}s")


def cost(a, b, L):
    ia, ib, n = int(a*fps), int(b*fps), int(L*fps)
    if min(ia, ib) < 0 or max(ia, ib) + n > len(F):
        return 9e9
    spec = sum(sum(abs(F[ia+i][j] - F[ib+i][j]) for j in range(8))
               for i in range(n)) / (n*8)
    ea = sum(E[ia:ia+n])/n
    eb = sum(E[ib:ib+n])/n
    # Two different things have to be true, and only checking the first is what
    # produced a loop with a 43% volume jump at the wrap:
    #   1. the crossfade blends [B1,B] over [A,A+XF] — those must be alike
    #   2. the WRAP itself runs ...B1⁻ → B1⁺, so the level either side of B1
    #      must match too. A section boundary at B1 is inaudible in (1).
    w = max(1, int(0.25*fps))
    before = sum(E[ib-w:ib])/w if ib >= w else 0
    after = sum(E[ib:ib+w])/w
    wrap = abs(before-after) / max(before, after, 1e-9)
    return spec + 0.6*abs(ea-eb)/EMED + 1.2*wrap


# ── the bar grid, from where the track repeats itself ──────────────────
# How well does the track repeat after L seconds, averaged over EVERYWHERE in the
# search region? Cheap fixed windows give neighbouring lags that all score alike,
# which yields no usable grid — the whole region is what separates a real repeat
# from an accident.
def selfsim(L):
    n = t = 0
    for i in range(0, end - L, 3):
        t += sum(abs(F[i][j] - F[i+L][j]) for j in range(8)); n += 1
    return t/(n*8) if n else 9e9

curve = sorted((selfsim(L), L/fps) for L in range(int(4*fps), int(min(30, SEARCH/2)*fps)))
lags = []                                   # distinct repeats, best first
for _, l in curve:
    if not any(abs(l - x) < 1.2 for x in lags):
        lags.append(l)
    if len(lags) >= 9:
        break
gaps = sorted(round(b-a, 3) for a, b in zip(sorted(lags), sorted(lags)[1:])
              if 1.2 < b-a < 4.5)
if not gaps:
    sys.exit("no repeating structure found — this track may not be loopable")
BAR = gaps[len(gaps)//2]                    # median: robust to one odd interval
print(f"bar = {BAR:.3f}s  →  {4*60/BAR:.1f} BPM   "
      f"(repeats at {', '.join(f'{l:.2f}' for l in sorted(lags)[:6])}s)")

# ── the best whole-bar loop ────────────────────────────────────────────
best = []
for nbars in range(8, int(MAXLEN/BAR)+1):
    L = nbars*BAR
    for k in range(0, 72):
        A = round(k*BAR/12, 3)
        if A + L + XF > SEARCH:
            continue
        # a mild pull toward longer loops: fewer wraps over a five-minute film
        best.append((cost(A, A+L, XF) * (1.25 - 0.25*L/MAXLEN), A, nbars, L))
best.sort()

# ── shortlist by cost, then MEASURE each one ───────────────────────────
# Scoring a loop is a model; building it and measuring the wrap is a fact. The
# model is only good enough to produce a shortlist, so the shortlist gets built.
import re as _re

def render(A, L, out):
    B1, B = A + L, A + L + XF
    cut = (f"[0]atrim=start={A}:end={B1},asetpts=N/SR/TB[m];"
           f"[0]atrim=start={B1}:end={B},asetpts=N/SR/TB[t];"
           f"[t][m]acrossfade=d={XF}:c1=tri:c2=tri")
    # Levelling uses a STATIC gain, not loudnorm. loudnorm is a dynamic
    # normaliser: it applies time-varying gain, which pulls the two ends of the
    # loop to different levels and undoes the continuity the crossfade exists for.
    pr = subprocess.run(["ffmpeg", "-nostdin", "-hide_banner", "-i", src,
        "-filter_complex", cut + ",ebur128=peak=true", "-f", "null", "-"],
        capture_output=True).stderr.decode()
    lufs = float(_re.findall(r"I:\s*(-?[\d.]+) LUFS", pr)[-1])
    tp = float(_re.findall(r"Peak:\s*(-?[\d.]+) dBFS", pr)[-1])
    g = min(-24 - lufs, -3 - tp)
    subprocess.run(["ffmpeg", "-nostdin", "-hide_banner", "-loglevel", "error", "-i", src,
        "-filter_complex", cut + f",volume={g:.2f}dB,aformat=channel_layouts=mono",
        "-ac", "1", "-ar", "44100", "-b:a", "96k", "-y", out], check=True)
    raw = subprocess.run(["ffmpeg", "-v", "quiet", "-i", out, "-ac", "1", "-ar", "44100",
                          "-f", "s16le", "-"], capture_output=True).stdout
    y = struct.unpack(f"<{len(raw)//2}h", raw[:len(raw)//2*2])
    w = 44100//4
    a = math.sqrt(sum(v*v for v in y[-w:])/w)
    b = math.sqrt(sum(v*v for v in y[:w])/w)
    return abs(a-b)/max(a, b)*100, abs(y[-1]-y[0])/32768*100, len(y)/44100, g


seen, shortlist = set(), []
for c, A, nbars, L in best:
    if (round(A, 1), nbars) in seen:
        continue
    seen.add((round(A, 1), nbars)); shortlist.append((c, A, nbars, L))
    if len(shortlist) >= 8:
        break

print("\n   A      bars   length   modelled   MEASURED wrap")
scored = []
with tempfile.TemporaryDirectory() as td:
    for c, A, nbars, L in shortlist:
        step, seam, dur, g = render(A, L, os.path.join(td, "c.mp3"))
        scored.append((step, A, nbars, L, seam, g))
        print(f"  {A:6.3f}   {nbars:3d}   {L:6.2f}s    {c:.4f}      {step:5.1f}%")

scored.sort()
step, A, nbars, L, seam, g = scored[0]
render(A, L, dst)
print(f"\n{dst}  {L:.2f}s ({nbars} bars)  {os.path.getsize(dst)/1024:.0f} KB  {g:+.1f} dB")
print(f"  seam step   {seam:.3f}% of full scale")
print(f"  energy step {step:.1f}% across the wrap")
if step > 12:
    print("\n  WARNING: that wrap will be audible. Try a different --search window,\n"
          "  or the track may not have a clean repeat in it. The table above is a\n"
          "  shortlist, not a verdict — listen before shipping one.")
