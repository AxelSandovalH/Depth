'use client'

import { useState } from 'react'

export function EnhancementSuggestion() {
  const [dismissed, setDismissed] = useState(false)
  
  if (dismissed) return null

  return (
    <div className="absolute top-28 sm:top-32 right-4 sm:right-6 z-30">
      <div className="glass rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2.5 sm:gap-3 max-w-[200px] sm:max-w-[240px]">
        {/* AI sparkle icon */}
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#4FD1FF]/10 flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#4FD1FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
          </svg>
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-[10px] sm:text-xs font-medium text-white/80 leading-tight">
            Enhance Underwater Color
          </p>
          <p className="text-[9px] sm:text-[10px] text-white/40 mt-0.5">
            AI-powered correction
          </p>
        </div>
        
        {/* Dismiss button */}
        <button 
          onClick={() => setDismissed(true)}
          className="p-1 text-white/30 hover:text-white/60 transition-colors flex-shrink-0"
          aria-label="Dismiss"
        >
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
