'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ItemCard } from '@/lib/types'

/* ── レア度 ── */
const RARITY_STARS: Record<string, number> = {
  normal: 1, rare: 2, 'super-rare': 3, legend: 5,
}
const RARITY_BADGE_LABEL: Record<string, string> = {
  normal: 'N', rare: 'R', 'super-rare': 'SR', legend: 'UR',
}

/* ── カテゴリ別ヘッダー色 ── */
const CATEGORY_HEADER: Record<string, string> = {
  tops:    'linear-gradient(90deg,#ff69b4,#ff1493)',
  bottoms: 'linear-gradient(90deg,#c040e0,#8020c0)',
  shoes:   'linear-gradient(90deg,#40a0ff,#0060d0)',
  bag:     'linear-gradient(90deg,#ffb020,#ff8000)',
  cosme:   'linear-gradient(90deg,#ff4080,#ff1060)',
}

/* ── サイズ ── */
const SIZE_W   = { sm: 80,  md: 112, lg: 144 }
const SIZE_H   = { sm: 112, md: 160, lg: 208 }
const EMOJI_SZ = { sm: '1.6rem', md: '2.2rem', lg: '2.8rem' }
const NAME_SZ  = { sm: '0.46rem', md: '0.56rem', lg: '0.66rem' }

/* ── レースドット (SVG data-URL) ── */
const LACE_SVG = `url("data:image/svg+xml,%3Csvg width='12' height='12' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='6' cy='6' r='1.2' fill='rgba(255,255,255,0.30)'/%3E%3Ccircle cx='0' cy='0' r='0.7' fill='rgba(255,255,255,0.20)'/%3E%3Ccircle cx='12' cy='0' r='0.7' fill='rgba(255,255,255,0.20)'/%3E%3Ccircle cx='0' cy='12' r='0.7' fill='rgba(255,255,255,0.20)'/%3E%3Ccircle cx='12' cy='12' r='0.7' fill='rgba(255,255,255,0.20)'/%3E%3C/svg%3E")`

interface Props {
  card: ItemCard
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  selected?: boolean
  className?: string
}

