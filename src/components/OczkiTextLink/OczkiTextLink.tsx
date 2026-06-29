'use client'

import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'
import Link from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'

import { OCZKI_TEXT_LINK_ARROW_SRC, OCZKI_TEXT_LINK_FIGMA_NODES } from './constants'

type OczkiTextLinkIconDirection = 'end' | 'down'

type OczkiTextLinkProps = {
  label: string
  href?: string
  iconDirection?: OczkiTextLinkIconDirection
  newTab?: boolean
  className?: string
  /** Extra classes on the label + icon row (e.g. wider gap for load-more). */
  labelRowClassName?: string
} & Pick<ComponentPropsWithoutRef<'button'>, 'onClick' | 'type' | 'disabled'>

/**
 * Figma `Button` text link — body/m label, chevron, underline on hover.
 *
 * Root (h-44, pt-11 pb-10)
 * └── flex col
 *     ├── Label-text+Icon (gap-4, pb-4)
 *     │   ├── label
 *     │   └── Icon (14×14 wrapper, arrow 10.111×7.719)
 *     └── Line (1 px, scale-x on group-hover)
 */
export function OczkiTextLink({
  label,
  href,
  iconDirection = 'end',
  newTab = false,
  className,
  labelRowClassName,
  onClick,
  type = 'button',
  disabled,
}: OczkiTextLinkProps) {
  const content = (
    <span className="flex flex-col items-start">
      <span
        className={`flex items-start gap-1 pb-1 ${labelRowClassName ?? ''}`}
        data-figma-node={OCZKI_TEXT_LINK_FIGMA_NODES.labelRow}
      >
        <span className="oczki-body-m whitespace-nowrap text-center text-[var(--oczki-primary-900)]">
          {label}
        </span>
        <span
          className={`flex w-[14px] flex-col items-start pt-[5px] ${
            iconDirection === 'down' ? 'rotate-90' : ''
          }`}
        >
          <Image
            alt=""
            aria-hidden="true"
            className="block h-[7.719px] w-[10.111px]"
            height={8}
            src={OCZKI_TEXT_LINK_ARROW_SRC}
            style={{ height: 'auto', width: 'auto' }}
            width={10}
          />
        </span>
      </span>
      <span
        aria-hidden="true"
        className="block h-px w-full origin-left scale-x-0 bg-[var(--oczki-primary-900)] transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
        data-figma-node={OCZKI_TEXT_LINK_FIGMA_NODES.hoverLine}
      />
    </span>
  )

  const rootClassName = `group relative inline-flex h-11 shrink-0 items-start justify-center pb-[10px] pt-[11px] ${
    className ?? ''
  }`

  if (href) {
    return (
      <Link
        className={rootClassName}
        data-figma-node={OCZKI_TEXT_LINK_FIGMA_NODES.button}
        href={href}
        rel={newTab ? 'noopener noreferrer' : undefined}
        target={newTab ? '_blank' : undefined}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      className={`${rootClassName} cursor-pointer border-0 bg-transparent p-0 disabled:cursor-not-allowed disabled:opacity-60`}
      data-figma-node={OCZKI_TEXT_LINK_FIGMA_NODES.button}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {content}
    </button>
  )
}
