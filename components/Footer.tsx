import Link from 'next/link'
import NowPlaying from '@components/utils/NowPlaying'
import { useTranslation } from 'next-i18next'
import SectionSeparator from '@components/utils/SectionSeparator'

const ExternalLink = ({ href, children }) => (
	<a
		title={children}
		className="text-gray-500 transition hover:text-gray-600 dark:text-gray-400"
		target="_blank"
		rel="noopener noreferrer"
		href={href}
	>
		{children}
	</a>
)

export default function Footer() {
	const { t } = useTranslation(['common'])

	return (
		<footer className="mx-auto mb-8 flex w-full max-w-2xl flex-col items-start justify-center">
			<SectionSeparator />
			<NowPlaying />
			<div className="grid w-full max-w-2xl grid-cols-1 gap-4 pb-4 sm:grid-cols-3">
				<div className="flex flex-col space-y-4">
					<Link href="/" title={t('pages.home', { ns: 'common' }) || ''}>
						<p className="text-gray-500 transition hover:text-gray-600 dark:text-gray-400">
							{t('pages.home', { ns: 'common' })}
						</p>
					</Link>
					<Link href="/about" title={t('pages.about', { ns: 'common' }) || ''}>
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
					<Link href="/uses" title={t('pages.uses', { ns: 'common' }) || ''}>
						<p className="text-gray-500 transition hover:text-gray-600 dark:text-gray-400">
							{t('pages.uses', { ns: 'common' })}
						</p>
					</Link>
					<Link href="/guestbook" title={t('pages.guestbook', { ns: 'common' }) || ''}>
						<p className="text-gray-500 transition hover:text-gray-600 dark:text-gray-400">
							{t('pages.guestbook', { ns: 'common' })}
						</p>
					</Link>
				</div>
			</div>
		</footer>
	)
}
