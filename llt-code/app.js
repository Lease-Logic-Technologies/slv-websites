/* Lease Logic Technologies — Software & AI showcase
   One event-driven rAF loop: writes --sc-p per active act, --trace-p on the trace,
   lights trace nodes, stamps repo ticks, drives the rail pan (--pan-x/--pan-p),
   and binds card tilt. transform/opacity only (+stroke-dashoffset in CSS for wipes).
   Reduced motion: static final states, no loop, snap rail. No-JS: this file never runs. */
(function () {
  "use strict";
  var doc = document;
  var html = doc.documentElement;
  html.classList.add("js");
  window.addEventListener("error", function (e) {
    html.setAttribute("data-page-err", e.message + " :: " + (e.lineno || ""));
  });
  var RMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
  var HOVER = window.matchMedia("(hover: hover) and (pointer: fine)");

  var acts = Array.prototype.slice.call(doc.querySelectorAll(".act[data-act]"));
  var trace = doc.querySelector(".trace");
  var nodes = trace ? Array.prototype.slice.call(trace.querySelectorAll(".node[data-act]")) : [];
  var ticksWrap = trace ? trace.querySelector(".ticks") : null;
  var railStage = doc.getElementById("rail-stage");
  var track = doc.getElementById("rail-track");
  var cards = track ? Array.prototype.slice.call(track.querySelectorAll("#rail-cards > .card")) : [];
  var h2w = doc.querySelectorAll("#lever-h2 .w");
  var rv = Array.prototype.slice.call(doc.querySelectorAll(".rv"));
  // heading blocks that trace labels must never land on while their act is
  // pinned (QA P1-2): the rail slab head and act 5's H2
  var headEls = doc.querySelectorAll("#rail-head, .act-ai .h2");
  var nodeActIdx = nodes.map(function (n) {
    var id = n.getAttribute("data-act");
    for (var k = 0; k < acts.length; k++) {
      if (acts[k].getAttribute("data-act") === id) return k;
    }
    return -1;
  });
  var railSpan = 5.5;
  var DWELL = 0.12; // act-4 lead-in: rail settles before it pans

  // ---- geometry (cached; re-measure on resize/load/font-ready) ----
  var panMax = 0;
  var actTop = {}, actH = {};
  function cacheSizes() {
    var vh = window.innerHeight;
    acts.forEach(function (a) {
      actTop[a.getAttribute("data-act")] = a.offsetTop;
      actH[a.getAttribute("data-act")] = a.offsetHeight;
    });
    // node fractions: act midpoint over the whole page, in the trace's 0..1 space
    if (nodes.length && acts.length) {
      var t0 = acts[0].offsetTop;
      var t1 = acts[acts.length - 1].offsetTop + acts[acts.length - 1].offsetHeight;
      var span = Math.max(1, t1 - t0);
      nodes.forEach(function (n) {
        var id = n.getAttribute("data-act");
        n.style.setProperty("--tfrac", ((actTop[id] + actH[id] * 0.5 - t0) / span).toFixed(4));
      });
    }
    if (track && railStage) {
      // travel = distance from the track's start (fixed 400px = the slab
      // width) to its right edge reaching the stage's right edge
      panMax = Math.max(0, track.offsetLeft + track.scrollWidth - railStage.clientWidth);
    }
    layoutTicks();
  }
  window.addEventListener("resize", function () { requestAnimationFrame(cacheSizes); }, { passive: true });
  window.addEventListener("load", function () { requestAnimationFrame(cacheSizes); });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { requestAnimationFrame(cacheSizes); });
  }

  // ---- repo ticks (one per card, stamped as the pan passes each card) ----
  var repoTicks = [];
  function layoutTicks() {
    if (!ticksWrap || !cards.length) return;
    while (repoTicks.length < cards.length) {
      var t = doc.createElement("span");
      t.className = "tick";
      ticksWrap.appendChild(t);
      repoTicks.push(t);
    }
    while (repoTicks.length > cards.length) { repoTicks.pop().remove(); }
    var proof = doc.querySelector('.node[data-act="work"]');
    var base = proof ? parseFloat(proof.style.getPropertyValue("--tfrac")) : 0.6;
    repoTicks.forEach(function (t, i) {
      t.style.setProperty("--tfrac", Math.min(0.985, base + 0.02 + 0.02 * i).toFixed(4));
    });
  }

  // ---- helpers ----
  function spanOf(a) {
    var m = /--span:\s*([\d.]+)/.exec(a.getAttribute("style") || "");
    var s = parseFloat(m ? m[1] : "1.4");
    return isFinite(s) && s > 0 ? s : 1.4;
  }

  // ---- card pointer tilt (the one touch act) ----
  function bindTilt() {
    if (!HOVER.matches || RMQ.matches || !track) return;
    Array.prototype.slice.call(track.querySelectorAll("#rail-cards > .card")).forEach(function (card) {
      var inner = card.querySelector(".card-tilt");
      if (!inner) return;
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        inner.style.setProperty("--tilt-x", (y * -6).toFixed(2) + "deg");
        inner.style.setProperty("--tilt-y", (x * 7).toFixed(2) + "deg");
      }, { passive: true });
      card.addEventListener("mouseleave", function () {
        inner.style.setProperty("--tilt-x", "0deg");
        inner.style.setProperty("--tilt-y", "0deg");
      }, { passive: true });
    });
  }

  // ---- rail rendering from repos.json (data-driven; static HTML mirrors stay for no-JS) ----
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
    });
  }
  function cardHTML(r) {
    var demo = r.demo || (r.url + "/#readme");
    var demoLabel = r.demo ? "demo" : "readme";
    return '<article class="card">' +
      '<div class="card-tilt">' +
      '<h3 class="card-name"><a href="' + esc(r.url) + '" target="_blank" rel="noopener">' + esc(r.name) + "</a></h3>" +
      '<p class="card-stack">' + esc((r.stack || []).join(" \u00b7 ")) + "</p>" +
      '<p class="card-meta">' + esc(r.status) + " \u00b7 " + esc(r.kind) + " \u00b7 " + esc(r.year) + "</p>" +
      '<p class="card-blurb">' + esc(r.blurb) + "</p>" +
      '<p class="card-links">' +
      '<a class="card-link" href="' + esc(r.url) + '" target="_blank" rel="noopener">repo <span class="arr" aria-hidden="true">\u2197</span></a>' +
      '<a class="card-link" href="' + esc(demo) + '" target="_blank" rel="noopener">' + demoLabel + ' <span class="arr" aria-hidden="true">\u2197</span></a>' +
      "</p></div></article>";
  }
  function renderRail(data) {
    var repos = (data && data.repos) || [];
    if (!repos.length) return;
    [doc.getElementById("rail-cards"), doc.getElementById("rail-cards-stack")].forEach(function (c) {
      if (c) c.innerHTML = repos.map(cardHTML).join("");
    });
    var names = ["one", "two", "three", "four", "five", "six", "seven", "eight"];
    var text = (names[repos.length - 1] || repos.length) + " things that run. All of them.";
    Array.prototype.forEach.call(doc.querySelectorAll(".rail-count"), function (el) { el.textContent = text; });
    cards = track ? Array.prototype.slice.call(track.querySelectorAll("#rail-cards > .card")) : [];
    cards.forEach(function (c, i) { c.style.setProperty("--si", (i * 0.12 - 0.3).toFixed(2)); });
    bindTilt();
    requestAnimationFrame(cacheSizes);
  }
  fetch("repos.json", { cache: "no-cache" })
    .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
    .then(renderRail)
    .catch(function () { /* keep the static mirror */ });

  // ---- word-by-word H2 (beat B3) ----
  h2w.forEach(function (w, i) { w.style.setProperty("--wi", (0.18 + i * 0.055).toFixed(3)); });

  // ---- act 5 flow reveals: fired deterministically from scroll position in
  //      frameBody (see write phase); IO would miss fast flicks/jumps ----

  // ---- the loop ----
  var pending = false;
  function scheduleFrame() {
    if (pending) return;
    pending = true;
    var ran = false;
    var run = function () {
      if (ran) return;
      ran = true;
      pending = false;
      frame();
    };
    requestAnimationFrame(run);
    setTimeout(run, 150); // fires when rAF is throttled (hidden tab) so the page resyncs
  }
  function frame() {
    try { frameBody(); }
    catch (e) { html.setAttribute("data-frame-err", (e && e.message) || String(e)); }
  }
  function frameBody() {
    // reduced motion is a static final state (applyMotionState wrote it);
    // the scroll loop must not overwrite it with live scroll positions
    if (RMQ.matches) return;
    var vh = window.innerHeight;
    var y = window.scrollY;
    // ---- read phase (no interleaved writes) ----
    var first = acts[0], last = acts[acts.length - 1];
    var t0 = first.offsetTop, t1 = last.offsetTop + last.offsetHeight;
    var traceP = Math.min(1, Math.max(0, (y + vh * 0.5 - t0) / Math.max(1, t1 - t0)));
    var actRects = [];
    for (var i = 0; i < acts.length; i++) {
      actRects.push(acts[i].getBoundingClientRect());
    }
    var rvRects = rv.map(function (el) { return el.getBoundingClientRect(); });
    // ---- write phase ----
    trace.style.setProperty("--trace-p", traceP.toFixed(4));
    // progress for every act in (or through) its pin window, so fast scrolls and
    // jumps can't strand an act at a stale --sc-p.
    var activeId = null, activeP = 0;
    for (var i = 0; i < acts.length; i++) {
      var r = actRects[i];
      // last act is pinned from r.top<=0 to the end of the document (it can't
      // scroll further), so don't depend on a subpixel-exact r.bottom >= vh
      var pinned = r.top <= 0 && (r.bottom >= vh - 2 || i === acts.length - 1);
      if (pinned) {
        var p = Math.min(1, Math.max(0, -r.top / (spanOf(acts[i]) * vh)));
        acts[i].style.setProperty("--sc-p", p.toFixed(4));
        activeId = acts[i].getAttribute("data-act");
        activeP = p;
      }
    }
    // light nodes once their act's progress crosses ~0.15 (they stay lit: a record)
    nodes.forEach(function (n, ni) {
      var idx = nodeActIdx[ni];
      if (idx < 0) return;
      var r = actRects[idx];
      var p = r.top <= 0 ? Math.min(1, -r.top / (spanOf(acts[idx]) * vh)) : 0;
      if (p > 0.15) n.classList.add("is-lit");
    });
    // labels that would sit on pinned content hide while pinned (QA P1-2):
    // (1) the active act's own label ("proof" over the rail heading at the
    //     peak); (2) any lit label whose y-band overlaps a pinned act's
    //     heading block ("capabilities" stacked under the rail eyebrow).
    // Labels render at x >= 32px, always inside the slab zone, so the y-band
    // test is the whole test. Dots stay lit (the record is kept); hover still
    // reveals the label (the CSS suppression rule beats the hover rule).
    var headRects = [];
    headEls.forEach(function (h) {
      // the container box (e.g. #rail-head is a full-height flex slab) would
      // suppress every left-rail label; the heading block is its text children
      var kids = h.children.length ? h.children : [h];
      for (var ki = 0; ki < kids.length; ki++) {
        var hr = kids[ki].getBoundingClientRect();
        if (hr.top < vh && hr.bottom > 0) headRects.push(hr);
      }
    });
    nodes.forEach(function (n, ni) {
      var idx = nodeActIdx[ni];
      if (idx < 0) return;
      var off = activeId === acts[idx].getAttribute("data-act");
      if (!off && n.classList.contains("is-lit")) {
        var lb = n.querySelector(".tlabel");
        var lr = lb ? lb.getBoundingClientRect() : null;
        if (lr && lr.height > 0) {
          for (var hi = 0; hi < headRects.length; hi++) {
            var hr = headRects[hi];
            if (lr.top < hr.bottom - 2 && lr.bottom > hr.top + 2) { off = true; break; }
          }
        }
      }
      n.classList.toggle("tlabel-off", off);
    });
    // act 5 flow reveals: deterministic on scroll position. Fires once an
    // element's top passes 92% of the viewport; elements already above that
    // line (fast jump / flick skipped them) count as revealed, so nothing can
    // get stranded invisible. CSS transition + per-row delay = the stagger.
    for (var j = 0; j < rv.length; j++) {
      var rr = rvRects[j];
      if (rr.top < vh * 0.92) {
        rv[j].classList.add("is-in");
      }
    }
    // rail pan (act 4, motion ok, desktop layout only)
    if (activeId === "work" && railStage && track && !RMQ.matches && track.offsetParent !== null) {
      var pp = (activeP - DWELL) / (1 - DWELL);
      pp = Math.min(1, Math.max(0, pp));
      var eased = pp * pp * (3 - 2 * pp); // pulled-drawer smoothstep
      railStage.style.setProperty("--pan-x", (-(eased * panMax)).toFixed(1) + "px");
      railStage.style.setProperty("--pan-p", eased.toFixed(4));
      repoTicks.forEach(function (t, ci) {
        var si = cards[ci] ? parseFloat(cards[ci].style.getPropertyValue("--si") || "0") : 0;
        if (eased >= si + 0.05) t.classList.add("is-lit");
      });
    }
    // fast-jump guard: if the rail act is wholly in the past (jumped over), the
    // pan is complete by definition — stamp every tick so the trace record
    // keeps the peak (spec 8.6: the close resolves complete, nothing stranded)
    var widx = -1;
    for (var wi = 0; wi < acts.length; wi++) {
      if (acts[wi].getAttribute("data-act") === "work") { widx = wi; break; }
    }
    if (widx >= 0 && actRects[widx].bottom <= 2) {
      repoTicks.forEach(function (t) { t.classList.add("is-lit"); });
    }
  }
  function onScroll() {
    scheduleFrame();
  }

  function applyMotionState() {
    html.classList.toggle("rm", RMQ.matches);
    if (RMQ.matches) {
      // static final states: full copy, complete trace, no pan
      acts.forEach(function (a) { a.style.setProperty("--sc-p", "1"); });
      trace.style.setProperty("--trace-p", "1");
      nodes.forEach(function (n) { n.classList.add("is-lit"); });
    } else {
      bindTilt();
      scheduleFrame();
    }
  }
  applyMotionState();
  RMQ.addEventListener("change", applyMotionState);
  HOVER.addEventListener("change", function () { if (!RMQ.matches) bindTilt(); });
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  document.addEventListener("visibilitychange", onScroll); // rAF pauses while hidden; resync on return
  cacheSizes();
  setTimeout(scheduleFrame, 400);
})();
