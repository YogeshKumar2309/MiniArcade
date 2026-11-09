# MiniArcade — Mini-Games Portal

Next.js 15 (App Router) + TypeScript + Tailwind CSS. Static data, no backend. Vercel-ready.

## Run
```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
npm run lint
```

## Deploy
Push to GitHub and import in Vercel — no config needed.

## Structure
- `lib/games.ts` — game list (set `status: "live"` + add a page to launch a game)
- `lib/arrowPuzzleEngine.ts` — pure game logic (`isRemovable`, `removeArrow`, `generateLevel`, `isSolvable`)
- `components/ArrowPuzzle.tsx` — playable game (lazy-loaded via `next/dynamic`)
- `app/games/[slug]` — "Coming Soon" page for unreleased games

## Animations
`@formkit/auto-animate` (~2 kB) for grid filtering; everything else is plain CSS keyframes/transitions.
