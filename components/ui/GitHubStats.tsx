import { useTranslations } from 'next-intl'
import { Star, Users, BookOpen } from 'lucide-react'
import type { GitHubStats as GitHubStatsType } from '@/lib/types'

async function fetchGitHubStats(): Promise<GitHubStatsType | null> {
	try {
		const res = await fetch(`https://api.github.com/users/vasilistotskas`, {
			headers: {
				Accept: 'application/vnd.github.v3+json',
				...(process.env.GITHUB_TOKEN
					? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
					: {})
			},
			next: { revalidate: 3600 }
		})
		const reposRes = await fetch(
			`https://api.github.com/users/vasilistotskas/repos?per_page=100`,
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

		if (!res.ok || !reposRes.ok) return null

		const user = (await res.json()) as { public_repos: number; followers: number }
		const repos = (await reposRes.json()) as Array<{ stargazers_count: number }>
		const stars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0)

		return { stars, followers: user.followers, repos: user.public_repos }
	} catch {
		return null
	}
}

function GitHubStatsContent({ stats }: { stats: GitHubStatsType | null }) {
	const t = useTranslations('github')

	if (!stats) {
		return <p className="text-terminal-muted font-mono text-sm">Stats unavailable</p>
	}

	const items = [
		{ icon: Star, label: t('stars'), value: stats.stars },
		{ icon: Users, label: t('followers'), value: stats.followers },
		{ icon: BookOpen, label: t('repos'), value: stats.repos }
	]

	return (
		<div className="font-mono">
			<p className="text-terminal-comment mb-3 text-xs">
				<span className="text-terminal-prompt">$ </span>
				gh api /users/vasilistotskas --jq &apos;.&apos;
			</p>
			<div className="grid grid-cols-3 gap-4">
				{items.map(({ icon: Icon, label, value }) => (
					<div key={label} className="text-center">
						<div className="mb-1 flex items-center justify-center">
							<Icon size={14} className="text-terminal-cyan" />
						</div>
						<p className="text-terminal-green text-lg font-bold">{value}</p>
						<p className="text-terminal-comment text-xs">{label}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default async function GitHubStats() {
	const stats = await fetchGitHubStats()
	return <GitHubStatsContent stats={stats} />
}
