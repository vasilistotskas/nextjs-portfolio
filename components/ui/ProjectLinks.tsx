import { useTranslations } from 'next-intl'
import { BookOpen, ExternalLink } from 'lucide-react'
import { GithubIcon } from '@/components/ui/BrandIcons'
import type { Project } from '@/lib/projects'
import { siteUrl } from '@/lib/seo'

const linkClass =
	'text-terminal-muted hover:text-terminal-green flex items-center gap-1.5 font-mono text-xs transition-colors'

/** The project's outbound links: live site, docs and repositories. */
export default function ProjectLinks({ project }: { project: Project }) {
	const t = useTranslations('projects')
	// No link to the site the visitor is already on.
	const isThisSite = new URL(project.live).host === new URL(siteUrl).host

	return (
		<>
			{!isThisSite && (
				<a
					href={project.live}
					target="_blank"
					rel="noopener noreferrer"
					className={linkClass}
				>
					<ExternalLink size={12} />
					{t('viewDemo')}
				</a>
			)}
			{project.docs && (
				<a
					href={project.docs}
					target="_blank"
					rel="noopener noreferrer"
					className={linkClass}
				>
					<BookOpen size={12} />
					{t('docs')}
				</a>
			)}
			{project.repos.map((repo) => (
				<a
					key={repo.url}
					href={repo.url}
					target="_blank"
					rel="noopener noreferrer"
					className={linkClass}
				>
					<GithubIcon size={12} />
					{repo.label}
				</a>
			))}
		</>
	)
}
