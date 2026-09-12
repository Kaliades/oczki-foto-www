import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

/**
 * Clears the Payload session cookie and sends the user to `/panel`.
 * Needed because `/admin/logout` is blank on Next.js 16 when unauthenticated
 * (https://github.com/payloadcms/payload/issues/17545).
 */
export async function GET(request: Request) {
  const cookieStore = await cookies()
  cookieStore.delete('payload-token')

  const url = new URL('/panel', request.url)
  const response = NextResponse.redirect(url)
  response.cookies.set('payload-token', '', {
    path: '/',
    maxAge: 0,
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
  })
  return response
}
