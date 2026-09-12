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

  // Payload admin login is blank on Next.js 16 when logged out
  // (https://github.com/payloadcms/payload/issues/17545). Use our frontend form instead.
  const adminLoginBypass = {
    source: '/admin/login',
    destination: '/panel',
    permanent: false,
  }

  // Same bug hits `/admin/logout` — clear the session via our route, then show `/panel`.
  const adminLogoutBypass = {
    source: '/admin/logout',
    destination: '/panel/logout',
    permanent: false,
  }

  // Any other /admin URL without a session cookie → working login (avoids blank shell).
  const adminUnauthenticatedBypass = {
    source: '/admin/:path*',
    missing: [
      {
        type: 'cookie' as const,
        key: 'payload-token',
      },
    ],
    destination: '/panel',
    permanent: false,
  }

  return [
    adminLogoutBypass,
    adminLoginBypass,
    adminUnauthenticatedBypass,
    homeSlugRedirect,
    internetExplorerRedirect,
  ]
}
