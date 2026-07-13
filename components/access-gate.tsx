'use client'

import { useState } from 'react'
import { BackgroundScene } from '~/components/ui/background-scene'

type AccessGateProps = {
  onAccess: (mode: 'invitation' | 'admin') => void
}

export function AccessGate({ onAccess }: AccessGateProps) {
  const [accessCode, setAccessCode] = useState('')
  const [error, setError] = useState(false)
  const [shaking, setShaking] = useState(false)

  const handleAccess = (e: React.FormEvent) => {
    e.preventDefault()
    if (accessCode === '1') {
      onAccess('invitation')
    } else if (accessCode === '2') {
      onAccess('admin')
    } else {
      setError(true)
      setShaking(true)
      setAccessCode('')
      setTimeout(() => setShaking(false), 500)
    }
  }

  return (
    <BackgroundScene>
      <div
        className={`inv-card${shaking ? ' inv-shake' : ''}`}
        style={{ minHeight: 'auto', maxHeight: 'none' }}
      >
        <div className="inv-card__body" style={{ textAlign: 'center', gap: '1.5rem' }}>
          <div>
            <p className="inv-body" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem', opacity: 0.6 }}>
              Graduation 2026
            </p>
            <h1 className="inv-title inv-title--gradient" style={{ fontSize: 'clamp(1.75rem, 6vw, 2.5rem)' }}>
              Welcome
            </h1>
            <p className="inv-body" style={{ marginTop: '0.75rem', fontSize: 'clamp(0.8125rem, 2.5vw, 0.9375rem)' }}>
              Enter your access code to continue
            </p>
          </div>

          <form onSubmit={handleAccess} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
            <div>
              <input
                type="password"
                value={accessCode}
                onChange={(e) => {
                  setAccessCode(e.target.value)
                  setError(false)
                }}
                placeholder="••••"
                className="inv-input"
                autoFocus
                autoComplete="off"
                aria-label="Access code"
                aria-invalid={error}
              />
              {error && (
                <p className="inv-body" style={{ color: 'oklch(0.7 0.18 25)', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                  Invalid code. Please try again.
                </p>
              )}
            </div>
            <button type="submit" className="inv-btn inv-btn--primary">
              Enter
            </button>
          </form>
        </div>
      </div>
    </BackgroundScene>
  )
}
