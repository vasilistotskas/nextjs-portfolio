import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { GithubIcon, LinkedinIcon, XIcon } from '@/components/ui/BrandIcons'
import NowPlaying from '@/components/ui/NowPlaying'

const socialLinks = [
	{ href: 'https://github.com/vasilistotskas', icon: GithubIcon, label: 'GitHub' },
	{
		href: 'https://linkedin.com/in/vasilistotskas',
		icon: LinkedinIcon,
		label: 'LinkedIn'
	},
	{ href: 'https://x.com/vasilis_totskas', icon: XIcon, label: 'X' }
]

export default function Footer() {
	const t = useTranslations('footer')
	const tc = useTranslations('common')
	const year = new Date().getFullYear()

	return (
		<footer className="bg-terminal-bg relative mt-8">
			<div className="section-divider" />

			<div className="mx-auto max-w-5xl px-4 py-8 md:px-6">
				<div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
					<NowPlaying />

					<div className="flex items-center gap-5">
						{socialLinks.map(({ href, icon: Icon, label }) => (
							<a
								key={label}
								href={href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={label}
								className="text-terminal-comment hover:text-terminal-green transition-colors duration-200"
							>
								<Icon size={18} />
							</a>
						))}
					</div>

					<p className="text-terminal-muted font-mono text-xs">
						<Link
							href="https://github.com/vasilistotskas/nextjs-portfolio"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-terminal-green transition-colors"
						>
							{t('source')}
						</Link>
						{'. '}
						{t('copyright', { year, name: tc('myName') })}
					</p>
				</div>
			</div>
		</footer>
	)
}
