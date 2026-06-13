import {
  PRIMARY_BORDERED_PANEL_FIGMA_NODES,
  PRIMARY_BORDERED_PANEL_LAYOUT,
} from './constants'

export type PrimaryBorderedPanelProps = {
  description: string
  figmaNode?: string
  title: string
}

/**
 * Title + body copy in a primary/400 bordered well — Figma `Content container`.
 *
 * <div Content container> — border primary-400, p 16
 *   └── <div Content container> — gap 6 px
 *       ├── title — body/l, primary-800
 *       └── description — body/m, primary-700
 */
export function PrimaryBorderedPanel({ description, figmaNode, title }: PrimaryBorderedPanelProps) {
  return (
    <div
      className="flex w-full flex-col items-start border border-solid border-[var(--oczki-primary-400)] p-4"
      data-figma-node={figmaNode ?? PRIMARY_BORDERED_PANEL_FIGMA_NODES.desktop}
      data-name="Content container"
    >
      <div
        className="flex w-full flex-col items-start [word-break:break-word]"
        data-name="Content container"
        style={{ gap: PRIMARY_BORDERED_PANEL_LAYOUT.copyGapPx }}
      >
        <p className="oczki-body-l w-full tracking-[-0.24px] text-[var(--oczki-primary-800)]">{title}</p>
        <p className="oczki-body-m w-full tracking-[-0.14px] text-[var(--oczki-primary-700)]">
          {description}
        </p>
      </div>
    </div>
  )
}
