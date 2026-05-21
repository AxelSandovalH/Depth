'use client'

interface DepthIndicatorProps {
  depth: number
}

export function DepthIndicator({ depth }: DepthIndicatorProps) {
  const isDeep = depth > 30
  const isDanger = depth > 50
  
  return (
    <div className="absolute top-24 sm:top-28 right-3 sm:right-5 z-20">
      <div className="glass-subtle rounded-xl sm:rounded-2xl px-2.5 sm:px-3 py-2 sm:py-2.5 min-w-[52px] sm:min-w-[60px]">
        <div className="flex flex-col items-center">
          {/* Depth value */}
          <span className={`
            text-base sm:text-lg font-medium tabular-nums transition-colors
            ${isDanger ? 'text-red-400' : isDeep ? 'text-amber-400' : 'text-white/90'}
          `}>
            {depth.toFixed(1)}
          </span>
          
          {/* Unit */}
          <span className="text-[8px] sm:text-[9px] font-medium tracking-[0.1em] text-white/40 uppercase">
            meters
          </span>
          
          {/* Depth bar visualization */}
          <div className="mt-1.5 sm:mt-2 w-full h-12 sm:h-16 relative">
            <div className="absolute inset-0 rounded-full bg-white/5 overflow-hidden">
              <div 
                className={`
                  absolute bottom-0 left-0 right-0 rounded-full transition-all duration-500
                  ${isDanger ? 'bg-gradient-to-t from-red-500/60 to-red-500/20' : 
                    isDeep ? 'bg-gradient-to-t from-amber-400/60 to-amber-400/20' : 
                    'bg-gradient-to-t from-[#4FD1FF]/60 to-[#4FD1FF]/20'}
                `}
                style={{ height: `${Math.min(100, (depth / 60) * 100)}%` }}
              />
            </div>
            
            {/* Depth markers */}
            <div className="absolute left-1/2 top-0 w-px h-full">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-px bg-white/20" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-1.5 h-px bg-white/20" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-px bg-white/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
