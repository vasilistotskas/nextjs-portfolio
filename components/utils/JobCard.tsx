export default function JobCard({ period, title, index }) {
	return (
		<div className="w-full" aria-label={title}>
			<div className="w-full transform border-b border-gray-200 py-3 transition-all hover:scale-[1.01] dark:border-gray-700">
				<div className="grid grid-cols-auto-auto items-center md:grid-cols-auto-1fr-third_fr ">
					<div className="w-32 text-left text-sm text-gray-500 dark:text-gray-400 sm:text-lg">
						{index}
					</div>
					<h4 className="col-two-third-column row-one-third-row grid w-full justify-items-start text-center text-sm font-medium text-gray-800 dark:text-gray-100 sm:col-auto sm:row-auto sm:text-lg">
						{title}
					</h4>
					<div className="grid justify-items-start md:justify-items-end">
						<p className="mr-0 ml-0 text-xs text-gray-500 dark:text-gray-400 md:mb-0">
							{period}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
