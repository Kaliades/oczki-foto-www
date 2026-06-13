import {
  ORNATE_CTA_DESKTOP_CONTENT_IN_FRAME,
  ORNATE_CTA_TABLET_CONTENT_PADDING_X,
  type OrnateCtaLayoutMetrics,
} from './geometry'
import { OrnateCtaBranchDecor } from './OrnateCtaBranchDecor'
import { OrnateCtaCopy } from './OrnateCtaCopy'
import { OrnateCtaFrame } from './OrnateCtaFrame'
import type { OrnateCtaData } from './types'

type OrnateCtaFramedLayoutProps = {
  body: string
  cta: OrnateCtaData['cta']
  heading: OrnateCtaData['heading']
  headingId: string
  metrics: OrnateCtaLayoutMetrics
  variant: 'desktop' | 'tablet'
}

/**
 * Graphic frame (8627) is the positioning root — ornaments and copy are its children.
 */
export function OrnateCtaFramedLayout({
  body,
  cta,
  heading,
  headingId,
  metrics,
  variant,
}: OrnateCtaFramedLayoutProps) {
  const frameCluster =
    variant === 'desktop' ? metrics.desktopFrameCluster : metrics.tabletFrameCluster
  const contentInFrame =
    variant === 'desktop'
      ? ORNATE_CTA_DESKTOP_CONTENT_IN_FRAME
      : metrics.tabletContentInFrame

  const contentClassName =
    variant === 'desktop'
      ? 'absolute z-10 flex flex-col items-center gap-9 px-[336px] py-16'
      : 'absolute z-10 flex flex-col items-center gap-9 pt-16'

  const contentPaddingStyle =
    variant === 'tablet'
      ? {
          paddingLeft: ORNATE_CTA_TABLET_CONTENT_PADDING_X,
          paddingRight: ORNATE_CTA_TABLET_CONTENT_PADDING_X,
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
        <OrnateCtaFrame metrics={metrics} variant={variant} />
        <OrnateCtaBranchDecor metrics={metrics} variant={`${variant}-left`} />
        <OrnateCtaBranchDecor metrics={metrics} variant={`${variant}-right`} />
        <div
          className={contentClassName}
          data-name="Container"
          style={{
            height: contentInFrame.height,
            left: contentInFrame.left,
            top: contentInFrame.top,
            width: contentInFrame.width,
            ...contentPaddingStyle,
          }}
        >
          <OrnateCtaCopy
            body={body}
            cta={cta}
            heading={heading}
            headingId={headingId}
            variant={variant}
          />
        </div>
      </div>
    </div>
  )
}
