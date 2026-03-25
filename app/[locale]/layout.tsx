import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { ThemeProvider } from 'next-themes'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Geist, Geist_Mono } from 'next/font/google'
import { routing } from '@/i18n/routing'
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

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vasilistotskas.com'

type Props = {
	children: ReactNode
	params: Promise<{ locale: string }>
}

export async function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'common' })
	const myName = t('myName')
	const description =
		'Fullstack Developer specializing in modern web applications with Python, Django, Nuxt, Vue, Next.js.'

	return {
		metadataBase: new URL(baseUrl),
		title: {
			default: `${myName} — Fullstack Developer`,
			template: `%s | ${myName}`
		},
		description,
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
		authors: [{ name: myName, url: baseUrl }],
		creator: myName,
		publisher: myName,
		alternates: {
			canonical: `/${locale}`,
			languages: {
				en: '/en',
				el: '/el',
				'x-default': '/en'
			}
		},
		openGraph: {
			type: 'website',
			locale: locale === 'el' ? 'el_GR' : 'en_US',
			alternateLocale: locale === 'el' ? 'en_US' : 'el_GR',
			url: `/${locale}`,
			siteName: `${myName} Portfolio`,
			title: `${myName} — Fullstack Developer`,
			description,
			images: [
				{
					url: '/banner.png',
					alt: `${myName} — Fullstack Developer Portfolio`
				}
			]
		},
		twitter: {
			card: 'summary_large_image',
			creator: `@${t('myUserName')}`,
			title: `${myName} — Fullstack Developer`,
			description,
			images: ['/banner.png']
		},
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

export default async function LocaleLayout({ children, params }: Props) {
	const { locale } = await params

	if (!routing.locales.includes(locale as 'en' | 'el')) {
		notFound()
	}

	setRequestLocale(locale)

	const messages = await getMessages()
	const t = await getTranslations({ locale, namespace: 'common' })

	const jsonLd = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebSite',
				'@id': `${baseUrl}/#website`,
				url: baseUrl,
				name: `${t('myName')} Portfolio`,
				description:
					'Fullstack Developer specializing in modern web applications with Python, Django, Nuxt, Vue, Next.js.',
				inLanguage: ['en', 'el']
			},
			{
				'@type': 'Person',
				'@id': `${baseUrl}/#person`,
				name: t('myName'),
				url: baseUrl,
				jobTitle: 'Fullstack Developer',
				worksFor: {
					'@type': 'Organization',
					name: 'Advisable'
				},
				sameAs: [
					`https://github.com/${t('myUserName')}`,
					`https://linkedin.com/in/${t('myUserName')}`,
					`https://twitter.com/${t('myUserName')}`
				],
				knowsLanguage: ['en', 'el']
			}
		]
	}

	return (
		<html
			lang={locale}
			suppressHydrationWarning
			className={`${geist.variable} ${geistMono.variable}`}
		>
			<body className="bg-terminal-bg text-terminal-text antialiased">
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
				<NextIntlClientProvider messages={messages}>
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
