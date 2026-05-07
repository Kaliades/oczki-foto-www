import type { Payload } from 'payload'

export async function seedFooter(payload: Payload): Promise<void> {
  payload.logger.info('[seed] seeding footer global…')

  await payload.updateGlobal({
    slug: 'footer',
    draft: false,
    data: {
      logo: null,
      socialLinks: [
        {
          platform: 'instagram',
          url: 'https://www.instagram.com/oczki_fotografia',
          label: 'Instagram Oczki Fotografia',
        },
        {
          platform: 'facebook',
          url: 'https://www.facebook.com/oczkifotografia',
          label: 'Facebook Oczki Fotografia',
        },
      ],
      columnServices: {
        heading: 'Sesje',
        links: [
          { label: 'Sesje kobiece', href: '/sesje-kobiece' },
          { label: 'Reportaże ślubne', href: '/reportaze-slubne' },
          { label: 'Sesje wizerunkowe', href: '/sesje-wizerunkowe' },
          { label: 'Sesje rodzinne', href: '/sesje-rodzinne' },
        ],
      },
      columnSite: {
        heading: 'Strona',
        links: [
          { label: 'Galeria', href: '/galeria' },
          { label: 'O mnie', href: '/o-mnie' },
          { label: 'Kontakt', href: '/kontakt' },
        ],
      },
      newsletter: {
        enabled: false,
        heading: 'Bądź na bieżąco',
        subheading: 'Zapisz się, aby otrzymywać informacje o nowych sesjach i promocjach.',
        placeholder: 'Twój adres e-mail',
        buttonLabel: 'Zapisz się',
        successMessage: 'Dziękujemy za zapisanie się!',
        errorMessage: 'Coś poszło nie tak. Spróbuj ponownie.',
        consentText:
          'Wyrażam zgodę na przetwarzanie moich danych osobowych w celu wysyłki newslettera.',
      },
      copyright: '© {{year}} Oczki Fotografia. Wszystkie prawa zastrzeżone.',
      legalLinks: [
        { label: 'Polityka prywatności', href: '/polityka-prywatnosci' },
        { label: 'Ustawienia cookies', href: '#cookie-settings' },
      ],
    } as never,
  })

  payload.logger.info('[seed] footer global populated')
}
