# Ronald's Portfolio

A modern, production-quality personal portfolio website built with a pixel-art inspired aesthetic, smooth animations, and a fully static architecture.

## Stack

- **Next.js 16** (App Router) — React framework
- **TypeScript** — strict mode throughout
- **Tailwind CSS v4** — utility-first styling
- **Framer Motion** — animations and transitions
- **Vitest + Testing Library** — unit tests

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | Type check |
| `npm test` | Run test suite |
| `npm run test:watch` | Tests in watch mode |

## Customizing Content

Everything rendered on the page — name, projects, interests, education — comes from a single file:

```
data/content.ts
```

Edit it to make the site your own. The TypeScript interfaces at the top of the file document every available field.

### Adding a project

```ts
{
  id: "project-7",
  title: "My New Project",
  description: "One-line summary shown on the card.",
  longDescription: "Full description shown in the modal.",
  tags: ["React", "TypeScript"],
  githubUrl: "https://github.com/you/repo",
  liveUrl: "https://your-demo.com",   // optional — shows a "Live App" button on card + modal
  media: [                            // optional — place images in /public/images/
    { type: "image", src: "/images/screenshot.png", alt: "App screenshot" },
    { type: "youtube", id: "dQw4w9WgXcQ" },  // 11-char YouTube video ID
  ],
}
```

A project can mix images and YouTube embeds in `media[]`. YouTube iframes are lazy-mounted and IDs are validated against `/^[a-zA-Z0-9_-]{11}$/` before embedding.

## Project Structure

```
app/
  components/    Reusable UI — Button, NavBar, ProjectCard, ProjectModal, etc.
  sections/      Page sections — Hero, Projects, Interests, Education, Footer
  layout.tsx     Root layout: fonts, dark mode, CSP headers
  page.tsx       Composes sections, passes content as props

data/
  content.ts     Single source of truth for all site content

__tests__/
  content.test.ts       Validates data shape and invariants
  ProjectCard.test.tsx  Component rendering and interaction tests

public/
  images/        Static images referenced in content.ts
```

## Dark Mode

Toggled via the button in the nav bar. Preference is persisted to `localStorage` and respects the system default on first visit.

## Deployment

The site is fully static and deploys anywhere that runs Node.js or serves static files.

**Vercel (recommended):**
```bash
npx vercel
```

**Static export** (no server required):
```ts
// next.config.ts
const nextConfig = {
  output: "export",
  // ...
};
```
Then run `npm run build` — output lands in `/out`.

> Note: static export disables the `headers()` CSP configuration. For a static host, set equivalent security headers in the platform's configuration (e.g. `vercel.json`, Netlify `_headers`).
