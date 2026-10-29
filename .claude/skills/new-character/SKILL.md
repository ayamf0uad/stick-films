---
name: new-character
description: Design a new character for the stick-figure films. Interviews for look and personality, authors the base pose set, and renders a contact sheet for approval before the character appears in any film. Use when Aya wants a new character, a second figure, or someone new in a scene.
---

# /new-character

A character is the same twelve-angle skeleton in a different colour with a different
head. That is why they stay consistent. Read `library/characters.md` and
`library/rules.md` first — the rules decide which poses are even drawable.

## Step 1 — Interview

One batched **AskUserQuestion**:

- **Name and role.** What are they in the story — a tool, a colleague, an obstacle?
- **Colour.** Must survive next to the hero blue `#3D5BD9` and Claude orange
  `#D97757`. Anything close to either will read as the same object.
- **Head.** Round or square; eyes as dots or dashes; which mouth states they need.
  A square head **shows its own rotation**, so it cannot tilt far.
- **Size.** Relative to the hero's scale 3.15. Smaller figures step quicker.
- **Signature.** One thing that identifies them at a glance — the hero's ponytail,
  Claude's square head.

## Step 2 — Author the base set

At minimum: `idle`, `talk`, a walk-compatible stance, `wave`. Then whatever the role
needs — thinking, pointing, reacting.

Author by IK where a hand must land somewhere specific (`library/poses.md`), then
**check every pose against the reach limits and occlusion rules** before rendering.

## Step 3 — Contact sheet, then stop

Render every new pose in one grid and show it. Do not put the character in a film
until the sheet is approved — a pose that does not read is far cheaper to fix here
than inside a built beat.

Say plainly which requested poses could not be drawn and why, with the alternative.

## Step 4 — Write it down

Add the character to `library/characters.md` using the template there, and the poses
to `library/poses.md`. Anything newly discovered about what the rig cannot do goes in
`library/rules.md`.
