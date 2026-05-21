'use client'

import { useState, useEffect } from 'react'
import { CameraPreview } from '@/components/camera-preview'
import { UnderwaterParticles } from '@/components/underwater-particles'
import { PreparationHeader } from '@/components/preparation-header'
import { ReadinessIndicators } from '@/components/readiness-indicators'
import { EnterDiveModeButton } from '@/components/enter-dive-mode-button'
import Link from 'next/link'

interface SystemCheck {
  id: string
  label: string
  value: string
  status: 'ready' | 'warning' | 'checking'
}

export default function PreparationPage() {
  const [checks, setChecks] = useState<SystemCheck[]>([
    { id: 'battery', label: 'Battery', value: '87%', status: 'checking' },
    { id: 'storage', label: 'Storage', value: '64GB free', status: 'checking' },
    { id: 'brightness', label: 'Brightness', value: 'Locked', status: 'checking' },
    { id: 'gesture', label: 'Gesture Tracking', value: 'Active', status: 'checking' },
    { id: 'seal', label: 'Waterproof Seal', value: 'Confirmed', status: 'checking' },
    { id: 'temperature', label: 'Temperature', value: '24°C', status: 'checking' },
    { id: 'stabilization', label: 'Stabilization', value: 'Enabled', status: 'checking' },
  ])

  const [allReady, setAllReady] = useState(false)

  // Simulate system checks
  useEffect(() => {
    const checkOrder = [0, 1, 2, 3, 4, 5, 6]
    checkOrder.forEach((index, i) => {
      setTimeout(() => {
        setChecks(prev => prev.map((check, idx) => 
          idx === index ? { ...check, status: 'ready' as const } : check
        ))
      }, 400 + (i * 300))
    })

    // Set all ready after checks complete
    setTimeout(() => {
      setAllReady(true)
    }, 400 + (checkOrder.length * 300) + 200)
  }, [])

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-background">
      {/* Camera background */}
      <CameraPreview />
      
      {/* Underwater atmosphere */}
      <UnderwaterParticles />
      
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />
      
      {/* Header */}
      <PreparationHeader />
      
      {/* Readiness Indicators */}
      <ReadinessIndicators checks={checks} />
      
      {/* Enter Dive Mode Button */}
      <EnterDiveModeButton ready={allReady} />
      
      {/* Recalibrate link */}
      <div className="absolute bottom-5 sm:bottom-6 left-0 right-0 z-20 flex justify-center">
        <Link 
          href="/calibration"
          className="text-[10px] sm:text-xs text-white/30 hover:text-white/50 tracking-[0.15em] transition-colors"
        >
          Recalibrate Gestures
        </Link>
      </div>
    </main>
  )
}
