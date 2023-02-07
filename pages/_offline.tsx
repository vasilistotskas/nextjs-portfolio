import Container from '@components/Container'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import React from 'react'

export default function Offline() {
	const { t } = useTranslation('offline')

	return (
		<Container title={t('container.title', { ns: 'offline' })}>
			<div>
				<Image
					className="mx-auto mb-2 flex max-w-2xl flex-col items-start justify-center"
					alt={`Offline`}
					src={`/static/images/offline.png`}
					width={256}
					height={256}
					priority
				/>
			</div>
			<div className="mx-auto mb-16 flex max-w-2xl flex-col items-start justify-center">
				<h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
					{t('title')}
				</h1>
				<p className="mb-8 text-gray-600 dark:text-gray-400">{t('description')}</p>
			</div>
		</Container>
	)
}

export const getStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale, ['common', 'offline']))
	}
})
