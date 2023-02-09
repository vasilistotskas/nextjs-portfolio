'use client'
import Link from 'next/link'

import NowPlaying from '@app/[lng]/components/utils/NowPlaying'
import SectionSeparator from '@app/[lng]/components/utils/SectionSeparator'
import { useTranslation } from '@app/i18n/client'

const ExternalLink = ({ href, children }) => (
	<a
		className="text-gray-500 transition hover:text-gray-600 dark:text-gray-400"
		target="_blank"
		rel="noopener noreferrer"
		href={href}
	>
		{children}
	</a>
)

export default function Footer() {
	const { t } = useTranslation('en', ['common'])

	return (
		<footer className="mx-auto mb-8 flex w-full max-w-2xl flex-col items-start justify-center">
			<SectionSeparator />
			<NowPlaying />
			<div className="grid w-full max-w-2xl grid-cols-1 gap-4 pb-16 sm:grid-cols-3">
				<div className="flex flex-col space-y-4">
					<Link href="/">
						<p className="text-gray-500 transition hover:text-gray-600 dark:text-gray-400">
							{t('pages.home', { ns: 'common' })}
						</p>
					</Link>
					<Link href="/about">
						<p className="text-gray-500 transition hover:text-gray-600 dark:text-gray-400">
							{t('pages.about', { ns: 'common' })}
						</p>
					</Link>
				</div>
				<div className="flex flex-col space-y-4">
					<ExternalLink href={process.env.NEXT_PUBLIC_TWITTER_URL}>
						{t('twitter', { ns: 'common' })}
					</ExternalLink>
					<ExternalLink href={process.env.NEXT_PUBLIC_GITHUB_URL}>
						{t('github', { ns: 'common' })}
					</ExternalLink>
					<ExternalLink href={process.env.NEXT_PUBLIC_YOUTUBE_URL}>
						{t('youtube', { ns: 'common' })}
					</ExternalLink>
				</div>
				<div className="flex flex-col space-y-4">
					<Link href="/uses">
						<p className="text-gray-500 transition hover:text-gray-600 dark:text-gray-400">
							{t('pages.uses', { ns: 'common' })}
						</p>
					</Link>
					<Link href="/guestbook">
						<p className="text-gray-500 transition hover:text-gray-600 dark:text-gray-400">
							{t('pages.guestbook', { ns: 'common' })}
						</p>
					</Link>
				</div>
			</div>
		</footer>
	)
}
