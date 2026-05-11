import Image from 'next/image'
import type { ReactNode } from 'react'

type InlineQuoteProps = {
  children: ReactNode
}

export function InlineQuote({ children }: InlineQuoteProps) {
  return (
    <figure className="relative flex w-full items-center bg-[var(--oczki-primary-200)] px-3 py-2 md:w-[466px]">
      <blockquote className="oczki-body-l flex-1 text-[var(--oczki-primary-700)] md:w-[442px] md:flex-none">
        {children}
      </blockquote>
      <Image
        alt=""
        aria-hidden="true"
        className="absolute -top-1.5 right-[13px] md:right-4"
        height={12}
        src="/figma/intro-quote-mark.svg"
        width={14}
      />
    </figure>
  )
}
