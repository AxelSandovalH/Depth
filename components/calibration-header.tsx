import Link from 'next/link'

export function CalibrationHeader() {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 safe-area-top">
      <div className="flex items-start justify-between px-4 sm:px-6 pt-12 sm:pt-14 pb-4">
        {/* Back button */}
        <Link 
          href="/"
          className="glass rounded-full p-2 sm:p-2.5 transition-all hover:border-white/20"
          aria-label="Back to home"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </Link>

        {/* Title */}
        <div className="flex flex-col items-center text-center flex-1 px-4">
          <h1 className="text-base sm:text-lg md:text-xl font-semibold tracking-[0.08em] sm:tracking-[0.1em] text-white/90">
            Gesture Calibration
          </h1>
          <p className="text-[10px] sm:text-xs text-white/40 tracking-wider mt-0.5 sm:mt-1">
            Train underwater gesture recognition
          </p>
        </div>

        {/* Spacer for alignment */}
        <div className="w-8 sm:w-10" />
      </div>
    </div>
  )
}
