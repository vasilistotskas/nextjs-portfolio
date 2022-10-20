import RSS from 'rss'

export async function getServerSideProps({ res }) {
	const feed = new RSS({
		title: 'Vasilis Totskas',
		site_url: 'https://vasilistotskas.com',
		feed_url: 'https://vasilistotskas.com/feed.xml'
	})

	res.setHeader('Content-Type', 'text/xml')
	res.setHeader('Cache-Control', 'public, s-maxage=1200, stale-while-revalidate=600')
	res.write(feed.xml({ indent: true }))
	res.end()

	return {
		props: {}
	}
}

export default function RSSFeed() {
	return null
}
