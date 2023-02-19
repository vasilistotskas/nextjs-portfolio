import { useState } from 'react'

function ReadMore({ text, maxChars = 110 }) {
	const [showFullText, setShowFullText] = useState(false)

	const trimmedText = text.length > maxChars ? `${text.slice(0, maxChars)}...` : text

	const toggleFullText = () => {
		setShowFullText(!showFullText)
	}

	return (
		<>
			<p
				className={`${
					!showFullText ? 'cropped' : ''
				} col-full-column row-second-row text-sm`}
			>
				{showFullText ? text : trimmedText}
				{text.length > maxChars && (
					<button
						onClick={toggleFullText}
						className="my-2 grid h-6 w-24 items-center justify-center rounded bg-gray-200 text-sm text-gray-900 dark:bg-gray-700 dark:text-gray-100"
						aria-label="Read more"
						type="button"
					>
						{showFullText ? 'Read less' : 'Read more'}
					</button>
				)}
			</p>
		</>
	)
}

export default ReadMore
