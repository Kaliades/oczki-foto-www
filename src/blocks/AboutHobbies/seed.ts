import type { Page } from '@/payload-types'

type LayoutBlock = NonNullable<Page['layout']>[number]

export const AboutHobbiesSeed: Extract<LayoutBlock, { blockType: 'aboutHobbies' }> = {
  blockType: 'aboutHobbies',
  heading: 'A poza fotografią… (Poznajmy się bliżej!)',
  lead: 'Wierzę, że to, co robię po godzinach, wraca do mnie (i do Was!) w postaci świeżego spojrzenia i uśmiechu za aparatem. Moje codzienne radości to:',
  photo: '{{MEDIA:about__hobbies.jpg}}' as unknown as number,
  photoAlt: 'Fotograf w swoim żywiole poza pracą',
  imagePosition: 'left',
  cards: [
    {
      title: 'Ruch i muzyka',
      body: 'Od kilku lat moją wielką pasją jest Zumba. Kocham zatapiać się w muzyce – to mój sposób na totalny reset. Często też łapię się na tym, że podśpiewuję sobie w domu (nie tylko pod prysznicem!).',
    },
    {
      title: 'Języki i smaki',
      body: 'Uwielbiam angielski i hiszpański, a w kuchni relaksuję się przy gotowaniu i pieczeniu. Sprawia mi to ogromną frajdę!',
    },
    {
      title: 'Rodzinna codzienność',
      body: 'Uwielbiam wygłupy z naszą córką i nasze wspólne, codzienne spacery z psem. To one uczą mnie uważności na małe gesty.',
    },
  ],
}
