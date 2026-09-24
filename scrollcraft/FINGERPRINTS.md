# Fingerprints

Every site you build with **scroll-craft** gets one row here, appended after it
ships. The registry exists so your next build can prove it is a different page
rather than a re-skin of one you already made.

This file is **yours**. It starts empty on purpose: the gate is about not
repeating *yourself*, so it has nothing to say until you have built something.

The rules and the gate live in the skill's
`references/uniqueness.md`. Short version:

**A new build must differ from EVERY row below on at least 4 of the 6
dimensions.** Four against each row individually, not four on average across the
table. If a planned build fails, change the plan. Never edit a row to make room
for it.

The six dimensions are: **grammar**, **nav treatment**, **hero device**,
**act-sequence shape**, **close pattern**, **signature move**.

Dimension 6 is free, because a signature move is unique by definition. So the
gate really asks for three more out of the remaining five, and a build that
changes only grammar and world will fail it.

---

## The registry

| Build | Grammar | Nav treatment | Hero device | Act-sequence shape | Close pattern | Signature move | World | Port |
|---|---|---|---|---|---|---|---|---|
| **llt-code** (LLT software & AI, 2026-09-24) | Filmic one-shot | Fixed edge **build-trace rail** = the nav (commit-graph line; left edge desktop / bottom edge mobile; nodes are real `<a>` jumps) | Dimensional **parallax line-draw**: 3 independent SVG planes (grid / circuit-sketch / signal line), no media, kinetic H1 greet | 6 acts: parallax(2.4) → pin(1.4) → reveal(2.0) → **pan rail PEAK**(5.5) → flow+in(1.2) → pin-hold(1.6) | **Command-line input close**: mono shell prompt (`you@leaselogic:~$`) with 2 real `<a>` actions; cue holds, never fades | **The build trace** — scroll = a git commit-graph playhead that stamps persistent nodes per act + repo ticks as cards pan past; the peak's stamper | Dark technical / low-key **line-work** (inline SVG, self-drawing; no photography/video) | GitHub Pages (`tesloth.github.io` + `slv-websites` monorepo) |

*(the registry was empty for this build, so the gate passed trivially — recorded for the next build. From the second build onwards, the row above is the constraint: clear 4 of 6 dimensions against it individually.)*

---

## What is taken

Add a bullet here whenever a build claims something a later build should avoid
reusing: a grammar, a nav treatment, a close pattern, a signature move, an
act-count-and-length band. The shared columns are what the next build inherits
as a constraint, so writing them down is the whole point.

Nothing is taken yet.

- **llt-code** takes: the **build-trace** nav treatment and signature move (commit-graph
  playhead as edge rail + per-act node stamping); the **command-line input close** (mono
  shell prompt, 2 real links, hold cue); and the **6-act shape**
  `parallax → pin → reveal → pan → flow+in → pin-hold` in the ~13–14vh band. A later build
  may reuse filmic one-shot and a dark line-work world, but should not reuse those three,
  and must still clear 4 of 6 dimensions against the row above.

---

## Appending a row

After shipping, add one line to the table and one bullet to **What is taken** if
the build claimed something new. Fill every column. Say what the build shares
with existing rows.

Rows are append-only. A build that has been superseded stays in the table,
because the space it occupies is still occupied.

---

## Worked example

The skill's author kept a registry of twelve builds across eight page grammars.
If you want to see what a filled-in table looks like, and which shapes tend to
collide, read `EXAMPLES.md` in the scroll-craft repository. Treat it as
illustration only: those rows are somebody else's builds and they do **not**
constrain yours.
