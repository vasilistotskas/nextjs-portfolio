import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type CardProps = {
	children: ReactNode
	className?: string
	hover?: boolean
}

export default function Card({ children, className, hover = true }: CardProps) {
	return (
		<div
			className={cn(
				'terminal-border bg-terminal-surface rounded-lg p-6',
				hover && 'card-hover',
				className
			)}
		>
			{children}
		</div>
	)
}
