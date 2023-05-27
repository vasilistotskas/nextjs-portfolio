import '@styles/global.scss'
import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'
import GoogleTagManger from '@components/scripts/GoogleTagManager'
import { GOOGLE_TAG_MANAGER_ID } from '@lib/googleTagManager'
import { Analytics } from '@vercel/analytics/react'

const App = ({ Component, pageProps }) => (
	<SessionProvider session={pageProps.session}>
		<ThemeProvider attribute="class">
			<div>
				<GoogleTagManger containerId={GOOGLE_TAG_MANAGER_ID} />
				<Component {...pageProps} />
				<Analytics />
			</div>
		</ThemeProvider>
	</SessionProvider>
)

export default appWithTranslation(App)
