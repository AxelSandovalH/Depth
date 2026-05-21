'use client'

import { useState, useEffect } from 'react'
import { CameraPreview } from '@/components/camera-preview'
import { UnderwaterParticles } from '@/components/underwater-particles'
import { RecordingStatusBar } from '@/components/recording-status-bar'
import { GestureFeedback } from '@/components/gesture-feedback'
import { RecordingIndicator } from '@/components/recording-indicator'
import { RecordingControls } from '@/components/recording-controls'
import { DepthIndicator } from '@/components/depth-indicator'

export default function RecordingPage() {
  const [recordingTime, setRecordingTime] = useState(0)
  const [batteryLevel] = useState(87)
  const [storageRemaining] = useState(42)
  const [currentDepth, setCurrentDepth] = useState(12.4)
  const [gestureStatus, setGestureStatus] = useState<'active' | 'detected' | 'locked'>('active')
  const [isLocked, setIsLocked] = useState(false)
  const [flashlightOn, setFlashlightOn] = useState(false)

  // Recording timer
  useEffect(() => {
    const interval = setInterval(() => {
      setRecordingTime(prev => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Simulate depth changes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDepth(prev => {
        const change = (Math.random() - 0.5) * 0.8
        return Math.max(0, Math.min(60, prev + change))
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Simulate gesture status changes
  useEffect(() => {
    const interval = setInterval(() => {
      const statuses: ('active' | 'detected' | 'locked')[] = ['active', 'detected', 'locked']
      setGestureStatus(statuses[Math.floor(Math.random() * statuses.length)])
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <main className="relative w-full h-[100dvh] overflow-hidden bg-background">
      {/* Fullscreen Camera Preview */}
      <CameraPreview />
      
      {/* Subtle underwater atmosphere */}
      <UnderwaterParticles />
      
      {/* Top Status Bar */}
      <RecordingStatusBar 
        recordingTime={formatTime(recordingTime)}
        batteryLevel={batteryLevel}
        storageRemaining={storageRemaining}
      />
      
      {/* Depth Indicator - Top Right */}
      <DepthIndicator depth={currentDepth} />
      
      {/* Center Gesture Feedback */}
      <GestureFeedback status={gestureStatus} />
      
      {/* Bottom Recording State Indicator */}
      <RecordingIndicator />
      
      {/* Bottom Floating Controls */}
      <RecordingControls 
        isLocked={isLocked}
        flashlightOn={flashlightOn}
        onToggleLock={() => setIsLocked(!isLocked)}
        onEmergencyStop={() => window.location.href = '/'}
        onToggleFlashlight={() => setFlashlightOn(!flashlightOn)}
      />
    </main>
  )
}
