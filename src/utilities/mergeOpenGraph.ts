import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Naturalna fotografia kobieca i ślubna w Krakowie. Sesje kobiece, reportaże ślubne, sesje wizerunkowe i rodzinne — z czułością i bez sztuczności.',
  images: [
    {
      // TODO: replace with a branded 1200×630 OG image once it's designed.
      // Current file is the Payload template placeholder.
      url: `${getServerSideURL()}/website-template-OG.webp`,
      width: 1200,
      height: 630,
      alt: 'Oczki Fotografia — naturalna fotografia kobieca i ślubna w Krakowie',
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
