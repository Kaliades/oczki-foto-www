// TODO: Mobile breakpoints — on small screens reduce heading size, reduce horizontal padding.
// Requires a second pass with mobile Figma frame.

import Link from 'next/link'

type GalleryCtaProps = {
  blockType: 'galleryCta'
  heading: string
  lead?: string | null
  buttonLabel: string
  buttonUrl: string
  tone?: 'light' | 'dark' | null
}

export const GalleryCta: React.FC<GalleryCtaProps> = ({
  heading,
  lead,
  buttonLabel,
  buttonUrl,
  tone = 'dark',
}) => {
  const isDark = tone !== 'light'

  const sectionBg = isDark ? 'bg-white' : 'bg-[#f6f5f2]'
  const cardBg = isDark ? 'bg-[#1a1a1a]' : 'bg-[#f6f5f2]'
  const textColor = isDark ? 'text-white' : 'text-black'
  const btnBg = isDark ? 'bg-white' : 'bg-black'
  const btnText = isDark ? 'text-black' : 'text-white'
  const btnBorder = isDark ? 'border-white' : 'border-black'

  return (
    <section className={`w-full ${sectionBg} px-4 md:px-12 pb-32 pt-20`}>
      {/* Centred constrained container — matches Figma 1366px frame */}
      <div className="mx-auto max-w-[1270px]">
        <div
          className={`${cardBg} flex flex-col items-center gap-8 rounded-xl px-6 md:px-16 lg:px-[248px] py-12`}
        >
          {/* Text block */}
          <div className="flex w-full max-w-[547px] flex-col items-center gap-4">
            <h2
              className={`w-full text-center font-sans text-2xl md:text-3xl lg:text-4xl xl:text-[36px] font-normal leading-[1.28] ${textColor}`}
            >
              {heading}
            </h2>

            {lead && (
              <p
                className={`max-w-[490px] text-center font-sans text-[16px] leading-[1.5] ${textColor}`}
              >
                {lead}
              </p>
            )}
          </div>

          {/* CTA button — pill shape */}
          <Link
            className={`${btnBg} ${btnText} flex items-center justify-center rounded-full border ${btnBorder} px-6 py-[10px] font-sans text-[16px] leading-[1.5] transition-opacity hover:opacity-90`}
            href={buttonUrl}
          >
            {buttonLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
