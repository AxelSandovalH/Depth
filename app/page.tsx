'use client'

import { CameraPreview } from '@/components/camera-preview'
import { MinimalStatusBar } from '@/components/minimal-status-bar'
import { DepthBranding } from '@/components/depth-branding'
import { StartDiveButton } from '@/components/start-dive-button'
import { BottomControls } from '@/components/bottom-controls'
import { UnderwaterParticles } from '@/components/underwater-particles'

export default function DepthHomePage() {
  return (
    <main className="relative h-dvh w-full overflow-hidden bg-[#040B14]">
      {/* Fullscreen Blurred Camera Background */}
      <CameraPreview isActive={true} />
      
      {/* Subtle Underwater Particles */}
      <UnderwaterParticles />
      
      {/* Minimal Top Status */}
      <MinimalStatusBar 
        gesturesActive={true}
        storageRemaining={58}
        batteryLevel={87}
      />
      
      {/* Center Branding */}
      <DepthBranding />
      
      {/* Dominant Start Dive Button */}
      <StartDiveButton />
      
      {/* Small Bottom Floating Icons */}
      <BottomControls />
    </main>
  )
}
