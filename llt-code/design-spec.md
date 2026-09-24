# Design Specification — Lease Logic Technologies, Software & AI (GitHub Pages marketing page)

- Task: `t_c86dc44d` (design direction + scroll choreography). Build: `t_a3454ddb` (brokkr). Review: `t_19bfc134`. QA: `t_ef0fb51e`.
- Date: 2026-09-24 — Sindri.
- Inputs: Chris's brief (stunning, technically impressive, repo showcase with demo pages, parallax + unique scroll effects, "a journey through what is possible with code", wow factor at MAX); the established Lease Logic brand tokens (from `business/llt-3d-printing/design-spec.md`, the house brand); the `scroll-craft` skill (structure + motion discipline); the current public repos verified via the GitHub API on 2026-09-24.
- Status: **ready for implementation.** Copy is a sibling input (`t_0556049e`, bragi) and is NOT final here; the layout is wording-independent (fluid type, measure-limited, 2-line H1 cap — see §14). A developer should be able to build the page from this file without inventing the visual narrative.

---

## 1. Positioning

**Surface: Decided proof.** A visitor (a potential client, a founder, or a fellow engineer) lands wanting to know "what can this person actually build with code and AI?" They should leave believing *this engineer ships real, working, impressive things — I want them on my project*, and know the one action (open the code / start a build). This is a **carried journey**, not a navigation: the page is a film the visitor pushes through with the wheel.

**Tone:** the engineer at the feed store, not a SaaS deck. Confident, technically credible, plain-spoken. No hype, no "unlock / elevate / unleash", no buzzwords. The wow comes from **what actually happens on screen** (code that draws itself, a rail of real projects, a trace that logs the journey) — never from adjectives.

**Hard copy constraints (rendered page):** no em dash anywhere visible (use period, comma, colon, or parentheses). No filler verbs (elevate, seamless, unleash, next-gen, revolutionize, supercharge). No invented statistics or fake precision (`4.1×`, `92%`, `48k`). No "scroll ↓" cue, no `01 / 06` counter, no eyebrow on more than one in three headings. These are refuse-list bans, not style notes.

**Visual character in one line:** a dark, technical instrument — near-black ground, one industrial-orange signal, fine line work that builds itself under the hand, a commit-graph trace that is both the navigation and the memory of the page.

**Tradeoffs (named, per house rules):**
- We trade photographic richness for **reliability + on-brand technical character.** The page is type + inline SVG + CSS: no generated photos, no video scrub. A missing asset cannot break it, and a code/AI firm reads as *more* credible in line-work and motion than in stock imagery.
- We trade a generic "premium dark page" for a **bespoke structure** (the commit-graph trace + command-line close) so it is not one of the recognizable template pages.
- We trade completeness for **honesty:** no invented stats, no fake dashboards, no testimonials. The proof is the real repo rail (§9). The current public set is small and mixed; the showcase is data-driven so it grows as more repos/demos ship.
- We trade a sticky marketing bar for the **trace as navigation**, which is more on-brand and keeps the chrome out of the frame.

**Anti-slop tells this spec is designed to avoid:** AI violet-to-blue gradient (0), glassmorphism (0), gradient text / neon glow (0), icon-topper feature-card grid (0 — asymmetric, label-schema rail instead), equal three-column cards (0), monument stat counter (0 — no invented numbers), "scroll ↓" cue / animated mouse (0), `01 / 06` section counter (0), clay/low-poly diorama (0), center-stack hero (0 — split/layered), default Inter (0 — Space Grotesk + IBM Plex + Space Mono), magnetic-CTA close (0 — command-line close instead).

---

## 2. Design system (tokens)

Extend the established Lease Logic brand. Same hex values, contrast-verified in the 3D-printing spec (re-verify only if a value changes). This page is **dark-first** (charcoal ground), so the roles flip vs. the light-dominant 3D-printing page; the tokens are the same set.

### 2.1 Color

```css
:root{
  /* Grounds (dark-first) */
  --bg:            #101214;  /* page base — near-black, slightly cool */
  --surface:       #17191C;  /* panels, cards, raised ground */
  --surface-raised:#1B1E22;  /* one step up (active card, focus wash) */
  --ground-deep:   #0C0E10;  /* footer / trace channel, one step down */

  /* Ink */
  --ink:           #F7F5F0;  /* primary text on dark (16.17:1 on --bg) */
  --ink-soft:      #A7ADB3;  /* secondary text on dark (7.78:1 on --bg) */
  --ink-faint:     #6A7076;  /* meta, mono, trace idle (>=3:1, non-text use) */

  /* Accent — industrial orange, two depths (one hue, locked for the whole page) */
  --accent:        #E8501E;  /* on dark: large text, lines, signal (4.69:1 on --bg — LARGE text + non-text only) */
  --accent-deep:   #C23A0E;  /* buttons/fills (5.38:1 with --bg text) */

  /* Secondary — steel teal, technical detail only */
  --steel:         #2F7E8C;  /* non-text UI, line work, large text only (4.30:1) */
  --steel-deep:    #26666F;  /* small technical text on a light surface if one is used */

  /* Lines */
  --line:          rgba(247,245,240,0.14); /* hairlines on dark */
  --line-strong:   rgba(247,245,240,0.24); /* active/hover hairline */
  --trace:         #2F7E8C;   /* the trace channel, idle */
  --trace-live:    #E8501E;   /* the trace, the played/active part */
}
```

Verified contrast (from the shared brand baseline, WCAG 2.1): `--ink`/`--bg` 16.17 · `--ink-soft`/`--bg` 7.78 · `--accent` on `--bg` 4.69 (**restricted to large text ≥24px, or ≥18.66px bold, and non-text UI**; never body) · white/`--bg`-text on `--accent-deep` fill 5.38 · `--accent-deep` on `--bg` 4.94. All body pairs clear AA (≥4.5:1). Any new token must be re-verified before use.

