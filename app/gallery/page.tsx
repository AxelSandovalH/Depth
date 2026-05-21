'use client'

import { useState } from 'react'
import { UnderwaterParticles } from '@/components/underwater-particles'
import { GalleryHeader } from '@/components/gallery-header'
import { DiveGrid } from '@/components/dive-grid'
import { GalleryNav } from '@/components/gallery-nav'

// Mock data for dive recordings
const mockDives = [
  { id: 1, duration: '04:32', date: 'May 18, 2026', depth: 12, location: 'Coral Bay', thumbnail: 1 },
  { id: 2, duration: '07:15', date: 'May 15, 2026', depth: 24, location: 'Blue Hole', thumbnail: 2 },
  { id: 3, duration: '03:48', date: 'May 12, 2026', depth: 8, location: 'Reef Point', thumbnail: 3 },
  { id: 4, duration: '11:22', date: 'May 10, 2026', depth: 31, location: 'Deep Wall', thumbnail: 4 },
  { id: 5, duration: '05:56', date: 'May 8, 2026', depth: 15, location: 'Turtle Cove', thumbnail: 5 },
  { id: 6, duration: '08:44', date: 'May 5, 2026', depth: 19, location: 'Manta Point', thumbnail: 6 },
]

export default function GalleryPage() {
  const [filter, setFilter] = useState<'all' | 'recent' | 'longest'>('all')
  const [selectedDive, setSelectedDive] = useState<number | null>(null)

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      {/* Background atmosphere */}
      <UnderwaterParticles />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#040B14] via-transparent to-[#040B14]/90 pointer-events-none z-10" />
      
      {/* Header */}
      <GalleryHeader filter={filter} onFilterChange={setFilter} />
      
      {/* Main content */}
      <div className="relative z-20 pt-28 sm:pt-32 pb-24 sm:pb-28 px-3 sm:px-4 md:px-6">
        <DiveGrid 
          dives={mockDives} 
          selectedDive={selectedDive}
          onSelectDive={setSelectedDive}
        />
      </div>
      
      {/* Bottom navigation */}
      <GalleryNav />
    </main>
  )
}
