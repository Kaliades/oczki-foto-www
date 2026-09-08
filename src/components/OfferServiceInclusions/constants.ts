import type { BorderedAccordionItemData } from '@/components/BorderedAccordion'
import type { ChecklistFeatureListItem } from '@/components/ChecklistFeatureList'

export const OFFER_SERVICE_INCLUSIONS_FIGMA_NODES = {
  container: {
    desktop: '6986:25067',
    tablet: '7100:7973',
    mobile: '7102:9639',
  },
  topDivider: {
    desktop: '6986:25026',
    tablet: '7100:7974',
    mobile: '7102:9640',
  },
  content: {
    desktop: '6986:20200',
    tablet: '7100:7989',
    mobile: '7102:9655',
  },
  textColumn: {
    desktop: '6986:20202',
    tablet: '7100:8046',
    mobile: '7102:9656',
  },
  header: {
    desktop: '6986:25023',
    tablet: '7100:8049',
    mobile: '7102:9659',
  },
  checklist: {
    desktop: '6986:20208',
    tablet: '7100:8052',
    mobile: '7102:9662',
  },
  additionalInfo: {
    desktop: '6986:20227',
    tablet: '7100:8101',
    mobile: '7102:9711',
  },
  additionalInfoInner: {
    desktop: '6999:26885',
    tablet: '7100:8102',
    mobile: '7102:9712',
  },
  bottomDivider: {
    desktop: '6986:25051',
    tablet: '7100:8133',
    mobile: '7102:9799',
  },
} as const

export type OfferServiceInclusionsData = {
  accordion: {
    heading: string
    items: readonly BorderedAccordionItemData[]
  }
  checklist: readonly ChecklistFeatureListItem[]
  heading: {
    emphasis: string
    end: string
    start: string
  }
  headingId?: string
  images: {
    mainAlt: string
    scallopAlt: string
    mainPhotoSrc?: string
    scallopPhotoSrc?: string
  }
  intro: string
}

const sesjeKobieceChecklist: readonly ChecklistFeatureListItem[] = [
  {
    id: 'consultation',
    title: 'Konsultację przed sesją',
    description:
      'Pomogę Ci wybrać idealne miejsce oraz dopracować stylizacje, w których będziesz czuć się najlepiej.',
    tilt: { degrees: 2.34 },
    figmaNode: '6989:25112',
  },
  {
    id: 'gallery',
    title: 'Selekcję i galerię do wyboru',
    description:
      'Do 3-4 dni po sesji otrzymasz dostęp do prywatnej galerii online (Photonesto). Znajdziesz tam najlepsze ujęcia po wstępnej obróbce – to Ty decydujesz, które z nich trafią do finalnego retuszu.',
    figmaNode: '6989:25113',
  },
  {
    id: 'turnaround',
    title: 'Szybką realizację',
    description:
      'Gotowe, dopieszczone pliki otrzymasz w ciągu 14 dni od momentu, gdy dokonasz wyboru zdjęć.',
    tilt: { degrees: -2.26 },
    figmaNode: '6989:25124',
  },
  {
    id: 'prints',
    title: 'Wydruki w ozdobnym opakowaniu',
    description:
      'Twoje wspomnienia zasługują na formę fizyczną. Wybrane ujęcia otrzymasz na profesjonalnym papierze, pięknie i starannie zapakowane.',
    figmaNode: '6989:25135',
  },
  {
    id: 'retouch',
    title: 'Profesjonalny retusz',
    description:
      'Każde zdjęcie poddaję starannej obróbce, która obejmuje m.in. delikatny i naturalny retusz skóry.',
    tilt: { degrees: 2.29 },
    figmaNode: '6989:25146',
  },
  {
    id: 'gear',
    title: 'Mój warsztat i sprzęt',
    description:
      'Pracuję na profesjonalnym sprzęcie najwyższej klasy, ale przede wszystkim wkładam w zdjęcia swoją wiedzę i doświadczenie, które stale rozwijam, by dać Ci jak najwyższą jakość.',
    figmaNode: '6989:25157',
  },
] as const

const sesjeKobieceAccordion: readonly BorderedAccordionItemData[] = [
  {
    id: 'studio',
    title: 'Sesja w studio',
    body: 'Wspólnie wybieramy studio, które pasuje do Twojej wizji. Do ceny pakietu doliczamy koszt wynajmu (zazwyczaj 150–200 zł).',
  },
  {
    id: 'makeup',
    title: 'Profesjonalny makijaż',
    body: 'Współpracuję z sprawdzonymi wizażystkami. Koszt makijażu i stylizacji wliczamy osobno – zazwyczaj 250–350 zł, w zależności od zakresu.',
  },
  {
    id: 'travel',
    title: 'Dojazd',
    body: 'Dojazd w promieniu 30 km od Warszawy jest wliczony w cenę pakietu. Poza tym obszarem ustalamy indywidualnie koszt dojazdu.',
  },
  {
    id: 'extra-shots',
    title: 'Dodatkowe ujęcia',
    body: 'Każdy pakiet obejmuje określoną liczbę zdjęć po retuszu. Dodatkowe ujęcia możesz dokupić według aktualnego cennika.',
  },
] as const