Rules:
- Orange is the only saturated color on the page. It is the **signal**: the trace-live, active line work, links, the primary fill, focus rings. If orange appears where it is not action or emphasis, remove it.
- Steel is the **structure**: idle line work, hairlines, secondary technical labels.
- No gradients anywhere (no hero wash, no text gradient, no glass). No neon glow, no colored halo shadows.
- Drift the ground within one dark family only (see §11): 3-5 stops between `--bg` / `--surface` / `--ground-deep`, small steps. Never flip to a light ground mid-page (this is a dark page).
- Dark-mode type compensation: light-on-dark gets one step more line-height, a touch more tracking, one step more weight than the light-page metrics.

### 2.2 Typography

Three families, Google Fonts with `display=swap` + `<link rel=preconnect>` (self-host the WOFF2 if render-blocking third-party fonts are a concern — see §13).

- **Space Grotesk** — display: H1, section H2, H3, rail card names, button labels, wordmark. Weights 500/700/800.
- **IBM Plex Sans** — body, prose, card blurbs. Weights 400/500/600.
- **Space Mono** — technical/idiomatic only: the trace labels, eyebrows, step/meta numbers, the command-line close, stack tags. Weights 400/700. Never body copy. `font-variant-numeric: tabular-nums` on anything that counts or tabulates.

Scale (desktop; mobile §8.9):

| Role | Size / line-height | Family / weight | Tracking |
|---|---|---|---|
| Hero H1 (a genuine hero moment) | 58-64px / 1.02 | Space Grotesk 800 | −0.02em |
| H2 (sections) | 34-40px / 1.1 | Space Grotesk 700 | −0.01em |
| H3 (card titles, row titles) | 20-22px / 1.3 | Space Grotesk 700 | 0 |
| Lead (hero sub) | 19px / 1.55 | IBM Plex Sans 400 | 0 |
| Body | 17px / 1.65 | IBM Plex Sans 400 | 0 |
| Body small (card blurbs) | 15.5px / 1.55 | IBM Plex Sans 400 | 0 |
| Meta / eyebrow / trace label | 13px / 1.4, uppercase | Space Mono 400/700 | +0.08em |

Constraints: `text-wrap: balance` on H1/H2, `pretty` on paragraphs. Measure 62-68ch for prose (max-widths enforce). **The H1 must step down one rung below ~700px** (to ~40px / `--t-2xl` equivalent) so the hero does not wrap to 5+ lines on a phone. Headline max two lines at every breakpoint; subtext max ~20 words.

### 2.3 Spacing, radius, elevation

Base unit 8px.

| Token | Value | Use |
|---|---|---|
| Section (act) block pad | 112px desktop / 64px mobile | each `<section>` |
| Content gutter | clamp(20px, 5vw, 56px) | edge gutter; full-bleed line-work goes edge to edge |
| Container | max-width 1160px, centered | text content (text is never full-bleed) |
| Rail card | width clamp(15rem, 22vw, 21rem); gap 24px | repo rail (§9) |
| Cell padding | 24px (16 mobile) | cards, panels |

Radius: cards/panels 12px; buttons 10px; trace nodes 50%; pills 999px. Hold one scale.

Elevation (dark = **borders, not shadows**, per house): resting panel = 1px `--line` + a 1px top edge-light `rgba(247,245,240,.06)`; hover/active = 1px `--line-strong` + `--surface-raised`. No drop-shadow glow. Real raised elements (if any) use a tinted shadow with offset+blur (`0 12px 32px rgba(0,0,0,.45)`), never a zero-offset halo.

### 2.4 Motion posture (UI, non-scroll)

- Hover/focus: 120-180ms `cubic-bezier(0.23,1,0.32,1)` (ease-out). Never `ease-in` on UI.
- Buttons: hover translateY(−1px) + `--surface-raised`/brightness; active translateY(0) scale(0.98).
- Stagger group entrances 30-80ms. Enter from `scale(0.98)`+`opacity:0`, never `scale(0)`.
- Hover motion gated to `(hover:hover) and (pointer:fine)`. All of it disabled under `prefers-reduced-motion`.

### 2.5 Icons

A single real icon set, used ≤14px inline as link companions only (arrow-right, external, github-mark). `aria-hidden="true"` on every icon; adjacent text carries meaning. No icon-topper headers, no icon-in-rounded-square. (A github-mark is acceptable as the literal GitHub affordance; nothing else.)

---

## 3. Structure decision

This is the part that keeps the page from being a template.

### 3.1 Grammar — **Filmic one-shot** (a carried linear journey)

One linear argument with one emotional arc; the visitor is *carried*, not navigating. That is exactly the brief ("take the user on a journey"). The repo showcase is **one act within** this journey (a `pan` rail), not a second grammar — a device inside the journey is fine; a second organising logic is not.

**Why the other seven lost** (filmic carries a burden of proof):
- **Live surface** — the honest pitch of a code firm *is* "watch it do it," and the repo demos are the argument. But live-surface **forbids marketing chrome** (no wordmark+CTA, no hero claim, no 6rem headings). The brief explicitly wants a hero, capabilities, and a CTA. So the page must be a *marketing journey*, with code-flavored *moments* (line-draw, rail, trace, command-line close) inside it.
- **Chaptered editorial** — wants hard cuts, a title page, a colophon, no scrub, a printed feel. Wrong energy: the brief wants *wow* and a *journey*, not a long-form read.
- **Continuous world (worldflight)** — one unbroken camera through a place; the most expensive and fragile build, and the brief is not about travel through a place. Rejected on cost/fragility.
- **Typographic poster** — type is the imagery, no media. Striking, but it bans the card rail the brief centers on (a "repo showcase with demo pages").
- **Gallery / catalog** — the repo rail *is* a catalog, and that device lives in act 4. But a pure catalog has no arc, no hero, no CTA. Used as a device, not the grammar.
- **Split stage** — needs a two-sided argument (before/after). The brief is not a comparison.
- **Rhythmic cutlist** — short hard cuts, energy, no pin/dwell. The opposite of the "settling, premium" feel the repo showcase + line-draw need.

