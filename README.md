# Mozart

An interactive web app to explore and play famous Mozart melodies in the browser,
built with React, TypeScript, and Vite. A tiny Web Audio synthesiser turns
short, hand-transcribed excerpts (and an on-screen piano) into sound.

## Tech stack

- [Vite](https://vite.dev/) + [React 18](https://react.dev/) + TypeScript
- [Vitest](https://vitest.dev/) for unit tests
- [ESLint](https://eslint.org/) (flat config) for linting
- Web Audio API for sound (browser-only)

## Getting started

Requirements: Node.js 20+ (Node 22 recommended).

```bash
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:5173
```

## Common commands

| Command          | Description                                  |
| ---------------- | -------------------------------------------- |
| `npm run dev`    | Start the Vite dev server (host 0.0.0.0)     |
| `npm run build`  | Type-check and build for production          |
| `npm run preview`| Preview the production build                 |
| `npm run lint`   | Run ESLint over the project                  |
| `npm test`       | Run the unit tests once with Vitest          |

## Project layout

```
src/
  music.ts              Pure music-theory helpers (note → frequency, durations)
  music.test.ts         Unit tests for the helpers
  synth.ts              Web Audio wrapper (browser-only)
  data/compositions.ts  Hand-transcribed melody excerpts
  components/Piano.tsx   On-screen clickable keyboard
  App.tsx               App shell wiring it together
```
