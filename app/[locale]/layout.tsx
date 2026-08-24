import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { ThemeProvider } from 'next-themes'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Geist, Geist_Mono } from 'next/font/google'
import { routing } from '@/i18n/routing'
import { siteDescription, siteUrl } from '@/lib/seo'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/ui/ScrollProgress'
import '@/app/globals.css'

const geist = Geist({
	subsets: ['latin'],
	variable: '--font-geist-sans'
})

const geistMono = Geist_Mono({
	subsets: ['latin'],
	variable: '--font-geist-mono'
})

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }))
}

// Root-level metadata only. Anything nested (openGraph, twitter, alternates) is
// merged shallowly by Next.js, so a page defining it replaces this object
// entirely — those live in `buildPageMetadata` and are emitted per page.
export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('common')
	const myName = t('myName')

	return {
		metadataBase: new URL(siteUrl),
		title: {
			default: `${myName} — Fullstack Developer`,
			template: `%s | ${myName}`
		},
		description: siteDescription,
		keywords: [
			'Fullstack Developer',
			'Web Developer',
			myName,
			'Python',
			'Django',
			'Nuxt',
			'Vue',
			'Next.js',
			'TypeScript',
			'Kubernetes',
			'Docker',
			'Portfolio'
		],
		authors: [{ name: myName, url: siteUrl }],
		creator: myName,
		publisher: myName,
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1
			}
		},
		icons: {
			icon: [
				{
					url: '/static/favicons/favicon-16x16.png',
					sizes: '16x16',
					type: 'image/png'
				},
				{
					url: '/static/favicons/favicon-32x32.png',
					sizes: '32x32',
					type: 'image/png'
				}
			],
			apple: '/static/favicons/apple-touch-icon.png'
		},
		manifest: '/manifest.json'
	}
}

export default async function RootLayout({ children, params }: LayoutProps<'/[locale]'>) {
	// `[locale]` matches any single segment, and `proxy.ts` deliberately skips
	// paths containing a dot, so requests like `/foo.txt` reach this layout with
	// `locale = 'foo.txt'`. Reject anything that is not a real locale here —
	// otherwise it would render as the default locale with a 200.
	const { locale } = await params

	if (!hasLocale(routing.locales, locale)) {
		notFound()
	}

	const t = await getTranslations('common')

	const jsonLd = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebSite',
				'@id': `${siteUrl}/#website`,
				url: siteUrl,
				name: `${t('myName')} Portfolio`,
				description: siteDescription,
				inLanguage: [...routing.locales]
			},
			{
				'@type': 'Person',
				'@id': `${siteUrl}/#person`,
				name: t('myName'),
				url: siteUrl,
				jobTitle: 'Fullstack Developer',
				worksFor: {
					'@type': 'Organization',
					name: 'Advisable'
				},
				sameAs: [
					`https://github.com/${t('myUserName')}`,
					`https://linkedin.com/in/${t('myUserName')}`,
					'https://x.com/vasilis_totskas'
				],
				knowsLanguage: [...routing.locales]
			}
		]
	}

	return (
		<html
			lang={locale}
			suppressHydrationWarning
			data-scroll-behavior="smooth"
			className={`${geist.variable} ${geistMono.variable}`}
		>
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</head>
			<body className="bg-terminal-bg text-terminal-text antialiased">
				<NextIntlClientProvider>
					<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
						<ScrollProgress />
						<div className="flex min-h-screen flex-col">
							<Header />
							<main className="flex-1">{children}</main>
							<Footer />
						</div>
					</ThemeProvider>
				</NextIntlClientProvider>
				{process.env.VERCEL && (
					<>
						<Analytics />
						<SpeedInsights />
					</>
				)}
			</body>
		</html>
	)
}
