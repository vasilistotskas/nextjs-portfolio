import { PortableText } from '@portabletext/react'
import Link from 'next/link'

export default function BlogHeader({
	title,
	description,
	level
}: {
	title: string
	description?: any[]
	level: 1 | 2
}) {
	switch (level) {
		case 1:
			return (
				<header className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
					<h1 className="mb-4">{title}</h1>
					<h2 className="text-xl font-bold text-gray-600 dark:text-gray-400">
						<PortableText value={description} />
					</h2>
				</header>
			)

		case 2:
			return (
				<header className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
					<h2 className="text-xl font-bold text-gray-600 dark:text-gray-400">
						<Link href="/" className="hover:underline" title={title}>
							{title}
						</Link>
					</h2>
				</header>
			)

		default:
			throw new Error(
				`Invalid level: ${JSON.stringify(level) || typeof level}, only 1 or 2 are allowed`
			)
	}
}
