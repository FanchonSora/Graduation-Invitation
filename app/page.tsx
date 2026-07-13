'use client'

import { useState } from 'react'
import { InvitationFlow } from '~/components/invitation-flow'
import { AdminDashboard } from '~/components/admin-dashboard'

export default function Home() {
  const [accessCode, setAccessCode] = useState('')
  const [mode, setMode] = useState<'gate' | 'invitation' | 'admin'>('gate')
  const [error, setError] = useState(false)

  const handleAccess = (e: React.FormEvent) => {
    e.preventDefault()
    if (accessCode === '1') {
      setMode('invitation')
    } else if (accessCode === '2') {
      setMode('admin')
    } else {
      setError(true)
      setAccessCode('')
    }
  }

  if (mode === 'invitation') {
    return <main><InvitationFlow /></main>
  }

  if (mode === 'admin') {
    return <main><AdminDashboard /></main>
  }

  return (
    <main className="min-h-[100dvh] w-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-purple-950 to-black p-4 relative overflow-hidden">
      
      {/* Decorative Orbs for Glassmorphism Glow */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-fuchsia-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] w-full max-w-sm border border-white/20 flex flex-col gap-6 transform transition-all hover:scale-[1.02]">
        <div className="text-center">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-fuchsia-200 font-serif text-3xl mb-2 font-bold tracking-wider">Welcome</h1>
          <p className="text-purple-200/80 text-sm">Please enter your access code</p>
        </div>

        <form onSubmit={handleAccess} className="flex flex-col gap-5">
          <div>
            <input 
              type="password"
              value={accessCode}
              onChange={(e) => {
                setAccessCode(e.target.value)
                setError(false)
              }}
              placeholder="Code"
              className="w-full text-center px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:bg-white/10 transition-all"
              autoFocus
            />
            {error && (
              <p className="text-pink-400 text-xs text-center mt-2 animate-bounce">Invalid code. Please try again.</p>
            )}
          </div>
          <button 
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white font-bold hover:from-purple-500 hover:to-fuchsia-400 transition-all shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.7)]"
          >
            Enter
          </button>
        </form>
      </div>
    </main>
  )
}
