# Characters

Every character is the same skeleton in a different colour with a different head.
That is the whole trick: consistency is structural, not maintained.

```js
drawFigure(ctx, pose, x, y, scale, color, squareHead)
```

## Cast

### Hero (blue)
| | |
|---|---|
| colour | `#3D5BD9` |
| head | round, ponytail, two eyes and a mouth |
| scale | 3.15 (the reference size) |
| walk | 0.35s per step |
| poses | the full library — walk cycle, seated set, dialogue set, dance |

### Claude (orange)
| | |
|---|---|
| colour | `#D97757` |
| head | rounded square, two dash eyes; `mouth:"x"` when told off, `"think"` when working |
| scale | 3.15 beside the hero; 1.25 when small in a diagram |
| poses | `bot-idle`, `bot-talk`, `bot-watch`, `bot-wave`, `bot-shrug`, `bot-raise`, `bot-think`, `bot-thumb`, `bot-tell` |

The square head **shows its own rotation**. Any pose that tilts it past about 30°
turns the face on its side, so Claude's version of a lean counter-rotates the head.

## New character template

```markdown
### <Name> (<colour word>)
| | |
|---|---|
| colour | #RRGGBB |
| head | round / square · eye style · mouth states |
| scale | vs the hero's 3.15 |
| walk | seconds per step |
| silhouette | anything that makes it recognisable at a glance |
| poses | idle · talk · walk-compatible · wave · <role-specific> |
```

Then author the base poses and render a **contact sheet** of all of them before the
character appears in a film. `/new-character` does this.

## Picking a colour

It has to survive next to what is already on screen. Film 1's report mock used
`#3D5BD9` for a severity tag — the exact hero blue — and the tag and the figure read
as one object until it was changed to amber.
