import { useLiveQuery } from 'next-sanity/preview'
import { query, DocumentsCount } from 'components/sanity/DocumentsCount'

export default function PreviewDocumentsCount({ data: initialData }) {
	const [data, loading] = useLiveQuery(initialData, query)

	if (loading) {
		return <>Loading...</>
	}

	return <DocumentsCount data={data} />
}
