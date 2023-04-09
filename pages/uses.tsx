import Container from '@components/Container'
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
				<article className="mx-auto mb-16 flex w-full max-w-2xl flex-col items-start justify-center">
					<h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
						{t('myGear.title', { ns: 'uses' })}
					</h1>
					<p className="mb-8 mt-2 text-gray-700 dark:text-gray-300">
						{t('myGear.description', { ns: 'uses' })}
					</p>
					<div className="prose w-full dark:prose-dark">
						<h2 id="computer-office">{t('myGear.computerOffice', { ns: 'uses' })}</h2>
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
