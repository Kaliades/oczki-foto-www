// GaleriaOMnieTeaser — Figma frame "Container" (6912:13184) renamed at integration.
// Manifest fotografki w 1. osobie + handwritten quote + tilted portrait. Lustrzany do
// HomepageOMnieTeaser.

import Image from 'next/image'

export default function GaleriaOMnieTeaser() {
  return (
    <section className="w-full bg-[#f1eee8]">
      <div className="relative mx-auto h-[617px] w-full max-w-[1366px] overflow-hidden">
        {/* Decorative botanical sprig overflowing top-right */}
        <div
          className="pointer-events-none absolute"
          style={{
            left: '1056px',
            top: '-152px',
            width: '324px',
            height: '320px',
          }}
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transform: 'rotate(-47.32deg)' }}
          >
            <Image
              src="/blocks-v2/galeriaomnieteaser/warstwa1.svg"
              alt=""
              width={196}
              height={260}
              className="block"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Main flex row: left composition + right copy */}
        <div className="relative flex h-full items-center justify-between pt-[24px] pr-[80px] pb-[48px] pl-[64px]">
          {/* LEFT: photo + decorative swoosh outlines + handwritten quote */}
          <div className="relative shrink-0" style={{ width: '691px', height: '545px' }}>
            {/* Back swoosh outline */}
            <div
              className="absolute"
              style={{ left: '0px', top: '0px', width: '560px', height: '545px' }}
              aria-hidden="true"
            >
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ transform: 'rotate(8.14deg)' }}
              >
                <Image
                  src="/blocks-v2/galeriaomnieteaser/swoosh-back.svg"
                  alt=""
                  width={497}
                  height={479}
                  className="block"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Tilted photo card with shadow */}
            <div
              className="absolute"
              style={{ left: '11px', top: '12px', width: '503px', height: '434px' }}
            >
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ transform: 'rotate(16.61deg)' }}
              >
                <div
                  className="bg-[#f1eee8] p-[8px]"
                  style={{
                    width: '428px',
                    height: '325px',
                    filter:
                      'drop-shadow(1px 4px 2.9px rgba(53,39,25,0.2)) drop-shadow(6px 11px 6.65px rgba(53,39,25,0.12))',
                  }}
                >
                  <div className="relative h-[309px] w-full">
                    <Image
                      src="/blocks-v2/galeriaomnieteaser/photo.png"
                      alt="Sesja zdjęciowa — fotografia kobieca"
                      fill
                      sizes="428px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Front swoosh outline */}
            <div
              className="absolute"
              style={{ left: '5px', top: '318px', width: '510px', height: '230px' }}
              aria-hidden="true"
            >
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ transform: 'rotate(8.14deg)' }}
              >
                <Image
                  src="/blocks-v2/galeriaomnieteaser/swoosh-front.svg"
                  alt=""
                  width={493}
                  height={161}
                  className="block"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Right swoosh accent */}
            <div
              className="absolute"
              style={{ left: '333px', top: '185px', width: '205px', height: '314px' }}
              aria-hidden="true"
            >
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ transform: 'rotate(8.14deg)' }}
              >
                <Image
                  src="/blocks-v2/galeriaomnieteaser/swoosh-right.svg"
                  alt=""
                  width={165}
                  height={294}
                  className="block"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Left swoosh accent (mirrored) */}
            <div
              className="absolute"
              style={{ left: '0px', top: '185px', width: '205px', height: '314px' }}
              aria-hidden="true"
            >
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ transform: 'rotate(-171.86deg) scaleY(-1)' }}
              >
                <Image
                  src="/blocks-v2/galeriaomnieteaser/swoosh-left.svg"
                  alt=""
                  width={165}
                  height={294}
                  className="block"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Handwritten English quote inside torn-paper shape (right side of composition) */}
            <div
              className="absolute"
              style={{ left: '422px', top: '302px', width: '270px', height: '224px' }}
            >
              {/* Background torn-paper shape */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ transform: 'rotate(78.98deg)' }}
                aria-hidden="true"
              >
                <Image
                  src="/blocks-v2/galeriaomnieteaser/quote-shape-bg.svg"
                  alt=""
                  width={182}
                  height={239}
                  className="block"
                  aria-hidden="true"
                />
              </div>

              {/* Foreground torn-paper shape */}
              <div
                className="absolute"
                style={{ left: '12px', top: '9px', width: '242px', height: '201px' }}
                aria-hidden="true"
              >
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ transform: 'rotate(78.98deg)' }}
                >
                  <Image
                    src="/blocks-v2/galeriaomnieteaser/quote-shape-fg.svg"
                    alt=""
                    width={163}
                    height={215}
                    className="block"
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Handwritten quote text */}
              <div
                className="absolute"
                style={{ left: '31px', top: '49px', width: '194px', height: '128px' }}
              >
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ transform: 'rotate(-11.02deg)' }}
                >
                  <p
                    className="w-[179px] text-center text-[24px] leading-[0.98] text-[#6b5947]"
                    style={{
                      fontFamily: '"Dancing Script", cursive',
                      fontFeatureSettings: "'lnum' 1, 'pnum' 1",
                    }}
                  >
                    I find a brand new way of seeing... your eyes forever glued to mine
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Polish heading + body paragraph */}
          <div className="flex h-full w-[460px] shrink-0 flex-col items-start gap-[20px]">
            <h2
              className="w-full text-[32px] leading-[1.04] tracking-[-0.32px] text-[#4f3a26]"
              style={{
                fontFamily: '"The Seasons", serif',
                fontFeatureSettings: "'lnum' 1, 'pnum' 1",
              }}
            >
              Zdjęcia pełne lekkości, na których po prostu{' '}
              <span
                className="italic"
                style={{
                  fontFamily: '"The Seasons", serif',
                  fontFeatureSettings: "'dlig' 1, 'lnum' 1, 'pnum' 1",
                }}
              >
                czujesz się dobrze
              </span>
            </h2>
            <p
              className="w-full text-[16px] leading-[1.48] tracking-[-0.24px] text-[#6b5947]"
              style={{
                fontFamily: '"Instrument Sans", sans-serif',
                fontVariationSettings: "'wdth' 100",
                fontFeatureSettings:
                  "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
              }}
            >
              Podczas sesji nie szukam „perfekcyjnych póz”, ale Twojego spokoju i swobody.
              Moim zadaniem jest stworzyć dla Ciebie taką atmosferę, byś zapomniała o
              obecności aparatu i mogła po prostu być sobą. Wybieram takie kadry i momenty,
              które podkreślają Twoją naturalność i kobiecość, dbając o to, byś na każdym
              ujęciu widziała swoją najlepszą wersję.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
