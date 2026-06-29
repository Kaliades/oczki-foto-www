import type { Metadata } from 'next'

import { BRAND_ASSETS } from '@/constants/brandAssets'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Naturalna fotografia kobieca i ślubna w Krakowie. Sesje kobiece, reportaże ślubne, sesje wizerunkowe i rodzinne — z czułością i bez sztuczności.',
  images: [
    {
      url: `${getServerSideURL()}${BRAND_ASSETS.ogDefault}`,
      width: BRAND_ASSETS.ogDefaultWidth,
      height: BRAND_ASSETS.ogDefaultHeight,
      alt: BRAND_ASSETS.ogDefaultAlt,
    },
  ],
  siteName: 'Oczki Fotografia',
  title: 'Oczki Fotografia — naturalna fotografia kobieca i ślubna',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
