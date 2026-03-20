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
				'glass terminal-border noise-overlay relative overflow-hidden rounded-lg',
				'shadow-sm',
				className
			)}
		>
			{/* Title bar */}
			<div className="flex items-center gap-3 border-b border-[--glass-border] bg-[--glass-bg] px-4 py-2.5">
				<div className="flex gap-1.5">
					<span className="bg-terminal-green/25 h-2.5 w-2.5 rounded-full" />
					<span className="bg-terminal-green/15 h-2.5 w-2.5 rounded-full" />
					<span className="bg-terminal-green/15 h-2.5 w-2.5 rounded-full" />
				</div>
				<span className="text-terminal-muted flex-1 text-center font-mono text-[11px]">
					{title}
				</span>
			</div>

			{/* Content */}
			<div className="p-5 font-mono text-sm">{children}</div>
		</div>
	)
}
