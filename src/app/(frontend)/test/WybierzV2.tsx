/**
 * WybierzV2 — "Wybierz historię" section (Strona główna, node 6781:17283)
 *
 * V2-IMPROVED: multi-tool single-pass gather.
 * - Exact design tokens from get_variable_defs
 * - Exact text from get_metadata
 * - All images/SVGs from get_design_context asset URLs (downloaded locally)
 * - No invented decorative SVGs; nav arrows are real downloaded assets
 *
 * Design tokens applied:
 *   primary/800  = #4f3a26  (headings / titles)
 *   primary/900  = #392818  (body strong / button text)
 *   primary/700  = #6b5947  (body secondary)
 *   primary/500  = #cba783  (button fill)
 *   primary/100  = #f6f5f2  (card background)
 *   tertiary/700 = #dba0a0  (card border / nav bubble border)
 *   tertiary/300 = #ead3d3  (section background)
 *
 * Typography:
 *   "The Seasons" (heading) — not in project; Tailwind arbitrary font with system fallback
 *   "Instrument Sans" (body) — not in project; Tailwind arbitrary font with system fallback
 */

// Asset paths — all downloaded to /public/seed-images/wybierz/
const BEIGE_TEXTURE = '/seed-images/wybierz/beige-background-texture.jpg'
const IMG_SESJA_KOBIECA = '/seed-images/wybierz/product-sesja-kobieca.jpg'
const IMG_REPORTAZ_SLUBNY = '/seed-images/wybierz/product-reportaz-slubny.jpg'
const IMG_SESJA_WIZERUNKOWA = '/seed-images/wybierz/product-sesja-wizerunkowa.jpg'
const IMG_SESJA_RODZINNA = '/seed-images/wybierz/product-sesja-rodzinna.jpg'
const IMG_SESJA_MILOSNA = '/seed-images/wybierz/product-sesja-milosna.jpg'
const ARROW_LEFT = '/seed-images/wybierz/nav-arrow-left.png'
const ARROW_RIGHT = '/seed-images/wybierz/nav-arrow-right.png'
const BTN_LEFT = '/seed-images/wybierz/button-subtract-left.png'
const BTN_RIGHT = '/seed-images/wybierz/button-subtract-right.png'
const FOOTER_POLYGON = '/seed-images/wybierz/footer-polygon.png'

// Product data from metadata characters fields
const PRODUCTS = [
  {
    img: IMG_SESJA_KOBIECA,
    title: 'Sesja kobieca',
    description:
      'To czas, w którym możesz zwolnić i skupić się na sobie. Prowadzę Cię spokojnie przez cały proces — tak, żebyś mogła poczuć się swobodnie.',
    imgObjectPosition: 'center top',
  },
  {
    img: IMG_REPORTAZ_SLUBNY,
    title: 'Reportaż ślubny',
    description:
      'Jestem obok, ale nie na pierwszym planie. Łapię spojrzenia, gesty i momenty, które często umykają w dniu ślubu.',
    imgObjectPosition: 'center center',
  },
  {
    img: IMG_SESJA_WIZERUNKOWA,
    title: 'Sesja wizerunkowa',
    description:
      'Dla kobiet i marek osobistych, które chcą zdjęć spójnych z tym, kim są. Pomagam stworzyć wizerunek, który jest naturalny, profesjonalny i prawdziwy jednocześnie.',
    imgObjectPosition: 'center top',
  },
  {
    img: IMG_SESJA_RODZINNA,
    title: 'Sesja rodzinna',
    description:
      'Bez ustawiania i sztucznego uśmiechu. Z ruchem, bliskością i przestrzenią na bycie razem. To pamiątka z codzienności, do której chce się wracać.',
    imgObjectPosition: 'center center',
  },
  {
    img: IMG_SESJA_MILOSNA,
    title: 'Sesja miłosna',
    description:
      'Dla kobiet i marek osobistych, które chcą zdjęć spójnych z tym, kim są. Pomagam stworzyć wizerunek, który jest naturalny, profesjonalny i prawdziwy jednocześnie.',
    imgObjectPosition: 'center top',
  },
]

