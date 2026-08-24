import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'
import { PhotoUnitReveal } from '@/components/PhotoUnitReveal'

type NewsletterPhotoProps = {
  alt: string
  src: string
  sizes: string
}

/** Lifestyle photo column — Figma `7091:3621`, 660×660 on desktop. */
export function NewsletterPhoto({ alt, sizes, src }: NewsletterPhotoProps) {
  if (!src.trim()) return null

  return (
    <PhotoUnitReveal className="relative aspect-square w-full shrink-0 overflow-hidden">
      <Image alt={alt} className="object-cover" fill priority={false} sizes={sizes} src={src} />
    </PhotoUnitReveal>
  )
}
