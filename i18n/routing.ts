import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
	locales: ['en', 'el'],
	defaultLocale: 'en',
	// hreflang comes from `buildPageMetadata()` in `lib/seo.ts`. The proxy's own
	// `Link` header pointed x-default at the unprefixed path, which 307s, and
	// contradicted the HTML's x-default.
	alternateLinks: false
})
