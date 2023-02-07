import Link from 'next/link'
import Image from 'next/image'

import Container from '@components/Container'
import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export default function About() {
	const { t, ready } = useTranslation(['about', 'common'])

	if (ready)
		return (
			<Container title={t('container.title', { ns: 'about' })}>
				<div className="mx-auto mb-16 flex w-full max-w-2xl flex-col items-start justify-center">
					<h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
						{t('title', { ns: 'about' })}
					</h1>
					<div className="prose mb-8 leading-6 dark:prose-dark">
						<h2 className="mb-2 flex items-center gap-2">
							<Image
								alt={`Bio`}
								src={'https://img.icons8.com/clouds/50/000000/external-link.png'}
								width={50}
								height={50}
								priority
							/>
							<span>{t('links', { ns: 'common' })}</span>
						</h2>
						<ul>
							<li className="flex items-center gap-2">
								<Image
									alt={`vassilistotskas.com`}
									src={'https://img.icons8.com/clouds/40/000000/domain.png'}
									width={40}
									height={40}
									priority
								/>
								{t('website', { ns: 'common' })}:{' '}
								<Link className="m-0" href="https://vasilistotskas.com">
									<p className="m-0">@{t('myUserName', { ns: 'common' })}</p>
								</Link>
							</li>
							<li className="flex items-center gap-2">
								<Image
									alt={`Twitter`}
									src={'https://img.icons8.com/clouds/40/000000/twitter-circled.png'}
									width={40}
									height={40}
									priority
								/>
								{t('twitter', { ns: 'common' })}:{' '}
								<Link className="m-0" href="https://twitter.com/vasilistotskas">
									@{t('myUserName', { ns: 'common' })}
								</Link>
							</li>
							<li className="flex items-center gap-2">
								<Image
									alt={`Github`}
									src={'https://img.icons8.com/clouds/40/000000/github.png'}
									width={40}
									height={40}
									priority
								/>
								{t('github', { ns: 'common' })}:{' '}
								<Link className="m-0" href="https://github.com/vasilistotskas">
									@{t('myUserName', { ns: 'common' })}
								</Link>
							</li>
							<li className="flex items-center gap-2">
								<Image
									alt={`LinkedIn`}
									src={'https://img.icons8.com/clouds/40/000000/linkedin.png'}
									width={40}
									height={40}
									priority
								/>
								{t('linkedin', { ns: 'common' })}:{' '}
								<Link className="m-0" href="https://www.linkedin.com/in/vasilistotskas/">
									@{t('myUserName', { ns: 'common' })}
								</Link>
							</li>
						</ul>
						<h2 className="mb-8 flex items-center gap-2">
							<Image
								alt={`Bio`}
								src={'https://img.icons8.com/clouds/50/000000/resume.png'}
								width={50}
								height={50}
								priority
							/>
							<span>{t('bio', { ns: 'about' })}</span>
						</h2>
						<h3>{t('job.title', { ns: 'about' })}</h3>
						<p>{t('job.subtitle', { ns: 'about' })}</p>

						<p className="mb-4 text-gray-600 dark:text-gray-400">
							{t('job.description', { ns: 'about' })}
						</p>
						<h3 className="mb-8 flex items-center gap-2">
							<Image
								alt={`Education`}
								src={'https://img.icons8.com/clouds/50/000000/school.png'}
								width={50}
								height={50}
								priority
							/>
							<span>{t('education.title', { ns: 'about' })}</span>
						</h3>
						<p>{t('education.subtitle', { ns: 'about' })}</p>
					</div>
				</div>
			</Container>
		)
}

export const getStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale, ['common', 'about']))
	}
})
