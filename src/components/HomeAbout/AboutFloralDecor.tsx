import Image from 'next/image'

export const AboutFloralDecor = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[-116px] top-[-32px] z-0 flex h-[430px] w-[378px] items-center justify-center md:right-[-187px] md:top-[-40px] md:h-[617px] md:w-[543px]"
    >
      <div className="rotate-[-23.75deg]">
        <Image
          alt=""
          className="h-[357px] w-[256px] select-none object-contain md:h-[512px] md:w-[368px]"
          height={512}
          src="/figma/about-floral-top.png"
          width={368}
        />
      </div>
    </div>
  )
}

/** Desktop — inside left column on white card, behind text. Figma `6857:1787`. */
export const AboutFloralBottomDesktop = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute left-[179px] top-[335px] z-0 hidden h-[574px] w-[505px] items-center justify-center lg:flex"
  >
    <div className="-scale-y-100 rotate-[-156.25deg]">
      <Image
        alt=""
        className="h-[477px] w-[342px] select-none object-contain"
        height={477}
        src="/figma/about-floral-bottom.png"
        width={342}
      />
    </div>
  </div>
)

/** Tablet / mobile — section-level, overlaps portrait. Figma `7105:12941` / `7105:14071`. */
export const AboutFloralBottomSection = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute left-[192px] top-[691px] z-0 flex h-[400px] w-[352px] items-center justify-center md:left-[280px] md:top-[863px] md:h-[574px] md:w-[505px] lg:hidden"
  >
    <div className="-scale-y-100 rotate-[-156.25deg]">
      <Image
        alt=""
        className="h-[332px] w-[238px] select-none object-contain md:h-[477px] md:w-[342px]"
        height={477}
        src="/figma/about-floral-bottom.png"
        width={342}
      />
    </div>
  </div>
)
