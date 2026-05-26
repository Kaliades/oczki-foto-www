import type { GalleryPortfolioCardData } from '@/components/GalleryPortfolioCard'

export const GALLERY_PORTFOLIO_FIGMA_NODES = {
  desktop: '6912:13163',
  tablet: '7104:18116',
  mobile: '7104:19317',
  imageGallery: {
    desktop: '6912:13164',
    tablet: '7104:18117',
    mobile: '7104:19318',
  },
  imageContainer: {
    desktop: '6912:13165',
    tablet: '7104:18118',
    mobile: '7104:19319',
  },
  loadMore: {
    desktop: '6915:16328',
    tablet: '7104:18138',
    mobile: '7104:19339',
  },
} as const

export const GALLERY_PORTFOLIO_LOAD_MORE_LABEL = 'Zobacz więcej zdjęć' as const

const PORTFOLIO_IMAGE = (index: number) =>
  `/figma/gallery-portfolio-${index}.png` as const

/** Figma-exported crops for tiles that overflow the frame in the design. */
const CROP_TOP_LIGHT = 'absolute left-0 h-[120.76%] w-full max-w-none top-[-7.85%]' as const
const CROP_TOP_DEEP = 'absolute left-0 h-[120.76%] w-full max-w-none top-[-20.76%]' as const

export type GalleryPortfolioData = {
  items: readonly GalleryPortfolioCardData[]
  loadMoreLabel?: string
}

export const galleryPortfolioDefaults: GalleryPortfolioData = {
  loadMoreLabel: GALLERY_PORTFOLIO_LOAD_MORE_LABEL,
  items: [
    {
      id: '1',
      imageSrc: PORTFOLIO_IMAGE(1),
      imageAlt: 'Sesja plenerowa — Divja',
      caption: { title: 'Divja', subtitle: 'Sesja plenerowa z modelką' },
      cropClassName: CROP_TOP_LIGHT,
    },
    {
      id: '2',
      imageSrc: PORTFOLIO_IMAGE(2),
      imageAlt: 'Portret kobiecy w plenerze',
    },
    {
      id: '3',
      imageSrc: PORTFOLIO_IMAGE(3),
      imageAlt: 'Sesja wizerunkowa na tle architektury',
      cropClassName: CROP_TOP_DEEP,
    },
    {
      id: '4',
      imageSrc: PORTFOLIO_IMAGE(4),
      imageAlt: 'Para podczas sesji narzeczeńskiej',
    },
    {
      id: '5',
      imageSrc: PORTFOLIO_IMAGE(5),
      imageAlt: 'Reportaż ślubny — pierwszy taniec',
    },
    {
      id: '6',
      imageSrc: PORTFOLIO_IMAGE(6),
      imageAlt: 'Sesja rodzinna w ogrodzie',
    },
    {
      id: '7',
      imageSrc: PORTFOLIO_IMAGE(7),
      imageAlt: 'Portret kobiecy w studio',
    },
    {
      id: '8',
      imageSrc: PORTFOLIO_IMAGE(8),
      imageAlt: 'Sesja narzeczeńska w mieście',
    },
    {
      id: '9',
      imageSrc: PORTFOLIO_IMAGE(9),
      imageAlt: 'Detal sukni ślubnej',
    },
    {
      id: '10',
      imageSrc: PORTFOLIO_IMAGE(10),
      imageAlt: 'Sesja kobieca w naturalnym świetle',
    },
    {
      id: '11',
      imageSrc: PORTFOLIO_IMAGE(11),
      imageAlt: 'Para na sesji plenerowej',
    },
    {
      id: '12',
      imageSrc: PORTFOLIO_IMAGE(12),
      imageAlt: 'Portret wizerunkowy',
    },
  ],
}
