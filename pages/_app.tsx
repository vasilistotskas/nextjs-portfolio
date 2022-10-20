import 'styles/global.css'
import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'

const App = ({ Component, pageProps }) => (
	<SessionProvider session={pageProps.session}>
		<ThemeProvider attribute="class">
			<Component {...pageProps} />
		</ThemeProvider>
	</SessionProvider>
)

export default appWithTranslation(App)
