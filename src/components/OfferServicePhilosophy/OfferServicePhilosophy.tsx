import {
  PhilosophyPrinciplesSection,
  type PhilosophyPrinciplesSectionData,
} from '@/components/PhilosophyPrinciplesSection'

type OfferServicePhilosophyProps = {
  data: PhilosophyPrinciplesSectionData
  headingId?: string
}

/** Offer-service alias for {@link PhilosophyPrinciplesSection}. */
export function OfferServicePhilosophy({
  data,
  headingId = 'offer-service-philosophy-heading',
}: OfferServicePhilosophyProps) {
  return <PhilosophyPrinciplesSection data={data} headingId={headingId} />
}
