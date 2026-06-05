import {
  OFFER_SERVICE_HERO_FIGMA_NODES,
  type OfferServiceHeroCopyVariant,
  type OfferServiceHeroData,
} from './constants'

type OfferServiceHeroCopyProps = {
  description: string
  heading: OfferServiceHeroData['heading']
  headingId: string
  variant: OfferServiceHeroCopyVariant
}

const COPY_INNER_FIGMA_NODES: Record<OfferServiceHeroCopyVariant, string> = {
  stacked: OFFER_SERVICE_HERO_FIGMA_NODES.copyInner.mobile,
  desktop: OFFER_SERVICE_HERO_FIGMA_NODES.copyInner.desktop,
}

/**
 * Hero heading + lead — Figma inner `Container`.
 */
export function OfferServiceHeroCopy({
  description,
  heading,
  headingId,
  variant,
}: OfferServiceHeroCopyProps) {
  if (variant === 'stacked') {
    return (
      <div
        className="flex w-full max-w-[var(--offer-stacked-copy-inner-max-w)] shrink-0 flex-col gap-[var(--offer-stacked-copy-inner-gap)]"
        data-figma-node={COPY_INNER_FIGMA_NODES.stacked}
        data-name="Container"
      >
        <h1
          className="oczki-heading-l w-full text-[var(--oczki-primary-800)] [word-break:break-word]"
          id={headingId}
        >
          <em className="italic tracking-[-0.01em] [font-feature-settings:'dlig'_1,'lnum'_1,'pnum'_1]">
            {heading.emphasis}
          </em>
          {heading.start}
        </h1>
        <div
          className="flex w-full items-center justify-center pr-[var(--offer-stacked-desc-pr)]"
        >
          <p className="oczki-body-l min-w-0 flex-1 text-[var(--oczki-primary-700)] [word-break:break-word]">
            {description}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="flex w-full max-w-[406px] flex-col gap-4"
      data-figma-node={COPY_INNER_FIGMA_NODES.desktop}
      data-name="Container"
    >
      <h1
        className="oczki-heading-l w-full text-[var(--oczki-primary-800)] [word-break:break-word]"
        id={headingId}
      >
        <em className="italic tracking-[-0.01em] [font-feature-settings:'dlig'_1,'lnum'_1,'pnum'_1]">
          {heading.emphasis}
        </em>
        {heading.start}
      </h1>
      <div className="flex w-full items-center justify-center pr-12">
        <p className="oczki-body-l min-w-0 flex-1 text-[var(--oczki-primary-700)] [word-break:break-word]">
          {description}
        </p>
      </div>
    </div>
  )
}
