import { useTranslations } from 'next-intl'
import ProjectCard from '@/components/ui/ProjectCard'
import ProjectCarousel from '@/components/ui/ProjectCarousel'
import { projects } from '@/lib/projects'

export default function Projects() {
	const t = useTranslations('projects')

	// Featured: the one that runs the whole stack in production. The rest scroll.
	const [featured, ...rest] = projects

	return (
		<section className="px-4 py-14 md:px-6 md:py-20" id="projects">
			<div className="mx-auto max-w-5xl">
				<h2 className="text-terminal-text mb-3 font-sans text-2xl font-semibold tracking-tight md:text-3xl">
					{t('title')}
				</h2>
				<p className="text-terminal-comment mb-10 max-w-[60ch] font-sans text-sm">
					{t('intro')}
				</p>

				<div className="mb-8">
					<ProjectCard project={featured} variant="featured" priority />
				</div>

				<ProjectCarousel count={projects.length}>
					{rest.map((project) => (
						<ProjectCard key={project.key} project={project} />
					))}
				</ProjectCarousel>
			</div>
		</section>
	)
}
