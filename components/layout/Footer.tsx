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
	const year = new Date().getFullYear()

	return (
		<footer className="bg-terminal-bg relative">
			{/* Gradient top line */}
			<div className="section-divider" />

			<div className="mx-auto max-w-5xl px-6 py-8">
				<div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
					{/* Now Playing */}
					<NowPlaying />

					{/* Social links */}
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

					{/* Copyright */}
					<div className="text-terminal-comment flex items-center gap-2 font-mono text-xs">
						<Link
							href="https://github.com/vasilistotskas/nextjs-portfolio"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-terminal-green transition-colors"
						>
							{t('source')}
						</Link>
						<span>·</span>
						<span>
							© {year} vasilistotskas · {t('copyright')}
						</span>
					</div>
				</div>
			</div>
		</footer>
	)
}
