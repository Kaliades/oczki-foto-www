import type { NextConfig } from 'next'

export const redirects: NextConfig['redirects'] = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header' as const,
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  // CMS slug is `home`, but the public URL is always `/` — never expose `/home`.
  const homeSlugRedirect = {
    source: '/home',
    destination: '/',
    permanent: true,
  }

  return [homeSlugRedirect, internetExplorerRedirect]
}
