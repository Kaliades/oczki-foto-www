'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'

import type { OfferItem } from '@/payload-types'
import { getClientSideURL } from '@/utilities/getURL'

import { OFFER_QUERY_DEPTH } from './queryOfferBySlug'
import { mapOfferItem } from './mapOfferItem'
import { OfferServicePageContent } from './OfferServicePageContent'

type OfferServicePagePreviewProps = {
  initialDoc: OfferItem
}

/**
 * CMS live preview — merges in-panel form state (incl. upload relations)
 * via Payload's population API before the document is explicitly saved.
 */
export function OfferServicePagePreview({ initialDoc }: OfferServicePagePreviewProps) {
  const { data } = useLivePreview<OfferItem>({
    initialData: initialDoc,
    serverURL: getClientSideURL(),
    depth: OFFER_QUERY_DEPTH,
  })

  return <OfferServicePageContent data={mapOfferItem(data)} />
}
