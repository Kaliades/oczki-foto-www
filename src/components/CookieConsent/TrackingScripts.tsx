'use client'

import {
  isAnalyticsScriptAvailable,
  isMarketingScriptAvailable,
} from '@/consent/mapCookieConsentGlobal'
import { useConsent } from '@/providers/Consent'
import Script from 'next/script'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || null
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || null

export function TrackingScripts() {
  const { config, choices } = useConsent()

  if (!config.bannerEnabled || !choices) {
    return null
  }

  const loadAnalytics =
    choices.analytics && isAnalyticsScriptAvailable(config, GA_MEASUREMENT_ID)
  const loadMarketing =
    choices.marketing && isMarketingScriptAvailable(config, META_PIXEL_ID)

  if (!loadAnalytics && !loadMarketing) {
    return null
  }

  return (
    <>
      {loadAnalytics && GA_MEASUREMENT_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      ) : null}

      {loadMarketing && META_PIXEL_ID ? (
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      ) : null}
    </>
  )
}
