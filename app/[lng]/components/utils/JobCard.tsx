export default function JobCard({ period, title, index }) {
	return (
		<div className="w-full" aria-label={title}>
			<div className="w-full transform border-b border-gray-200 py-3 transition-all hover:scale-[1.01] dark:border-gray-700">
				<div className="flex flex-col items-baseline justify-between sm:flex-row">
					<div className="flex items-center">
						<div className="w-32 text-left text-sm text-gray-500 dark:text-gray-400 sm:text-lg">
							{index}
						</div>
						<h4 className="w-full text-center text-sm font-medium text-gray-800 dark:text-gray-100 sm:text-lg">
							{title}
						</h4>
					</div>
					<div className="items-left mt-2 flex w-full justify-between sm:mt-0 sm:w-auto sm:items-center">
						<p className="mr-0 ml-0 w-32 text-left text-xs text-gray-500 dark:text-gray-400 sm:mr-2 sm:ml-10 sm:text-right md:mb-0">
							{period}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
