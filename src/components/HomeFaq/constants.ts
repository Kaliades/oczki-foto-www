import type { AccordionItemData } from '@/components/Accordion/AccordionItem'

export const HOME_FAQ_FIGMA_NODES = {
  desktopFrame: '7104:17886',
  tabletFrame: '7104:18237',
  mobileFrame: '7104:19438',
} as const

export type HomeFaqData = {
  heading: {
    emphasis: string
    start: string
  }
  intro: string
  items: AccordionItemData[]
}

// TODO(galeria/faq): Replace defaults with Payload gallery page block once CMS schema ships.
export const homeFaqDefaults: HomeFaqData = {
  heading: {
    emphasis: 'Rozwiejmy',
    start: ' ostatnie wątpliwości',
  },
  intro:
    'Wiem, że w Twojej głowie może pojawić się jeszcze kilka pytań. Spokojnie, przygotowałam na nie odpowiedzi, byś mogła podjąć decyzję z pełnym spokojem.',
  items: [
    {
      id: 'styling',
      question: '„Nie mam się w co ubrać!” – czy pomożesz mi z wyborem stylizacji?',
      answer:
        'Oczywiście! To jeden z najczęstszych dylematów. Po rezerwacji otrzymasz ode mnie autorski poradnik, ale na tym nie koniec. Możesz wysłać mi zdjęcia swoich propozycji, a ja podpowiem, co najlepiej "zagra" z tłem i światłem. Pamiętaj, że czasem zwykły biały T-shirt, jeansy i Twoja ulubiona biżuteria tworzą najbardziej magiczne kadry.',
    },
    {
      id: 'posing',
      question: 'Czy muszę umieć pozować? Czuję się sztywno przed aparatem',
      answer:
        'Absolutnie nie. Podczas sesji prowadzę Cię krok po kroku — delikatnie sugeruję ruchy i pozycje, które wyglądają naturalnie i podkreślają Twoją kobiecość. Najważniejsze, byś czuła się swobodnie; resztą zajmę się ja, obserwując światło i momenty, które najlepiej Cię oddają.',
    },
    {
      id: 'makeup',
      question: 'Co z makijażem i fryzurą? Muszę o to zadbać sama?',
      answer:
        'Możesz przyjść ze swoim sprawdzonym makijażem i fryzurą albo skorzystać z pomocy mojej zaufanej wizażystki i fryzjerki — chętnie podzielę się kontaktami. Ważne, by efekt był lekki i naturalny, a Ty czuła się sobą przez całą sesję.',
    },
    {
      id: 'retouch',
      question: 'Czy retuszujesz zdjęcia?',
      answer:
        'Tak, każde wybrane zdjęcie przechodzi przez mój autorski workflow obróbki. Retuszuję w sposób subtelny — wyrównuję kolory, poprawiam światło i drobne detale, ale zawsze zostawiam Cię rozpoznawalną i naturalną. Bez przerysowanych filtrów i sztucznego efektu.',
    },
    {
      id: 'bad-day',
      question: 'Co jeśli w dniu sesji będę miała gorszy humor lub źle się poczuję?',
      answer:
        'Twoje samopoczucie jest dla mnie priorytetem. Sesja może być spokojniejsza, z przerwami na kawę i odpoczynek. Jeśli poczujesz, że tego dnia to za dużo — wspólnie ustalimy nowy termin bez presji. Chcę, by wspomnienie sesji było równie piękne co zdjęcia.',
    },
    {
      id: 'location',
      question: 'Gdzie dokładnie robimy zdjęcia? Masz swoje studio?',
      answer:
        'Sesje realizuję głównie w moim jasnym, kameralnym studio w Krakowie, ale chętnie spotykam się też w plenerze lub w wybranym przez Ciebie miejscu. Przed sesją omawiamy lokalizację i dopasowujemy ją do charakteru Twojej historii.',
    },
    {
      id: 'privacy',
      question: 'Czy moje zdjęcia trafią do sieci? Trochę się wstydzę',
      answer:
        'Twoja prywatność jest dla mnie święta. Zdjęcia publikuję wyłącznie za Twoją wyraźną zgodą — zawsze wiesz, co i gdzie może się pojawić. Jeśli wolisz zachować sesję tylko dla siebie, w pełni to szanuję.',
    },
    {
      id: 'delivery',
      question: 'Ile będę czekać na gotowe zdjęcia?',
      answer:
        'Standardowy czas realizacji to około 3–4 tygodnie od dnia sesji. Każde zdjęcie przechodzi przez staranną selekcję i obróbkę, dlatego proszę o cierpliwość — dbam o to, by efekt końcowy był naprawdę wyjątkowy.',
    },
    {
      id: 'travel',
      question: 'Czy dojedziesz do mnie, jeśli mieszkam poza Krakowem?',
      answer:
        'Tak, realizuję sesje również poza Krakowem. Dojazd ustalamy indywidualnie w zależności od lokalizacji — chętnie omówię szczegóły już na etapie rezerwacji, by wszystko było jasne od początku.',
    },
  ],
}
