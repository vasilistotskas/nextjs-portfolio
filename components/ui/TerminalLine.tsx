import { cn } from '@/lib/utils'

type TerminalLineProps = {
	prompt?: string
	command?: string
	output?: string
	className?: string
	variant?: 'command' | 'output' | 'comment' | 'error' | 'success'
}

export default function TerminalLine({
	prompt = '$',
	command,
	output,
	className,
	variant = 'command'
}: TerminalLineProps) {
	if (output !== undefined) {
		return (
			<p
				className={cn(
					'font-mono text-sm',
					{
						'text-terminal-text': variant === 'output',
						'text-terminal-comment': variant === 'comment',
						'text-terminal-prompt': variant === 'error',
						'text-terminal-green': variant === 'success'
					},
					className
				)}
			>
				{output}
			</p>
		)
	}

	return (
		<p className={cn('font-mono text-sm', className)}>
			<span className="text-terminal-green">{prompt} </span>
			<span className="text-terminal-cyan">{command}</span>
		</p>
	)
}
