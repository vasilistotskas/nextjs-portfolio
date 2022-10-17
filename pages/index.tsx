import { Suspense } from 'react'
import Image from 'next/future/image'
import Link from 'next/link'

import Container from '../components/Container'
import JobCard from '../components/JobCard'

export default function Home() {
    return (
        <Suspense fallback={null}>
            <Container>
                <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-10">
                    <div className="flex flex-col-reverse sm:flex-row items-start">
                        <div className="flex flex-col pr-8">
                            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white">
                                Vasilis Totskas
                            </h1>
                            <h2 className="text-gray-700 dark:text-gray-200 mb-4">
                                Fullstack Developer at{' '}
                                <span className="font-semibold">Advisable</span>
                            </h2>
                            <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                                <img src="https://img.icons8.com/clouds/46/000000/module.png" alt={ 'Experience' }/>
                                <span>3+ years experience designing and developing web software for companies and individuals alike.</span>
                            </p>
                            <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                                <img src="https://img.icons8.com/clouds/46/000000/console.png" alt={ 'Programming Skills' }/>
                                <span>Excellent programming skills with vast knowledge in computer languages.</span>
                            </p>
                            <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                                <img src="https://img.icons8.com/clouds/46/000000/test-passed.png" alt={ 'Project Management, Testing' }/>
                                <span>Proficient in project management, creating user interfaces, writing and testing
                                codes, and implementing features.</span>
                            </p>
                        </div>
                        <div className="w-[80px] sm:w-[176px] relative mb-8 sm:mb-0 mr-auto">
                            <Image
                                alt={ "Vasilis Totskas" }
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
                        Work Experience
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        My work experience includes working with a variety of technologies and frameworks, such as
                        Django, Codeigniter, Vue, Nuxt, React, Next.js, Node.js, PostgreSQL, MySql, Docker and more.
                    </p>
                    <JobCard
                        index="Present"
                        period="Jan 2021"
                        title="Full Stack Developer, Advisable - Full Time"
                    />
                    <JobCard
                        index="6 mos"
                        period="Jul 2020 - Dec 2020"
                        title="Internship, Advisable - Full Time"
                    />
                    <span className="h-16" />
                </div>
            </Container>
        </Suspense>
    )
}
