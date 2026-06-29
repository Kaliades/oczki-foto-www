import { HeaderClient } from './Component.client'
import { getGlobalForRequest } from '@/utilities/getGlobals'
import { getOfferNavItems } from '@/utilities/getOfferNavItems'
import React from 'react'

export async function Header() {
  const [headerData, offerNavItems] = await Promise.all([
    getGlobalForRequest('header', 1),
    getOfferNavItems(),
  ])

  return <HeaderClient data={headerData} offerNavItems={offerNavItems} />
}
