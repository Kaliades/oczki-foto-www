export const GALLERY_PORTFOLIO_CARD_FIGMA_NODES = {
  card: '7132:9927',
  hoverRoot: '7104:18900',
  image: '7132:9928',
  hoverFrame: '7104:18902',
  captionContainer: '7104:18905',
} as const

export const GALLERY_PORTFOLIO_HOVER_FRAME_SRC =
  '/figma/gallery-portfolio-hover-frame.svg' as const

/** Figma hover tint — dual 36% wash (blush + white). */
export const GALLERY_PORTFOLIO_HOVER_OVERLAY_STYLE = {
  backgroundImage:
    'linear-gradient(90deg, rgba(245, 191, 188, 0.36) 0%, rgba(245, 191, 188, 0.36) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.36) 0%, rgba(255, 255, 255, 0.36) 100%)',
} as const
