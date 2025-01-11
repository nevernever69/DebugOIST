'use client'

import { Link } from '@/src/navigation'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import GithubIcon from '../../icons/github'
import LogoIcon from '../../icons/logo'
import LangSwitcher from './LangSwitcher'
import ThemeSwitch from './ThemeSwitch'
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs'

interface Props {
  locale: string
}

export const Header: FC<Props> = ({ locale }) => {
  const t = useTranslations('')

  return (
    <div className='mx-auto flex max-w-screen-2xl flex-row items-center justify-between p-5'>
      <Link lang={locale} href='/'>
        <div className='flex flex-row items-center'>
          <div className='mb-2 h-14 w-14'>

          </div>
          <strong className='mx-2 text-3xl select-none'>Debug</strong>


        </div>
      </Link>
      <div className='flex flex-row items-center gap-3'>
        <nav className='mr-10 inline-flex gap-5'>
          <Link lang={locale} href={`/about`}>
            {t('About')}
          </Link>
          <a href=''>{t('Support')}</a>
          <a href=''>{t('Other')}</a>
          <SignedIn>
            <Link lang={locale} href={`/dashboard`}>
              Dashboard
            </Link>
          </SignedIn>
        </nav>

        <ThemeSwitch />
        <LangSwitcher />

        <SignedOut>
          <div className='flex gap-3'>
            <SignInButton mode="modal">
              <button className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition">
                {t('Sign in')}
              </button>
            </SignInButton>

          </div>
        </SignedOut>

        <SignedIn>
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-10 h-10"
              }
            }}
          />
        </SignedIn>

        <a
          href='https://github.com/Nev-Labs'
          target='_blank'
        >
          <div className='size-8'>
            <GithubIcon />
          </div>
        </a>
      </div>
    </div>
  )
}