import { SplitDisplayHeading } from '@/components/SplitDisplayHeading/SplitDisplayHeading'
import { cn } from '@/utilities/ui'

import type { PhotoOverlayIntroHeading } from './constants'

type PhotoOverlayIntroProps = {
  body: string
  bodyClassName?: string
  figmaNodes?: {
    body?: string
    heading?: string
  }
  heading: PhotoOverlayIntroHeading
  headingId: string
}

/**
 * Display heading + lead copy for photo-overlay panels — left on mobile, centred tablet+.
 *
 * Figma `Container` (`6998:26789` / `7092:4632` / `7093:6017`):
 *   <div Container>
 *     ├── <h2> — header/m with italic emphasis
 *     └── <p> — body/l
 */
export function PhotoOverlayIntro({
  body,
  bodyClassName,
  figmaNodes,
  heading,
  headingId,
}: PhotoOverlayIntroProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-start gap-2.5 [word-break:break-word]',
        'md:items-center md:gap-4 md:text-center',
      )}
      data-figma-node={figmaNodes?.heading}
      data-name="Container"
    >
      <SplitDisplayHeading
        className="w-full text-left text-[var(--oczki-primary-800)] md:text-center"
        emphasis={heading.emphasis}
        emphasisPosition="end"
        end={heading.end}
        id={headingId}
        start={heading.start}
      />

      <p
        className={cn(
          'oczki-body-l w-full tracking-[-0.24px] text-[var(--oczki-primary-700)]',
          bodyClassName,
        )}
        data-figma-node={figmaNodes?.body}
      >
        {body}
      </p>
    </div>
  )
}
