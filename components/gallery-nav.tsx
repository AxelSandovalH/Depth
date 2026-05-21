import Link from 'next/link'

export function GalleryNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 safe-area-bottom">
      <div className="flex justify-center pb-4 sm:pb-6">
        <div className="glass rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center gap-6 sm:gap-8">
          {/* Home */}
          <Link 
            href="/"
            className="group flex flex-col items-center gap-1"
            aria-label="Home"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white/40 group-hover:text-white/70 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </Link>
          
          {/* Record */}
          <Link 
            href="/preparation"
            className="group flex flex-col items-center gap-1"
            aria-label="Start dive"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#4FD1FF]/20 border border-[#4FD1FF]/40 flex items-center justify-center group-hover:bg-[#4FD1FF]/30 group-hover:border-[#4FD1FF]/60 transition-all">
              <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#4FD1FF]" />
            </div>
          </Link>
          
          {/* Settings */}
          <Link 
            href="/settings"
            className="group flex flex-col items-center gap-1"
            aria-label="Settings"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white/40 group-hover:text-white/70 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
