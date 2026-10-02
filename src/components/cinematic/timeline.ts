// Single source of truth for the hero scroll phases (progress 0 → 1).
//   0 → globeEnd          globe hero
//   globeEnd → cut        globe zooms, veil hides the camera cut
//   cut → boreStart       river crossing establishing shot
// One continuous bore from boreStart to 1, a card per leg:
//   boreStart → boreEnd   card 01: entry → mid river
//   boreEnd → microEnd    card 02: mid river → right bank
//   microEnd → railEnd    card 03: under the railway
//   railEnd → 1           card 04: up to the exit pit
// Intro (globe + river) is the first 20%; the four story cards then share the
// remaining 80% equally — a quarter of the story each (0.20 of the scroll).
export const T = { globeEnd: 0.08, cut: 0.12, boreStart: 0.2, boreEnd: 0.4, microEnd: 0.6, railEnd: 0.8 };

export const range = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)));
