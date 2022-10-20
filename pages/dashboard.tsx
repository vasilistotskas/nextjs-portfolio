import Container from 'components/Container'
import GitHub from 'components/metrics/Github'
import Unsplash from 'components/metrics/Unsplash'
import YouTube from 'components/metrics/Youtube'
import TopTracks from 'components/TopTracks'
import Image from 'next/future/image'
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
				<div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
					<h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
						{t('title', { ns: 'dashboard' })}
					</h1>
					<div className="mb-8">
						<p className="text-gray-600 dark:text-gray-400 mb-4">
							{t('description', { ns: 'dashboard' })}
						</p>
					</div>
					<div className="flex flex-col w-full">
						<Unsplash />
						<YouTube />
					</div>
					<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
						<GitHub />
					</div>
					<h2 className="flex items-center gap-2 font-bold text-3xl tracking-tight mb-4 mt-16 text-black dark:text-white">
						<Image
							alt={`Spotify`}
							src={`https://img.icons8.com/plasticine/60/000000/spotify--v1.png`}
							width={60}
							height={60}
							priority
						/>
						{t('tracks.top', { ns: 'dashboard' })}
					</h2>
					<p className="text-gray-600 dark:text-gray-400 mb-4">
						{t('tracks.description', { ns: 'dashboard' })}
					</p>
					<TopTracks />
				</div>
			</Container>
		)
}

export const getStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale, ['common', 'dashboard']))
	}
})
