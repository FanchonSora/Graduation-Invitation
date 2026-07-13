'use client'

import React, { useEffect, useState } from 'react'

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
        return res.json()
      })
      .then((data) => {
        setRsvps(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const handleExportCSV = () => {
    if (rsvps.length === 0) {
      alert("No data to export.")
      return
    }

    // Prepare CSV header and rows
    const headers = ['Name', 'Status', 'Note', 'Timestamp']
    const rows = rsvps.map((rsvp) => [
      `"${rsvp.name.replace(/"/g, '""')}"`,
      `"${rsvp.status}"`,
      `"${rsvp.note.replace(/"/g, '""')}"`,
      `"${new Date(rsvp.timestamp).toLocaleString()}"`,
    ])

    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n')

    // Create a Blob and download it
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', 'graduation_rsvps.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-[100dvh] w-full bg-purple-50 p-6 md:p-12 font-sans text-indigo-950 relative overflow-hidden">
      
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-purple-200/50 to-transparent pointer-events-none"></div>

      <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-purple-100 overflow-hidden relative z-10">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-fuchsia-900 p-6 text-white flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-purple-800">
          <div>
            <h1 className="text-2xl font-bold font-serif tracking-wide">Admin Dashboard</h1>
            <p className="text-purple-200 text-sm mt-1">Manage and view your RSVPs</p>
          </div>
          <button 
            onClick={handleExportCSV}
            className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-5 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg hover:shadow-purple-500/30"
          >
            <span>📥</span> Export to Excel (CSV)
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="text-center py-10 text-purple-500 animate-pulse font-medium">Loading data...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-500 bg-red-50 rounded-xl border border-red-100 font-medium">Error: {error}</div>
          ) : rsvps.length === 0 ? (
            <div className="text-center py-12 text-purple-600 bg-purple-50/50 rounded-xl border border-purple-100 font-medium">
              No one has RSVP'd yet.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-purple-100">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-purple-50/80 text-purple-900 text-sm uppercase tracking-wide border-b border-purple-200">
                    <th className="px-4 py-4 font-semibold">Name</th>
                    <th className="px-4 py-4 font-semibold">Status</th>
                    <th className="px-4 py-4 font-semibold">Note</th>
                    <th className="px-4 py-4 font-semibold">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-100">
                  {rsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="hover:bg-purple-50/80 transition-colors">
                      <td className="px-4 py-4 font-medium whitespace-nowrap text-indigo-950">{rsvp.name}</td>
                      <td className="px-4 py-4">
                        <span className={cn(
                          "px-3 py-1 text-xs font-bold rounded-full shadow-sm",
                          rsvp.status === 'YES' ? "bg-fuchsia-100 text-fuchsia-700 border border-fuchsia-200" : "bg-indigo-100 text-indigo-700 border border-indigo-200"
                        )}>
                          {rsvp.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 min-w-[200px] text-purple-900/80 leading-relaxed">{rsvp.note || '-'}</td>
                      <td className="px-4 py-4 text-sm text-purple-500 whitespace-nowrap">
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

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}
