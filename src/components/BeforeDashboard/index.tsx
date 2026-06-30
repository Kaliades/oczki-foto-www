import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import './index.scss'

const baseClass = 'before-dashboard'

const rows = [
  {
    panel: 'Strony witryny → Strona główna',
    edits: 'Sekcje na stronie startowej (hero, oferta, galeria, opinie, Instagram, CTA)',
    url: '/',
  },
  {
    panel: 'Strony witryny → O mnie',
    edits: 'Teksty i zdjęcia podstrony O mnie',
    url: '/o-mnie',
  },
  {
    panel: 'Strony witryny → Kontakt',
    edits: 'Formularz, FAQ kontaktowe, obszar działania',
    url: '/kontakt',
  },
  {
    panel: 'Strony witryny → Galeria — ustawienia strony',
    edits: 'Nagłówek portfolio, filtry, sekcje pod siatką zdjęć (nie pojedyncze realizacje)',
    url: '/galeria',
  },
  {
    panel: 'Strony witryny → Polityka prywatności',
    edits: 'Treść prawna',
    url: '/polityka-prywatnosci',
  },
  {
    panel: 'Strony witryny → Oferty',
    edits: 'Kafelki na /oferta oraz pełne podstrony /oferta/[slug]',
    url: '/oferta',
  },
  {
    panel: 'Strony witryny → Realizacje',
    edits: 'Portfolio i pełne case study /galeria/[slug]',
    url: '/galeria',
  },
  {
    panel: 'Zgłoszenia → Zapisy na newsletter',
    edits: 'Osoby zapisane przez formularz w stopce (wpisy powstają automatycznie)',
    url: null,
  },
  {
    panel: 'Wygląd witryny → Nagłówek',
    edits: 'Menu nawigacji i przycisk „Umów sesję"',
    url: '/',
  },
  {
    panel: 'Wygląd witryny → Ustawienia witryny',
    edits: 'Treść newslettera, stopka, social media, kontakt, obraz OG',
    url: '/',
  },
  {
    panel: 'Wygląd witryny → Zgody cookies',
    edits: 'Baner i kategorie (włącz dopiero po aktualizacji polityki)',
    url: '/',
  },
  {
    panel: 'Pliki → Media',
    edits: 'Biblioteka mediów — tu trafiają wgrane zdjęcia',
    url: null,
  },
] as const

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="info">
        <h4>Panel Oczki Fotografia</h4>
      </Banner>
      <p className={`${baseClass}__lead`}>
        Nie tworzysz tutaj „stron” jak w WordPressie. Większość podstron to{' '}
        <strong>pojedyncze wpisy do edycji</strong> (globale). Oferty i realizacje to listy — każda
        pozycja ma własną podstronę.
      </p>
      <table className={`${baseClass}__map`}>
        <thead>
          <tr>
            <th>Gdzie w panelu (lewy pasek)</th>
            <th>Co edytujesz</th>
            <th>Adres na stronie</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.panel}>
              <td>
                <strong>{row.panel}</strong>
              </td>
              <td>{row.edits}</td>
              <td>
                {row.url ? (
                  <a href={row.url} rel="noopener noreferrer" target="_blank">
                    {row.url}
                  </a>
                ) : (
                  '—'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className={`${baseClass}__note`}>
        Po zapisaniu zmian strona odświeża się automatycznie (bez ponownego deployu). Użyj{' '}
        <strong>Podgląd na żywo</strong> przy edycji, żeby zobaczyć efekt od razu.
      </p>
    </div>
  )
}

export default BeforeDashboard
