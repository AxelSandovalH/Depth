import Link from 'next/link'

interface EnterDiveModeButtonProps {
  ready: boolean
}

export function EnterDiveModeButton({ ready }: EnterDiveModeButtonProps) {
  const ButtonWrapper = ready ? Link : 'div'
  
  return (
    <div className="absolute bottom-16 sm:bottom-20 left-0 right-0 z-20 flex justify-center">
      <ButtonWrapper
        {...(ready ? { href: '/recording' } : {})}
        className={`
          group relative transition-all duration-500
          ${ready ? 'opacity-100 cursor-pointer' : 'opacity-40 cursor-not-allowed'}
        `}
        aria-label="Enter dive mode"
      >
        {/* Outer glow */}
        {ready && (
          <div className="absolute -inset-4 sm:-inset-5 rounded-full bg-[#4FD1FF]/5 blur-xl animate-pulse" />
        )}
        
        {/* Outer ring */}
        <div className={`
          absolute -inset-2 sm:-inset-2.5 rounded-full border transition-all duration-500
          ${ready ? 'border-[#4FD1FF]/30 group-hover:border-[#4FD1FF]/50' : 'border-white/10'}
        `} />
        
        {/* Main button */}
        <div className={`
          relative px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border flex items-center justify-center transition-all duration-300
          ${ready 
            ? 'bg-gradient-to-b from-[#4FD1FF]/15 to-[#4FD1FF]/5 border-[#4FD1FF]/40 group-hover:from-[#4FD1FF]/25 group-hover:to-[#4FD1FF]/10 group-hover:border-[#4FD1FF]/60 group-active:scale-95' 
            : 'bg-white/5 border-white/10'}
        `}>
          {/* Button text */}
          <span className={`
            text-[10px] sm:text-xs font-medium tracking-[0.2em] sm:tracking-[0.25em] transition-colors duration-500
            ${ready ? 'text-[#4FD1FF]/90' : 'text-white/30'}
          `}>
            ENTER DIVE MODE
          </span>
        </div>
        
        {/* Subtle pulse when ready */}
        {ready && (
          <div className="absolute -inset-2 sm:-inset-2.5 rounded-full border border-[#4FD1FF]/20 animate-ping-slow" />
        )}
      </ButtonWrapper>
    </div>
  )
}
