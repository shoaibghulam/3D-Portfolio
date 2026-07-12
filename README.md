# Shoaib Ahmed — 3D Portfolio

An immersive, fully 3D developer portfolio. A scroll-driven WebGL universe — neural core,
orbiting skill galaxy, starfield and floating code shards — behind glass-panel content covering
experience, education, certifications, languages and live products.

**Live tech:** Vite · React 19 · TypeScript · Three.js · @react-three/fiber · @react-three/drei · @react-three/postprocessing

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## How it works

- The `<Canvas>` is fixed full-screen behind normal scrolling HTML sections
  (native scroll = accessible, deep-linkable anchors).
- `src/lib/scrollStore.ts` converts scroll position into a continuous "page" value;
  `CameraRig` interpolates the camera through one keyframe per section with mouse parallax.
- Scene set pieces (`NeuralCore`, `SkillsGalaxy`, `CodeShards`, `Starfield`) live in
  `src/components/three/` and fade/scale in around their section.
- Content and profile data live in `src/data/profile.ts` — edit that file to update
  projects, skills and links.
- Respects `prefers-reduced-motion`; mobile gets fewer particles and no postprocessing.

## Structure

```text
src/
├── App.tsx                  # canvas + content composition
├── data/profile.ts          # all portfolio content
├── lib/scrollStore.ts       # scroll → 3D progress
├── hooks/                   # reduced motion, reveal-on-scroll
├── components/
│   ├── three/               # WebGL scene (core, galaxy, shards, stars, camera, fx)
│   └── ui/                  # nav, loader, sections
└── styles/global.css        # design tokens + layout
```
