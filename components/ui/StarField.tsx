'use client'

import { useEffect, useRef } from 'react'

interface Gem {
  x: number; y: number
  size: number; alpha: number
  speed: number; phase: number
  type: 'star4' | 'diamond' | 'heart' | 'sparkle' | 'circle'
  color: string
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

    const colors = [
      '#ffffff', '#ffe0f5', '#ffb6d9', '#ff69b4',  // whites / pinks
      '#e8d5ff', '#d0a8ff', '#b8e0ff',              // lavender / sky
      '#ffd700', '#ffe880', '#f0c8e8',              // gold / light
      '#c8f0ff', '#b8ffd8',                          // mint / cyan
    ]
    const types: Gem['type'][] = ['star4','diamond','heart','sparkle','circle','star4','star4']

    const gems: Gem[] = Array.from({ length: 80 }, () => ({
      x:      Math.random() * window.innerWidth,
      y:      Math.random() * window.innerHeight,
      size:   Math.random() * 10 + 4,
      alpha:  Math.random(),
      speed:  Math.random() * 0.012 + 0.004,
      phase:  Math.random() * Math.PI * 2,
      type:   types[Math.floor(Math.random() * types.length)],
      color:  colors[Math.floor(Math.random() * colors.length)],
    }))

    /* --- Draw helpers --- */
    const drawStar4 = (x: number, y: number, r: number) => {
      ctx.beginPath()
      for (let i = 0; i < 8; i++) {
        const angle  = (i * Math.PI) / 4
        const radius = i % 2 === 0 ? r : r * 0.4
        if (i === 0) ctx.moveTo(x + radius * Math.cos(angle), y + radius * Math.sin(angle))
        else ctx.lineTo(x + radius * Math.cos(angle), y + radius * Math.sin(angle))
      }
      ctx.closePath()
      ctx.fill()
    }

    const drawDiamond = (x: number, y: number, r: number) => {
      ctx.beginPath()
      ctx.moveTo(x,       y - r * 1.4)
      ctx.lineTo(x + r,   y)
      ctx.lineTo(x,       y + r * 1.4)
      ctx.lineTo(x - r,   y)
      ctx.closePath()
      ctx.fill()
    }

    const drawHeart = (x: number, y: number, r: number) => {
      ctx.beginPath()
      ctx.moveTo(x, y + r * 0.7)
      ctx.bezierCurveTo(x - r * 1.2, y - r * 0.6, x - r * 1.5, y - r * 1.5, x, y - r * 0.4)
      ctx.bezierCurveTo(x + r * 1.5, y - r * 1.5, x + r * 1.2, y - r * 0.6, x, y + r * 0.7)
      ctx.closePath()
      ctx.fill()
    }

    const drawSparkle = (x: number, y: number, r: number) => {
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2
        ctx.beginPath()
        ctx.ellipse(
          x + (r * 1.2 * 0.5) * Math.cos(angle),
          y + (r * 1.2 * 0.5) * Math.sin(angle),
          r * 0.25, r * 1.0, angle, 0, Math.PI * 2
        )
        ctx.fill()
      }
    }

    let frame = 0
    let animId: number

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frame += 0.01

      gems.forEach((gem, i) => {
        const pulse = (Math.sin(frame * gem.speed * 60 + gem.phase + i * 0.7) + 1) / 2
        const alpha = pulse * 0.70 + 0.08
        const size  = gem.size * (0.6 + pulse * 0.6)

        ctx.save()
        ctx.globalAlpha = alpha
        ctx.fillStyle   = gem.color

        // glow
        if (alpha > 0.6) {
          const grd = ctx.createRadialGradient(gem.x, gem.y, 0, gem.x, gem.y, size * 3)
          grd.addColorStop(0, gem.color.replace(')', ',0.35)').replace('rgb', 'rgba'))
          grd.addColorStop(1, 'rgba(255,255,255,0)')
          ctx.fillStyle = grd
          ctx.beginPath()
          ctx.arc(gem.x, gem.y, size * 3, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillStyle = gem.color
        }

        switch (gem.type) {
          case 'star4':    drawStar4(gem.x, gem.y, size); break
          case 'diamond':  drawDiamond(gem.x, gem.y, size * 0.8); break
          case 'heart':    drawHeart(gem.x, gem.y, size * 0.7); break
          case 'sparkle':  drawSparkle(gem.x, gem.y, size); break
          default:
            ctx.beginPath()
            ctx.arc(gem.x, gem.y, size * 0.5, 0, Math.PI * 2)
            ctx.fill()
        }

        // inner white highlight
        if (gem.type !== 'heart') {
          ctx.globalAlpha = alpha * 0.55
          ctx.fillStyle   = 'rgba(255,255,255,0.9)'
          ctx.beginPath()
          ctx.arc(gem.x - size * 0.2, gem.y - size * 0.25, size * 0.22, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()
      })

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
      style={{ opacity: 0.70 }}
    />
  )
}
