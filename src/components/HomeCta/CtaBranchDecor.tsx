import Image from 'next/image'

type CtaBranchDecorProps = {
  /** Mirror the branch horizontally (right-hand side on desktop). */
  mirrored?: boolean
  /** Flip the whole stack vertically (bottom ornament on mobile). */
  flipped?: boolean
  className?: string
}

/**
 * Heart–branch–heart ornament sitting inside the ornate CTA frame.
 *
 * Figma stack (7105:8655 / 7105:8647 / 7105:8573): vertical auto-layout with
 * 32 px between the 12 px hearts and the branch vector. Desktop branch slot
 * is 80 × 36 (vector native 36 × 80, rotated 90°).
 */
export const CtaBranchDecor = ({ mirrored = false, flipped = false, className }: CtaBranchDecorProps) => {
  return (
    <div
      aria-hidden="true"
      className={[
        'pointer-events-none flex flex-col items-center gap-8',
        mirrored ? '-scale-x-100' : '',
        flipped ? '-scale-y-100' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Image alt="" className="size-3 shrink-0" height={12} src="/figma/cta-heart.svg" width={12} />
      <div className="flex h-9 w-20 items-center justify-center">
        <Image
          alt=""
          className="h-20 w-9 max-w-none rotate-90"
          height={80}
          src="/figma/cta-branch.svg"
          width={36}
        />
      </div>
      <Image alt="" className="size-3 shrink-0" height={12} src="/figma/cta-heart.svg" width={12} />
    </div>
  )
}
