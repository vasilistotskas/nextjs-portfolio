import { cn } from '@/lib/utils'

type BadgeProps = {
	children: React.ReactNode
	variant?: 'green' | 'cyan' | 'yellow' | 'purple' | 'default'
	className?: string
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
	const isAccent = variant === 'green' || variant === 'cyan'
	return (
		<span
			className={cn(
				'inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[11px] leading-tight font-medium tracking-wide',
				isAccent
					? 'border-terminal-green/20 bg-terminal-green/8 text-terminal-green'
					: 'border-terminal-border bg-terminal-surface/50 text-terminal-muted',
				className
			)}
		>
			{children}
		</span>
	)
}
