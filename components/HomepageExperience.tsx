'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const SONG_COUNT = 102

export default function HomepageExperience() {
  const [mounted, setMounted] = useState(false)
  const [veilEnabled, setVeilEnabled] = useState(true)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [currentSong, setCurrentSong] = useState(1)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    setMounted(true)
    const savedVeil = localStorage.getItem('preveil-veil')
    const savedAudio = localStorage.getItem('preveil-audio')
    if (savedVeil !== null) setVeilEnabled(savedVeil !== 'false')
    if (savedAudio !== null) setAudioEnabled(savedAudio === 'true')
    setCurrentSong(Math.floor(Math.random() * SONG_COUNT) + 1)
  }, [])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem('preveil-veil', String(veilEnabled))
  }, [veilEnabled, mounted])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem('preveil-audio', String(audioEnabled))
    if (!audioRef.current) return
    if (audioEnabled) {
      audioRef.current.play().catch(() => setAudioEnabled(false))
    } else {
      audioRef.current.pause()
    }
  }, [audioEnabled, mounted])

  const nextSong = useCallback(() => {
    setCurrentSong(Math.floor(Math.random() * SONG_COUNT) + 1)
  }, [])

  useEffect(() => {
    if (!mounted || !audioEnabled || !audioRef.current) return
    audioRef.current.play().catch(() => {})
  }, [currentSong, audioEnabled, mounted])

  if (!mounted) return null

  return (
    <>
      {/* Directional veil overlay */}
      {veilEnabled && (
        <div aria-hidden="true" className="veil-drape">
          <div className="veil-gold" />
          <div className="veil-grain" />
        </div>
      )}

      {/* Audio */}
      <audio
        ref={audioRef}
        key={currentSong}
        src={`/songs/${currentSong}.mp3`}
        onEnded={nextSong}
      />

      {/* Controls bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '0.625rem',
          padding: '0.375rem 1.5rem',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <button
          onClick={() => setAudioEnabled(v => !v)}
          className="experience-toggle"
          data-active={audioEnabled}
          aria-label={audioEnabled ? 'Mute music' : 'Play music'}
        >
          {audioEnabled ? '♪ Music On' : '♪ Music Off'}
        </button>
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
