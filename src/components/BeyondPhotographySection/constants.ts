import type { BeyondPhotographySectionData } from './BeyondPhotographySection'

export const BEYOND_PHOTOGRAPHY_SECTION_FIGMA_NODES = {
  desktop: '6972:15584',
  tablet: '7092:4630',
  mobile: '7093:6015',
  backdrop: {
    desktop: '6972:15584',
    tablet: '7092:4630',
    mobile: '7093:6015',
  },
  panel: {
    desktop: '7000:26957',
    tablet: '7092:4631',
    mobile: '7093:6016',
  },
  intro: {
    heading: {
      desktop: '6998:26789',
      tablet: '7092:4632',
      mobile: '7093:6017',
    },
    body: {
      desktop: '6972:15591',
      tablet: '7092:4634',
      mobile: '7093:6019',
    },
  },
  featureList: {
    desktop: '6972:15592',
    tablet: '7092:4635',
    mobile: '7093:6020',
  },
} as const

export const BEYOND_PHOTOGRAPHY_BACKDROP_CROP = {
  mobile: 'absolute h-[162.75%] left-[-66.45%] max-w-none top-[-62.75%] w-[225.69%]',
  tablet: 'absolute h-[192.41%] left-[-40.12%] max-w-none top-[-65.28%] w-[180.34%]',
  desktop: 'absolute h-[320.83%] left-0 max-w-none top-[-121.2%] w-[113.18%]',
} as const

export const beyondPhotographyDefaults: BeyondPhotographySectionData = {
  backdrop: {
    alt: 'Monika idąca ulicą, śmiejąca się do kamery',
    crop: BEYOND_PHOTOGRAPHY_BACKDROP_CROP,
    src: '/figma/beyond-photography-backdrop.png',
  },
  heading: {
    start: 'A poza ',
    emphasis: 'fotografią',
    end: '… (Poznajmy się bliżej!)',
  },
  intro:
    'Wierzę, że to, co robię po godzinach, wraca do mnie (i do Was!) w postaci świeżego spojrzenia i uśmiechu za aparatem. Moje codzienne radości to:',
  features: [
    {
      title: 'Ruch i muzyka',
      description:
        'Od kilku lat moją wielką pasją jest Zumba. Kocham zatapiać się w muzyce – to mój sposób na totalny reset. Często też łapię się na tym, że podśpiewuję sobie w domu (nie tylko pod prysznicem!).',
      figmaNodes: {
        desktop: '6998:26800',
        tablet: '7092:4636',
        mobile: '7093:6021',
      },
    },
    {
      title: 'Języki i smaki',
      description:
        'Uwielbiam angielski i hiszpański, a w kuchni relaksuję się przy gotowaniu i pieczeniu. Sprawia mi to ogromną frajdę!',
      figmaNodes: {
        desktop: '6998:26805',
        tablet: '7092:4640',
        mobile: '7093:6025',
      },
    },
    {
      title: 'Rodzinna codzienność',
      description:
        'Uwielbiam wygłupy z naszą córką i nasze wspólne, codzienne spacery z psem. To one uczą mnie uważności na małe gesty.',
      figmaNodes: {
        desktop: '6998:26810',
        tablet: '7092:4644',
        mobile: '7093:6029',
      },
    },
  ],
}
