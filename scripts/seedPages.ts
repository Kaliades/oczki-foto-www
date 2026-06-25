import { readFile } from 'fs/promises'
import path from 'path'

import config from '@payload-config'
import { getPayload } from 'payload'

import { aboutHeroDefaults } from '@/components/AboutHero/constants'
import { aboutPhilosophyDefaults } from '@/components/PhilosophyPrinciplesSection/constants'
import { sessionFeelDefaults } from '@/components/SessionFeelSection/constants'
import { expertiseDefaults } from '@/components/ExpertiseSection/constants'
import { beyondPhotographyDefaults } from '@/components/BeyondPhotographySection/constants'
import { dualPerspectiveDefaults } from '@/components/DualPerspectiveSection/constants'
import { collaborationPillarsDefaults } from '@/components/CollaborationPillarsSection/constants'
import { aboutInstagramDefaults } from '@/components/AboutInstagramSection/constants'
import { aboutCtaDefaults } from '@/components/AboutCta/constants'
import { contactHeroDefaults } from '@/components/ContactHero/constants'
import { serviceAreaSectionDefaults } from '@/components/ServiceAreaSection/constants'
import { contactFaqDefaults } from '@/components/ContactFaq/constants'
import { privacyPolicyDefaults } from '@/components/PrivacyPolicySection/constants'

/**
 * Seeds the three page Globals (aboutPage, contactPage, privacyPolicyPage)
 * from code-side defaults. Run with:
 *
 *   pnpm payload run scripts/seedPages.ts
 *
 * Idempotent — each Global is unconditionally overwritten via updateGlobal.
 */

function mimeFromExt(filePath: string): string {
  const ext = filePath.split('.').pop()?.toLowerCase()
  switch (ext) {
    case 'png': return 'image/png'
    case 'jpg':
    case 'jpeg': return 'image/jpeg'
    case 'webp': return 'image/webp'
    default: return 'application/octet-stream'
  }
}

