if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let r={};const t=e=>a(e,i),o={module:{uri:i},exports:r,require:t};s[i]=Promise.all(c.map((e=>o[e]||t(e)))).then((e=>(n(...e),r)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts("fallback-qGoYQZcxqM9vNY2p6qKvo.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Inter-Bold.woff",revision:"99a0d9a7e4c99c17bfdd94a22a5cf94e"},{url:"/_next/static/chunks/09b4c045.5ac36b7297e30fef.js",revision:"5ac36b7297e30fef"},{url:"/_next/static/chunks/124.a25a11b7b20d74b1.js",revision:"a25a11b7b20d74b1"},{url:"/_next/static/chunks/166.62ae293133efc8db.js",revision:"62ae293133efc8db"},{url:"/_next/static/chunks/175.f2ff6d8064ac2b6e.js",revision:"f2ff6d8064ac2b6e"},{url:"/_next/static/chunks/245.6fd97d65bf5dc666.js",revision:"6fd97d65bf5dc666"},{url:"/_next/static/chunks/256.d756485da55d4b9e.js",revision:"d756485da55d4b9e"},{url:"/_next/static/chunks/29107295-99d6b2d20ce997ac.js",revision:"99d6b2d20ce997ac"},{url:"/_next/static/chunks/298-84003e5f7df62d6a.js",revision:"84003e5f7df62d6a"},{url:"/_next/static/chunks/2b429e67.1021e4eccb240785.js",revision:"1021e4eccb240785"},{url:"/_next/static/chunks/318.22737551045a4e11.js",revision:"22737551045a4e11"},{url:"/_next/static/chunks/340-14ef822214a17f87.js",revision:"14ef822214a17f87"},{url:"/_next/static/chunks/391-e9413d417ab6ce42.js",revision:"e9413d417ab6ce42"},{url:"/_next/static/chunks/43.155577c8246af849.js",revision:"155577c8246af849"},{url:"/_next/static/chunks/441-5bc10b58513debcf.js",revision:"5bc10b58513debcf"},{url:"/_next/static/chunks/4ad82c5e.2d0384924df28ea8.js",revision:"2d0384924df28ea8"},{url:"/_next/static/chunks/504.1bfaa29bc381e7d4.js",revision:"1bfaa29bc381e7d4"},{url:"/_next/static/chunks/5082709c-b7e74bbce5917c92.js",revision:"b7e74bbce5917c92"},{url:"/_next/static/chunks/514.cc8389548f79edb0.js",revision:"cc8389548f79edb0"},{url:"/_next/static/chunks/525-8fe7c79c17a08634.js",revision:"8fe7c79c17a08634"},{url:"/_next/static/chunks/53adca4f-157b11e448f62f49.js",revision:"157b11e448f62f49"},{url:"/_next/static/chunks/591-e64b14d222d9a03f.js",revision:"e64b14d222d9a03f"},{url:"/_next/static/chunks/594.4f6ab64018dac100.js",revision:"4f6ab64018dac100"},{url:"/_next/static/chunks/699.62da987e69ab5e07.js",revision:"62da987e69ab5e07"},{url:"/_next/static/chunks/750.e9fd152f55ce54ea.js",revision:"e9fd152f55ce54ea"},{url:"/_next/static/chunks/75fc9c18-3392ba707c4fed97.js",revision:"3392ba707c4fed97"},{url:"/_next/static/chunks/801.260b21b6c2984ea5.js",revision:"260b21b6c2984ea5"},{url:"/_next/static/chunks/813.518ed427436507fb.js",revision:"518ed427436507fb"},{url:"/_next/static/chunks/86-1d9e72241a824e67.js",revision:"1d9e72241a824e67"},{url:"/_next/static/chunks/94-07bb5e451fb09996.js",revision:"07bb5e451fb09996"},{url:"/_next/static/chunks/a0c7cec5.6a585e977326c6e8.js",revision:"6a585e977326c6e8"},{url:"/_next/static/chunks/d3048c20-b53dc60cd006f7b9.js",revision:"b53dc60cd006f7b9"},{url:"/_next/static/chunks/ed9a0b66-35f1faa694fb0c44.js",revision:"35f1faa694fb0c44"},{url:"/_next/static/chunks/framework-5afa2ef135764b3c.js",revision:"5afa2ef135764b3c"},{url:"/_next/static/chunks/main-4117cc0040217022.js",revision:"4117cc0040217022"},{url:"/_next/static/chunks/pages/404-0c0f03f06ef1979e.js",revision:"0c0f03f06ef1979e"},{url:"/_next/static/chunks/pages/_app-13d1ee6a33fa59b3.js",revision:"13d1ee6a33fa59b3"},{url:"/_next/static/chunks/pages/_error-3f6d1c55bb8051ab.js",revision:"3f6d1c55bb8051ab"},{url:"/_next/static/chunks/pages/_offline-f55392a06fc583f6.js",revision:"f55392a06fc583f6"},{url:"/_next/static/chunks/pages/about-049696688d57dff3.js",revision:"049696688d57dff3"},{url:"/_next/static/chunks/pages/blog-342ff9e68ea08be0.js",revision:"342ff9e68ea08be0"},{url:"/_next/static/chunks/pages/blog/posts/%5Bslug%5D-bba3d3b7c777c359.js",revision:"bba3d3b7c777c359"},{url:"/_next/static/chunks/pages/dashboard-eb1951f66c079383.js",revision:"eb1951f66c079383"},{url:"/_next/static/chunks/pages/feed.xml-ed13381bb590edaa.js",revision:"ed13381bb590edaa"},{url:"/_next/static/chunks/pages/guestbook-4c520a04b9ced04f.js",revision:"4c520a04b9ced04f"},{url:"/_next/static/chunks/pages/index-262a4c54a3137f6e.js",revision:"262a4c54a3137f6e"},{url:"/_next/static/chunks/pages/sitemap.xml-76ee271f58afef53.js",revision:"76ee271f58afef53"},{url:"/_next/static/chunks/pages/studio/%5B%5B...index%5D%5D-a3ec51698a9503d4.js",revision:"a3ec51698a9503d4"},{url:"/_next/static/chunks/pages/uses-9ff4e107749645de.js",revision:"9ff4e107749645de"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-ad2da3c26f5ec50c.js",revision:"ad2da3c26f5ec50c"},{url:"/_next/static/css/5caa00a4ebc9dc5f.css",revision:"5caa00a4ebc9dc5f"},{url:"/_next/static/css/cb746b42c66fd378.css",revision:"cb746b42c66fd378"},{url:"/_next/static/media/Inter-Bold.b1234477.woff",revision:"b1234477"},{url:"/_next/static/media/break_iterator.819c05c7.wasm",revision:"819c05c7"},{url:"/_next/static/qGoYQZcxqM9vNY2p6qKvo/_buildManifest.js",revision:"f6e91a78d81b143b2cd8fd73367d440c"},{url:"/_next/static/qGoYQZcxqM9vNY2p6qKvo/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_offline",revision:"qGoYQZcxqM9vNY2p6qKvo"},{url:"/avatar-bw.jpg",revision:"3e7bbd1cbf36dda4348da0bf6bb58cca"},{url:"/avatar.jpg",revision:"3e7bbd1cbf36dda4348da0bf6bb58cca"},{url:"/banner.png",revision:"e79a17d345a10b5bd3b31dd6ad2e0c6f"},{url:"/break_iterator.wasm",revision:"3bde9eef9b092951f07c3ff47422997a"},{url:"/google7d641c813b4f273a.html",revision:"6a68d2965e353c76c562111c6b5cfc8d"},{url:"/locales/el/404.json",revision:"f8e20e28cd74d5378e966b5700689e8c"},{url:"/locales/el/about.json",revision:"f6716bb641173b474cc42ff7029881f9"},{url:"/locales/el/blog.json",revision:"4b1c619835180c4464352634e49f2e86"},{url:"/locales/el/blog_post.json",revision:"8a80554c91d9fca8acb82f023de02f11"},{url:"/locales/el/common.json",revision:"fd965c51a7f8ce0787274c1f49ab586d"},{url:"/locales/el/dashboard.json",revision:"29828cdd979bc904b87685b1d2df6ace"},{url:"/locales/el/guestbook.json",revision:"48d2dcd0eab682f898199a82850570e7"},{url:"/locales/el/index.json",revision:"5b10c852ae6b51335b34767a8a875fcb"},{url:"/locales/el/offline.json",revision:"ddfe05678219f78790c585a22d944070"},{url:"/locales/el/uses.json",revision:"e69fa0d8f4c5c9d4b3f2b6f381f7a8ad"},{url:"/locales/en/404.json",revision:"cfd0feda3583a0b7e69cdb6b8855f4e6"},{url:"/locales/en/about.json",revision:"6ee489f9d3feaf7912fa9c16d3e7956c"},{url:"/locales/en/blog.json",revision:"bfd20c29826d205a1e3e01bb6476a315"},{url:"/locales/en/blog_post.json",revision:"8a80554c91d9fca8acb82f023de02f11"},{url:"/locales/en/common.json",revision:"ca0d0fcfe6dd7d2a46b590e162917e97"},{url:"/locales/en/dashboard.json",revision:"5c215e35893ab9ccfbe3e1e8dc728606"},{url:"/locales/en/guestbook.json",revision:"3af63e10f62ce5aee60e0f1b73f68fb0"},{url:"/locales/en/index.json",revision:"df0a6ec9f9c28e217ac673329fe5a16a"},{url:"/locales/en/offline.json",revision:"bb98430ecc0233a231ed779009ee7a33"},{url:"/locales/en/uses.json",revision:"03f2a0a3dfa64d136473845e5f2a02c2"},{url:"/manifest.json",revision:"874f23f99bfc4668a560b3849d0a7de0"},{url:"/robots.txt",revision:"c23481c73bceb4e669d00c4c4cb7e7f0"},{url:"/static/favicons/android-chrome-192x192.png",revision:"f1f3a7b73ed3be88cd1821f541d37806"},{url:"/static/favicons/android-chrome-256x256.png",revision:"ec2e099603eca2442040f631d09f5bd5"},{url:"/static/favicons/android-chrome-384x384.png",revision:"ec2341ee099e9223a388bfa9704579c2"},{url:"/static/favicons/android-chrome-48x48.png",revision:"ca3c4fb3b216d1f959a994409e9760d2"},{url:"/static/favicons/android-chrome-512x512.png",revision:"d45a84898a04c4ef7d9a171119d43edc"},{url:"/static/favicons/apple-touch-icon.png",revision:"0fd92d28d953e2ce30837414350e8428"},{url:"/static/favicons/browserconfig.xml",revision:"8343ca3d3026131795260fe20220a306"},{url:"/static/favicons/favicon-16x16.png",revision:"daeaf4f303907e24538233e0dd866a6d"},{url:"/static/favicons/favicon-32x32.png",revision:"26a13b3ade0e28c4f4af58e55e9a4e6d"},{url:"/static/favicons/favicon.ico",revision:"8b841e6b78cf9651629d00b9ea721950"},{url:"/static/favicons/mstile-150x150.png",revision:"acf4ede3a82aead096c44b65d80ccc23"},{url:"/static/favicons/safari-pinned-tab.svg",revision:"16e6a248d6ccfbd26bfd95033b590f4f"},{url:"/static/favicons/site.webmanifest",revision:"8b1007d2bf0b1eb0dce941e83833b8f5"},{url:"/static/images/github.png",revision:"0ba2aa20e2c2ce80e9a2db5b07198464"},{url:"/static/images/offline.png",revision:"8aefb0eb57180a33b04081579a998f81"},{url:"/static/images/setup.png",revision:"dc2e87ef319d8de8b4a02191aec793d6"},{url:"/static/images/vasilis-banner.jpg",revision:"5867996ab3c67c2b4f27334668327a1b"},{url:"/vasilistotskas.pdf",revision:"a96ef7857c04cdecad7ca6bc49993091"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET")}));
