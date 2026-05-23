'use client'

import { useServerInsertedHTML } from 'next/navigation'

import { themeInitScript } from './themeInitScript'

export function InitTheme() {
  useServerInsertedHTML(() => (
    <script dangerouslySetInnerHTML={{ __html: themeInitScript }} id="theme-script" />
  ))

  return null
}
