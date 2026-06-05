import { PackageFeatureRow } from '@/components/PackageFeatureRow'

type PackageFeatureListProps = {
  features: readonly string[]
}

/**
 * Vertical feature list — Figma `Column text container`.
 * Gap 10 px mobile, 12 px tablet+.
 */
export function PackageFeatureList({ features }: PackageFeatureListProps) {
  return (
    <div
      className="flex w-full flex-col gap-2.5 md:gap-3"
      data-name="Column text container"
    >
      {features.map((feature) => (
        <PackageFeatureRow key={feature.slice(0, 32)} text={feature} />
      ))}
    </div>
  )
}
