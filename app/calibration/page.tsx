'use client'

import { useState } from 'react'
import { CameraPreview } from '@/components/camera-preview'
import { UnderwaterParticles } from '@/components/underwater-particles'
import { HandTrackingOverlay } from '@/components/hand-tracking-overlay'
import { CalibrationHeader } from '@/components/calibration-header'
import { CalibrationSteps } from '@/components/calibration-steps'
import { CalibrationFooter } from '@/components/calibration-footer'

export default function CalibrationPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [confidence, setConfidence] = useState(0)
  const [isCalibrating, setIsCalibrating] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const steps = [
    { gesture: 'open', label: 'Open Hand', action: 'Start Recording', icon: '✋' },
    { gesture: 'fist', label: 'Closed Fist', action: 'Stop Recording', icon: '✊' },
    { gesture: 'ok', label: 'OK Gesture', action: 'Lock Controls', icon: '👌' },
  ]

  const handleStartCalibration = () => {
    setIsCalibrating(true)
    setConfidence(0)
    
    // Simulate calibration progress
    const interval = setInterval(() => {
      setConfidence(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setCompletedSteps(current => [...current, currentStep])
          setIsCalibrating(false)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 200)
  }

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
      setConfidence(0)
    }
  }

  const handleRetry = () => {
    setConfidence(0)
    setCompletedSteps(current => current.filter(s => s !== currentStep))
  }

  const isStepComplete = completedSteps.includes(currentStep)
  const allComplete = completedSteps.length === steps.length

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#040B14]">
      {/* Background */}
      <CameraPreview isActive={true} />
      <UnderwaterParticles />
      
      {/* Hand Tracking Visualization */}
      <HandTrackingOverlay 
        isCalibrating={isCalibrating}
        confidence={Math.min(confidence, 100)}
        currentGesture={steps[currentStep].gesture}
      />
      
      {/* Header */}
      <CalibrationHeader />
      
      {/* Calibration Steps */}
      <CalibrationSteps 
        steps={steps}
        currentStep={currentStep}
        completedSteps={completedSteps}
      />
      
      {/* Footer */}
      <CalibrationFooter
        isCalibrating={isCalibrating}
        isStepComplete={isStepComplete}
        allComplete={allComplete}
        confidence={Math.min(confidence, 100)}
        currentStep={currentStep}
        totalSteps={steps.length}
        onStartCalibration={handleStartCalibration}
        onContinue={handleContinue}
        onRetry={handleRetry}
      />
    </main>
  )
}
