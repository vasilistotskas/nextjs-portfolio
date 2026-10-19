// Shared by the contact form and its Server Action, so this module stays free of
// zod: the browser enforces these limits through HTML constraint attributes and
// only the server parses the schema.

export const contactFields = ['name', 'email', 'subject', 'message'] as const

export type ContactField = (typeof contactFields)[number]

/** Shortest accepted value per text field; the email field is checked by format. */
export const contactMinLength = { name: 2, subject: 3, message: 10 } as const

export type ContactValues = Record<ContactField, string>

export type ContactFormState =
	| { status: 'idle' }
	| { status: 'success' }
	// Both failure states carry the submitted values back: React resets a form's
	// uncontrolled fields after every action, so without them a failed send would
	// wipe what the visitor typed.
	| { status: 'invalid'; values: ContactValues; invalid: ContactField[] }
	| { status: 'error'; values: ContactValues }
