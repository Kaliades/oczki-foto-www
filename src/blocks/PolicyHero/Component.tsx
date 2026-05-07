import React from 'react'
import Link from 'next/link'
import type { PolicyHeroBlock } from '@/payload-types'

type PolicyHeroProps = PolicyHeroBlock

export const PolicyHero: React.FC<PolicyHeroProps> = ({
  breadcrumbLabel,
  heading,
  lastUpdated,
}) => {
  const label = breadcrumbLabel || 'Polityka prywatności'

  const formattedDate = lastUpdated
    ? new Intl.DateTimeFormat('pl-PL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(new Date(lastUpdated))
    : null

  return (
    <section className="w-full bg-white py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1206px] px-4 lg:px-8 flex flex-col items-center text-center gap-5">
        {/* Breadcrumb strip */}
        <nav aria-label="Okruszek nawigacyjny">
          <ol className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-stone-500">
            <li>
              <Link href="/" className="hover:text-stone-800 transition-colors">
                Strona główna
              </Link>
            </li>
            <li aria-hidden="true" className="text-stone-400">
              /
            </li>
            <li aria-current="page">{label}</li>
          </ol>
        </nav>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl tracking-tight text-stone-900 font-normal">
          {heading}
        </h1>

        {/* Last updated */}
        {formattedDate && (
          <p className="text-sm text-stone-500 mt-4">
            Ostatnia aktualizacja: {formattedDate}
          </p>
        )}
      </div>
    </section>
  )
}
