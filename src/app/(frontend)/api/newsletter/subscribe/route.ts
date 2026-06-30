import configPromise from '@payload-config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

import {
  NEWSLETTER_SIGNUP_SOURCES,
  type NewsletterSignupSource,
} from '@/newsletter/types'

type NewsletterSubscribeBody = {
  name?: string
  email?: string
  consentGiven?: boolean
  source?: NewsletterSignupSource
}

const VALID_SOURCES = new Set<string>(NEWSLETTER_SIGNUP_SOURCES)

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

export async function POST(request: Request) {
  let body: NewsletterSubscribeBody

  try {
    body = (await request.json()) as NewsletterSubscribeBody
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const name = body.name?.trim()
  const email = body.email ? normalizeEmail(body.email) : ''
  const source = body.source

  if (!name || !email || !source || !VALID_SOURCES.has(source)) {
    return NextResponse.json({ error: 'Missing or invalid newsletter fields' }, { status: 400 })
  }

  if (!body.consentGiven) {
    return NextResponse.json({ error: 'Consent is required' }, { status: 400 })
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  try {
    const payload = await getPayload({ config: configPromise })

    const existing = await payload.find({
      collection: 'newsletterSubscriptions',
      where: { email: { equals: email } },
      limit: 1,
      overrideAccess: true,
    })

    if (existing.docs.length > 0) {
      return new NextResponse(null, { status: 204 })
    }

    await payload.create({
      collection: 'newsletterSubscriptions',
      data: {
        name,
        email,
        source,
        consentGiven: true,
      },
      overrideAccess: true,
    })
  } catch (error) {
    console.error('[newsletter/subscribe] Failed to persist subscription', error)
    return NextResponse.json({ error: 'Failed to store newsletter signup' }, { status: 500 })
  }

  return new NextResponse(null, { status: 204 })
}
