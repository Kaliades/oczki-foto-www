import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'

import { cn } from '@/utilities/ui'

type IntroImageCollageProps = {
  imageSrc: string
  imageAlt: string
  handwrittenQuote: string
  className?: string
}

export function IntroImageCollage({
  imageSrc,
  imageAlt,
  handwrittenQuote,
  className,
}: IntroImageCollageProps) {
  return (
    <div
      className={cn(
        'relative h-[321px] w-[403px] shrink-0 md:h-[428px] md:w-[533px]',
        className,
      )}
    >
      <div className="absolute right-0 top-0 flex h-[321px] w-[256px] items-center justify-center md:h-[428px] md:w-[341px]">
        <div className="rotate-[-7.48deg]">
          <div className="flex h-[295px] w-[219px] flex-col items-center md:h-[393px] md:w-[292px]">
            <div className="mb-[-109.849px] flex h-[249px] w-[204px] shrink-0 items-center border-[var(--oczki-primary-300)] bg-[var(--oczki-primary-200)] p-[4.926px] [border-width:0.493px] md:mb-[-146.465px] md:h-[332px] md:w-[271px] md:p-[6.568px] md:[border-width:0.657px]">
              <div className="relative h-[239px] w-[194px] shrink-0 overflow-hidden md:h-[319px] md:w-[258px]">
                <Image
                  alt={imageAlt}
                  className="absolute left-0 top-[-5.6%] h-[121.3%] w-full max-w-none object-cover"
                  height={1920}
                  src={imageSrc}
                  width={1280}
                />
              </div>
            </div>

            <Image
              alt=""
              aria-hidden="true"
              className="relative h-[155.66px] w-[218.713px] shrink-0 md:h-[207.547px] md:w-[291.617px]"
              height={208}
              src="/figma/intro-polaroid-bottom.svg"
              width={292}
            />
          </div>
        </div>
      </div>

      <figure className="absolute left-0 top-[109.99px] h-[174px] w-[188px] md:top-[138.1px] md:h-[232px] md:w-[251px]">
        <div className="relative h-full w-full rotate-[14.06deg]">
          <Image
            alt=""
            aria-hidden="true"
            className="h-[139.399px] w-[158.878px] md:h-[185.866px] md:w-[211.838px]"
            height={186}
            src="/figma/intro-stamp-note.svg"
            width={212}
          />
          {/* Handwritten quote size matches Figma `header/s`: mobile 20 /
              tablet 24 / desktop 24. Earlier the code used `oczki-handwritten-s`
              (fixed 24) across all breakpoints. */}
          <blockquote className="absolute left-[13px] top-5 w-[134px] text-center text-[20px] font-normal leading-[0.98] tracking-[0] text-[var(--oczki-secondary-600)] [font-family:var(--font-oczki-handwritten)] [font-feature-settings:'lnum'_1,'pnum'_1] md:left-4 md:top-[45px] md:w-[179px] md:text-[24px]">
            {handwrittenQuote}
          </blockquote>
        </div>
      </figure>
    </div>
  )
}
