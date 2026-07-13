import type { PropsWithChildren } from 'react'

export function BackgroundScene({ children }: PropsWithChildren) {
  return (
    <div className="inv-scene">
      <div className="inv-orb inv-orb--1" aria-hidden="true" />
      <div className="inv-orb inv-orb--2" aria-hidden="true" />
      {children}
    </div>
  )
}
