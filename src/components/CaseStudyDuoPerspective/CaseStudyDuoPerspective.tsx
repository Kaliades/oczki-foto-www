import { BracketPhotoFrame } from '@/components/BracketPhotoFrame'
import { SplitDisplayHeading } from '@/components/SplitDisplayHeading/SplitDisplayHeading'

import { CaseStudyDuoPerspectiveHighlights } from './CaseStudyDuoPerspectiveHighlights'
import { CASE_STUDY_DUO_PERSPECTIVE_FIGMA_NODES, type CaseStudyDuoPerspectiveData } from './constants'

type CaseStudyDuoPerspectiveProps = {
  data: CaseStudyDuoPerspectiveData
}

/**
 * Case study “Dwa spojrzenia…” — Figma `Container` on gallery case-study page.
 *
 * <section> full-bleed cream
 * └── inner 1366 cap
 *     ├── BracketPhotoFrame (`Image Container`)
 *     └── Section Intro
 *         ├── Section — `SplitDisplayHeading` + lead / callout (`Text Block`)
 *         └── Section — `CaseStudyDuoPerspectiveHighlights` → `TertiaryBorderedPanel` × n
 *
 * Section padding (metadata): mobile 48/48 px 16, gap 28; tablet 48/96 px 80, gap 48;
 * desktop 80/96 px 32, row gap 20. Intro top pad desktop 96 px only.
 * Section Intro has no opaque bg — botanical bleeds from the photo column; z-10 keeps copy above leaves.
 */
export function CaseStudyDuoPerspective({ data }: CaseStudyDuoPerspectiveProps) {
  const { callout, heading, highlights, leadParagraph, photo } = data
  const headingId = 'case-study-duo-perspective-heading'

  return (
    <section
      aria-labelledby={headingId}
      className="w-full bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
      data-figma-node={CASE_STUDY_DUO_PERSPECTIVE_FIGMA_NODES.desktop}
    >
      <div className="relative mx-auto flex w-full max-w-[1366px] flex-col items-start gap-7 px-4 py-12 md:gap-12 md:px-20 md:pb-24 md:pt-12 lg:flex-row lg:items-start lg:justify-between lg:gap-5 lg:px-8 lg:pb-24 lg:pt-20">
        <BracketPhotoFrame imageAlt={photo.alt} imageSrc={photo.src} />

        <div
          className="relative z-10 flex w-full flex-col gap-4 md:gap-5 lg:w-[514px] lg:shrink-0 lg:pt-24"
          data-figma-node={CASE_STUDY_DUO_PERSPECTIVE_FIGMA_NODES.sectionIntro.desktop}
          data-name="Section Intro"
        >
          <div
            className="flex w-full flex-col gap-2.5 md:gap-4"
            data-figma-node={CASE_STUDY_DUO_PERSPECTIVE_FIGMA_NODES.introCopy.desktop}
            data-name="Section"
          >
            <SplitDisplayHeading
              className="[word-break:break-word]"
              emphasis={heading.emphasis}
              emphasisPosition="end"
              id={headingId}
              start={heading.start}
            />

            <div className="flex w-full flex-col gap-2 leading-[1.48]" data-name="Text Block">
              <p className="oczki-body-l tracking-[-0.24px] text-[var(--oczki-primary-700)]">
                {leadParagraph}
              </p>
              <p className="oczki-body-l tracking-[-0.24px] text-[var(--oczki-primary-700)]">
                {callout}
              </p>
            </div>
          </div>

          <CaseStudyDuoPerspectiveHighlights items={highlights} />
        </div>
      </div>
    </section>
  )
}
