import type { Metadata } from 'next'
import HomepageHero from '@/blocks-v2/HomepageHero/Component'
import HomepageObalamyMit from '@/blocks-v2/HomepageObalamyMit/Component'
import HomepageWybierzHistorie from '@/blocks-v2/HomepageWybierzHistorie/Component'
import HomepageKroki from '@/blocks-v2/HomepageKroki/Component'
import HomepageGaleria from '@/blocks-v2/HomepageGaleria/Component'
import HomepageOpinie from '@/blocks-v2/HomepageOpinie/Component'
import HomepageOMnieTeaser from '@/blocks-v2/HomepageOMnieTeaser/Component'
import HomepageInstagram from '@/blocks-v2/HomepageInstagram/Component'
import HomepageCtaSection from '@/blocks-v2/HomepageCtaSection/Component'
import HomepageFooterNewsletter from '@/blocks-v2/HomepageFooterNewsletter/Component'

export const metadata: Metadata = {
  title: 'V2 — Strona główna (hardcoded)',
  robots: { index: false, follow: false },
}

export default function HomepageV2Page() {
  return (
    <main>
      <HomepageHero />
      <HomepageObalamyMit />
      <HomepageWybierzHistorie />
      <HomepageKroki />
      <HomepageGaleria />
      <HomepageOpinie />
      <HomepageOMnieTeaser />
      <HomepageInstagram />
      <HomepageCtaSection />
      <HomepageFooterNewsletter />
    </main>
  )
}
