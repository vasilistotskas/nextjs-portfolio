import { cn } from '@/lib/utils'

type BadgeProps = {
	children: React.ReactNode
	variant?: 'green' | 'cyan' | 'yellow' | 'purple' | 'default'
	className?: string
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
	return (
		<span
			className={cn(
				'inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-[11px] leading-tight font-medium tracking-wide',
				{
					'border-terminal-green/25 bg-terminal-green/8 text-terminal-green border':
						variant === 'green',
					'border-terminal-cyan/25 bg-terminal-cyan/8 text-terminal-cyan border':
						variant === 'cyan',
					'border-terminal-yellow/25 bg-terminal-yellow/8 text-terminal-yellow border':
						variant === 'yellow',
					'border-terminal-purple/25 bg-terminal-purple/8 text-terminal-purple border':
						variant === 'purple',
					'border-terminal-border bg-terminal-bg/50 text-terminal-comment border':
						variant === 'default'
				},
				className
			)}
		>
			{children}
		</span>
	)
}
