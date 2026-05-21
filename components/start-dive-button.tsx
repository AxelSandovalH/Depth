import Link from 'next/link'

export function StartDiveButton() {
  return (
    <div className="absolute bottom-28 sm:bottom-32 md:bottom-36 left-0 right-0 z-20 flex justify-center">
      <Link
        href="/preparation"
        className="group relative"
        aria-label="Start dive recording"
      >
        {/* Outer glow ring */}
        <div className="absolute -inset-3 sm:-inset-4 rounded-full bg-[#4FD1FF]/5 blur-xl group-hover:bg-[#4FD1FF]/10 transition-all duration-500" />
        
        {/* Outer ring */}
        <div className="absolute -inset-2 sm:-inset-3 rounded-full border border-[#4FD1FF]/20 group-hover:border-[#4FD1FF]/40 transition-all duration-300" />
        
        {/* Main button */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-b from-[#4FD1FF]/15 to-[#4FD1FF]/5 border border-[#4FD1FF]/30 flex items-center justify-center group-hover:from-[#4FD1FF]/25 group-hover:to-[#4FD1FF]/10 group-hover:border-[#4FD1FF]/50 transition-all duration-300 group-active:scale-95">
          {/* Inner subtle ring */}
          <div className="absolute inset-2 sm:inset-3 rounded-full border border-[#4FD1FF]/10" />
          
          {/* Button text */}
          <div className="flex flex-col items-center gap-0.5 sm:gap-1">
            <span className="text-[10px] sm:text-xs font-medium tracking-[0.2em] sm:tracking-[0.25em] text-[#4FD1FF]/90">
              START
            </span>
            <span className="text-[10px] sm:text-xs font-medium tracking-[0.2em] sm:tracking-[0.25em] text-[#4FD1FF]/90">
              DIVE
            </span>
          </div>
        </div>
        
        {/* Soft animated pulse */}
        <div className="absolute -inset-2 sm:-inset-3 rounded-full border border-[#4FD1FF]/10 animate-ping-slow opacity-50" />
      </Link>
    </div>
  )
}
