if(!self.define){let e,s={};const c=(c,a)=>(c=new URL(c+".js",a).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(a,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>c(e,i),d={module:{uri:i},exports:t,require:r};s[i]=Promise.all(a.map((e=>d[e]||r(e)))).then((e=>(n(...e),t)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts("fallback-Md09Ue_nfF_H8qvCJrEet.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Inter-Bold.woff",revision:"99a0d9a7e4c99c17bfdd94a22a5cf94e"},{url:"/_next/static/Md09Ue_nfF_H8qvCJrEet/_buildManifest.js",revision:"1494e68c67d6e3602cc1278247e718fd"},{url:"/_next/static/Md09Ue_nfF_H8qvCJrEet/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/09b4c045.8eb5c68082dcaff7.js",revision:"8eb5c68082dcaff7"},{url:"/_next/static/chunks/128.f7f56f09bb87c774.js",revision:"f7f56f09bb87c774"},{url:"/_next/static/chunks/137-246f99e1c3fff10e.js",revision:"246f99e1c3fff10e"},{url:"/_next/static/chunks/166.ae76e76ad8b433c3.js",revision:"ae76e76ad8b433c3"},{url:"/_next/static/chunks/178-36e257a697649678.js",revision:"36e257a697649678"},{url:"/_next/static/chunks/187.a9dddc8801b72e1d.js",revision:"a9dddc8801b72e1d"},{url:"/_next/static/chunks/240.a25daf965ab667da.js",revision:"a25daf965ab667da"},{url:"/_next/static/chunks/245.03b375db19020b8d.js",revision:"03b375db19020b8d"},{url:"/_next/static/chunks/29107295-e54500efb1be9efa.js",revision:"e54500efb1be9efa"},{url:"/_next/static/chunks/298-5cdf6cdfcee5c59c.js",revision:"5cdf6cdfcee5c59c"},{url:"/_next/static/chunks/374.2ea5b1fc46f9de27.js",revision:"2ea5b1fc46f9de27"},{url:"/_next/static/chunks/438.26debccb20444781.js",revision:"26debccb20444781"},{url:"/_next/static/chunks/441-72961cf197f6ab1a.js",revision:"72961cf197f6ab1a"},{url:"/_next/static/chunks/451.eb4c18d90d076f64.js",revision:"eb4c18d90d076f64"},{url:"/_next/static/chunks/453-0d08b9f38243acee.js",revision:"0d08b9f38243acee"},{url:"/_next/static/chunks/463.bd6dd86921348ef6.js",revision:"bd6dd86921348ef6"},{url:"/_next/static/chunks/464.6dbd2b8352adaa7c.js",revision:"6dbd2b8352adaa7c"},{url:"/_next/static/chunks/476.ba18875ebb8c1ebe.js",revision:"ba18875ebb8c1ebe"},{url:"/_next/static/chunks/4ad82c5e.34ef12705a624e0b.js",revision:"34ef12705a624e0b"},{url:"/_next/static/chunks/5082709c-fc93d155c8a3113c.js",revision:"fc93d155c8a3113c"},{url:"/_next/static/chunks/519.d853054a325e2600.js",revision:"d853054a325e2600"},{url:"/_next/static/chunks/53adca4f-a971c463673d8d31.js",revision:"a971c463673d8d31"},{url:"/_next/static/chunks/591-76a353c44eaf5684.js",revision:"76a353c44eaf5684"},{url:"/_next/static/chunks/648.83ab6d3e614ee29c.js",revision:"83ab6d3e614ee29c"},{url:"/_next/static/chunks/75fc9c18-da7e853fcdcaa641.js",revision:"da7e853fcdcaa641"},{url:"/_next/static/chunks/810.28ba4934be8383f0.js",revision:"28ba4934be8383f0"},{url:"/_next/static/chunks/894-e8cb8571b93366f3.js",revision:"e8cb8571b93366f3"},{url:"/_next/static/chunks/94-35cee4902d01ad27.js",revision:"35cee4902d01ad27"},{url:"/_next/static/chunks/a0c7cec5.2d60b1d079caa26c.js",revision:"2d60b1d079caa26c"},{url:"/_next/static/chunks/adef692a.eb10cd8249433668.js",revision:"eb10cd8249433668"},{url:"/_next/static/chunks/d3048c20-38ebdb8d10b51073.js",revision:"38ebdb8d10b51073"},{url:"/_next/static/chunks/ed9a0b66-7196543dc4428eed.js",revision:"7196543dc4428eed"},{url:"/_next/static/chunks/framework-ca2040a1dbe08795.js",revision:"ca2040a1dbe08795"},{url:"/_next/static/chunks/main-f4ccb22b3b67ec15.js",revision:"f4ccb22b3b67ec15"},{url:"/_next/static/chunks/pages/404-beee0852cedc0c23.js",revision:"beee0852cedc0c23"},{url:"/_next/static/chunks/pages/_app-40ebc4f6048422d0.js",revision:"40ebc4f6048422d0"},{url:"/_next/static/chunks/pages/_error-409f831d3504c8f5.js",revision:"409f831d3504c8f5"},{url:"/_next/static/chunks/pages/_offline-2cc5aa9bc2000435.js",revision:"2cc5aa9bc2000435"},{url:"/_next/static/chunks/pages/about-feeeb8e34bb61695.js",revision:"feeeb8e34bb61695"},{url:"/_next/static/chunks/pages/blog-70e075399db7bf71.js",revision:"70e075399db7bf71"},{url:"/_next/static/chunks/pages/blog/posts/%5Bslug%5D-9801316f32f3b33b.js",revision:"9801316f32f3b33b"},{url:"/_next/static/chunks/pages/dashboard-887c3abd0bac3195.js",revision:"887c3abd0bac3195"},{url:"/_next/static/chunks/pages/feed.xml-8fbbdc1ab91a2ccf.js",revision:"8fbbdc1ab91a2ccf"},{url:"/_next/static/chunks/pages/guestbook-6cad8fc3a5897e49.js",revision:"6cad8fc3a5897e49"},{url:"/_next/static/chunks/pages/index-e40c2ea4596d303b.js",revision:"e40c2ea4596d303b"},{url:"/_next/static/chunks/pages/sitemap.xml-e8e24cc4b8e9ca5a.js",revision:"e8e24cc4b8e9ca5a"},{url:"/_next/static/chunks/pages/studio/%5B%5B...index%5D%5D-79922f8faf12444f.js",revision:"79922f8faf12444f"},{url:"/_next/static/chunks/pages/uses-a7e7621ec7851b31.js",revision:"a7e7621ec7851b31"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-1d8796ba39508c80.js",revision:"1d8796ba39508c80"},{url:"/_next/static/css/0ca57bf616fd593a.css",revision:"0ca57bf616fd593a"},{url:"/_next/static/css/59380688526cc4bf.css",revision:"59380688526cc4bf"},{url:"/_next/static/media/2aaf0723e720e8b9.p.woff2",revision:"e1b9f0ecaaebb12c93064cd3c406f82b"},{url:"/_next/static/media/9c4f34569c9b36ca.woff2",revision:"2c1fc211bf5cca7ae7e7396dc9e4c824"},{url:"/_next/static/media/Inter-Bold.b1234477.woff",revision:"b1234477"},{url:"/_next/static/media/ae9ae6716d4f8bf8.woff2",revision:"b0c49a041e15bdbca22833f1ed5cfb19"},{url:"/_next/static/media/b1db3e28af9ef94a.woff2",revision:"70afeea69c7f52ffccde29e1ea470838"},{url:"/_next/static/media/b967158bc7d7a9fb.woff2",revision:"08ccb2a3cfc83cf18d4a3ec64dd7c11b"},{url:"/_next/static/media/break_iterator.819c05c7.wasm",revision:"819c05c7"},{url:"/_next/static/media/c0f5ec5bbf5913b7.woff2",revision:"8ca5bc1cd1579933b73e51ec9354eec9"},{url:"/_next/static/media/d1d9458b69004127.woff2",revision:"9885d5da3e4dfffab0b4b1f4a259ca27"},{url:"/_offline",revision:"Md09Ue_nfF_H8qvCJrEet"},{url:"/avatar-bw.jpg",revision:"3e7bbd1cbf36dda4348da0bf6bb58cca"},{url:"/avatar.jpg",revision:"3e7bbd1cbf36dda4348da0bf6bb58cca"},{url:"/banner.png",revision:"e79a17d345a10b5bd3b31dd6ad2e0c6f"},{url:"/break_iterator.wasm",revision:"3bde9eef9b092951f07c3ff47422997a"},{url:"/google7d641c813b4f273a.html",revision:"6a68d2965e353c76c562111c6b5cfc8d"},{url:"/locales/el/404.json",revision:"f8e20e28cd74d5378e966b5700689e8c"},{url:"/locales/el/about.json",revision:"f6716bb641173b474cc42ff7029881f9"},{url:"/locales/el/blog.json",revision:"4b1c619835180c4464352634e49f2e86"},{url:"/locales/el/blog_post.json",revision:"8a80554c91d9fca8acb82f023de02f11"},{url:"/locales/el/common.json",revision:"fd965c51a7f8ce0787274c1f49ab586d"},{url:"/locales/el/dashboard.json",revision:"29828cdd979bc904b87685b1d2df6ace"},{url:"/locales/el/guestbook.json",revision:"48d2dcd0eab682f898199a82850570e7"},{url:"/locales/el/index.json",revision:"dffd7255d3ef4b4d958a92dfa9e86df4"},{url:"/locales/el/offline.json",revision:"ddfe05678219f78790c585a22d944070"},{url:"/locales/el/uses.json",revision:"e69fa0d8f4c5c9d4b3f2b6f381f7a8ad"},{url:"/locales/en/404.json",revision:"cfd0feda3583a0b7e69cdb6b8855f4e6"},{url:"/locales/en/about.json",revision:"6ee489f9d3feaf7912fa9c16d3e7956c"},{url:"/locales/en/blog.json",revision:"bfd20c29826d205a1e3e01bb6476a315"},{url:"/locales/en/blog_post.json",revision:"8a80554c91d9fca8acb82f023de02f11"},{url:"/locales/en/common.json",revision:"ca0d0fcfe6dd7d2a46b590e162917e97"},{url:"/locales/en/dashboard.json",revision:"5c215e35893ab9ccfbe3e1e8dc728606"},{url:"/locales/en/guestbook.json",revision:"3af63e10f62ce5aee60e0f1b73f68fb0"},{url:"/locales/en/index.json",revision:"877ac6d27e45a7cefc285227f2658469"},{url:"/locales/en/offline.json",revision:"bb98430ecc0233a231ed779009ee7a33"},{url:"/locales/en/uses.json",revision:"03f2a0a3dfa64d136473845e5f2a02c2"},{url:"/manifest.json",revision:"7c020d705d52d4090f65776c806d2584"},{url:"/robots.txt",revision:"c23481c73bceb4e669d00c4c4cb7e7f0"},{url:"/static/favicons/android-chrome-192x192.png",revision:"f1f3a7b73ed3be88cd1821f541d37806"},{url:"/static/favicons/android-chrome-512x512.png",revision:"d45a84898a04c4ef7d9a171119d43edc"},{url:"/static/favicons/apple-touch-icon.png",revision:"0fd92d28d953e2ce30837414350e8428"},{url:"/static/favicons/browserconfig.xml",revision:"8343ca3d3026131795260fe20220a306"},{url:"/static/favicons/favicon-16x16.png",revision:"daeaf4f303907e24538233e0dd866a6d"},{url:"/static/favicons/favicon-32x32.png",revision:"26a13b3ade0e28c4f4af58e55e9a4e6d"},{url:"/static/favicons/favicon.ico",revision:"8b841e6b78cf9651629d00b9ea721950"},{url:"/static/favicons/mstile-150x150.png",revision:"acf4ede3a82aead096c44b65d80ccc23"},{url:"/static/favicons/safari-pinned-tab.svg",revision:"16e6a248d6ccfbd26bfd95033b590f4f"},{url:"/static/favicons/site.webmanifest",revision:"8b1007d2bf0b1eb0dce941e83833b8f5"},{url:"/static/images/github.png",revision:"0ba2aa20e2c2ce80e9a2db5b07198464"},{url:"/static/images/offline.png",revision:"8aefb0eb57180a33b04081579a998f81"},{url:"/static/images/setup.png",revision:"dc2e87ef319d8de8b4a02191aec793d6"},{url:"/static/images/vasilis-banner.jpg",revision:"5867996ab3c67c2b4f27334668327a1b"},{url:"/vasilistotskas.pdf",revision:"a96ef7857c04cdecad7ca6bc49993091"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:c,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET")}));