export default function WybierzV2() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ fontFamily: "'Instrument Sans', sans-serif" }}
    >
      {/* ── Main section: Wyróżniki ── */}
      {/* Background: tertiary/300 = #ead3d3 */}
      <section
        className="relative flex flex-col items-center gap-[64px] pb-[32px] pt-[64px] px-[32px]"
        style={{ backgroundColor: '#ead3d3' }}
      >
        {/* Beige texture overlay, mix-blend-color-burn */}
        <div
          className="pointer-events-none absolute inset-0 mix-blend-color-burn"
          style={{ width: '1366px', height: '1029px', left: '50%', transform: 'translateX(-50%)' }}
        >
          <img
            alt=""
            src={BEIGE_TEXTURE}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* ── Content Container ── */}
        <div className="relative flex flex-col gap-[36px] items-start justify-center w-full">

          {/* ── Header ── */}
          <div className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-col gap-[16px] items-start w-[560px]">
              {/* Title: "Wybierz historię, którą chcesz teraz opowiedzieć" */}
              {/* font: The Seasons, 36px, weight 400, lineHeight 1.04, letterSpacing -2 (=-0.72px at 36px) */}
              {/* color: primary/800 = #4f3a26 */}
              <p
                className="text-center w-full"
                style={{
                  fontFamily: "'The Seasons', serif",
                  fontSize: '36px',
                  fontWeight: 400,
                  lineHeight: 1.04,
                  letterSpacing: '-0.72px',
                  color: '#4f3a26',
                }}
              >
                {'Wybierz '}
                <em
                  style={{
                    fontStyle: 'italic',
                    letterSpacing: '-0.36px',
                  }}
                >
                  historię
                </em>
                {', którą chcesz teraz opowiedzieć'}
              </p>

              {/* Subtitle container */}
              <div className="flex flex-col items-center justify-center w-full">
                {/* Body/L: Instrument Sans 16px, lineHeight 1.48, letterSpacing -1.5 (=-0.24px at 16px) */}
                {/* color: primary/900 = #392818 */}
                <p
                  className="text-center"
                  style={{
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: 1.48,
                    letterSpacing: '-0.24px',
                    color: '#392818',
                    width: '535px',
                  }}
                >
                  Każda forma współpracy ma inny rytm, ale wszystkie łączy jedno: spokój, uważność i
                  zdjęcia, które powstają wtedy, gdy można być sobą.
                </p>
              </div>
            </div>
          </div>

          {/* ── Product List — horizontal scroll wrapper ── */}
          {/* In Figma the list is 1616px wide inside 1302px content, causing natural overflow */}
          <div className="relative w-full overflow-hidden">
            <div className="flex gap-[16px] items-start" style={{ width: '1616px' }}>
              {PRODUCTS.map((product, i) => (
                <ProductCard key={i} product={product} />
              ))}

              {/* Navigation bubble — positioned over the second card gap area */}
              {/* Figma: left=567px, top=29px, size=64px, bg=rgba(219,160,160,0.48) */}
              <div
                className="absolute flex items-center justify-center gap-[8px] rounded-full"
                style={{
                  left: '567px',
                  top: '29px',
                  width: '64px',
                  height: '64px',
                  backgroundColor: 'rgba(219, 160, 160, 0.48)',
                }}
              >
                {/* Arrow left — scaleY(-1) = flipped vertically */}
                <img
                  alt="poprzedni"
                  src={ARROW_LEFT}
                  className="w-[16px] h-[16px]"
                  style={{ transform: 'scaleY(-1)' }}
                />
                {/* Arrow right — rotated 180deg */}
                <img
                  alt="następny"
                  src={ARROW_RIGHT}
                  className="w-[16px] h-[16px]"
                  style={{ transform: 'rotate(180deg)' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Inquiry Container ── */}
        <div className="flex flex-col gap-[32px] items-center justify-center relative w-full">
          {/* Inquiry Text Container */}
          <div
            className="flex flex-col gap-[8px] items-start text-center"
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontWeight: 400,
              lineHeight: 1.48,
            }}
          >
            {/* Body/XL: 20px, primary/900 = #392818, letterSpacing -0.3px */}
            <p
              style={{
                fontSize: '20px',
                letterSpacing: '-0.3px',
                color: '#392818',
                width: '535px',
              }}
            >
              Twojej historii nie ma w mojej ofercie?
            </p>
            {/* Body/L: 16px, primary/800 = #4f3a26, letterSpacing -0.24px */}
            <p
              style={{
                fontSize: '16px',
                letterSpacing: '-0.24px',
                color: '#4f3a26',
                width: '535px',
              }}
            >
              Czasem najlepsze zdjęcia powstają poza gotowymi schematami. Jeśli masz pomysł na
              sesję, który nie mieści się w żadnej kategorii — albo po prostu czujesz, że chcesz
              czegoś innego — napisz do mnie.
            </p>
          </div>

          {/* Button "Pogadajmy" — pill shape via subtract SVG caps + center fill */}
          {/* primary/500 = #cba783, primary/900 text = #392818 */}
          <div className="flex items-center">
            {/* Left cap */}
            <img alt="" src={BTN_LEFT} className="h-[44px] w-[18px]" />
            {/* Center fill */}
            <div
              className="flex h-[44px] items-center justify-center px-[4px]"
              style={{ backgroundColor: '#cba783' }}
            >
              <span
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: 1.48,
                  letterSpacing: '-0.14px',
                  color: '#392818',
                  whiteSpace: 'nowrap',
                }}
              >
                Pogadajmy
              </span>
            </div>
            {/* Right cap */}
            <img alt="" src={BTN_RIGHT} className="h-[44px] w-[18px]" />
          </div>
        </div>
      </section>

      {/* ── Footer Container: wave polygon + texture ── */}
      <div className="relative w-full" style={{ height: '85px' }}>
        {/* Polygon wave shape */}
        <img
          alt=""
          src={FOOTER_POLYGON}
          className="absolute inset-0 w-full h-full"
          style={{ display: 'block' }}
        />
        {/* Beige texture on footer — mix-blend-color-burn */}
        <div
          className="pointer-events-none absolute inset-0 mix-blend-color-burn"
          style={{ width: '1366px', left: '50%', transform: 'translateX(-50%)' }}
        >
          <img
            alt=""
            src={BEIGE_TEXTURE}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

