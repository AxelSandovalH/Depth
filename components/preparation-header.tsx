import Link from 'next/link'

export function PreparationHeader() {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 safe-area-top">
      <div className="flex flex-col items-center pt-12 sm:pt-14 md:pt-16 px-4">
        {/* Back button */}
        <Link 
          href="/"
          className="absolute left-4 sm:left-6 top-12 sm:top-14 flex items-center gap-1.5 text-white/40 hover:text-white/60 transition-colors"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          <span className="text-[10px] sm:text-xs tracking-wider hidden sm:inline">Back</span>
        </Link>

        {/* Title */}
        <h1 className="text-sm sm:text-base md:text-lg font-medium tracking-[0.2em] sm:tracking-[0.25em] text-white/90">
          Dive Preparation
        </h1>
        
        {/* Subtitle */}
        <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-white/40 tracking-wider">
          System check before entering dive mode
        </p>
      </div>
    </div>
  )
}
