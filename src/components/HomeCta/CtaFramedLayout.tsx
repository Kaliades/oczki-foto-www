import {
  CTA_DESKTOP_CONTENT_IN_FRAME,
  CTA_DESKTOP_FRAME_CLUSTER,
  CTA_TABLET_CONTENT_IN_FRAME,
  CTA_TABLET_CONTENT_PADDING_X,
  CTA_TABLET_FRAME_CLUSTER,
  type HomeCtaData,
} from './constants'
import { CtaBranchDecor } from './CtaBranchDecor'
import { CtaContent } from './CtaContent'
import { CtaOrnateFrame } from './CtaOrnateFrame'

type CtaFramedLayoutProps = {
  body: string
  cta: HomeCtaData['cta']
  headingEmphasis: string
  headingPlain: string
  variant: 'desktop' | 'tablet'
}

/**
 * Graphic frame (8627) is the positioning root — ornaments and copy are its children.
 */
export const CtaFramedLayout = ({
  body,
  cta,
  headingEmphasis,
  headingPlain,
  variant,
}: CtaFramedLayoutProps) => {
  const frameCluster =
    variant === 'desktop' ? CTA_DESKTOP_FRAME_CLUSTER : CTA_TABLET_FRAME_CLUSTER
  const contentInFrame =
    variant === 'desktop' ? CTA_DESKTOP_CONTENT_IN_FRAME : CTA_TABLET_CONTENT_IN_FRAME

  const contentClassName =
    variant === 'desktop'
      ? 'absolute z-10 flex flex-col items-center gap-9 px-[336px] py-16'
      : 'absolute z-10 flex flex-col items-center gap-9 pt-16'

  const contentPaddingStyle =
    variant === 'tablet'
      ? {
          paddingLeft: CTA_TABLET_CONTENT_PADDING_X,
          paddingRight: CTA_TABLET_CONTENT_PADDING_X,
        }
      : undefined

  return (
    <div
      className="absolute overflow-visible"
      style={{
        height: frameCluster.height,
        left: frameCluster.leftInShell,
        top: frameCluster.topInShell,
        width: frameCluster.width,
      }}
    >
      <div className="relative size-full overflow-visible">
        <CtaOrnateFrame variant={variant} />
        <CtaBranchDecor variant={`${variant}-left`} />
        <CtaBranchDecor variant={`${variant}-right`} />
        <div
          className={contentClassName}
          style={{
            height: contentInFrame.height,
            left: contentInFrame.left,
            top: contentInFrame.top,
            width: contentInFrame.width,
            ...contentPaddingStyle,
          }}
        >
          <CtaContent
            body={body}
            cta={cta}
            headingEmphasis={headingEmphasis}
            headingPlain={headingPlain}
            variant={variant}
          />
        </div>
      </div>
    </div>
  )
}