async function run() {
  const payload = await getPayload({ config })

  const uploadCache = new Map<string, number>()
  let counter = 0

  const uploadImage = async (src: string, alt: string): Promise<number> => {
    const cached = uploadCache.get(src)
    if (cached) return cached

    const rel = src.replace(/^\//, '')
    const abs = path.resolve(process.cwd(), 'public', rel)
    const buffer = await readFile(abs)
    const base = path.basename(abs)
    const uniqueName = `${String(++counter).padStart(3, '0')}-${base}`

    const doc = await payload.create({
      collection: 'media',
      data: { alt },
      file: { name: uniqueName, data: buffer, mimetype: mimeFromExt(abs), size: buffer.byteLength },
      context: { disableRevalidate: true },
    })

    uploadCache.set(src, doc.id)
    payload.logger.info(`Uploaded ${rel} -> media #${doc.id}`)
    return doc.id
  }

  // ── O MNIE ──────────────────────────────────────────────────────────────
  payload.logger.info('Seeding aboutPage global...')
  const portrait = await uploadImage(aboutHeroDefaults.portrait.src, aboutHeroDefaults.portrait.alt)
  const secondary = await uploadImage(aboutHeroDefaults.secondaryPhoto.src, aboutHeroDefaults.secondaryPhoto.alt)
  const backdrop = await uploadImage(beyondPhotographyDefaults.backdrop.src, beyondPhotographyDefaults.backdrop.alt)
  const dualPortrait = await uploadImage(dualPerspectiveDefaults.portrait.src, dualPerspectiveDefaults.portrait.alt)

  await payload.updateGlobal({
    slug: 'aboutPage',
    data: {
      hero: {
        heading: { start: aboutHeroDefaults.heading.start, emphasis: aboutHeroDefaults.heading.emphasis },
        description: aboutHeroDefaults.description,
        cta: { label: aboutHeroDefaults.cta.label, url: aboutHeroDefaults.cta.href },
        portrait,
        portraitAlt: aboutHeroDefaults.portrait.alt,
        secondaryPhoto: secondary,
        secondaryPhotoAlt: aboutHeroDefaults.secondaryPhoto.alt,
      },
      philosophy: {
        heading: { start: aboutPhilosophyDefaults.heading.start, emphasis: aboutPhilosophyDefaults.heading.emphasis },
        intro: aboutPhilosophyDefaults.intro,
        principles: aboutPhilosophyDefaults.principles.map((p) => ({ title: p.title, description: p.description })),
      },
      sessionFeel: {
        heading: { start: sessionFeelDefaults.heading.start, emphasis: sessionFeelDefaults.heading.emphasis },
        intro: sessionFeelDefaults.intro,
        steps: sessionFeelDefaults.steps.map((s) => ({ title: s.title, description: s.description })),
      },
      expertise: {
        heading: { start: expertiseDefaults.heading.start, emphasis: expertiseDefaults.heading.emphasis },
        intro: expertiseDefaults.intro,
        cards: expertiseDefaults.cards.map((c) => ({ title: c.title, description: c.description })),
      },
      beyond: {
        heading: {
          start: beyondPhotographyDefaults.heading.start,
          emphasis: beyondPhotographyDefaults.heading.emphasis,
          end: beyondPhotographyDefaults.heading.end,
        },
        intro: beyondPhotographyDefaults.intro,
        backdrop,
        backdropAlt: beyondPhotographyDefaults.backdrop.alt,
        features: beyondPhotographyDefaults.features.map((f) => ({ title: f.title, description: f.description })),
      },
      dual: {
        heading: { emphasis: dualPerspectiveDefaults.heading.emphasis, end: dualPerspectiveDefaults.heading.end },
        intro: dualPerspectiveDefaults.intro,
        portrait: dualPortrait,
        portraitAlt: dualPerspectiveDefaults.portrait.alt,
        profileHeading: dualPerspectiveDefaults.profileHeading,
        profileItems: dualPerspectiveDefaults.profileItems.map((p) => ({ title: p.title, description: p.description })),
      },
      pillars: {
        heading: {
          start: collaborationPillarsDefaults.heading.start,
          emphasis: collaborationPillarsDefaults.heading.emphasis,
          end: collaborationPillarsDefaults.heading.end,
        },
        intro: collaborationPillarsDefaults.intro,
        items: collaborationPillarsDefaults.pillars.map((p) => ({ title: p.title, description: p.description })),
      },
      instagram: {
        heading: { plain: aboutInstagramDefaults.heading.plain, emphasis: aboutInstagramDefaults.heading.emphasis },
        profileUrl: aboutInstagramDefaults.profile.link.url,
      },
      cta: {
        headingText: aboutCtaDefaults.heading.type === 'single' ? aboutCtaDefaults.heading.text : '',
        body: aboutCtaDefaults.body,
        button: { label: aboutCtaDefaults.cta.label, url: aboutCtaDefaults.cta.url },
      },
    },
    context: { disableRevalidate: true },
  })
  payload.logger.info('aboutPage seeded.')

  // ── KONTAKT ──────────────────────────────────────────────────────────────
  payload.logger.info('Seeding contactPage global...')
  await payload.updateGlobal({
    slug: 'contactPage',
    data: {
      hero: {
        heading: {
          start: contactHeroDefaults.heading.start,
          emphasis: contactHeroDefaults.heading.emphasis,
          end: contactHeroDefaults.heading.end,
        },
        description: contactHeroDefaults.description,
        sessionQuestion: contactHeroDefaults.sessionQuestion,
        submitLabel: contactHeroDefaults.submitLabel,
      },
      serviceArea: {
        heading: serviceAreaSectionDefaults.heading,
        introParagraph1: serviceAreaSectionDefaults.intro[0],
        introParagraph2: serviceAreaSectionDefaults.intro[1],
        accordion: serviceAreaSectionDefaults.accordion.map((a) => ({
          id: a.id,
          title: a.title,
          body: a.body,
        })),
        footer: serviceAreaSectionDefaults.footer,
        cta: { label: serviceAreaSectionDefaults.cta.label, url: serviceAreaSectionDefaults.cta.url },
      },
      faq: {
        heading: { emphasis: contactFaqDefaults.heading.emphasis, start: contactFaqDefaults.heading.start },
        intro: contactFaqDefaults.intro,
        items: contactFaqDefaults.items.map((q) => ({ id: q.id, question: q.question, answer: q.answer })),
      },
    },
    context: { disableRevalidate: true },
  })
  payload.logger.info('contactPage seeded.')

  // ── POLITYKA PRYWATNOŚCI ─────────────────────────────────────────────────
  payload.logger.info('Seeding privacyPolicyPage global...')
  await payload.updateGlobal({
    slug: 'privacyPolicyPage',
    data: {
      pageTitle: privacyPolicyDefaults.pageTitle,
      intro: privacyPolicyDefaults.intro,
      sections: privacyPolicyDefaults.sections.map((s) => ({
        id: s.id,
        title: s.title,
        body: s.body,
        intro: s.intro,
        bullets: s.bullets?.map((b) => ({
          id: b.id,
          title: b.title,
          description: b.description,
        })),
      })),
    },
    context: { disableRevalidate: true },
  })
  payload.logger.info('privacyPolicyPage seeded.')
}

await run()
