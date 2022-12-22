import Image from 'next/image'
import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'

export default function ContactForm() {
	const { t } = useTranslation('404')

	const handleSubmit = async (event) => {
		event.preventDefault()

		const data = {
			name: event.target.name.value,
			email: event.target.email.value,
			message: event.target.message.value
		}

		const JSONData = JSON.stringify(data)

		await fetch('https://public.herotofu.com/v1/07713c70-4d99-11ed-8970-6943e4ac8982', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			mode: 'cors',
			body: JSONData
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				event.target.reset()
				setSuccessMessage(`${t('contact.subtitle', { ns: 'common' })} 😊`)
			})
			.catch((e) => console.error(e))
	}

	const [successMessage, setSuccessMessage] = useState('')

	return (
		<form
			className="prose dark:prose-dark body-font relative flex flex-col justify-center items-start max-w-2xl mx-auto w-full mb-8"
			onSubmit={handleSubmit}
		>
			<div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 border border-blue-200 rounded p-6 my-4 w-full dark:border-gray-800 bg-gray-100 dark:bg-gray-900">
				<div className="flex flex-col text-center w-full mb-2">
					<h1 className="flex items-center justify-center gap-2 font-bold text-2xl md:text-4xl tracking-tight mb-2 text-black dark:text-white">
						<Image
							alt={`Contact Me`}
							src={`https://img.icons8.com/doodle/48/000000/newsletter.png`}
							width={48}
							height={48}
							priority
						/>
						{t('contact.title', { ns: 'common' })}
					</h1>
				</div>
				<div className="grid">
					<div className="flex items-center content-center justify-center flex-wrap -m-2">
						<div className="p-2 w-full sm:w-1/3">
							<div className="relative">
								<label
									htmlFor="name"
									className="text-lg font-medium w-full text-gray-800 dark:text-gray-100"
								>
									{t('contact.form.name', { ns: 'common' })}
								</label>
								<input
									required={true}
									type="text"
									id="name"
									name="name"
									className="w-full text-black bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								/>
							</div>
						</div>
						<div className="p-2 w-full sm:w-1/3">
							<div className="relative">
								<label
									htmlFor="email"
									className="text-lg font-medium w-full text-gray-800 dark:text-gray-100"
								>
									{t('contact.form.email', { ns: 'common' })}
								</label>
								<input
									required={true}
									type="email"
									id="email"
									name="email"
									className="w-full text-black bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								/>
							</div>
						</div>
						<div className="p-2 w-full sm:w-8/12">
							<div className="relative">
								<label
									htmlFor="message"
									className="text-lg font-medium w-full text-gray-800 dark:text-gray-100"
								>
									{t('contact.form.message', { ns: 'common' })}
								</label>
								<textarea
									required={true}
									id="message"
									name="message"
									className="w-full text-black bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 h-32 text-base outline-none py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
								></textarea>
							</div>
						</div>
						<div className="p-2 w-full sm:w-8/12 grid items-center justify-center">
							<button
								className="grid items-center justify-center my-2 font-bold h-8 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded w-28"
								aria-label="Contact Me"
								type="submit"
							>
								Submit
							</button>
							{successMessage && <p>{successMessage}</p>}
						</div>
						<div className="p-2 w-full sm:w-8/12 pt-4 border-t border-gray-200 text-center">
							<a
								className="text-sky-600 dark:text-sky-200"
								href="mailto:vassilistotskas@msn.com"
							>
								{t('myEmail', { ns: 'common' })}
							</a>
							<p className="text-gray-800 dark:text-gray-100 mb-4">
								{t('athensGreece', { ns: 'common' })}
							</p>
							<span className="inline-flex gap-2">
								<a
									href={'https://www.facebook.com/vasilistotskas/'}
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
									href={'https://www.instagram.com/vasilistotskas/'}
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
									href={'https://twitter.com/vasilistotskas/'}
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
									href={'https://github.com/vasilistotskas/'}
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
	)
}
