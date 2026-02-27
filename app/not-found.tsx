import Link from 'next/link'
import '@/app/globals.css'

// Root-level 404 — must include html/body since root layout passes children through
export default function NotFound() {
	return (
		<html lang="en" className="dark">
			<body className="bg-terminal-bg text-terminal-text antialiased">
				<div className="flex min-h-screen items-center justify-center">
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
									cd ~
								</p>
							</div>
							<div className="mt-8">
								<Link
									href="/en"
									className="border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-bg inline-flex items-center gap-2 rounded border px-4 py-2 text-sm transition-colors"
								>
									<span>~/</span>
									<span>Go Home</span>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</body>
		</html>
	)
}
