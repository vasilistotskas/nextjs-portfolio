import '@styles/global.scss'
import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'
import GoogleTagManger from '@components/scripts/GoogleTagManager'
import { GOOGLE_TAG_MANAGER_ID } from '@lib/googleTagManager'
import { Analytics } from '@vercel/analytics/react'
import { AppProps } from 'next/app'
import { Session } from 'next-auth/src'
import dynamic from 'next/dynamic'
import { SpeedInsights } from '@vercel/speed-insights/next'

const PreviewProvider = dynamic(() => import('components/sanity/PreviewProvider'))

const App = ({
	Component,
	pageProps
}: AppProps<{
	draftMode: boolean
	token: string
	session: Session | null
}>) => {
	const { draftMode, token } = pageProps
	return (
		<>
			<SessionProvider session={pageProps.session}>
				<ThemeProvider attribute="class">
					<div>
						<GoogleTagManger containerId={GOOGLE_TAG_MANAGER_ID} />
						{/* if draftMode  */}
						{draftMode && (
							<PreviewProvider token={token}>
								<Component {...pageProps} />
							</PreviewProvider>
						)}{' '}
						{/* else */}
						{!draftMode && <Component {...pageProps} />}
						<Analytics />
					</div>
				</ThemeProvider>
			</SessionProvider>
			<SpeedInsights />
		</>
	)
}

export default appWithTranslation(App)
