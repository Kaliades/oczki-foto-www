// Seed data extracted from Figma node 7105:8099
// File: olYfq47eVG9IV0p5Fvyme5 — "Kroki do realizacji oferty"

type HomepageProcessSeedType = {
  blockType: 'homepageProcess'
  heading: string
  lead?: string | null
  buttonLabel?: string | null
  buttonUrl?: string | null
  steps: { title: string; description: string }[]
}

export const HomepageProcessSeed: HomepageProcessSeedType = {
  blockType: 'homepageProcess',
  heading: 'Krok po kroku do pięknych zdjęć',
  lead: 'Najlepsze kadry nie powstają wtedy, gdy ktoś „dobrze pozuje". Powstają wtedy, gdy pojawia się spokój, zaufanie i odrobina luzu. Właśnie na tym opiera się mój sposób pracy.',
  buttonLabel: 'Umów sesję',
  buttonUrl: '/kontakt',
  steps: [
    {
      title: 'Krótka rozmowa lub wiadomość',
      description:
        'Zanim ustalimy termin, rozmawiamy — przez telefon lub online. Chcę poznać Ciebie, Twoje obawy i to, czego naprawdę oczekujesz od tej sesji.',
    },
    {
      title: 'Pomagam Ci się przygotować',
      description:
        'Nie zostawiam Cię z myślą „radź sobie". Po ustaleniu terminu dostajesz ode mnie wskazówki dotyczące ubioru, propozycje miejsc i klimatu oraz odpowiedzi, na wszystkie nurtujące Cię pytania. Dzięki temu przychodzisz na sesję spokojniejsza i bardziej pewna siebie.',
    },
    {
      title: 'Sesja w praktyce',
      description:
        'W trakcie sesji pokazuję, jak się poruszać, podpowiadam drobne zmiany, które robią dużą różnicę i reaguję na to, co się dzieje — na Twoje emocje, energię, tempo. Możesz skupić się na sobie, nie na aparacie.',
    },
    {
      title: 'Wybór i obróbka zdjęć',
      description:
        'Po sesji wybieram najlepsze kadry i obrabiam je w spójnym, naturalnym stylu. Dostajesz ode mnie spójny materiał, który dobrze się ogląda teraz i za kilka lat.',
    },
    {
      title: 'Oddanie zdjęć',
      description:
        'Z góry wiesz ile zdjęć otrzymasz, w jakim terminie i w jakiej formie. Po oddaniu zdjęć nadal możesz do mnie napisać — jeśli potrzebujesz odbitek, albumu albo kolejnej sesji.',
    },
  ],
}
