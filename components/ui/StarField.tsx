'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number; y: number; r: number
  alpha: number; speed: number; color: string
  shape: 'circle' | 'cross' | 'diamond'
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // ネオンポップY2Kカラーパレット
    const colors = [
      '#ff1493', '#ff69b4', '#ff8fd8',   // pinks
      '#c084fc', '#a855f7', '#9b59b6',   // purples
      '#7dd3fc', '#38bdf8', '#00bfff',   // sky blues
      '#ffd700', '#fbbf24',              // golds
      '#ffffff', '#f9a8d4',              // whites / soft pink
      '#00ff99', '#86efac',              // mint
    ]
    const shapes: Star['shape'][] = ['circle', 'cross', 'diamond']

    const stars: Star[] = Array.from({ length: 150 }, () => ({
      x:      Math.random() * window.innerWidth,
      y:      Math.random() * window.innerHeight,
      r:      Math.random() * 2.2 + 0.4,
      alpha:  Math.random(),
      speed:  Math.random() * 0.018 + 0.006,
      color:  colors[Math.floor(Math.random() * colors.length)],
      shape:  shapes[Math.floor(Math.random() * shapes.length)],
    }))

    let frame = 0
    let animId: number

    const drawCross = (x: number, y: number, r: number) => {
      ctx.fillRect(x - r * 2.5, y - r * 0.5, r * 5, r)
      ctx.fillRect(x - r * 0.5, y - r * 2.5, r, r * 5)
    }

    const drawDiamond = (x: number, y: number, r: number) => {
      ctx.beginPath()
      ctx.moveTo(x,       y - r * 2)
      ctx.lineTo(x + r,   y)
      ctx.lineTo(x,       y + r * 2)
      ctx.lineTo(x - r,   y)
      ctx.closePath()
      ctx.fill()
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frame += 0.01

      stars.forEach((star, i) => {
        const pulse = (Math.sin(frame * star.speed * 60 + i * 1.7) + 1) / 2
        const alpha = pulse * 0.75 + 0.08
        ctx.fillStyle = star.color
        ctx.globalAlpha = alpha

        if (star.shape === 'circle') {
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.r * (0.6 + pulse * 0.6), 0, Math.PI * 2)
          ctx.fill()
        } else if (star.shape === 'cross') {
          drawCross(star.x, star.y, star.r * (0.5 + pulse * 0.5))
        } else {
          drawDiamond(star.x, star.y, star.r * (0.5 + pulse * 0.5))
        }

        // Glow effect for bright stars
        if (alpha > 0.7) {
          ctx.globalAlpha = alpha * 0.25
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.r * 4, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      ctx.globalAlpha = 1
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.75 }}
    />
  )
}