So: **filmic one-shot, deliberately de-templated** in nav, hero, close, and signature move (§3.3-3.5). The skill's four-builds-look-like-a-template failure is avoided by changing 4+ of the 6 fingerprint dimensions from the filmic defaults.

### 3.2 World — **Dark technical / low-key line-work** (no photography)

One world for the whole page, kept in a single dark family. The "imagery" is **fine line work that draws itself** (a technical-illustration idiom, worlds.md §8) + a faint engineered grid, all as inline SVG/CSS. No photographic ground, no scrub video. This is the honest, on-brand, GitHub-Pages-reliable choice and it is what makes the motion (line-draw, parallax planes, the trace) read as premium rather than as a photo page with a filter.

### 3.3 Nav treatment — **the trace is the navigation** (non-default)

No sticky wordmark+CTA bar. The page's chrome is the **build trace** (§7): a fixed thin rail along the **left edge (desktop) / bottom edge (mobile)** for the whole page, drawing a commit-graph line. Scroll position is the playhead; passing each act stamps a **node** with a mono label (`init`, `capabilities`, `proof`, `ai`, `ship`). Nodes are real links (jump to the section), so the trace *is* the nav and doubles as a record of where the visitor has been. At the very top, a single minimal folio line (mono: wordmark left, `github` + `start a build` right) scrolls away with the hero and re-appears only in the close.

### 3.4 Signature move — **the build trace** (bespoke, code-specific)

> "It's the site where scrolling is a git commit graph."

A single bespoke interaction that exists only on this page: the **build trace** of §3.3. A thin technical line (a commit graph / signal trace) fixed to the edge for the entire page; scroll position is the playhead; each act stamps a persistent node as it is passed; by the footer the trace is a **complete, clickable commit log of the whole journey**. It is the navigation, the memory, and the peak-stamping mechanism at once. It is driven purely from scroll progress (one CSS custom property + a few SVG nodes), `transform`/`opacity` only, and under reduced motion renders as a **static legend** (all nodes visible, no playhead animation).

- Why it counts: it is not a kit parameter, not a recoloured spotlight, not more of a device. It is the *journey rendered as a git log* — a hook a code-firm visitor will describe to a friend. It lives inside the peak (act 4 stamps every repo node) and resolves the ending (the trace completes to `ship`).
- Fallback: if it cannot be built cleanly, the page must still work with the trace **hidden** (content is never behind it) and nav falls back to the top folio + in-page anchor links. The trace is enhancement, not load-bearing.

### 3.5 Fingerprint gate

The scroll-craft fingerprint registry for this workspace is **empty** (fresh), so the gate passes trivially. To avoid the template shape regardless, the plan already differs from the filmic default on ≥4 of 6 dimensions:

| # | Dimension | This build | vs. filmic default |
|---|---|---|---|
| 1 | Grammar | Filmic one-shot | same (carried by the brief) |
| 2 | Nav treatment | fixed build-trace rail (edge) | **different** (wordmark+CTA bar) |
| 3 | Hero device | dimensional parallax line-draw, no media | **different** (full-bleed scrub) |
| 4 | Act-sequence shape | 6 acts, parallax→pin→reveal→pan→flow→pin, ~13-14vh | **different** (scrub-heavy, 6-7 acts @13.6-13.8) |
| 5 | Close pattern | command-line input close, trace completes to `ship` | **different** (spotlight + magnetic CTA) |
| 6 | Signature move | the build trace (commit-graph playhead) | free by definition |

The build card (`t_a3454ddb`) should append this row to the workspace `FINGERPRINTS.md` **at ship time** (not now — nothing is built yet).

---

## 4. The journey, the feel, the peak

### 4.1 Journey (6 beats)

| # | Beat | The visitor knows/feels |
|---|---|---|
| 1 | **The premise** | "This is a builder of things. Software + AI, engineered to ship." |
| 2 | **The gap** | "Most of these pages are templates; most dev portfolios are link dumps. This one isn't." (honest, no attack) |
| 3 | **The lever** | "Code is a lever: data, automation, interfaces, models. Here's what it does." |
| 4 | **The proof** (PEAK) | "Watch. Real projects, each with a live demo, and the page responds to my hand." |
| 5 | **The AI side** | "How AI is actually used here — concrete, no buzzwords." |
| 6 | **The door** | "Two real destinations: read the code, or start a build." |

### 4.2 Feeling curve (emotion, then the on-screen cause)

```
1  Curiosity     a dark, dimensional opening: a technical line-draw assembles under the grid,
                 the name, one line of who this is
2  Recognition   a plain, true line naming the template problem — quiet, held, no spectacle
3  Awe           the lever: code/line-work literally constructing as you scroll, the drawing building itself
4  Delight       THE PEAK — the repo rail: real projects, live demos, the page answers the pointer
5  Confidence    the AI side, stated calmly and concretely — compressed, information not spectacle
6  Resolve       it stops. One line, a real command-line, two real doors. The page hands over a door, not a fade.
```

No two adjacent acts share a feeling (recognition→awe→delight→confidence→resolve are all distinct). Act 2 is the quiet before act 3's draw; act 5 is the compressed "administrative" info beat.

### 4.3 The peak — act 4, the repo rail

- Named as the visitor would say it: *"I scrolled and the whole left edge filled in like a git log, then a rail of real projects slid past and each one had a live demo."*
- It gets three things, at the expense of the others:
  1. **The most scroll room** — the largest `span` on the page (act 4).
  2. **The silence before it** — act 3's line-draw *settles* (a dwell) and a short ground-only gap opens before the rail arrives, so the rail's lateral motion has something quiet to cut from.
  3. **The interaction budget** — the only act with pointer response (card tilt + the trace stamping each repo node). The page goes from *watch* (act 3) to *touch* (act 4); that contrast *is* the peak.
