import { ThemeProvider } from '@/src/app/[locale]/components/ThemeProvider'
import type { Metadata } from 'next'
import {
  AbstractIntlMessages,
  NextIntlClientProvider,
  useMessages
} from 'next-intl'
import { Inter, Rubik, Space_Grotesk } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import  Header  from './components/Header'
// import './globals.css'
import '../../css/globals.css';


import { ClerkProvider } from '@clerk/nextjs'
import  Footer  from './components/Footer'
import React from 'react'
import { ToastProvider } from '@/src/components/ui/toast'

const inter = Inter({
  subsets: ['latin'],
  variable: '--inter'
})

const rubik = Rubik({
  subsets: ['arabic'],
  variable: '--rubik'
})

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk'
})

export const metadata: Metadata = {
  title: 'Debug OIST',
  description: 'Official programming club of OIST bhopal'
}

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = useMessages()

  return (
    <ClerkProvider>
      <html
        lang={locale}
        dir={locale === 'ar' || locale == 'fa' ? 'rtl' : 'ltr'}
        className={`${space_grotesk.variable} ${rubik.variable} ${inter.variable} scroll-smooth`}
        suppressHydrationWarning
      >
        <body>
          <ThemeProvider
            enableSystem
            attribute='class'
            defaultTheme='dark'
            themes={[
              'light',
              'dark',
              'instagram',
              'facebook',
              'discord',
              'netflix',
              'twilight',
              'reddit'
            ]}
          >
            <NextIntlClientProvider
              locale={locale}
              messages={messages as AbstractIntlMessages}
            >
              <NextTopLoader
                initialPosition={0.08}
                crawlSpeed={200}
                height={3}
                crawl={true}
                easing='ease'
                speed={200}
                shadow='0 0 10px #2299DD,0 0 5px #2299DD'
                color='var(--primary)'
                showSpinner={false}
              />
              <Header locale={locale} />
              <ToastProvider>
                <main className='mx-auto max-w-screen-2xl'>
                  {children}
                </main>
              </ToastProvider>
            </NextIntlClientProvider>
          </ThemeProvider>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}
