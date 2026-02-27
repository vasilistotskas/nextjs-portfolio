import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Github, Linkedin, Twitter } from 'lucide-react'
import NowPlaying from '@/components/ui/NowPlaying'

const socialLinks = [
	{ href: 'https://github.com/vasilistotskas', icon: Github, label: 'GitHub' },
	{ href: 'https://linkedin.com/in/vasilistotskas', icon: Linkedin, label: 'LinkedIn' },
	{ href: 'https://twitter.com/vasilistotskas', icon: Twitter, label: 'Twitter' }
]

export default function Footer() {
	const t = useTranslations('footer')
	const year = new Date().getFullYear()

	return (
		<footer className="relative bg-terminal-bg">
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
								className="text-terminal-comment hover:text-terminal-cyan transition-all duration-200 hover:scale-110"
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
							className="hover:text-terminal-cyan transition-colors"
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
