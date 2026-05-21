'use client'

import { useEffect, useRef } from 'react'

interface CameraPreviewProps {
  isActive: boolean
}

export function CameraPreview({ isActive }: CameraPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Simulated underwater scene
    let animationFrame: number
    let time = 0

    const render = () => {
      time += 0.01
      
      // Deep ocean gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, '#0B2239')
      gradient.addColorStop(0.3, '#071826')
      gradient.addColorStop(0.7, '#051520')
      gradient.addColorStop(1, '#040B14')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Light rays from surface
      ctx.save()
      for (let i = 0; i < 5; i++) {
        const x = canvas.width * (0.2 + i * 0.15)
        const rayGradient = ctx.createLinearGradient(x, 0, x - 100, canvas.height)
        rayGradient.addColorStop(0, 'rgba(79, 209, 255, 0.08)')
        rayGradient.addColorStop(0.5, 'rgba(79, 209, 255, 0.03)')
        rayGradient.addColorStop(1, 'rgba(79, 209, 255, 0)')
        
        ctx.fillStyle = rayGradient
        ctx.beginPath()
        ctx.moveTo(x - 30 + Math.sin(time + i) * 10, 0)
        ctx.lineTo(x + 30 + Math.sin(time + i) * 10, 0)
        ctx.lineTo(x - 150 + Math.sin(time + i) * 20, canvas.height)
        ctx.lineTo(x - 210 + Math.sin(time + i) * 20, canvas.height)
        ctx.closePath()
        ctx.fill()
      }
      ctx.restore()

      // Subtle caustic patterns
      ctx.save()
      ctx.globalAlpha = 0.03
      for (let i = 0; i < 8; i++) {
        const cx = Math.sin(time * 0.5 + i) * 200 + canvas.width / 2
        const cy = Math.cos(time * 0.3 + i * 0.5) * 100 + canvas.height * 0.3
        const radius = 100 + Math.sin(time + i) * 30
        
        const causticGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
        causticGradient.addColorStop(0, 'rgba(79, 209, 255, 0.3)')
        causticGradient.addColorStop(1, 'rgba(79, 209, 255, 0)')
        ctx.fillStyle = causticGradient
        ctx.beginPath()
        ctx.arc(cx, cy, radius, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()

      // Vignette effect
      const vignetteGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, canvas.height * 0.3,
        canvas.width / 2, canvas.height / 2, canvas.height * 0.9
      )
      vignetteGradient.addColorStop(0, 'rgba(4, 11, 20, 0)')
      vignetteGradient.addColorStop(1, 'rgba(4, 11, 20, 0.7)')
      ctx.fillStyle = vignetteGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      if (isActive) {
        animationFrame = requestAnimationFrame(render)
      }
    }

    render()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrame)
    }
  }, [isActive])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-label="Underwater camera preview"
    />
  )
}
