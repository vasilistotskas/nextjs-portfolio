import Link from 'next/link'
import Container from '@components/Container'

export default function Alert({
	preview,
	loading
}: {
	preview?: boolean
	loading?: boolean
}) {
	if (!preview) return null

	return (
		<div className="border-accent-7 bg-accent-7 border-b text-white">
			<Container>
				<div className="py-2 text-center text-sm">
					{loading ? 'Loading... ' : 'This page is a preview. '}
					<Link
						href="/api/exit-preview"
						className="hover:text-cyan underline transition-colors duration-200"
					>
						Click here
					</Link>{' '}
					to exit preview mode.
				</div>
			</Container>
		</div>
	)
}
