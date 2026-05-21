'use client'

interface RecordingStatusBarProps {
  recordingTime: string
  batteryLevel: number
  storageRemaining: number
}

export function RecordingStatusBar({ recordingTime, batteryLevel, storageRemaining }: RecordingStatusBarProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-20">
      <div className="flex items-center justify-between px-4 sm:px-6 pt-12 sm:pt-14 pb-2">
        {/* Recording Status - Left */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* REC indicator */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500 animate-rec-pulse" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.15em] text-red-500">REC</span>
          </div>
          
          {/* Timer */}
          <div className="glass-subtle rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5">
            <span className="text-xs sm:text-sm font-mono tracking-wider text-white/90">{recordingTime}</span>
          </div>
        </div>
        
        {/* System Status - Right */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Storage */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
            </svg>
            <span className="text-[10px] sm:text-xs font-medium text-white/50">{storageRemaining}GB</span>
          </div>
          
          {/* Battery */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            <div className="relative w-5 h-2.5 sm:w-6 sm:h-3">
              <div className="absolute inset-0 rounded-sm border border-white/30" />
              <div className="absolute right-[-2px] sm:right-[-3px] top-1/2 -translate-y-1/2 w-[1.5px] sm:w-[2px] h-1 sm:h-1.5 bg-white/30 rounded-r-sm" />
              <div 
                className="absolute left-[1.5px] sm:left-[2px] top-[1.5px] sm:top-[2px] bottom-[1.5px] sm:bottom-[2px] rounded-sm transition-all"
                style={{ 
                  width: `${Math.max(0, batteryLevel - 8)}%`,
                  backgroundColor: batteryLevel > 20 ? '#4FD1FF' : '#ff4444'
                }}
              />
            </div>
            <span className="text-[10px] sm:text-xs font-medium text-white/50">{batteryLevel}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
