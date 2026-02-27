import { NextResponse } from 'next/server'

const GITHUB_USERNAME = 'vasilistotskas'

export async function GET() {
	try {
		const [userRes, reposRes] = await Promise.all([
			fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
				headers: {
					Accept: 'application/vnd.github.v3+json',
					...(process.env.GITHUB_TOKEN
						? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
						: {})
				},
				next: { revalidate: 3600 }
			}),
			fetch(
				`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
				{
					headers: {
						Accept: 'application/vnd.github.v3+json',
						...(process.env.GITHUB_TOKEN
							? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
							: {})
					},
					next: { revalidate: 3600 }
				}
			)
		])

		if (!userRes.ok || !reposRes.ok) {
			return NextResponse.json({ error: 'GitHub API error' }, { status: 502 })
		}

		const user = (await userRes.json()) as {
			public_repos: number
			followers: number
		}
		const repos = (await reposRes.json()) as Array<{ stargazers_count: number }>

		const stars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0)

		return NextResponse.json({
			stars,
			followers: user.followers,
			repos: user.public_repos
		})
	} catch (err) {
		console.error('GitHub route error:', err)
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	}
}
