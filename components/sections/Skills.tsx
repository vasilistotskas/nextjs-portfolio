import { useTranslations } from 'next-intl'
import { skillGroups } from '@/lib/stack'

/**
 * Skills grouped by the same vocabulary as the hero map, so the two describe one
 * system rather than two. `daily` is a weight difference, not a second list.
 */
export default function Skills() {
	const t = useTranslations('skills')
	const ts = useTranslations('stack')

	return (
		<section className="px-4 py-14 md:px-6 md:py-20" id="skills">
			<div className="mx-auto max-w-5xl">
				<h2 className="text-terminal-text mb-3 font-sans text-2xl font-semibold tracking-tight md:text-3xl">
					{t('title')}
				</h2>
				<p className="text-terminal-comment mb-10 max-w-[60ch] font-sans text-sm">
					{t('intro')}
				</p>

				<div className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2">
					{skillGroups.map((group) => (
						<div key={group.key} className="min-w-0">
							<h3 className="text-terminal-text font-sans text-base font-semibold">
								{ts(`groups.${group.key}`)}
							</h3>
							<p className="text-terminal-muted mt-1 font-mono text-[11px]">
								{group.layers.map((layer) => ts(`layers.${layer}`)).join(' / ')}
							</p>
							<ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 p-0">
								{group.skills.map((skill) => (
									<li
										key={skill.name}
										className={
											skill.daily
												? 'text-terminal-text font-sans text-sm font-medium'
												: 'text-terminal-muted font-sans text-sm'
										}
									>
										{skill.name}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<p className="text-terminal-muted mt-10 font-sans text-xs">{t('legend')}</p>
			</div>
		</section>
	)
}
