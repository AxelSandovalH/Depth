'use client'

interface GalleryHeaderProps {
  filter: 'all' | 'recent' | 'longest'
  onFilterChange: (filter: 'all' | 'recent' | 'longest') => void
}

export function GalleryHeader({ filter, onFilterChange }: GalleryHeaderProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-30 safe-area-top">
      <div className="flex items-start justify-between px-4 sm:px-5 md:px-6 pt-12 sm:pt-14 md:pt-16">
        {/* Title */}
        <div className="flex flex-col gap-1">
          <h1 className="text-lg sm:text-xl md:text-2xl font-light tracking-wide text-white/90">
            Dive Library
          </h1>
          <p className="text-[10px] sm:text-xs text-white/40 tracking-wide">
            Captured underwater sessions
          </p>
        </div>
        
        {/* Filter dropdown */}
        <div className="relative">
          <button 
            className="glass rounded-xl p-2.5 sm:p-3 hover:bg-white/10 transition-all group"
            aria-label="Filter recordings"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/50 group-hover:text-white/70 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
