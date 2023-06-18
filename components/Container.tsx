import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

import Footer from '@components/Footer'
import MobileMenu from '@components/MobileMenu'
import ContactForm from '@components/ContactForm'
import LanguageSwitcher from '@components/LanguageSwitcher'
import Image from 'next/image'
import NavItem from '@components/utils/NavItem'

export default function Container(props) {
	const [mounted, setMounted] = useState(false)
	const { resolvedTheme, setTheme } = useTheme()

	// After mounting, we have access to the theme
	useEffect(() => setMounted(true), [])

	const { children, ...customMeta } = props
	const router = useRouter()

	const meta = {
		title: process.env.NEXT_SETTINGS_TITLE,
		description: process.env.NEXT_SETTINGS_DESCRIPTION,
		image: process.env.NEXT_SETTINGS_IMG_URL,
		type: 'website',
		keywords:
			'Vasilis, Totskas, developer, vasilistotskas, experience, web, programming, technology, coding, technologies, frameworks',
		...customMeta
	}

	return (
		<div className="relative bg-gray-50 dark:bg-gray-900">
			<Head>
				<title>{meta.title}</title>
				<meta name="robots" content="follow, index" />
				<meta content={meta.description} name="description" />
				{meta.keywords && <meta content={meta.keywords} name="keywords" />}
				{meta.author && <meta content={meta.author} name="author" />}
				<meta
					property="og:url"
					content={`${process.env.NEXT_PUBLIC_DOMAIN_NAME}${router.asPath}`}
				/>
				<link
					rel="canonical"
					href={`${process.env.NEXT_PUBLIC_CANONICAL_URL}${router.asPath}`}
				/>
				<meta property="og:type" content={meta.type} />
				<meta property="og:site_name" content="Vasilis Totskas" />
				<meta property="og:description" content={meta.description} />
				<meta property="og:title" content={meta.title} />
				<meta property="og:image" content={meta.image} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@vasilistotskas" />
				<meta name="twitter:title" content={meta.title} />
				<meta name="twitter:description" content={meta.description} />
				<meta name="twitter:image" content={meta.image} />

				<meta
					name="google-site-verification"
					content="scsCZtHoRwHWuMFA9Tp1Fu78qmJIOKRNDLYyRTlK5vw"
				/>
				{meta.date && <meta property="article:published_time" content={meta.date} />}
			</Head>
			<div className="grid grid-cols-1 items-center justify-center px-8 pb-8 pt-4 md:grid-cols-auto-1fr">
				<a
					className="hidden transition-all hover:scale-110 hover:transform md:grid"
					href={process.env.NEXT_PUBLIC_GITHUB_URL}
					target="_blank"
					title="Github"
					rel="noopener noreferrer"
				>
					<Image
						alt={`Github`}
						src={`/static/images/github.png`}
						width={42}
						height={35}
						priority
					/>
				</a>
				<nav className="relative mx-auto grid w-full max-w-3xl grid-cols-2fr-1fr items-center border-gray-200 bg-gray-50 bg-opacity-60 text-center text-gray-900  dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
					<a
						href="#skip"
						className="skip-nav"
						target="_blank"
						title="Skip"
						rel="noopener noreferrer"
					>
						Skip to content
					</a>
					<div className="ml-[-0.60rem] md:grid md:grid-cols-repeat-auto-fill-mimax-80-auto">
						<MobileMenu />
						<NavItem href="/" text="Home" ariaLabel="Home" />
						<NavItem href="/blog" text="Blog" ariaLabel="Blog" />
						<NavItem href="/guestbook" text="Guestbook" ariaLabel="Guestbook" />
						<NavItem href="/dashboard" text="Dashboard" ariaLabel="Dashboard" />
						<NavItem href="/about" text="About" ariaLabel="About" />
					</div>
					<div className="grid grid-cols-auto-auto items-center">
						<LanguageSwitcher></LanguageSwitcher>
						<button
							aria-label="Toggle Dark Mode"
							type="button"
							className="flex h-12 w-12 items-center justify-center bg-transparent"
							onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
						>
							{mounted && (
								<div className="transform transition-all hover:scale-105">
									{resolvedTheme === 'dark' ? (
										<Image
											alt={`Toggle Theme Mode`}
											src={`https://img.icons8.com/clouds/42/000000/sunrise.png`}
											width={42}
											height={42}
											priority
										/>
									) : (
										<Image
											alt={`Toggle Theme Mode`}
											src={`https://img.icons8.com/clouds/42/000000/partly-cloudy-night.png`}
											width={42}
											height={42}
											priority
										/>
									)}
								</div>
							)}
						</button>
					</div>
				</nav>
			</div>

			<main
				id="skip"
				className="flex flex-col justify-center bg-gray-50 px-8 dark:bg-gray-900"
			>
				{children}
				<Footer />
			</main>
		</div>
	)
}
