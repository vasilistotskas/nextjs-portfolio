export const query = `count(*[_type == "post"])`

export function DocumentsCount({ data }: { data: number }) {
	return <div>There are {data} documents</div>
}
