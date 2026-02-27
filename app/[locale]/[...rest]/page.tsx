import { notFound } from 'next/navigation'

// Catch-all route — triggers [locale]/not-found.tsx within the locale layout
export default function CatchAll() {
	notFound()
}
