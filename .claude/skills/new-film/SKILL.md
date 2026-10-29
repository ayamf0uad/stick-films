---
name: new-film
description: Plan and build a new stick-figure film. Runs a structured interview, produces a brief and a beat sheet for sign-off, and only then starts animating. Use when Aya wants a new film, a new video idea, or to restart planning on one.
---

# /new-film

Films go wrong at the planning stage, not the animation stage. Film 1 was rebuilt
many times because the shape was discovered while animating. This skill front-loads
that: **nothing gets animated until the beat sheet is approved.**

Read `CLAUDE.md`, `BACKLOG.md` (especially its Principles) and everything in
`library/` before starting. The constraints in
`library/rules.md` decide what is even possible, and it is much cheaper to know them
during the interview than after a shot is built.

---

## Step 1 — Interview

Use **AskUserQuestion**, batched, not one question at a time. Cover:

**Audience and channel** — who watches, where, do they have sound, will they scrub or
watch straight through.

**Hard length cap.** Ask for a number. Film 1's cap was five minutes and every
retiming decision came back to it.

**Story in one sentence.** If it takes more than one, the film is two films.

**Tone.** Offer concrete options rather than adjectives: dry and factual · wry and
self-deprecating · warm and encouraging · deadpan. Ask what it must *not* sound like
— film 1's rule was "not salesy, and never 'I'm just a QA'".

**Cast.** Existing characters from `library/characters.md`, or new ones. A new
character means running `/new-character` first.

**Real assets on hand.** Screenshots, clips, logs, music. Real material is what makes
these films land — but check readability early: film 1's funnel screenshot had 10px
labels and had to be redrawn.

**Must-have beats.** What has to be in it.

**Sensitivities.** Claims that cannot be made, numbers that cannot be shown, people
or teams not to name without checking.

---

## Step 2 — Brief and beat sheet, then stop

Write `films/NN-slug/brief.md` and present a **beat sheet**:

| # | beat | kind | est. | copy | notes |
|---|---|---|---|---|---|

- `kind` comes from `library/beats.md`. Flag anything needing a new kind — that is
  engine work and should be visible before it is committed to.
- `est.` uses the reading model in `library/copy.md`. Sum it and compare to the cap
  **now**, not after building.
- Draft the actual on-screen words. Copy is most of the film.
- Flag every beat whose idea depends on something `library/rules.md` forbids, and say
  what the alternative is.

**Then stop and get sign-off.** Do not scaffold, do not write `film.js`.

---

## Step 3 — Build, act by act

1. `mkdir films/NN-slug/{assets}`; write `meta.json`, `media.html`, `film.js`.
2. Build one act at a time. After each: `python3 tools/build.py <dir>` then
   `node tools/shot.js <dir> <times>` and **look at the frames**.
3. `node tools/check.js <dir>` must be green before any handoff.
4. Send the built `-OPEN-ME.html` with a short note on what changed and what was
   verified. State caveats plainly.

Editing discipline (from `CLAUDE.md`): every scripted edit asserts its match count;
read the exact bytes before matching; never claim a visual result you have not seen
rendered.

---

## Step 4 — Close out

Fold anything new back into the library, so the next film starts further along:

- new pose → `library/poses.md`
- new failure → `library/rules.md`
- new beat kind → `library/beats.md` **and** `engine/`
- new character → `library/characters.md`
- anything discovered but out of scope → `BACKLOG.md`, filed with enough context to
  act on later without this conversation

Then update `films/NN-slug/brief.md` with what actually shipped, including where it
differs from the plan and why.
