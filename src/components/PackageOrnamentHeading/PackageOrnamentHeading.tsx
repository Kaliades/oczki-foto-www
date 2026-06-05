import type { PackagePanelTheme } from '@/components/PackagePanel/constants'

import { PACKAGE_ORNAMENT_ASSETS, PACKAGE_ORNAMENT_HEADING_LAYOUT } from './constants'

type PackageOrnamentHeadingProps = {
  figmaNode?: string
  theme: PackagePanelTheme
  title: string
}

/**
 * Package title row — Figma `Heading container`.
 *
 * Mobile: 42.182×29 ornament slot, gap 10 px, header/s.
 * Tablet/desktop: 52.364×36 slot, gap 12 px, header/s.
 */
export function PackageOrnamentHeading({ figmaNode, theme, title }: PackageOrnamentHeadingProps) {
  const ornamentSrc = PACKAGE_ORNAMENT_ASSETS[theme]
  const { desktop, mobile } = PACKAGE_ORNAMENT_HEADING_LAYOUT

  return (
    <div
      className="flex items-center gap-2.5 md:gap-3"
      data-figma-node={figmaNode}
      data-name="Heading container"
    >
      <div
        aria-hidden="true"
        className="flex shrink-0 items-center justify-center md:hidden"
        style={{ height: mobile.slotHeightPx, width: mobile.slotWidthPx }}
      >
        <div className="rotate-90">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="pointer-events-none block select-none"
            height={mobile.assetHeightPx}
            src={ornamentSrc}
            width={mobile.assetWidthPx}
          />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="hidden shrink-0 items-center justify-center md:flex"
        style={{ height: desktop.slotHeightPx, width: desktop.slotWidthPx }}
      >
        <div className="rotate-90">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="pointer-events-none block select-none"
            height={desktop.assetHeightPx}
            src={ornamentSrc}
            width={desktop.assetWidthPx}
          />
        </div>
      </div>

      <h3 className="oczki-heading-s shrink-0 text-[20px] tracking-[-0.2px] whitespace-nowrap text-[var(--oczki-primary-800)] md:text-[24px] md:tracking-[-0.24px]">
        {title}
      </h3>
    </div>
  )
}
