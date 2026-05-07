// Seed data for HomepagePhilosophy block.
// Text extracted verbatim from Figma node 6724:13218.
// Image placeholder: {{MEDIA:wax-seal-philosophy.png}} — resolved by seed orchestrator.

type HomepagePhilosophySeed = {
  blockType: 'homepagePhilosophy'
  heading: string
  lead?: string
  pillars: { title: string; body: string }[]
}

export const HomepagePhilosophySeed: HomepagePhilosophySeed = {
  blockType: 'homepagePhilosophy',
  heading: 'Ruch zamiast sztywności, uśmiech zamiast poleceń',
  lead: 'Najlepsze kadry nie powstają wtedy, gdy ktoś „dobrze pozuje". Powstają wtedy, gdy pojawia się spokój, zaufanie i odrobina luzu.\nWłaśnie na tym opiera się mój sposób pracy.',
  pillars: [
    {
      title: 'Zaczynamy od relacji, nie od aparatu',
      body: 'Zanim pojawi się pierwsze zdjęcie, pojawia się rozmowa. Sprawdzamy, jak się czujesz, czego potrzebujesz i w jakim jesteś miejscu.\nNie musisz od razu być otwarta ani pewna siebie. Dajemy sobie chwilę — a kiedy napięcie puszcza, zdjęcia zaczynają dziać się naturalnie.',
    },
    {
      title: 'Spokój jest ważniejszy niż perfekcja',
      body: 'Dbam o atmosferę, w której nie musisz nic udowadniać. Możesz się zatrzymać, możesz się pomylić, możesz być cicho.\nKiedy napięcie znika, pojawia się prawdziwa emocja. A ona zawsze wygląda dobrze na zdjęciach.',
    },
    {
      title: 'Prowadzę ale nie kontroluję',
      body: 'Jeśli nie wiesz, co zrobić — jestem obok. Jeśli potrzebujesz chwili — dajemy sobie czas. Jeśli coś Cię niepokoi — rozmawiamy.\nSesja nie polega na tym, że „musisz dać z siebie wszystko". To ja biorę odpowiedzialność za atmosferę, tempo i komfort.',
    },
  ],
}
