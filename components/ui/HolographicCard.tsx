'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ItemCard } from '@/lib/types'

const RARITY_LABELS: Record<string, string> = {
  normal:       'N',
  rare:         'R',
  'super-rare': 'SR',
  legend:       'UR',
}

const RARITY_BADGE: Record<string, string> = {
  normal:       'bg-slate-500/70 text-slate-100',
  rare:         'bg-sky-500/80   text-white',
  'super-rare': 'bg-violet-500/80 text-white',
  legend:       'bg-amber-400/90 text-amber-900',
}

// ホログラムボーダーの強度（レア度別）
const HOLO_OPACITY: Record<string, number> = {
  normal:       0.6,
  rare:         0.8,
  'super-rare': 1.0,
  legend:       1.0,
}

interface Props {
  card: ItemCard
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  selected?: boolean
  className?: string
}

export default function HolographicCard({
  card,
  size = 'md',
  onClick,
  selected,
  className = '',
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt]       = useState({ x: 0, y: 0 })
  const [holoPos, setHoloPos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = { sm: 'w-20 h-28', md: 'w-28 h-40', lg: 'w-36 h-52' }
  const emojiSize   = { sm: '1.5rem', md: '2.1rem', lg: '2.8rem' }
  const textSize    = { sm: '0.50rem', md: '0.58rem', lg: '0.68rem' }

  const isLegend = card.rarity === 'legend'
  const isSR     = card.rarity === 'super-rare'

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top)  / rect.height
    setTilt({ x: (y - 0.5) * 22, y: (x - 0.5) * -22 })
    setHoloPos({ x: x * 100, y: y * 100 })
  }
  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setHoloPos({ x: 50, y: 50 })
    setIsHovered(false)
  }

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`
        relative ${sizeClasses[size]} rounded-2xl cursor-pointer select-none
        border-2 rarity-${card.rarity}
        ${selected ? 'ring-3 ring-white ring-offset-2 ring-offset-transparent' : ''}
        ${className}
      `}
      style={{
        transform: isHovered
          ? `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.06)`
          : 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: isHovered ? 'transform 0.08s ease' : 'transform 0.40s ease',
        isolation: 'isolate',
      }}
    >
      {/* ── 虹色ホログラムボーダー (全レア度) ── */}
      <div
        className="absolute -inset-[2px] rounded-[18px] -z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg,#ff1493,#ff8fd8,#d8a0ff,#7eb6ff,#00e5ff,#00ff99,#ffd700,#ff8fd8,#ff1493)',
          backgroundSize: '400% 100%',
          animation: 'holoRotate 3.5s linear infinite',
          opacity: HOLO_OPACITY[card.rarity],
        }}
      />

      {/* ── カードベース ── */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.gradient} opacity-85`} />

      {/* ── ガラス質感レイヤー ── */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      />

      {/* ── ホログラム光彩 (SR/UR) ── */}
      {(isLegend || isSR) && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none mix-blend-overlay"
          style={{
            background: `radial-gradient(circle at ${holoPos.x}% ${holoPos.y}%, rgba(255,255,255,0.9) 0%, transparent 55%)`,
            opacity: 0.45,
            transition: 'background 0.08s ease',
          }}
        />
      )}

      {/* ── 虹スペクトル (UR) ── */}
      {isLegend && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `linear-gradient(${holoPos.x * 3.6}deg,#ff1493,#9b59b6,#00bfff,#00ff99,#ffd700,#ff1493)`,
            mixBlendMode: 'screen',
            opacity: 0.28,
          }}
        />
      )}

      {/* ── グロス (上半分のつやハイライト) ── */}
      <div
        className="absolute rounded-2xl pointer-events-none"
        style={{
          top: 3, left: 5, right: 5,
          height: '42%',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.40) 0%, transparent 100%)',
          borderRadius: '14px 14px 50% 50% / 8px 8px 20px 20px',
        }}
      />

      {/* ── コンテンツ ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-between p-2 rounded-2xl z-10">
        {/* レアリティバッジ */}
        <div className="w-full flex justify-between items-center">
          <span className={`text-[0.48rem] font-black px-1.5 py-0.5 rounded-full ${RARITY_BADGE[card.rarity]}`}>
            {RARITY_LABELS[card.rarity]}
          </span>
          {isLegend && (
            <span className="star-twinkle text-amber-300" style={{ fontSize: '0.65rem' }}>⭐</span>
          )}
          {isSR && (
            <span className="star-twinkle text-violet-200" style={{ fontSize: '0.60rem', animationDelay:'0.4s' }}>✦</span>
          )}
        </div>

        {/* 絵文字 */}
        <div className="flex-1 flex items-center justify-center">
          <span
            className="drop-shadow-lg"
            style={{ fontSize: emojiSize[size], filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.4))' }}
          >
            {card.emoji}
          </span>
        </div>

        {/* 名前 */}
        <div className="w-full text-center">
          <p
            className="text-white font-bold leading-tight drop-shadow"
            style={{ fontSize: textSize[size], lineHeight: 1.2, textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}
          >
            {card.name}
          </p>
          {card.brand && (
            <p className="text-white/55 mt-0.5" style={{ fontSize: '0.42rem' }}>
              {card.brand}
            </p>
          )}
        </div>
      </div>

      {/* ── Shine on hover ── */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none z-20"
        style={{
          background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,${isHovered ? 0.18 : 0}) 50%, transparent 60%)`,
          transition: 'all 0.25s ease',
        }}
      />

      {/* ── Legend outer glow pulse ── */}
      {isLegend && (
        <motion.div
          className="absolute -inset-[3px] rounded-[20px] pointer-events-none -z-20"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: 'radial-gradient(ellipse, rgba(255,215,0,0.6) 0%, transparent 70%)',
          }}
        />
      )}

      {/* ── スパークル装飾 ── */}
      {isLegend && (
        <>
          <span className="absolute -top-2 -right-2 text-amber-300 star-twinkle z-30"
            style={{ fontSize:'0.75rem', filter:'drop-shadow(0 0 4px #ffd700)' }}>✦</span>
          <span className="absolute -bottom-2 -left-2 text-pink-300 star-twinkle z-30"
            style={{ fontSize:'0.70rem', animationDelay:'0.6s', filter:'drop-shadow(0 0 4px #ff69b4)' }}>💖</span>
        </>
      )}
      {isSR && (
        <span className="absolute -top-1.5 -right-1.5 text-violet-300 star-twinkle z-30"
          style={{ fontSize:'0.65rem', filter:'drop-shadow(0 0 3px #c084fc)' }}>✦</span>
      )}
    </div>
  )
}
