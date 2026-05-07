// TODO: Mobile breakpoints — on small screens hide side leaf decorations, reduce heading size,
// allow content to wrap naturally. Requires a second pass with mobile Figma frame.

import Link from 'next/link'

type HomepageCtaProps = {
  blockType: 'homepageCta'
  heading: string
  subheading?: string | null
  buttonLabel: string
  buttonUrl: string
}

// Decorative scalloped outer border (pink) — traced from Figma node I7105:8981;7105:8627
function OuterFrame() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 1174 398"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer scalloped/ornate border in dusty pink */}
      <rect
        fill="none"
        height="393"
        rx="11"
        stroke="#d6b4a4"
        strokeWidth="1.2"
        width="1169"
        x="2.5"
        y="2.5"
      />
      {/* Top scalloped accents */}
      <path
        d="M60 2.5 Q66 0 72 2.5 Q78 5 84 2.5"
        fill="none"
        stroke="#d6b4a4"
        strokeWidth="1.2"
      />
      <path
        d="M1090 2.5 Q1096 0 1102 2.5 Q1108 5 1114 2.5"
        fill="none"
        stroke="#d6b4a4"
        strokeWidth="1.2"
      />
      {/* Bottom scalloped accents */}
      <path
        d="M60 395.5 Q66 398 72 395.5 Q78 393 84 395.5"
        fill="none"
        stroke="#d6b4a4"
        strokeWidth="1.2"
      />
      <path
        d="M1090 395.5 Q1096 398 1102 395.5 Q1108 393 1114 395.5"
        fill="none"
        stroke="#d6b4a4"
        strokeWidth="1.2"
      />
    </svg>
  )
}

// Decorative inner border (lighter pink) — Figma node I7105:8981;7105:8634
function InnerFrame() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 1133 366"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        fill="none"
        height="361"
        rx="8"
        stroke="#e8d0c6"
        strokeDasharray="4 3"
        strokeWidth="1"
        width="1128"
        x="2.5"
        y="2.5"
      />
    </svg>
  )
}

// Small flower/dot accent — Figma "favourite" icon (node I7105:8981;7105:8648)
function FlowerDot({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height="12"
      viewBox="0 0 12 12"
      width="12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="6" cy="6" fill="#c9967a" r="1.8" />
      <circle cx="6" cy="2" fill="#c9967a" r="1.2" />
      <circle cx="6" cy="10" fill="#c9967a" r="1.2" />
      <circle cx="2" cy="6" fill="#c9967a" r="1.2" />
      <circle cx="10" cy="6" fill="#c9967a" r="1.2" />
    </svg>
  )
}

// Leaf/branch decoration — Figma "Vector" node (I7105:8981;7105:8651)
function LeafBranch({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height="80"
      viewBox="0 0 36 80"
      width="36"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Stem */}
      <line stroke="#a8b89a" strokeWidth="1" x1="18" x2="18" y1="0" y2="80" />
      {/* Left leaves */}
      <path
        d="M18 20 Q6 16 4 24 Q6 20 18 22"
        fill="#a8b89a"
        fillOpacity="0.7"
        stroke="none"
      />
      <path
        d="M18 36 Q4 30 2 40 Q4 35 18 38"
        fill="#a8b89a"
        fillOpacity="0.7"
        stroke="none"
      />
      <path
        d="M18 52 Q6 46 4 56 Q6 51 18 54"
        fill="#a8b89a"
        fillOpacity="0.7"
        stroke="none"
      />
      {/* Right leaves */}
      <path
        d="M18 28 Q30 24 32 32 Q30 28 18 30"
        fill="#a8b89a"
        fillOpacity="0.7"
        stroke="none"
      />
      <path
        d="M18 44 Q32 38 34 48 Q32 43 18 46"
        fill="#a8b89a"
        fillOpacity="0.7"
        stroke="none"
      />
      <path
        d="M18 60 Q30 54 32 64 Q30 59 18 62"
        fill="#a8b89a"
        fillOpacity="0.7"
        stroke="none"
      />
    </svg>
  )
}

// Side ornament group: flower dot + leaf branch + flower dot (vertical stack)
function SideOrnament({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`flex flex-col items-center gap-8 ${className ?? ''}`}>
      <FlowerDot />
      <LeafBranch />
      <FlowerDot />
    </div>
  )
}

// Button end-cap shape (scalloped/bracketed sides) — Figma node I7105:8981;7105:8646;7063:14172
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
      <path
        d="M18 0 Q4 0 4 22 Q4 44 18 44"
        fill="#cba783"
        stroke="none"
      />
    </svg>
  )
}

export const HomepageCta: React.FC<HomepageCtaProps> = ({
  heading,
  subheading,
  buttonLabel,
  buttonUrl,
}) => {
  return (
    <section className="w-full bg-[#f6f5f2] py-24 px-12">
      {/* Centred constrained container — matches Figma 1366px frame */}
      <div className="relative mx-auto max-w-[1270px]">
        {/* Decorative outer ornate frame — absolute, covers the inner container */}
        <div className="pointer-events-none absolute inset-0 -mx-[96px]">
          <OuterFrame />
        </div>

        {/* Decorative inner dashed frame */}
        <div className="pointer-events-none absolute inset-0 -mx-[77px]">
          <InnerFrame />
        </div>

        {/* Left side ornament */}
        <div className="pointer-events-none absolute left-0 top-1/2 hidden -translate-x-[60px] -translate-y-1/2 lg:block">
          <SideOrnament />
        </div>

        {/* Right side ornament */}
        <div className="pointer-events-none absolute right-0 top-1/2 hidden translate-x-[60px] -translate-y-1/2 lg:block">
          <SideOrnament />
        </div>

        {/* Main content — centred column */}
        <div className="flex flex-col items-center gap-9 px-4 py-16 md:px-[80px] lg:px-[336px]">
          {/* Text block */}
          <div className="flex w-full flex-col items-center gap-4">
            {/* Heading — serif with partial italic for "coś pięknego" */}
            <h2 className="w-full text-center font-['The_Seasons'] text-[28px] leading-[1.04] tracking-[-0.02em] text-[#4f3a26] md:text-[36px]">
              {heading}
            </h2>

            {/* Subheading */}
            {subheading && (
              <div className="flex w-full flex-col items-center">
                <p className="max-w-[490px] text-center font-sans text-[15px] leading-[1.48] tracking-[-0.015em] text-[#6b5947] md:text-[16px]">
                  {subheading}
                </p>
              </div>
            )}
          </div>

          {/* CTA Button — scalloped bracket shape */}
          <div className="flex items-center">
            <ButtonCap />
            <Link
              className="flex h-[44px] items-center justify-center bg-[#cba783] px-1 font-sans text-[14px] font-medium leading-[1.48] tracking-[-0.01em] text-[#392818] transition-opacity hover:opacity-90"
              href={buttonUrl}
            >
              {buttonLabel}
            </Link>
            <ButtonCap flip />
          </div>
        </div>
      </div>
    </section>
  )
}
