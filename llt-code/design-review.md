# Design/UX Review — llt-code (Software & AI showcase page)

- Task: `t_19bfc134` (design/UX review). Build: `t_a3454ddb` (brokkr, commit 3beeb91). Design: `t_c86dc44d` (spec at `design-spec.md`).
- Date: 2026-09-24 — Sindri.
- Method: real Chrome over CDP (desktop 1400×900, mobile 390×844 + 360×800), end-state frames captured at each act and vision-judged, numeric geometry (rects, rects-vs-rects overlap tests, path-point sampling), WCAG contrast computed per token. The scroll engine itself was already CDP-verified in the build run; my headless tab throttles rAF, so motion was judged at settled end-states + code review, and the engine's per-frame behavior is taken from the build verification.
- **Verdict: not approvable as-is. The bones are right — the structure, the trace, the door, the data path all execute. Six P1 fixes stand between this page and "polished and technically impressive", all concrete and small. None are structural.**

---

## What works (verified, keep it)

- **The build trace executes as specified.** Playhead follows scroll (0→1 verified), act nodes light at ~0.15 and stay lit (the record), repo sub-ticks stamp as cards pass, mobile re-anchors to the bottom edge, RM renders the static legend, no-JS hides it. It reads as the signature move it was designed to be — a developer will describe it to a friend.
- **Hero at rest (p=0): strong.** H1 on one line at 65px, orange terminal period, left-anchored column, blueprint grid reads as premium texture (vision pass: "dimensional, not noise"). Numeric check: the orange signal path stays **≥16px clear of the kicker line, CTA row, and lead at p=0** (81-point path sampling, zero rect hits). No hard collision.
- **Lever end-state: coherent.** At p=1 the schematic is complete (17/17 strokes, 4/4 callouts, verified), the input→weights→output read is legible, right-column hierarchy (H2 → 2×2 caps → italic close) is clean with no overlap anywhere.
- **Rail rest frame: correct.** First card lands intact at the slab edge, the right-edge peek of card 3 signals "more", card schema is consistent across all four (name/stack/meta/blurb/links, real links, data-driven from repos.json).
- **Door: the page arrives and stops.** Terminal panel reads as crafted (colored prompt, aligned two-column rows), composition balanced, footer tiny. Verified frame + vision: "lands as a proper ending".
- **Mobile holds.** No horizontal overflow at 390 or 360 (docW == innerWidth), H1 steps down and wraps 2 lines, card stack uses the snap row (spec-sanctioned), door stacks cleanly.
- **Discipline holds.** Transform/opacity only (+ sanctioned dashoffset), one rAF loop, no gradients/glass/neon, eyebrow count within the 1-in-3 cap, copy is factual with zero invented stats, `repos.json` drives both card containers and the "Four things that run" count, static mirror byte-identical (build-verified).

---

## P1 — fix before launch (visible defects)

