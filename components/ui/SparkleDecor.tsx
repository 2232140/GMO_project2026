'use client'

import { motion } from 'framer-motion'

interface Spark {
  symbol: string
  top?: string
  bottom?: string
  left?: string
  right?: string
  size: string
  delay: number
  duration: number
  color: string
}

interface Props {
  variant?: 'title' | 'button' | 'card' | 'full'
  className?: string
}

const TITLE_SPARKS: Spark[] = [
  { symbol: '✦', top: '-18px',  right: '-14px', size: '1.4rem', delay: 0,    duration: 2.0, color: '#ffd700' },
  { symbol: '💖', top: '-10px',  left: '-18px',  size: '1.1rem', delay: 0.6,  duration: 2.3, color: '#ff69b4' },
  { symbol: '✨', bottom: '-8px', left: '10px',   size: '1.0rem', delay: 1.0,  duration: 1.8, color: '#c084fc' },
  { symbol: '⭐', bottom: '-12px',right: '8px',   size: '0.85rem',delay: 0.4,  duration: 2.5, color: '#ffd700' },
  { symbol: '✦', top: '0px',    left: '-24px',  size: '0.8rem', delay: 1.4,  duration: 2.1, color: '#7dd3fc' },
  { symbol: '💫', top: '30%',   right: '-22px', size: '1.0rem', delay: 0.9,  duration: 1.9, color: '#f9a8d4' },
]

const BUTTON_SPARKS: Spark[] = [
  { symbol: '✦', top: '-10px', right: '-8px',  size: '0.8rem', delay: 0,   duration: 1.8, color: '#ffd700' },
  { symbol: '✨', top: '-8px',  left: '-10px',  size: '0.7rem', delay: 0.7, duration: 2.0, color: '#f9a8d4' },
  { symbol: '💖', bottom: '-6px',right: '12px', size: '0.7rem', delay: 1.2, duration: 2.2, color: '#ff1493' },
]

const CARD_SPARKS: Spark[] = [
  { symbol: '✦', top: '-8px',   right: '-6px',  size: '0.7rem', delay: 0,   duration: 2.0, color: '#ffd700' },
  { symbol: '💖', bottom: '-6px',left: '-6px',   size: '0.65rem',delay: 0.8, duration: 1.9, color: '#ff69b4' },
]

const FULL_SPARKS: Spark[] = [
  ...TITLE_SPARKS,
  { symbol: '✦', top: '20%',  left: '-30px', size: '0.75rem',delay: 0.3, duration: 2.4, color: '#00e5ff' },
  { symbol: '💫', bottom:'20%',right:'-28px', size: '0.9rem', delay: 1.6, duration: 2.0, color: '#c084fc' },
]

const SPARKS_MAP: Record<string, Spark[]> = {
  title:  TITLE_SPARKS,
  button: BUTTON_SPARKS,
  card:   CARD_SPARKS,
  full:   FULL_SPARKS,
}

export default function SparkleDecor({ variant = 'title', className = '' }: Props) {
  const sparks = SPARKS_MAP[variant]

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden>
      {sparks.map((s, i) => (
        <motion.span
          key={i}
          className="absolute select-none"
          style={{
            top:    s.top,
            bottom: s.bottom,
            left:   s.left,
            right:  s.right,
            fontSize: s.size,
            color: s.color,
            lineHeight: 1,
            filter: `drop-shadow(0 0 4px ${s.color})`,
          }}
          animate={{
            opacity: [0.15, 1, 0.6, 1, 0.15],
            scale:   [0.7, 1.25, 0.9, 1.15, 0.7],
            rotate:  [0, 12, -6, 8, 0],
          }}
          transition={{
            duration: s.duration,
            delay:    s.delay,
            repeat:   Infinity,
            ease:     'easeInOut',
          }}
        >
          {s.symbol}
        </motion.span>
      ))}
    </div>
  )
}
