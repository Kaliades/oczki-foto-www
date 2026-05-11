import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    <span className={clsx('flex h-[22px] w-[91px] items-center gap-[3px]', className)}>
      <Image
        alt=""
        className="h-[22px] w-[15px]"
        height={22}
        loading={loading}
        src="/figma/oczki-sygnet.svg"
        width={15}
      />
      <Image
        alt="Oczki fotografia"
        className="h-[21px] w-[72px]"
        fetchPriority={priority}
        height={21}
        loading={loading}
        src="/figma/oczki-logotyp.svg"
        width={72}
      />
    </span>
  )
}
