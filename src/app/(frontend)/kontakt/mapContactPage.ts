import type { ContactPage } from '@/payload-types'

import type { ContactHeroData } from '@/components/ContactHero'
import { contactHeroDefaults } from '@/components/ContactHero/constants'
import type { ServiceAreaSectionData } from '@/components/ServiceAreaSection'
import { serviceAreaSectionDefaults } from '@/components/ServiceAreaSection/constants'
import type { ContactFaqData } from '@/components/ContactFaq'
import { contactFaqDefaults } from '@/components/ContactFaq/constants'

/**
 * Maps a Payload `ContactPage` global onto the per-section data shapes the
 * components expect. Same overlay-on-defaults principle as other mappers.
 */

function pick<T>(value: T | null | undefined | '', fallback: T): T {
  return value === null || value === undefined || value === '' ? fallback : (value as T)
}

function mapContactHero(doc: ContactPage): ContactHeroData {
  const d = contactHeroDefaults
  const cms = doc.hero
  return {
    ...d,
    heading: {
      start: pick(cms?.heading?.start, d.heading.start),
      emphasis: pick(cms?.heading?.emphasis, d.heading.emphasis),
      end: pick(cms?.heading?.end, d.heading.end),
    },
    description: pick(cms?.description, d.description),
    sessionQuestion: pick(cms?.sessionQuestion, d.sessionQuestion),
    submitLabel: pick(cms?.submitLabel, d.submitLabel),
  }
}

function mapServiceArea(doc: ContactPage): ServiceAreaSectionData {
  const d = serviceAreaSectionDefaults
  const cms = doc.serviceArea
  const cmsAccordion = cms?.accordion?.filter((a) => a.title || a.body) ?? []
  const accordion =
    cmsAccordion.length > 0
      ? cmsAccordion.map((a, i) => ({
          id: pick(a.id, d.accordion[i]?.id ?? `area-${i}`),
          title: pick(a.title, d.accordion[i]?.title ?? ''),
          body: pick(a.body, d.accordion[i]?.body ?? ''),
        }))
      : d.accordion
  return {
    heading: pick(cms?.heading, d.heading),
    intro: [
      pick(cms?.introParagraph1, d.intro[0]),
      pick(cms?.introParagraph2, d.intro[1]),
    ] as [string, string],
    accordion,
    footer: pick(cms?.footer, d.footer),
    cta: {
      ...d.cta,
      label: pick(cms?.cta?.label, d.cta.label),
      url: pick(cms?.cta?.url, d.cta.url),
    },
    photoAlt: d.photoAlt,
  }
}

function mapContactFaq(doc: ContactPage): ContactFaqData {
  const d = contactFaqDefaults
  const cms = doc.faq
  const cmsItems = cms?.items?.filter((i) => i.question || i.answer) ?? []
  const items =
    cmsItems.length > 0
      ? cmsItems.map((item, i) => ({
          id: pick(item.id, d.items[i]?.id ?? `faq-${i}`),
          question: pick(item.question, d.items[i]?.question ?? ''),
          answer: pick(item.answer, d.items[i]?.answer ?? ''),
        }))
      : d.items
  return {
    heading: {
      emphasis: pick(cms?.heading?.emphasis, d.heading.emphasis),
      start: pick(cms?.heading?.start, d.heading.start),
    },
    intro: pick(cms?.intro, d.intro),
    items,
  }
}

export type ContactPageMapped = {
  hero: ContactHeroData
  serviceArea: ServiceAreaSectionData
  faq: ContactFaqData
}

export function mapContactPage(doc: ContactPage): ContactPageMapped {
  return {
    hero: mapContactHero(doc),
    serviceArea: mapServiceArea(doc),
    faq: mapContactFaq(doc),
  }
}
