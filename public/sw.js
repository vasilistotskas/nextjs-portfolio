if (!self.define) {
	let e,
		i = {}
	const a = (a, s) => (
		(a = new URL(a + '.js', s).href),
		i[a] ||
			new Promise((i) => {
				if ('document' in self) {
					const e = document.createElement('script')
					;(e.src = a), (e.onload = i), document.head.appendChild(e)
				} else (e = a), importScripts(a), i()
			}).then(() => {
				let e = i[a]
				if (!e) throw new Error(`Module ${a} didn’t register its module`)
				return e
			})
	)
	self.define = (s, t) => {
		const c = e || ('document' in self ? document.currentScript.src : '') || location.href
		if (i[c]) return
		let n = {}
		const r = (e) => a(e, c),
			d = { module: { uri: c }, exports: n, require: r }
		i[c] = Promise.all(s.map((e) => d[e] || r(e))).then((e) => (t(...e), n))
	}
}
define(['./workbox-588899ac'], function (e) {
	'use strict'
	importScripts(),
		self.skipWaiting(),
		e.clientsClaim(),
		e.precacheAndRoute(
			[
				{
					url: '/_next/static/1Xgb1air4rmyDmSHX3LIq/_buildManifest.js',
					revision: '8143bd3df961a9b354251bcef924ac73'
				},
				{
					url: '/_next/static/1Xgb1air4rmyDmSHX3LIq/_ssgManifest.js',
					revision: 'b6652df95db52feb4daf4eca35380933'
				},
				{
					url: '/_next/static/chunks/167-4ae4480dee839e87.js',
					revision: '4ae4480dee839e87'
				},
				{
					url: '/_next/static/chunks/29107295-fbcfe2172188e46f.js',
					revision: 'fbcfe2172188e46f'
				},
				{
					url: '/_next/static/chunks/836-e04a54d42cab3011.js',
					revision: 'e04a54d42cab3011'
				},
				{
					url: '/_next/static/chunks/913-4952799fed03c864.js',
					revision: '4952799fed03c864'
				},
				{
					url: '/_next/static/chunks/framework-4556c45dd113b893.js',
					revision: '4556c45dd113b893'
				},
				{
					url: '/_next/static/chunks/main-0687d1446dedf57f.js',
					revision: '0687d1446dedf57f'
				},
				{
					url: '/_next/static/chunks/pages/404-9f0fa2e138d5c72e.js',
					revision: '9f0fa2e138d5c72e'
				},
				{
					url: '/_next/static/chunks/pages/_app-5a2668e1ec871381.js',
					revision: '5a2668e1ec871381'
				},
				{
					url: '/_next/static/chunks/pages/_error-a4ba2246ff8fb532.js',
					revision: 'a4ba2246ff8fb532'
				},
				{
					url: '/_next/static/chunks/pages/about-59dfcc33c956e520.js',
					revision: '59dfcc33c956e520'
				},
				{
					url: '/_next/static/chunks/pages/dashboard-6f104153fdedeb13.js',
					revision: '6f104153fdedeb13'
				},
				{
					url: '/_next/static/chunks/pages/feed.xml-8e42851204e5cf93.js',
					revision: '8e42851204e5cf93'
				},
				{
					url: '/_next/static/chunks/pages/guestbook-e80dbddc33bc90ab.js',
					revision: 'e80dbddc33bc90ab'
				},
				{
					url: '/_next/static/chunks/pages/index-bb6d3eb4fb0198a4.js',
					revision: 'bb6d3eb4fb0198a4'
				},
				{
					url: '/_next/static/chunks/pages/sitemap.xml-e418780a3d099c23.js',
					revision: 'e418780a3d099c23'
				},
				{
					url: '/_next/static/chunks/pages/uses-1bac752f0b1c32af.js',
					revision: '1bac752f0b1c32af'
				},
				{
					url: '/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js',
					revision: '837c0df77fd5009c9e46d446188ecfd0'
				},
				{
					url: '/_next/static/chunks/webpack-cb7634a8b6194820.js',
					revision: 'cb7634a8b6194820'
				},
				{ url: '/_next/static/css/06a7e5a6a12a3fa7.css', revision: '06a7e5a6a12a3fa7' },
				{ url: '/_next/static/css/31d132eb9d82edab.css', revision: '31d132eb9d82edab' },
				{ url: '/avatar-bw.jpg', revision: '3e7bbd1cbf36dda4348da0bf6bb58cca' },
				{ url: '/avatar.jpg', revision: '3e7bbd1cbf36dda4348da0bf6bb58cca' },
				{
					url: '/building-component-libraries-with-a-monorepo.pdf',
					revision: '5d84f17f781d3771fb4d52124704983d'
				},
				{
					url: '/core-web-vitals-2021.pdf',
					revision: '5cb772b196be285fae3afba7fe5e7aa4'
				},
				{
					url: '/fonts/ibm-plex-sans-var-italic.woff2',
					revision: '32e4d830f7d650b6c5aa6ee5e7a0cef4'
				},
				{
					url: '/fonts/ibm-plex-sans-var.woff2',
					revision: '53c19ee2692551f7830c9bf2f8234ce4'
				},
				{
					url: '/google7d641c813b4f273a.html',
					revision: '6a68d2965e353c76c562111c6b5cfc8d'
				},
				{ url: '/locales/el/404.json', revision: 'f8e20e28cd74d5378e966b5700689e8c' },
				{ url: '/locales/el/about.json', revision: 'f6716bb641173b474cc42ff7029881f9' },
				{ url: '/locales/el/common.json', revision: '1b59f87789fedc93e5d835baf403b7c8' },
				{
					url: '/locales/el/dashboard.json',
					revision: '29828cdd979bc904b87685b1d2df6ace'
				},
				{
					url: '/locales/el/guestbook.json',
					revision: '48d2dcd0eab682f898199a82850570e7'
				},
				{ url: '/locales/el/index.json', revision: '485da045ca85670d010b014b88492caf' },
				{ url: '/locales/el/uses.json', revision: 'e69fa0d8f4c5c9d4b3f2b6f381f7a8ad' },
				{ url: '/locales/en/404.json', revision: 'cfd0feda3583a0b7e69cdb6b8855f4e6' },
				{ url: '/locales/en/about.json', revision: '4ae449731b2462ec29804dd96ca85655' },
				{ url: '/locales/en/common.json', revision: '1623c49df35539b01e450f0e5a0d2d02' },
				{
					url: '/locales/en/dashboard.json',
					revision: '5c215e35893ab9ccfbe3e1e8dc728606'
				},
				{
					url: '/locales/en/guestbook.json',
					revision: '3af63e10f62ce5aee60e0f1b73f68fb0'
				},
				{ url: '/locales/en/index.json', revision: '46e23bc88067153aa8280e733c211f2e' },
				{ url: '/locales/en/uses.json', revision: '03f2a0a3dfa64d136473845e5f2a02c2' },
				{ url: '/manifest.json', revision: '121a8ffbe4f94651883054495f35c2e0' },
				{ url: '/react-miami.pdf', revision: '302695e276235fcbd95ef7118530a466' },
				{
					url: '/recruiting-engineers-talent42-lee-robinson.pdf',
					revision: 'fa03efba8b55f806567221e5e77d7ec3'
				},
				{ url: '/robots.txt', revision: 'c23481c73bceb4e669d00c4c4cb7e7f0' },
				{
					url: '/static/favicons/android-chrome-192x192.png',
					revision: '8c0b32f4f12fb7a98747b62fe0b95371'
				},
				{
					url: '/static/favicons/android-chrome-512x512.png',
					revision: '73eb6e63d9e5d476a49c74ed69d602e7'
				},
				{
					url: '/static/favicons/apple-touch-icon.png',
					revision: '2307b27c0d474e3af43dae1ee10a803f'
				},
				{
					url: '/static/favicons/browserconfig.xml',
					revision: '8343ca3d3026131795260fe20220a306'
				},
				{
					url: '/static/favicons/favicon-16x16.png',
					revision: '8c97f06600c250dcf3ee4adb09e1b438'
				},
				{
					url: '/static/favicons/favicon-32x32.png',
					revision: 'f61b5fbf26cdf6516462735c022b272d'
				},
				{
					url: '/static/favicons/favicon.ico',
					revision: '0e662e1342f1fd1cf9faa0f73d5bd763'
				},
				{
					url: '/static/favicons/mstile-150x150.png',
					revision: '621941d5e6f531247fc14c504e9108af'
				},
				{
					url: '/static/favicons/safari-pinned-tab.svg',
					revision: 'ccf3571639a09766b9e7837736906227'
				},
				{
					url: '/static/favicons/site.webmanifest',
					revision: '8b1007d2bf0b1eb0dce941e83833b8f5'
				},
				{
					url: '/static/images/build-vs-buy/banner.png',
					revision: 'f23a7d6a2702338b92e4ab543eb4076f'
				},
				{
					url: '/static/images/build-vs-buy/hubble-alert.png',
					revision: 'a334043fca487954a8f2fdfa21ffcf3d'
				},
				{
					url: '/static/images/build-vs-buy/hubble-context-view.png',
					revision: '0bf55f575f201af59809ef8adabee671'
				},
				{
					url: '/static/images/build-vs-buy/hubble-errors-table.png',
					revision: '4fad05eb3834a22b5aabce5ea4359af3'
				},
				{
					url: '/static/images/career/banners.png',
					revision: '8e2685002dac1a09949463e13106440d'
				},
				{
					url: '/static/images/career/lamp.png',
					revision: '4c6d3061cf802cb632956e59abcf11f4'
				},
				{
					url: '/static/images/career/react-dark.png',
					revision: '3c83b00bf1215b8cc192648f9514f204'
				},
				{
					url: '/static/images/career/react-light.png',
					revision: '9b12f1e299cf61e90ebbffea9d38c337'
				},
				{
					url: '/static/images/career/shirts.png',
					revision: 'b4e055e040a527d4990682f024c5baf4'
				},
				{
					url: '/static/images/career/swing.png',
					revision: '224d57c85d35a413cec1acee0535f53e'
				},
				{
					url: '/static/images/content-marketing-personal-brand/final-views.png',
					revision: '7fcec59b0fdaf6db3a5992f9acf33e78'
				},
				{
					url: '/static/images/content-marketing-personal-brand/google.gif',
					revision: '62ca04cc4b7af1849598ce9922141a14'
				},
				{
					url: '/static/images/content-marketing-personal-brand/hacker-news.png',
					revision: '2301779f9176415e0bdb544d1d5eb990'
				},
				{
					url: '/static/images/content-marketing-personal-brand/originally-posted.png',
					revision: 'f49bd38b6c9e75cb57a8399fcff9835d'
				},
				{
					url: '/static/images/content-marketing-personal-brand/reddit.png',
					revision: '44435679d6b76acf97355bec9cc4152a'
				},
				{
					url: '/static/images/content-marketing-personal-brand/spongebob.gif',
					revision: '5deb2028cfe19d5afe70f1f9e6583d07'
				},
				{
					url: '/static/images/dev-twitter/drake.gif',
					revision: '50b41d1da8dfd60548a6c9f2afa9b1b1'
				},
				{
					url: '/static/images/dev-twitter/drake2.gif',
					revision: 'cc43797162492982c01a361a41fc25e9'
				},
				{
					url: '/static/images/dev-twitter/meek-dark.png',
					revision: 'a8cf31534f33a05f88f4a72a9fb699c0'
				},
				{
					url: '/static/images/dev-twitter/meek.png',
					revision: '3ca05c9d9b090760fef02c27e3a232ab'
				},
				{
					url: '/static/images/getting-started-with-dart-and-react/flux_diagram.png',
					revision: '85babd9028379e966aa8f36256e70b90'
				},
				{
					url: '/static/images/getting-started-with-dart-and-react/spec-outlined.png',
					revision: '4d8b91dcdd8f692a57dd28d5a5c551cf'
				},
				{
					url: '/static/images/github.png',
					revision: '0ba2aa20e2c2ce80e9a2db5b07198464'
				},
				{
					url: '/static/images/heroku/2008.png',
					revision: '9d80d71ea5a9e7de4109b0aaae638b0d'
				},
				{
					url: '/static/images/heroku/2011.png',
					revision: '585d7df7a5fd691da8fc0192932e8414'
				},
				{
					url: '/static/images/heroku/ide.png',
					revision: '589987535c8d24f698e5c24fe3aa3135'
				},
				{
					url: '/static/images/heroku/platform.png',
					revision: '51dc4f8dd6c7089e859d59ec750f6c4d'
				},
				{
					url: '/static/images/heroku/trends.png',
					revision: 'a1978902c34a8ca0c2235a6a0251a0cb'
				},
				{
					url: '/static/images/how-stripe-designs-beautiful-websites/animation-example.gif',
					revision: 'ba756e3ce9658f75702e3cbbbbcc7d69'
				},
				{
					url: '/static/images/how-stripe-designs-beautiful-websites/banner.png',
					revision: 'adc73b6d079eb1a3ad1e442dc6a31707'
				},
				{
					url: '/static/images/how-stripe-designs-beautiful-websites/buttons.gif',
					revision: 'a7822d81e2db19fb5e7264c3846495f3'
				},
				{
					url: '/static/images/how-stripe-designs-beautiful-websites/camphor.png',
					revision: '8272cead74027a2c73b699ded943adbc'
				},
				{
					url: '/static/images/how-stripe-designs-beautiful-websites/color-palette.png',
					revision: '6d9cdc762c94ce72d456306243908124'
				},
				{
					url: '/static/images/how-stripe-designs-beautiful-websites/css-example.gif',
					revision: '91329d3f1d16812e3d30062380f403ea'
				},
				{
					url: '/static/images/how-stripe-designs-beautiful-websites/salesforce.svg',
					revision: 'c8cdf94ec78d217c9a8a9c71ef17fbfc'
				},
				{
					url: '/static/images/how-stripe-designs-beautiful-websites/spinning-animation.gif',
					revision: '17e6377360f1fd0490ea9dd61d79565d'
				},
				{
					url: '/static/images/how-stripe-designs-beautiful-websites/typography.png',
					revision: 'bc0e1e9edfe195aebe08ae710ea92f60'
				},
				{
					url: '/static/images/how-stripe-designs-beautiful-websites/website.png',
					revision: '26c41e027a2af8f52b24e4be35de8f08'
				},
				{
					url: '/static/images/how-to-print-in-react-using-iframes/print.gif',
					revision: '0e14018decedb475c5dd332686c438fb'
				},
				{
					url: '/static/images/image-gallery-supabase-tailwind-nextjs/banner.png',
					revision: 'd87d5214b78e941618264405decf4a9c'
				},
				{
					url: '/static/images/image-gallery-supabase-tailwind-nextjs/supabase.png',
					revision: '02afbd9267bc6a58f0fb7a3b8a868e67'
				},
				{
					url: '/static/images/image-gallery-supabase-tailwind-nextjs/swag.png',
					revision: '2e1fb226c28efe82e03f867b096a05b5'
				},
				{
					url: '/static/images/learn-nextjs/companies.png',
					revision: 'cf23112cfaacb3d24e7b12e9b01e8ba5'
				},
				{
					url: '/static/images/learn-nextjs/github.png',
					revision: '944ba6c4eaa6c97d6dd1e8910d26f591'
				},
				{
					url: '/static/images/learn-nextjs/nextjs-trend.png',
					revision: '56c3aeacc4a0ede82c7a23f829db6dac'
				},
				{
					url: '/static/images/learn-nextjs/npm-trend.png',
					revision: '292cc1e472b8b7e04003403326d64521'
				},
				{
					url: '/static/images/learn-nextjs/react-trend.png',
					revision: 'fd5a7c36737ce7807b4899f9d57929a1'
				},
				{
					url: '/static/images/learning-css-animations-by-example/cyclone.svg',
					revision: 'a5cc3f6e7cfb1960b3cdf5ad9c2ba67c'
				},
				{
					url: '/static/images/learning-css-animations-by-example/illustrator.png',
					revision: '09e2e8feff3cfa0a3fe3e760beb4205c'
				},
				{
					url: '/static/images/learning-css-animations-by-example/isu-logo.gif',
					revision: 'f8c17095f33468f398641310c28ecd89'
				},
				{
					url: '/static/images/learning-css-animations-by-example/isu-logo.png',
					revision: 'fb54ed1ce6967023394ddb25c182fc1e'
				},
				{
					url: '/static/images/loading-placeholder-with-sass/example.gif',
					revision: '1dd3a854ca771ecbb1dabdcc7f3f3925'
				},
				{
					url: '/static/images/loading-placeholder-with-sass/facebook.png',
					revision: 'ccc0e3291bc8469eef98978f45738347'
				},
				{
					url: '/static/images/loading-placeholder-with-sass/final-result.gif',
					revision: '323360051644e174a4a64fd480a5f68f'
				},
				{
					url: '/static/images/loading-placeholder-with-sass/linkedin.png',
					revision: '1167b9e725438a1fd948ef5eef86144e'
				},
				{
					url: '/static/images/mysql-planetscale/checkly-firebase.png',
					revision: 'f2cfd13bdadc78d387dc7b1efaaedfe2'
				},
				{
					url: '/static/images/mysql-planetscale/checkly.png',
					revision: '1a71b95a5656103d92f688cb46e4e4f4'
				},
				{
					url: '/static/images/mysql-planetscale/firebase.png',
					revision: '2e036c8f5d3cd9edc998b74a0e4a0f86'
				},
				{
					url: '/static/images/mysql-planetscale/redis.png',
					revision: '67ddf156b9b61b4bee41ad468d0f3f2a'
				},
				{
					url: '/static/images/next-prisma/prisma-flow.png',
					revision: '1275922724076315d0f95146d8bc84e1'
				},
				{
					url: '/static/images/next-prisma/prisma.gif',
					revision: 'ba62cba5aab98963ad728a3a6706d42c'
				},
				{
					url: '/static/images/next-prisma/studio.gif',
					revision: 'df0322f485b7051368627660ae0b1472'
				},
				{
					url: '/static/images/react-state-management/amazon.png',
					revision: '353e0df9c6364a1e6aaa95e0c7daaec1'
				},
				{
					url: '/static/images/react-state-management/context.png',
					revision: '78793751aef7e816f51a1f2a83154b31'
				},
				{
					url: '/static/images/react-state-management/figma.png',
					revision: '689ab7a9a5b839ff8988a0f2b654d1e3'
				},
				{
					url: '/static/images/react-state-management/immer.png',
					revision: '5c08d89c7a1423986140d40d21ff885c'
				},
				{
					url: '/static/images/react-state-management/nomad.png',
					revision: '221f4d7734b2020f59d0793213ecaf8d'
				},
				{
					url: '/static/images/react-state-management/redux.png',
					revision: '395a557a97f5ca05daef0add9f25ff57'
				},
				{
					url: '/static/images/react-state-management/state-machines.gif',
					revision: '1673824e6c73ae2d62dec3c3a355db85'
				},
				{
					url: '/static/images/real-time-post-views/blog-post-views.png',
					revision: 'acf52c8a78282944a7106b4695bedbc7'
				},
				{
					url: '/static/images/real-time-post-views/chart.png',
					revision: 'e43520e9ea92e7c7baeaf96159d70c4f'
				},
				{
					url: '/static/images/real-time-post-views/db-usage.png',
					revision: '120aa2f7cc9b891e2504094c9cf2ab27'
				},
				{
					url: '/static/images/real-time-post-views/firebase/step1.png',
					revision: 'ee8c2a6a6fbff26b93fd0a4d66bc1094'
				},
				{
					url: '/static/images/real-time-post-views/firebase/step2.png',
					revision: '4003921966cb6a7b4822cbcd0b4caaf8'
				},
				{
					url: '/static/images/real-time-post-views/firebase/step3.png',
					revision: '62dd239331d43b85e081d23ea29acc29'
				},
				{
					url: '/static/images/real-time-post-views/firebase/step4.png',
					revision: '5f440b5407e3836a486b789862ce954c'
				},
				{
					url: '/static/images/real-time-post-views/firebase/step5.png',
					revision: '447ba6150d0d3c17b22fc95cdc79c6e2'
				},
				{
					url: '/static/images/real-time-post-views/testing-database.png',
					revision: '888e70164f32ac9e29d661b1ad436f4c'
				},
				{ url: '/static/images/setup.png', revision: 'dc2e87ef319d8de8b4a02191aec793d6' },
				{
					url: '/static/images/space-invaders-with-python/banner.png',
					revision: '1923d8eba9200e2a31827c9ba680d36d'
				},
				{
					url: '/static/images/space-invaders-with-python/space-invaders.png',
					revision: 'dd02427c8c7b353503521a73b58eb613'
				},
				{
					url: '/static/images/style-guides-component-libraries-design-systems/atomize.png',
					revision: '248fb7895264fee23730b5ae56a96e6a'
				},
				{
					url: '/static/images/style-guides-component-libraries-design-systems/button.png',
					revision: 'a8e280653edcc63988320a794ff94e93'
				},
				{
					url: '/static/images/style-guides-component-libraries-design-systems/buttons.png',
					revision: '987468ee910e0c769452edc610c58241'
				},
				{
					url: '/static/images/style-guides-component-libraries-design-systems/component-driven-development.jpg',
					revision: 'eb31eaf1873029304b33df8f3ced6abe'
				},
				{
					url: '/static/images/style-guides-component-libraries-design-systems/component-library.png',
					revision: '41b817982781e8e392d303334c02fca1'
				},
				{
					url: '/static/images/style-guides-component-libraries-design-systems/components.png',
					revision: '00fe7781984c6ad2e176f8208bc26670'
				},
				{
					url: '/static/images/style-guides-component-libraries-design-systems/design-system.png',
					revision: 'e12136665a881997dad2dde9a928394a'
				},
				{
					url: '/static/images/style-guides-component-libraries-design-systems/design-tokens.png',
					revision: '7c0a42a352765d84422c61a31c9d7bf3'
				},
				{
					url: '/static/images/style-guides-component-libraries-design-systems/icons.png',
					revision: '534a1e36a6cce03a356cbe504695cf46'
				},
				{
					url: '/static/images/style-guides-component-libraries-design-systems/monorepo.png',
					revision: '788784e42d63f3bda132081e75033add'
				},
				{
					url: '/static/images/style-guides-component-libraries-design-systems/storybook-docs.png',
					revision: 'a9f34bfb2371564ea2da61fc98b947cf'
				},
				{
					url: '/static/images/style-guides-component-libraries-design-systems/storybook-flow.png',
					revision: '310e201b875ad2cb84a2d42d3d33ba11'
				},
				{
					url: '/static/images/style-guides-component-libraries-design-systems/style-guide.png',
					revision: 'f2f1d2b112aebb772ffe0f37bfb7db5f'
				},
				{
					url: '/static/images/style-guides-component-libraries-design-systems/website.png',
					revision: 'a742e1e1f29cf2b864f30e37433634cd'
				},
				{
					url: '/static/images/tailwind/analytics.jpg',
					revision: 'a06247bd4783a64ac19b19e70b73d148'
				},
				{
					url: '/static/images/teach-online/reddit.png',
					revision: 'af048a83dae7714e299e129901dccb2a'
				},
				{
					url: '/static/images/technical-recruiting-is-broken/alexa.jpg',
					revision: 'a8547bd2fd490ca4eb35b0a49df91a9e'
				},
				{
					url: '/static/images/technical-recruiting-is-broken/amazon.jpg',
					revision: '252ec037a53c50dcb7e244564395951e'
				},
				{
					url: '/static/images/technical-recruiting-is-broken/derek.jpg',
					revision: '51ae3b1da0740eb0adfc850185dd29af'
				},
				{
					url: '/static/images/technical-recruiting-is-broken/katie.jpg',
					revision: 'a82c9db0090ac93816d50f80af5a5391'
				},
				{
					url: '/static/images/technical-recruiting-is-broken/linkedin-bio.jpg',
					revision: '04db03f396f2a922434bcc15f56c55e9'
				},
				{
					url: '/static/images/technical-recruiting-is-broken/recruiter.jpg',
					revision: '087dfb423becedb5d2bf0ea793296182'
				},
				{
					url: '/static/images/technical-recruiting-is-broken/recruiter2.jpg',
					revision: '116b20b3d12fbd766d4a90af08705aa9'
				},
				{
					url: '/static/images/technical-recruiting-is-broken/recruiter3.jpg',
					revision: 'b94491e41d2a09b62103a50ff83bd764'
				},
				{
					url: '/static/images/using-mapbox-with-next-js/map.png',
					revision: '2f00d3b2c148ba4eda162ca9de4e170e'
				},
				{
					url: '/static/images/using-mapbox-with-next-js/mapbox-pricing.png',
					revision: 'b95bc19790700f5cb379abcd30c274cb'
				},
				{
					url: '/static/images/vasilis-banner.jpg',
					revision: '5867996ab3c67c2b4f27334668327a1b'
				},
				{
					url: '/static/images/video/aperture.png',
					revision: '0c2ddbd82e931ee4280bac6a521c8bf8'
				},
				{
					url: '/static/images/video/diffused.png',
					revision: '02a30f2d44be9373a9fdbacef7d182e6'
				},
				{
					url: '/static/images/video/exposure.png',
					revision: '1ea5428b4bb829320c305ff8a8d74701'
				},
				{
					url: '/static/images/video/focal-lengths.gif',
					revision: '6b724b7d9479b2a13ebde08b232140fb'
				},
				{
					url: '/static/images/video/lighting.png',
					revision: '4aaf621310335582446c6e5ccc87b709'
				},
				{
					url: '/static/images/video/motion-blur.png',
					revision: '75cb2be8066a6975ca42ec0b13419415'
				},
				{
					url: '/static/images/video/peaks.png',
					revision: '4ada8579925fb11aaa52c54680b82a9e'
				},
				{
					url: '/static/images/video/pop-filter.png',
					revision: 'c6bf74ce874e5edc5d76c2be496839f4'
				},
				{
					url: '/static/images/video/resolution.png',
					revision: 'bad24d27610934f0c39576638ae3cef6'
				},
				{
					url: '/static/images/video/shutter-speed.png',
					revision: '28f3e5f9a4dd56bbc759e2fade37d0de'
				},
				{
					url: '/static/images/video/studio.png',
					revision: 'a2174820e91dd10937e1018ea8764442'
				},
				{ url: '/vasilistotskas.pdf', revision: 'a96ef7857c04cdecad7ca6bc49993091' }
			],
			{ ignoreURLParametersMatching: [] }
		),
		e.cleanupOutdatedCaches(),
		e.registerRoute(
			'/',
			new e.NetworkFirst({
				cacheName: 'start-url',
				plugins: [
					{
						cacheWillUpdate: async ({ request: e, response: i, event: a, state: s }) =>
							i && 'opaqueredirect' === i.type
								? new Response(i.body, {
										status: 200,
										statusText: 'OK',
										headers: i.headers
								  })
								: i
					}
				]
			}),
			'GET'
		),
		e.registerRoute(
			/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
			new e.CacheFirst({
				cacheName: 'google-fonts-webfonts',
				plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })]
			}),
			'GET'
		),
		e.registerRoute(
			/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
			new e.StaleWhileRevalidate({
				cacheName: 'google-fonts-stylesheets',
				plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })]
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'static-font-assets',
				plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })]
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'static-image-assets',
				plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })]
			}),
			'GET'
		),
		e.registerRoute(
			/\/_next\/image\?url=.+$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'next-image',
				plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })]
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:mp3|wav|ogg)$/i,
			new e.CacheFirst({
				cacheName: 'static-audio-assets',
				plugins: [
					new e.RangeRequestsPlugin(),
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
				]
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:mp4)$/i,
			new e.CacheFirst({
				cacheName: 'static-video-assets',
				plugins: [
					new e.RangeRequestsPlugin(),
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
				]
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:js)$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'static-js-assets',
				plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })]
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:css|less)$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'static-style-assets',
				plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })]
			}),
			'GET'
		),
		e.registerRoute(
			/\/_next\/data\/.+\/.+\.json$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'next-data',
				plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })]
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:json|xml|csv)$/i,
			new e.NetworkFirst({
				cacheName: 'static-data-assets',
				plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })]
			}),
			'GET'
		),
		e.registerRoute(
			({ url: e }) => {
				if (!(self.origin === e.origin)) return !1
				const i = e.pathname
				return !i.startsWith('/api/auth/') && !!i.startsWith('/api/')
			},
			new e.NetworkFirst({
				cacheName: 'apis',
				networkTimeoutSeconds: 10,
				plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })]
			}),
			'GET'
		),
		e.registerRoute(
			({ url: e }) => {
				if (!(self.origin === e.origin)) return !1
				return !e.pathname.startsWith('/api/')
			},
			new e.NetworkFirst({
				cacheName: 'others',
				networkTimeoutSeconds: 10,
				plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })]
			}),
			'GET'
		),
		e.registerRoute(
			({ url: e }) => !(self.origin === e.origin),
			new e.NetworkFirst({
				cacheName: 'cross-origin',
				networkTimeoutSeconds: 10,
				plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })]
			}),
			'GET'
		)
})
