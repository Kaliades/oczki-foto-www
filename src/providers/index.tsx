import React from 'react'

import { MotionProvider } from './MotionProvider'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return <MotionProvider>{children}</MotionProvider>
}
