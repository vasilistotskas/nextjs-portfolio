import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type CardProps = {
	children: ReactNode
	className?: string
	hover?: boolean
	accent?: boolean
}

export default function Card({ children, className, hover = true, accent = false }: CardProps) {
	return (
		<div
			className={cn(
				'terminal-border bg-terminal-surface rounded-lg p-3 md:p-6',
				hover && 'card-hover',
				accent && 'gradient-border-top',
				className
			)}
		>
			{children}
		</div>
	)
}
