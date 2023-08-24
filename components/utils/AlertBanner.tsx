import Link from 'next/link'
import { useTranslation } from 'next-i18next'

export default function Alert({
	preview,
	loading
}: {
	preview?: boolean
	loading?: boolean
}) {
	const { t } = useTranslation(['common'])

	if (!preview) return null
	const loadingText = loading
		? t('loading', { ns: 'common' })
		: 'This page is a preview. '

	return (
		<div className="border-accent-7 bg-accent-7 border-b text-white">
			<div className="py-2 text-center text-sm">
				{loadingText}
				<Link
					href="/api/exit-preview"
					className="hover:text-cyan underline transition-colors duration-200"
				>
					{t('click.here', { ns: 'common' })}
				</Link>{' '}
				{t('click.to_exit_preview', { ns: 'common' })}
			</div>
		</div>
	)
}
