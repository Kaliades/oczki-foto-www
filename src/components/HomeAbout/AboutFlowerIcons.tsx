const SPRIG_SRC = '/figma/about-flower-sprig.svg'

/** Pink sprig pair — Figma `6759:4328` (desktop), `7105:14056` (mobile). */
export const AboutFlowerIcons = () => (
  <>
    {/* Mobile — left-aligned, gap 24 px, Figma `7105:14056` */}
    <div className="flex items-center gap-6 md:hidden" data-figma-node="7105:14056">
      <div className="flex h-5 w-[39.024px] shrink-0 items-center justify-center">
        <div className="-rotate-90 -scale-y-100 flex-none">
          <div className="relative h-[39.024px] w-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" aria-hidden="true" className="absolute inset-0 size-full max-w-none" src={SPRIG_SRC} />
          </div>
        </div>
      </div>
      <div className="flex h-5 w-[39.024px] shrink-0 items-center justify-center">
        <div className="-rotate-90 flex-none">
          <div className="relative h-[39.024px] w-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" aria-hidden="true" className="absolute inset-0 size-full max-w-none" src={SPRIG_SRC} />
          </div>
        </div>
      </div>
    </div>

    {/* Desktop / tablet — centered, gap 24 px, Figma `6759:4328` */}
    <div className="hidden items-center justify-center gap-6 md:flex" data-figma-node="6759:4328">
      <div className="flex h-[25px] w-[48.78px] shrink-0 items-center justify-center">
        <div className="-rotate-90 -scale-y-100 flex-none">
          <div className="relative h-[48.78px] w-[25px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" aria-hidden="true" className="absolute inset-0 size-full max-w-none" src={SPRIG_SRC} />
          </div>
        </div>
      </div>
      <div className="flex h-[25px] w-[48.78px] shrink-0 items-center justify-center">
        <div className="-rotate-90 flex-none">
          <div className="relative h-[48.78px] w-[25px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" aria-hidden="true" className="absolute inset-0 size-full max-w-none" src={SPRIG_SRC} />
          </div>
        </div>
      </div>
    </div>
  </>
)
