import Head from 'next/head'
import { NextStudio } from 'next-sanity/studio'
import { NextStudioHead } from 'next-sanity/studio/head'
import { StudioLayout, StudioProvider } from 'sanity'
import config from 'sanity.config'
import { createGlobalStyle } from 'styled-components'
import { Theme } from '@sanity/ui'

const GlobalStyle = createGlobalStyle(({ theme }: { theme: Theme }) => ({
	html: { backgroundColor: theme.sanity.color.base.bg},
}))

export default function StudioPage() {
	return (
		<>
			<Head>
				<NextStudioHead favicons={true} />
			</Head>

			<NextStudio config={config}>
				<StudioProvider config={config}>
					<GlobalStyle />
					<StudioLayout />
				</StudioProvider>
			</NextStudio>
		</>
	)
}
