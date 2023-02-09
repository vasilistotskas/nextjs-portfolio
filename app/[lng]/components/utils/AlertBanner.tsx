import Link from 'next/link'
import Container from '@app/[lng]/components/Container'
import { useTranslation } from '@app/i18n/client'

export default function Alert({
	preview,
	loading
}: {
	preview?: boolean
	loading?: boolean
}) {
	const { t } = useTranslation('en', ['common'])

	if (!preview) return null
	const loadingText = loading
		? t('loading', { ns: 'common' })
		: 'This page is a preview. '

	return (
		<div className="border-accent-7 bg-accent-7 border-b text-white">
			<Container>
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
			</Container>
		</div>
	)
}
