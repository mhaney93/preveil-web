'use client'

import { useState, useEffect, useRef } from 'react'

export default function HomepageExperience() {
  const [mounted, setMounted] = useState(false)
  const [veilEnabled, setVeilEnabled] = useState(true)
  const [scrolling, setScrolling] = useState(false)
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrolling(true)
      if (scrollTimer.current) clearTimeout(scrollTimer.current)
      scrollTimer.current = setTimeout(() => setScrolling(false), 1500)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (scrollTimer.current) clearTimeout(scrollTimer.current)
    }
  }, [])

  if (!mounted) return null

  return (
    <>
      {veilEnabled && (
        <div aria-hidden="true" className={`veil-drape${scrolling ? ' veil-scrolling' : ''}`}>
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