- A second act must not compete: act 3 (the line-draw) is the second-biggest but is a *watch* act, shorter span, no pointer. Demoted on purpose.

### 4.4 Tell-someone sentence

> "It's the site where scrolling is a git commit graph and a rail of real projects slides past with live demos."

The signature move (the trace) and the peak (the rail) point at the same moment — good. They are merged, not decorative.

---

## 5. Act sequence (device score)

| Act | Beat | Primary device | Support | Span (vh) | Why this device |
|---|---|---|---|---|---|
| 1 | Premise / hero | **parallax** (dimensional) | kinetic H1 (lines), faint grid | 2.4 | Depth from differential movement is the strongest open; establishes "builder" without a photo |
| 2 | The gap | **pin** | crossfade cues (2-3 lines) | 1.4 | Quiet, held, honest — the breath before the draw |
| 3 | The lever | **reveal** | self-drawing SVG (stroke from scroll) | 2.0 | A wipe/state-change is exactly "code becoming something" |
| 4 | **Proof (PEAK)** | **pan** (lateral rail) | card tilt, trace stamps each node | 4.6 (≈repos+1.5) | Lateral travel reads as "a range of things"; the only touch act; most room |
| 5 | The AI side | **flow + in** | reveal-on-entry, short stagger | 1.2 | Information, not experience — compressed, one idea per row |
| 6 | The door / CTA | **pin (hold)** | command-line panel, trace→`ship` | 1.6 | Last act; the close cue **holds** (never fades); resolves, doesn't trail off |

Checks (from the skill): **4+ distinct device families** (parallax, pin, reveal, pan, flow) ✓. **No device family twice in a row** (parallax→pin→reveal→pan→flow→pin) ✓. **≤2 scrub** (0 — no video by design) ✓. **One kinetic headline per act** (only act 1) ✓. **Peak = act 4, largest span** ✓. **Silence before peak** (act 3 dwell + gap) ✓. **Total ≈ 13.2-14vh** (the rail drives it; it is not filler — it pans). If the repo count changes, retune act 4 span to `max(repos×1.0 + 1.5, 4)` and keep total ≤ ~14vh.

---

## 6. Page architecture & layout

```
[ fixed, whole page ]
  LEFT EDGE (desktop) / BOTTOM EDGE (mobile): the build trace  (§7)  —  nav + memory

1  HERO          dark ground, faint engineered grid, 3 parallax planes; H1 kinetic, lead-anchored; top folio line (mono)
2  THE GAP       charcoal, centered-ish quiet pin; 2-3 crossfade lines; short
3  THE LEVER     split: self-drawing SVG technical illustration (left/bleed) + H2 + short copy (right)
4  PROOF / RAIL  full-bleed lateral rail of repo cards (museum-label schema); section H2 rides as the rail's first item
5  THE AI SIDE   asymmetric spec-rows / 2-col zigzag (max 2 in a row), label-schema, reveal-on-entry
6  THE DOOR      command-line panel (mono): two real actions; trace completes to `ship`; footer meta (tiny)
```

- **Grounds:** one dark family, drift 3-4 stops (`--bg` → `--surface` → `--bg` → `--ground-deep`) across acts, small steps, per-section opaque backgrounds on the hard edges (acts are blocks; the changes land on cuts, not interpolations — this is a cut, not a soft drift).
- **Anchoring variety:** hero lead-anchored (left); gap centered; lever split (illustration left, copy right); rail full-bleed; AI side asymmetric-left; door centered command-line. No two adjacent sections share the same anchor.
- **Left-aligned** section headers by default (house). Eyebrow (mono, uppercase, steel, +0.08em) on **at most one in three** sections — the header carries itself.

### 6.1 Annotated wireframes

Callout letters refer to the component list in §10.

**Act 1 — Hero (2.4vh, `pin` + parallax + kinetic)**
```
┌───────────────────────────────────────────────┬─┐
│  L·L·T  (folio, mono)              github · build │← top folio (scrolls away)
│                                                    │
│   (plane 3 far: faint grid, slow)                  │
│   (plane 2 mid: line-draw sketch, medium)          │
│   ┌──────────────────────┐                         │
│   │ ENGINEERED TO SHIP.   │  ← A: H1, kinetic,     │  ← B: 3 parallax
│   │ (2 lines, lead)      │     lead-anchored       │    planes, distinct
│   └──────────────────────┘                          │    rates, occlude
│   Software and AI, built and shipped.  ← C: lead    │
│                                                    │
│   (plane 1 near: a bold line/orange signal, fast,  │
│    dips where the lead sits so the copy stays clear)│
└───────────────────────────────────────────────┴─┘
   left/bottom edge: trace idle, node `init` at top
```

**Act 2 — The gap (1.4vh, `pin` + crossfade cues)**
```
┌───────────────────────────────────────────────┐
│                                               │
│        "Most of these are templates."         │ ← D: crossfade cues,
│        (line 2 fades in over line 1)          │    centered, quiet,
│                                               │    held, short
└───────────────────────────────────────────────┘
```

**Act 3 — The lever (2.0vh, `reveal` + self-draw SVG)**
```
┌───────────────────────────────────────────────┬──────────────┐
│  (bleed)                                      │  THE LEVER   │ ← E: H2
│        ┌───────────────┐                      │  + short     │
│        │  self-drawing  │                      │    copy      │
│        │  SVG: a part / │  ← F: stroke-dash    │              │
│        │  circuit /     │     offset from      │              │
│        │  model graph   │     --sc-p; wipes    │              │
│        │  in as you     │     in (reveal)      │              │
│        │  scroll        │                      │              │
│        └───────────────┘                      │              │
└───────────────────────────────────────────────┴──────────────┘
```

