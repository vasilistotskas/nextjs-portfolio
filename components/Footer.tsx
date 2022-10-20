import Link from 'next/link'

import NowPlaying from 'components/NowPlaying'
import { useTranslation } from 'next-i18next'

const ExternalLink = ({ href, children }) => (
	<a
		className="text-gray-500 dark:text-gray-400 hover:text-gray-600 transition"
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
		<footer className="flex flex-col justify-center items-start max-w-2xl mx-auto w-full mb-8">
			<hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
			<NowPlaying />
			<div className="w-full max-w-2xl grid grid-cols-1 gap-4 pb-16 sm:grid-cols-3">
				<div className="flex flex-col space-y-4">
					<Link href="/">
						<a className="text-gray-500 dark:text-gray-400 hover:text-gray-600 transition">
							{t('pages.home', { ns: 'common' })}
						</a>
					</Link>
					<Link href="/about">
						<a className="text-gray-500 dark:text-gray-400 hover:text-gray-600 transition">
							{t('pages.about', { ns: 'common' })}
						</a>
					</Link>
				</div>
				<div className="flex flex-col space-y-4">
					<ExternalLink href="https://twitter.com/vasilistotskas">
						{t('twitter', { ns: 'common' })}
					</ExternalLink>
					<ExternalLink href="https://github.com/vasilistotskas">
						{t('github', { ns: 'common' })}
					</ExternalLink>
					<ExternalLink href="https://www.youtube.com/channel/UCO3k4jsz6awlr6TpQHncVYQ">
						{t('youtube', { ns: 'common' })}
					</ExternalLink>
				</div>
				<div className="flex flex-col space-y-4">
					<Link href="/uses">
						<a className="text-gray-500 dark:text-gray-400 hover:text-gray-600 transition">
							{t('pages.uses', { ns: 'common' })}
						</a>
					</Link>
					<Link href="/guestbook">
						<a className="text-gray-500 dark:text-gray-400 hover:text-gray-600 transition">
							{t('pages.guestbook', { ns: 'common' })}
						</a>
					</Link>
				</div>
			</div>
		</footer>
	)
}
