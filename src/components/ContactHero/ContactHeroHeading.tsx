import { SplitDisplayHeading } from '@/components/SplitDisplayHeading/SplitDisplayHeading'

type ContactHeroHeadingProps = {
  description: string
  emphasis: string
  end: string
  headingId: string
  start: string
}

/**
 * Title + intro copy — Figma `Section title container` / `Section title content`.
 *
 * Section title container
 * └── Section title content (gap 16 desktop/tablet, 8 mobile)
 *     ├── Section title (header/l, 36 px)
 *     └── Text (body/l)
 */
export function ContactHeroHeading({
  description,
  emphasis,
  end,
  headingId,
  start,
}: ContactHeroHeadingProps) {
  return (
    <div className="relative z-10 flex w-full flex-col items-start pt-4 md:w-[475px] md:pt-4 md:text-center lg:w-[475px] lg:pt-8 lg:text-left">
      <div className="flex w-full flex-col items-start gap-2 md:items-center md:gap-4 lg:items-start">
        <SplitDisplayHeading
          as="h1"
          emphasis={emphasis}
          end={end}
          id={headingId}
          sizeClassName="text-[36px] tracking-[-0.02em]"
          start={start}
        />
        <p className="oczki-body-l w-full text-[var(--oczki-primary-700)] md:text-center lg:text-left">
          {description}
        </p>
      </div>
    </div>
  )
}