**Act 4 — Proof / repo rail (4.6vh, `pan`; PEAK)**
```
  [ full-bleed; vertical scroll drives lateral travel ]
  ┌───────────────────────────────────────────────────────────────┐
  │ THE WORK  ┐                                                   │
  │ (rail item 1 = the heading, so it stops competing w/ chrome)   │
  │ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐ ┌───…   │
  │ │ crm           │ │ green-spot-   │ │ eo-docs       │ │       │
  │ │ HTML · JS     │ │ garden-center │ │ docs          │ │       │
  │ │ live · webapp │ │ live · site   │ │ live · docs   │ │       │
  │ │ one-line blurb│ │ one-line blurb│ │ one-line blurb│ │       │
  │ │ repo ↗  demo ↗│ │ repo ↗  demo ↗│ │ repo ↗  demo ↗│ │       │
  │ └───────────────┘ └───────────────┘ └───────────────┘         │
  │  └────────────────────────── "more" closing note (rail item n) │
  └───────────────────────────────────────────────────────────────┘
   each card: G = card, H = mono stack tags, I = "repo↗ / demo↗" links
   trace stamps a node per repo as each card passes
```

**Act 5 — The AI side (1.2vh, `flow + in`)**
```
┌───────────────────────────────────────────────┐
│ HOW AI IS USED HERE            (H2, left)     │
│ ┌──────────────────────────────┐              │
│ │  Agents        ·  one-line   │  ← J: asymmetric │
│ ├──────────────────────────────┤     spec-rows,   │
│ │  Workflows     ·  one-line   │     2-col zigzag,│
│ ├──────────────────────────────┤     reveal-on-   │
│ │  Inference     ·  one-line   │     entry        │
│ └──────────────────────────────┘              │
└───────────────────────────────────────────────┘
```

**Act 6 — The door / CTA (1.6vh, `pin` + hold; close)**
```
┌───────────────────────────────────────────────┐
│                                               │
│  You built the page. The page is the proof.   │ ← K: closing line (holds)
│                                               │
│  ┌─────────────────────────────────────────┐  │
│  │ you@leaselogic:~$                        │  │
│  │   open the code      [ github ↗ ]        │  │ ← L: command-line
│  │   start a build      [ hello@… ]         │  │    panel; two REAL
│  └─────────────────────────────────────────┘  │    actions; cue HOLDS
│                                               │
│  © Lease Logic Technologies · San Luis Valley, CO · (tiny mono)  │
└───────────────────────────────────────────────┘
   trace completes to `ship` node
```

---

## 7. The build trace (signature move) — full spec

**What it is:** one thin SVG/CSS element, `position: fixed`, present for the whole page.
- **Desktop (≥1024px):** left edge, `width: 2-3px` line, full viewport height, `left: 24-32px`. Vertical commit-graph: a base line, a moving **playhead** dot, and **nodes** (5, one per act) that "light" as their act is passed. Node labels (mono, 12px, `--ink-soft`) sit to the right of each node: `init`, `capabilities`, `proof`, `ai`, `ship`.
- **Mobile (<1024px):** bottom edge, horizontal, `height: 2-3px`, full width, `bottom: 12px`. Same playhead + nodes, labels below or omitted (keep ≥44px tap target on each node hit-area).

**Behaviour:**
- Scroll progress of the whole page drives the playhead position (a single 0→1 value). The line "draws" from the top node to the playhead in `--trace-live` (orange); the unplayed remainder is `--trace` (steel, idle).
- Each act stamps its node when the act's progress crosses ~0.15: the node fills orange and its label fades in (200ms, ease-out). Once lit, a node **stays** lit (it is a record).
- At act 4, the rail stamps a **sub-node per repo** as each card passes (small ticks on the line, no labels, or a tiny index). This is the peak's visual payoff.
- At act 6, the final `ship` node lights and the trace is complete.
- **Navigation:** each lit node is a real `<a>` to its section (`href="#capabilities"`, etc.). Tabbing reaches them; Enter jumps. They are enhancement — content is never hidden behind the trace, and the page works with it hidden (§12 no-JS path).

**Implementation constraint:** driven from one rAF loop reading scroll, writing a single CSS custom property (`--trace-p`, 0-1) and toggling `.is-lit` on nodes. `transform`/`opacity` only (the playhead moves by `transform: translateY/translateX`; the "drawn" length via `stroke-dashoffset` on the SVG line, which is sanctioned for wipes). **No** `top`/`left`/`height` animation on the playhead.

**Reduced motion:** the trace renders as a **static legend** — all nodes lit, labels visible, no playhead, no draw animation. It is then purely a nav list.

**Accessibility:** the trace `<nav>` has an `aria-label="Page progress"`. Each node link has an accessible name matching its section. The playhead is `aria-hidden` (decorative); the links carry the meaning.

---

## 8. Per-section spec

### 8.1 Act 1 — Hero
- **Layout:** full-bleed dark, faint engineered grid (1px `--line` lines at 4-5% opacity, or a radial vignette) as the far plane. Three parallax planes (see §11 rates): (3 far) grid, (2 mid) a line-draw sketch of an engineered object/circuit/model graph, (1 near) a bold orange signal line that **dips where the lead sits** so the copy stays clear. The lead is **lead-anchored (left)**, never centered.
- **Copy:** H1 (2 lines max, kinetic line-by-line), one lead line (~15-20 words). **≤4 text elements total.** No scroll cue, no arrow, no mouse icon, no decorative text strip, no trust-logo row.
- **Top folio:** one mono line — wordmark left, `github` + `start a build` right. Scrolls away with the act (not sticky).
- **Motion:** kinetic H1 assembles line-by-line on entry (greet form — full at p=0, so the landing view has the headline). Parallax planes move at distinct rates. No scrub.

### 8.2 Act 2 — The gap
- **Layout:** centered quiet pin on `--bg`. 2-3 crossfade cues (overlapping ~15% so there is never an empty gap). Short span (1.4). This is the breath before the draw.
- **Copy:** honest, no attack, no buzzwords. E.g. intent: "Most of these pages are templates. Most dev portfolios are a list of links. This is neither." (final copy from bragi).
- **Motion:** crossfade cues only. No parallax, no pointer.