### 1. Rail flush frame: a repo card sits half-eaten behind the slab, with a dangling link fragment
**Where:** act 4, end of pan (the most-examined frame on the page — where every visitor's eye ends up).
**What (measured):** slab is 476px (34vw) wide, opaque, `z-index:2`, hard right edge. At pan end (`--pan-x:-835px`, verified), card 3 `eo-docs` lands at x 337–637: its left half is behind the slab. What survives is a fragment — a floating `2013`, a mid-sentence blurb (`site for Eduss`), and the tail of the readme link reduced to a **dangling `E ↗`**. Two independent vision passes read it as a rendering glitch. The slab's CSS comment promises "opaque ground + a fade to the right, per spec 8.8" — the fade was never implemented (`background:var(--surface)`, no gradient/mask).
**Fix (either/or, first preferred):**
- (a) Give the slab its right-edge fade: e.g. a `::after` gradient `to right, var(--surface) 78%, transparent 100%` (~60–80px) so cards dissolve into the ground instead of being cut. This is spec §8.8's own rule (hide the clip line), and it makes the occlusion read as deliberate at every pan position.
- (b) Retune so no card straddles the slab edge at pan end: with cards 300px + 48px gaps, card 3's end position (337) straddles 476 by construction of the travel distance. Shifting `.rail-track`'s `left` (currently 34vw) to clear the slab by one card-gap increment, or adding one rail item, lands card 3 either fully hidden or fully clear. If (b) alone, verify at 1200/1400/1800 — the straddle is width-dependent.
Do (a) regardless: at mid-pan positions, other cards will also cross the slab edge (that's the design), and only the fade makes every crossing read clean.

### 2. Rail heading's top-left collides with the trace label zone (triple-stacked labels at the peak)
**Where:** act 4 pinned, top-left of the slab.
**What (measured at 1400×900):** the rail text column starts at x=32 — exactly where trace node labels render (`.tlabel` left:32px). At the rail pin, the lit `capabilities` label (y 337–349) sits directly under the teal `the proof` eyebrow (y 322–334) and overlaps the H2's top edge by ~11px (H2 y 348–457). The frame shows three mono/display lines stacked in the corner — `THE PROOF` / `capabilities` / `The code is the portfolio.` — and vision reads it as a glitch ("two kickers stacked"). The existing `tlabel-off` fix hides only the active act's own label (`proof`); the *previous* act's lit label (`capabilities`) is still on screen, and at this exact y-band it lands on the heading.
**Fix:** left-pad the rail-head to clear the trace (`padding-left` ≥ 64px inside the slab) **and** extend the label-suppression rule: while an act is pinned, hide any lit label whose node y-band overlaps the pinned act's heading block (the app already computes `activeId` + act rects; a rect test on the label is two lines). Dots stay lit — the record is kept, per the existing fix's own logic.

### 3. Act 5 (AI/who) is not pinned: ~1.3 viewports of dead scroll
**Where:** `#ai`, between rail and door.
**What (measured):** the section is 1980px (2.2 svh) tall, but the content (`.wrap`, ~790px) is plain in-flow — there is **no `.stage` element in act 5**, so the CSS that pins it (`.act-ai .stage{…}`, style.css:68, 517) is dead code. Result: after the reveal fires, ~1190px of scroll (1.31 viewports) shows **only the trace rail on an empty ground** — captured frame confirms a full viewport of nothing. That is a flat, dead stretch in the middle of the journey, right before the close.
**Fix:** wrap act 5 content in `<div class="stage">` (the CSS already exists and expects it), so the section pins like the others and the ~1.2vh of span becomes dwell on the content instead of void. Re-check the reveal trigger (it's position-based, not act-based, so pinning won't strand it) and the RM/no-JS paths (content is already all-visible there).

### 4. Mobile trace: the bottom line is never rendered — five dots float over nothing
**Where:** `<1024px`, `.trace-h`.
**What (measured):** `getComputedStyle(.trace-h).display === "none"`, clientWidth 0. Cause: the global rule `.trace .trace-h{display:none}` (style.css:75) is never re-enabled in the `@media (max-width:1023px)` block, which styles the line's children (dasharray, playhead transform, node positions) but not the svg itself. So on phones the "signature move" is five orphan dots; the line, the playhead track, and the lit-fill are all absent. The playhead element exists (x-animated) but moves along nothing. Spec §7 explicitly specifies the bottom-edge line + playhead for mobile.
**Fix:** add `.trace .trace-h{display:block}` (or `display:inline-block`) inside the `@media (max-width:1023px)` block. While in there: mobile node hit-areas are 44×32 with the `ai` and `ship` areas overlapping by 4px (`ai` 285–329, `ship` 325–369) — nudge the node tfrac spacing or drop hit-width to 40 so the two rightmost targets don't share pixels.

### 5. Small-text contrast fails WCAG AA — the spec's own restrictions were overridden by the build
**Where:** every use of `--ink-faint` and `--steel` as text.
**What (computed):**
| pair | ratio | where used as text |
|---|---|---|
| `--ink-faint #6A7076` / `--bg` | **3.75:1** | footer (11.5px mono), card-meta (12px), kicker (12.5px), hero-cap (15.5px) |
| `--ink-faint` / `--ground-deep` | 3.86:1 | footer on the door |
| `--steel #2F7E8C` / `--bg` | 4.01:1 | term-prompt (14px mono) |
| `--steel` / `--surface` | **3.76:1** | rail-eyebrow + AI eyebrow (12px bold mono) |
Spec §2.1 marked both as *non-text / large-text only* (≥3:1) — but the build uses them at 11.5–14px, where AA requires 4.5:1. All four pairs fail. Vision independently flagged the footer and the rail labels as the weakest contrast on the page.
**Fix (verified replacement tokens, same hues):**
- `--ink-faint: #8B9197` → 5.9:1 on `--bg`, 6.07:1 on `--ground-deep` (all uses pass with margin).
- `--steel: #3597A8` → 5.49:1 on `--bg`, 5.15:1 on `--surface` (both eyebrows + prompt pass; keeps the steel character).
Both are small shifts; re-verify the two new values against `--surface-raised` if any card-hover state ever carries steel text (currently none does).

### 6. Mobile card-link tap targets: 33px (spec requires ≥44)
**Where:** `.card-link` on the mobile snap row (all 8 links, measured 33×46 / 33×64).
**What:** `padding:10px 0` + 13px/1 text = 33px hit height. Spec §12: touch targets ≥44px on mobile.
**Fix:** in the mobile/RM media block, `.card-link{min-height:44px; display:inline-flex; align-items:center}` (already inline-flex; add the height). The `.term-line` rows already carry `min-height:44px` — the card links were simply missed.

---

## P2 — design polish (cheap, real value)

7. **Rail slab width vs text (the open item from the build handoff).** Measured: slab 476px, text ends at 420px → a 56px band of dead ground at rest, and the whole 34vw column reads wider than its content. Verdict: tighten. Drop the slab to `width:max-content` + generous right padding (or ~29–30vw), move `.rail-track{left}` to match, and re-measure the flush landing (feeds P1-1b). At 1200px the H2 wraps differently — re-check the slab there too.
8. **Card stack-vs-meta hierarchy.** The two mono lines differ only by dimness (vision: "adequate but subtle"). Give them a typographic tier: stack `13px/400 --ink-soft` (as is), meta → `12px/400 --ink-faint-new` with `letter-spacing:.04em`, or drop meta weight to 400 at 11.5px. One step of *size or weight*, not just opacity.
9. **Act 5 hierarchy: two display blocks at the same size.** `h2` (38px) and `who-line` (40px) are effectively equal — the conversion climax ("The person who wrote this page…") gets no more weight than the section intro. Give the who-line one step (clamp max ~2.75rem) or the h2 one step down; also even out the block gaps (measured 50px / 70px vs ~20px elsewhere → set both to 56px).
10. **Hero planes in the read zone.** At rest there's no collision (verified), but the sketch plane (0.3 opacity) sits directly behind the lead + button zone and the signal line passes within ~16px of the kicker's right end. Vision: "borderline clutter / one soft crowding". Fix: sketch plane `opacity:.2` and/or shift its svg down ~8vh; optionally nudge the signal path's last vertex 40px lower so the kicker band is fully clear. Keep the copy at 1x — that part is right.
11. **Gap act volume.** The crossfade lines are `--ink` 700 — loud for the "quiet, held" beat the spec calls for. Consider cue1–2 at `--ink-soft`/600 and reserving full white 700 for cue3 ("This is neither.") as the resolution. Optional — current state is defensible, this just makes the breath quieter.
12. **Mobile folio wrap.** At 390, `start a build` breaks as `START A / BUILD` and the brand stacks two lines. `white-space:nowrap` on `.folio-links a` + a shorter label (`build`) keeps the folio one line; or deliberately set a two-line folio style for <480px.

## P3 — content calls (Chris's, not defects)

13. `tesloth.github.io` (the Pages host) sits on the rail as a "work" card. It's infrastructure, not a build — the weakest of the four for a "show me what you make" moment. Fine if intentional (it does prove the no-build-step claim); worth replacing with a real build as they ship.
14. Lever diagram semantics: the orange path (input→weights→output) bypasses the MODEL node, so the schematic implies two routes without saying which is the data path. A 3-second fix (route the orange line through the model node, or relabel) makes the "code constructing" read unambiguous.
15. No `<link rel="icon">` (404s in devtools) and no `og:image` for link previews. Cheap, do in the QA pass.

---

## Open items from the build handoff — dispositions

- *Rail heading label width vs text column (empty ground band)* → **confirmed, tighten** (P2-7, measured 56px band at 1400).
- *Trace "capabilities" label ~1px above rail-head eyebrow* → **worse than reported**: it's a real overlap with the H2 at 1400×900 and a confusing triple-stack (P1-2).
- *Hero line-work under copy — premium or cluttered?* → **premium, with a nudge**: the grid earns its keep; the sketch plane in the read zone is borderline (P2-10). No collision at rest (verified numerically).

## Not defects (checked, clearing the record)

- Hero signal line vs meta/kicker: no overlap at p=0 (16px clearance, 81-point sample).
- "INFERENCE" misspelling flagged by vision: the HTML says `Inference` — OCR artifact.
- Footer email: correct in HTML (`info@leaselogictechnologies.com`).
- Gap act frame: cue crossfade state verified at p=0.5 (exactly one cue at full opacity, no empty frame).
- Door/term/ftr at p=1: all at opacity 1, balanced, holds (spec §8.7 "only the last act may hold" — respected).
- No-JS mirror, RM static legend, repo-tick fast-jump guard: code-reviewed, consistent with the build's CDP verification.
