import type { ComponentType, ReactNode } from 'react'

import { SplitDisplayHeading } from '@/components/SplitDisplayHeading/SplitDisplayHeading'
import { cn } from '@/utilities/ui'

import { CENTERED_SPLIT_COPY_FIGMA_NODES, type CenteredSplitCopyHeading } from './constants'

type CenteredSplitCopyTitleProps = {
  emphasis: string
  headingId: string
}

type CenteredSplitCopyProps = {
  body: string
  bodyClassName?: string
  bodyMobileClassName?: string
  bodyTabletDesktopClassName?: string
  bodyTypographyClassName?: string
  containerClassName?: string
  emphasisPosition?: 'start' | 'end'
  figmaNodes?: {
    body?: string
    heading?: string
  }
  heading: CenteredSplitCopyHeading
  headingId: string
  headingSizeClassName?: string
  /** Phrase-wrapped title on all breakpoints — same slot as {@link PhilosophyPrinciplesTitle}. */
  Title?: ComponentType<CenteredSplitCopyTitleProps>
}

/**
 * Responsive centred display heading + body — Figma `Heading` pattern.
 *
 * <div Heading>
 * ├── <h2> — optional phrase `Title` or default `SplitDisplayHeading`
 * └── <p Text> — body/l; optional split mobile / tablet+ typography
 */
export function CenteredSplitCopy({
  body,
  bodyClassName,
  bodyMobileClassName,
  bodyTabletDesktopClassName,
  bodyTypographyClassName = 'oczki-body-l',
  containerClassName,
  emphasisPosition,
  figmaNodes,
  heading,
  headingId,
  headingSizeClassName,
  Title,
}: CenteredSplitCopyProps) {
  const splitBodyTypography =
    bodyMobileClassName != null && bodyTabletDesktopClassName != null

  const bodyNodes: ReactNode = splitBodyTypography ? (
    <>
      <p
        className={cn(bodyMobileClassName, 'w-full shrink-0 md:hidden', bodyClassName)}
        data-figma-node={figmaNodes?.body ?? CENTERED_SPLIT_COPY_FIGMA_NODES.body.mobile}
      >
        {body}
      </p>
      <p
        className={cn(
          bodyTabletDesktopClassName,
          'hidden w-full shrink-0 md:block md:max-w-[442px] md:px-9',
          bodyClassName,
        )}
        data-figma-node={figmaNodes?.body ?? CENTERED_SPLIT_COPY_FIGMA_NODES.body.desktop}
      >
        {body}
      </p>
    </>
  ) : (
    <p
      className={cn(
        bodyTypographyClassName,
        'w-full shrink-0 tracking-[-0.24px] text-[var(--oczki-primary-700)] md:max-w-[442px] md:px-9',
        bodyClassName,
      )}
      data-figma-node={figmaNodes?.body ?? CENTERED_SPLIT_COPY_FIGMA_NODES.body.desktop}
    >
      {body}
    </p>
  )

  return (
    <div
      className={cn(
        'flex w-full flex-col items-center gap-2 text-center [word-break:break-word] md:w-[514px] md:gap-4',
        containerClassName,
      )}
      data-figma-node={figmaNodes?.heading ?? CENTERED_SPLIT_COPY_FIGMA_NODES.heading.desktop}
      data-figma-node-mobile={CENTERED_SPLIT_COPY_FIGMA_NODES.heading.mobile}
      data-figma-node-tablet={CENTERED_SPLIT_COPY_FIGMA_NODES.heading.tablet}
      data-name="Heading"
    >
      {Title ? (
        <Title emphasis={heading.emphasis} headingId={headingId} />
      ) : (
        <SplitDisplayHeading
          className="w-full text-[var(--oczki-primary-800)]"
          emphasis={heading.emphasis}
          emphasisPosition={emphasisPosition}
          end={heading.end}
          id={headingId}
          sizeClassName={headingSizeClassName}
          start={heading.start}
        />
      )}

      {bodyNodes}
    </div>
  )
}

export type { CenteredSplitCopyTitleProps }
