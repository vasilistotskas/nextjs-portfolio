# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev            # Dev server with Turbopack
pnpm build          # Clean + production build (rm -rf .next build .vercel && next build)
pnpm lint           # ESLint (flat config, eslint.config.ts) — NOT next lint
pnpm lint:fix       # ESLint with auto-fix
pnpm type-check     # tsc --noEmit (strict mode)
pnpm format         # Prettier check
pnpm format:fix     # Prettier write
```

CI runs `pnpm lint`, `pnpm type-check`, then `pnpm build` — all three must pass with zero errors.

## Architecture

Next.js 15 App Router personal portfolio with a terminal/code aesthetic. Deployed to Vercel via GitHub Actions on push to `master`. Releases are automated with semantic-release (Angular commit convention).

### Routing & i18n

- **next-intl v4** with locales `en` and `el` (Greek). All pages live under `app/[locale]/`.
- `app/[locale]/layout.tsx` **is** the root layout — it renders `<html>`/`<body>`. There is deliberately no `app/layout.tsx`: `locale` is only a **root param** when its dynamic segment sits _above_ the root layout, and a pass-through `app/layout.tsx` would make that segment nested instead. If you add one back, `next/root-params` silently stops resolving.
- `i18n/routing.ts` defines the routing config; `i18n/request.ts` reads the locale via `next/root-params` and loads `messages/{locale}.json`.
- **Do not call `setRequestLocale`** — it is deprecated. Locale flows implicitly through root params, so pages take no `params` and server code reads `getLocale()` / `getTranslations('ns')` without passing a locale.
- `i18n/request.ts` must stay **total** (never throw). It is also evaluated while rendering the built-in 404 for paths that never matched a locale, where the root param is absent; throwing blanks that page out.
- The root layout rejects invalid locales with `hasLocale` + `notFound()`. This is **not** redundant with `proxy.ts`: `[locale]` matches any single segment and the proxy skips paths containing a dot, so `/foo.txt` reaches the layout with `locale = 'foo.txt'` and would otherwise render the default locale with a 200.
- `generateStaticParams` in the root layout returns both locales for SSG.
- `next/root-params` is Server Components only — not Client Components, Server Actions, or Route Handlers. `app/api/*` must receive locale explicitly.

### Styling — Tailwind CSS v4

Uses CSS-first configuration (`@import 'tailwindcss'` in `globals.css`, no `tailwind.config`). The theming system:

1. **Semantic CSS vars** defined in `@layer base` — `:root` for light, `.dark` for dark (switched by `next-themes` with `attribute="class"`)
2. **`@theme` block** maps vars to Tailwind tokens: `--color-terminal-bg: var(--bg)` → generates `bg-terminal-bg`, `text-terminal-bg`, etc.
3. Custom utility classes (`.glass`, `.glow-green`, `.card-hover`, `.text-gradient`, `.terminal-border`, etc.) are in `@layer utilities` in globals.css.

**Critical**: Put light/dark values in CSS vars under `@layer base`, NOT as static values in `@theme`. Static values in `@theme` break dark mode switching.

### API Routes

- `api/contact` — Resend email (instantiate `new Resend()` inside the handler, not at module level)
- `api/spotify/now-playing` and `api/spotify/top-tracks` — Spotify API proxies using refresh token flow in `lib/spotify.ts`
- There is no `api/github` route: `components/ui/GitHubStats.tsx` is a Server Component that calls the GitHub API directly.
- Routes run on the default Node runtime. Do not add `export const runtime = 'edge'` — it is deprecated in Next.js 16 and also opts the route out of static generation.

### Metadata & SEO

- Next.js merges metadata between segments **shallowly**. A page that sets _any_ `openGraph` or `twitter` key **replaces the parent object wholesale** — it does not merge into it. Setting just `openGraph: { url }` on a page silently drops `og:image`, `og:type`, `og:site_name` and `og:locale`.
- Therefore every page builds its metadata through `buildPageMetadata()` in `lib/seo.ts`, which emits complete `openGraph`/`twitter`/`alternates` objects. Pages pass only `path`, `title` and `description`.
- The root layout carries **only** non-nested fields (`metadataBase`, title template, keywords, robots, icons, manifest). Do not add `openGraph`/`twitter` there — pages override it entirely, so it would be dead config.
- `siteUrl` lives in `lib/seo.ts`. Don't re-derive `process.env.NEXT_PUBLIC_SITE_URL` in individual files.
- Locale lists (`alternates.languages`, `og:locale:alternate`, JSON-LD `inLanguage`) derive from `routing.locales` — never hardcode `['en', 'el']`.

### Key Conventions

- **Type-only imports**: `import type { X }` — enforced by `@typescript-eslint/consistent-type-imports`
- **No `any`**: `@typescript-eslint/no-explicit-any` is set to `error`
- **JSX comments**: `//` text in JSX must be wrapped as `{'// '}` to avoid `react/jsx-no-comment-textnodes`
- **Animations**: `motion` library (import from `motion/react`). Sections using motion must be `'use client'` with `whileInView` for scroll-reveal.
- **Path alias**: `@/*` maps to project root
- **`cn()` utility** in `lib/utils.ts`: `clsx` + `tailwind-merge`

## Env Vars

Required: `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN`, `RESEND_API_KEY`, `CONTACT_EMAIL`, `NEXT_PUBLIC_SITE_URL`
Optional: `GITHUB_TOKEN` (raises GitHub API rate limit)

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
