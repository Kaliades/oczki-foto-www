export const LEGAL_DOCUMENT_ASSETS = {
  bulletIcon: '/figma/legal-document-bullet.svg',
  tocArrowIcon: '/figma/legal-document-toc-arrow.svg',
} as const

export const LEGAL_DOCUMENT_SHELL = {
  sectionPadding: {
    mobile: { top: 24, x: 16, bottom: 80 },
    tablet: { top: 36, x: 80, bottom: 128 },
    desktop: { top: 36, x: 80, bottom: 128 },
  },
  layoutGap: {
    mobile: 48,
    tablet: 80,
    desktop: 138,
  },
  tocPadding: {
    mobile: { x: 12, top: 8, bottom: 12 },
    tablet: { x: 20, top: 12, bottom: 20 },
    desktop: { x: 20, top: 12, bottom: 20 },
  },
  tocWidthDesktop: 398,
  copyWidthDesktop: 670,
  tocRowHeight: 44,
  tocActiveGap: 10,
  copyIntroGap: {
    mobile: 36,
    tablet: 64,
    desktop: 64,
  },
  introBlock: {
    gap: 16,
    paddingBottom: { mobile: 24, tablet: 36, desktop: 36 },
    mobileOpacity: 0.8,
  },
  sectionsGap: 48,
  sectionBlockGap: 12,
  bodyIntroToListGap: 16,
  bulletListGap: 12,
  bulletRowGap: 8,
  bulletCopyGap: 6,
  bulletIconOffsetTop: 2,
} as const

export type LegalDocumentBulletItem = {
  description?: string
  id: string
  title: string
}

export type LegalDocumentSectionData = {
  body?: string
  bullets?: readonly LegalDocumentBulletItem[]
  id: string
  intro?: string
  number: number
  title: string
}

export type LegalDocumentTocItem = {
  id: string
  label: string
}

export type LegalDocumentContentData = {
  intro: string
  sections: readonly LegalDocumentSectionData[]
  title: string
  toc: readonly LegalDocumentTocItem[]
}
