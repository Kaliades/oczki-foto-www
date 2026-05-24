/** Portrait — Figma `6754:4264` / `7105:12939` / `7105:14070`. */
export const AboutPortrait = ({ src, alt }: { src: string; alt: string }) => (
  <div className="relative w-full shrink-0 overflow-hidden aspect-[312/323] md:aspect-[592/612] lg:aspect-[505/522] lg:h-[522px] lg:w-[505px] lg:max-h-[522px] lg:flex-none">
    <div className="relative h-full w-full overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={alt}
        className="absolute max-w-none"
        src={src}
        style={{
          height: '224.81%',
          left: '-28.68%',
          top: '-31.89%',
          width: '157.78%',
        }}
      />
    </div>
  </div>
)
