# Copy Deck — Lease Logic Technologies, Software & AI Showcase Page

Source for this copy: the live Lease Logic one-pagers (`llt-3d-printing/copy.md`,
`llt-service-pages/copy-software.md`) for house voice and contact facts, and the
verified public GitHub account `Tesloth` (API-checked 2026-09-24). Section order is
top-to-bottom page order and is built to match the journey: hero → capabilities →
repo showcase with demos → who → final CTA. `[CTA]` marks a button or link — make the
phone a `tel:` link and the email a `mailto:` link.

**Tone rule for the build:** confident, modern, no hype. No "revolutionize", no
"unlock the power of", no "AI-driven innovation". Every sentence should survive being
read by the engineer it's trying to impress. The page proves itself; the copy only
points at the proof.

**Launch-honest rule:** all six repo cards below are placeholders (confirmed via the
GitHub API that the public `Tesloth` account currently carries no publishable
engineering repos). Each card is flagged where a claim needs Chris's confirmation.
Everything else in this file states only verifiable facts (location, credentials, the
page's own properties, contact details).

---

## 01 — Nav (sticky top bar)

Brand: **Lease Logic Technologies**
Links: What I Build · The Work · Who · Contact
Nav button [CTA]: **Start a Project**

---

## 02 — Hero (the page builds itself)

**Headline:**
This page is the demo.

**Subheadline:**
Software and AI, built in Alamosa, Colorado — by one engineer. No slides, no
portfolio deck. The code is the proof: every card on this page runs, and every
line is open to read.

**Primary CTA [CTA]:** Run the Demos *(anchor to the work section)*
**Secondary CTA [CTA]:** Start a Project *(to contact)*

**Kicker line (small, under the buttons):**
Alamosa, Colorado · One engineer, whole project · The code is the proof

**Note to build:** the headline should assemble in view as the first scroll beat
(see §07) — the page demonstrating itself is the hero's job. Static fallback shows
the full headline immediately.

---

## 03 — What This Is

**A portfolio is a list of past jobs. This is the jobs.**

Four blocks, two lines each:

**Software that runs a business.**
Invoices, customers, inventory, orders — the systems people actually log into every
day. Built to order, owned by the business, not rented from a SaaS roadmap.

**AI that does the work.**
Not a chatbot on a homepage. Agents and pipelines that read, process, and run on
their own — the ones that take real hours off a real week.

**Interfaces that hold your attention.**
The page you're on: a static site, no framework, no build step — and it still moves
like a game. If the brochure is a demo, imagine the product.

**Engineering underneath.**
A decade of shipping code in production, an engineering-physics degree, and the
habit of reading the source. The scroll is the least of it.

**Section CTA [CTA]:** See the work ↓ *(anchor)*

---

## 04 — The Work (repo showcase)

**The code is the portfolio. Here's what it can do.**

Short lead-in:
Everything below runs. Open the demo, poke at it, then read the source if you
like — that's the point. A page you can inspect beats a deck you have to trust.

### Card template

Each card, in order:
1. **Repo name** — as a wordmark, e.g. `valley-crm`
2. **One-line description** — 12–18 words, what it does, no adjectives
3. **Tags** — three small chips, tech only (e.g. `HTML/CSS/JS` `Local-only` `No build step`)
4. **Demo line** — [CTA] **Run the Demo** (primary) · [CTA] **View Source** (text link to GitHub)
5. Optional **one-line proof** — a single factual line, only when verified

**Data note for build:** drive this section from one array of objects
(`name`, `desc`, `tags[]`, `demoUrl`, `sourceUrl`). Adding or swapping a repo
should mean editing data, not HTML.

### Six placeholder cards (swap names/URLs for real repos before launch)

**1. `valley-crm`**
A configurable customer CRM for a small shop — built for a real auto-repair
workshop, running entirely in the browser with a JSON file export and no
database to babysit.
Tags: `HTML/CSS/JS` · `Mock backend` · `Runs offline`
Proof line: *Built for a real automotive shop configuration — seed data included.*

**2. `openforge`**
A local AI stack that runs open-weights models on one machine and drives a
team of AI agents through a shared task board — several agents working the
same project, no cloud account required.
Tags: `TensorRT-LLM` · `Agentic` · `Runs locally`
Proof line: *The stack that built this page. You're looking at its output.*

**3. `scrollcraft`**
This site. Scroll-driven animation and parallax on a static page with no
framework, no build step, and no third-party runtime — just HTML, CSS, and
JavaScript on a public host.
Tags: `No dependencies` · `Scroll-driven` · `Static host`
Proof line: *The demo of the demo. View source on any section you doubt.*
Note to build: this card's **View Source** link goes to this page's own repo.

**4. `cellmaster`**
A process controller for electrochemical work — recipes in, logged batches out,
with sensor readings captured on every run so a good batch repeats exactly.
Tags: `Process control` · `Logging` · `Repeatable`
⚠ Confirm: describe the real electrochemical work Chris runs before launch;
placeholder description above is a template.

**5. `benchpress`**
A 3D print pipeline from model to machine — design, AI-assisted modeling,
slicing, and print scheduling for small-batch and one-off jobs.
Tags: `3D printing` · `AI-assisted CAD` · `Slicing`
Note: ties the software side of the business to the 3D-printing service.

**6. `recordsmith`**
A data pipeline that turns paper records into structured, searchable data —
AI extraction, a human review step, and a clean export on the other end.
Tags: `Data pipeline` · `AI extraction` · `Human review`

**Section CTA [CTA]:** Want one of these running in your business? Start a Project
*(to contact)*

---

## 05 — Who

**You'll talk to the person who writes the code — the whole time.**

Lease Logic is run by Chris Lease, an engineering physicist from Colorado School
of Mines who spent a decade writing production software before moving the shop
to Alamosa. One engineer, whole project: the person who scoped it wrote it, and
can tell you why it works the way it does — by phone, text, or in person.

**Section CTA [CTA]:** Be one of the first — tell me what you're running: (719) 657-7528

---

## 06 — Final CTA

**The next one's yours.**

You've seen what code and AI can do — the proof is on this page. The next
project could be a system your business runs on, an agent that does the work
you do by hand, or something you haven't named yet.

Thirty seconds on the phone. If it's buildable, you'll have a quote. If it
isn't, you'll have a straight answer.

**Primary CTA [CTA]:** Text (719) 657-7528
**Secondary CTA [CTA]:** Email info@leaselogictechnologies.com

**Contact block:**

- **Text / Voice:** (719) 657-7528
- **Email:** info@leaselogictechnologies.com
- **Where:** Alamosa, Colorado — in the heart of the San Luis Valley

---

## 07 — Scroll Beats (copy triggers for the journey)

Copy that fires on the scroll choreography, in page order. These are the words
that carry the "journey through what is possible with code" — keep them short;
the motion does the rest.

| Beat | Moment | Copy in view |
|---|---|---|
| B1 | Hero, on load | Headline types/assembles in: "This page is the demo." — the page demonstrating itself is the opening statement |
| B2 | First scroll | Caption fades in under the hero: *Everything on this page is source code. Read it whenever you like.* |
| B3 | Entering §03 | Section heading assembles word-by-word: **A portfolio is a list of past jobs. This is the jobs.** |
| B4 | Mid-page parallax | Interface layer scrolls past a fixed layer of code behind it; caption: *What you see is the top. The systems underneath are the job.* |
| B5 | Entering §04 | Cards rise in from a stream of source text; one line above the grid: *Six things that run. All of them.* (adjust count if cards change) |
| B6 | Entering §05 | Single line, large: *The person who wrote this page is the person you'd hire.* |
| B7 | Final CTA | Button labels lock in last: **Text (719) 657-7528** |

**Reduced-motion fallback:** no beat, no caption, no assembly — the full headline,
all captions, and all cards render immediately in reading order. Every sentence
above must read as a complete page with motion removed; if a line only makes
sense *as* an effect, cut it.

---

## 08 — Footer

Lease Logic Technologies — Alamosa, Colorado
Serving Alamosa, Monte Vista, Center, Del Norte, and the whole Valley.
(719) 657-7528 · info@leaselogictechnologies.com
© 2026 Lease Logic Technologies
One line, if space allows: *This page: hand-built, no framework. View source →* *(link to repo)*

---

## Pre-launch confirmations (for Chris — not for the page)

None of the copy above depends on these answers, but confirm before launch so
the page can absorb them without a rewrite:

1. **Real repos to publish.** The public `Tesloth` GitHub account currently has no
   engineering repos (checked via API 2026-09-24). Six placeholders are supplied;
   the build swaps names, one-liners, tags, and URLs in one data array.
2. **Demo hosting.** Where do the demo pages live — GitHub Pages subpaths, a
   separate account, or external URLs? Card `demoUrl` fields are placeholders.
3. **`openforge` card.** It describes the actual local AI setup (WSL2, open-
   weights model, agent board). Confirmed to exist from session history, but
   Chris should approve the public framing — especially "runs locally".
4. **`cellmaster` / electrochemical detail.** Placeholder until the real process
   work is described.
5. **Anything private.** If real client work (e.g. the CRM for a named shop)
   should stay private, the "built for a real automotive shop" proof line on
   card 1 needs Chris's sign-off.