### 8.3 Act 3 — The lever (the draw)
- **Layout:** split — a bleed **self-drawing SVG technical illustration** (an exploded part / a circuit / a model graph — pick one, keep it on-brand) on the left, H2 + short copy (2-4 sentences) on the right. The illustration is **real line work** (SVG), not a div-fake or an image.
- **Motion:** the SVG `stroke-dashoffset` is driven from the act's `--sc-p`, so scrolling literally draws the object, then dimension lines/leader callouts arrive (a `reveal` wipe for the callouts). This is the "code constructing" awe. Act 3 **settles** (dwell) at its end and a short ground-only gap opens before act 4 (the silence before the peak).
- **No pointer response here** (it is a *watch* act; act 4 is the *touch* act).

### 8.4 Act 4 — Proof / repo rail (PEAK)
- **Layout:** full-bleed lateral `pan`. The rail's **first item is the section heading** ("THE WORK") so it doesn't fight the fixed chrome; the **last item is a short closing note** ("more as it ships") so the rail resolves instead of ending mid-air. Repo cards in between. Span ≈ repos+1.5.
- **Card schema (museum-label, every card identical — the schema is what makes it a collection):**
  ```
  ┌────────────────────────┐
  │ crm                    │  name   (Space Grotesk 700, 20px)
  │ HTML · CSS · JS        │  stack  (Space Mono, --ink-soft)
  │ live · web-app · 2026  │  status · kind · year (Space Mono meta)
  │ A one-line, factual    │  blurb  (IBM Plex 400, 15.5px, ≤1 line, crops fine)
  │ blurb.                 │
  │ repo ↗     demo ↗      │  links  (real <a>; demo degrades to repo README)
  └────────────────────────┘
  ```
  - No invented stats. No icon toppers. No "craftsmanship you can feel" pitch — the label reads fact.
  - Cards are **real links** (the whole card or the name is an `<a>` to the repo; `demo` is a separate `<a>` to the demo page if it exists, else the README). Tabbable, in DOM order, ≥44px targets on mobile.
  - Card `tilt` (pointer, 5-7°) + a subtle `--surface-raised` lift on hover — the only pointer act on the page. Gated to `(hover:hover) and (pointer:fine)`, off under reduced motion.
- **Pan mechanics:** vertical scroll → lateral travel exactly `scrollWidth - viewport` (the last card lands flush). **Measure the overflow, don't assume it** — the rail must overflow by at least half a viewport; if it doesn't, add rail items (the heading + closing note already help). Items get a **staggered settle** from `--sc-p` (a "drawer being pulled", not a slideshow); first item exempt; floor opacity ~0.55. Card headings stay 1-2 words so they read while cropped.
- **Reduced motion:** the pan rail is the navigation, so it is NOT zeroed (that would strand the cards). Under reduced motion the stage becomes a native `overflow-x:auto` snap region (or a vertical stacked grid on mobile) so every card stays reachable without motion.

### 8.5 Act 5 — The AI side
- **Layout:** asymmetric spec-rows or a 2-column zigzag (max 2 in a row, never three equal columns). Each row: a term (Agents / Workflows / Inference / the tools) + one line of what is actually built. Label schema, fact not pitch. Compressed — this is information, not experience.
- **Motion:** `flow + in` reveal-on-entry, short stagger (50-80ms), fires once. No pin, no dwell, no pointer.
- **Honesty guard:** state only what is real. No "revolutionize", no invented benchmarks. If a claim can't be shown, it isn't here.

### 8.6 Act 6 — The door / CTA
- **Layout:** centered **command-line panel** (mono) on `--ground-deep`. A closing line (K) that **holds** (one-value cue — the last act must hold; never fades). Two **real** actions (L): `open the code` → the GitHub (real repo/org URL) and `start a build` → the contact (mailto or the contact page). Styled as a shell prompt (`you@leaselogic:~$`), not a button island. No magnetic CTA, no spotlight.
- **Close resolves:** the trace completes to `ship`, the panel has content on it, the footer meta is tiny. The page **arrives and stops** — it does not trail into a footer or fade to nothing.
- **Copy:** the closing line is the one they carry. Final from bragi; intent: proof done, door open.

