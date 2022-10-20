import React, { Suspense } from 'react'
import Image from 'next/future/image'
import Container from '../components/Container'
import JobCard from '../components/JobCard'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Home = () => {
	const { t, ready } = useTranslation(['common', 'index'])

	if (ready)
		return (
			<Suspense fallback={null}>
				<Container>
					<div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-10">
						<div className="flex flex-col-reverse sm:flex-row items-start">
							<div className="flex flex-col pr-8">
								<h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white">
									{t('myName', { ns: 'common' })}
								</h1>
								<h2 className="text-gray-700 dark:text-gray-200 mb-4">
									{t('subtitle', { ns: 'index' })}{' '}
									<span className="font-semibold">
										{t('myWorkCompany', { ns: 'common' })}
									</span>
								</h2>
								<p className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
									<Image
										alt={`Experience`}
										src={`https://img.icons8.com/clouds/46/000000/module.png`}
										width={92 / 2}
										height={92 / 2}
										priority
									/>
									<span>{t('description', { ns: 'index' })}</span>
								</p>
								<p className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
									<Image
										alt={`Programming Skills`}
										src={`https://img.icons8.com/clouds/46/000000/console.png`}
										width={92 / 2}
										height={92 / 2}
										priority
									/>
									<span>
										{t('programming.experience', { ns: 'index' })}
									</span>
								</p>
								<p className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
									<Image
										alt={`Project Management, Testing`}
										src={
											'https://img.icons8.com/clouds/46/000000/test-passed.png'
										}
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
							<div className="w-[80px] sm:w-[176px] relative mb-8 sm:mb-0 mr-auto">
								<Image
									alt={'Vasilis Totskas'}
									height={176}
									width={176}
									src="/avatar.jpg"
									sizes="30vw"
									priority
									className="rounded-full filter grayscale"
								/>
							</div>
						</div>

						<h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 mt-16 text-black dark:text-white">
							{t('work.title', { ns: 'index' })}
						</h3>
						<p className="text-gray-600 dark:text-gray-400 mb-4">
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
