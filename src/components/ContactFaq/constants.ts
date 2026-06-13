import type { FaqSectionData } from '@/components/FaqSection'

/**
 * Kontakt — FAQ ("Rozwiejmy ostatnie wątpliwości") on `/kontakt`.
 *
 * Figma references (desktop / tablet / mobile):
 *   - desktop 1366: node `7100:7158`
 *   - tablet  768:  node `7100:7234`
 *   - mobile  360:  node `7100:7310`
 */
export const CONTACT_FAQ_FIGMA_NODES = {
  desktop: '7100:7158',
  tablet: '7100:7234',
  mobile: '7100:7310',
} as const

export type ContactFaqData = FaqSectionData

export const contactFaqDefaults: ContactFaqData = {
  heading: {
    emphasis: 'Rozwiejmy',
    start: ' ostatnie wątpliwości',
  },
  intro:
    'Wiem, że w Twojej głowie może pojawić się jeszcze kilka pytań. Spokojnie, przygotowałam na nie odpowiedzi, byś mogła podjąć decyzję z pełnym spokojem.',
  items: [
    {
      id: 'date-location',
      question: 'Czy muszę mieć już wybrany konkretny termin i miejsce?',
      answer:
        'Absolutnie nie. Jeśli masz wybraną datę (np. na ślub), to świetnie – sprawdzę ją od razu. Ale jeśli dopiero myślisz o sesji i nie wiesz, czy wolisz studio w Krakowie, czy zachód słońca na polanie, po prostu napisz. Wspólnie znajdziemy moment i miejsce, które najlepiej oddadzą Twój klimat.',
    },
    {
      id: 'form-details',
      question: 'O czym warto wspomnieć w formularzu?',
      answer:
        'Najważniejsze to rodzaj sesji i przybliżony termin — resztę doprecyzujemy w rozmowie. Jeśli masz już miejsce w głowie, napisz. Jeśli marzysz o czymś zupełnie innym — też śmiało. Kilka zdań o tym, czego szukasz, w zupełności wystarczy, bym mogła odpowiedzieć konkretnie.',
    },
    {
      id: 'process',
      question: 'Jak wygląda proces po wysłaniu zapytania?',
      answer:
        'Odpowiadam zazwyczaj w ciągu 1–2 dni roboczych. Najpierw ustalamy, czego potrzebujesz i jaki termin Ci pasuje. Potem dostaniesz ode mnie propozycję — bez presji, w tempie, które Ci odpowiada.',
    },
    {
      id: 'formalities',
      question: 'Czy rezerwacja terminu wymaga jakichś formalności?',
      answer:
        'Tak — po ustaleniu szczegółów poproszę o podpisanie umowy i wpłatę zadatku, który rezerwuje termin w kalendarzu. Wszystko jasno i przejrzyście, bez niespodzianek.',
    },
    {
      id: 'travel',
      question: 'Czy dojeżdżasz poza Kraków?',
      answer:
        'Tak, regularnie fotografuję w całej Małopolski i dalej — tam, gdzie planujecie Waszą historię. W granicach Krakowa dojazd jest w cenie sesji.',
    },
    {
      id: 'travel-cost',
      question: 'Jak rozliczany jest koszt dojazdu?',
      answer:
        'W Krakowie dojazd jest wliczony w cenę. Poza miastem koszt ustalamy indywidualnie — zależy od odległości i charakteru sesji. Zawsze informuję o tym przed rezerwacją.',
    },
    {
      id: 'urgent',
      question: 'Co jeśli potrzebuję zdjęć „na wczoraj”?',
      answer:
        'Napisz jak najszybciej — sprawdzę, czy w kalendarzu jest wolne okno. Ekspresowe terminy nie zawsze są możliwe, ale zawsze szczerze powiem, co da się zrobić.',
    },
    {
      id: 'pre-meeting',
      question: 'Czy możemy spotkać się przed sesją lub ślubem?',
      answer:
        'Oczywiście! Spotkanie online lub kawę w Krakowie traktuję jako naturalny element współpracy — szczególnie przed ślubem, byśmy się poznali i poczuli swobodnie przed aparatem.',
    },
  ],
}
