// Seed content extracted from Figma node 6592:6450 (GalleryNewsletter section).
// Text sourced directly from Figma TEXT nodes — do not translate or paraphrase.
// Note: button label in Figma reads "Dołącz do newslttera" (typo) — corrected to "Zapisz się"
// per the agreed default value in config.ts.

type GalleryNewsletterSeed = {
  blockType: 'galleryNewsletter'
  heading: string
  lead?: string
  nameLabel?: string
  emailLabel?: string
  consentText?: string
  consentLinkLabel?: string
  consentLinkUrl?: string
  submitLabel?: string
  successMessage?: string
  errorMessage?: string
}

export const GalleryNewsletterSeed: GalleryNewsletterSeed = {
  blockType: 'galleryNewsletter',
  heading: 'Małe wskazówki, wielka pewność siebie przed aparatem',
  lead: 'Nie musisz zapisywać się na sesję, żeby poczuć różnicę. W moim newsletterze dzielę się krótkimi poradami i inspiracjami, które pomagają.',
  nameLabel: 'Imię',
  emailLabel: 'Email',
  consentText: 'Wyrażam zgodę na politykę prywatności',
  consentLinkLabel: 'politykę prywatności',
  consentLinkUrl: '/polityka-prywatnosci',
  submitLabel: 'Zapisz się',
  successMessage: 'Dziękujemy! Sprawdź skrzynkę.',
  errorMessage: 'Coś poszło nie tak. Spróbuj ponownie.',
}
