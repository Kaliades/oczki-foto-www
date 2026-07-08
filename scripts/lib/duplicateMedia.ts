import type { Payload } from 'payload'

import type { Media } from '@/payload-types'

import { readMediaFileBytes } from './readMediaFile'

/**
 * Creates a new `media` document from an existing one's bytes.
 * Works with local `public/media` and remote Vercel Blob URLs.
 * Copies alt + focal point; does not delete or modify the source record.
 */
export async function duplicateMedia(
  payload: Payload,
  mediaId: number,
  options?: { nameSuffix?: string },
): Promise<number> {
  const source = (await payload.findByID({
    collection: 'media',
    id: mediaId,
    depth: 0,
    overrideAccess: true,
  })) as Media

  const { buffer, mimetype, filename } = await readMediaFileBytes(source)

  const ext = pathExtname(filename)
  const base = basename(filename, ext)
  const suffix = sanitizeSuffix(options?.nameSuffix ?? String(Date.now()))
  const uniqueName = `${base}-split-${suffix}${ext}`

  const doc = await payload.create({
    collection: 'media',
    data: {
      alt: source.alt,
      focalX: source.focalX,
      focalY: source.focalY,
    },
    file: {
      name: uniqueName,
      data: buffer,
      mimetype,
      size: buffer.byteLength,
    },
    context: { disableRevalidate: true },
  })

  return doc.id as number
}

function pathExtname(filename: string): string {
  const dot = filename.lastIndexOf('.')
  return dot >= 0 ? filename.slice(dot) : ''
}

function basename(filename: string, ext: string): string {
  return ext ? filename.slice(0, -ext.length) : filename
}

function sanitizeSuffix(value: string): string {
  return value.replace(/[^\w.-]+/g, '-').slice(0, 120)
}
