// TODO: Mobile pass — on narrow viewports FAQ list stacks above form (flex-col).
// Desktop: 2-col (FAQ left ~673px, form right ~405px) with gap-[32px].
// Inspect mobile Figma frame when available to finalize breakpoint classes.

// TODO: Replace inline props type with `import type { GalleryFaqBlock } from '@/payload-types'`
// once the block is registered and `pnpm payload generate:types` has been run.
import { GalleryContactForm } from './GalleryContactForm'

type FaqItem = {
  question: string
  answer: string
  defaultOpen?: boolean | null
}

type ContactBox = {
  heading: string
  messageLabel?: string | null
  submitLabel?: string | null
  successMessage?: string | null
  errorMessage?: string | null
}

type GalleryFaqBlock = {
  blockType: 'galleryFaq'
  heading: string
  lead?: string | null
  items?: FaqItem[] | null
  contactBox?: ContactBox | null
}

// Inline SVG icons matching Figma design:
// - open item: checkbox-indeterminate (minus) on dark background
// - closed item: add-box (plus) on white background with border

const MinusIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" y="0.5" width="19" height="19" rx="3.5" fill="white" stroke="white" />
    <rect x="4" y="9" width="12" height="2" rx="1" fill="#161616" />
  </svg>
)

const PlusIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" y="0.5" width="19" height="19" rx="3.5" fill="white" stroke="#161616" />
    <rect x="9" y="4" width="2" height="12" rx="1" fill="#161616" />
    <rect x="4" y="9" width="12" height="2" rx="1" fill="#161616" />
  </svg>
)

export const GalleryFaq: React.FC<GalleryFaqBlock> = ({ heading, lead, items, contactBox }) => {
  const boxHeading =
    contactBox?.heading ?? 'Nie możesz znaleźć odpowiedzi na swoje pytanie? Napisz do nas'
  const messageLabel = contactBox?.messageLabel ?? 'Wiadomość'
  const submitLabel = contactBox?.submitLabel ?? 'Wyślij wiadomość'
  const successMessage = contactBox?.successMessage ?? 'Dziękujemy! Odezwiemy się wkrótce.'
  const errorMessage = contactBox?.errorMessage ?? 'Coś poszło nie tak.'

  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1366px] px-8 py-20">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-[32px]">
          {/* Left column: heading + FAQ list */}
          <div className="flex flex-col gap-6 lg:w-[673px] shrink-0">
            {/* Header */}
            <div className="flex flex-col gap-3">
              <h2 className="text-[32px] leading-[1.2] tracking-[-0.02em] text-black font-normal">
                {heading}
              </h2>
              {lead && (
                <p className="text-base leading-[1.7] text-black">
                  {lead}
                </p>
              )}
            </div>

            {/* FAQ accordion — native <details>/<summary>, zero JS */}
            <div className="flex flex-col gap-3">
              {items &&
                items.map((item, index) => (
                  <details
                    key={index}
                    open={item.defaultOpen ?? false}
                    className="group rounded-lg border border-black overflow-hidden open:border-[#161616] open:bg-[#161616]"
                  >
                    <summary className="flex items-center gap-3 pl-3 pr-6 py-3 cursor-pointer list-none select-none">
                      {/* Icon: plus when closed, minus when open */}
                      <span className="shrink-0 flex items-center mt-[3px] self-start group-open:mt-[3px]">
                        <span className="group-open:hidden">
                          <PlusIcon />
                        </span>
                        <span className="hidden group-open:block">
                          <MinusIcon />
                        </span>
                      </span>
                      <span className="flex-1 min-w-0 text-base font-bold leading-[1.28] text-black group-open:text-white">
                        {item.question}
                      </span>
                    </summary>

                    {/* Answer — visible only when open */}
                    <div className="pl-[44px] pr-6 pb-5">
                      <p className="text-base leading-[1.7] text-white whitespace-pre-wrap">
                        {item.answer}
                      </p>
                    </div>
                  </details>
                ))}
            </div>
          </div>

          {/* Right column: contact form */}
          <GalleryContactForm
            heading={boxHeading}
            messageLabel={messageLabel}
            submitLabel={submitLabel}
            successMessage={successMessage}
            errorMessage={errorMessage}
          />
        </div>
      </div>
    </section>
  )
}
