import configPromise from '@payload-config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

import type { ConsentChoiceSource } from '@/consent/types'

type ConsentLogBody = {
  consentId?: string
  policyVersion?: number
  choices?: {
    analytics?: boolean
    marketing?: boolean
  }
  timestamp?: string
  source?: ConsentChoiceSource
  bannerEnabled?: boolean
  analyticsCategoryEnabled?: boolean
  marketingCategoryEnabled?: boolean
}

const VALID_SOURCES = new Set<ConsentChoiceSource>([
  'banner-accept-all',
  'banner-reject-all',
  'banner-preferences',
  'gpc',
])

export async function POST(request: Request) {
  let body: ConsentLogBody

  try {
    body = (await request.json()) as ConsentLogBody
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (
    !body.consentId ||
    typeof body.policyVersion !== 'number' ||
    !body.timestamp ||
    !body.source ||
    !VALID_SOURCES.has(body.source)
  ) {
    return NextResponse.json({ error: 'Missing or invalid consent fields' }, { status: 400 })
  }

  const recordedAt = new Date(body.timestamp)
  if (Number.isNaN(recordedAt.getTime())) {
    return NextResponse.json({ error: 'Invalid timestamp' }, { status: 400 })
  }

  try {
    const payload = await getPayload({ config: configPromise })

    await payload.create({
      collection: 'consentLogs',
      data: {
        consentId: body.consentId,
        policyVersion: body.policyVersion,
        recordedAt: recordedAt.toISOString(),
        source: body.source,
        choices: {
          analytics: body.choices?.analytics ?? false,
          marketing: body.choices?.marketing ?? false,
        },
        context: {
          bannerEnabled: body.bannerEnabled ?? false,
          analyticsCategoryEnabled: body.analyticsCategoryEnabled ?? false,
          marketingCategoryEnabled: body.marketingCategoryEnabled ?? false,
        },
      },
      overrideAccess: true,
    })
  } catch (error) {
    console.error('[consent-log] Failed to persist consent record', error)
    return NextResponse.json({ error: 'Failed to store consent log' }, { status: 500 })
  }

  return new NextResponse(null, { status: 204 })
}
