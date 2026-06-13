import type { LegalDocumentContentData } from '@/components/LegalDocument'

/**
 * Figma `Polityka-prywatnosci` — privacy policy content section.
 *
 *   - desktop 1366: https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=3668-4879
 *   - tablet  768:  https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7108-16049
 *   - mobile  360:  https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7108-16685
 */
export const PRIVACY_POLICY_FIGMA_NODES = {
  section: {
    desktop: '3668:4879',
    tablet: '7108:16049',
    mobile: '7108:16685',
  },
  container: {
    desktop: '7108:16043',
    tablet: '7108:16050',
    mobile: '7108:16686',
  },
  toc: {
    desktop: '7108:16024',
    tablet: '7108:16051',
    mobile: '7108:16687',
  },
  copy: {
    desktop: '3668:4880',
    tablet: '7108:16068',
    mobile: '7108:16704',
  },
  intro: {
    desktop: '3668:4881',
    tablet: '7108:16069',
    mobile: '7108:16705',
  },
  sections: {
    desktop: '7108:16044',
    tablet: '7108:16072',
    mobile: '7108:16708',
  },
} as const

export type PrivacyPolicyData = LegalDocumentContentData & {
  pageTitle: string
}

export const privacyPolicyDefaults: PrivacyPolicyData = {
  pageTitle: 'Polityka prywatności',
  title: 'Polityka prywatności',
  intro:
    'Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych przekazywanych przez Użytkowników w związku z korzystaniem z usług fotograficznych oraz strony internetowej.',
  toc: [
    { id: 'privacy-administrator', label: 'Administrator danych osobowych' },
    { id: 'privacy-scope', label: 'Zakres i cel przetwarzania danych' },
    { id: 'privacy-recipients', label: 'Odbiorcy danych' },
    { id: 'privacy-retention', label: 'Okres przechowywania danych' },
    { id: 'privacy-rights', label: 'Twoje prawa' },
    { id: 'privacy-cookies', label: 'Pliki Cookies (Ciasteczka)' },
    { id: 'privacy-changes', label: 'Zmiany w Polityce Prywatności' },
  ],
  sections: [
    {
      id: 'privacy-administrator',
      number: 1,
      title: 'Administrator danych osobowych',
      body: 'Administratorem danych osobowych jest Oczki Fotografia [Twoje Imię i Nazwisko] z siedzibą w Krakowie. W sprawach dotyczących ochrony prywatności oraz Twoich danych możesz się z nami skontaktować pod adresem e-mail: [Twój e-mail] lub telefonicznie: [Twój numer].',
    },
    {
      id: 'privacy-scope',
      number: 2,
      title: 'Zakres i cel przetwarzania danych',
      intro: 'Przetwarzamy Twoje dane osobowe w następujących celach:',
      bullets: [
        {
          id: 'scope-contract',
          title: 'Realizacja umowy i usług fotograficznych',
          description:
            'Dane takie jak imię, nazwisko, adres oraz numer telefonu są niezbędne do przygotowania umowy, ustalenia szczegółów sesji (wybór miejsca, stylizacji) oraz dojazdu na miejsce zlecenia (art. 6 ust. 1 lit. b RODO).',
        },
        {
          id: 'scope-contact',
          title: 'Obsługa zapytań przez formularz kontaktowy',
          description:
            'Dane przekazane w formularzu służą do udzielenia odpowiedzi na Twoje pytania oraz przedstawienia spersonalizowanej oferty (art. 6 ust. 1 lit. f RODO).',
        },
        {
          id: 'scope-gallery',
          title: 'Udostępnianie wyników pracy',
          description:
            'Korzystamy z systemu Photonesto, aby zapewnić Ci wygodny dostęp do galerii online, w której dokonujesz selekcji zdjęć (art. 6 ust. 1 lit. b RODO).',
        },
        {
          id: 'scope-finance',
          title: 'Rozliczenia finansowe i obowiązki podatkowe',
          description:
            'Przetwarzanie danych w celu wystawienia faktur i prowadzenia dokumentacji księgowej (art. 6 ust. 1 lit. c RODO).',
        },
        {
          id: 'scope-marketing',
          title: 'Budowanie portfolio i działania marketingowe',
          description:
            'Publikacja Twojego wizerunku na naszej stronie www oraz w mediach społecznościowych odbywa się wyłącznie na podstawie Twojej odrębnej, dobrowolnej zgody (art. 6 ust. 1 lit. a RODO).',
        },
      ],
    },
    {
      id: 'privacy-recipients',
      number: 3,
      title: 'Odbiorcy danych',
      intro:
        'Dostęp do Twoich danych mogą mieć wyłącznie podmioty wspierające naszą działalność, z którymi posiadamy stosowne umowy powierzenia:',
      bullets: [
        {
          id: 'recipients-photonesto',
          title: 'Photonesto',
          description:
            'Nasz partner dostarczający chronioną hasłem galerię online (serwery na terenie EOG).',
        },
        {
          id: 'recipients-hosting',
          title: 'Hosting i Poczta',
          description:
            'Podmiot dostarczający miejsce na serwerze dla naszej strony i poczty e-mail.',
        },
        {
          id: 'recipients-print',
          title: 'Drukarnie i laboratoria fotograficzne',
          description: 'Wyłącznie w zakresie niezbędnym do wydrukowania Twoich zdjęć.',
        },
        {
          id: 'recipients-analytics',
          title: 'Narzędzia analityczne',
          description:
            'Korzystamy z Google Analytics (Google LLC) oraz Meta Pixel (Meta Platforms, Inc.). W związku z tym dane mogą być przesyłane do USA, co odbywa się w oparciu o standardowe klauzule umowne i mechanizmy certyfikacji (Data Privacy Framework).',
        },
        {
          id: 'recipients-accounting',
          title: 'Obsługa księgowa',
          description: 'Biuro rachunkowe obsługujące nasze rozliczenia.',
        },
        {
          id: 'recipients-logistics',
          title: 'Podmioty logistyczne',
          description: 'Firmy kurierskie dostarczające gotowe produkty do Twoich rąk.',
        },
      ],
    },
    {
      id: 'privacy-retention',
      number: 4,
      title: 'Okres przechowywania danych',
      intro: 'Dane przechowujemy przez okresy wymagane prawem lub niezbędne do realizacji celów:',
      bullets: [
        {
          id: 'retention-accounting',
          title: 'Dokumentacja księgowa',
          description:
            '5 lat od końca roku kalendarzowego, w którym upłynął termin płatności podatku.',
        },
        {
          id: 'retention-inquiries',
          title: 'Zapytania ofertowe',
          description: '12 miesięcy, jeśli nie dojdzie do podpisania umowy.',
        },
        {
          id: 'retention-portfolio',
          title: 'Wizerunek i portfolio',
          description:
            'Do czasu wycofania przez Ciebie zgody lub zakończenia prowadzenia działalności przez Administratora.',
        },
      ],
    },
    {
      id: 'privacy-rights',
      number: 5,
      title: 'Twoje prawa',
      intro: 'Zgodnie z RODO przysługuje Ci:',
      bullets: [
        {
          id: 'rights-access',
          title: 'Prawo dostępu do treści swoich danych oraz otrzymania ich kopii.',
        },
        {
          id: 'rights-rectification',
          title: 'Prawo do sprostowania (poprawienia) swoich danych.',
        },
        {
          id: 'rights-erasure',
          title:
            'Prawo do usunięcia danych („prawo do bycia zapomnianym”), jeśli nie ma podstaw prawnych do ich dalszego przetwarzania.',
        },
        {
          id: 'rights-restriction',
          title: 'Prawo do ograniczenia przetwarzania.',
        },
        {
          id: 'rights-objection',
          title:
            'Prawo do sprzeciwu wobec przetwarzania danych w celach marketingowych lub statystycznych.',
        },
        {
          id: 'rights-portability',
          title: 'Prawo do przenoszenia danych.',
        },
        {
          id: 'rights-withdraw-consent',
          title:
            'Prawo do cofnięcia zgody w dowolnym momencie (pozostaje to bez wpływu na zgodność z prawem przetwarzania, którego dokonano przed jej cofnięciem).',
        },
        {
          id: 'rights-complaint',
          title:
            'Prawo do wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa).',
        },
      ],
    },
    {
      id: 'privacy-cookies',
      number: 6,
      title: 'Pliki Cookies (Ciasteczka)',
      intro:
        'Nasza strona wykorzystuje pliki cookies, aby działać sprawnie i dopasować się do Twoich potrzeb.',
      bullets: [
        {
          id: 'cookies-essential',
          title: 'Cookies niezbędne',
          description: 'Konieczne do poprawnego wyświetlania strony.',
        },
        {
          id: 'cookies-analytics',
          title: 'Cookies analityczne',
          description:
            'Pozwalają nam badać, jak Użytkownicy korzystają ze strony, co pozwala nam ją ulepszać (Google Analytics).',
        },
        {
          id: 'cookies-marketing',
          title: 'Cookies marketingowe',
          description:
            'Umożliwiają wyświetlanie reklam dopasowanych do Twoich zainteresowań (np. Facebook Pixel).',
        },
        {
          id: 'cookies-management',
          title: 'Zarządzanie',
          description:
            'Możesz wyłączyć lub ograniczyć obsługę cookies w ustawieniach swojej przeglądarki, jednak może to wpłynąć na funkcjonalność niektórych elementów strony.',
        },
      ],
    },
    {
      id: 'privacy-changes',
      number: 7,
      title: 'Zmiany w Polityce Prywatności',
      body: 'Zastrzegamy sobie prawo do zmian w niniejszej polityce, wynikających z rozwoju technologii lub zmian w prawie. Aktualna wersja będzie zawsze dostępna pod adresem [Link do strony].',
    },
  ],
}
