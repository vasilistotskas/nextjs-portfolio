import { type NextRequest } from 'next/server'

export const config = {
    runtime: 'experimental-edge'
}

export default async function handler(req: NextRequest) {
    const userResponse = await fetch('https://api.github.com/users/vasilistotskas')
    const userReposResponse = await fetch(
        'https://api.github.com/users/vasilistotskas/repos?per_page=100'
    )

    const user = await userResponse.json()
    const repositories = await userReposResponse.json()

    if (!Array.isArray(repositories)) {
        return new Response('Not found', { status: 404 })
    }

    const mine = repositories.filter((repo) => !repo.fork)
    const stars = mine.reduce((accumulator, repository) => {
        return accumulator + repository['stargazers_count']
    }, 0)

    return new Response(
        JSON.stringify({
            followers: user.followers,
            stars
        }),
        {
            status: 200,
            headers: {
                'content-type': 'application/json',
                'cache-control':
                    'public, s-maxage=1200, stale-while-revalidate=600'
            }
        }
    )
}
