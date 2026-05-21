import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Dancing_Script } from 'next/font/google'
import localFont from 'next/font/local'
import { GeistMono } from 'geist/font/mono'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

const instrumentSans = localFont({
  src: [
    {
      path: '../../../public/fonts/Instrument Sans Variable/Instrument Sans Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Instrument Sans Variable/Instrument Sans Italic.ttf',
      weight: '400',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-instrument-sans',
})

/**
 * The Seasons — display font used in headings and italic pull-quotes.
 * Loaded from local TTF files (public/fonts/The Seasons/) instead of
 * Google Fonts so the exact brand typeface is always served.
 */
const theSeasons = localFont({
  src: [
    {
      path: '../../../public/fonts/The Seasons/The Seasons Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/The Seasons/The Seasons Light Italic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../../public/fonts/The Seasons/The Seasons Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/The Seasons/The Seasons Regular Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../../public/fonts/The Seasons/The Seasons Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/The Seasons/The Seasons Bold Italic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-oczki-display-loaded',
})

const dancingScript = Dancing_Script({
  display: 'swap',
  subsets: ['latin-ext'],
  variable: '--font-oczki-handwritten',
  weight: ['400'],
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(
        instrumentSans.variable,
        theSeasons.variable,
        dancingScript.variable,
        GeistMono.variable,
      )}
      lang="pl"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
