import { Suspense } from 'react'
import Image from 'next/future/image'
import Link from 'next/link'

import Container from '../components/Container'
import VideoCard from '../components/VideoCard'

export default function Home() {
    return (
        <Suspense fallback={null}>
            <Container>
                <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
                    <div className="flex flex-col-reverse sm:flex-row items-start">
                        <div className="flex flex-col pr-8">
                            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white">
                                Vasilis Totskas
                            </h1>
                            <h2 className="text-gray-700 dark:text-gray-200 mb-4">
                                Fullstack Developer at{' '}
                                <span className="font-semibold">Advisable</span>
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-1">
                                💪🏻 3+ years experience designing and developing web software for companies and individuals alike.
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 mb-1">
                                💻 Excellent programming skills with vast knowledge in computer languages.
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 mb-1">
                                ✅ Proficient in project management, creating user interfaces, writing and testing
                                codes, and implementing features.
                            </p>
                        </div>
                        <div className="w-[80px] sm:w-[176px] relative mb-8 sm:mb-0 mr-auto">
                            <Image
                                alt="Vasilis Totskas"
                                height={176}
                                width={176}
                                src="/avatar.jpg"
                                sizes="30vw"
                                priority
                                className="rounded-full filter grayscale"
                            />
                        </div>
                    </div>

                    <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 mt-16 text-black dark:text-white">
                        Learn React & Next.js
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Build and deploy a modern SaaS application using the
                        most popular open-source software. This course is 12
                        hours long and is completely live streamed.
                    </p>
                    <VideoCard
                        index="01"
                        href="https://www.youtube.com/watch?v=MxR5I5_hOKk&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=2"
                        length="1:02:45"
                        title="Introduction to React 2025"
                    />
                    <VideoCard
                        index="02"
                        href="https://www.youtube.com/watch?v=AGl52moyISU&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=3"
                        length="54:22"
                        title="Firestore, Chakra UI, Absolute Imports"
                    />
                    <VideoCard
                        index="03"
                        href="https://www.youtube.com/watch?v=3g6-v3_BNbM&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=4"
                        length="1:08:30"
                        title="Designing & Building the Dashboard"
                    />
                    <VideoCard
                        index="04"
                        href="https://www.youtube.com/watch?v=u8iv_yhSRI8&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=5"
                        length="1:13:45"
                        title="Firebase Admin with Next.js + SWR"
                    />
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.youtube.com/playlist?list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1"
                        className="flex mt-8 text-gray-600 dark:text-gray-400 leading-7 rounded-lg hover:text-gray-800 dark:hover:text-gray-200 transition-all h-6"
                    >
                        Watch all videos
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="h-6 w-6 ml-1"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
                            />
                        </svg>
                    </a>
                    <span className="h-16" />
                </div>
            </Container>
        </Suspense>
    )
}
