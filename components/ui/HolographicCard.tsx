'use client'

import { useRef, useState } from 'react'
import { ItemCard } from '@/lib/types'

const RARITY_LABELS: Record<string, string> = {
  normal: 'N',
  rare: 'R',
  'super-rare': 'SR',
  legend: 'UR',
}

const RARITY_COLORS: Record<string, string> = {
  normal: 'text-slate-300',
  rare: 'text-sky-300',
  'super-rare': 'text-violet-300',
  legend: 'text-amber-300',
}

interface Props {
  card: ItemCard
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  selected?: boolean
  className?: string
}

export default function HolographicCard({ card, size = 'md', onClick, selected, className = '' }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [holoPos, setHoloPos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    sm: 'w-20 h-28',
    md: 'w-28 h-40',
    lg: 'w-36 h-52',
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setTilt({ x: (y - 0.5) * 20, y: (x - 0.5) * -20 })
    setHoloPos({ x: x * 100, y: y * 100 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setHoloPos({ x: 50, y: 50 })
    setIsHovered(false)
  }

  const isLegend = card.rarity === 'legend'
  const isSR = card.rarity === 'super-rare'

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`
        relative ${sizeClasses[size]} rounded-2xl cursor-pointer select-none
        rarity-${card.rarity} border-2
        ${selected ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent' : ''}
        ${className}
      `}
      style={{
        transform: isHovered
          ? `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.05)`
          : 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: isHovered ? 'transform 0.1s ease' : 'transform 0.4s ease',
      }}
    >
      {/* Card base */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.gradient} opacity-80`} />

      {/* Holographic overlay */}
      {(isLegend || isSR) && (
        <div
          className="absolute inset-0 rounded-2xl opacity-40 mix-blend-overlay pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${holoPos.x}% ${holoPos.y}%, rgba(255,255,255,0.8) 0%, transparent 60%)`,
            transition: 'background 0.1s ease',
          }}
        />
      )}

      {/* Rainbow shimmer for legend */}
      {isLegend && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-30"
          style={{
            background: `linear-gradient(${holoPos.x * 3.6}deg, #ff1493, #9b59b6, #00bfff, #00ff88, #ffd700, #ff1493)`,
            mixBlendMode: 'screen',
          }}
        />
      )}

      {/* Card content */}
      <div className="absolute inset-0 flex flex-col items-center justify-between p-2 rounded-2xl">
        {/* Top: rarity */}
        <div className="w-full flex justify-between items-center">
          <span className={`text-xs font-black ${RARITY_COLORS[card.rarity]} drop-shadow`}>
            {RARITY_LABELS[card.rarity]}
          </span>
          {isLegend && <span className="text-xs">⭐</span>}
        </div>

        {/* Center: emoji */}
        <div className="flex-1 flex items-center justify-center">
          <span
            className="drop-shadow-lg"
            style={{ fontSize: size === 'lg' ? '2.5rem' : size === 'md' ? '2rem' : '1.4rem' }}
          >
            {card.emoji}
          </span>
        </div>

        {/* Bottom: name */}
        <div className="w-full text-center">
          <p
            className="text-white font-bold leading-tight drop-shadow"
            style={{ fontSize: size === 'lg' ? '0.65rem' : '0.55rem', lineHeight: 1.2 }}
          >
            {card.name}
          </p>
          {card.brand && (
            <p className="text-white/60 mt-0.5" style={{ fontSize: '0.45rem' }}>
              {card.brand}
            </p>
          )}
        </div>
      </div>

      {/* Shine overlay on hover */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,${isHovered ? 0.15 : 0}) 50%, transparent 60%)`,
          transition: 'all 0.3s ease',
        }}
      />

      {/* Legend sparkles */}
      {isLegend && (
        <>
          <div className="absolute -top-1 -right-1 text-xs star-twinkle">✦</div>
          <div className="absolute -bottom-1 -left-1 text-xs star-twinkle" style={{ animationDelay: '0.5s' }}>✦</div>
        </>
      )}
    </div>
  )
}
