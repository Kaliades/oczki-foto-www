'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type ImgHTMLAttributes,
  type ReactNode,
} from 'react'

import { cn } from '@/utilities/ui'

type PhotoUnitRevealContextValue = {
  notifyPhotoLoaded: () => void
}

const PhotoUnitRevealContext = createContext<PhotoUnitRevealContextValue | null>(null)

type PhotoUnitRevealProps = {
  children: ReactNode
  /** How many photos must load before the unit fades in (collages: 2+). */
  photoCount?: number
  durationMs?: number
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>

/**
 * Hides a photo+chrome unit until its photograph(s) have loaded, then fades
 * the whole unit in — so mats / frames / scallops never sit empty alone.
 */
export function PhotoUnitReveal({
  children,
  className,
  photoCount = 1,
  durationMs = 280,
  style,
  ...rest
}: PhotoUnitRevealProps) {
  const [loadedCount, setLoadedCount] = useState(0)
  const ready = loadedCount >= photoCount

  const notifyPhotoLoaded = useCallback(() => {
    setLoadedCount((count) => Math.min(photoCount, count + 1))
  }, [photoCount])

  const value = useMemo(() => ({ notifyPhotoLoaded }), [notifyPhotoLoaded])

  return (
    <PhotoUnitRevealContext.Provider value={value}>
      <div
        {...rest}
        className={cn(
          'transition-opacity ease-out',
          ready ? 'opacity-100' : 'opacity-0',
          className,
        )}
        data-photo-unit-ready={ready ? 'true' : 'false'}
        style={{ ...style, transitionDuration: `${durationMs}ms` }}
      >
        {children}
      </div>
    </PhotoUnitRevealContext.Provider>
  )
}

export function usePhotoUnitRevealActive(): boolean {
  return useContext(PhotoUnitRevealContext) != null
}

/** Bind to image `onLoad`. Each hook instance notifies at most once. */
export function usePhotoUnitRevealOnLoad(): {
  onLoad: NonNullable<ImgHTMLAttributes<HTMLImageElement>['onLoad']>
} | Record<string, never> {
  const ctx = useContext(PhotoUnitRevealContext)
  const notified = useRef(false)

  const onLoad = useCallback<
    NonNullable<ImgHTMLAttributes<HTMLImageElement>['onLoad']>
  >(() => {
    if (!ctx || notified.current) return
    notified.current = true
    ctx.notifyPhotoLoaded()
  }, [ctx])

  if (!ctx) return {}
  return { onLoad }
}
