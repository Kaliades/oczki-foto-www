import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { cache } from 'react'
import Link from 'next/link'
import React from 'react'

import { ImageMedia } from '@/components/Media/ImageMedia'
import type { Media } from '@/payload-types'

import { SocialIcon } from './SocialIcon'
import { NewsletterForm } from './NewsletterForm'

const queryFooter = cache(async () => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  return payload.findGlobal({
    slug: 'footer',
    draft,
    overrideAccess: draft,
    depth: 1,
  })
})

export const Footer: React.FC = async () => {
  const footer = await queryFooter()

  const { logo, socialLinks, columnServices, columnSite, newsletter, copyright, legalLinks } =
    footer

  const resolvedLogo = logo && typeof logo === 'object' ? (logo as Media) : null

  const copyrightText = copyright
    ? copyright.replace('{{year}}', String(new Date().getFullYear()))
    : `© ${new Date().getFullYear()} Oczki Fotografia. Wszystkie prawa zastrzeżone.`

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-[1366px] px-8 py-9">
        {/* Top row */}
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          {/* Left: logo + social */}
          <div className="flex flex-col gap-6">
            {/* Logo */}
            <Link href="/" aria-label="Strona główna" className="inline-block">
              {resolvedLogo ? (
                <ImageMedia
                  resource={resolvedLogo}
                  imgClassName="h-10 w-auto object-contain brightness-0 invert"
                />
              ) : (
                <span className="text-lg font-semibold tracking-tight">Oczki Fotografia</span>
              )}
            </Link>

            {/* Social links */}
            {socialLinks && socialLinks.length > 0 && (
              <nav aria-label="Media społecznościowe">
                <ul className="flex items-center gap-3">
                  {socialLinks.map((item, idx) => (
                    <li key={idx}>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.label ?? item.platform}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white hover:border-white/60 transition-colors"
                      >
                        <SocialIcon platform={item.platform ?? 'other'} size={20} />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>

          {/* Center: newsletter (optional) */}
          {newsletter?.enabled && (
            <div className="flex flex-col gap-3 md:max-w-sm md:flex-1">
              {newsletter.heading && (
                <h2 className="text-base font-semibold">{newsletter.heading}</h2>
              )}
              {newsletter.subheading && (
                <p className="text-sm text-white/70">{newsletter.subheading}</p>
              )}
              <NewsletterForm
                placeholder={newsletter.placeholder ?? undefined}
                buttonLabel={newsletter.buttonLabel ?? undefined}
                successMessage={newsletter.successMessage ?? undefined}
                errorMessage={newsletter.errorMessage ?? undefined}
                consentText={newsletter.consentText ?? undefined}
              />
            </div>
          )}

          {/* Right: 2 link columns */}
          <div className="grid grid-cols-2 gap-8 sm:gap-16">
            {/* Column: Services */}
            {columnServices && (
              <div className="flex flex-col gap-4">
                {columnServices.heading && (
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                    {columnServices.heading}
                  </p>
                )}
                {columnServices.links && columnServices.links.length > 0 && (
                  <ul className="flex flex-col gap-2">
                    {columnServices.links.map((link, idx) => (
                      <li key={idx}>
                        <Link
                          href={link.href}
                          className="text-sm text-white/80 hover:text-white transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Column: Site */}
            {columnSite && (
              <div className="flex flex-col gap-4">
                {columnSite.heading && (
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                    {columnSite.heading}
                  </p>
                )}
                {columnSite.links && columnSite.links.length > 0 && (
                  <ul className="flex flex-col gap-2">
                    {columnSite.links.map((link, idx) => (
                      <li key={idx}>
                        <Link
                          href={link.href}
                          className="text-sm text-white/80 hover:text-white transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Separator */}
        <hr className="my-8 border-white/10" />

        {/* Bottom row: 3-col */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-center">
          {/* Left: copyright */}
          <p className="text-xs text-white/50">{copyrightText}</p>

          {/* Center: legal links */}
          {legalLinks && legalLinks.length > 0 && (
            <nav
              aria-label="Linki prawne"
              className="flex flex-wrap items-center justify-start gap-4 md:justify-center"
            >
              {legalLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="text-xs text-white/50 hover:text-white/80 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Right: empty placeholder for future use */}
          <div />
        </div>
      </div>
    </footer>
  )
}
