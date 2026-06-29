import React from 'react'

import type { ConsentRuntimeConfig } from '@/consent/mapCookieConsentGlobal'
import { ConsentProvider } from './Consent'
import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'

export const Providers: React.FC<{
  children: React.ReactNode
  consentConfig: ConsentRuntimeConfig
}> = ({ children, consentConfig }) => {
  return (
    <ThemeProvider>
      <ConsentProvider config={consentConfig}>
        <HeaderThemeProvider>{children}</HeaderThemeProvider>
      </ConsentProvider>
    </ThemeProvider>
  )
}
