import Script from 'next/script'
import { FC } from 'react'

const GoogleTag: FC = () => (
	<Script
		id="googleTag"
		strategy="afterInteractive"
		dangerouslySetInnerHTML={{
			__html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-QYH22QTF1C');
      			`
		}}
	/>
)

export default GoogleTag
