import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import Image from 'next/future/image'

export default function ContactForm() {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm()
    const [successMessage, setSuccessMessage] = useState('')

    function onSubmit(data) {
        console.log('data', data)
        axios
            .post('https://public.herotofu.com/v1/07713c70-4d99-11ed-8970-6943e4ac8982', data)
            .then((response) => {
                setSuccessMessage(
                    `Thanks for reaching me out! Check your inbox for updates 😊`
                )
            })
            .catch((e) => console.error(e))
    }

    return (
        <form className='prose dark:prose-dark body-font relative flex flex-col justify-center items-start max-w-2xl mx-auto w-full mb-8'
                  onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 border border-blue-200 rounded p-6 my-4 w-full dark:border-gray-800 bg-blue-50 dark:bg-blue-opaque'>
                <div className='flex flex-col text-center w-full mb-2'>
                    <h1 className='flex items-center justify-center gap-2 font-bold text-2xl md:text-4xl tracking-tight mb-2 text-black dark:text-white'>
                        <Image
                            alt={`Contact Me`}
                            src={`https://img.icons8.com/doodle/48/000000/newsletter.png`}
                            width={48}
                            height={48}
                            priority
                        />
                        Contact Me
                    </h1>
                </div>
                <div className='grid'>
                    <div className='flex items-center content-center justify-center flex-wrap -m-2'>
                        <div className='p-2 w-full sm:w-1/3'>
                            <div className='relative'>
                                <label htmlFor='name' className='text-lg font-medium w-full text-gray-800 dark:text-gray-100'>
                                    Name
                                </label>
                                <input
                                    {...register('name')}
                                    type='text'
                                    id='name'
                                    name='name'
                                    className='w-full text-black bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' />
                            </div>
                        </div>
                        <div className='p-2 w-full sm:w-1/3'>
                            <div className='relative'>
                                <label
                                    htmlFor='email'
                                    className='text-lg font-medium w-full text-gray-800 dark:text-gray-100'
                                >
                                    Email
                                </label>
                                <input
                                    {...register('email')}
                                    type='email'
                                    id='email'
                                    name='email'
                                    className='w-full text-black bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' />
                            </div>
                        </div>
                        <div className='p-2 w-full sm:w-8/12'>
                            <div className='relative'>
                                <label
                                    htmlFor='message'
                                    className='text-lg font-medium w-full text-gray-800 dark:text-gray-100'
                                >
                                    Message
                                </label>
                                <textarea
                                    {...register('message', { required: 'This is required.', maxLength: 20 })}
                                    id='message'
                                    name='message'
                                    className='w-full text-black bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 h-32 text-base outline-none py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out'
                                ></textarea>
                            </div>
                        </div>
                        <div className='p-2 w-full sm:w-8/12 grid items-center justify-center'>
                            <button
                                className='grid items-center justify-center my-2 font-bold h-8 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded w-28'
                                aria-label="Contact Me"
                                type="button"
                                role='submit'
                            >
                                {isSubmitting ? 'Submitting' : 'Submit'}
                            </button>
                            {successMessage && <p>{successMessage}</p>}
                        </div>
                        <div className='p-2 w-full sm:w-8/12 pt-4 border-t border-gray-200 text-center'>
                            <a
                                className='text-sky-600 dark:text-sky-200'
                                href="mailto:vassilistotskas@msn.com"
                            >
                                vassilistotskas@msn.com
                            </a>
                            <p className='text-gray-800 dark:text-gray-100 mb-4'>
                                Athens, Greece
                            </p>
                            <span className='inline-flex gap-2'>
                                <a href={'https://www.facebook.com/vasilistotskas/'}>
                                    <Image
                                        alt={`Facebook`}
                                        src={`https://img.icons8.com/clouds/42/000000/facebook-new.png`}
                                        width={42}
                                        height={42}
                                        priority
                                    />
                                </a>
                                <a href={'https://www.instagram.com/vasilistotskas/'}>
                                    <Image
                                        alt={`Instagram`}
                                        src={`https://img.icons8.com/clouds/42/000000/instagram-new--v1.png`}
                                        width={42}
                                        height={42}
                                        priority
                                    />
                                </a >
                                <a href={'https://twitter.com/vasilistotskas/'}>
                                    <Image
                                        alt={`Twitter`}
                                        src={`https://img.icons8.com/clouds/42/000000/twitter-circled.png`}
                                        width={42}
                                        height={42}
                                        priority
                                    />
                                </a>
                                <a href={'https://github.com/vasilistotskas/'}>
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