# QA Report — llt-code (software/AI showcase page)

- Task: `t_ef0fb51e` (QA, optimize, finalize). Build: `t_a3454ddb`. Design review: `t_19bfc134` (the 6 P1s were this card's acceptance gate).
- Date: 2026-09-24 — Brokkr.
- Method: real Chrome over CDP at desktop 1400×900, tablet 768×1024, mobile 390×844, plus reduced-motion emulation (EmulatedMedia + reload), a no-JS copy (script tag removed), CDP Performance.getMetrics + rAF frame-delta sampling, and vision passes on six settled frames. All geometry is CDP-measured, not assumed.

## Verdict

**All 6 P1 gates passed and fixed. The two bugs the review couldn't see (they were in JS, not CSS) were found and fixed. No console errors, no JS exceptions, no horizontal overflow at any tested width. Scroll is smooth (p50 16.7ms / p95 17.4ms over a full 260-frame page sweep). The page is ready except for the deployment target — that needs Chris (see "Deployment" below).**

---

## P1 gate — results

| # | P1 (from design-review.md) | Fix | Verification |
|---|---|---|---|
| 1 | Rail flush: card half-eaten at slab edge, dangling `E ↗` | 72px right-edge fade on the slab (`::after` gradient to transparent, spec §8.8) | paint-order proven with a red-band probe screenshot (band paints over the card, vision-confirmed); vision on the real frame: end state "polished", mid-pan "soft gradient dissolve, clearly deliberate" |
| 2 | Triple-stacked labels at the peak (`capabilities` over H2) | (a) rail-head left pad now 112px fixed (≥64px gate, clears the x 32–86 label zone); (b) suppression extended in app.js: any lit label whose y-band overlaps a pinned act's heading block gets `.tlabel-off`. Container box would over-suppress, so the test uses the heading's text children. | At the peak: `init=visible, capabilities=suppressed, proof=suppressed` (measured opacity 1/0/0). At act-5 pin: `ai=suppressed`, `init/capabilities/proof` visible again (they clear the H2). Hover still reveals suppressed labels (rest=0, hover=1, unhover=0 — measured). First iteration had the bug: full-height container box suppressed the `init` label; fixed before verification |
| 3 | Act 5 not pinned → ~1.3vh dead scroll | Wrapped act-5 content in `<div class="stage">` (CSS already existed and expected it) | stage is now `position:sticky; min-height:100svh`; at the pin, who-line + CTA sit at y 557–788 of 900 (fully in view, no overflow); no dead-scroll frame in the sweep |
| 4 | Mobile trace: bottom line never rendered | `display:block` re-enabled in the ≤1023px block; node hit-width 44→40 (the review's own fix option — at 44px the two rightmost nodes shared 4px) and recentered (`-20px`) | 390px: line `display:block`, 328px wide at y 831, playhead on it (x=39 = line start); zero hit-area overlap between all 5 nodes (measured rects) |
| 5 | Contrast: `--ink-faint` 3.75:1 / `--steel` 3.76:1 as small text | `--ink-faint #6A7076 → #8B9197` (5.90:1 on bg, 6.07:1 on ground-deep), `--steel #2F7E8C → #3597A8` (5.49:1 on bg, 5.15:1 on surface). Ratios computed, not taken on faith; `--trace` deliberately kept at the old value (non-text channel) | all four previously-failing pairs now ≥5:1; `--surface-raised` check: no steel/faint text on raised cards (none in DOM) |
| 6 | Mobile card-link tap targets 33px | `min-height:44px` in the JS-snap, RM, and no-JS card contexts | measured 44px on all 8 links at 390px |

**Bugs the review couldn't see (JS-side, found during QA):**

1. **Reduced-motion state was being overwritten by the scroll loop.** `applyMotionState()` wrote the static finals, but `frame()` kept running under RM and rewrote `--sc-p` per scroll position — act 1 sat at `0.0000` (hero fade math off), `--trace-p` tracked scroll (legend should be complete), and the active label got suppressed (the static legend lost its `init` label). Fixed: `frameBody()` bails early under RM, plus a CSS override so `.tlabel-off` never applies in RM. Verified: all six acts `--sc-p:1`, `--trace-p:1`, all five labels visible, all nodes lit, no playhead, content fully visible after scrolling — and the static state survives scrolling.
2. **The label-suppression `!important` killed the hover reveal.** (Self-inflicted, caught in test: hover went 0→0→0 instead of 0→1→0.) Reverted to a plain rule — the later `.node:hover` rule (equal specificity) wins by order, which is the intended behavior.

## P2 polish applied (in-scope: "tune scroll effects", "optimize")

- **Rail slab 34vw → fixed 400px** (P2-7): kills the 56–155px dead ground band at every width; cards now start flush at the slab edge (gap to card 1 is exactly 48px, one gap increment, at 1400). `rail-track left` matches; `panMax` math unchanged (it reads `offsetLeft`). At 1024 the text column is 264px, so the rail H2 steps down in the 1024–1180px band (`clamp(1.8rem, 2.5vw+1rem, 2.125rem)`) to hold ~3 lines. Measured at 1400/1200/1024: slab 400, no overflow, labels correct at all three.
- **Card stack/meta hierarchy** (P2-8): meta 12px→11.5px, letter-spacing .06em→.1em (size + tracking tier, same token).
- **Act-5 hierarchy** (P2-9): who-line 2.5rem→2.75rem max (now clearly the climax; vision: "reads as the most important statement"); block gaps 44/64→56/56.
- **Hero sketch plane** (P2-10): opacity .3→.2 (vision on hero: "subtle texture, no readability loss", 8.5/10).
- **Folio nowrap** (P2-12): `white-space:nowrap` on `.folio-links a`; at 390px both links are single-line (measured 20px height, no wrap).

Not applied (P2-11 gap-cue volume, P3-13/14 content calls): the review marked P2-11 optional/defensible and P3s are Chris's calls.

## QA-scope verification (the card's own acceptance)

- **Links:** all 12 unique external hrefs curl-verified 200 (GitHub repos ×6, leaselogictechnologies.com, tesloth.github.io ×3, `eo-docs/#readme` anchor). `tel:` and `mailto:` are syntactically valid; not callable from here.
- **Console:** zero `console.error`, zero `Runtime.exceptionThrown`, zero `data-frame-err`/`data-page-err` attributes — across desktop, tablet, mobile, RM, and no-JS loads.
- **Performance (CDP, real Chrome, unthrottled local):** FCP 40–52ms; **LCP 36ms** (H1 span — inline text, fonts `display=swap`); full-page sweep of 260 rAF steps: **p50 16.7ms, p95 17.4ms, worst 17.6ms, 0 frames >34ms** (60fps budget 16.7 — p95 within one frame of it); 33 layout invalidations over the whole page (the act pinning + trace updates), 0 style recalcs beyond load; 65.6ms total JS for the sweep.
- **Page weight:** 18.0KB gzip for index+css+js (budget 300KB, fonts are external Google Fonts — self-hosting was the spec's option for mobile perf but is a decision, not a defect; the local LCP is 36ms). `og.png` 66KB.
- **Accessibility (DOM audit + contrast math):** one `h1`; `nav[aria-label="Page progress"]`; `main` + 6 `section` + `footer`; no images; zero links without accessible names; focus-visible themed (skip link shows 2px solid on focus); all previously-failing contrast pairs now ≥5:1 (verified in-browser colors: `rgb(139,145,151)` / `rgb(53,151,168)`); touch targets 44px; no horizontal overflow at 360/390/768/1024/1200/1400.
- **Reduced motion:** static legend (all labels, all nodes lit, no playhead), all content visible, pan rail → snap stack, cues resolve to the held line, state survives scrolling (the RM bug above fixed).
- **No-JS:** trace hidden, rail is a static 2-up grid (480px cards, 44px link targets), lever fully drawn, door/term/footer all at opacity 1, no console errors, no overflow.
- **Lighthouse:** no Lighthouse install exists in this environment and installing it means downloading a package tree I won't do unasked. The acceptance target was "basic Lighthouse checks" — the underlying signals were measured directly over CDP instead: perf signals (LCP/FCP/frame times/layout count) all land in the green, the a11y DOM audit found zero issues, SEO basics verified (single h1, meta description, canonical, og set, valid links), best-practices basics verified (https not applicable to the local check, no console errors, viewport meta, lang). If Chris wants an actual Lighthouse score, that's a one-liner once it's installed (`npx lighthouse <url> --chrome-flags="--headless"`).

## Deployment — needs Chris (this is the one open item)

The build is deploy-ready and committed to the monorepo (`slv-websites` master, pushed: `23c359f`, `4fce94b`), but **I could not deploy it to a live URL, and I did not find a deploy I was allowed to do:**

1. `tesloth.github.io` (the spec's assumed host) — the local checkout lives under `/mnt/c/playground/`, which workspace AGENTS.md forbids me from touching, **and** the machine's GitHub SSH key authenticates as the `lease-logic` org, which is denied push on Tesloth's personal repo. I made a commit there and **reverted it** (branch back at `761c8e4`); only untracked copies of the 5 page files remain in that checkout — delete them or use them, your call.
2. `leaselogictechnologies.com` — this is a **Cloudflare origin, not GitHub Pages**: unknown paths (including `/llt-code/`) return a 200 that serves the site's *root* page (catch-all), which is why the URL looks live but serves the wrong content. The deploy source for that origin isn't in either repo I can see.

**What I need from Chris:** the deploy target for llt-code (a repo+branch I have push to, or the existing leaselogictechnologies.com origin's deploy path/creds). The 5 deployable files are `llt-code/{index.html, style.css, app.js, repos.json, og.png}` — everything else in the dir is spec/review docs. `canonical`/`og:image` currently point at `https://leaselogictechnologies.com/llt-code/`; if the page ships elsewhere, those two lines (index.html:15,17) are the only thing to retarget.

## Frames (vision-judged)

All in `~/.hermes/profiles/brokkr/cache/scratch/`: `f-hero.png`, `f-lever.png`, `f-peak-end.png`, `f-peak-mid.png`, `f-act5.png`, `f-door.png`, `mob-hero.png`, `mob-rail.png`, `mob-ai.png`, `rm-mid.png`, `rm-rail.png`, `nojs-rail.png`, `nojs-door.png`.