// ── Product Card sub-component ────────────────────────────────────────────────

interface Product {
  img: string
  title: string
  description: string
  imgObjectPosition: string
}

function ProductCard({ product }: { product: Product }) {
  return (
    // Outer border container — arch top shape
    // border: 1px solid tertiary/700 = #dba0a0, padding 6px, rounded top arches
    <div
      className="flex items-center p-[6px] shrink-0"
      style={{
        width: '310px',
        border: '1px solid #dba0a0',
        borderRadius: '999px 999px 0 0',
      }}
    >
      {/* Inner content — primary/100 bg = #f6f5f2 */}
      <div
        className="flex flex-col items-start justify-center w-full"
        style={{
          backgroundColor: '#f6f5f2',
          border: '1px solid #dba0a0',
          borderRadius: '999px 999px 0 0',
        }}
      >
        {/* Product Image — 298px square, arch top */}
        <div
          className="relative overflow-hidden shrink-0 w-full"
          style={{
            height: '298px',
            borderRadius: '999px 999px 0 0',
          }}
        >
          <img
            alt={product.title}
            src={product.img}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: product.imgObjectPosition }}
          />
        </div>

        {/* Product Text Container */}
        {/* font: Instrument Sans Regular, gap 8px, padding: 16px top, 20px sides, 20px bottom */}
        <div
          className="flex flex-col gap-[8px] items-start w-full"
          style={{
            padding: '16px 20px 20px',
            fontFamily: "'Instrument Sans', sans-serif",
            fontWeight: 400,
            lineHeight: 1.48,
          }}
        >
          {/* Product Title: Body/XL = 20px, primary/800 = #4f3a26, letterSpacing -0.3px */}
          <p
            style={{
              fontSize: '20px',
              letterSpacing: '-0.3px',
              color: '#4f3a26',
            }}
          >
            {product.title}
          </p>
          {/* Description: Body/M = 14px, primary/700 = #6b5947, letterSpacing -0.14px */}
          <p
            style={{
              fontSize: '14px',
              letterSpacing: '-0.14px',
              color: '#6b5947',
            }}
          >
            {product.description}
          </p>
        </div>
      </div>
    </div>
  )
}
