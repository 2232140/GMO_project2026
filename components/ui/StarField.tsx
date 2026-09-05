'use client'

import { useEffect, useRef } from 'react'

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const stars: { x: number; y: number; r: number; alpha: number; speed: number; color: string }[] = []
    const colors = ['#ff1493', '#9b59b6', '#00bfff', '#ffd700', '#ffffff', '#00ff88']

    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        alpha: Math.random(),
        speed: Math.random() * 0.015 + 0.005,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    let frame = 0
    let animId: number

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frame += 0.01

      stars.forEach((star, i) => {
        const pulse = Math.sin(frame * star.speed * 60 + i) * 0.5 + 0.5
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r * (0.5 + pulse * 0.5), 0, Math.PI * 2)
        ctx.fillStyle = star.color
        ctx.globalAlpha = pulse * 0.8 + 0.1
        ctx.fill()
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
      style={{ opacity: 0.6 }}
    />
  )
}
