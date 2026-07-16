'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { BackgroundScene } from '~/components/ui/background-scene'
import { ProgressSteps } from '~/components/ui/progress-steps'
import { Toast } from '~/components/ui/toast'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP)
}

const STEPS = ['Welcome', 'Details', 'RSVP', 'Thank You'] as const
const TOTAL_STEPS = STEPS.length

const EVENT_DETAILS = [
  { icon: '📅', label: 'Thứ sáu, 24/07/2026' },
  { icon: '⏰', label: '16:00 - 18:00' },
  {
    icon: '📍',
    label: 'Trường Đại học Sư Phạm TP HCM',
    sub: '280 An Dương Vương, Phường 4, Quận 5, TP HCM',
  },
  {
    icon: '📞',
    label: (
      <>
        Zalo:{' '}
        <a href="tel:0865251622" className="inv-link">
          0865251622
        </a>
      </>
    ),
  },
  {
    icon: '🔗',
    label: (
      <>
        Facebook:{' '}
        <a href="https://www.facebook.com/binh.laithuy.5" className="inv-link">
          Lại Thuý Bình
        </a>
      </>
    ),
  },
] as const

export function InvitationFlow() {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [note, setNote] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState({ message: '', visible: false, variant: 'success' as 'success' | 'error' })
  const containerRef = useRef<HTMLDivElement>(null)

  const showToast = useCallback((message: string, variant: 'success' | 'error' = 'success') => {
    setToast({ message, visible: true, variant })
  }, [])

  const hideToast = useCallback(() => {
    setToast((t) => ({ ...t, visible: false }))
  }, [])

  const animateStep = (direction: 'next' | 'prev', callback: () => void) => {
    const yOut = direction === 'next' ? -20 : 20
    const yIn = direction === 'next' ? 20 : -20

    gsap.to(containerRef.current, {
      opacity: 0,
      y: yOut,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        callback()
        gsap.fromTo(
          containerRef.current,
          { opacity: 0, y: yIn },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        )
      },
    })
  }

  const nextStep = () => {
    if (step < TOTAL_STEPS - 1) {
      animateStep('next', () => setStep((s) => s + 1))
    }
  }

  const prevStep = () => {
    if (step > 0) {
      animateStep('prev', () => setStep((s) => s - 1))
    }
  }

  const resetFlow = () => {
    setName('')
    setStatus('')
    setNote('')
    animateStep('prev', () => setStep(0))
  }

  const handleSubmit = async () => {
    if (!name.trim()) {
      showToast('Please enter your name first!', 'error')
      animateStep('prev', () => setStep(2))
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/rsvps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, status, note }),
      })
      if (res.ok) {
        showToast('Note sent successfully! 💌')
        setTimeout(() => animateStep('next', () => setStep(4)), 1500)
      } else {
        showToast('Failed to send. Please try again.', 'error')
      }
    } catch {
      showToast('Connection error. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <BackgroundScene>
      <div className="inv-card" ref={containerRef}>
        {step < 4 && (
          <div className="inv-card__header">
            <ProgressSteps total={TOTAL_STEPS} current={step} />
            <p
              className="inv-body"
              style={{
                textAlign: 'center',
                fontSize: '0.6875rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginTop: '0.75rem',
                opacity: 0.5,
              }}
            >
              {STEPS[step]}
            </p>
          </div>
        )}

        {/* Step 0: Welcome */}
        {step === 0 && (
          <>
            <div className="inv-card__body" style={{ gap: '1.25rem' }}>
              <div style={{ textAlign: 'center' }}>
                <h1 className="inv-title inv-title--gradient" style={{ fontSize: 'clamp(2rem, 5vw, 2rem)', marginBottom: '0.75rem' }}>
                  Helloooooooo !!! 
                </h1> 
              </div>
              <div style={{ textAlign: 'center' }}>
                <p className="inv-body" style={{ fontSize: 'clamp(3rem, 10vw, 2rem)' }}>
                  Hớ hớ sau bao ngày tháng quằn quại thì em Bình cũng đã tốt nghiệp roài nè ạaa 🎓💖
                </p>
              </div>
            </div>
            <div className="inv-card__footer">
              <button type="button" onClick={nextStep} className="inv-btn inv-btn--primary">
                Continue <span aria-hidden="true">→</span>
              </button>
            </div>
          </>
        )}

        {/* Step 1: Details */}
        {step === 1 && (
          <>
            <div className="inv-card__body" style={{ gap: '1rem' }}>
              <h2 className="inv-title inv-title--gradient" style={{ fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', textAlign: 'center' }}>
                Details of my Special Day, with you 💜
              </h2>

              <div style={{ borderRadius: 'var(--inv-radius-sm)', overflow: 'hidden', border: '1px solid var(--inv-glass-border)' }}>
                <Image
                  src="/SE170317-1.png"
                  alt="Graduation ceremony"
                  width={800}
                  height={400}
                  style={{ width: '100%', height: 'clamp(8rem, 25vw, 14rem)', objectFit: 'cover', display: 'block' }}
                />
              </div>

              <div
                style={{
                  background: 'oklch(1 0 0 / 0.04)',
                  borderRadius: 'var(--inv-radius-sm)',
                  border: '1px solid var(--inv-glass-border)',
                  padding: '0.5rem 1rem',
                }}
              >
                {EVENT_DETAILS.map((item) => (
                  <div key={item.icon} className="inv-detail-row">
                    <span className="inv-detail-icon" aria-hidden="true">{item.icon}</span>
                    <div className="inv-body" style={{ fontSize: '0.875rem', paddingTop: '0.25rem' }}>
                      <div>{item.label}</div>
                      {'sub' in item && item.sub && (
                        <div style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '0.25rem' }}>{item.sub}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="inv-card__footer" style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              <button type="button" onClick={prevStep} className="inv-btn inv-btn--secondary">
                <span aria-hidden="true">←</span> Back
              </button>
              <button type="button" onClick={nextStep} className="inv-btn inv-btn--primary">
                Continue <span aria-hidden="true">→</span>
              </button>
            </div>
          </>
        )}

        {/* Step 2: RSVP */}
        {step === 2 && (
          <>
            <div className="inv-card__body" style={{ gap: '1.5rem', justifyContent: 'center' }}>
              <h2 className="inv-title inv-title--gradient" style={{ fontSize: 'clamp(1.25rem, 4.5vw, 1.875rem)', textAlign: 'center' }}>
                Bạn có thể tới chung vui với tui được hemm 
              </h2>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 'clamp(2.5rem, 3vw, 1.25rem)' }}>
                  🥺💝
                </p>
              </div>  
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name..."
                className="inv-input"
                aria-label="Your name"
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => { setStatus('YES'); nextStep() }}
                  className="inv-btn inv-btn--accent"
                  style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)', minHeight: '3.5rem' }}
                >
                  YASS TẤT NHIÊN ROÀI !!
                </button>
                <button
                  type="button"
                  onClick={() => { setStatus('NO'); nextStep() }}
                  className="inv-btn inv-btn--secondary"
                  style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)', minHeight: '3.5rem' }}
                >
                  Ố NÔ TUI BẬN MẤT ROÀI
                </button>
              </div>
            </div>
            <div className="inv-card__footer">
              <button type="button" onClick={prevStep} className="inv-btn inv-btn--secondary">
                <span aria-hidden="true">←</span> Back
              </button>
            </div>
          </>
        )}

        {/* Step 3: Thank You */}
        {step === 3 && (
          <>
            <div className="inv-card__body" style={{ gap: '1.25rem' }}>
              <div style={{ textAlign: 'center' }}>
                <h2 className="inv-title inv-title--gradient" style={{ fontSize: 'clamp(1.125rem, 4vw, 1.5rem)' }}>
                  1 vài đìu dễ thươn muốn nói với Bỉnhhh
                </h2>
              </div>

              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="inv-input"
                placeholder="Write your note here..."
                rows={4}
                style={{ textAlign: 'left', resize: 'none', minHeight: '6rem' }}
                aria-label="Your note"
              />

              <div
                style={{
                  background: 'oklch(1 0 0 / 0.04)',
                  borderRadius: 'var(--inv-radius-sm)',
                  border: '1px solid var(--inv-glass-border)',
                  padding: '1rem',
                  fontSize: '0.8125rem',
                }}
              >
                <p className="inv-body" style={{ marginBottom: '0.5rem', fontSize: '0.8125rem' }}>
                  When you arrive, please contact me via:
                </p>
                <p className="inv-body" style={{ fontSize: '0.8125rem' }}>
                  📞 Zalo:{' '}
                  <a href="tel:0865251622" className="inv-link">0865251622</a>
                </p>
                <p className="inv-body" style={{ fontSize: '0.8125rem' }}>
                  🔗 Facebook:{' '}
                  <a href="https://www.facebook.com/binh.laithuy.5" className="inv-link">Lại Thuý Bình</a>
                </p>
              </div>
            </div>
            <div className="inv-card__footer" style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              <button 
                type="button" 
                onClick={() => animateStep('next', () => setStep(4))} 
                className="inv-btn inv-btn--secondary"
              >
                Khôm muốn nói mún nhận thiệp cơ
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inv-btn inv-btn--primary"
              >
                {isSubmitting ? 'Sending...' : 'Send 💌'}
              </button>
            </div>
          </>
        )}

        {/* Step 4: Final Poster */}
        {step === 4 && (
          <div className="inv-card__body" style={{ padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '600px' }}>
              <Image
                src="/huh.jpg"
                alt="Final Poster"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        )}
      </div>

      <Toast
        message={toast.message}
        visible={toast.visible}
        variant={toast.variant}
        onHide={hideToast}
      />
    </BackgroundScene>
  )
}
