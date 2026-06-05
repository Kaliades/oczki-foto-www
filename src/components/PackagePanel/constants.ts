export type PackagePanelTheme = 'sage' | 'cream' | 'rose'

export const PACKAGE_PANEL_THEME_STYLES: Record<
  PackagePanelTheme,
  { backgroundClassName: string; headerBorderClassName: string }
> = {
  cream: {
    backgroundClassName: 'bg-[var(--oczki-primary-200)]',
    headerBorderClassName: 'border-[var(--oczki-primary-300)]',
  },
  rose: {
    backgroundClassName: 'bg-[var(--oczki-tertiary-300)]',
    headerBorderClassName: 'border-[var(--oczki-tertiary-500)]',
  },
  sage: {
    backgroundClassName: 'bg-[var(--oczki-secondary-200)]',
    headerBorderClassName: 'border-[var(--oczki-secondary-400)]',
  },
}
