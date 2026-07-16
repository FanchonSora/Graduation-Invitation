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

    const headers = ['Tên', 'Đi Được Hay Không', 'Ghi Chú', 'Thời Gian']
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
              <div className="admin-stat">
                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--inv-cream)' }}>{stats.total}</span>
                <span style={{ fontSize: '0.6875rem', opacity: 0.7, marginTop: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total</span>
              </div>
              <div className="admin-stat">
                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'oklch(0.8 0.15 145)' }}>{stats.yes}</span>
                <span style={{ fontSize: '0.6875rem', opacity: 0.7, marginTop: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Attending</span>
              </div>
              <div className="admin-stat">
                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'oklch(0.85 0.12 25)' }}>{stats.no}</span>
                <span style={{ fontSize: '0.6875rem', opacity: 0.7, marginTop: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Declined</span>
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: 'clamp(1rem, 4vw, 1.5rem)' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--inv-accent)' }}>
              <div className="inv-spinner" style={{ width: '2rem', height: '2rem', margin: '0 auto 1rem' }} />
              Loading RSVPs...
            </div>
          ) : error ? (
            <div
              style={{
                textAlign: 'center',
                padding: '2rem',
                color: 'oklch(0.4 0.15 25)',
                background: 'oklch(0.95 0.05 25 / 0.3)',
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
                color: 'var(--inv-accent)',
                background: 'var(--inv-bg-mid)',
                borderRadius: 'var(--inv-radius-sm)',
                border: '1px solid var(--inv-glass-border)',
              }}
            >
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.75rem' }}>📭</span>
              No RSVPs yet. Share your invitation link!
            </div>
          ) : (
            <div className="admin-table-wrap">
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'var(--inv-lavender-soft)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--inv-accent)' }}>
                    <th style={{ padding: '0.875rem 1rem', fontWeight: 600 }}>Tên</th>
                    <th style={{ padding: '0.875rem 1rem', fontWeight: 600 }}>Đi được hay không</th>
                    <th style={{ padding: '0.875rem 1rem', fontWeight: 600 }}>Ghi Chú</th>
                    <th style={{ padding: '0.875rem 1rem', fontWeight: 600 }}>Thời Gian</th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.map((rsvp) => (
                    <tr
                      key={rsvp.id}
                      style={{ borderTop: '1px solid var(--inv-glass-border)', transition: 'background 0.15s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--inv-lavender-soft)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
                    >
                      <td style={{ padding: '0.875rem 1rem', fontWeight: 500, whiteSpace: 'nowrap', color: 'var(--inv-text)' }}>{rsvp.name}</td>
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
                              ? { background: 'oklch(0.95 0.04 140)', color: 'oklch(0.4 0.12 140)', borderColor: 'oklch(0.8 0.08 140)' }
                              : { background: 'oklch(0.95 0.04 25)', color: 'oklch(0.45 0.12 25)', borderColor: 'oklch(0.85 0.08 25)' }),
                          }}
                        >
                          {rsvp.status}
                        </span>
                      </td>
                      <td style={{ padding: '0.875rem 1rem', minWidth: '10rem', lineHeight: 1.5, color: 'var(--inv-accent)' }}>
                        {rsvp.note || '—'}
                      </td>
                      <td style={{ padding: '0.875rem 1rem', fontSize: '0.8125rem', color: 'var(--inv-lavender)', whiteSpace: 'nowrap' }}>
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
