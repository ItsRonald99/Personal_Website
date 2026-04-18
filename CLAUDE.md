# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Important:** This project uses Next.js 16 (React 19, TypeScript 6). Before writing any Next.js-specific code, check `node_modules/next/dist/docs/` for current API conventions.

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
All site content lives in **`data/content.ts`**. It exports a typed `SiteContent` object and all shared interfaces/types (`Project`, `Interest`, `Education`, `Course`, `ProjectMediaItem`). The UI renders entirely from this data — no CMS, no API calls.

### Project media model
`Project` supports a `media?: ProjectMediaItem[]` array (preferred) as well as legacy `imageUrl?` and `youtubeId?` fields. Both `ProjectCard` and `ProjectModal` call a local `resolveMedia()` helper that prefers `media[]` and falls back to the legacy fields. New projects should use `media[]` only.

```ts
type ProjectMediaItem =
  | { type: "image"; src: string; alt?: string }
  | { type: "youtube"; id: string };
```

`ProjectModal.resolveMedia` validates YouTube IDs via `isSafeYoutubeId()` before including them. Keep that guard in place in any new consumer of `youtubeId`.

When `project.liveUrl` is set to a non-empty string, a "Live Demo" button renders on both `ProjectCard` (inline amber button, stops card click propagation) and `ProjectModal` (uses `Button` with `variant="outline"`).

### Page composition
`app/page.tsx` is a server component that imports `content` and passes slices of it as props to each section. Sections are in `app/sections/`, reusable primitives are in `app/components/`.

`ProjectsSection` owns the `activeProject` state and renders both the card grid and `ProjectModal` — it is the only place that wires card clicks to modal open/close.

### Button component
`app/components/Button.tsx` renders either a `motion.a` (when `href` is provided) or a `motion.button`. Key props:
- `variant`: `"primary"` (amber fill + pixel shadow), `"outline"`, `"ghost"`
- `external`: sets `target="_blank" rel="noopener noreferrer"` on the anchor

Use `Button` for any named action (GitHub link, Live Demo, etc.). For inline icon-only links prefer a raw `motion.a`.

### Media carousel
`MediaCarousel` (`app/components/MediaCarousel.tsx`) is a self-contained swipeable carousel:
- Uses `useMotionValue` + imperative `animate()` (not the `animate` prop) for spring-based slide transitions driven by `ResizeObserver`-measured pixel widths.
- YouTube iframes are lazy-mounted: only rendered once a slide has been visited (`visitedSlides` Set, initialised with `{0}`). Slide 0 is always pre-visited, so a YouTube-only project renders its iframe immediately.
- `objectFit` prop: `"cover"` (default, used by cards) or `"contain"` (used by modal for tall images). Contain mode switches to a dark background.
- Drag vs. click: a `hasDragged` ref distinguishes swipe gestures from taps so card `onClick` isn't fired after a drag.

### Animation pattern
Framer Motion variants must be typed as `Variants` (imported from `framer-motion`) — the `ease` property on a plain object literal doesn't satisfy the `Easing` union type in strict mode.

For carousels and other imperative animations, use the `animate` function imported from `framer-motion` (not the `animate` prop on a motion component).

### Dark mode
Implemented manually (no next-themes). `DarkModeToggle` writes `"dark"` / `"light"` to `localStorage` and toggles the `dark` class on `<html>`. The root `<html>` tag has `suppressHydrationWarning` to prevent SSR mismatch. Reading system preference happens inside `useEffect` (client-only).

### Modal scroll lock
`ProjectModal` locks scroll on both `document.body` and `document.documentElement` when open, and also registers the Escape key handler, inside a single `useEffect` with `[project, onClose]` dependencies. If adding more modal effects, keep concerns in separate effects rather than expanding this one.

### CSP
`next.config.ts` sets security headers on all routes. Key constraints:
- `script-src` includes `'unsafe-eval'` in development only — never add it to production.
- `frame-src` allows only `https://www.youtube-nocookie.com` — all YouTube embeds must use this domain (not `youtube.com`).
- `img-src` allows `https://img.youtube.com` for thumbnails; `next/image` `remotePatterns` mirrors this allowlist.

### Testing
- **`__tests__/content.test.ts`** — validates shape and invariants of `data/content.ts` (no React needed)
- **`__tests__/ProjectCard.test.tsx`** — renders the component via Testing Library; Framer Motion is fully mocked

When mocking Framer Motion in tests, mock `motion.article`, `motion.div`, `motion.a`, and `motion.button` (the last two are used by `Button`). Strip all animation props (`whileHover`, `initial`, `animate`, `transition`, `drag*`, `onDrag*`, `whileTap`) from motion element mocks to avoid React DOM warnings. `ResizeObserver` must also be mocked globally (`global.ResizeObserver = class { observe(){} unobserve(){} disconnect(){} }`) because jsdom does not provide it.
