export default async function fetcher<JSON = void>(
	input: RequestInfo,
	init?: RequestInit
): Promise<JSON> {
	const res = await fetch(input, init)
	return res.json()
}
