import { groq } from 'next-sanity'

const postFields = groq`
  _id,
  title,
  date,
  excerpt,
  coverImage,
  "slug": slug.current,
  "author": author->{name, picture},
`

export const settingsQuery = groq`*[_type == "settings"][0]`

export const indexQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`

export const postAndMoreStoriesQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${postFields}
  }
}`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`

export interface Author {
	name?: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	picture?: any
}

export interface Post {
	_id: string
	title?: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	coverImage?: any
	date?: string
	excerpt?: string
	author?: Author
	slug?: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	content?: any
}

export interface Settings {
	title?: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	description?: any[]
	ogImage?: {
		title?: string
	}
}
