import Image from 'next/image'

const ASSET_BASE = '/blocks-v2/homepagefooternewsletter'

const SERVICES = ['Sesje kobiece', 'Reportaże ślubne', 'Sesje wizerunkowe', 'Sesje rodzinne']

const NAV_LINKS = [
  { label: 'Galeria', href: '/galeria' },
  { label: 'Kontakt', href: '#kontakt' },
  { label: 'O mnie', href: '/o-mnie' },
]

const SOCIAL_ICONS = [
  { src: `${ASSET_BASE}/icon-instagram.svg`, alt: 'Instagram', width: 24, height: 24 },
  { src: `${ASSET_BASE}/icon-facebook.svg`, alt: 'Facebook', width: 24, height: 24 },
  { src: `${ASSET_BASE}/icon-pinterest.svg`, alt: 'Pinterest', width: 22, height: 24 },
  { src: `${ASSET_BASE}/icon-weselezklasa.svg`, alt: 'Wesele z klasą', width: 24, height: 24 },
]

const GALLERY = [
  { src: `${ASSET_BASE}/gallery-1.png`, w: 211 },
  { src: `${ASSET_BASE}/gallery-2.png`, w: 211 },
  { src: `${ASSET_BASE}/gallery-3.png`, w: 211 },
  { src: `${ASSET_BASE}/gallery-4.png`, w: 211 },
  { src: `${ASSET_BASE}/gallery-5.png`, w: 212 },
  { src: `${ASSET_BASE}/gallery-6.png`, w: 211 },
]

