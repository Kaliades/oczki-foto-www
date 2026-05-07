// TODO: Mobile breakpoints — this component implements mobile-first stacking (heading → lead → CTA → steps)
// with lg: breakpoint for two-column desktop layout. Verify with mobile Figma frame in a second pass.

import Link from 'next/link'

type HomepageProcessProps = {
  blockType: 'homepageProcess'
  heading: string
  lead?: string | null
  buttonLabel?: string | null
  buttonUrl?: string | null
  steps: { title: string; description: string }[]
}

// Diamond badge for step number — CSS rotate-based rhombus shape
// Step 1 (first/active) uses dusty rose colour; remaining steps use lighter warm beige
function DiamondBadge({ number, active }: { number: number; active: boolean }) {
  return (
    <div className="relative flex shrink-0 items-center justify-center" style={{ width: 54, height: 54 }}>
      {/* Outer rotated border square (diamond shape) */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          width: 38,
          height: 38,
          transform: 'rotate(45deg)',
          border: `1px solid ${active ? '#dba0a0' : '#e7ded4'}`,
        }}
      />
      {/* Inner rotated filled square */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          width: 30,
          height: 30,
          transform: 'rotate(45deg)',
          backgroundColor: active ? '#ead3d3' : '#f1eee8',
        }}
      />
      {/* Step number label — sits above both squares */}
      <span
        className="relative z-10 font-sans text-[16px] leading-[1.48] tracking-[-0.015em]"
        style={{ color: active ? '#4f3a26' : '#8e7a65' }}
      >
        {number}
      </span>
    </div>
  )
}

// Button end-cap shape (scalloped left / right) matching the site button style
function ButtonCap({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={`shrink-0${flip ? ' scale-x-[-1]' : ''}`}
      fill="none"
      height="44"
      viewBox="0 0 18 44"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18 0 Q4 0 4 22 Q4 44 18 44" fill="#cba783" stroke="none" />
    </svg>
  )
}

export const HomepageProcess: React.FC<HomepageProcessProps> = ({
  heading,
  lead,
  buttonLabel,
  buttonUrl,
  steps,
}) => {
  return (
    <section className="w-full bg-[#f6f5f2] px-8 pb-20 pt-24">
      {/* Inner container — max 1366px matching Figma frame width */}
      <div className="mx-auto flex max-w-[1366px] flex-col gap-16 lg:flex-row lg:items-start lg:gap-0">

        {/* LEFT COLUMN — heading + lead + CTA */}
        <div className="flex shrink-0 flex-col gap-8 lg:w-[535px]">
          {/* Text block */}
          <div className="flex flex-col gap-4">
            {/* Heading — serif with trailing italic, matching Figma mixed style */}
            <h2 className="w-full font-['The_Seasons'] text-[28px] leading-[1.04] tracking-[-0.02em] text-[#4f3a26] lg:text-[36px]">
              {heading}
            </h2>

            {/* Lead paragraph */}
            {lead && (
              <p className="font-sans text-[16px] leading-[1.48] tracking-[-0.015em] text-[#6b5947]">
                {lead}
              </p>
            )}
          </div>

          {/* CTA Button — scalloped bracket shape */}
          {buttonLabel && buttonUrl && (
            <div className="flex items-center self-start">
              <ButtonCap />
              <Link
                className="flex h-[44px] items-center justify-center bg-[#cba783] px-1 font-sans text-[14px] font-medium leading-[1.48] tracking-[-0.01em] text-[#392818] transition-opacity hover:opacity-90"
                href={buttonUrl}
              >
                {buttonLabel}
              </Link>
              <ButtonCap flip />
            </div>
          )}
        </div>

        {/* RIGHT COLUMN — numbered vertical steps */}
        <div className="flex flex-1 flex-col gap-8 lg:pl-0" style={{ minWidth: 0 }}>
          {steps.map((step, index) => {
            const stepNumber = index + 1
            const isActive = index === 0 // First step uses highlighted (dusty rose) diamond

            return (
              <div className="flex items-start gap-5" key={stepNumber}>
                {/* Diamond number badge */}
                <DiamondBadge active={isActive} number={stepNumber} />

                {/* Step text */}
                <div className="flex min-w-0 flex-1 flex-col gap-2 pt-3">
                  <p className="font-sans text-[20px] leading-[1.48] tracking-[-0.015em] text-[#4f3a26]">
                    {step.title}
                  </p>
                  <p className="font-sans text-[14px] leading-[1.48] tracking-[-0.01em] text-[#6b5947]">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
