export default function Loading() {
  return (
    <div className="inv-scene">
      <div className="inv-orb inv-orb--1" aria-hidden="true" />
      <div className="inv-orb inv-orb--2" aria-hidden="true" />
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div className="inv-spinner" style={{ width: '2.5rem', height: '2.5rem', margin: '0 auto 1rem' }} />
        <p className="inv-title" style={{ fontSize: '0.875rem', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.6 }}>
          Loading
        </p>
      </div>
    </div>
  )
}
