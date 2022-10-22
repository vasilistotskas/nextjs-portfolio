import Container from 'components/Container'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Image from 'next/future/image'
import React from 'react'

export default function Offline() {
	const { t } = useTranslation('offline')

	return (
		<Container title={t('container.title', { ns: 'offline' })}>
			<div>
				<Image
					className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-2"
					alt={`Offline`}
					src={`/static/images/offline.png`}
					width={256}
					height={256}
					priority
				/>
			</div>
			<div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
				<h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
					{t('title')}
				</h1>
				<p className="text-gray-600 dark:text-gray-400 mb-8">{t('description')}</p>
			</div>
		</Container>
	)
}

export const getStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale, ['common', 'offline']))
	}
})
