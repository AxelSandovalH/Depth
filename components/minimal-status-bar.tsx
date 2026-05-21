'use client'

interface MinimalStatusBarProps {
  gesturesActive: boolean
  storageRemaining: number
  batteryLevel: number
}

export function MinimalStatusBar({ gesturesActive, storageRemaining, batteryLevel }: MinimalStatusBarProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 safe-area-top">
      <div className="flex items-center justify-between px-4 sm:px-6 pt-12 sm:pt-14 pb-2">
        {/* Ready Status */}
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
          <span className="text-[10px] sm:text-xs font-medium tracking-[0.15em] text-white/60 uppercase">
            Ready
          </span>
        </div>

        {/* Right Status Icons */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Gestures */}
          <div className="flex items-center gap-1.5">
            <svg 
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${gesturesActive ? 'text-[#4FD1FF]' : 'text-white/30'}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15" />
            </svg>
          </div>

          {/* Storage */}
          <span className="text-[10px] sm:text-xs font-medium text-white/40">
            {storageRemaining}GB
          </span>

          {/* Battery */}
          <div className="flex items-center gap-1">
            <div className="relative w-5 h-2.5 sm:w-6 sm:h-3">
              <div className="absolute inset-0 rounded-sm border border-white/30" />
              <div className="absolute right-[-2px] sm:right-[-3px] top-1/2 -translate-y-1/2 w-[1.5px] sm:w-[2px] h-1 sm:h-1.5 bg-white/30 rounded-r-sm" />
              <div 
                className="absolute left-[1.5px] sm:left-[2px] top-[1.5px] sm:top-[2px] bottom-[1.5px] sm:bottom-[2px] rounded-sm bg-white/50"
                style={{ width: `${Math.max(0, batteryLevel - 8)}%` }}
              />
            </div>
            <span className="text-[10px] sm:text-xs font-medium text-white/40">{batteryLevel}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
