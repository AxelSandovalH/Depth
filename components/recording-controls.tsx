'use client'

interface RecordingControlsProps {
  isLocked: boolean
  flashlightOn: boolean
  onToggleLock: () => void
  onEmergencyStop: () => void
  onToggleFlashlight: () => void
}

export function RecordingControls({ 
  isLocked, 
  flashlightOn, 
  onToggleLock, 
  onEmergencyStop, 
  onToggleFlashlight 
}: RecordingControlsProps) {
  return (
    <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-20 flex justify-center">
      <div className="flex items-center gap-6 sm:gap-8">
        {/* Lock Controls */}
        <button
          onClick={onToggleLock}
          className={`
            group w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center
            transition-all active:scale-95
            ${isLocked 
              ? 'bg-amber-400/15 border border-amber-400/40' 
              : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'}
          `}
          aria-label={isLocked ? 'Unlock controls' : 'Lock controls'}
        >
          {isLocked ? (
            <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white/50 group-hover:text-white/70 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          )}
        </button>

        {/* Emergency Stop */}
        <button
          onClick={onEmergencyStop}
          className="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center
            bg-red-500/10 border-2 border-red-500/40 
            hover:bg-red-500/20 hover:border-red-500/60 
            active:scale-95 transition-all"
          aria-label="Emergency stop recording"
        >
          {/* Stop icon */}
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-red-500" />
          
          {/* Subtle pulse ring */}
          <div className="absolute -inset-1 rounded-full border border-red-500/20 animate-ping-slow" />
        </button>

        {/* Flashlight */}
        <button
          onClick={onToggleFlashlight}
          className={`
            group w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center
            transition-all active:scale-95
            ${flashlightOn 
              ? 'bg-[#4FD1FF]/15 border border-[#4FD1FF]/40' 
              : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'}
          `}
          aria-label={flashlightOn ? 'Turn off flashlight' : 'Turn on flashlight'}
        >
          <svg 
            className={`w-5 h-5 sm:w-5.5 sm:h-5.5 transition-colors ${flashlightOn ? 'text-[#4FD1FF]' : 'text-white/50 group-hover:text-white/70'}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
          </svg>
        </button>
      </div>
    </div>
  )
}
