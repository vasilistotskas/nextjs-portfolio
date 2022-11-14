import Script from 'next/script'
import { Html, Head, Main, NextScript } from 'next/document'
import { GOOGLE_TAG_MANAGER_ID } from '@lib/googleTagManager'

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<Script
					id="googleOptimize"
					src="https://www.googleoptimize.com/optimize.js?id=OPT-MGQ3QRP"
					strategy="afterInteractive"
				/>
				<Script
					id="googleTagManager"
					src="https://www.googletagmanager.com/gtag/js?id=G-QYH22QTF1C"
					strategy="afterInteractive"
				></Script>
				<link rel="manifest" href="/manifest.json" />
				<link
					href="/fonts/ibm-plex-sans-var.woff2"
					type="font/woff2"
					crossOrigin="anonymous"
				/>
				<link href="/static/favicons/favicon.ico" rel="shortcut icon" />
				<link
					href="/static/favicons/apple-touch-icon.png"
					rel="apple-touch-icon"
					sizes="180x180"
				/>
				<link
					href="/static/favicons/favicon-32x32.png"
					rel="icon"
					sizes="32x32"
					type="image/png"
				/>
				<link
					href="/static/favicons/favicon-16x16.png"
					rel="icon"
					sizes="16x16"
					type="image/png"
				/>
				<link
					color="#4a9885"
					href="/static/favicons/safari-pinned-tab.svg"
					rel="mask-icon"
				/>
				<meta content="#ffffff" name="theme-color" />
				<meta content="#ffffff" name="msapplication-TileColor" />
				<meta content="/static/favicons/browserconfig.xml" name="msapplication-config" />
				<meta content="14d2e73487fa6c71" name="yandex-verification" />
				<meta
					content="eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw"
					name="google-site-verification"
				/>
				<meta
					content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
					name="robots"
				/>
			</Head>
			<body className="bg-white dark:bg-black text-white dark:text-black">
				<noscript>
					<iframe
						src={`https://www.googletagmanager.com/ns.html?id=${GOOGLE_TAG_MANAGER_ID}`}
						height="0"
						width="0"
						title="googleTagManagerNoScript"
						style={{
							display: 'none',
							visibility: 'hidden'
						}}
					/>
				</noscript>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
