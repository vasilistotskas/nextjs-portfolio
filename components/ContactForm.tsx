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
			className="body-font prose relative mx-auto mb-8 flex w-full max-w-2xl flex-col items-start justify-center dark:prose-dark"
			onSubmit={handleSubmit}
		>
			<div className="mx-auto my-4 mb-16 flex w-full max-w-2xl flex-col items-start justify-center rounded border border-blue-200 bg-gray-100 p-6 dark:border-gray-800 dark:bg-gray-900">
				<div className="mb-2 flex w-full flex-col text-center">
					<h1 className="mb-2 flex items-center justify-center gap-2 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
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
					<div className="-m-2 flex flex-wrap content-center items-center justify-center">
						<div className="w-full p-2 sm:w-1/3">
							<div className="relative">
								<label
									htmlFor="name"
									className="w-full text-lg font-medium text-gray-800 dark:text-gray-100"
								>
									{t('contact.form.name', { ns: 'common' })}
								</label>
								<input
									required={true}
									type="text"
									id="name"
									name="name"
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
									required={true}
									type="email"
									id="email"
									name="email"
									className="w-full rounded border border-gray-300 bg-gray-100 py-1 px-3 text-base leading-8 text-black outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500"
								/>
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
									required={true}
									id="message"
									name="message"
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
								Submit
							</button>
							{successMessage && <p>{successMessage}</p>}
						</div>
						<div className="w-full border-t border-gray-200 p-2 pt-4 text-center sm:w-8/12">
							<a
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
