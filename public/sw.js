if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let r={};const t=e=>a(e,i),d={module:{uri:i},exports:r,require:t};s[i]=Promise.all(c.map((e=>d[e]||t(e)))).then((e=>(n(...e),r)))}}define(["./workbox-80ca14c3"],(function(e){"use strict";importScripts("fallback-o1-L8z1R4ccX8ZcOIE5MA.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Inter-Bold.woff",revision:"99a0d9a7e4c99c17bfdd94a22a5cf94e"},{url:"/_next/static/chunks/093ddbe2-9e079cabf031e479.js",revision:"9e079cabf031e479"},{url:"/_next/static/chunks/1265-00f4215a09d1bfe2.js",revision:"00f4215a09d1bfe2"},{url:"/_next/static/chunks/1704.f6857d8db7fd54e4.js",revision:"f6857d8db7fd54e4"},{url:"/_next/static/chunks/1851.820f5584967eb801.js",revision:"820f5584967eb801"},{url:"/_next/static/chunks/2818.695d72cce57d96c2.js",revision:"695d72cce57d96c2"},{url:"/_next/static/chunks/32cf5887-e392cffb651d2b5d.js",revision:"e392cffb651d2b5d"},{url:"/_next/static/chunks/42862b1a.4a89a9ef2bbc33e5.js",revision:"4a89a9ef2bbc33e5"},{url:"/_next/static/chunks/4437-c37d9027b450ef28.js",revision:"c37d9027b450ef28"},{url:"/_next/static/chunks/4557.7cf6ec9a524b407f.js",revision:"7cf6ec9a524b407f"},{url:"/_next/static/chunks/5162.ea2dd3871c637865.js",revision:"ea2dd3871c637865"},{url:"/_next/static/chunks/5206.0aa3a4c33b875b50.js",revision:"0aa3a4c33b875b50"},{url:"/_next/static/chunks/5236.e555ea0b97cb22a6.js",revision:"e555ea0b97cb22a6"},{url:"/_next/static/chunks/5682.a6a4815ae8a25218.js",revision:"a6a4815ae8a25218"},{url:"/_next/static/chunks/5808-fbe0cd48c22a03b1.js",revision:"fbe0cd48c22a03b1"},{url:"/_next/static/chunks/5971.7c29d812c5038a0d.js",revision:"7c29d812c5038a0d"},{url:"/_next/static/chunks/5986-61ec95da905a700e.js",revision:"61ec95da905a700e"},{url:"/_next/static/chunks/6050.cf2e31172c2d9c50.js",revision:"cf2e31172c2d9c50"},{url:"/_next/static/chunks/6267-b08edf75cde7e7fb.js",revision:"b08edf75cde7e7fb"},{url:"/_next/static/chunks/6353-226123de9db29b10.js",revision:"226123de9db29b10"},{url:"/_next/static/chunks/669ae080-79044dde19391c78.js",revision:"79044dde19391c78"},{url:"/_next/static/chunks/6c98c9ec-0d8cb77295c6e82f.js",revision:"0d8cb77295c6e82f"},{url:"/_next/static/chunks/7943.ddba18a252b34dde.js",revision:"ddba18a252b34dde"},{url:"/_next/static/chunks/8079.6f546c26adacb79d.js",revision:"6f546c26adacb79d"},{url:"/_next/static/chunks/8381.5845681914bcdd38.js",revision:"5845681914bcdd38"},{url:"/_next/static/chunks/8507.180b7e766ae9751a.js",revision:"180b7e766ae9751a"},{url:"/_next/static/chunks/88149a5d.738e15a99b431b6a.js",revision:"738e15a99b431b6a"},{url:"/_next/static/chunks/9248-80d1d264077d72ad.js",revision:"80d1d264077d72ad"},{url:"/_next/static/chunks/9325.f7f856c915ea3f57.js",revision:"f7f856c915ea3f57"},{url:"/_next/static/chunks/95-ba8d83da7eb37f7f.js",revision:"ba8d83da7eb37f7f"},{url:"/_next/static/chunks/9619-720eb83dc20730e8.js",revision:"720eb83dc20730e8"},{url:"/_next/static/chunks/9797.828c7008cda1000b.js",revision:"828c7008cda1000b"},{url:"/_next/static/chunks/cad08e81.cb5abeb830917627.js",revision:"cb5abeb830917627"},{url:"/_next/static/chunks/d3a2d874-baf47057129fb2d6.js",revision:"baf47057129fb2d6"},{url:"/_next/static/chunks/e7d9872f-aea56df47918aeb2.js",revision:"aea56df47918aeb2"},{url:"/_next/static/chunks/f84de8a4-5c7aae5c080c866a.js",revision:"5c7aae5c080c866a"},{url:"/_next/static/chunks/framework-4ad435e45b04a164.js",revision:"4ad435e45b04a164"},{url:"/_next/static/chunks/main-340a32331c96b1b1.js",revision:"340a32331c96b1b1"},{url:"/_next/static/chunks/pages/404-4d02b449ed06386c.js",revision:"4d02b449ed06386c"},{url:"/_next/static/chunks/pages/_app-44a90dc1b3a944b6.js",revision:"44a90dc1b3a944b6"},{url:"/_next/static/chunks/pages/_error-8b422dcabb469216.js",revision:"8b422dcabb469216"},{url:"/_next/static/chunks/pages/_offline-387dff3a2f03d4b7.js",revision:"387dff3a2f03d4b7"},{url:"/_next/static/chunks/pages/about-e050347e84b5f941.js",revision:"e050347e84b5f941"},{url:"/_next/static/chunks/pages/blog-e52234744964b697.js",revision:"e52234744964b697"},{url:"/_next/static/chunks/pages/blog/posts/%5Bslug%5D-4834cda8c550b624.js",revision:"4834cda8c550b624"},{url:"/_next/static/chunks/pages/dashboard-16454c58e7d5def8.js",revision:"16454c58e7d5def8"},{url:"/_next/static/chunks/pages/feed.xml-7c0c4280e95e9a3e.js",revision:"7c0c4280e95e9a3e"},{url:"/_next/static/chunks/pages/guestbook-dc5473f7f3648ba7.js",revision:"dc5473f7f3648ba7"},{url:"/_next/static/chunks/pages/index-48d804c407a77e29.js",revision:"48d804c407a77e29"},{url:"/_next/static/chunks/pages/sitemap.xml-6d71b5b21563f166.js",revision:"6d71b5b21563f166"},{url:"/_next/static/chunks/pages/studio/%5B%5B...index%5D%5D-41bbfa64d761be6e.js",revision:"41bbfa64d761be6e"},{url:"/_next/static/chunks/pages/uses-c939a6a158994622.js",revision:"c939a6a158994622"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-e4abc4826fe9d5e8.js",revision:"e4abc4826fe9d5e8"},{url:"/_next/static/css/32048deba51ec5aa.css",revision:"32048deba51ec5aa"},{url:"/_next/static/css/35f6a16ef7b3d1ba.css",revision:"35f6a16ef7b3d1ba"},{url:"/_next/static/media/Inter-Bold.b1234477.woff",revision:"b1234477"},{url:"/_next/static/media/break_iterator.819c05c7.wasm",revision:"819c05c7"},{url:"/_next/static/o1-L8z1R4ccX8ZcOIE5MA/_buildManifest.js",revision:"810a73c75696cd6aafe58c78a1191688"},{url:"/_next/static/o1-L8z1R4ccX8ZcOIE5MA/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_offline",revision:"o1-L8z1R4ccX8ZcOIE5MA"},{url:"/avatar-bw.jpg",revision:"3e7bbd1cbf36dda4348da0bf6bb58cca"},{url:"/avatar.jpg",revision:"3e7bbd1cbf36dda4348da0bf6bb58cca"},{url:"/banner.png",revision:"e79a17d345a10b5bd3b31dd6ad2e0c6f"},{url:"/break_iterator.wasm",revision:"3bde9eef9b092951f07c3ff47422997a"},{url:"/google7d641c813b4f273a.html",revision:"6a68d2965e353c76c562111c6b5cfc8d"},{url:"/locales/el/404.json",revision:"f8e20e28cd74d5378e966b5700689e8c"},{url:"/locales/el/about.json",revision:"f6716bb641173b474cc42ff7029881f9"},{url:"/locales/el/blog.json",revision:"4b1c619835180c4464352634e49f2e86"},{url:"/locales/el/blog_post.json",revision:"8a80554c91d9fca8acb82f023de02f11"},{url:"/locales/el/common.json",revision:"00f74afa143cc642ae4d8e07c9213340"},{url:"/locales/el/dashboard.json",revision:"29828cdd979bc904b87685b1d2df6ace"},{url:"/locales/el/guestbook.json",revision:"48d2dcd0eab682f898199a82850570e7"},{url:"/locales/el/index.json",revision:"7edf60121c055209d0e857fe06204d6c"},{url:"/locales/el/offline.json",revision:"ddfe05678219f78790c585a22d944070"},{url:"/locales/el/uses.json",revision:"e69fa0d8f4c5c9d4b3f2b6f381f7a8ad"},{url:"/locales/en/404.json",revision:"cfd0feda3583a0b7e69cdb6b8855f4e6"},{url:"/locales/en/about.json",revision:"6ee489f9d3feaf7912fa9c16d3e7956c"},{url:"/locales/en/blog.json",revision:"bfd20c29826d205a1e3e01bb6476a315"},{url:"/locales/en/blog_post.json",revision:"8a80554c91d9fca8acb82f023de02f11"},{url:"/locales/en/common.json",revision:"13ece082a048698712d3634b25d6d7db"},{url:"/locales/en/dashboard.json",revision:"5c215e35893ab9ccfbe3e1e8dc728606"},{url:"/locales/en/guestbook.json",revision:"3af63e10f62ce5aee60e0f1b73f68fb0"},{url:"/locales/en/index.json",revision:"fc0ac17bafcd9027d804fb2f226e195a"},{url:"/locales/en/offline.json",revision:"bb98430ecc0233a231ed779009ee7a33"},{url:"/locales/en/uses.json",revision:"03f2a0a3dfa64d136473845e5f2a02c2"},{url:"/manifest.json",revision:"874f23f99bfc4668a560b3849d0a7de0"},{url:"/robots.txt",revision:"cfb058b662edef47219d3e48904f885c"},{url:"/static/favicons/android-chrome-192x192.png",revision:"f1f3a7b73ed3be88cd1821f541d37806"},{url:"/static/favicons/android-chrome-256x256.png",revision:"ec2e099603eca2442040f631d09f5bd5"},{url:"/static/favicons/android-chrome-384x384.png",revision:"ec2341ee099e9223a388bfa9704579c2"},{url:"/static/favicons/android-chrome-48x48.png",revision:"ca3c4fb3b216d1f959a994409e9760d2"},{url:"/static/favicons/android-chrome-512x512.png",revision:"d45a84898a04c4ef7d9a171119d43edc"},{url:"/static/favicons/apple-touch-icon.png",revision:"0fd92d28d953e2ce30837414350e8428"},{url:"/static/favicons/browserconfig.xml",revision:"8343ca3d3026131795260fe20220a306"},{url:"/static/favicons/favicon-16x16.png",revision:"daeaf4f303907e24538233e0dd866a6d"},{url:"/static/favicons/favicon-32x32.png",revision:"26a13b3ade0e28c4f4af58e55e9a4e6d"},{url:"/static/favicons/favicon.ico",revision:"8b841e6b78cf9651629d00b9ea721950"},{url:"/static/favicons/mstile-150x150.png",revision:"acf4ede3a82aead096c44b65d80ccc23"},{url:"/static/favicons/safari-pinned-tab.svg",revision:"16e6a248d6ccfbd26bfd95033b590f4f"},{url:"/static/favicons/site.webmanifest",revision:"8b1007d2bf0b1eb0dce941e83833b8f5"},{url:"/static/images/github.png",revision:"0ba2aa20e2c2ce80e9a2db5b07198464"},{url:"/static/images/offline.png",revision:"8aefb0eb57180a33b04081579a998f81"},{url:"/static/images/setup.png",revision:"dc2e87ef319d8de8b4a02191aec793d6"},{url:"/static/images/vasilis-banner.jpg",revision:"5867996ab3c67c2b4f27334668327a1b"},{url:"/static/images/vasilis-banner.png",revision:"ec2bc821e2910ac8ebda29d1f35c4a49"},{url:"/vasilistotskas.pdf",revision:"a96ef7857c04cdecad7ca6bc49993091"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET")}));
