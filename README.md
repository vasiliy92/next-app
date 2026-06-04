# Training Matrix

Adaptive calisthenics training program generator — science-backed matrix with Notion-style UI.

## Overview

This application generates a dynamically adaptable training program for pull-ups and push-ups based on:
- Athlete's bodyweight, age, and current maxes
- Normative data ceilings (95th percentile)
- Diminishing returns progression model
- Periodization with emphasis rotation
- Cluster sets (weeks 1-8) and traditional sets (weeks 9+)
- Deload every 4th week
- Injury prevention prehab for shoulders/elbows (especially at 100kg+)

## Scientific Foundation

See [SCIENCE.md](docs/SCIENCE.md) for full references.

Key sources:
- **Strength Level** (4.8M lifts) — normative pull-up/push-up standards
- **Vanderburgh (2006, 2007)** — allometric scaling and bodyweight penalty
- **Kjaer et al. (2016)** — age decline in muscular strength
- **Yu et al. (2021)** — cluster sets meta-analysis
- **Schoenfeld et al. (2023)** — diminishing returns / plateau model
- **Cooper Institute (2013)** — push-up age norms

## Architecture

### Matrix (TDD-first)
- `norms.js` — normative data tables (BW, age), interpolation, combined norms
- `athlete.js` — eligibility checker, goal validator with ceiling caps
- `progression.js` — diminishing returns model, macrocycle estimation
- `volume.js` — volume calculator, MRV by bodyweight, maintenance model
- `exercises.js` — exercise database (pull, push, prehab, test)
- `periodization.js` — mesocycle/macrocycle builder (Mon/Wed/Fri sessions)
- `matrix.js` — main generator combining all modules

### Tests
75 tests across 10 sections — all passing.

### Web App
- Vite + vanilla JS
- Notion-style minimalist light design
- Plus Jakarta Sans + Space Grotesk typography
- SVG progression chart
- CSV export

## Quick Start

```bash
npm install
npm run dev      # development server
npm run build    # production build
npm run test     # run 75 tests
```

## Deployment

Built to `dist/` and deployed to GitHub Pages.

## License

MIT
