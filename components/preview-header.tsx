import Link from 'next/link'

interface PreviewHeaderProps {
  title: string
  date: string
  onShare: () => void
}

export function PreviewHeader({ title, date, onShare }: PreviewHeaderProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-30 safe-area-top">
      <div className="flex items-center justify-between px-4 sm:px-6 pt-12 sm:pt-14 pb-4">
        {/* Back button */}
        <Link 
          href="/gallery"
          className="glass rounded-full p-2.5 sm:p-3 hover:bg-white/10 transition-all active:scale-95"
          aria-label="Back to gallery"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </Link>
        
        {/* Title and date */}
        <div className="flex-1 text-center px-4">
          <h1 className="text-sm sm:text-base font-medium text-white/90 tracking-wide">{title}</h1>
          <p className="text-[10px] sm:text-xs text-white/40 mt-0.5">{date}</p>
        </div>
        
        {/* Share button */}
        <button 
          onClick={onShare}
          className="glass rounded-full p-2.5 sm:p-3 hover:bg-white/10 transition-all active:scale-95"
          aria-label="Share or export"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
          </svg>
        </button>
      </div>
    </div>
  )
}
