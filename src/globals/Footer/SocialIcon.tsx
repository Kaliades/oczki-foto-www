import { ExternalLink, Instagram, Facebook } from 'lucide-react'

type Platform = 'instagram' | 'facebook' | 'tiktok' | 'pinterest' | 'youtube' | 'other' | string

interface SocialIconProps {
  platform: Platform
  size?: number
}

export function SocialIcon({ platform, size = 20 }: SocialIconProps) {
  switch (platform) {
    case 'instagram':
      return <Instagram size={size} aria-hidden="true" />
    case 'facebook':
      return <Facebook size={size} aria-hidden="true" />
    default:
      return <ExternalLink size={size} aria-hidden="true" />
  }
}
