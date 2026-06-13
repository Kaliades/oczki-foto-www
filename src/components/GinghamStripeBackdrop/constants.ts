/** Figma gingham stripe width — alternating tertiary/300 and tertiary/500. */
export const GINGHAM_STRIPE_WIDTH_PX = 43 as const

/** Figma wave-band row pitch inside the gingham overlay (`7001:2042`). */
export const GINGHAM_WAVE_BAND_ROW_PITCH_PX = 108 as const

/** Reference artboard width — stripe phase locks to this centred box (`7001:2009`). */
export const GINGHAM_ARTBOARD_WIDTH_PX = 1366 as const

export const GINGHAM_STRIPE_BACKDROP_FIGMA_NODES = {
  shell: '7001:2008',
  stripes: '7001:2009',
  waveBands: '7001:2042',
} as const
