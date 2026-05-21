'use client'

import { useEffect, useState } from 'react'

interface HandTrackingOverlayProps {
  isCalibrating: boolean
  confidence: number
  currentGesture: string
}

interface TrackingPoint {
  id: number
  x: number
  y: number
  baseX: number
  baseY: number
}

export function HandTrackingOverlay({ isCalibrating, confidence, currentGesture }: HandTrackingOverlayProps) {
  const [points, setPoints] = useState<TrackingPoint[]>([])
  const [scanLine, setScanLine] = useState(0)

  // Generate hand tracking points based on gesture
  useEffect(() => {
    const handPoints = getGesturePoints(currentGesture)
    setPoints(handPoints)
  }, [currentGesture])

  // Animate points when calibrating
  useEffect(() => {
    if (!isCalibrating) return

    const interval = setInterval(() => {
      setPoints(prev => prev.map(p => ({
        ...p,
        x: p.baseX + (Math.random() - 0.5) * 3,
        y: p.baseY + (Math.random() - 0.5) * 3,
      })))
    }, 100)

    return () => clearInterval(interval)
  }, [isCalibrating])

  // Scan line animation
  useEffect(() => {
    if (!isCalibrating) {
      setScanLine(0)
      return
    }

    const interval = setInterval(() => {
      setScanLine(prev => (prev + 2) % 100)
    }, 30)

    return () => clearInterval(interval)
  }, [isCalibrating])

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
      {/* Central tracking area */}
      <div className="relative w-[200px] h-[260px] sm:w-[240px] sm:h-[300px] md:w-[280px] md:h-[340px]">
        {/* Scanning frame */}
        <div className="absolute inset-0 border border-[#4FD1FF]/30 rounded-2xl sm:rounded-3xl">
          {/* Corner markers */}
          <div className="absolute -top-0.5 -left-0.5 w-4 h-4 sm:w-5 sm:h-5 border-t-2 border-l-2 border-[#4FD1FF]/60 rounded-tl-lg" />
          <div className="absolute -top-0.5 -right-0.5 w-4 h-4 sm:w-5 sm:h-5 border-t-2 border-r-2 border-[#4FD1FF]/60 rounded-tr-lg" />
          <div className="absolute -bottom-0.5 -left-0.5 w-4 h-4 sm:w-5 sm:h-5 border-b-2 border-l-2 border-[#4FD1FF]/60 rounded-bl-lg" />
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 sm:w-5 sm:h-5 border-b-2 border-r-2 border-[#4FD1FF]/60 rounded-br-lg" />
        </div>

        {/* Scan line */}
        {isCalibrating && (
          <div 
            className="absolute left-2 right-2 h-[1px] bg-gradient-to-r from-transparent via-[#4FD1FF]/60 to-transparent transition-all"
            style={{ top: `${scanLine}%` }}
          />
        )}

        {/* Hand outline */}
        <svg 
          viewBox="0 0 100 130" 
          className="absolute inset-0 w-full h-full p-4 sm:p-6"
        >
          {/* Gesture-specific hand shape */}
          <g 
            className={`transition-all duration-300 ${isCalibrating ? 'opacity-80' : 'opacity-40'}`}
            stroke={confidence > 80 ? '#22c55e' : '#4FD1FF'}
            strokeWidth="1"
            fill="none"
          >
            {currentGesture === 'open' && (
              <>
                {/* Palm */}
                <ellipse cx="50" cy="85" rx="28" ry="32" strokeDasharray="4 2" />
                {/* Fingers */}
                <line x1="50" y1="53" x2="50" y2="15" strokeLinecap="round" />
                <line x1="35" y1="58" x2="25" y2="22" strokeLinecap="round" />
                <line x1="65" y1="58" x2="75" y2="22" strokeLinecap="round" />
                <line x1="22" y1="70" x2="8" y2="45" strokeLinecap="round" />
                <line x1="78" y1="70" x2="92" y2="45" strokeLinecap="round" />
              </>
            )}
            {currentGesture === 'fist' && (
              <>
                {/* Closed fist shape */}
                <ellipse cx="50" cy="65" rx="32" ry="38" strokeDasharray="4 2" />
                {/* Thumb */}
                <path d="M 18 55 Q 10 45, 15 35" strokeLinecap="round" />
              </>
            )}
            {currentGesture === 'ok' && (
              <>
                {/* Palm */}
                <ellipse cx="50" cy="85" rx="25" ry="28" strokeDasharray="4 2" />
                {/* OK circle */}
                <circle cx="35" cy="50" r="15" strokeWidth="1.5" />
                {/* Extended fingers */}
                <line x1="55" y1="60" x2="60" y2="20" strokeLinecap="round" />
                <line x1="68" y1="65" x2="80" y2="28" strokeLinecap="round" />
                <line x1="78" y1="75" x2="95" y2="45" strokeLinecap="round" />
              </>
            )}
          </g>

          {/* Tracking points */}
          {points.map((point) => (
            <g key={point.id}>
              <circle
                cx={point.x}
                cy={point.y}
                r={isCalibrating ? 3 : 2}
                fill={confidence > 80 ? '#22c55e' : '#4FD1FF'}
                className={`transition-all ${isCalibrating ? 'opacity-100' : 'opacity-50'}`}
              />
              {isCalibrating && (
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="6"
                  fill="none"
                  stroke={confidence > 80 ? '#22c55e' : '#4FD1FF'}
                  strokeWidth="0.5"
                  opacity="0.5"
                  className="animate-ping"
                />
              )}
            </g>
          ))}
        </svg>

        {/* Confidence indicator */}
        {isCalibrating && (
          <div className="absolute -bottom-8 sm:-bottom-10 left-1/2 -translate-x-1/2">
            <div className="glass-subtle rounded-full px-3 py-1 sm:px-4 sm:py-1.5">
              <span className={`text-[10px] sm:text-xs font-mono tracking-wider ${confidence > 80 ? 'text-green-400' : 'text-[#4FD1FF]'}`}>
                {Math.round(confidence)}% DETECTED
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function getGesturePoints(gesture: string): TrackingPoint[] {
  const basePoints: Record<string, Array<{x: number, y: number}>> = {
    open: [
      { x: 50, y: 15 }, { x: 50, y: 35 }, { x: 50, y: 53 },
      { x: 25, y: 22 }, { x: 30, y: 40 }, { x: 35, y: 58 },
      { x: 75, y: 22 }, { x: 70, y: 40 }, { x: 65, y: 58 },
      { x: 8, y: 45 }, { x: 15, y: 58 }, { x: 22, y: 70 },
      { x: 92, y: 45 }, { x: 85, y: 58 }, { x: 78, y: 70 },
      { x: 50, y: 85 },
    ],
    fist: [
      { x: 50, y: 35 }, { x: 35, y: 45 }, { x: 65, y: 45 },
      { x: 25, y: 60 }, { x: 75, y: 60 },
      { x: 15, y: 35 }, { x: 12, y: 45 },
      { x: 50, y: 95 },
    ],
    ok: [
      { x: 35, y: 35 }, { x: 35, y: 65 }, { x: 20, y: 50 }, { x: 50, y: 50 },
      { x: 60, y: 20 }, { x: 57, y: 40 }, { x: 55, y: 60 },
      { x: 80, y: 28 }, { x: 74, y: 47 }, { x: 68, y: 65 },
      { x: 95, y: 45 }, { x: 87, y: 60 }, { x: 78, y: 75 },
      { x: 50, y: 85 },
    ],
  }

  return (basePoints[gesture] || basePoints.open).map((p, i) => ({
    id: i,
    x: p.x,
    y: p.y,
    baseX: p.x,
    baseY: p.y,
  }))
}
