'use client'

interface Dive {
  id: number
  duration: string
  date: string
  depth: number
  location: string
  thumbnail: number
}

interface DiveGridProps {
  dives: Dive[]
  selectedDive: number | null
  onSelectDive: (id: number | null) => void
}

// Cinematic underwater gradient thumbnails
const thumbnailGradients = [
  'from-[#0a2540] via-[#0d3a5c] to-[#041520]',
  'from-[#071826] via-[#0f4060] to-[#051a2a]',
  'from-[#0B2239] via-[#145080] to-[#061525]',
  'from-[#082030] via-[#0c3550] to-[#040f18]',
  'from-[#0a2845] via-[#126090] to-[#051820]',
  'from-[#061525] via-[#0d4570] to-[#031015]',
]

export function DiveGrid({ dives, selectedDive, onSelectDive }: DiveGridProps) {
  if (dives.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        {/* Empty state illustration */}
        <div className="relative w-24 h-24 sm:w-32 sm:h-32">
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#4FD1FF]/10 to-transparent" />
          <div className="absolute inset-4 rounded-full border border-[#4FD1FF]/20" />
          <svg className="absolute inset-0 w-full h-full p-6 sm:p-8 text-[#4FD1FF]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-sm sm:text-base text-white/70 font-light">No Dive Sessions Yet</p>
          <p className="text-[10px] sm:text-xs text-white/30 mt-1">Your underwater recordings will appear here.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:gap-4">
      {dives.map((dive, index) => (
        <button
          key={dive.id}
          onClick={() => onSelectDive(selectedDive === dive.id ? null : dive.id)}
          className={`
            group relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden
            transition-all duration-300 ease-out
            ${selectedDive === dive.id 
              ? 'ring-2 ring-[#4FD1FF]/60 scale-[0.98]' 
              : 'hover:scale-[1.02] active:scale-[0.98]'
            }
          `}
        >
          {/* Thumbnail gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${thumbnailGradients[index % thumbnailGradients.length]}`} />
          
          {/* Subtle underwater caustics effect */}
          <div className="absolute inset-0 opacity-20">
            <div 
              className="absolute top-0 left-1/4 w-[60%] h-[60%] rounded-full bg-[#4FD1FF]/20 blur-2xl"
              style={{ transform: `translateY(${index * 10}%)` }}
            />
          </div>
          
          {/* Glass overlay on hover/select */}
          <div className={`
            absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent
            transition-opacity duration-300
            ${selectedDive === dive.id ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}
          `} />
          
          {/* Duration badge */}
          <div className="absolute top-2 sm:top-2.5 right-2 sm:right-2.5">
            <div className="glass-subtle rounded-md px-1.5 sm:px-2 py-0.5 sm:py-1">
              <span className="text-[9px] sm:text-[10px] font-mono text-white/80">{dive.duration}</span>
            </div>
          </div>
          
          {/* Depth indicator */}
          <div className="absolute top-2 sm:top-2.5 left-2 sm:left-2.5">
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#4FD1FF]/60" />
              <span className="text-[8px] sm:text-[9px] text-[#4FD1FF]/70 font-medium">{dive.depth}m</span>
            </div>
          </div>
          
          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
            <p className="text-[10px] sm:text-xs font-medium text-white/90 truncate">{dive.location}</p>
            <p className="text-[8px] sm:text-[10px] text-white/40 mt-0.5">{dive.date}</p>
          </div>
          
          {/* Play icon on hover */}
          <div className={`
            absolute inset-0 flex items-center justify-center
            transition-opacity duration-300
            ${selectedDive === dive.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
          `}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/90 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5.14v14l11-7-11-7z" />
              </svg>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}
