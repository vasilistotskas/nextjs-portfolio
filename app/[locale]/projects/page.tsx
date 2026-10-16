import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import ProjectCard from '@/components/ui/ProjectCard'
import { projects } from '@/lib/projects'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('projects')

	return buildPageMetadata({
		path: '/projects',
		title: t('title'),
		description: t('metaDescription')
	})
}

export default function ProjectsPage() {
	const t = useTranslations('projects')

	return (
		<div className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-20">
			<h1 className="text-terminal-text font-sans text-3xl font-semibold tracking-tight md:text-4xl">
				{t('title')}
			</h1>
			<p className="text-terminal-comment mt-4 mb-10 max-w-[60ch] font-sans text-base">
				{t('intro')}
			</p>

			<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
				{projects.map((project) => (
					<ProjectCard key={project.key} project={project} />
				))}
			</div>
		</div>
	)
}
