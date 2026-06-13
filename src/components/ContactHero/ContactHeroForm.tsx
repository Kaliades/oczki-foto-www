'use client'

import { BorderLabelField, BorderLabelTextarea } from '@/components/BorderLabelField'
import { OczkiConsentCheckbox } from '@/components/OczkiConsentCheckbox'
import { ScallopedButton } from '@/components/ScallopedButton'
import { ScallopedPanelFrame } from '@/components/ScallopedPanelFrame'
import {
  CONTACT_SESSION_TYPE_OPTIONS,
  SessionTypePillSelector,
} from '@/components/SessionTypePillSelector'

import {
  CONTACT_FORM_FIELD_SURFACE,
  CONTACT_HERO_FIGMA_NODES,
  type ContactHeroData,
} from './constants'

type ContactHeroFormProps = Pick<
  ContactHeroData,
  'defaultSessionTypeId' | 'privacyLink' | 'sessionQuestion' | 'submitLabel'
>

/**
 * Scalloped contact form — Figma `Contact form container`.
 *
 * Contact form container
 * ├── Contact form content
 * │   ├── Session type question container
 * │   └── Contact info container
 * └── Button
 */
export function ContactHeroForm({
  defaultSessionTypeId,
  privacyLink,
  sessionQuestion,
  submitLabel,
}: ContactHeroFormProps) {
  return (
    <ScallopedPanelFrame>
      <form
        action="#"
        className="flex w-full flex-col items-start gap-6 md:gap-8"
        method="post"
        onSubmit={(event) => event.preventDefault()}
      >
        <div
          className="flex w-full flex-col items-start gap-3 md:gap-4"
          data-figma-node={CONTACT_HERO_FIGMA_NODES.contactFormContent.desktop}
        >
          <SessionTypePillSelector
            defaultOptionId={defaultSessionTypeId}
            options={CONTACT_SESSION_TYPE_OPTIONS}
            question={sessionQuestion}
          />

          <div className="flex w-full flex-col items-start gap-2.5 md:gap-3">
            <BorderLabelField
              autoComplete="email"
              id="contact-email"
              label="Email"
              name="email"
              required
              type="email"
              {...CONTACT_FORM_FIELD_SURFACE}
            />

            <BorderLabelField
              autoComplete="tel"
              id="contact-phone"
              inputMode="tel"
              label="Telefon"
              name="phone"
              placeholder="___ ___ ___"
              type="tel"
              {...CONTACT_FORM_FIELD_SURFACE}
            />

            <BorderLabelTextarea
              id="contact-message"
              label="Wiadomość"
              name="message"
              required
              {...CONTACT_FORM_FIELD_SURFACE}
            />

            <OczkiConsentCheckbox id="contact-consent" privacyLink={privacyLink} variant="onCream" />
          </div>
        </div>

        <div className="w-full md:w-auto" data-figma-node={CONTACT_HERO_FIGMA_NODES.submitButton.desktop}>
          <ScallopedButton className="max-md:w-full" fullWidth type="submit">
            {submitLabel}
          </ScallopedButton>
        </div>
      </form>
    </ScallopedPanelFrame>
  )
}
