'use client'

import React, { useState, useRef } from 'react'
import cn from 'clsx'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP)
}

export function InvitationFlow() {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [note, setNote] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const nextStep = () => {
    if (step < 3) {
      gsap.to(containerRef.current, {
        opacity: 0,
        y: -15,
        scale: 0.98,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          setStep(s => s + 1)
          gsap.fromTo(containerRef.current, 
            { opacity: 0, y: 15, scale: 0.98 }, 
            { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" }
          )
        }
      })
    }
  }

  const prevStep = () => {
    if (step > 0) {
      gsap.to(containerRef.current, {
        opacity: 0,
        y: 15,
        scale: 0.98,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          setStep(s => s - 1)
          gsap.fromTo(containerRef.current, 
            { opacity: 0, y: -15, scale: 0.98 }, 
            { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" }
          )
        }
      })
    }
  }

  return (
    <div className="min-h-[100dvh] w-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-indigo-900 via-purple-950 to-black flex items-center justify-center p-4 sm:p-8 overflow-hidden font-sans relative">
      
      {/* Decorative Background Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-fuchsia-600 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div 
        ref={containerRef}
        className="w-full max-w-[420px] bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden text-white relative z-10"
        style={{ minHeight: '650px' }}
      >
        {/* Step 0: Welcome Slide */}
        {step === 0 && (
          <div className="p-6 flex flex-col h-full justify-between" style={{ minHeight: '650px' }}>
            <div className="w-full relative rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-indigo-950/50">
              <img 
                src="/SE170317-2.png" 
                alt="Graduation Card" 
                className="w-full h-auto object-cover opacity-90 mix-blend-luminosity"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-4 bg-gradient-to-t from-indigo-950 via-indigo-950/40 to-transparent text-purple-200">
                 <h2 className="text-2xl font-bold uppercase tracking-wider mb-1 drop-shadow-md">Graduation</h2>
                 <p className="text-lg font-semibold tracking-widest text-fuchsia-300">2026</p>
              </div>
            </div>

            <div className="mt-8 text-center space-y-4">
              <h1 className="text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-fuchsia-200 drop-shadow-sm">Hellooooo 😚💖</h1>
              <p className="text-purple-100 font-medium leading-relaxed px-2 text-lg">
                After a long journey of hard work and growth, I'm so happy to share that I've officially GRADUATED 🎓✨
              </p>
            </div>

            <div className="mt-auto pt-6">
              <button 
                onClick={nextStep}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-purple-500 hover:to-fuchsia-400 transition-all text-white font-bold text-lg flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.7)] hover:scale-[1.02]"
              >
                Next <span>→</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 1: Details Slide */}
        {step === 1 && (
          <div className="p-6 flex flex-col h-full justify-between" style={{ minHeight: '650px' }}>
            <div className="text-center mb-6 mt-4">
              <h2 className="text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-fuchsia-200">
                Details of my Special Day, with you 💜
              </h2>
            </div>

            <div className="w-full rounded-xl overflow-hidden shadow-2xl mb-6 border border-white/10">
              <img 
                src="/SE170317-1.png" 
                alt="Graduation Left" 
                className="w-full h-56 object-cover mix-blend-luminosity opacity-90"
              />
            </div>

            <div className="bg-white/5 rounded-xl p-5 shadow-inner border border-white/10 space-y-4 text-base font-medium text-purple-100 backdrop-blur-md">
              <p className="flex items-center gap-3">
                <span className="text-xl">📅</span> Saturday, 04 April, 2026
              </p>
              <p className="flex items-center gap-3">
                <span className="text-xl">⏰</span> 10:30 - 12:00
              </p>
              <p className="flex items-start gap-3">
                <span className="text-xl">📍</span> 
                <span>
                  UEH University - Campus A<br/>
                  <span className="text-sm text-purple-300/80 font-normal">(59C Nguyen Dinh Chieu Street, Ward Xuan Hoa, HCMC)</span>
                </span>
              </p>
              <p className="flex items-center gap-3">
                <span className="text-xl">📞</span> Zalo: <a href="tel:0833518316" className="text-fuchsia-300 hover:text-fuchsia-200 underline transition-colors">0833 518 316</a>
              </p>
              <p className="flex items-center gap-3">
                <span className="text-xl">🔗</span> Facebook: <a href="#" className="text-fuchsia-300 hover:text-fuchsia-200 underline transition-colors">Phương Nhã</a>
              </p>
            </div>

            <div className="mt-auto space-y-3 pt-6">
              <button 
                onClick={prevStep}
                className="w-full py-3 px-6 rounded-xl border border-white/20 hover:bg-white/10 transition-colors text-purple-200 font-semibold text-base flex items-center justify-center gap-2"
              >
                <span>←</span> Back
              </button>
              <button 
                onClick={nextStep}
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-purple-500 hover:to-fuchsia-400 transition-all text-white font-bold text-base flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]"
              >
                Next <span>→</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: RSVP Slide */}
        {step === 2 && (
          <div className="p-8 flex flex-col h-full justify-center space-y-10" style={{ minHeight: '650px' }}>
            <h2 className="text-4xl font-serif font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-fuchsia-200 drop-shadow-md">
              Will you be part of my happy day? ✨
            </h2>

            <div className="space-y-4">
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name..." 
                className="w-full bg-white/5 border border-white/20 rounded-2xl py-4 px-6 text-center text-lg text-white placeholder:text-purple-300/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:bg-white/10 transition-all shadow-inner"
              />
            </div>

            <div className="space-y-4 pt-4">
              <button 
                onClick={() => {
                  setStatus('YES')
                  nextStep()
                }}
                className="w-full py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-500 shadow-[0_4px_20px_rgba(168,85,247,0.4)] text-white font-bold text-xl hover:from-purple-500 hover:to-fuchsia-400 hover:scale-[1.02] transition-all"
              >
                YES
              </button>
              <button 
                onClick={() => {
                  setStatus('NO')
                  nextStep()
                }}
                className="w-full py-5 rounded-2xl bg-white/10 border border-white/20 text-purple-200 font-bold text-xl hover:bg-white/20 hover:text-white hover:scale-[1.02] transition-all"
              >
                NO
              </button>
            </div>

            <div className="pt-10 flex justify-center relative">
               <button 
                onClick={prevStep}
                className="w-3/4 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition-colors text-purple-200 font-semibold text-base flex items-center justify-center gap-2"
              >
                <span>←</span> Back
              </button>
              
              {/* Decorative emoji */}
              <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 overflow-hidden flex items-center justify-center rotate-12 hover:rotate-0 transition-transform">
                 <span className="text-4xl">💜</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Thank You Note */}
        {step === 3 && (
          <div className="p-6 flex flex-col h-full justify-between" style={{ minHeight: '650px' }}>
            <div className="text-center mt-8 space-y-4">
              <h2 className="text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-fuchsia-200">
                Awww. Thank you. See you there, {name || 'Guest'} 💜
              </h2>
              <p className="text-base font-medium text-purple-200">
                Feel free to leave a little note for NP 💌
              </p>
            </div>

            <div className="w-full bg-white/5 rounded-2xl shadow-inner mt-6 mb-8 border border-white/20 backdrop-blur-sm overflow-hidden relative">
              {/* Glow accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 pointer-events-none"></div>
              <textarea 
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full h-40 bg-transparent p-5 resize-none focus:outline-none text-white placeholder:text-purple-300/40 text-base relative z-10"
                placeholder="Write your note here..."
              ></textarea>
            </div>

            <div className="text-sm font-medium text-purple-100 space-y-2 mb-8 relative bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-md">
              <p>When you arrive, please contact me via:</p>
              <p className="flex items-center gap-2">
                <span className="text-lg">📞</span> Zalo: <a href="tel:0833518316" className="text-fuchsia-300 font-semibold underline hover:text-fuchsia-200">0833 518 316</a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-lg">🔗</span> Facebook: <a href="#" className="text-fuchsia-300 font-semibold underline hover:text-fuchsia-200">Phương Nhã</a>
              </p>
              
              <button 
                onClick={() => setStep(0)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-300 font-semibold text-xs flex items-center gap-1 hover:text-white transition-colors"
              >
                <span>↻</span> Restart
              </button>
            </div>

            <div className="space-y-3 mt-auto">
              <button 
                onClick={() => setStep(0)}
                className="w-full py-3 rounded-xl border border-white/20 hover:bg-white/10 transition-colors text-purple-200 font-semibold text-base flex items-center justify-center gap-2"
              >
                Close Invitation
              </button>
              <button 
                onClick={async () => {
                  if (!name) {
                    alert("Please enter your name first!")
                    setStep(2)
                    return
                  }
                  setIsSubmitting(true)
                  try {
                    const res = await fetch('/api/rsvps', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ name, status, note })
                    })
                    if (res.ok) {
                      alert("Note sent successfully! 💌")
                      setStep(0)
                      setName('')
                      setStatus('')
                      setNote('')
                    } else {
                      alert("Failed to send note. Please try again.")
                    }
                  } catch (err) {
                    alert("Error submitting. Check connection.")
                  } finally {
                    setIsSubmitting(false)
                  }
                }}
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-purple-500 hover:to-fuchsia-400 transition-all text-white font-bold text-base flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] disabled:opacity-50 disabled:pointer-events-none"
              >
                {isSubmitting ? 'Sending...' : 'Send 💌'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
