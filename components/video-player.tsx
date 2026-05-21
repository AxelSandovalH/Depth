'use client'

interface VideoPlayerProps {
  isPlaying: boolean
}

export function VideoPlayer({ isPlaying }: VideoPlayerProps) {
  return (
    <div className="absolute inset-0 z-5 flex items-center justify-center">
      {/* Large centered play indicator (shown when paused) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white/80 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
          </div>
        </div>
      )}
      
      {/* Subtle underwater reflections */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-[#4FD1FF]/3 to-transparent opacity-50"
          style={{
            animation: isPlaying ? 'light-ray 6s ease-in-out infinite' : 'none'
          }}
        />
      </div>
      
      {/* Cinematic letterbox effect (optional for widescreen feel) */}
      <div className="absolute top-0 left-0 right-0 h-12 sm:h-16 bg-gradient-to-b from-[#040B14] to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 bg-gradient-to-t from-[#040B14] to-transparent z-10 pointer-events-none" />
    </div>
  )
}
