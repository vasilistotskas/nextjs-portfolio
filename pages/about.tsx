import Link from 'next/link'
import Image from 'next/future/image'

import Container from 'components/Container'
import avatar from 'public/avatar.jpg'
import avatarBW from 'public/avatar-bw.jpg'

export default function About() {
    return (
        <Container title="About – Vasilis Totskas">
            <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
                <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
                    About Me
                </h1>
                <div className="mb-8 prose dark:prose-dark leading-6">
                    <h2>Links</h2>
                    <ul>
                        <li>
                            Twitter:{' '}
                            <a href="https://twitter.com/vasilistotskas">@vasilistotskas</a>
                        </li>
                        <li>
                            GitHub:{' '}
                            <a href="https://github.com/vasilistotskas">@vasilistotskas</a>
                        </li>
                        <li>
                            Website:{' '}
                            <Link href="https://vasilistotskas.com">
                                <a>https://vasilistotskas.com</a>
                            </Link>
                        </li>
                        <li>
                            LinkedIn:{' '}
                            <a href="https://www.linkedin.com/in/vasilis-totskas-148a571a0/">
                                https://www.linkedin.com/in/vasilis-totskas-148a571a0/
                            </a>
                        </li>
                    </ul>
                    <h2>Bio</h2>
                    <h3>Job Title</h3>
                    <p>Vasilis Totskas, Fullstack Developer at Advisable</p>
                    <h3>Long, 1st Person</h3>
                    <p>
                        Hey, I'm Vasilis. I'm the Fullstack Developer at{' '}
                        <a href="https://www.advisable.gr/">Advisable</a>, where my team
                        helps developers build a faster web. Computer and technology was always a big part of my life ,
                        i remember my self spending a lot of time in front of my pc and i was always curious about how it works and how to use it to build my own applications or websites.
                        3 years now i am into web development using technologies as Django(Python), Codeigniter(PHP), Vue2-3 (TypeScript, JavaScript), NestJs, SASS(css), MariaDB and Postgres . I have also some experience at DevOps using tools like Docker.
                    </p>
                    <h3>Education</h3>
                    <p>
                        Vasilis Totskas graduated from University Of Western Macedonia
                        in Computer Engineering.
                    </p>
                    <h2>Headshots</h2>
                    <div className="flex space-x-8">
                        <a href="/avatar.jpg">
                            <Image
                                alt="Vasilis Totskas headshot"
                                width={400}
                                quality={100}
                                src={avatar}
                                className="rounded-md"
                            />
                        </a>
                        <a href="/avatar-bw.jpg">
                            <Image
                                alt="Vasilis Totskas headshot"
                                width={400}
                                quality={100}
                                src={avatarBW}
                                className="rounded-md filter grayscale"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </Container>
    )
}
