'use client'

import { useEffect, useState, useMemo } from 'react'

type RSVP = {
  id: string
  name: string
  status: string
  note: string
  timestamp: string
}

export function AdminDashboard() {
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/rsvps')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data')
        return res.json() as Promise<RSVP[]>
      })
      .then((data) => {
        setRsvps(data)
        setLoading(false)
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Unknown error')
        setLoading(false)
      })
  }, [])

  const stats = useMemo(() => ({
    total: rsvps.length,
    yes: rsvps.filter((r) => r.status === 'YES').length,
    no: rsvps.filter((r) => r.status === 'NO').length,
  }), [rsvps])

  const handleExportCSV = () => {
    if (rsvps.length === 0) return

    const headers = ['Name', 'Status', 'Note', 'Timestamp']
    const rows = rsvps.map((rsvp) => [
      `"${rsvp.name.replace(/"/g, '""')}"`,
      `"${rsvp.status}"`,
      `"${rsvp.note.replace(/"/g, '""')}"`,
      `"${new Date(rsvp.timestamp).toLocaleString()}"`,
    ])

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n')
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'graduation_rsvps.csv'
    link.click()
    URL.revokeObjectURL(link.href)
  }

  return (
    <div className="admin-scene">
      <div className="admin-card">
        <div className="admin-header">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
            <div>
              <h1 style={{ fontFamily: 'var(--next-font-chalmers)', fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', letterSpacing: '0.02em' }}>
                Admin Dashboard
              </h1>
              <p style={{ opacity: 0.7, fontSize: '0.8125rem', marginTop: '0.25rem' }}>
                Manage and view your RSVPs
              </p>
            </div>
            <button
              type="button"
              onClick={handleExportCSV}
              disabled={rsvps.length === 0}
              className="inv-btn inv-btn--secondary"
              style={{ width: 'auto', minHeight: '2.5rem', padding: '0.5rem 1.25rem', fontSize: '0.8125rem', color: 'var(--inv-cream)', borderColor: 'oklch(1 0 0 / 0.2)' }}
            >
              📥 Export CSV
            </button>
          </div>

          {!loading && !error && rsvps.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginTop: '1.25rem' }}>
              <div className="admin-stat" style={{ background: 'oklch(1 0 0 / 0.1)', border: '1px solid oklch(1 0 0 / 0.15)' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--inv-accent)' }}>{stats.total}</span>
                <span style={{ fontSize: '0.6875rem', opacity: 0.7, marginTop: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total</span>
              </div>
              <div className="admin-stat" style={{ background: 'oklch(1 0 0 / 0.1)', border: '1px solid oklch(1 0 0 / 0.15)' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'oklch(0.75 0.15 145)' }}>{stats.yes}</span>
                <span style={{ fontSize: '0.6875rem', opacity: 0.7, marginTop: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Attending</span>
              </div>
              <div className="admin-stat" style={{ background: 'oklch(1 0 0 / 0.1)', border: '1px solid oklch(1 0 0 / 0.15)' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'oklch(0.7 0.12 25)' }}>{stats.no}</span>
                <span style={{ fontSize: '0.6875rem', opacity: 0.7, marginTop: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Declined</span>
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: 'clamp(1rem, 4vw, 1.5rem)' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: 'oklch(0.5 0.08 300)' }}>
              <div className="inv-spinner" style={{ width: '2rem', height: '2rem', margin: '0 auto 1rem' }} />
              Loading RSVPs...
            </div>
          ) : error ? (
            <div
              style={{
                textAlign: 'center',
                padding: '2rem',
                color: 'oklch(0.5 0.15 25)',
                background: 'oklch(0.95 0.03 25 / 0.3)',
                borderRadius: 'var(--inv-radius-sm)',
                border: '1px solid oklch(0.85 0.05 25 / 0.3)',
              }}
            >
              Error: {error}
            </div>
          ) : rsvps.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '3rem 1rem',
                color: 'oklch(0.5 0.08 300)',
                background: 'oklch(0.97 0.02 300 / 0.5)',
                borderRadius: 'var(--inv-radius-sm)',
                border: '1px solid oklch(0.9 0.02 300 / 0.3)',
              }}
            >
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.75rem' }}>📭</span>
              No RSVPs yet. Share your invitation link!
            </div>
          ) : (
            <div className="admin-table-wrap">
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'oklch(0.96 0.02 300 / 0.6)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'oklch(0.4 0.06 300)' }}>
                    <th style={{ padding: '0.875rem 1rem', fontWeight: 600 }}>Name</th>
                    <th style={{ padding: '0.875rem 1rem', fontWeight: 600 }}>Status</th>
                    <th style={{ padding: '0.875rem 1rem', fontWeight: 600 }}>Note</th>
                    <th style={{ padding: '0.875rem 1rem', fontWeight: 600 }}>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.map((rsvp) => (
                    <tr
                      key={rsvp.id}
                      style={{ borderTop: '1px solid oklch(0.92 0.02 300 / 0.5)', transition: 'background 0.15s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'oklch(0.97 0.02 300 / 0.4)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
                    >
                      <td style={{ padding: '0.875rem 1rem', fontWeight: 500, whiteSpace: 'nowrap' }}>{rsvp.name}</td>
                      <td style={{ padding: '0.875rem 1rem' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '0.25rem 0.75rem',
                            fontSize: '0.6875rem',
                            fontWeight: 700,
                            borderRadius: '9999px',
                            border: '1px solid',
                            ...(rsvp.status === 'YES'
                              ? { background: 'oklch(0.93 0.05 320)', color: 'oklch(0.45 0.15 320)', borderColor: 'oklch(0.85 0.08 320)' }
                              : { background: 'oklch(0.93 0.04 280)', color: 'oklch(0.4 0.1 280)', borderColor: 'oklch(0.85 0.06 280)' }),
                          }}
                        >
                          {rsvp.status}
                        </span>
                      </td>
                      <td style={{ padding: '0.875rem 1rem', minWidth: '10rem', lineHeight: 1.5, color: 'oklch(0.35 0.04 300)' }}>
                        {rsvp.note || '—'}
                      </td>
                      <td style={{ padding: '0.875rem 1rem', fontSize: '0.8125rem', color: 'oklch(0.5 0.06 300)', whiteSpace: 'nowrap' }}>
                        {new Date(rsvp.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
