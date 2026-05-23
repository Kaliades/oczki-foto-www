import Image from 'next/image'

type AboutPortraitProps = {
  src: string
  alt: string
}

export const AboutPortrait = ({ src, alt }: AboutPortraitProps) => {
  return (
    <div className="relative aspect-[312/323] w-full shrink-0 overflow-hidden md:aspect-[592/612] lg:aspect-auto lg:h-[522px] lg:w-[505px] lg:shrink-0">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute"
          style={{
            height: '224.81%',
            left: '-28.68%',
            top: '-31.89%',
            width: '157.78%',
          }}
        >
          <Image alt={alt} src={src} fill className="object-cover" sizes="(max-width: 768px) 312px, (max-width: 1024px) 592px, 505px" />
        </div>
      </div>
    </div>
  )
}
