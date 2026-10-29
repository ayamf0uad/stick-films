# Poses

## Authoring one

```js
POSES["stand-palm"] = P({...STAND, f:1, t:-3, h:-24,
                         al1:-164, al2:127, ar1:24, ar2:30, hf:1});
```

`P()` fills in a neutral standing figure; you override only what changes. `STAND`
and `SEATED` are the two bases. Angles are absolute — see `rules.md`.

Extra non-angle fields:

| field | effect |
|---|---|
| `hf: 1` | draw arms **after** the head, so a hand on the face is visible |
| `mouth` | `"smirk"` · `"x"` · `"think"` |

## Solving for a hand position

Two-link IK, when a hand has to land somewhere specific (chin, waist, face):

```
cos(interior) = (L1² + L2² − |Δ|²) / (2·L1·L2)
θΔ = atan2(dx, dy)
α  = atan2(L2·sin(180−interior), L1 + L2·cos(180−interior))
```

`L1 = R.upper = 19`, `L2 = R.fore = 16`. Check the answer against the reach limits in
`rules.md` before authoring it — a lot of natural-sounding poses are out of range.

## Then look at it

Every pose in film 1 that was authored by calculation alone needed at least one
correction after rendering. The maths gets the hand to the right place; whether that
place is *visible* — not behind a desk, not inside the head, not overlapping the
other arm — only the render tells you.

## Groups in film 1

- **standing**: neutral, settle, stand-front, stand-face, stand-watch, stand-hip,
  stand-smug, stand-giggle, stand-palm, pt-mid, pt-dn, sweep-up, wave-a/b
- **walk**: walk-side-1..6 (only 1..4 are distinct — see `motion.md`)
- **seated**: sit, sit-slump, sit-up, sit-desk, sit-cheek, sit-mouth, sit-open,
  sit-idea, sit-look, sit-oh, sit-hands, sit-lift-a/b
- **dance**: dance-1..4, dance-side-1/2, with `DANCE_DX` lateral travel
- **Claude**: the `bot-*` set

Render them all with `node tools/shot.js --poses` before designing a shot; it is
faster than reading angles.
