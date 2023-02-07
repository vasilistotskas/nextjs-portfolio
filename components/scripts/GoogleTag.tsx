import Script from 'next/script'
import { FC } from 'react'
import { GOOGLE_TAG_ID } from '@lib/googleTagManager'

const GoogleTag: FC = () => (
	<Script
		id="googleTag"
		strategy="afterInteractive"
		dangerouslySetInnerHTML={{
			__html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', '${GOOGLE_TAG_ID}');
      			`
		}}
	/>
)

export default GoogleTag
