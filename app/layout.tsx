import type { ReactNode } from 'react'

type Props = {
	children: ReactNode
}

// Root layout — next-intl middleware handles locale redirect
export default function RootLayout({ children }: Props) {
	return children
}