export default function HolographicCard({
  card, size = 'md', onClick, selected, className = '',
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt,     setTilt]     = useState({ x: 0, y: 0 })
  const [holoPos,  setHoloPos]  = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const w = SIZE_W[size]
  const h = SIZE_H[size]
  const stars    = RARITY_STARS[card.rarity] ?? 1
  const isLegend = card.rarity === 'legend'
  const isSR     = card.rarity === 'super-rare'

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top)  / rect.height
    setTilt({ x: (y - 0.5) * 24, y: (x - 0.5) * -24 })
    setHoloPos({ x: x * 100, y: y * 100 })
  }
  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setHoloPos({ x: 50, y: 50 })
    setIsHovered(false)
  }

  /* ── シルバーフレームの枠幅（サイズ別） ── */
  const FRAME = size === 'lg' ? 7 : size === 'md' ? 6 : 5

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative cursor-pointer select-none ${className}`}
      style={{
        width:  w, height: h,
        transform: isHovered
          ? `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.06)`
          : 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: isHovered ? 'transform 0.08s ease' : 'transform 0.42s ease',
        isolation: 'isolate',
      }}
    >
      {/* ━━━ 1. ホログラムアニメーション外枠 ━━━ */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: -3, borderRadius: 16,
          background: 'linear-gradient(90deg,#ff1493,#ff8fd8,#d8a0ff,#7eb6ff,#00e5ff,#00ff99,#ffd700,#ff8fd8,#ff1493)',
          backgroundSize: '400% 100%',
          animation: 'holoRotate 3s linear infinite',
          opacity: isLegend ? 1 : isSR ? 0.85 : 0.65,
          zIndex: -1,
        }}
      />

      {/* ━━━ 2. シルバーメタリックフレーム ━━━ */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: 13,
          background: 'linear-gradient(145deg,#f5f5ff 0%,#d8d8ee 25%,#c0c0d8 50%,#d8d8ee 75%,#f0f0ff 100%)',
          boxShadow: [
            'inset 0 1px 3px rgba(255,255,255,0.95)',
            'inset 0 -1px 2px rgba(100,100,150,0.40)',
            selected ? '0 0 0 2px white, 0 0 0 4px rgba(255,100,200,0.8)' : '',
          ].filter(Boolean).join(', '),
        }}
      />

      {/* ── コーナースター ── */}
      {(['tl','tr','bl','br'] as const).map((pos, i) => (
        <span
          key={pos}
          className="absolute text-amber-400 star-twinkle pointer-events-none"
          style={{
            fontSize: size === 'lg' ? '0.6rem' : '0.50rem',
            top:    pos.startsWith('t') ? FRAME - 1 : undefined,
            bottom: pos.startsWith('b') ? FRAME - 1 : undefined,
            left:   pos.endsWith('l')   ? FRAME - 1 : undefined,
            right:  pos.endsWith('r')   ? FRAME - 1 : undefined,
            animationDelay: `${i * 0.3}s`,
            zIndex: 20,
            lineHeight: 1,
            filter: 'drop-shadow(0 0 3px #ffd700)',
          }}
        >
          ★
        </span>
      ))}

      {/* ━━━ 3. カード内エリア ━━━ */}
      <div
        className="absolute overflow-hidden"
        style={{
          inset: FRAME,
          borderRadius: 8,
          display: 'flex', flexDirection: 'column',
        }}
      >
        {/* ── ヘッダー: カテゴリーラベル ── */}
        <div
          style={{
            background: CATEGORY_HEADER[card.category] ?? 'linear-gradient(90deg,#ff69b4,#ff1493)',
            padding: `${size === 'lg' ? 3 : 2}px ${size === 'lg' ? 6 : 4}px`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexShrink: 0,
          }}
        >
          <span style={{
            fontSize: size === 'lg' ? '0.42rem' : '0.36rem',
            color: 'rgba(255,255,255,0.95)', fontWeight: 900,
            letterSpacing: '0.06em', textShadow: '0 1px 2px rgba(0,0,0,0.4)',
          }}>
            MIRROR GRAPH
          </span>
          {/* レアリティバッジ */}
          <span style={{
            fontSize: size === 'lg' ? '0.42rem' : '0.36rem',
            background: isLegend ? 'linear-gradient(135deg,#ffd700,#ff8000)' :
                        isSR     ? 'linear-gradient(135deg,#c080ff,#8040d0)' :
                        card.rarity === 'rare' ? 'linear-gradient(135deg,#60c0ff,#2080d0)' :
                        'rgba(255,255,255,0.30)',
            color: 'white', fontWeight: 900,
            padding: '1px 4px', borderRadius: 99,
            boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
          }}>
            {RARITY_BADGE_LABEL[card.rarity]}
          </span>
        </div>

        {/* ── メインエリア ── */}
        <div
          className="relative flex-1 flex flex-col items-center"
          style={{ overflow: 'hidden' }}
        >
          {/* グラデーション背景 */}
          <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`} />

          {/* レースドットパターン */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: LACE_SVG, backgroundSize: '12px 12px' }}
          />

          {/* ホログラム虹光彩 (ホバー時) */}
          {(isLegend || isSR) && (
            <div
              className="absolute inset-0 pointer-events-none mix-blend-overlay"
              style={{
                background: `radial-gradient(circle at ${holoPos.x}% ${holoPos.y}%, rgba(255,255,255,0.85) 0%, transparent 60%)`,
                opacity: isHovered ? 0.50 : 0.20,
                transition: 'background 0.08s, opacity 0.4s',
              }}
            />
          )}
          {isLegend && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(${holoPos.x * 3.6}deg,#ff1493,#c040e0,#40a0ff,#00e5a0,#ffd700,#ff1493)`,
                mixBlendMode: 'screen', opacity: isHovered ? 0.30 : 0.15,
              }}
            />
          )}

          {/* ── カテゴリアイコン (丸レースバッジ) ── */}
          <div
            className="relative flex-shrink-0 flex items-center justify-center"
            style={{
              marginTop: size === 'lg' ? 6 : 4,
              width:  size === 'lg' ? 32 : size === 'md' ? 26 : 20,
              height: size === 'lg' ? 32 : size === 'md' ? 26 : 20,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.92)',
              boxShadow: [
                '0 0 0 2px rgba(255,150,210,0.80)',
                '0 0 0 3.5px rgba(255,255,255,0.85)',
                '0 0 0 5px rgba(255,150,210,0.40)',
                '0 2px 6px rgba(200,0,100,0.30)',
              ].join(', '),
              zIndex: 5,
            }}
          >
            <span style={{ fontSize: size === 'lg' ? '1.0rem' : size === 'md' ? '0.8rem' : '0.6rem', lineHeight: 1 }}>
              {card.emoji}
            </span>
          </div>

          {/* ── 絵文字メイン ── */}
          <div className="flex-1 flex items-center justify-center" style={{ zIndex: 5 }}>
            <span
              style={{
                fontSize: EMOJI_SZ[size],
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.35)) drop-shadow(0 0 8px rgba(255,255,255,0.5))',
              }}
            >
              {card.emoji}
            </span>
          </div>

          {/* ── レアリティ星 ── */}
          <div className="flex gap-0.5 mb-1" style={{ zIndex: 5 }}>
            {Array.from({ length: stars }).map((_, i) => (
              <span
                key={i}
                className="star-twinkle"
                style={{
                  fontSize: size === 'lg' ? '0.55rem' : '0.42rem',
                  color: isLegend ? '#ffd700' : '#ffb0d8',
                  filter: `drop-shadow(0 0 2px ${isLegend ? '#ffd700' : '#ff69b4'})`,
                  animationDelay: `${i * 0.2}s`,
                }}
              >
                ★
              </span>
            ))}
          </div>

          {/* コーナーデコレーション */}
          <span className="absolute top-1 left-1 star-twinkle" style={{ fontSize:'0.4rem', color:'rgba(255,255,255,0.8)', filter:'drop-shadow(0 0 2px white)' }}>✦</span>
          <span className="absolute top-1 right-1 star-twinkle" style={{ fontSize:'0.4rem', color:'rgba(255,255,255,0.8)', animationDelay:'0.5s', filter:'drop-shadow(0 0 2px white)' }}>✦</span>
        </div>

        {/* ━━━ 4. ネームプレート ━━━ */}
        <div
          style={{
            background: 'linear-gradient(180deg,rgba(255,255,255,0.95) 0%,rgba(255,240,250,0.98) 100%)',
            borderTop: '1.5px solid rgba(255,150,210,0.50)',
            padding: `${size === 'lg' ? 4 : 3}px ${size === 'lg' ? 6 : 4}px`,
            flexShrink: 0,
          }}
        >
          <p style={{
            fontSize: NAME_SZ[size],
            fontWeight: 900,
            color: '#cc0077',
            textAlign: 'center',
            lineHeight: 1.25,
            textShadow: '0 1px 0 rgba(255,150,200,0.3)',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}>
            {card.name}
          </p>
          {card.brand && (
            <p style={{
              fontSize: size === 'lg' ? '0.40rem' : '0.34rem',
              color: '#aa80a0',
              textAlign: 'center',
              marginTop: 1,
              fontWeight: 600,
            }}>
              {card.brand}
            </p>
          )}
        </div>
      </div>

      {/* ━━━ Legend パルスグロウ ━━━ */}
      {isLegend && (
        <motion.div
          className="absolute pointer-events-none"
          style={{ inset: -6, borderRadius: 18, zIndex: -2 }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div style={{
            width: '100%', height: '100%', borderRadius: 18,
            background: 'radial-gradient(ellipse, rgba(255,215,0,0.6) 0%, transparent 70%)',
          }} />
        </motion.div>
      )}

      {/* Hover shine */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: 13, zIndex: 15,
          background: `linear-gradient(105deg,transparent 40%,rgba(255,255,255,${isHovered ? 0.22 : 0}) 50%,transparent 60%)`,
          transition: 'all 0.25s ease',
        }}
      />

      {/* Legend 外部スパークル */}
      {isLegend && (
        <>
          <span className="absolute star-twinkle" style={{ top:-6, right:-5, fontSize:'0.7rem', color:'#ffd700', filter:'drop-shadow(0 0 4px #ffd700)', zIndex:25 }}>✦</span>
          <span className="absolute star-twinkle" style={{ bottom:-5, left:-5, fontSize:'0.65rem', color:'#ff69b4', filter:'drop-shadow(0 0 4px #ff69b4)', animationDelay:'0.5s', zIndex:25 }}>💖</span>
        </>
      )}
    </div>
  )
}
