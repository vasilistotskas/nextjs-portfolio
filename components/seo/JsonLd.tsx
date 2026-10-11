/**
 * Structured data as a JSON-LD script. `JSON.stringify` leaves `<` alone, so a
 * string containing `</script>` would end the tag early; escaping it keeps the
 * payload inert whatever the messages contain.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
		/>
	)
}
