import { TickIcon } from '@/components/TickIcon'

type PackageFeatureRowProps = {
  text: string
}

/**
 * Single ticked benefit line — Figma `Detail row`.
 * Icon/text gap 6 px; icon container top offset 2 px.
 */
export function PackageFeatureRow({ text }: PackageFeatureRowProps) {
  return (
    <div className="flex w-full items-start gap-1.5" data-name="Detail row">
      <TickIcon />
      <p className="oczki-body-l min-w-0 flex-1 tracking-[-0.24px] text-[var(--oczki-primary-700)]">
        {text}
      </p>
    </div>
  )
}
