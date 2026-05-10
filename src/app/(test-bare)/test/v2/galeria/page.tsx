import type { Metadata } from 'next'
import GaleriaNavbar from '@/blocks-v2/GaleriaNavbar/Component'
import GaleriaBreadcrumbs from '@/blocks-v2/GaleriaBreadcrumbs/Component'
import GaleriaHero from '@/blocks-v2/GaleriaHero/Component'
import GaleriaGrid from '@/blocks-v2/GaleriaGrid/Component'
import GaleriaOMnieTeaser from '@/blocks-v2/GaleriaOMnieTeaser/Component'
import GaleriaFaq from '@/blocks-v2/GaleriaFaq/Component'
import GaleriaCallout from '@/blocks-v2/GaleriaCallout/Component'
import GaleriaFooterNewsletter from '@/blocks-v2/GaleriaFooterNewsletter/Component'

export const metadata: Metadata = {
  title: 'V2 — Galeria (hardcoded)',
  robots: { index: false, follow: false },
}

export default function GaleriaV2Page() {
  return (
    <main>
      <GaleriaNavbar />
      <GaleriaBreadcrumbs />
      <GaleriaHero />
      <GaleriaGrid />
      <GaleriaOMnieTeaser />
      <GaleriaFaq />
      <GaleriaCallout />
      <GaleriaFooterNewsletter />
    </main>
  )
}
