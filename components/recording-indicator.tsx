'use client'

export function RecordingIndicator() {
  return (
    <div className="absolute bottom-28 sm:bottom-32 left-0 right-0 z-10 flex justify-center pointer-events-none">
      {/* Cinematic recording pulse */}
      <div className="relative">
        {/* Outer soft glow */}
        <div className="absolute -inset-6 sm:-inset-8 rounded-full bg-red-500/10 blur-2xl animate-pulse" />
        
        {/* Middle ring */}
        <div className="absolute -inset-3 sm:-inset-4 rounded-full border border-red-500/20 animate-ping-slow" />
        
        {/* Inner ring */}
        <div className="absolute -inset-1.5 sm:-inset-2 rounded-full border border-red-500/30" />
        
        {/* Core dot */}
        <div className="relative w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500 animate-rec-pulse shadow-lg shadow-red-500/50" />
      </div>
    </div>
  )
}