### 8.7 Motion contract (cue windows)
- Every pinned act has a **ground or a greet**: act 1 hero cue uses the greet form (full at p=0) so the landing view has the headline; act 6 has a ground (the panel) + a **hold** cue.
- **Only the last act may hold.** Every other act closes its final cue with a two-value window ending at 1 (so a line doesn't stay lit and travel up over the next section).
- Cue windows overlap ~15%; the last cue of each non-final act fades before the next act arrives.
- A `flow` section directly after a pinned act takes **reduced top padding** (the pinned stage needs a viewport to scroll off; full padding would show a near-empty screen).

### 8.8 Parallax / depth (act 1 + act 3)
- Rates are in **hundreds of px** (the engine writes `rate×(p−0.5)×100`). Usable: ~0.3-1.5 for a layer inside a frame. Adjacent planes differ by 10-30%; the copy always rides at 1x (never put body copy on a parallax layer).
- Hero: far grid ≈ −1.4, mid line-draw ≈ −0.6, near signal ≈ +0.35, copy 1x. Total travel per plane stays ≤ ~150px (past ~200px it reads as a bug).
- **No `transition: transform`** on a parallax plane (eases every per-frame write; on a phone the plane lags a beat). Planes transition `opacity` only.
- Planes are solid below their silhouette (no fade-to-transparent letting the plane behind show through); a gradient to the ground over the last 200-300px hides the clip line.
- Scale/blur as distance: the far plane is smaller, softer, lower contrast.

### 8.9 Mobile
- Not a shrunk desktop. Art-direct:
  - H1 steps down one rung (~40px) so it stays ≤2 lines at 390px.
  - Hero planes: reduce travel, keep the lead clear (the near plane dips more aggressively), type may sit above the line-draw rather than passing behind it.
  - The rail: if a horizontal pan is cramped at 390px, fall back to a **vertical stacked card list** (or the native snap region) — same schema, same order.
  - The trace moves to the **bottom edge** (horizontal), labels omitted or below, ≥44px node hit-areas.
  - Section padding drops to 64px. Measure/gutters compress.
  - No horizontal overflow at any scroll position (test at 360/390/430).

---

## 9. Repo showcase — data model & seed

### 9.1 `repos.json` (data-driven, easy to update — build requirement)
The rail is rendered from a JSON file, not hardcoded. Adding/changing a repo = editing this file. Schema:

```json
{
  "repos": [
    {
      "name": "crm",
      "full_name": "Lease-Logic-Technologies/crm",
      "url": "https://github.com/Lease-Logic-Technologies/crm",
      "demo": null,
      "blurb": "A configurable small-business CRM with a mock backend.",
      "stack": ["HTML","CSS","JS"],
      "kind": "web-app",
      "status": "live",
      "year": 2026
    }
  ]
}
```
- `demo`: the demo-page URL, or `null`. When `null`, the card's `demo ↗` falls back to the repo README (the `url` + `/#readme`). **Do not invent demo URLs.**
- `blurb`: one line, factual, museum-label tone (≤ ~90 chars, crops cleanly). Written by Chris/bragi per repo; a neutral placeholder is fine for the build and must be replaced.
- `stack`, `kind`, `status`, `year`: short mono meta. `status` ∈ {`live`,`wip`,`archived`}.
- Order in the file = order on the rail. The build renders in order; no sorting logic needed.

### 9.2 Current public repos (verified via GitHub API, 2026-09-24) — the seed

The current public set is small and mixed. This is the honest starting set; **Chris curates which to feature and fills `demo` URLs** (the demo pages do not exist yet). The design handles 3-8 cards gracefully.

| repo | language | description (as published) | note |
|---|---|---|---|
| `Lease-Logic-Technologies/slv-websites` | HTML | (the client sites monorepo) | the repo this workspace lives in |
| `Tesloth/green-spot-garden-center` | HTML | "Site for Green Spot Garden Center in Alamosa, CO" | a real client build |
| `Tesloth/eo-docs` | — | "Eduss Online Documentation" | docs site |
| `Tesloth/ngcli-docker` | — | "docker container with ng cli and the ability to run e2e tests" | a fork (tooling) |
| `Tesloth/tesloth.github.io` | HTML | (GitHub Pages profile) | the pages host |

Recommendation for the rail seed (curatable): `crm` (org, when public), `green-spot-garden-center`, `slv-websites`, `eo-docs`, `ngcli-docker` — 5 cards, ~one per viewport + 1.5, matching act 4's span. Drop/replace freely; the file is the source of truth.

**Honesty note:** there is not yet a large impressive catalog. The page's claim is *you can build, here are real things, more as they ship* — the closing rail note says exactly that. No fabricated projects, no fake demos, no invented stars/numbers.

---

## 10. Component list

| ID | Component | Notes |
|---|---|---|
| A | Kinetic H1 | line-by-line, greet form, Space Grotesk 800 |
| B | Parallax planes (3) | far grid / mid line-draw / near signal; distinct rates |
| C | Hero lead | one line, ≤20 words |
| D | Crossfade cues (act 2) | 2-3 lines, overlapping ~15% |
| E | Section H2 + dek | Space Grotesk 700 + IBM Plex dek |
| F | Self-drawing SVG | stroke from `--sc-p`; one on-brand technical illustration |
| G | Repo card | museum-label schema (§8.4) |
| H | Mono stack tags | Space Mono, `--ink-soft` |
| I | Card links | `repo ↗` / `demo ↗` (real `<a>`) |
| J | AI spec-rows | asymmetric / 2-col zigzag, label schema |
| K | Closing line | holds (one-value cue) |
| L | Command-line CTA panel | mono, two real actions, `you@leaselogic:~$` |
| T | The build trace | fixed edge rail: playhead + 5 act nodes (+ repo sub-nodes), §7 |
| N | Top folio | mono wordmark + github + build (scrolls away) |
| FTR | Footer meta | tiny mono, © + location |

---

## 11. Motion notes (implementation)

**One mechanism.** A single rAF loop reads scroll and writes:
- `--sc-p` (0-1) on the active act element, and
- `--trace-p` (0-1) on the trace,
and toggles `.is-lit` on trace nodes / reveals. All other motion is CSS driven off those variables. This is mechanism-agnostic: brokkr may implement it in vanilla JS (recommended — lightest) or with the `scrollcraft` engine (already in the workspace). Either way, honor the rules below.

**Rules:**
- `transform` and `opacity` only for anything continuous. `clip-path` (and SVG `stroke-dashoffset`) is the sanctioned third, for wipes/line-draw. **Never** animate `width/height/top/left/margin/padding`. Never `transition: all`.
- Passive scroll / IntersectionObserver only. The rAF loop runs only while an act is on screen; offscreen work pauses.
- Ease: `cubic-bezier(0.23,1,0.32,1)`. UI transitions 120-180ms, ease-out. No `ease-in` on UI.
- Stagger 30-80ms. Enter from `scale(0.98)`+`opacity:0`.
- Parallax rates and cue windows per §8.7-8.8.
- The peak (act 4) gets `dwell` on its lead-in so the rail settles before it pans.

**Reduced motion (`prefers-reduced-motion: reduce`) — the safe default:**
- Parallax, kinetic, line-draw, pan, tilt, and the trace playhead all become **static at their final state**. Content is fully visible, nothing is gated behind motion.
- The pan rail becomes a native `overflow-x:auto` snap region (or a vertical grid on mobile) so every card is reachable without motion.
- Cues render at full opacity (no crossfade). The trace renders as a static legend (all nodes lit, no playhead).
- Meaning is preserved; all position-change motion is removed.
- **No-JS fallback:** if JS fails, every repo card and CTA is a real link already in the DOM (rendered server-side or as static HTML), the rail is a static grid, the trace is hidden, and all copy is present. The page is usable with zero JS.

---

## 12. Accessibility constraints (hard)

- **Content is never behind motion or the trace.** Every repo card and CTA is a real, tabbable link in DOM order. Keyboard-only users get the full page.
- **One `<h1>`** (hero). Each section has a single `<h2>`. Heading order never skips. Semantic `<header>/<nav>/<main>/<section>/<footer>`.
- **The trace is `<nav aria-label="Page progress">`**; each node is a real link with an accessible name. The playhead is `aria-hidden`.
- **Focus-visible on every interactive element**, themed to `--accent`/`--accent-deep`, with offset. Never `outline:none` without a replacement.
- **Contrast (verified):** body ≥4.5:1, large text ≥3:1, controls + focus indicators ≥3:1 — per §2.1. `--accent` is restricted to large text / non-text (4.69:1 on `--bg`); body on dark uses `--ink` (16.17) / `--ink-soft` (7.78).
- **Touch targets ≥44px** on mobile (cards, CTA links, trace node hit-areas).
- **Reduced motion** per §11 is the default-safe path; it is not an afterthought.
- **No audio, no autoplay, no pointer-lock, no custom cursor.**
- **No layout shift** (CLS≈0): fonts `display=swap` with a metric-matched fallback; SVGs have `viewBox`+aspect; the rail has a reserved height; every raster (if any) has both `width`+`height` attributes and is lazy.
- **Color is never the only signal** (status = text + the label, not just a dot).

## 13. Performance constraints (hard)

- **GitHub Pages static, zero build step.** Deliverables: one `index.html`, one small `app.js` (vanilla, target < ~20KB unminified / < ~8KB gz), one `repos.json`, one `style.css`. No frameworks, no bundler, no runtime that generates DOM.
- **Fonts:** Google Fonts with `display=swap` + `<link rel=preconnect>`; **or** self-host the three families as WOFF2 (subset: latin) to remove the third-party render-blocking hop. Prefer self-host if the Lighthouse perf target matters.
- **Motion:** single rAF loop, one CSS custom property per active section, `transform`/`opacity`/`clip-path` only, passive listeners, offscreen work paused. No per-frame layout reads that force reflow (cache measurements; the rail `scrollWidth` is measured once on load + resize).
- **Assets:** zero or minimal raster. The page is type + inline SVG + CSS. **No video/scrub** (by design — reliability + GitHub Pages + no generated assets). If a raster is ever added: lazy, `width`+`height` attrs, modern format (WebP/AVIF), sized.
- **Budget:** LCP < 1.2s on mid-range mobile (4G), CLS < 0.1, INP < 200ms. No console errors. Total page weight target < 300KB (fonts dominate; self-hosting keeps it in).
- **Lighthouse targets:** perf ≥90, a11y ≥95, best-practices ≥95, SEO ≥95 (a single `<h1>`, real meta, semantic landmarks, `repos.json` links all valid).
- **No blocking third-party scripts.** The page must not depend on any external JS at runtime (Google Fonts is the only allowed external, and only if not self-hosted).

---

## 14. Integration / build notes (for `t_a3454ddb`)

- **Where it lives:** `websites/llt-code/` in this workspace. Output: `llt-code/index.html` + `llt-code/assets/` (svg/css) + `llt-code/repos.json` + `llt-code/app.js`. Deployable to GitHub Pages as-is (no build step). Confirm the target Pages repo with Chris (`tesloth.github.io` or an org Pages repo) before wiring absolute demo/demo-page URLs.
- **Copy:** final copy is `t_0556049e` (bragi). The layout is **wording-independent** (fluid type, measure-limited, 2-line H1 cap). Build against the placeholder narrative in §4/§8; swap in final copy verbatim without reflow surprises. Do not invent stats or projects.
- **Add a repo:** edit `repos.json` (append an object), nothing else. The rail re-renders on load.
- **The trace is enhancement.** If the build is tight, ship with the trace **hidden** (top folio + in-page anchors as nav) and add the trace in `t_ef0fb51e` polish. Content must never depend on it.
- **Fingerprint:** append the §3.5 row to the workspace `FINGERPRINTS.md` at ship time.
- **Verify (the review/QA cards own this, listed so the build is testable):** desktop + mobile + reduced-motion scroll passes; the rail overflow is measured (≥½ viewport); the peak reads as the peak; the close holds (final screen has content); tab order is correct; the no-JS page is usable.

---

## 15. Assumptions & open items

**Assumptions (smallest sensible defaults — flag any that are wrong):**
1. **Extend the existing Lease Logic brand** (paper/charcoal/orange/steel + Space Grotesk/IBM Plex/Space Mono) rather than invent a palette. Consistency is a feature and it is the client's actual brand. The token table (§2.1) is the single place to swap if a different palette is wanted.
2. **CSS/SVG/type-driven, no generated photography, no video.** The wow comes from motion + the trace, not photos. (Reliability + on-brand technical character. This is the deliberate tradeoff in §1.)
3. **The showcase is data-driven** (`repos.json`) and seeded with the current public set; Chris curates the featured repos + demo URLs. Demo pages may not exist yet, so cards degrade to a repo README link.
4. **Copy is a sibling input** (bragi, `t_0556049e`); this spec owns the narrative + layout, not the final words.
5. **Single page, GitHub Pages, no build step** (vanilla JS, or the scrollcraft engine — brokkr's call; vanilla is the lighter default).
6. **"Software engineering and AI business"** = Lease Logic Technologies' software/AI service line (consistent with the existing `llt-software` one-pager brand).

**Open items for Chris (answer when convenient; the build proceeds on the defaults above either way):**
- Which repos to feature on the rail, and which have live demo pages to link? (The §9.2 seed is a starting guess.)
- The `start a build` destination: a contact page, a mailto, or the `llt-software` one-pager?
- Any real, verifiable numbers you'd allow on the page (if none, the page stays number-free — the design assumes none).
