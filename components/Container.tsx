import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import NextLink from 'next/link'
import cn from 'classnames'

import Footer from 'components/Footer'
import MobileMenu from 'components/MobileMenu'
import ContactForm from 'components/ContactForm'
import LanguageSwitcher from './LanguageSwitcher'
import Image from 'next/image'

function NavItem({ href, text, ariaLabel }) {
	const router = useRouter()
	const isActive = router.asPath === href

	return (
		<NextLink href={href} aria-label={ariaLabel}>
			<p
				className={cn(
					isActive
						? 'font-semibold text-gray-800 dark:text-gray-200'
						: 'font-normal text-gray-600 dark:text-gray-400',
					'hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all'
				)}
			>
				<span className="capsize">{text}</span>
			</p>
		</NextLink>
	)
}

export default function Container(props) {
	const [mounted, setMounted] = useState(false)
	const { resolvedTheme, setTheme } = useTheme()

	// After mounting, we have access to the theme
	useEffect(() => setMounted(true), [])

	const { children, ...customMeta } = props
	const router = useRouter()
	const meta = {
		title: 'Vasilis Totskas – Developer, writer, creator.',
		description: `Front-end developer, JavaScript enthusiast, and course creator.`,
		image: 'https://vasilistotskas.com/static/images/vasilis-banner.jpg',
		type: 'website',
		...customMeta
	}

	return (
		<div className="bg-gray-50 dark:bg-gray-900 relative">
			<Head>
				<title>{meta.title}</title>
				<meta name="robots" content="follow, index" />
				<meta content={meta.description} name="description" />
				<meta property="og:url" content={`https://vasilistotskas.com${router.asPath}`} />
				<link rel="canonical" href={`https://vasilistotskas.com${router.asPath}`} />
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
			<div className="grid grid-cols-1 md:grid-cols-auto-1fr items-center justify-center px-8 pt-8 pb-8 sm:pb-16">
				<a
					className="hidden md:grid hover:transform hover:scale-110 transition-all"
					href={'https://github.com/vasilistotskas/'}
					target="_blank"
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
				<nav className="grid grid-cols-2 items-center w-full relative max-w-3xl border-gray-200 dark:border-gray-700 mx-auto text-gray-900 bg-gray-50  dark:bg-gray-900 bg-opacity-60 dark:text-gray-100">
					<a href="#skip" className="skip-nav" target="_blank" rel="noopener noreferrer">
						Skip to content
					</a>
					<div className="ml-[-0.60rem]">
						<MobileMenu />
						<NavItem href="/" text="Home" ariaLabel="Home" />
						<NavItem href="/guestbook" text="Guestbook" ariaLabel="Guestbook" />
						<NavItem href="/dashboard" text="Dashboard" ariaLabel="Dashboard" />
						<NavItem href="/about" text="About" ariaLabel="About" />
					</div>
					<div className="grid grid-cols-auto-auto">
						<LanguageSwitcher></LanguageSwitcher>
						<button
							aria-label="Toggle Dark Mode"
							type="button"
							className="w-12 h-12 flex items-center justify-center bg-transparent"
							onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
						>
							{mounted && (
								<div className="transform hover:scale-105 transition-all">
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
				className="flex flex-col justify-center px-8 bg-gray-50 dark:bg-gray-900"
			>
				{children}
				<ContactForm></ContactForm>
				<Footer />
			</main>
		</div>
	)
}
