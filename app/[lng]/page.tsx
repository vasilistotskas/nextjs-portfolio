import Image from 'next/image'
import { languages, fallbackLng } from '@app/i18n/settings'
import { useTranslation } from '@app/i18n'
import React from 'react'
import JobCard from '@app/[lng]/components/utils/JobCard'
import Head from 'next/head'
import MobileMenu from '@app/[lng]/components/MobileMenu'
import ContactForm from '@app/[lng]/components/ContactForm'
import Footer from '@app/[lng]/components/Footer'
import NavItem from '@app/[lng]/components/utils/NavItem'

export default async function Page({ params: { lng } }: {
  params: {
    lng: string;
  };
}) {
  if (languages.indexOf(lng) < 0) lng = fallbackLng
  const { t } = await useTranslation(lng)
  const title = process.env.NEXT_SETTINGS_TITLE
  const description = process.env.NEXT_SETTINGS_DESCRIPTION
  const image = process.env.NEXT_SETTINGS_IMG_URL

  return (
    <div className="relative bg-gray-50 dark:bg-gray-900">
      <Head>
        <meta
          name="google-site-verification"
          content="scsCZtHoRwHWuMFA9Tp1Fu78qmJIOKRNDLYyRTlK5vw"
        />
      </Head>
      <div className="grid grid-cols-1 items-center justify-center px-8 pt-8 pb-8 sm:pb-16 md:grid-cols-auto-1fr">
        <a
          className="hidden transition-all hover:scale-110 hover:transform md:grid"
          href={process.env.NEXT_PUBLIC_GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            alt={`Github`}
            src={`/static/images/github.png`}
            width={42}
            height={35}
            priority
          />
        </a>
        <nav className="relative mx-auto grid w-full max-w-3xl grid-cols-2fr-1fr items-center border-gray-200 bg-gray-50 bg-opacity-60 text-center text-gray-900  dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
          <a href="#skip" className="skip-nav" target="_blank" rel="noopener noreferrer">
            Skip to content
          </a>
          <div className="ml-[-0.60rem] md:grid md:grid-cols-repeat-auto-fill-mimax-80-auto">
            <MobileMenu />
            <NavItem href="/" text="Home" ariaLabel="Home" />
            <NavItem href="/blog" text="Blog" ariaLabel="Blog" />
            <NavItem href="/guestbook" text="Guestbook" ariaLabel="Guestbook" />
            <NavItem href="/dashboard" text="Dashboard" ariaLabel="Dashboard" />
            <NavItem href="/about" text="About" ariaLabel="About" />
          </div>
        </nav>
      </div>

      <main
        id="skip"
        className="flex flex-col justify-center bg-gray-50 px-8 dark:bg-gray-900"
      >
      <div className="mx-auto flex max-w-2xl flex-col items-start justify-center border-gray-200 pb-10 dark:border-gray-700">
        <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-1fr-auto md:gap-1">
          <div className="flex flex-col">
            <h1 className="mb-1 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
              {t('myName', { ns: 'common' })}
            </h1>
            <h2 className="mb-4 text-gray-700 dark:text-gray-200">
              {t('subtitle', { ns: 'index' })}{' '}
              <span className="font-semibold">
                {t('myWorkCompany', { ns: 'common' })}
              </span>
            </h2>
            <p className="mb-1 flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Image
                alt={`Experience`}
                src={`https://img.icons8.com/clouds/46/000000/module.png`}
                width={92 / 2}
                height={92 / 2}
                priority
              />
              <span>{t('description', { ns: 'index' })}</span>
            </p>
            <p className="mb-1 flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Image
                alt={`Programming Skills`}
                src={`https://img.icons8.com/clouds/46/000000/console.png`}
                width={92 / 2}
                height={92 / 2}
                priority
              />
              <span>{t('programming.experience', { ns: 'index' })}</span>
            </p>
            <p className="mb-1 flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Image
                alt={`Project Management, Testing`}
                src={'https://img.icons8.com/clouds/46/000000/test-passed.png'}
                width={46}
                height={46}
                priority
              />
              <span>
                {t('projectManagement.experience', {
                  ns: 'index'
                })}
              </span>
            </p>
          </div>
          <div className="relative mr-auto grid w-full items-center justify-items-center">
            <Image
              alt={'Vasilis Totskas'}
              height={100}
              width={150}
              src="/avatar.jpg"
              sizes="30vw"
              priority
              className="rounded-full grayscale filter"
            />
          </div>
        </div>

        <h3 className="mb-4 mt-16 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
          {t('work.title', { ns: 'index' })}
        </h3>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          {t('work.experience', { ns: 'index' })}
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
        <ContactForm></ContactForm>
        <Footer />
      </main>
    </div>
  )
}
