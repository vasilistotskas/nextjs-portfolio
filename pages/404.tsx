import Link from 'next/link'

import Container from '@components/Container'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export default function NotFound() {
	const { t } = useTranslation('404')

	return (
		<Container title="404 – Vasilis Totskas">
			<div className="mx-auto mb-16 flex max-w-2xl flex-col items-start justify-center">
				<h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
					{t('title')}
				</h1>
				<p className="mb-8 text-gray-600 dark:text-gray-400">{t('description')}</p>
				<Link className="grid w-full items-center justify-center" href="/">
					<p className="mx-auto w-64 rounded-md bg-gray-200 p-1 text-center font-bold text-black dark:bg-gray-800 dark:text-white sm:p-4">
						{t('returnHome')}
					</p>
				</Link>
			</div>
		</Container>
	)
}

export const getStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale, ['common', '404']))
	}
})
