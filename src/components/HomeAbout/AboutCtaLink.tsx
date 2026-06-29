import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'
import Link from 'next/link'

import { resolveLinkHref, type SectionLink } from '@/utilities/resolveLinkHref'

type AboutCtaLinkProps = {
  cta: SectionLink
}

export const AboutCtaLink = ({ cta }: AboutCtaLinkProps) => {
  const href = resolveLinkHref(cta)
  const label = cta.label ?? ''

  if (!href || !label) return null

  return (
    <Link
      className="group relative inline-flex h-11 w-full shrink-0 items-start justify-center pb-[10px] pt-[11px] md:mx-auto md:w-auto lg:mx-auto"
      href={href}
      rel={cta.newTab ? 'noopener noreferrer' : undefined}
      target={cta.newTab ? '_blank' : undefined}
    >
      <span className="flex flex-col items-start">
        <span className="flex items-start gap-1 pb-1">
          <span className="oczki-body-m whitespace-nowrap text-[var(--oczki-primary-900)]">
            {label}
          </span>
          <span className="flex w-[14px] flex-col items-start pt-[5px]">
            <Image
              alt=""
              aria-hidden="true"
              className="block h-[7.719px] w-[10.111px]"
              height={8}
              src="/figma/gallery-link-arrow.svg"
              style={{ height: 'auto', width: 'auto' }}
              width={10}
            />
          </span>
        </span>
        <span
          aria-hidden="true"
          className="block h-px w-full origin-left scale-x-0 bg-[var(--oczki-primary-900)] transition-transform duration-300 group-hover:scale-x-100"
        />
      </span>
    </Link>
  )
}
