'use client'

import { useEffect, useState } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  delay: number
}

export function UnderwaterParticles() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    // Generate fewer, more subtle particles for home screen
    const newParticles: Particle[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.2 + 0.05,
      speed: Math.random() * 10 + 6,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-[#4FD1FF] animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationDuration: `${particle.speed}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      {/* Very subtle light rays */}
      <div 
        className="absolute top-0 left-1/4 w-[150px] sm:w-[200px] h-[150%] bg-gradient-to-b from-[#4FD1FF]/3 to-transparent rotate-[-15deg] animate-light-ray"
        style={{ animationDelay: '0s' }}
      />
      <div 
        className="absolute top-0 right-1/3 w-[100px] sm:w-[150px] h-[150%] bg-gradient-to-b from-[#4FD1FF]/2 to-transparent rotate-[-10deg] animate-light-ray"
        style={{ animationDelay: '3s' }}
      />

      {/* Corner vignette overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#040B14] via-transparent to-transparent opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#040B14]/30 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#040B14]/40 via-transparent to-[#040B14]/40" />
    </div>
  )
}
