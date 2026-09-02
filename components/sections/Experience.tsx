import { useTranslations } from 'next-intl'

const experienceKeys = ['advisable', 'freelance'] as const

export default function Experience() {
	const t = useTranslations('experience')

	return (
		<section className="px-4 py-14 md:px-6 md:py-20" id="experience">
			<div className="mx-auto max-w-5xl">
				<h2 className="text-terminal-text mb-10 font-sans text-2xl font-semibold tracking-tight md:text-3xl">
					{t('title')}
				</h2>

				{/* A timeline, because the content genuinely is a sequence. */}
				<ol className="relative m-0 list-none space-y-6 p-0 pl-8">
					<div
						aria-hidden="true"
						className="absolute top-1 left-0 h-full w-px"
						style={{
							background:
								'linear-gradient(to bottom, var(--green), color-mix(in srgb, var(--green) 15%, transparent))'
						}}
					/>

					{experienceKeys.map((key) => (
						<li key={key} className="relative">
							<span
								aria-hidden="true"
								className="border-terminal-green bg-terminal-bg absolute top-5 -left-[2.05rem] h-2.5 w-2.5 rounded-full border-2"
							/>
							<div className="glass terminal-border card-hover rounded-lg p-5">
								<p className="text-terminal-muted mb-3 font-mono text-xs">
									{t(`items.${key}.period`)}
								</p>
								<h3 className="text-terminal-text mb-1 font-sans text-lg font-semibold">
									{t(`items.${key}.role`)}
								</h3>
								<p className="text-terminal-green mb-3 font-mono text-sm">
									{t(`items.${key}.company`)}
								</p>
								<p className="text-terminal-comment font-sans text-sm leading-relaxed">
									{t(`items.${key}.description`)}
								</p>
							</div>
						</li>
					))}
				</ol>
			</div>
		</section>
	)
}
