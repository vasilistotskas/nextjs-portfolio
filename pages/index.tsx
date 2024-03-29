import React, { Suspense } from 'react'
import Image from 'next/image'
import Container from '@components/Container'
import ReadMore from '@components/utils/ReadMore'
import JobCard from '@components/utils/JobCard'
import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Home = ({ title, description, image }) => {
	const { t, ready } = useTranslation(['common', 'index'])

	if (ready)
		return (
			<Suspense
				fallback={
					<div className="grid min-h-screen items-center justify-center text-2xl font-bold text-gray-400">
						{t('loading', { ns: 'common' })}
					</div>
				}
			>
				<Container title={title} description={description} image={image}>
					<section>
						<div className="mx-auto flex max-w-2xl flex-col items-start justify-center border-gray-200 dark:border-gray-700">
							<div className="grid grid-cols-1 items-start gap-4 md:grid-cols-1fr-auto md:gap-1">
								<div className="flex flex-col gap-2">
									<h1 className="mb-1 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
										{t('myName', { ns: 'common' })}
									</h1>
									<h2 className="mb-4 text-gray-700 dark:text-gray-200">
										{t('subtitle', { ns: 'index' })}{' '}
										<span className="font-semibold">
											{t('myWorkCompany', { ns: 'common' })}
										</span>
									</h2>
									<div className="mb-1 grid grid-cols-auto-1fr items-center gap-2 text-gray-600 dark:text-gray-400">
										<Image
											alt={`Experience`}
											src={`https://img.icons8.com/clouds/46/000000/module.png`}
											width={92 / 2}
											height={92 / 2}
											priority
										/>
										<p className="font-bold">{t('experience.text', { ns: 'index' })}</p>
										<ReadMore
											text={t('experience.description', { ns: 'index' })}
										></ReadMore>
									</div>
									<div className="mb-1 grid grid-cols-auto-1fr items-center gap-2 text-gray-600 dark:text-gray-400">
										<Image
											alt={`Programming Skills`}
											src={`https://img.icons8.com/clouds/46/000000/console.png`}
											width={92 / 2}
											height={92 / 2}
											priority
										/>
										<p className="font-bold">{t('programming.text', { ns: 'index' })}</p>
										<ReadMore
											text={t('programming.description', { ns: 'index' })}
										></ReadMore>
									</div>
									<div className="mb-1 grid grid-cols-auto-1fr items-center gap-2 text-gray-600 dark:text-gray-400">
										<Image
											alt={`Project Management, Testing`}
											src={'https://img.icons8.com/clouds/46/000000/test-passed.png'}
											width={46}
											height={46}
											priority
										/>
										<p className="font-bold">
											{t('projectManagement.text', { ns: 'index' })}
										</p>
										<ReadMore
											text={t('projectManagement.description', { ns: 'index' })}
										></ReadMore>
									</div>
								</div>
								<div className="relative row-start-1 mr-auto grid w-full items-center justify-items-center md:row-auto">
									<Image
										alt={'Vasilis Totskas'}
										height={100}
										width={150}
										src="/avatar.jpg"
										sizes="30vw"
										priority
										className="rounded-full grayscale filter"
									/>
								</div>
							</div>

							<h3 className="mb-4 mt-16 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
								{t('work.title', { ns: 'index' })}
							</h3>
							<div className="mb-4 text-gray-600 dark:text-gray-400">
								<Trans
									i18nKey="index:work.experience"
									components={{
										0: <strong />,
										1: <strong />,
										2: <strong />,
										3: <strong />,
										4: <strong />,
										5: <strong />,
										6: <strong />,
										7: <strong />,
										8: <strong />
									}}
								/>
							</div>
							<JobCard
								index="Present"
								period="Jan 2022"
								title="Full Stack Developer, Advisable - Full Time"
							/>
							<JobCard
								index="Jan 2022"
								period="Jan 2021"
								title="Frontend Developer, Fedra - Full Time"
							/>
							<JobCard
								index="6 mos"
								period="Jul 2020 - Dec 2020"
								title="Internship, Advisable - Full Time"
							/>
							<span className="h-16" />
						</div>
					</section>
				</Container>
			</Suspense>
		)
}

export const getStaticProps = async ({ locale }) => ({
	props: {
		title: process.env.NEXT_SETTINGS_TITLE || null,
		description: process.env.NEXT_SETTINGS_DESCRIPTION || null,
		image: process.env.NEXT_SETTINGS_IMG_URL || null,
		...(await serverSideTranslations(locale, ['common', 'index']))
	}
})

export default Home
