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
- `app/layout.tsx` is a minimal shell that just renders children; the real layout (fonts, providers, header/footer) is in `app/[locale]/layout.tsx`.
- `i18n/routing.ts` defines the routing config; `i18n/request.ts` resolves locale and loads `messages/{locale}.json`.
- Every page and layout that uses translations must call `setRequestLocale(locale)` for static rendering.
- `generateStaticParams` in the locale layout returns both locales for SSG.

### Styling — Tailwind CSS v4

Uses CSS-first configuration (`@import 'tailwindcss'` in `globals.css`, no `tailwind.config`). The theming system:

1. **Semantic CSS vars** defined in `@layer base` — `:root` for light, `.dark` for dark (switched by `next-themes` with `attribute="class"`)
2. **`@theme` block** maps vars to Tailwind tokens: `--color-terminal-bg: var(--bg)` → generates `bg-terminal-bg`, `text-terminal-bg`, etc.
3. Custom utility classes (`.glass`, `.glow-green`, `.card-hover`, `.text-gradient`, `.terminal-border`, etc.) are in `@layer utilities` in globals.css.

**Critical**: Put light/dark values in CSS vars under `@layer base`, NOT as static values in `@theme`. Static values in `@theme` break dark mode switching.

### API Routes

- `api/contact` — Resend email (instantiate `new Resend()` inside the handler, not at module level)
- `api/github` — GitHub stats proxy
- `api/spotify/now-playing` and `api/spotify/top-tracks` — Spotify API proxies using refresh token flow in `lib/spotify.ts`

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
