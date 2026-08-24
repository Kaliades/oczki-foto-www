import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Dancing_Script } from 'next/font/google'
import localFont from 'next/font/local'
import { GeistMono } from 'geist/font/mono'
import React from 'react'

import { ConditionalSiteFooter } from '@/components/ConditionalSiteFooter'
import { ConsentModeInit } from '@/components/ConsentModeInit/ConsentModeInit'
import { CookieConsentRoot, TrackingScripts } from '@/components/CookieConsent'
import { AdminBar } from '@/components/AdminBar'
import { PageLoadOverlay } from '@/components/PageLoadOverlay'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { defaultTheme } from '@/providers/Theme/shared'
import { BRAND_ASSETS } from '@/constants/brandAssets'
import { applyDevConsentPreview } from '@/consent/applyDevConsentPreview'
import { mapCookieConsentGlobal } from '@/consent/mapCookieConsentGlobal'
import { getDefaultOgImage } from '@/utilities/getDefaultOgImage'
import { getGlobalForRequest } from '@/utilities/getGlobals'
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
  const cookieConsentDoc = await getGlobalForRequest('cookieConsent', 0)
  const consentConfig = applyDevConsentPreview(mapCookieConsentGlobal(cookieConsentDoc))

  return (
    <html
      className={cn(
        instrumentSans.variable,
        theSeasons.variable,
        dancingScript.variable,
        GeistMono.variable,
      )}
      data-theme={defaultTheme}
      lang="pl"
      suppressHydrationWarning
    >
      <body>
        <ConsentModeInit />
        <InitTheme />
        <Providers consentConfig={consentConfig}>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <ConditionalSiteFooter>
            <Footer />
          </ConditionalSiteFooter>
          <PageLoadOverlay />
          <CookieConsentRoot />
          <TrackingScripts />
        </Providers>
      </body>
    </html>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const ogImages = await getDefaultOgImage()
  const ogImageUrls = (Array.isArray(ogImages) ? ogImages : ogImages ? [ogImages] : []).flatMap(
    (image) => {
      if (typeof image === 'string') return [image]
      if (image instanceof URL) return [image.toString()]
      return image.url ? [image.url.toString()] : []
    },
  )

  return {
    metadataBase: new URL(getServerSideURL()),
    icons: {
      icon: [
        {
          url: BRAND_ASSETS.faviconLight,
          type: 'image/png',
          media: '(prefers-color-scheme: light)',
        },
        {
          url: BRAND_ASSETS.faviconDark,
          type: 'image/png',
          media: '(prefers-color-scheme: dark)',
        },
      ],
      apple: {
        url: BRAND_ASSETS.faviconApple,
        type: 'image/png',
      },
    },
    openGraph: mergeOpenGraph({ images: ogImages }),
    twitter: {
      card: 'summary_large_image',
      site: '@oczkifotografia',
      images: ogImageUrls,
    },
  }
}
