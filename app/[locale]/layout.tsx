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
import '@/app/globals.css'

const geist = Geist({
	subsets: ['latin'],
	variable: '--font-geist-sans'
})

const geistMono = Geist_Mono({
	subsets: ['latin'],
	variable: '--font-geist-mono'
})

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

	return {
		title: {
			default: `${t('myName')} — Fullstack Developer`,
			template: `%s | ${t('myName')}`
		},
		description:
			'Fullstack Developer specializing in modern web applications with Django, Vue, Next.js.',
		authors: [{ name: t('myName') }],
		creator: t('myName'),
		openGraph: {
			type: 'website',
			locale: locale === 'el' ? 'el_GR' : 'en_US',
			siteName: `${t('myName')} Portfolio`
		},
		twitter: {
			card: 'summary_large_image',
			creator: `@${t('myUserName')}`
		},
		robots: {
			index: true,
			follow: true
		}
	}
}

export default async function LocaleLayout({ children, params }: Props) {
	const { locale } = await params

	if (!routing.locales.includes(locale as 'en' | 'el')) {
		notFound()
	}

	setRequestLocale(locale)

	const messages = await getMessages()

	return (
		<html
			lang={locale}
			suppressHydrationWarning
			className={`${geist.variable} ${geistMono.variable}`}
		>
			<body className="bg-terminal-bg text-terminal-text antialiased">
				<NextIntlClientProvider messages={messages}>
					<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
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
