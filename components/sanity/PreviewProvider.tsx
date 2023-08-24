import { suspend } from 'suspend-react'
import { LiveQueryProvider } from 'next-sanity/preview'

export default function PreviewProvider({
	children,
	token
}: {
	children: React.ReactNode
	token: string
}) {
	if (!token) throw new TypeError('Missing token')
	const { client } = suspend(() => import('@lib/sanity/sanity.client'))
	return (
		<LiveQueryProvider client={client} token={token} logger={console}>
			{children}
		</LiveQueryProvider>
	)
}
