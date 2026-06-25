# Hero images

One niche-generic image per trade. The hero is selected by **niche**, not per
business — personalization comes from the name, city, and real rating.

Drop a JPG here named after the niche key in `lib/niches.ts`:

```
septic.jpg
tree.jpg
pressure_wash.jpg
well_water.jpg
fence.jpg
cleaning.jpg
junk_removal.jpg
roofing.jpg
excavating.jpg
plumbing.jpg
```

Source commercial-free photos (Unsplash / Pexels) or generate them. Recommended
~1600×900, optimized.

If a file is missing, the template falls back to a niche-colored gradient with a
dark overlay, so every site still looks intentional before photos are added.
A tenant can also override its image per-row via `heroImageUrl`.
