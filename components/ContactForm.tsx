import React, { useState } from 'react'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

export default function ContactUs() {
	// States for contact form fields
	const { t } = useTranslation('common')
	const [fullName, setFullName] = useState('')
	const [email, setEmail] = useState('')
	const [subject, setSubject] = useState('')
	const [message, setMessage] = useState('')

	//   Form validation state
	const [errors, setErrors] = useState({})

	//   Setting button text on form submission
	const [buttonText, setButtonText] = useState(t('contact.form.submit', { ns: 'common' }))

	// Setting success or failure messages states
	const [showSuccessMessage, setShowSuccessMessage] = useState(false)
	const [showFailureMessage, setShowFailureMessage] = useState(false)

	// Set Response message
	const [responseMessage, setResponseMessage] = useState('')

	// Validation check method
	const handleValidation = () => {
		const tempErrors = {}
		let isValid = true

		if (fullName.length <= 0) {
			tempErrors['fullName'] = true
			isValid = false
		}
		if (email.length <= 0) {
			tempErrors['email'] = true
			isValid = false
		}
		if (subject.length <= 0) {
			tempErrors['subject'] = true
			isValid = false
		}
		if (message.length <= 0) {
			tempErrors['message'] = true
			isValid = false
		}

		setErrors({ ...tempErrors })
		console.log('errors', errors)
		return isValid
	}

	//   Handling form submit
	const handleSubmit = async (e) => {
		e.preventDefault()

		const isValidForm = handleValidation()

		if (isValidForm) {
			setButtonText(t('contact.form.sending', { ns: 'common' }))
			const res = await fetch('/api/sendgrid', {
				body: JSON.stringify({
					email: email,
					fullName: fullName,
					subject: subject,
					message: message
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
			})

			const { error } = await res.json()
			if (error) {
				console.log(error)
				setShowSuccessMessage(false)
				setShowFailureMessage(true)
				setResponseMessage(`${t('contact.form.error', { ns: 'common' })} 😔`)
				setButtonText('Send')
				return
			}
			setShowSuccessMessage(true)
			setShowFailureMessage(false)
			setResponseMessage(`${t('contact.subtitle', { ns: 'common' })} 😊`)
			setButtonText('Send')
		}
		console.log(fullName, email, subject, message)
	}
	return (
		<section>
			<form
				className="body-font prose relative mx-auto mb-8 flex w-full max-w-2xl flex-col items-start justify-center dark:prose-dark"
				onSubmit={handleSubmit}
			>
				<div className="mx-auto my-4 mb-16 flex w-full max-w-2xl flex-col items-start justify-center rounded border border-blue-200 bg-gray-100 p-6 dark:border-gray-800 dark:bg-gray-900">
					<div className="mb-2 flex w-full flex-col text-center">
						<h2 className="mb-2 mt-2 flex items-center justify-center gap-2 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
							<Image
								alt={`Contact Me`}
								src={`https://img.icons8.com/doodle/48/000000/newsletter.png`}
								width={48}
								height={48}
								priority
							/>
							{t('contact.title', { ns: 'common' })}
						</h2>
					</div>
					<div className="grid">
						<div className="-m-2 flex flex-wrap content-center items-center justify-center">
							<div className="w-full p-2 sm:w-1/3">
								<div className="relative">
									<label
										htmlFor="fullName"
										className="w-full text-lg font-medium text-gray-800 dark:text-gray-100"
									>
										{t('contact.form.name', { ns: 'common' })}
									</label>
									<input
										id="fullName"
										type="text"
										name="fullName"
										value={fullName}
										onChange={(e) => {
											setFullName(e.target.value)
										}}
										required={true}
										className="w-full rounded border border-gray-300 bg-gray-100 py-1 px-3 text-base leading-8 text-black outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500"
									/>
								</div>
							</div>
							<div className="w-full p-2 sm:w-1/3">
								<div className="relative">
									<label
										htmlFor="email"
										className="w-full text-lg font-medium text-gray-800 dark:text-gray-100"
									>
										{t('contact.form.email', { ns: 'common' })}
									</label>
									<input
										id="email"
										type="email"
										name="email"
										value={email}
										onChange={(e) => {
											setEmail(e.target.value)
										}}
										required={true}
										className="w-full rounded border border-gray-300 bg-gray-100 py-1 px-3 text-base leading-8 text-black outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500"
									/>
								</div>
							</div>
							<div className="w-full p-2 sm:w-8/12">
								<div className="relative">
									<label
										htmlFor="subject"
										className="w-full text-lg font-medium text-gray-800 dark:text-gray-100"
									>
										{t('contact.form.subject', { ns: 'common' })}
									</label>
									<input
										id="subject"
										type="text"
										name="subject"
										value={subject}
										onChange={(e) => {
											setSubject(e.target.value)
										}}
										required={true}
										className="w-full rounded border border-gray-300 bg-gray-100 py-1 px-3 text-base leading-8 text-black outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500"
									></input>
								</div>
							</div>
							<div className="w-full p-2 sm:w-8/12">
								<div className="relative">
									<label
										htmlFor="message"
										className="w-full text-lg font-medium text-gray-800 dark:text-gray-100"
									>
										{t('contact.form.message', { ns: 'common' })}
									</label>
									<textarea
										id="message"
										name="message"
										value={message}
										onChange={(e) => {
											setMessage(e.target.value)
										}}
										required={true}
										className="h-32 w-full resize-none rounded border border-gray-300 bg-gray-100 py-1 px-3 text-base leading-6 text-black outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500"
									></textarea>
								</div>
							</div>
							<div className="grid w-full items-center justify-center p-2 sm:w-8/12">
								<button
									className="my-2 grid h-8 w-28 items-center justify-center rounded bg-gray-200 font-bold text-gray-900 dark:bg-gray-700 dark:text-gray-100"
									aria-label="Contact Me"
									type="submit"
								>
									{buttonText}
								</button>
								{showSuccessMessage && <p>{responseMessage}</p>}
								{showFailureMessage && <p>{responseMessage}</p>}
							</div>
							<div className="w-full border-t border-gray-200 p-2 pt-4 text-center sm:w-8/12">
								<a
									title="Email"
									className="text-gray-800 dark:text-gray-100"
									href="mailto:vassilistotskas@msn.com"
								>
									{t('myEmail', { ns: 'common' })}
								</a>
								<p className="mb-4 text-gray-800 dark:text-gray-100">
									{t('athensGreece', { ns: 'common' })}
								</p>
								<span className="inline-flex gap-2">
									<a
										title="Facebook"
										href={process.env.NEXT_PUBLIC_FACEBOOK_URL}
										target="_blank"
										rel="noopener noreferrer"
									>
										<Image
											alt={`Facebook`}
											src={`https://img.icons8.com/clouds/42/000000/facebook-new.png`}
											width={42}
											height={42}
											priority
										/>
									</a>
									<a
										title="Instagram"
										href={process.env.NEXT_PUBLIC_INSTAGRAM_URL}
										target="_blank"
										rel="noopener noreferrer"
									>
										<Image
											alt={`Instagram`}
											src={`https://img.icons8.com/clouds/42/000000/instagram-new--v1.png`}
											width={42}
											height={42}
											priority
										/>
									</a>
									<a
										title="Twitter"
										href={process.env.NEXT_PUBLIC_TWITTER_URL}
										target="_blank"
										rel="noopener noreferrer"
									>
										<Image
											alt={`Twitter`}
											src={`https://img.icons8.com/clouds/42/000000/twitter-circled.png`}
											width={42}
											height={42}
											priority
										/>
									</a>
									<a
										title="Github"
										href={process.env.NEXT_PUBLIC_GITHUB_URL}
										target="_blank"
										rel="noopener noreferrer"
									>
										<Image
											alt={`Github`}
											src={`https://img.icons8.com/clouds/42/000000/github.png`}
											width={42}
											height={42}
											priority
										/>
									</a>
								</span>
							</div>
						</div>
					</div>
				</div>
			</form>
		</section>
	)
}
