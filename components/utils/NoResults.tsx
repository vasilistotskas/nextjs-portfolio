export default function NoResults({ text }: { text: string }) {
	return (
		<div className="mx-auto my-4 mb-16 flex w-full max-w-2xl flex-col items-start justify-center rounded border border-blue-200 bg-gray-100 p-16 text-black dark:border-gray-800 dark:bg-gray-900 dark:text-white">
			<h1 className="text-center text-4xl font-bold">{text}</h1>
		</div>
	)
}
