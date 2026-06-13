export const SESSION_TYPE_PILL_SELECTOR_FIGMA_NODES = {
  desktop: '6915:16365',
  tablet: '7084:3519',
  mobile: '7086:4450',
  question: {
    desktop: '6884:14390',
    tablet: '7084:3518',
    mobile: '7086:4449',
  },
} as const

export type SessionTypeOption = {
  id: string
  label: string
}

export const CONTACT_SESSION_TYPE_OPTIONS: readonly SessionTypeOption[] = [
  { id: 'kobieca', label: 'Sesja kobieca' },
  { id: 'wizerunkowa', label: 'Sesja wizerunkowa' },
  { id: 'slubny', label: 'Reportaż ślubny' },
  { id: 'narzezenska', label: 'Sesja narzeczeńska' },
  { id: 'rodzinna', label: 'Sesja rodzinna' },
  { id: 'voucher', label: 'Voucher na sesję' },
  { id: 'inna', label: 'Inna' },
] as const
