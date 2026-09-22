# Image slots for design-7-breach

This build is fully functional with zero photos — the alligator is a hand-built SVG rig,
species cards use CSS/silhouettes, and all surfaces are typography-driven. When ComfyUI is
back up, generate the following and drop them in this folder. The site's CSS placeholders
can then be swapped for <img> tags (never background-image — file:// CORS).

Recommended: Krea2 workflow, resize to ~200-400KB (webp/jpg) before use.

1. hero-bg.jpg   (1600x900) — alligator surfacing in a still mountain pond at dusk,
   San Luis Valley ridgelines behind, low warm sun, dark cinematic, subtle mist.
   (Optional — hero is currently a pure CSS night-sky composition; a photo here would
   sit behind the gator rig at ~25% opacity.)
2. species-albino.jpg   (1200x900) — albino alligator portrait, pale skin, red eyes,
   natural pond light.
3. species-caiman.jpg   (1200x900) — caiman head breaking the surface, dark water.
4. species-croc.jpg     (1200x900) — crocodile profile, long snout, dry basking bank.
5. species-tortoise.jpg (1200x900) — desert tortoise, high-desert golden light.
6. species-snakes.jpg   (1200x900) — snake collection in a keeper's hands, close.
7. morris-tribute.jpg   (1600x1000) — vintage film-still look, gator under a warm
   spotlight on a dark set, 1980s grain. (Replaces the SVG in the Morris card.)
8. about-farm.jpg       (1600x900) — wide golden-hour shot of the ranch ponds with
   mountain backdrop. (For the rescue/mission section.)

Where each slot maps in index.html:
- hero: .hero (add <img> inside .hero__grid's parent, before gator-stage, z-index:1, opacity .3)
- species cards: .sp elements (add <img> at top, object-fit cover, 55% height, under .sp__band)
- morris: .morris__card (replace #morrisGator contents)
- rescue: .rescue__panel or a new .rescue__media column
