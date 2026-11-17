# xignotic.dev

Personal site. Next.js 16, React 19, Tailwind CSS 4, TanStack Query, and components from [beUI](https://beui.dev).

## Setup

```bash
npm install
npm run dev
```

`.npmrc` sets `ignore-scripts=true`, so no dependency install scripts run.
Dependencies were installed through [safe-chain](https://github.com/AikidoSec/safe-chain).

### Environment

Optional, in `.env`:

| Variable | Used for |
| --- | --- |
| `TOPSTATS_API_KEY` | Live "bots tracked" count on the TopStats.gg project card (topstats.gg, profile menu, Get Token). Hidden when unset. |

## Scripts

- `npm run dev`: dev server
- `npm run build` / `npm start`: production build and server
- `npm run lint`, `npm run typecheck`

## Structure

Content lives in `src/lib/`; edit these to update the site:

- `site.ts`: name, links and SEO defaults
- `data/experience.ts`, `data/projects.ts`, `data/stack.ts`: page content
- `data/case-studies/`: project pages at `/projects/<id>` (a project with a `caseStudy` gets one)

Components in `src/components/`:

- `sections/`: the page sections (hero, experience, projects, stack)
- `experience/`, `projects/`: pieces those sections are built from
- `case-study/`: the project page header and story timeline
- `layout/`: providers, header, footer, analytics, JSON-LD
- `ui/`: small shared building blocks (section, tag list, links, rich text)
- `motion/`: beUI components, trimmed to what's used (see `THIRD_PARTY_NOTICES.md`)

Shared styles live in `src/app/globals.css`: colour tokens, the `card` and `link` utilities,
heading weights and one focus outline for every interactive element.

`src/lib/og/` renders the favicon, Apple icon and social preview images.

`src/app/api/topstats/` proxies the live TopStats.gg count so the API key stays on the server.

## Docker

```bash
docker compose up --build
```
