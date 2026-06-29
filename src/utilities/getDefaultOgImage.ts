import type { Metadata } from 'next'

import { BRAND_ASSETS } from '@/constants/brandAssets'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getServerSideURL } from '@/utilities/getURL'
import type { Media } from '@/payload-types'

type OgImageEntry = {
  url: string
  width?: number
  height?: number
  alt?: string
}

function staticDefaultOgImage(): OgImageEntry[] {
  const serverUrl = getServerSideURL()

  return [
    {
      url: `${serverUrl}${BRAND_ASSETS.ogDefault}`,
      width: BRAND_ASSETS.ogDefaultWidth,
      height: BRAND_ASSETS.ogDefaultHeight,
      alt: BRAND_ASSETS.ogDefaultAlt,
    },
  ]
}

function mediaToOgImage(
  media: Media,
  alt: string,
): OgImageEntry {
  const serverUrl = getServerSideURL()
  const relativeUrl = media.sizes?.og?.url ?? media.url

  if (!relativeUrl) {
    return staticDefaultOgImage()[0]
  }

  return {
    url: relativeUrl.startsWith('http') ? relativeUrl : `${serverUrl}${relativeUrl}`,
    width: media.width ?? BRAND_ASSETS.ogDefaultWidth,
    height: media.height ?? BRAND_ASSETS.ogDefaultHeight,
    alt,
  }
}

/**
 * Default Open Graph image — CMS `siteSettings.defaultOgImage` with a static
 * `/public/brand/og-default.png` fallback.
 */
export async function getDefaultOgImage(): Promise<NonNullable<Metadata['openGraph']>['images']> {
  try {
    const settings = await getCachedGlobal('siteSettings', 1)()
    const image = settings.defaultOgImage

    if (image && typeof image === 'object' && 'url' in image && image.url) {
      return [
        mediaToOgImage(
          image,
          settings.defaultOgImageAlt ?? BRAND_ASSETS.ogDefaultAlt,
        ),
      ]
    }
  } catch {
    // Fall through to static branding asset.
  }

  return staticDefaultOgImage()
}

export function getStaticDefaultOgImageUrl(): string {
  return `${getServerSideURL()}${BRAND_ASSETS.ogDefault}`
}
