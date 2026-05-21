interface Step {
  gesture: string
  label: string
  action: string
  icon: string
}

interface CalibrationStepsProps {
  steps: Step[]
  currentStep: number
  completedSteps: number[]
}

export function CalibrationSteps({ steps, currentStep, completedSteps }: CalibrationStepsProps) {
  return (
    <div className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-20">
      <div className="flex flex-col gap-2 sm:gap-3">
        {steps.map((step, index) => {
          const isActive = index === currentStep
          const isComplete = completedSteps.includes(index)
          const isPending = index > currentStep && !isComplete

          return (
            <div
              key={step.gesture}
              className={`
                glass rounded-xl sm:rounded-2xl p-2 sm:p-3 w-[90px] sm:w-[110px] md:w-[130px] transition-all duration-300
                ${isActive ? 'border-[#4FD1FF]/40 bg-[#4FD1FF]/5' : ''}
                ${isComplete ? 'border-green-500/30 bg-green-500/5' : ''}
                ${isPending ? 'opacity-40' : ''}
              `}
            >
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5">
                {/* Status indicator */}
                <div className={`
                  w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all
                  ${isComplete ? 'bg-green-400' : isActive ? 'bg-[#4FD1FF] animate-pulse' : 'bg-white/20'}
                `} />
                <span className="text-[8px] sm:text-[9px] md:text-[10px] font-semibold tracking-[0.1em] text-white/50 uppercase">
                  Step {index + 1}
                </span>
              </div>
              
              {/* Gesture icon */}
              <div className={`
                text-lg sm:text-xl md:text-2xl mb-0.5 sm:mb-1 transition-all
                ${isActive ? 'grayscale-0' : 'grayscale opacity-60'}
              `}>
                {step.icon}
              </div>
              
              {/* Labels */}
              <div className="text-[9px] sm:text-[10px] md:text-xs font-medium text-white/80">
                {step.label}
              </div>
              <div className="text-[8px] sm:text-[9px] text-white/40 mt-0.5">
                {step.action}
              </div>

              {/* Checkmark for completed */}
              {isComplete && (
                <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
