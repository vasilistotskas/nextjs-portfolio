import Image from 'next/image'

export default function MetricCard({ header, link, metric, isCurrency, image }) {
	return (
		<div className="metric-card bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 max-w-72 w-full">
			<a
				className="flex items-center gap-2"
				aria-label={header}
				target="_blank"
				rel="noopener noreferrer"
				href={link}
			>
				<Image alt={`MetricCard`} src={image} width={56} height={56} priority />
				<div className="flex items-center text-gray-900 dark:text-gray-100">
					{header}
					<svg
						className="h-4 w-4 ml-1"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
						/>
					</svg>
				</div>
			</a>
			<p className="mt-2 text-3xl font-bold spacing-sm text-black dark:text-white">
				{metric > 0 && isCurrency && '$'}
				{metric > 0 ? metric.toLocaleString() : '-'}
			</p>
		</div>
	)
}
