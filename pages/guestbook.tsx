import prisma from '@lib/prisma'
import Container from '@components/Container'
import Guestbook from 'components/Guestbook'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export default function GuestbookPage({ fallbackData }) {
	const { t, ready } = useTranslation(['common', 'guestbook'])

	if (ready)
		return (
			<Container
				title={t('container.title', { ns: 'guestbook' })}
				description={t('container.description', { ns: 'guestbook' })}
			>
				<div className="mx-auto mb-16 flex max-w-2xl flex-col items-start justify-center">
					<h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
						{t('title', { ns: 'guestbook' })}
					</h1>
					<p className="mb-4 text-gray-600 dark:text-gray-400">
						{t('description', { ns: 'guestbook' })}
					</p>
					<Guestbook fallbackData={fallbackData} />
				</div>
			</Container>
		)
}

export async function getStaticProps({ locale }) {
	const entries = await prisma.guestbook.findMany({
		orderBy: {
			updated_at: 'desc'
		}
	})

	const fallbackData = entries.map((entry) => ({
		id: entry.id.toString(),
		body: entry.body,
		created_by: entry.created_by.toString(),
		updated_at: entry.updated_at.toString()
	}))

	return {
		props: {
			fallbackData,
			...(await serverSideTranslations(locale, ['common', 'guestbook']))
		}
	}
}
