export const HOME_EASE_FIGMA_NODES = {
  desktopFrame: '6912:13184',
  tabletFrame: '7104:18140',
  mobileFrame: '7104:19341',
} as const

export type HomeEaseData = {
  heading: {
    start: string
    emphasis: string
  }
  body: string
  tiltedPhoto: {
    src: string
    alt: string
  }
}

// TODO(galeria/ease): Replace defaults with Payload gallery page block once CMS schema ships.
export const homeEaseDefaults: HomeEaseData = {
  heading: {
    start: 'Zdjęcia pełne lekkości, na których po prostu ',
    emphasis: 'czujesz się dobrze',
  },
  body:
    'Podczas sesji nie szukam „perfekcyjnych póz”, ale Twojego spokoju i swobody. Moim zadaniem jest stworzyć dla Ciebie taką atmosferę, byś zapomniała o obecności aparatu i mogła po prostu być sobą. Wybieram takie kadry i momenty, które podkreślają Twoją naturalność i kobiecość, dbając o to, byś na każdym ujęciu widziała swoją najlepszą wersję.',
  tiltedPhoto: {
    src: '/figma/ease-tilted-photo.png',
    alt: 'Para młoda podczas ceremonii — czarno-biały kadr w ramce',
  },
}
