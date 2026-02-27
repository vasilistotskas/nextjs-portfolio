import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function NotFound() {
	const t = useTranslations('notFound')

	return (
		<div className="flex min-h-[80vh] items-center justify-center">
			<div className="w-full max-w-lg px-6 font-mono">
				<div className="terminal-border bg-terminal-surface rounded-lg p-8">
					<div className="mb-4 flex gap-2">
						<span className="bg-dot-red h-3 w-3 rounded-full" />
						<span className="bg-dot-yellow h-3 w-3 rounded-full" />
						<span className="bg-dot-green h-3 w-3 rounded-full" />
					</div>
					<div className="space-y-2 text-sm">
						<p className="text-terminal-comment">
							<span className="text-terminal-prompt">$ </span>
							cd /page-you-requested
						</p>
						<p className="text-terminal-prompt">
							bash: cd: /page-you-requested: No such file or directory
						</p>
						<p className="text-terminal-comment">
							<span className="text-terminal-prompt">$ </span>
							echo $?
						</p>
						<p className="text-terminal-green">404</p>
						<p className="text-terminal-comment mt-4">
							<span className="text-terminal-prompt">$ </span>
							ls /pages/
						</p>
						<p className="text-terminal-cyan">home/ about/ contact/</p>
						<p className="text-terminal-comment mt-4">
							<span className="text-terminal-prompt">$ </span>
							{t('prompt')}
						</p>
					</div>
					<p className="text-terminal-muted mt-4 text-sm">{t('message')}</p>
					<div className="mt-6">
						<Link
							href="/"
							className="border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-bg inline-flex items-center gap-2 rounded border px-4 py-2 text-sm transition-colors"
						>
							<span>~/</span>
							<span>{t('back')}</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
