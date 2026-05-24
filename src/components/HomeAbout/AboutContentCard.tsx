import { AboutPortrait } from './AboutPortrait'
import { AboutTextColumn } from './AboutTextColumn'
import type { HomeAboutData } from './constants'

/** Figma `6754:4271` / `7105:11758` / `7105:14053` — white card. */
export const AboutContentCard = ({
  heading,
  paragraphs,
  portrait,
  cta,
}: Pick<HomeAboutData, 'heading' | 'paragraphs' | 'portrait' | 'cta'>) => (
  <div
    className="relative mx-auto flex h-[867px] w-full max-w-[328px] flex-col overflow-hidden bg-white p-2 md:h-[1126px] md:max-w-[608px] lg:h-[538px] lg:max-w-[1174px] lg:flex-row lg:items-stretch"
    data-figma-node="6754:4271"
  >
    <div className="relative flex h-[528px] w-full shrink-0 flex-col md:h-[498px] lg:h-[522px] lg:w-[653px]">
      <AboutTextColumn cta={cta} heading={heading} paragraphs={paragraphs} />
    </div>
    <AboutPortrait alt={portrait.alt} src={portrait.src} />
  </div>
)
