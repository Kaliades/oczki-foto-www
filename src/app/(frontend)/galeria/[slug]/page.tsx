import { CaseStudyDetails } from '@/components/CaseStudyDetails'
import { CaseStudyDuoPerspective } from '@/components/CaseStudyDuoPerspective'
import { CaseStudyHero } from '@/components/CaseStudyHero'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { CASE_STUDY_SLUGS, getCaseStudyBySlug } from './constants'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(decodeURIComponent(slug))

  if (!caseStudy) {
    return { title: 'Galeria | Oczki fotografia' }
  }

  return {
    title: `${caseStudy.hero.title} | Oczki fotografia`,
  }
}

export default async function CaseStudyPage({ params }: Args) {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(decodeURIComponent(slug))

  if (!caseStudy) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]">
      <CaseStudyHero data={caseStudy.hero} />
      <CaseStudyDetails data={caseStudy.details} />
      <CaseStudyDuoPerspective data={caseStudy.duoPerspective} />
    </main>
  )
}
