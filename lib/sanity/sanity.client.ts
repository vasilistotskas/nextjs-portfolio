import { projectId } from '@lib/sanity/sanity.api'
import {
	indexQuery,
	type Post,
	postAndMoreStoriesQuery,
	postBySlugQuery,
	postSlugsQuery,
	type Settings,
	settingsQuery
} from '@lib/sanity/sanity.queries'
import { createClient } from 'next-sanity'

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
export const client = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
	apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-08-24',
	useCdn: false,
	perspective: 'published'
})

export async function getSettings(): Promise<Settings> {
	if (client) {
		return (await client.fetch(settingsQuery)) || {}
	}
	return {}
}

export async function getAllPosts(): Promise<Post[]> {
	if (client) {
		return (await client.fetch(indexQuery)) || []
	}
	return []
}

export async function getAllPostsSlugs(): Promise<Pick<Post, 'slug'>[]> {
	if (client) {
		const slugs = (await client.fetch<string[]>(postSlugsQuery)) || []
		return slugs.map((slug) => ({ slug }))
	}
	return []
}

export async function getPostBySlug(slug: string): Promise<Post> {
	if (client) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return (await client.fetch(postBySlugQuery, { slug })) || ({} as any)
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return {} as any
}

export async function getPostAndMoreStories(
	slug: string
): Promise<{ post: Post; morePosts: Post[] }> {
	if (projectId) {
		return await client.fetch(postAndMoreStoriesQuery, { slug })
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return { post: {} as any, morePosts: [] }
}
