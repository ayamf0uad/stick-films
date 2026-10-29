#!/usr/bin/env python3
"""One-shot: split the original single-file film into engine modules + a film script.

Slicing by hand-typed line ranges is how you lose a line and spend an hour finding
it. Instead the script body is parsed into top-level chunks (a declaration plus the
comment block above it), each chunk is assigned to a module by name, and the result
is checked line-for-line against the original: every line must appear exactly once.
"""
import re, sys, collections, pathlib

SRC = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "_incoming/story.html")
OUT = pathlib.Path("engine")
FILM = pathlib.Path("films/01-claude-code-story")

lines = SRC.read_text().split("\n")
i0 = lines.index("<script>") + 1
i1 = len(lines) - 1 - lines[::-1].index("</script>")
markup, body = lines[:i0 - 1], lines[i0:i1]


def chunks(body):
    """Top-level chunks: leading comments + one declaration, tracked by brace depth."""
    out, pend, cur, depth = [], [], None, 0
    for ln in body:
        starts = ln and not ln[0].isspace() and depth == 0
        if starts and re.match(r"^(//|/\*)", ln):
            if cur:
                out.append(cur); cur = None
            pend.append(ln); continue
        if starts and ln.strip():
            if cur:
                out.append(cur)
            cur = {"key": keyof(ln), "lines": pend + [ln]}
            pend = []
        elif cur:
            cur["lines"].append(ln)
        elif pend:
            pend.append(ln)                      # blank line inside a comment run
        else:
            out.append({"key": "~stray", "lines": [ln]})
        depth += ln.count("{") + ln.count("(") + ln.count("[")
        depth -= ln.count("}") + ln.count(")") + ln.count("]")
    if cur:
        out.append(cur)
    if pend:
        out.append({"key": "~trailing", "lines": pend})
    return out


def keyof(ln):
    m = re.match(r"^(?:async\s+)?(?:function|const|let|var)\s+([A-Za-z_$][\w$]*)", ln)
    if m:
        return m.group(1)
    # assignments to a member get a stable short key: "mclip.onclick", not a
    # truncation of the whole arrow function
    m = re.match(r"^([A-Za-z_$][\w$]*(?:\.[\w$]+)+)\s*=[^=]", ln)
    if m:
        return m.group(1)
    m = re.match(r"^window\.([\w$]+)", ln)
    if m:
        return "window." + m.group(1)
    m = re.match(r"^document\.getElementById\(\"([\w-]+)\"\)", ln)
    if m:
        return "#" + m.group(1)
    return re.sub(r"\s+", " ", ln.strip())[:44]


MODULES = {
    "rig": ["R", "P", "POSES", "KEYS", "mix", "ease", "D", "drawFigure"],
    "motion": ["WALK", "WALKC", "STRIDE", "stridePose"],
    "text": ["outQuint", "wrap", "fade2", "fade", "NOW", "TYPE_CPS", "typed",
             "drawTyped", "line2", "line", "bubble", "typeBlock", "drawCallout"],
    "stage": ["cv", "W", "drawChair", "drawDesk", "drawBulb", "drawTick", "drawArrow",
              "drawClaudeMark", "drawMonitor", "drawCode", "handAtL", "handAt",
              "drawGlass"],
    "timeline": ["AT", "READ", "retime"],
    "audio": ["MUS", "mvol", "CLIPMODE", "clipIdx", "mclip.onclick", "bedLevel", "syncMusic",
              "ac", "audioGraph", "bedBuf", "bedSrc", "bedStop", "bedStart",
              "mustag", "musKey", "unblock",
              'document.querySelectorAll(".mus").forEach(b=>b.onclick'],
    "player": ["t", "tag", "loop", "window.__seek", "window.__TOTAL", "#play",
               "#back", "#mute", "#rec", "recorder",
               'document.addEventListener("visibilitychange",()=>{ if(',
               "window.addEventListener",
               "Promise.race([document.fonts.ready,new Promise(r=>set",
               "scrub.oninput"],
}
# keyof() truncates long statement keys to 44 chars, so the map matches by prefix.
# Any entry that never matches is a typo, and a typo here silently dumps engine
# code into the film — which is exactly the class of bug this file exists to avoid.
def owner(key, used):
    for m, ks in MODULES.items():
        for k in ks:
            # identifiers match exactly; only long statement keys match by prefix,
            # or "P" would swallow "POSES" and "t" would swallow "tag"
            if key == k or (len(k) > 40 and key.startswith(k[:44])):
                used.add((m, k)); return m
    return "film"
ORDER = ["rig", "motion", "text", "stage", "timeline", "audio", "film", "player"]

cs = chunks(body)
used = set()
buckets = collections.OrderedDict((m, []) for m in ORDER)
for c in cs:
    buckets[owner(c["key"], used)].append(c)

missed = [(m, k) for m, ks in MODULES.items() for k in ks if (m, k) not in used]
assert not missed, f"module map entries matched nothing: {missed}"

# ── the invariant: nothing lost, nothing duplicated ────────────────────
rebuilt = [ln for m in ORDER for c in buckets[m] for ln in c["lines"]]
assert collections.Counter(rebuilt) == collections.Counter(body), "line set changed"
assert len(rebuilt) == len(body), f"{len(rebuilt)} lines out vs {len(body)} in"

HEAD = {
    "rig": "The figure itself. A pose is twelve absolute joint angles in degrees:\n"
           "0 = straight down, +90 = right, -90 = left, 180 = straight up.",
    "motion": "Walking. Strides are driven by distance covered, never by the clock.",
    "text": "Type on screen: wrapping, typing, fades, speech callouts.",
    "stage": "The canvas, and the props that stand on it.",
    "timeline": "Beat start times, derived from the beat list. Hand-typed cue seconds\n"
                "drift the moment a duration changes; these never do.\n"
                "The film declares SEQ and TOTAL, then calls retime().",
    "audio": "The music bed and the recording graph.\n"
             "Expects the film to provide: vid (the clip element, or null),\n"
             "AT/TOTAL, and BED_CURVE naming the beats the level curve turns on.",
    "player": "Transport: the loop, the scrubber, seeking, and the WebM recorder.",
}
for m in ORDER:
    txt = "\n".join(ln for c in buckets[m] for ln in c["lines"]).strip("\n")
    if m == "film":
        p = FILM / "film.js"
        txt = ("// The Claude Code story, 4:10. Beats, copy and scenes only —\n"
               "// everything reusable lives in engine/.\n\n" + txt)
    else:
        p = OUT / f"{m}.js"
        txt = "".join(f"// {h}\n" for h in HEAD[m].split("\n")) + "\n" + txt
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(txt + "\n")
    print(f"{p}  {len(txt.splitlines()):5d} lines  {len(buckets[m]):3d} chunks")

(OUT / "_markup.html").write_text("\n".join(markup) + "\n")
print(f"engine/_markup.html  {len(markup)} lines")
