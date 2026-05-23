import { AboutPortrait } from './AboutPortrait'
import { AboutTextColumn } from './AboutTextColumn'
import type { HomeAboutData } from './constants'

type AboutContentCardProps = Pick<
  HomeAboutData,
  'heading' | 'paragraphs' | 'portrait' | 'cta'
>

export const AboutContentCard = ({
  heading,
  paragraphs,
  portrait,
  cta,
}: AboutContentCardProps) => {
  return (
    <div className="relative z-[1] flex w-full flex-col overflow-visible bg-white p-2 lg:min-h-[538px] lg:flex-row lg:items-stretch">
      <AboutTextColumn cta={cta} heading={heading} paragraphs={paragraphs} />
      <AboutPortrait alt={portrait.alt} src={portrait.src} />
    </div>
  )
}
