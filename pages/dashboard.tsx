import Container from '@components/Container'
import GitHub from '@components/metrics/Github'
import Unsplash from '@components/metrics/Unsplash'
import YouTube from '@components/metrics/Youtube'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export default function Dashboard() {
	const { t, ready } = useTranslation(['common', 'dashboard'])

	if (ready)
		return (
			<Container
				title={t('container.title', { ns: 'dashboard' })}
				description={t('container.description', { ns: 'dashboard' })}
			>
				<div className="mx-auto mb-16 flex max-w-2xl flex-col items-start justify-center">
					<h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
						{t('title', { ns: 'dashboard' })}
					</h1>
					<div className="mb-8">
						<p className="mb-4 text-gray-600 dark:text-gray-400">
							{t('description', { ns: 'dashboard' })}
						</p>
					</div>
					<div className="flex w-full flex-col">
						<Unsplash />
						<YouTube />
					</div>
					<div className="my-2 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
						<GitHub />
					</div>
				</div>
			</Container>
		)
}

export const getStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale, ['common', 'dashboard']))
	}
})
