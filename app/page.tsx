'use client'

import { useState } from 'react'
import { AccessGate } from '~/components/access-gate'
import { InvitationFlow } from '~/components/invitation-flow'
import { AdminDashboard } from '~/components/admin-dashboard'

export default function Home() {
  const [mode, setMode] = useState<'gate' | 'invitation' | 'admin'>('gate')

  if (mode === 'invitation') {
    return <InvitationFlow />
  }

  if (mode === 'admin') {
    return <AdminDashboard />
  }

  return <AccessGate onAccess={setMode} />
}
