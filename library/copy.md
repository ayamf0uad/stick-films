# Copy on screen

## Reading time

```
need = 0.45 + characters × 0.045   seconds
```

0.45s to notice a line, then about 22 characters a second. `tools/check.js` enforces
it against every piece of copy with a bounded window. A line that cannot be read in
the time it is up is a bug, not a style choice.

Register copy in `window.__timed` as `{where, txt, in, out}` or the check cannot see
it. `out: null` means "until the end of the film".

## Typing

Text types at `TYPE_CPS = 46` characters a second. Pass a `from` time to `line()` /
`line2()` and it types from there; omit it and the line appears whole.

**Footnotes appear whole.** Watching an aside type itself pulls the eye off the thing
it annotates.

A line can be **cut off mid-word**: pass a `cut` fraction to `drawCallout` and
everything past it renders grey while still being written. Used when one character
talks over another.

## Layout

- One type size and one baseline grid per scene. Film 1's desk scene was three
  different sizes on two different leadings before it was fixed to 44px on 78.
- Two blocks that replace each other should occupy the **same baselines**, so the
  scene reads as one page being written rather than separate captions.
- Stack list items by **measured height**, never hand-typed y values. An item that
  wraps to three lines will otherwise land on the next one — the gap inside an item
  and the gap between items end up identical and the whole block reads as one run-on.
- Centre a list's **text block** under its heading and let the ticks hang into the
  left margin, so heading and list share one centre line.
- Footnotes go **below the floor line**. That is where annotations belong.

## Honesty

**Never put a number on screen that cannot be traced to a source.** No invented
percentages, no unverifiable lift claims. If the owner asserts a figure it can go up;
if it came from nowhere it cannot. Film 1 has a "Verified across 12 runs" line that
exists only because Aya stated it.
