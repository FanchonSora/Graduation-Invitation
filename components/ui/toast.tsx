'use client'

import { useEffect } from 'react'
import cn from 'clsx'

type ToastProps = {
  message: string
  visible: boolean
  variant?: 'success' | 'error'
  onHide: () => void
  duration?: number
}

export function Toast({
  message,
  visible,
  variant = 'success',
  onHide,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(onHide, duration)
    return () => clearTimeout(timer)
  }, [visible, duration, onHide])

  if (!message) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'inv-toast',
        visible && 'inv-toast--visible',
        variant === 'error' && 'inv-toast--error',
      )}
    >
      {message}
    </div>
  )
}
