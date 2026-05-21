'use client'

import { useEffect, useState } from 'react'

interface GestureFeedbackProps {
  status: 'active' | 'detected' | 'locked'
}

export function GestureFeedback({ status }: GestureFeedbackProps) {
  const [visible, setVisible] = useState(true)
  
  // Fade in/out on status change
  useEffect(() => {
    setVisible(true)
    const timeout = setTimeout(() => setVisible(false), 3000)
    return () => clearTimeout(timeout)
  }, [status])

  const statusText = {
    active: 'GESTURES ACTIVE',
    detected: 'HAND DETECTED',
    locked: 'TRACKING LOCKED'
  }

  const statusColor = {
    active: 'text-white/40',
    detected: 'text-[#4FD1FF]/70',
    locked: 'text-emerald-400/70'
  }

  return (
    <div className={`
      absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10
      transition-all duration-700
      ${visible ? 'opacity-100' : 'opacity-0'}
    `}>
      {/* Subtle floating indicator */}
      <div className="flex flex-col items-center gap-2">
        {/* Status icon */}
        <div className={`
          w-8 h-8 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center
          transition-all duration-500
          ${status === 'locked' ? 'border-emerald-400/30 bg-emerald-400/5' : 
            status === 'detected' ? 'border-[#4FD1FF]/30 bg-[#4FD1FF]/5' : 
            'border-white/10 bg-white/5'}
        `}>
          {status === 'locked' ? (
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          ) : status === 'detected' ? (
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#4FD1FF]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15" />
            </svg>
          ) : (
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/30 animate-pulse" />
          )}
        </div>
        
        {/* Status text */}
        <span className={`
          text-[9px] sm:text-[10px] font-medium tracking-[0.2em] sm:tracking-[0.25em]
          transition-colors duration-500
          ${statusColor[status]}
        `}>
          {statusText[status]}
        </span>
      </div>
    </div>
  )
}
