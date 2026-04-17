# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Important:** This project uses Next.js 16, which has breaking changes from earlier versions. Before writing any Next.js-specific code, check `node_modules/next/dist/docs/` for current API conventions.

## Commands

```bash
npm run dev        # start dev server at localhost:3000
npm run build      # production build
npm run lint       # ESLint
npx tsc --noEmit   # type check (no tsc binary shortcut — use npx)
npm test           # run all tests once (Vitest)
npm run test:watch # run tests in watch mode
```

Run a single test file:
```bash
npx vitest run __tests__/ProjectCard.test.tsx
```

**Known issue:** If `npm run dev` fails with `Cannot find module '../server/require-hook'`, the `.bin/next` symlink is broken. Fix with:
```bash
rm node_modules/.bin/next && ln -s ../next/dist/bin/next node_modules/.bin/next
```

## Architecture

### Content layer
All site content lives in a single file: **`data/content.ts`**. It exports a typed `SiteContent` object and the `Project`, `Interest`, `Education`, and `Course` interfaces. The UI renders entirely from this data — no CMS, no API calls.

### Page composition
`app/page.tsx` is a server component that imports `content` and passes slices of it as props to each section. Sections are in `app/sections/`, reusable primitives are in `app/components/`.

### Animation pattern
Framer Motion variants must be typed as `Variants` (imported from `framer-motion`) — the `ease` property on a plain object literal doesn't satisfy the `Easing` union type in strict mode.

### Dark mode
Implemented manually (no next-themes). `DarkModeToggle` writes `"dark"` / `"light"` to `localStorage` and toggles the `dark` class on `<html>`. The root `<html>` tag has `suppressHydrationWarning` to prevent SSR mismatch. Reading system preference happens inside `useEffect` (client-only).

### CSP
`next.config.ts` sets security headers on all routes. The `script-src` directive includes `'unsafe-eval'` in development only (`NODE_ENV === "development"`) because React dev mode requires it. Never add `'unsafe-eval'` to the production CSP.

### Testing
- **`__tests__/content.test.ts`** — validates shape and invariants of `data/content.ts` (no React needed)
- **`__tests__/ProjectCard.test.tsx`** — renders the component via Testing Library; Framer Motion is mocked to strip animation props before they reach the DOM

When mocking Framer Motion in tests, strip `whileHover`, `initial`, `animate`, and `transition` props in the mock to avoid React DOM warnings.
