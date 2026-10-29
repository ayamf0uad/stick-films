#!/usr/bin/env python3
"""Package a film into one double-clickable HTML file.

    python3 tools/build.py films/01-claude-code-story

Everything is inlined: the engine, the film script, and every asset as a data URI.
The result must resolve from an empty directory — a file referenced by name instead
of embedded looks perfect locally and is broken on the viewer's machine. tools/iso.js
checks exactly that, and it is not optional.
"""
import base64, json, mimetypes, pathlib, re, sys

ORDER = ["rig", "motion", "text", "stage", "timeline", "audio"]   # film goes here
TAIL = ["player"]                                                 # bootstrap runs last

film = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "films/01-claude-code-story")
root = pathlib.Path(__file__).resolve().parent.parent
eng = root / "engine"
meta = json.loads((film / "meta.json").read_text())

script = "\n\n".join(
    [f"// ═══ engine/{m}.js " + "═" * (56 - len(m)) + "\n" + (eng / f"{m}.js").read_text()
     for m in ORDER]
    + [f"// ═══ {film.name}/film.js " + "═" * max(0, 50 - len(film.name)) + "\n"
       + (film / "film.js").read_text()]
    + [f"// ═══ engine/{m}.js " + "═" * (56 - len(m)) + "\n" + (eng / f"{m}.js").read_text()
       for m in TAIL])

html = (eng / "shell.html").read_text()
beds = meta.get("beds", [])
audio = "\n".join(
    f'    <audio id="mus-{b["key"]}" src="{b["file"]}" loop preload="auto"></audio>'
    for b in beds)
buttons = "\n".join(
    f'      <button class="mus{" on" if b.get("default") else ""}" '
    f'data-m="{b["key"]}">{b["label"]}</button>' for b in beds)

for tag, val in (("TITLE", meta["title"]), ("SUB", meta["sub"]), ("BEDS", buttons),
                 ("MEDIA", audio + "\n" + (film / "media.html").read_text().rstrip("\n")),
                 ("EXTRA", (film / "extra.html").read_text().rstrip("\n")
                  if (film / "extra.html").exists() else ""),
                 ("SCRIPT", script)):
    html = html.replace(f"<!--{tag}-->", val)


def inline(mo):
    name = mo.group(1)
    if name.startswith("data:"):
        return mo.group(0)
    src = next((p for p in (film / "assets" / name, film / name, root / name)
                if p.exists()), None)
    if src is None:
        raise SystemExit(f"asset not found: {name}")
    kind = mimetypes.guess_type(name)[0] or "application/octet-stream"
    b = base64.b64encode(src.read_bytes()).decode()
    return f'src="data:{kind};base64,{b}"'


html = re.sub(r'src="([^"]+)"', inline, html)
out = film / f"{film.name}-OPEN-ME.html"
out.write_text('<!doctype html><html><head><meta charset="utf-8">'
               f'<title>{meta["title"]}</title></head><body>' + html + "</body></html>")
print(f"{out}  {out.stat().st_size/1e6:.2f} MB  "
      f"({len(script.splitlines())} lines of script)")
