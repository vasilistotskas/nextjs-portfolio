# Code Reviewer

Review code changes in this Next.js 15 portfolio project for correctness, convention adherence, and common pitfalls.

## Project Conventions to Check

### TypeScript
- **Type-only imports**: Must use `import type { X }` for type-only imports. Enforced by `@typescript-eslint/consistent-type-imports`.
- **No `any`**: `@typescript-eslint/no-explicit-any` is set to `error`. Use proper types from `lib/types.ts` or define new ones.
- **Unused vars**: Allowed only with `_` prefix (`argsIgnorePattern: '^_'`).

### React & Next.js
- **`setRequestLocale(locale)`**: Must be called in every page and layout under `app/[locale]/` for static rendering (next-intl SSG requirement).
- **Server vs Client**: Components using `motion`, `useState`, `useEffect`, event handlers, or browser APIs must have `'use client'` directive. Server components should NOT have it.
- **JSX comments**: Bare `//` text in JSX triggers `react/jsx-no-comment-textnodes`. Wrap as `{'// '}` instead.
- **Async params**: In Next.js 15+, `params` is a Promise. Must `await params` before destructuring.

### Tailwind CSS v4 Theming
- **CSS vars in `@layer base`**: Light values in `:root`, dark in `.dark`. Never put static color values directly in `@theme`.
- **`@theme` references vars**: e.g., `--color-terminal-bg: var(--bg)`. This auto-generates utility classes like `bg-terminal-bg`.
- **Use semantic tokens**: Always use `terminal-*` color tokens (`text-terminal-green`, `bg-terminal-surface`, `border-terminal-border`), not raw hex colors.
- **Custom utilities**: Use existing utilities (`.glass`, `.card-hover`, `.glow-cyan`, `.terminal-border`, `.text-gradient`, `.section-accent`, `.noise-overlay`, `.gradient-border-top`) before creating new ones.

### API Routes
- **Resend**: Instantiate `new Resend()` inside the handler function, NOT at module level (causes build errors).
- **Zod validation**: All API input should be validated with zod schemas.
- **Error responses**: Return proper status codes (400 for validation, 500 for server errors) with `{ error: string }` shape.

### i18n
- **Both locale files**: Any new translation key must exist in both `messages/en.json` and `messages/el.json`.
- **Namespace structure**: Use existing namespaces (nav, hero, skills, projects, experience, about, contact, footer, spotify, github, notFound, common).

### Animation
- **Import path**: `motion/react` (NOT `framer-motion`).
- **Scroll animations**: Use `whileInView` with `viewport={{ once: true, margin: '-60px' }}`.
- **Staggered children**: Use `transition={{ delay: index * factor }}` pattern.
- **AnimatePresence**: Required for exit animations (mode="wait" for swaps).

## Review Process

1. Read all changed files.
2. Check each file against the conventions above.
3. Flag issues with severity: **Error** (must fix), **Warning** (should fix), **Note** (suggestion).
4. For each issue, cite the file path and line, explain the problem, and suggest the fix.
5. If no issues are found, confirm the code looks good.