export const offerServiceInclusionsSesjeKobieceDefaults: OfferServiceInclusionsData = {
  heading: {
    start: 'Co dokładnie obejmuje ',
    emphasis: 'cena każdej sesji',
    end: '?',
  },
  intro:
    'Zależy mi, abyś od momentu rezerwacji do odebrania gotowych odbitek czuła się zaopiekowana. W cenie każdego pakietu otrzymujesz:',
  checklist: sesjeKobieceChecklist,
  accordion: {
    heading: 'Dodatkowe informacje',
    items: sesjeKobieceAccordion,
  },
  images: {
    mainAlt: 'Kobieta w różowym garniturze podczas sesji w studio',
    scallopAlt: 'Czarno-biały portret kobiety w ciąży w owalnej ramce',
    mainPhotoSrc: '/figma/offer-inclusions-main-photo.png',
    scallopPhotoSrc: '/figma/offer-inclusions-scallop-photo.png',
  },
}

const reportazeSlubneChecklist: readonly ChecklistFeatureListItem[] = [
  {
    id: 'pre-wedding-meeting',
    title: 'Spotkanie przed ślubem',
    description:
      'Poznajemy się, rozmawiamy o planie dnia i wspólnie ustalamy, co jest dla Was naprawdę ważne.',
    tilt: { degrees: 2.34 },
    figmaNode: '7338:8189',
  },
  {
    id: 'photo-planning',
    title: 'Pomoc w zaplanowaniu zdjęć',
    description:
      'Podpowiadam, jak ułożyć harmonogram, aby zdjęcia nie zabierały czasu bliskim, tylko były naturalną częścią dnia.',
    figmaNode: '7338:8197',
  },
  {
    id: 'selection-edit',
    title: 'Staranną selekcję i autorską obróbkę',
    description:
      'Każde zdjęcie wybieram i opracowuję osobiście, dbając o spójne kolory i ponadczasowy charakter całego reportażu.',
    tilt: { degrees: -2.26 },
    figmaNode: '7338:8205',
  },
  {
    id: 'private-gallery',
    title: 'Prywatną galerię online',
    description:
      'Dzięki niej łatwo podzielicie się zdjęciami z rodziną i przyjaciółmi, niezależnie od tego, gdzie mieszkają.',
    figmaNode: '7338:8213',
  },
  {
    id: 'albums-prints',
    title: 'Możliwość zamówienia albumów i odbitek',
    description:
      'Bo najpiękniejsze wspomnienia warto nie tylko oglądać na ekranie, ale również trzymać w dłoniach.',
    tilt: { degrees: 2.29 },
    figmaNode: '7338:8221',
  },
] as const

/**
 * Reportaż ślubny inclusions — Figma file `S8AUxLTY5y4aMCSIchKAi2`
 * (`7338:8111` / `7338:8771` / `7338:9431`). Five checklist cards; accordion
 * copy matches the reportaż tablet/mobile frames (same titles as kobiece).
 */
export const offerServiceInclusionsReportazeSlubneDefaults: OfferServiceInclusionsData = {
  heading: {
    start: 'Co dokładnie otrzymujecie, wybierając reportaż ślubny?',
    emphasis: '',
    end: '',
  },
  intro:
    'Zależy mi na tym, żebyście od pierwszej wiadomości aż do odebrania galerii czuli, że wszystko jest pod kontrolą. W każdym pakiecie otrzymujecie nie tylko zdjęcia, ale również moje doświadczenie, wsparcie i pełne zaangażowanie.',
  checklist: reportazeSlubneChecklist,
  accordion: {
    heading: 'Dodatkowe informacje',
    items: sesjeKobieceAccordion,
  },
  images: {
    mainAlt: 'Para młoda obejmująca się przy jeziorze podczas reportażu ślubnego',
    scallopAlt: 'Czarno-białe ujęcie pary młodej w owalnej ramce',
    mainPhotoSrc: '/figma/offer-inclusions-main-photo-reportaze-slubne.png',
    scallopPhotoSrc: '/figma/offer-inclusions-scallop-photo-reportaze-slubne.png',
  },
}
