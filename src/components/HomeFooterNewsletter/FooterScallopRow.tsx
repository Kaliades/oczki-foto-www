/**
 * Overlapping cream circles that form the scalloped transition between
 * the newsletter block and the footer (Figma `7091:3634`).
 *
 * Fourteen 112 px circles with −12 px overlap, centred inside the 1366
 * cap. The row sits with `mb-[-72px]` so it overlaps the footer body.
 */
export function FooterScallopRow() {
  return (
    <div
      aria-hidden="true"
      className="relative z-[2] mb-[-72px] flex w-full items-center justify-center overflow-hidden"
      data-figma-node="7091:3634"
    >
      <div className="flex items-center justify-center">
        {Array.from({ length: 14 }, (_, index) => (
          <span
            className="relative size-28 shrink-0 rounded-full bg-[var(--oczki-primary-300)] last:mr-0 [&:not(:last-child)]:-mr-3"
            key={index}
          />
        ))}
      </div>
    </div>
  )
}
