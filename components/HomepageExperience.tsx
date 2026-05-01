'use client'

import { useState, useEffect } from 'react'

export default function HomepageExperience() {
  const [mounted, setMounted] = useState(false)
  const [veilEnabled, setVeilEnabled] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      {veilEnabled && (
        <div aria-hidden="true" className="veil-drape">
          <div className="veil-gold" />
          <div className="veil-grain" />
        </div>
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '0.375rem 1.5rem',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <button
          onClick={() => setVeilEnabled(v => !v)}
          className="experience-toggle"
          data-active={veilEnabled}
          aria-label={veilEnabled ? 'Disable veil animation' : 'Enable veil animation'}
        >
          {veilEnabled ? '~ Veil On' : '~ Veil Off'}
        </button>
      </div>
    </>
  )
}
