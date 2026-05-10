// GaleriaBreadcrumbs — breadcrumb trail rendered directly under the Navbar on /galeria.
// Figma node 6912:16286 (Container 1366x52). Single instance of Breadcrumbs (7105:15387):
// "Strona główna" (link, primary/700 medium) > chevron (12px) > "Galeria" (current, primary/600 regular).
// Desktop @1366 visual parity with Figma. Mobile is intentionally out of scope.

import Link from 'next/link'

function ChevronRight() {
  return (
    <svg
      aria-hidden="true"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="block shrink-0"
    >
      <path
        d="M4.5 3l3 3-3 3"
        stroke="#8e7a65"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function GaleriaBreadcrumbs() {
  return (
    <nav aria-label="breadcrumb" className="w-full">
      <div className="bg-[#f6f5f2] flex flex-col items-start justify-center px-[32px] py-[4px]">
        <ol className="flex h-[44px] items-center gap-[4px] text-[12px] leading-[1.48] tracking-[-0.12px]">
          <li className="flex h-[44px] items-center">
            <Link
              href="/"
              className="font-['Instrument_Sans',sans-serif] font-medium text-[#6b5947] hover:underline"
            >
              Strona główna
            </Link>
          </li>
          <li className="flex items-center" aria-hidden="true">
            <ChevronRight />
          </li>
          <li className="flex h-[44px] items-center">
            <span
              aria-current="page"
              className="font-['Instrument_Sans',sans-serif] font-normal text-[#8e7a65]"
            >
              Galeria
            </span>
          </li>
        </ol>
      </div>
    </nav>
  )
}
