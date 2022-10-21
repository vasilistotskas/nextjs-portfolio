import 'styles/global.css'
import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'
import GoogleTagManger from '../components/GoogleTagManager'
import { GOOGLE_TAG_MANAGER_ID } from '@lib/googleTagManager'

const App = ({ Component, pageProps }) => (
	<SessionProvider session={pageProps.session}>
		<ThemeProvider attribute="class">
			<GoogleTagManger containerId={GOOGLE_TAG_MANAGER_ID} />
			<Component {...pageProps} />
		</ThemeProvider>
	</SessionProvider>
)

export default appWithTranslation(App)
