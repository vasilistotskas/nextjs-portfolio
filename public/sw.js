if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let r={};const t=e=>a(e,i),d={module:{uri:i},exports:r,require:t};s[i]=Promise.all(c.map((e=>d[e]||t(e)))).then((e=>(n(...e),r)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts("fallback-RdhgJRGEVxz5mGU3KwQSv.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Inter-Bold.woff",revision:"99a0d9a7e4c99c17bfdd94a22a5cf94e"},{url:"/_next/static/RdhgJRGEVxz5mGU3KwQSv/_buildManifest.js",revision:"ce29d3e0df304efad5f758a12fed3927"},{url:"/_next/static/RdhgJRGEVxz5mGU3KwQSv/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/09b4c045.5ac36b7297e30fef.js",revision:"5ac36b7297e30fef"},{url:"/_next/static/chunks/124.a25a11b7b20d74b1.js",revision:"a25a11b7b20d74b1"},{url:"/_next/static/chunks/245.6fd97d65bf5dc666.js",revision:"6fd97d65bf5dc666"},{url:"/_next/static/chunks/256.dc9813dffa87da35.js",revision:"dc9813dffa87da35"},{url:"/_next/static/chunks/280-1241a81543b16ab8.js",revision:"1241a81543b16ab8"},{url:"/_next/static/chunks/29107295-99d6b2d20ce997ac.js",revision:"99d6b2d20ce997ac"},{url:"/_next/static/chunks/298-84003e5f7df62d6a.js",revision:"84003e5f7df62d6a"},{url:"/_next/static/chunks/3.99d8d12bb55dcc6c.js",revision:"99d8d12bb55dcc6c"},{url:"/_next/static/chunks/316.95f8d35ccf365441.js",revision:"95f8d35ccf365441"},{url:"/_next/static/chunks/391-e9413d417ab6ce42.js",revision:"e9413d417ab6ce42"},{url:"/_next/static/chunks/43-12949a2b4d29ff69.js",revision:"12949a2b4d29ff69"},{url:"/_next/static/chunks/462.a7bc16e6505a9e5d.js",revision:"a7bc16e6505a9e5d"},{url:"/_next/static/chunks/467.c398374833094ced.js",revision:"c398374833094ced"},{url:"/_next/static/chunks/480.a60a6efe407d0a5d.js",revision:"a60a6efe407d0a5d"},{url:"/_next/static/chunks/4ad82c5e.2d0384924df28ea8.js",revision:"2d0384924df28ea8"},{url:"/_next/static/chunks/5082709c-f1aa81e6b3f2edb0.js",revision:"f1aa81e6b3f2edb0"},{url:"/_next/static/chunks/525-8fe7c79c17a08634.js",revision:"8fe7c79c17a08634"},{url:"/_next/static/chunks/53adca4f-7240d524a8e666a4.js",revision:"7240d524a8e666a4"},{url:"/_next/static/chunks/591-d4a062b8690f1129.js",revision:"d4a062b8690f1129"},{url:"/_next/static/chunks/633-19dc38a97bfa70dd.js",revision:"19dc38a97bfa70dd"},{url:"/_next/static/chunks/699.62da987e69ab5e07.js",revision:"62da987e69ab5e07"},{url:"/_next/static/chunks/702-770b0acdf34c5a67.js",revision:"770b0acdf34c5a67"},{url:"/_next/static/chunks/746-0e677d953336d698.js",revision:"0e677d953336d698"},{url:"/_next/static/chunks/750.e9fd152f55ce54ea.js",revision:"e9fd152f55ce54ea"},{url:"/_next/static/chunks/75fc9c18-3392ba707c4fed97.js",revision:"3392ba707c4fed97"},{url:"/_next/static/chunks/801.8fb6f250e831b77f.js",revision:"8fb6f250e831b77f"},{url:"/_next/static/chunks/813.01d37893bb6b860a.js",revision:"01d37893bb6b860a"},{url:"/_next/static/chunks/877.a08a768de80ec54b.js",revision:"a08a768de80ec54b"},{url:"/_next/static/chunks/953.e43f5b684d43bfe5.js",revision:"e43f5b684d43bfe5"},{url:"/_next/static/chunks/a0c7cec5.8a246cb701922c8d.js",revision:"8a246cb701922c8d"},{url:"/_next/static/chunks/d3048c20-b53dc60cd006f7b9.js",revision:"b53dc60cd006f7b9"},{url:"/_next/static/chunks/e6470e40.3bcff51503cd1503.js",revision:"3bcff51503cd1503"},{url:"/_next/static/chunks/ed9a0b66-35f1faa694fb0c44.js",revision:"35f1faa694fb0c44"},{url:"/_next/static/chunks/framework-503640d9f9f7b35d.js",revision:"503640d9f9f7b35d"},{url:"/_next/static/chunks/main-3dcd8caebbccd622.js",revision:"3dcd8caebbccd622"},{url:"/_next/static/chunks/pages/404-03d3db428f48a9f6.js",revision:"03d3db428f48a9f6"},{url:"/_next/static/chunks/pages/_app-05eda9a339d8417b.js",revision:"05eda9a339d8417b"},{url:"/_next/static/chunks/pages/_error-3f6d1c55bb8051ab.js",revision:"3f6d1c55bb8051ab"},{url:"/_next/static/chunks/pages/_offline-619d3f6c29edb270.js",revision:"619d3f6c29edb270"},{url:"/_next/static/chunks/pages/about-cf42adfdf7f881a0.js",revision:"cf42adfdf7f881a0"},{url:"/_next/static/chunks/pages/blog-918bf90b39e04481.js",revision:"918bf90b39e04481"},{url:"/_next/static/chunks/pages/blog/posts/%5Bslug%5D-c3a28162bab15426.js",revision:"c3a28162bab15426"},{url:"/_next/static/chunks/pages/dashboard-72ebc4140b4c848e.js",revision:"72ebc4140b4c848e"},{url:"/_next/static/chunks/pages/feed.xml-ed13381bb590edaa.js",revision:"ed13381bb590edaa"},{url:"/_next/static/chunks/pages/guestbook-7ca142d7a034eec9.js",revision:"7ca142d7a034eec9"},{url:"/_next/static/chunks/pages/index-81bfa21371c0e3ea.js",revision:"81bfa21371c0e3ea"},{url:"/_next/static/chunks/pages/sitemap.xml-76ee271f58afef53.js",revision:"76ee271f58afef53"},{url:"/_next/static/chunks/pages/studio/%5B%5B...index%5D%5D-e2f57fa91313e31e.js",revision:"e2f57fa91313e31e"},{url:"/_next/static/chunks/pages/uses-02eacbc0a3082b06.js",revision:"02eacbc0a3082b06"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-17cba947bf68a6a9.js",revision:"17cba947bf68a6a9"},{url:"/_next/static/css/5caa00a4ebc9dc5f.css",revision:"5caa00a4ebc9dc5f"},{url:"/_next/static/css/cb746b42c66fd378.css",revision:"cb746b42c66fd378"},{url:"/_next/static/media/Inter-Bold.b1234477.woff",revision:"b1234477"},{url:"/_next/static/media/break_iterator.819c05c7.wasm",revision:"819c05c7"},{url:"/_offline",revision:"RdhgJRGEVxz5mGU3KwQSv"},{url:"/avatar-bw.jpg",revision:"3e7bbd1cbf36dda4348da0bf6bb58cca"},{url:"/avatar.jpg",revision:"3e7bbd1cbf36dda4348da0bf6bb58cca"},{url:"/banner.png",revision:"e79a17d345a10b5bd3b31dd6ad2e0c6f"},{url:"/break_iterator.wasm",revision:"3bde9eef9b092951f07c3ff47422997a"},{url:"/google7d641c813b4f273a.html",revision:"6a68d2965e353c76c562111c6b5cfc8d"},{url:"/locales/el/404.json",revision:"f8e20e28cd74d5378e966b5700689e8c"},{url:"/locales/el/about.json",revision:"f6716bb641173b474cc42ff7029881f9"},{url:"/locales/el/blog.json",revision:"4b1c619835180c4464352634e49f2e86"},{url:"/locales/el/blog_post.json",revision:"8a80554c91d9fca8acb82f023de02f11"},{url:"/locales/el/common.json",revision:"fd965c51a7f8ce0787274c1f49ab586d"},{url:"/locales/el/dashboard.json",revision:"29828cdd979bc904b87685b1d2df6ace"},{url:"/locales/el/guestbook.json",revision:"48d2dcd0eab682f898199a82850570e7"},{url:"/locales/el/index.json",revision:"7edf60121c055209d0e857fe06204d6c"},{url:"/locales/el/offline.json",revision:"ddfe05678219f78790c585a22d944070"},{url:"/locales/el/uses.json",revision:"e69fa0d8f4c5c9d4b3f2b6f381f7a8ad"},{url:"/locales/en/404.json",revision:"cfd0feda3583a0b7e69cdb6b8855f4e6"},{url:"/locales/en/about.json",revision:"6ee489f9d3feaf7912fa9c16d3e7956c"},{url:"/locales/en/blog.json",revision:"bfd20c29826d205a1e3e01bb6476a315"},{url:"/locales/en/blog_post.json",revision:"8a80554c91d9fca8acb82f023de02f11"},{url:"/locales/en/common.json",revision:"ca0d0fcfe6dd7d2a46b590e162917e97"},{url:"/locales/en/dashboard.json",revision:"5c215e35893ab9ccfbe3e1e8dc728606"},{url:"/locales/en/guestbook.json",revision:"3af63e10f62ce5aee60e0f1b73f68fb0"},{url:"/locales/en/index.json",revision:"fc0ac17bafcd9027d804fb2f226e195a"},{url:"/locales/en/offline.json",revision:"bb98430ecc0233a231ed779009ee7a33"},{url:"/locales/en/uses.json",revision:"03f2a0a3dfa64d136473845e5f2a02c2"},{url:"/manifest.json",revision:"874f23f99bfc4668a560b3849d0a7de0"},{url:"/robots.txt",revision:"c23481c73bceb4e669d00c4c4cb7e7f0"},{url:"/static/favicons/android-chrome-192x192.png",revision:"f1f3a7b73ed3be88cd1821f541d37806"},{url:"/static/favicons/android-chrome-256x256.png",revision:"ec2e099603eca2442040f631d09f5bd5"},{url:"/static/favicons/android-chrome-384x384.png",revision:"ec2341ee099e9223a388bfa9704579c2"},{url:"/static/favicons/android-chrome-48x48.png",revision:"ca3c4fb3b216d1f959a994409e9760d2"},{url:"/static/favicons/android-chrome-512x512.png",revision:"d45a84898a04c4ef7d9a171119d43edc"},{url:"/static/favicons/apple-touch-icon.png",revision:"0fd92d28d953e2ce30837414350e8428"},{url:"/static/favicons/browserconfig.xml",revision:"8343ca3d3026131795260fe20220a306"},{url:"/static/favicons/favicon-16x16.png",revision:"daeaf4f303907e24538233e0dd866a6d"},{url:"/static/favicons/favicon-32x32.png",revision:"26a13b3ade0e28c4f4af58e55e9a4e6d"},{url:"/static/favicons/favicon.ico",revision:"8b841e6b78cf9651629d00b9ea721950"},{url:"/static/favicons/mstile-150x150.png",revision:"acf4ede3a82aead096c44b65d80ccc23"},{url:"/static/favicons/safari-pinned-tab.svg",revision:"16e6a248d6ccfbd26bfd95033b590f4f"},{url:"/static/favicons/site.webmanifest",revision:"8b1007d2bf0b1eb0dce941e83833b8f5"},{url:"/static/images/github.png",revision:"0ba2aa20e2c2ce80e9a2db5b07198464"},{url:"/static/images/offline.png",revision:"8aefb0eb57180a33b04081579a998f81"},{url:"/static/images/setup.png",revision:"dc2e87ef319d8de8b4a02191aec793d6"},{url:"/static/images/vasilis-banner.jpg",revision:"5867996ab3c67c2b4f27334668327a1b"},{url:"/static/images/vasilis-banner.png",revision:"ec2bc821e2910ac8ebda29d1f35c4a49"},{url:"/vasilistotskas.pdf",revision:"a96ef7857c04cdecad7ca6bc49993091"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET")}));
