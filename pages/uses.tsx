import Container from 'components/Container'
import Image from 'next/future/image'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export default function Uses() {
	const { t, ready } = useTranslation(['common', 'uses'])

	if (ready)
		return (
			<Container
				title={t('container.title', { ns: 'uses' })}
				description={t('container.description', { ns: 'uses' })}
			>
				<article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
					<h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
						{t('myGear.title', { ns: 'uses' })}
					</h1>
					<p className="text-gray-700 dark:text-gray-300 mt-2 mb-8">
						{t('myGear.description', { ns: 'uses' })}
					</p>
					<Image
						className="rounded-lg"
						alt={`My computer desk`}
						src={`/static/images/setup.png`}
						width={2164 / 2}
						height={1546 / 2}
						priority
					/>
					<div className="prose dark:prose-dark w-full">
						<h2 id="computer-office">
							{t('myGear.computerOffice', { ns: 'uses' })}
						</h2>
						<ul>
							<li>{t('myGear.processor', { ns: 'uses' })}</li>
							<li>{t('myGear.ram', { ns: 'uses' })}</li>
							<li>{t('myGear.storage.ssd', { ns: 'uses' })}</li>
							<li>{t('myGear.graphics', { ns: 'uses' })}</li>
							<li>{t('myGear.monitor', { ns: 'uses' })}</li>
							<li>{t('myGear.mouse', { ns: 'uses' })}</li>
							<li>{t('myGear.keyboard', { ns: 'uses' })}</li>
							<li>{t('myGear.speakers', { ns: 'uses' })}</li>
							<li>{t('myGear.chair', { ns: 'uses' })}</li>
						</ul>
						<h2 id="coding">{t('coding.title', { ns: 'uses' })}</h2>
						<ul>
							<li>{t('coding.editor', { ns: 'uses' })}</li>
							<li>{t('coding.terminal', { ns: 'uses' })}</li>
						</ul>
						<h2 id="software">{t('software.title', { ns: 'uses' })}</h2>
						<ul>
							<li>{t('software.jetBrainsStudio', { ns: 'uses' })}</li>
							<li>{t('software.sourceTree', { ns: 'uses' })}</li>
							<li>{t('software.docker', { ns: 'uses' })}</li>
							<li>{t('software.wampServer', { ns: 'uses' })}</li>
							<li>{t('software.heidisql', { ns: 'uses' })}</li>
							<li>{t('software.WinSCP', { ns: 'uses' })}</li>
							<li>{t('software.Notepad', { ns: 'uses' })}</li>
						</ul>
					</div>
				</article>
			</Container>
		)
}

export const getStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale, ['common', 'uses']))
	}
})
