import React, { Suspense } from 'react'
import Image from 'next/image'
import Container from '@components/Container'
import JobCard from '@components/utils/JobCard'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Home = () => {
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
				<Container>
					<div className="mx-auto flex max-w-2xl flex-col items-start justify-center border-gray-200 pb-10 dark:border-gray-700">
						<div className="grid grid-cols-1 items-start gap-4 md:grid-cols-1fr-auto md:gap-1">
							<div className="flex flex-col">
								<h1 className="mb-1 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
									{t('myName', { ns: 'common' })}
								</h1>
								<h2 className="mb-4 text-gray-700 dark:text-gray-200">
									{t('subtitle', { ns: 'index' })}{' '}
									<span className="font-semibold">
										{t('myWorkCompany', { ns: 'common' })}
									</span>
								</h2>
								<p className="mb-1 flex items-center gap-2 text-gray-600 dark:text-gray-400">
									<Image
										alt={`Experience`}
										src={`https://img.icons8.com/clouds/46/000000/module.png`}
										width={92 / 2}
										height={92 / 2}
										priority
									/>
									<span>{t('description', { ns: 'index' })}</span>
								</p>
								<p className="mb-1 flex items-center gap-2 text-gray-600 dark:text-gray-400">
									<Image
										alt={`Programming Skills`}
										src={`https://img.icons8.com/clouds/46/000000/console.png`}
										width={92 / 2}
										height={92 / 2}
										priority
									/>
									<span>{t('programming.experience', { ns: 'index' })}</span>
								</p>
								<p className="mb-1 flex items-center gap-2 text-gray-600 dark:text-gray-400">
									<Image
										alt={`Project Management, Testing`}
										src={'https://img.icons8.com/clouds/46/000000/test-passed.png'}
										width={46}
										height={46}
										priority
									/>
									<span>
										{t('projectManagement.experience', {
											ns: 'index'
										})}
									</span>
								</p>
							</div>
							<div className="relative mr-auto grid w-full items-center justify-items-center">
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
						<p className="mb-4 text-gray-600 dark:text-gray-400">
							{t('work.experience', { ns: 'index' })}
						</p>
						<JobCard
							index="Present"
							period="Jan 2021"
							title="Full Stack Developer, Advisable - Full Time"
						/>
						<JobCard
							index="6 mos"
							period="Jul 2020 - Dec 2020"
							title="Internship, Advisable - Full Time"
						/>
						<span className="h-16" />
					</div>
				</Container>
			</Suspense>
		)
}

export const getStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale, ['common', 'index']))
	}
})

export default Home
