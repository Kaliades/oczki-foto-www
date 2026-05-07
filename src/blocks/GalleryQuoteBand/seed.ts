// Seed data for GalleryQuoteBand block.
// Text extracted from Figma node 6592:10202.
// Note: the lead text in Figma begins mid-word ("odczas") — restored to "Podczas" here.

type GalleryQuoteBandSeed = {
  blockType: 'galleryQuoteBand'
  photo: string
  photoAlt?: string
  heading: string
  lead: string
  side: 'left' | 'right'
}

export const GalleryQuoteBandSeed: GalleryQuoteBandSeed = {
  blockType: 'galleryQuoteBand',
  photo: '{{MEDIA:gallery-quote-band.jpg}}',
  photoAlt: 'Sesja fotograficzna — naturalne ujęcie',
  heading: 'Zdjęcia pełne lekkości, na których po prostu czujesz się dobrze',
  lead: 'Podczas sesji nie szukam „perfekcyjnych póz", ale Twojego spokoju i swobody. Moim zadaniem jest stworzyć dla Ciebie taką atmosferę, byś zapomniała o obecności aparatu i mogła po prostu być sobą. Wybieram takie kadry i momenty, które podkreślają Twoją naturalność i kobiecość, dbając o to, byś na każdym ujęciu widziała swoją najlepszą wersję.',
  side: 'left',
}
