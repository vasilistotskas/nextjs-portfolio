import Image from 'next/image'

export default function BrowserFrame({
	host,
	src,
	alt = '',
	sizes,
	priority
}: {
	host: string
	src: string
	alt?: string
	sizes: string
	priority?: boolean
}) {
	return (
		<div className="terminal-border overflow-hidden rounded-lg">
			<div className="bg-terminal-surface/60 flex items-center gap-2 px-3 py-2">
				<div className="flex gap-1.5">
					<span className="bg-terminal-border h-2 w-2 rounded-full" />
					<span className="bg-terminal-border h-2 w-2 rounded-full" />
					<span className="bg-terminal-border h-2 w-2 rounded-full" />
				</div>
				<div className="bg-terminal-bg/60 border-terminal-border min-w-0 flex-1 rounded-sm border px-2 py-0.5">
					<span className="text-terminal-muted block truncate font-mono text-[10px]">
						{host}
					</span>
				</div>
			</div>
			<div className="border-terminal-border relative aspect-[16/10] border-t">
				<Image
					src={src}
					alt={alt}
					fill
					priority={priority}
					className="object-cover object-top"
					sizes={sizes}
				/>
			</div>
		</div>
	)
}
