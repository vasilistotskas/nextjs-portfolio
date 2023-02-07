import AlertBanner from '@components/utils/AlertBanner'
import LoadingSpinner from '@components/utils/LoadingSpinner'
import React from 'react'

export default function BlogLayout({
	preview,
	loading,
	children
}: {
	preview: boolean
	loading?: boolean
	children: React.ReactNode
}) {
	return (
		<>
			<AlertBanner preview={preview} loading={loading} />
			{loading && <LoadingSpinner />}
			{children}
		</>
	)
}
