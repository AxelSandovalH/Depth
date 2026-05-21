'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { CameraPreview } from '@/components/camera-preview'
import { UnderwaterParticles } from '@/components/underwater-particles'
import { PreviewHeader } from '@/components/preview-header'
import { VideoPlayer } from '@/components/video-player'
import { PlaybackControls } from '@/components/playback-controls'
import { PreviewActions } from '@/components/preview-actions'
import { EnhancementSuggestion } from '@/components/enhancement-suggestion'

export default function VideoPreviewPage() {
  const params = useParams()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration] = useState(847) // 14:07 in seconds
  const [volume, setVolume] = useState(0.8)
  const [showActions, setShowActions] = useState(false)
  
  // Mock dive data
  const diveData = {
    id: params.id,
    title: 'Coral Reef Dive',
    date: 'May 18, 2026',
    location: 'Great Barrier Reef',
    depth: '18m',
    duration: '14:07',
  }

  // Simulate playback progress
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime(prev => Math.min(prev + 1, duration))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentTime, duration])

  const handleSeek = (time: number) => {
    setCurrentTime(time)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleActions = () => {
    setShowActions(!showActions)
  }

  return (
    <main className="relative w-full h-screen bg-[#040B14] overflow-hidden">
      {/* Cinematic video background */}
      <CameraPreview />
      
      {/* Subtle particles */}
      <UnderwaterParticles />
      
      {/* Cinematic edge vignette */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[#040B14] via-transparent to-[#040B14]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040B14]/40 via-transparent to-[#040B14]/40" />
      </div>
      
      {/* Video player area */}
      <VideoPlayer isPlaying={isPlaying} />
      
      {/* Header */}
      <PreviewHeader 
        title={diveData.title}
        date={diveData.date}
        onShare={toggleActions}
      />
      
      {/* Playback controls */}
      <PlaybackControls 
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        onPlayPause={togglePlay}
        onSeek={handleSeek}
        onVolumeChange={setVolume}
      />
      
      {/* Enhancement suggestion */}
      <EnhancementSuggestion />
      
      {/* Share/Export actions panel */}
      <PreviewActions 
        isOpen={showActions}
        onClose={() => setShowActions(false)}
      />
    </main>
  )
}
