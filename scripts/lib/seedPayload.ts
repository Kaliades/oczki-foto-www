import config from '@payload-config'
import { getPayload, type Payload } from 'payload'

let payloadPromise: Promise<Payload> | null = null

/** Single Payload instance for the whole seed run — avoids 11× schema pull. */
export function getSeedPayload(): Promise<Payload> {
  if (!payloadPromise) {
    payloadPromise = getPayload({ config })
  }
  return payloadPromise
}
