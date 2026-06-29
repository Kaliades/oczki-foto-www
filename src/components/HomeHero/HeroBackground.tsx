import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'

type HeroBackgroundProps = {
  src: string
  alt?: string
}

export function HeroBackground({ src, alt = '' }: HeroBackgroundProps) {
  return (
    <>
      <Image
        alt={alt}
        className="absolute inset-0 -z-20 size-full scale-[1.4] object-cover object-[66%_50%] md:scale-100 md:object-center"
        fill
        priority
        sizes="100vw"
        src={src}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/30 via-white/10 to-transparent" />
    </>
  )
}
