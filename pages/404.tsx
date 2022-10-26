import Link from 'next/link'

import Container from 'components/Container'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export default function NotFound() {
	const { t } = useTranslation('404')

	return (
		<Container title="404 – Vasilis Totskas">
			<div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
				<h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
					{t('title')}
				</h1>
				<p className="text-gray-600 dark:text-gray-400 mb-8">{t('description')}</p>
				<Link href="/">
					<p className="p-1 sm:p-4 w-64 font-bold mx-auto bg-gray-200 dark:bg-gray-800 text-center rounded-md text-black dark:text-white">
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
