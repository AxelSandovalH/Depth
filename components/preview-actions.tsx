'use client'

interface PreviewActionsProps {
  isOpen: boolean
  onClose: () => void
}

export function PreviewActions({ isOpen, onClose }: PreviewActionsProps) {
  if (!isOpen) return null

  const actions = [
    { 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
        </svg>
      ),
      label: 'Export',
      color: 'text-[#4FD1FF]'
    },
    { 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
      ),
      label: 'Save to Photos',
      color: 'text-white/70'
    },
    { 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
        </svg>
      ),
      label: 'AirDrop',
      color: 'text-white/70'
    },
    { 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
      ),
      label: 'Delete Clip',
      color: 'text-red-400'
    },
  ]

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Actions panel */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-8 sm:pb-10">
        <div className="glass rounded-2xl sm:rounded-3xl overflow-hidden max-w-sm mx-auto">
          {actions.map((action, index) => (
            <button
              key={action.label}
              className={`
                w-full flex items-center gap-4 px-5 py-4 hover:bg-white/5 transition-colors active:bg-white/10
                ${index !== actions.length - 1 ? 'border-b border-white/5' : ''}
              `}
            >
              <span className={action.color}>{action.icon}</span>
              <span className={`text-sm font-medium ${action.color}`}>{action.label}</span>
            </button>
          ))}
        </div>
        
        {/* Cancel button */}
        <button
          onClick={onClose}
          className="glass w-full mt-3 py-4 rounded-2xl text-sm font-medium text-white/70 hover:bg-white/5 transition-colors max-w-sm mx-auto block"
        >
          Cancel
        </button>
      </div>
    </>
  )
}
