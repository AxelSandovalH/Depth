'use client'

interface SystemCheck {
  id: string
  label: string
  value: string
  status: 'ready' | 'warning' | 'checking'
}

interface ReadinessIndicatorsProps {
  checks: SystemCheck[]
}

const iconMap: Record<string, JSX.Element> = {
  battery: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5H18V15H4.5v-4.5ZM3.75 18h15A2.25 2.25 0 0 0 21 15.75v-6a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 1.5 9.75v6A2.25 2.25 0 0 0 3.75 18Z" />
    </svg>
  ),
  storage: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" />
    </svg>
  ),
  brightness: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
    </svg>
  ),
  gesture: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15" />
    </svg>
  ),
  seal: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  ),
  temperature: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
    </svg>
  ),
  stabilization: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
    </svg>
  ),
}

export function ReadinessIndicators({ checks }: ReadinessIndicatorsProps) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full max-w-[280px] sm:max-w-xs md:max-w-sm px-4">
      <div className="flex flex-col gap-3 sm:gap-4">
        {checks.map((check) => (
          <div 
            key={check.id}
            className="flex items-center justify-between py-2 sm:py-2.5 border-b border-white/5 last:border-b-0"
          >
            {/* Left side - icon and label */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Status indicator */}
              <div className={`
                w-1.5 h-1.5 rounded-full transition-all duration-500
                ${check.status === 'ready' ? 'bg-emerald-400' : 
                  check.status === 'warning' ? 'bg-amber-400' : 
                  'bg-white/20 animate-pulse'}
              `} />
              
              {/* Icon */}
              <div className={`
                transition-colors duration-500
                ${check.status === 'ready' ? 'text-white/60' : 
                  check.status === 'warning' ? 'text-amber-400/60' : 
                  'text-white/20'}
              `}>
                {iconMap[check.id]}
              </div>
              
              {/* Label */}
              <span className={`
                text-[11px] sm:text-xs tracking-wider transition-colors duration-500
                ${check.status === 'ready' ? 'text-white/70' : 
                  check.status === 'warning' ? 'text-amber-400/70' : 
                  'text-white/30'}
              `}>
                {check.label}
              </span>
            </div>
            
            {/* Right side - value */}
            <span className={`
              text-[10px] sm:text-[11px] font-medium tracking-wider transition-all duration-500
              ${check.status === 'ready' ? 'text-white/50' : 
                check.status === 'warning' ? 'text-amber-400/50' : 
                'text-white/20'}
            `}>
              {check.status === 'checking' ? '...' : check.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
