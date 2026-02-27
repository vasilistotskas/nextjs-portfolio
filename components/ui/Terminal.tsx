import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type TerminalProps = {
	title?: string
	children: ReactNode
	className?: string
}

export default function Terminal({ title = 'bash', children, className }: TerminalProps) {
	return (
		<div
			className={cn(
				'terminal-border bg-terminal-surface relative overflow-hidden rounded-lg',
				'shadow-sm transition-shadow duration-300',
				'hover:shadow-[0_0_0_1px_color-mix(in_srgb,var(--cyan)_20%,transparent),0_8px_30px_-8px_color-mix(in_srgb,var(--cyan)_12%,transparent)]',
				className
			)}
		>
			{/* Title bar */}
			<div className="border-terminal-border bg-terminal-bg/60 flex items-center gap-3 border-b px-4 py-2.5">
				<div className="flex gap-1.5">
					<span className="bg-dot-red h-2.5 w-2.5 rounded-full" />
					<span className="bg-dot-yellow h-2.5 w-2.5 rounded-full" />
					<span className="bg-dot-green h-2.5 w-2.5 rounded-full" />
				</div>
				<span className="text-terminal-muted flex-1 text-center font-mono text-[11px]">
					{title}
				</span>
			</div>

			{/* Content */}
			<div className="p-4 font-mono text-sm">{children}</div>

			{/* Subtle scanline sheen */}
			<div
				className="pointer-events-none absolute inset-0 rounded-lg opacity-[0.025]"
				aria-hidden="true"
				style={{
					backgroundImage:
						'repeating-linear-gradient(transparent, transparent 1px, rgba(0,0,0,0.8) 1px, rgba(0,0,0,0.8) 2px)'
				}}
			/>
		</div>
	)
}
