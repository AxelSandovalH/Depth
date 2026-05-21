'use client'

export function DepthBranding() {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
      {/* Logo Mark */}
      <div className="relative mb-4 sm:mb-6">
        <svg 
          viewBox="0 0 60 60" 
          className="w-12 h-12 sm:w-16 sm:h-16 text-white/80"
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
        >
          {/* Depth wave rings */}
          <circle cx="30" cy="30" r="28" strokeOpacity="0.2" />
          <circle cx="30" cy="30" r="20" strokeOpacity="0.3" />
          <circle cx="30" cy="30" r="12" strokeOpacity="0.5" />
          <circle cx="30" cy="30" r="4" fill="currentColor" stroke="none" opacity="0.8" />
        </svg>
        
        {/* Subtle glow behind logo */}
        <div className="absolute inset-0 blur-xl bg-[#4FD1FF]/10 rounded-full scale-150" />
      </div>

      {/* App Name */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-[0.4em] sm:tracking-[0.5em] text-white/90 mb-2">
        DEPTH
      </h1>
      
      {/* Subtle tagline */}
      <p className="text-[9px] sm:text-[10px] tracking-[0.25em] text-white/30 uppercase">
        Underwater Recording
      </p>
    </div>
  )
}
