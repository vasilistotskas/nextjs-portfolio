# vasilistotskas.com

Terminal-themed developer portfolio built with the latest web stack.

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript 5.7](https://www.typescriptlang.org/) (strict)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **i18n**: [next-intl](https://next-intl.dev/) (EN + EL)
- **Email**: [Resend](https://resend.com/)
- **Animation**: [Motion](https://motion.dev/)
- **Deployment**: [Vercel](https://vercel.com)

## Overview

- `app/[locale]/*` - Locale-aware pages (home, about, contact)
- `app/api/*` - API routes (contact form, GitHub stats, Spotify)
- `components/layout/*` - Header, Footer, Navigation, MobileMenu
- `components/sections/*` - Hero, Skills, Projects, Experience
- `components/ui/*` - Terminal, Badge, Card, NowPlaying, GitHubStats, ContactForm
- `i18n/*` - next-intl routing and request config
- `messages/*` - Translation files (en.json, el.json)
- `lib/*` - Spotify API helpers, shared types, utilities
- `public/*` - Static assets

## Running Locally

Requires Node.js ≥ 20 and pnpm ≥ 10.

```bash
git clone https://github.com/vasilistotskas/nextjs-portfolio
cd nextjs-portfolio
pnpm install
cp .env.example .env.local  # fill in your keys
pnpm dev
```

## Environment Variables

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
RESEND_API_KEY=
CONTACT_EMAIL=
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
GITHUB_TOKEN=          # optional — raises API rate limit
```

## Cloning / Forking

Please review the [license](https://github.com/vasilistotskas/nextjs-portfolio/blob/main/LICENSE.txt) and remove all personal information before deploying your own version.