export default function HomepageFooterNewsletter() {
  return (
    <footer className="w-full bg-[#e7ded4]">
      <div className="mx-auto w-full max-w-[1366px]">
        {/* ===== Newsletter section: image left + form column right ===== */}
        <div className="flex w-full items-stretch">
          {/* Left image (square, fluid) */}
          <div className="relative aspect-[660/660] flex-1 min-w-0">
            <Image
              src={`${ASSET_BASE}/text-column-image.png`}
              alt=""
              fill
              sizes="660px"
              className="object-cover pointer-events-none select-none"
            />
          </div>

          {/* Right form column with sage-green background and cement texture */}
          <div className="relative flex w-[706px] shrink-0 flex-col items-start gap-[32px] overflow-hidden bg-[#6b7a5e] px-[128px] pt-[80px] pb-[128px]">
            {/* Decorative cement texture overlay */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[772px] w-[1031px] -translate-x-1/2 -translate-y-1/2"
              style={{ marginTop: '48.2px', mixBlendMode: 'darken' }}
              aria-hidden
            >
              <Image
                src={`${ASSET_BASE}/cement-texture.png`}
                alt=""
                fill
                sizes="1031px"
                className="object-cover opacity-50"
              />
            </div>

            {/* Header text */}
            <div className="relative flex w-full flex-col items-start gap-[16px]">
              <p
                className="font-['The_Seasons',serif] w-full text-[32px] leading-[1.04] tracking-[-0.32px] text-[#e7ded4]"
                style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
              >
                {'Małe wskazówki, wielka '}
                <span
                  className="italic"
                  style={{ fontFeatureSettings: "'dlig' 1, 'lnum' 1, 'pnum' 1" }}
                >
                  pewność siebie
                </span>
                {' przed aparatem'}
              </p>
              <p
                className="font-['Instrument_Sans',sans-serif] w-full text-[16px] leading-[1.48] tracking-[-0.24px] text-[#f6f5f2]"
                style={{
                  fontVariationSettings: "'wdth' 100",
                  fontFeatureSettings:
                    "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                }}
              >
                Nie musisz zapisywać się na sesję, żeby poczuć różnicę. W moim newsletterze dzielę
                się krótkimi poradami i inspiracjami, które pomagają.
              </p>
            </div>

            {/* Form */}
            <form
              action="/api/newsletter"
              method="post"
              className="relative flex w-full flex-col items-start justify-center gap-[32px]"
            >
              <div className="flex w-full flex-col items-start gap-[12px]">
                {/* Name input */}
                <div className="relative isolate flex w-full flex-col items-start">
                  <label
                    htmlFor="newsletter-name"
                    className="z-[2] -mb-[11px] flex items-center justify-center bg-[#6b7a5e] px-[4px] py-[2px]"
                  >
                    <span
                      className="font-['Instrument_Sans',sans-serif] text-[12px] leading-[1.48] tracking-[-0.12px] whitespace-nowrap text-[#f6f5f2]"
                      style={{
                        fontVariationSettings: "'wdth' 100",
                        fontFeatureSettings:
                          "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                      }}
                    >
                      Twoje imię
                    </span>
                  </label>
                  <input
                    type="text"
                    id="newsletter-name"
                    name="name"
                    className="z-[1] flex h-[46px] w-full items-center border border-solid border-[#bbc3b5] bg-transparent px-[12px] pt-[12px] pb-[13px] font-['Instrument_Sans',sans-serif] text-[14px] tracking-[-0.14px] text-[#f6f5f2] outline-none"
                  />
                </div>

                {/* Email input */}
                <div className="relative isolate flex w-full flex-col items-start">
                  <label
                    htmlFor="newsletter-email"
                    className="z-[2] -mb-[11px] flex items-center justify-center bg-[#6b7a5e] px-[4px] py-[2px]"
                  >
                    <span
                      className="font-['Instrument_Sans',sans-serif] text-[12px] leading-[1.48] tracking-[-0.12px] whitespace-nowrap text-[#f6f5f2]"
                      style={{
                        fontVariationSettings: "'wdth' 100",
                        fontFeatureSettings:
                          "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                      }}
                    >
                      Email
                    </span>
                  </label>
                  <input
                    type="email"
                    id="newsletter-email"
                    name="email"
                    className="z-[1] flex h-[46px] w-full items-center border border-solid border-[#bbc3b5] bg-transparent px-[12px] pt-[12px] pb-[13px] font-['Instrument_Sans',sans-serif] text-[14px] tracking-[-0.14px] text-[#f6f5f2] outline-none"
                  />
                </div>

                {/* Consent checkbox */}
                <div className="flex h-[44px] items-center">
                  <span className="flex items-center -mr-[10px] size-[44px]">
                    <span className="flex size-[26px] items-center justify-center border border-solid border-[#bbc3b5]">
                      <input
                        type="checkbox"
                        id="newsletter-consent"
                        name="consent"
                        className="size-full cursor-pointer appearance-none"
                      />
                    </span>
                  </span>
                  <label
                    htmlFor="newsletter-consent"
                    className="flex items-center gap-[4px] cursor-pointer"
                  >
                    <span
                      className="font-['Instrument_Sans',sans-serif] text-[14px] leading-[1.48] tracking-[-0.14px] whitespace-nowrap text-[#f6f5f2]"
                      style={{
                        fontVariationSettings: "'wdth' 100",
                        fontFeatureSettings:
                          "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                      }}
                    >
                      Wyrażam zgodę na
                    </span>
                    <a
                      href="/polityka-prywatnosci"
                      className="flex h-[44px] items-center gap-[4px]"
                    >
                      <span
                        className="font-['Instrument_Sans',sans-serif] py-[4px] text-[14px] leading-[1.48] tracking-[-0.14px] underline whitespace-nowrap font-medium text-[#e7ded4]"
                        style={{
                          fontVariationSettings: "'wdth' 100",
                          fontFeatureSettings:
                            "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                        }}
                      >
                        politykę prywatności
                      </span>
                      <span className="flex size-[16px] items-center justify-center p-[2.286px]">
                        <Image
                          src={`${ASSET_BASE}/icon-link-arrow.svg`}
                          alt=""
                          width={11}
                          height={11}
                          className="block"
                        />
                      </span>
                    </a>
                  </label>
                </div>
              </div>

              {/* Submit button (left+right ornaments + center label) */}
              <button
                type="submit"
                className="flex h-[44px] items-center"
                aria-label="Dołącz do newslettera"
              >
                <span className="relative h-[44px] w-[18px] shrink-0">
                  <Image
                    src={`${ASSET_BASE}/button-left.svg`}
                    alt=""
                    fill
                    sizes="18px"
                    className="block"
                  />
                </span>
                <span
                  className="flex h-[44px] items-start justify-center bg-[#cba783] pt-[11px] pb-[10px] px-[4px] font-['Instrument_Sans',sans-serif] text-center text-[14px] leading-[1.48] tracking-[-0.14px] whitespace-nowrap text-[#392818] font-medium"
                  style={{
                    fontVariationSettings: "'wdth' 100",
                    fontFeatureSettings:
                      "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                  }}
                >
                  Dołącz do newslettera
                </span>
                <span className="relative h-[44px] w-[18px] shrink-0">
                  <Image
                    src={`${ASSET_BASE}/button-right.svg`}
                    alt=""
                    fill
                    sizes="18px"
                    className="block"
                  />
                </span>
              </button>
            </form>
          </div>
        </div>

        {/* ===== Footer section ===== */}
        <div className="flex w-full flex-col items-center overflow-hidden">
          {/* Bubble row (overlaps next block by -72px) */}
          <div
            className="relative flex w-full items-center justify-center -mt-[32px]"
            style={{ marginBottom: '-72px' }}
            aria-hidden
          >
            {Array.from({ length: 14 }).map((_, i) => (
              <span
                key={i}
                className="relative size-[112px] shrink-0"
                style={{ marginRight: i === 13 ? 0 : -12 }}
              >
                <Image
                  src={`${ASSET_BASE}/ellipse-bubble.svg`}
                  alt=""
                  fill
                  sizes="112px"
                  className="block"
                  unoptimized
                />
              </span>
            ))}
          </div>

          {/* "Stopka" content */}
          <div className="flex w-full flex-col items-start gap-[80px] overflow-hidden bg-[#e7ded4] px-[24px] pt-[48px] pb-[16px]">
            {/* Top row: services | logo+social | nav links */}
            <div className="flex w-full items-center justify-between">
              {/* Services list */}
              <ul className="flex w-[286px] flex-col items-start">
                {SERVICES.map((service) => (
                  <li key={service} className="flex w-full min-h-[44px] items-center py-[4px]">
                    <span
                      className="flex-1 font-['Instrument_Sans',sans-serif] text-[14px] leading-[1.48] tracking-[-0.14px] text-[#6b5947]"
                      style={{
                        fontVariationSettings: "'wdth' 100",
                        fontFeatureSettings:
                          "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                      }}
                    >
                      {service}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Center: logo + socials */}
              <div className="flex w-[395.333px] flex-col items-center gap-[32px]">
                <a href="/" className="flex w-[132px] flex-col items-center gap-[10px]">
                  <span className="relative block h-[48px] w-[33.301px]">
                    <Image
                      src={`${ASSET_BASE}/sygnet.svg`}
                      alt=""
                      fill
                      sizes="34px"
                      className="block"
                    />
                  </span>
                  <span className="relative block h-[30.834px] w-[104.788px]">
                    <Image
                      src={`${ASSET_BASE}/logotyp.svg`}
                      alt="Oczki Foto"
                      fill
                      sizes="105px"
                      className="block"
                    />
                  </span>
                </a>

                <div className="flex items-center">
                  {SOCIAL_ICONS.map((icon) => (
                    <a
                      key={icon.alt}
                      href="#"
                      aria-label={icon.alt}
                      className="flex items-center p-[10px]"
                    >
                      <span
                        className="relative block"
                        style={{ width: icon.width, height: icon.height }}
                      >
                        <Image
                          src={icon.src}
                          alt=""
                          fill
                          sizes={`${icon.width}px`}
                          className="block"
                        />
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Right nav links */}
              <ul className="flex w-[286px] flex-col items-start self-stretch">
                {NAV_LINKS.map((link) => (
                  <li
                    key={link.href}
                    className="flex w-full min-h-[44px] items-center justify-center py-[4px]"
                  >
                    <a
                      href={link.href}
                      className="flex-1 font-['Instrument_Sans',sans-serif] text-[14px] leading-[1.48] tracking-[-0.14px] text-right text-[#6b5947]"
                      style={{
                        fontVariationSettings: "'wdth' 100",
                        fontFeatureSettings:
                          "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Gallery image strip */}
            <div className="flex w-full flex-col items-start">
              <div className="flex items-center gap-[10px]">
                {GALLERY.map((img, i) => (
                  <div
                    key={i}
                    className="relative h-[262px] shrink-0"
                    style={{ width: img.w }}
                  >
                    <Image
                      src={img.src}
                      alt=""
                      fill
                      sizes={`${img.w}px`}
                      className="object-cover pointer-events-none select-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
