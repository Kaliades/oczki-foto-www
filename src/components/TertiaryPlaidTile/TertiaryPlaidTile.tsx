import { TERTIARY_PLAID_TILE, type TertiaryPlaidTileSize } from './constants'

type TertiaryPlaidTileProps = {
  /** `152` px desktop/tablet (`6989:25550`); `98` px mobile (`7102:16697`). */
  size?: TertiaryPlaidTileSize
}

/**
 * Pink plaid square — Figma `Thumbnails Container`.
 *
 * <div clip 152|98 px, py 3 px>
 * ├── Thumbnails Row — 668×749, centred, top −5; 32×43 px stripes
 * └── Text Container — left −21, top 10; 7 cross-bar rows (gap 48 / 24)
 */
export function TertiaryPlaidTile({ size = 'desktop' }: TertiaryPlaidTileProps) {
  const config = TERTIARY_PLAID_TILE[size]
  const crossBarColor = `rgba(219, 160, 160, ${config.barOpacity})`

  return (
    <div
      aria-hidden="true"
      className="relative shrink-0 overflow-hidden"
      data-name="Thumbnails Container"
      style={{
        height: config.clipSize,
        paddingBlock: config.verticalPadding,
        width: config.clipSize,
      }}
    >
      <div
        className="absolute left-1/2 flex -translate-x-1/2 items-center"
        data-name="Thumbnails Row"
        style={{
          height: config.rowHeight,
          top: config.rowTop,
          width: config.rowWidth,
        }}
      >
        {Array.from({ length: config.stripeCount }, (_, index) => (
          <div
            className="relative h-full shrink-0"
            key={index}
            style={{
              backgroundColor:
                index % 2 === 0
                  ? 'var(--oczki-tertiary-300)'
                  : 'var(--oczki-tertiary-500)',
              width: config.stripeWidth,
            }}
          />
        ))}
      </div>

      <div
        className="absolute flex flex-col items-start"
        data-name="Text Container"
        style={{
          gap: config.rowGap,
          left: config.crossBarLeft,
          top: config.crossBarTop,
          width: config.crossBarWidth,
        }}
      >
        {Array.from({ length: 7 }, (_, rowIndex) => (
          <div
            className="flex w-full flex-col items-start"
            data-name="Text Row"
            key={rowIndex}
            style={{ gap: config.barGap, height: config.barRowHeight }}
          >
            <div
              className="relative shrink-0"
              style={{
                backgroundColor: crossBarColor,
                height: config.barHeightSmall,
                width: '100%',
              }}
            />
            <div
              className="relative shrink-0"
              style={{
                backgroundColor: crossBarColor,
                height: config.barHeightLarge,
                width: '100%',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
