'use client'

interface PlaybackControlsProps {
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  onPlayPause: () => void
  onSeek: (time: number) => void
  onVolumeChange: (volume: number) => void
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function PlaybackControls({ 
  isPlaying, 
  currentTime, 
  duration, 
  onPlayPause, 
  onSeek,
}: PlaybackControlsProps) {
  const progress = (currentTime / duration) * 100

  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = x / rect.width
    onSeek(Math.floor(percentage * duration))
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 z-30">
      <div className="px-4 sm:px-6 pb-8 sm:pb-10 pt-16 bg-gradient-to-t from-[#040B14] via-[#040B14]/80 to-transparent">
        {/* Timeline scrubber */}
        <div 
          className="relative h-1 sm:h-1.5 bg-white/10 rounded-full mb-4 cursor-pointer group"
          onClick={handleScrubberClick}
        >
          {/* Progress bar */}
          <div 
            className="absolute left-0 top-0 bottom-0 bg-[#4FD1FF] rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
          {/* Scrubber handle */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ left: `calc(${progress}% - 6px)` }}
          />
        </div>
        
        {/* Controls row */}
        <div className="flex items-center justify-between">
          {/* Timestamp */}
          <div className="flex items-center gap-1.5 min-w-[70px] sm:min-w-[90px]">
            <span className="text-xs sm:text-sm font-mono text-white/90">{formatTime(currentTime)}</span>
            <span className="text-[10px] sm:text-xs text-white/30">/</span>
            <span className="text-[10px] sm:text-xs font-mono text-white/40">{formatTime(duration)}</span>
          </div>
          
          {/* Center controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Rewind 10s */}
            <button 
              className="p-2 text-white/50 hover:text-white/80 transition-colors active:scale-95"
              onClick={() => onSeek(Math.max(0, currentTime - 10))}
              aria-label="Rewind 10 seconds"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 0 1 0-1.953l7.108-4.062A1.125 1.125 0 0 1 21 8.688v8.123ZM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 0 1 0-1.953l7.108-4.062a1.125 1.125 0 0 1 1.683.977v8.123Z" />
              </svg>
            </button>
            
            {/* Play/Pause */}
            <button 
              className="glass w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center hover:bg-white/15 transition-all active:scale-95"
              onClick={onPlayPause}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              )}
            </button>
            
            {/* Forward 10s */}
            <button 
              className="p-2 text-white/50 hover:text-white/80 transition-colors active:scale-95"
              onClick={() => onSeek(Math.min(duration, currentTime + 10))}
              aria-label="Forward 10 seconds"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 0 1 0 1.953l-7.108 4.062A1.125 1.125 0 0 1 3 16.81V8.688ZM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 0 1 0 1.953l-7.108 4.062a1.125 1.125 0 0 1-1.683-.977V8.688Z" />
              </svg>
            </button>
          </div>
          
          {/* Volume */}
          <div className="flex items-center justify-end min-w-[70px] sm:min-w-[90px]">
            <button 
              className="p-2 text-white/50 hover:text-white/80 transition-colors"
              aria-label="Volume"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
