'use client'

import { useServerInsertedHTML } from 'next/navigation'

import { consentModeInitScript } from '@/consent/consentMode'

export function ConsentModeInit() {
  useServerInsertedHTML(() => (
    <script dangerouslySetInnerHTML={{ __html: consentModeInitScript }} id="consent-mode-init" />
  ))

  return null
}
