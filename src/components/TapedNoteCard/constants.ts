/** Figma `Container` card — cream note with tape and drop shadow. */
export const TAPED_NOTE_CARD_FIGMA_NODES = {
  container: {
    desktop: '6994:26388',
    mobile: '7102:10282',
    tablet: '7100:8616',
  },
  heading: {
    desktop: '6994:26390',
    mobile: '7102:10284',
    tablet: '7100:8618',
  },
  body: {
    desktop: '6994:26392',
    mobile: '7102:10286',
    tablet: '7100:8620',
  },
  button: {
    desktop: '7063:14413',
    mobile: '7102:10287',
    tablet: '7100:8621',
  },
  tape: {
    desktop: '6999:26921',
    mobile: '7102:10288',
    tablet: '7100:8622',
  },
} as const

export const TAPED_NOTE_CARD_TAPE = {
  desktop: { height: 77, src: '/figma/taped-note-card-tape.svg', width: 134 },
  mobile: { height: 58, src: '/figma/taped-note-card-tape.svg', width: 102 },
} as const

export const TAPED_NOTE_CARD_SHADOW =
  'drop-shadow-[1px_4px_2.9px_rgba(53,39,25,0.16),6px_11px_6.65px_rgba(53,39,25,0.08)]'
