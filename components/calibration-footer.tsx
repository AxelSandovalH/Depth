import Link from 'next/link'

interface CalibrationFooterProps {
  isCalibrating: boolean
  isStepComplete: boolean
  allComplete: boolean
  confidence: number
  currentStep: number
  totalSteps: number
  onStartCalibration: () => void
  onContinue: () => void
  onRetry: () => void
}

export function CalibrationFooter({
  isCalibrating,
  isStepComplete,
  allComplete,
  confidence,
  currentStep,
  totalSteps,
  onStartCalibration,
  onContinue,
  onRetry,
}: CalibrationFooterProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 safe-area-bottom">
      <div className="flex flex-col items-center px-4 sm:px-6 pb-6 sm:pb-8 md:pb-10 pt-4">
        {/* Progress bar */}
        <div className="w-full max-w-[200px] sm:max-w-[240px] mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <span className="text-[9px] sm:text-[10px] font-medium tracking-wider text-white/40">
              PROGRESS
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono text-white/50">
              {currentStep + (isStepComplete ? 1 : 0)}/{totalSteps}
            </span>
          </div>
          <div className="h-1 sm:h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#4FD1FF] to-[#4FD1FF]/60 rounded-full transition-all duration-500"
              style={{ 
                width: `${((currentStep + (isStepComplete ? 1 : 0)) / totalSteps) * 100}%` 
              }}
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col items-center gap-2 sm:gap-3 w-full max-w-[200px] sm:max-w-[240px]">
          {allComplete ? (
            <Link
              href="/"
              className="w-full py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-green-500/20 border border-green-500/40 text-green-400 text-xs sm:text-sm font-semibold tracking-[0.1em] sm:tracking-[0.15em] text-center transition-all hover:bg-green-500/30"
            >
              COMPLETE
            </Link>
          ) : isStepComplete ? (
            <button
              onClick={onContinue}
              className="w-full py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#4FD1FF]/20 border border-[#4FD1FF]/40 text-[#4FD1FF] text-xs sm:text-sm font-semibold tracking-[0.1em] sm:tracking-[0.15em] transition-all hover:bg-[#4FD1FF]/30"
            >
              CONTINUE
            </button>
          ) : (
            <button
              onClick={onStartCalibration}
              disabled={isCalibrating}
              className={`
                w-full py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold tracking-[0.1em] sm:tracking-[0.15em] transition-all
                ${isCalibrating 
                  ? 'bg-[#4FD1FF]/10 border border-[#4FD1FF]/20 text-[#4FD1FF]/60 cursor-not-allowed' 
                  : 'bg-[#4FD1FF]/20 border border-[#4FD1FF]/40 text-[#4FD1FF] hover:bg-[#4FD1FF]/30'
                }
              `}
            >
              {isCalibrating ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  SCANNING...
                </span>
              ) : (
                'CALIBRATE GESTURE'
              )}
            </button>
          )}

          {/* Retry button */}
          {(isStepComplete && !allComplete) && (
            <button
              onClick={onRetry}
              className="text-[10px] sm:text-xs font-medium tracking-wider text-white/40 hover:text-white/60 transition-colors"
            >
              Retry Calibration
            </button>
          )}
        </div>

        {/* Calibration hint */}
        {!isCalibrating && !isStepComplete && (
          <p className="text-[9px] sm:text-[10px] text-white/30 text-center mt-3 sm:mt-4 max-w-[200px] sm:max-w-[240px]">
            Position your hand in the frame and hold the gesture
          </p>
        )}
      </div>
    </div>
  )
}
