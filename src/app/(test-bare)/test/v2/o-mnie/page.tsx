import type { Metadata } from 'next'
import OMnieNavbar from '@/blocks-v2/OMnieNavbar/Component'
import OMnieHero from '@/blocks-v2/OMnieHero/Component'
import OMnieManifest from '@/blocks-v2/OMnieManifest/Component'
import OMnieSesjaJakSpotkanie from '@/blocks-v2/OMnieSesjaJakSpotkanie/Component'
import OMnieKompetencje from '@/blocks-v2/OMnieKompetencje/Component'
import OMnieFullWidthImage from '@/blocks-v2/OMnieFullWidthImage/Component'
import OMnieDuet from '@/blocks-v2/OMnieDuet/Component'
import OMnieKroki from '@/blocks-v2/OMnieKroki/Component'
import OMnieInstagram from '@/blocks-v2/OMnieInstagram/Component'
import OMnieCtaSection from '@/blocks-v2/OMnieCtaSection/Component'
import OMnieFooterNewsletter from '@/blocks-v2/OMnieFooterNewsletter/Component'

export const metadata: Metadata = {
  title: 'V2 — O mnie (hardcoded)',
  robots: { index: false, follow: false },
}

export default function OMnieV2Page() {
  return (
    <main>
      <OMnieNavbar />
      <OMnieHero />
      <OMnieManifest />
      <OMnieSesjaJakSpotkanie />
      <OMnieKompetencje />
      <OMnieFullWidthImage />
      <OMnieDuet />
      <OMnieKroki />
      <OMnieInstagram />
      <OMnieCtaSection />
      <OMnieFooterNewsletter />
    </main>
  )
}
