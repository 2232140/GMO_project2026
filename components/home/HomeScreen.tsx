'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Settings } from 'lucide-react'

const ZEN_FONT = 'var(--font-zen-maru-gothic), var(--font-nunito), sans-serif'

const OUTLINE = {
  textShadow: [
    '-2px -2px 0 white', ' 2px -2px 0 white',
    '-2px  2px 0 white', ' 2px  2px 0 white',
    '0 0 12px rgba(255,255,255,0.75)',
  ].join(', '),
}

/* ── floating sparkle config ── */
const PARTICLES = [
  { symbol: '✦', left: '6%',  size: '1.1rem', dur: 4.2, delay: 0.0, color: '#ffd700' },
  { symbol: '★', left: '87%', size: '0.85rem', dur: 3.6, delay: 0.7, color: '#ff69b4' },
  { symbol: '✦', left: '14%', size: '0.75rem', dur: 5.0, delay: 1.5, color: '#c0a0ff' },
  { symbol: '💖', left: '92%', size: '0.9rem',  dur: 4.5, delay: 0.3, color: '#ff69b4' },
  { symbol: '✦', left: '3%',  size: '1.0rem',  dur: 3.8, delay: 2.1, color: '#ffd700' },
  { symbol: '★', left: '78%', size: '0.8rem',  dur: 4.8, delay: 0.9, color: '#c0a0ff' },
  { symbol: '💫', left: '50%', size: '1.0rem', dur: 5.2, delay: 1.8, color: '#ffffff' },
  { symbol: '✦', left: '68%', size: '0.7rem',  dur: 3.4, delay: 2.8, color: '#ffd700' },
  { symbol: '★', left: '22%', size: '0.9rem',  dur: 4.1, delay: 0.5, color: '#ff69b4' },
  { symbol: '✦', left: '95%', size: '0.8rem',  dur: 4.7, delay: 3.2, color: '#00e5ff' },
  { symbol: '💖', left: '38%', size: '0.75rem', dur: 3.9, delay: 1.1, color: '#ff69b4' },
  { symbol: '✦', left: '55%', size: '1.2rem',  dur: 5.5, delay: 2.4, color: '#ffd700' },
]

/* ── logo sparkle positions ── */
const LOGO_SPARKLES = [
  { top: '-10px', right: '12%', delay: 0.0 },
  { top: '-6px',  left: '18%',  delay: 0.7 },
  { bottom: '-4px', right: '22%', delay: 1.4 },
]

export default function HomeScreen() {
  const router = useRouter()

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: "url('/img/wall.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
      }}
    >
      {/* ── Aurora overlay ── */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'linear-gradient(135deg, rgba(255,20,147,0.20), rgba(160,40,220,0.26), rgba(40,100,255,0.18), rgba(255,20,147,0.16))',
          backgroundSize: '400% 400%',
          animation: 'auroraShift 9s ease-in-out infinite',
        }}
      />

      {/* ── Floating particles ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
        {PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            style={{
              position: 'absolute',
              left: p.left,
              bottom: `${10 + (i * 17) % 35}%`,
              fontSize: p.size,
              color: p.color,
              filter: `drop-shadow(0 0 5px ${p.color})`,
              userSelect: 'none',
              lineHeight: 1,
            }}
            animate={{
              y: [0, -260],
              opacity: [0, 0.95, 0.8, 0],
            }}
            transition={{
              duration: p.dur,
              delay: p.delay,
              repeat: Infinity,
              repeatDelay: p.dur * 0.8,
              ease: 'easeOut',
            }}
          >
            {p.symbol}
          </motion.span>
        ))}
      </div>

      {/* ── Main layout ── */}
      <div
        style={{
          position: 'relative', zIndex: 3,
          height: '100dvh',
          maxWidth: 430,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingTop: 'max(12px, var(--safe-top))',
          paddingBottom: 'max(20px, calc(var(--safe-bottom) + 12px))',
          paddingLeft: 16,
          paddingRight: 16,
          boxSizing: 'border-box',
        }}
      >

        {/* ① 設定ボタン */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 160 }}
          whileTap={{ scale: 0.93 }}
          onClick={() => router.push('/settings')}
          style={{ position: 'absolute', top: 'max(12px, var(--safe-top))', right: 12, zIndex: 10, width: 110 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/Logo_Frame.png" alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <Settings style={{ width: 16, height: 16, flexShrink: 0, color: '#5030a0' }} />
            <span style={{ fontFamily: ZEN_FONT, fontSize: '0.875rem', fontWeight: 900, color: '#5030a0', ...OUTLINE }}>
              設定
            </span>
          </div>
        </motion.button>

        {/* ② ロゴ */}
        <motion.div
          initial={{ opacity: 0, y: -22, scale: 0.86 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, type: 'spring', stiffness: 120, damping: 14 }}
          style={{ flexShrink: 0, marginTop: 40, display: 'flex', justifyContent: 'center', position: 'relative' }}
        >
          {/* Glow halo behind logo */}
          <motion.div
            style={{
              position: 'absolute',
              inset: '-18px -28px',
              background: 'radial-gradient(ellipse, rgba(255,160,240,0.7) 0%, rgba(180,60,255,0.4) 40%, transparent 72%)',
              filter: 'blur(14px)',
              pointerEvents: 'none',
            }}
            animate={{ opacity: [0.45, 1, 0.45], scale: [0.93, 1.07, 0.93] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/logo.png"
            alt="MIRROR GRAPH"
            style={{
              maxHeight: '18vh', width: 'auto', maxWidth: '100%', display: 'block', position: 'relative',
              filter: 'drop-shadow(0 0 10px rgba(255,130,210,0.9)) drop-shadow(0 0 28px rgba(200,60,255,0.55))',
            }}
          />

          {/* Logo sparkles */}
          {LOGO_SPARKLES.map((s, i) => (
            <motion.span
              key={i}
              style={{ position: 'absolute', ...s, fontSize: '1.05rem', color: '#ffd700', filter: 'drop-shadow(0 0 5px #ffd700)', pointerEvents: 'none', lineHeight: 1 }}
              animate={{ opacity: [0, 1, 0], scale: [0.4, 1.4, 0.4], rotate: [0, 40, 0] }}
              transition={{ duration: 2.2, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
            >
              ✦
            </motion.span>
          ))}
        </motion.div>

        {/* ③ Hero cards */}
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.91 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.16, type: 'spring', stiffness: 105, damping: 16 }}
          style={{ flexShrink: 0, display: 'flex', justifyContent: 'center', position: 'relative' }}
        >
          {/* Ground glow */}
          <div style={{
            position: 'absolute', bottom: -16, left: '50%', transform: 'translateX(-50%)',
            width: '72%', height: 36,
            background: 'radial-gradient(ellipse, rgba(255,80,200,0.75) 0%, rgba(160,40,255,0.4) 45%, transparent 72%)',
            filter: 'blur(16px)',
            pointerEvents: 'none',
          }} />

          {/* Floating wrapper */}
          <motion.div
            style={{ position: 'relative', width: '72%' }}
            animate={{ y: [0, -9, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/hero-cards.png"
              alt="カードコレクション"
              style={{
                width: '100%', height: 'auto', display: 'block',
                filter: 'drop-shadow(0 12px 32px rgba(120,30,200,0.65)) drop-shadow(0 4px 14px rgba(255,60,180,0.5))',
              }}
            />
            {/* Light sweep */}
            <motion.div
              style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(105deg, transparent 28%, rgba(255,255,255,0.6) 50%, transparent 72%)',
                pointerEvents: 'none',
                overflow: 'hidden',
              }}
              animate={{ x: ['-130%', '230%'] }}
              transition={{ duration: 1.2, delay: 2.5, repeat: Infinity, repeatDelay: 6.5, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>

        {/* ④⑤ ボタン群 */}
        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>

          {/* ④ メインCTAボタン */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.30, type: 'spring', stiffness: 175 }}
            style={{ position: 'relative', width: '100%' }}
          >
            {/* Rainbow glow behind button */}
            <motion.div
              style={{
                position: 'absolute', inset: '-5px -8px',
                background: 'linear-gradient(135deg, #ff1493, #c040e0, #40a0ff, #ffd700, #ff1493)',
                backgroundSize: '400% 400%',
                borderRadius: 18,
                filter: 'blur(10px)',
                zIndex: 0,
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                opacity: [0.55, 0.95, 0.55],
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.button
              whileTap={{ scale: 0.97, y: 3 }}
              onClick={() => router.push('/deck')}
              style={{ position: 'relative', width: '100%', zIndex: 1 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/Logo_Frame.png" alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />

              {/* Shimmer sweep */}
              <motion.div
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(105deg, transparent 33%, rgba(255,255,255,0.5) 50%, transparent 67%)',
                  borderRadius: 8, pointerEvents: 'none', zIndex: 3,
                  overflow: 'hidden',
                }}
                animate={{ x: ['-130%', '230%'] }}
                transition={{ duration: 0.95, delay: 5, repeat: Infinity, repeatDelay: 7, ease: 'easeOut' }}
              />

              <div style={{
                position: 'absolute', inset: 0, zIndex: 2,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
              }}>
                <p style={{
                  margin: 0, fontFamily: ZEN_FONT,
                  fontSize: 'clamp(1.05rem, 5vw, 1.35rem)',
                  fontWeight: 900, lineHeight: 1.2, color: '#3a1890', ...OUTLINE,
                }}>
                  今日のデッキを組む
                </p>
                <p style={{
                  margin: 0, fontFamily: ZEN_FONT,
                  fontSize: 'clamp(0.65rem, 2.8vw, 0.82rem)',
                  fontWeight: 700, color: '#6848b0',
                  textShadow: '0 1px 3px rgba(255,255,255,0.95)',
                }}>
                  カードスロットを自分でセット ✦
                </p>
              </div>
            </motion.button>
          </motion.div>

          {/* ⑤ サブボタン 2列 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>

            <motion.button
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.38, type: 'spring', stiffness: 175 }}
              whileTap={{ scale: 0.95, y: 2 }}
              onClick={() => router.push('/create')}
              style={{ position: 'relative', width: '100%' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/Logo_Frame.png" alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '0 6px' }}>
                <div style={{
                  flexShrink: 0, width: 32, height: 32,
                  backgroundImage: "url('/img/deco_2.png')",
                  backgroundSize: '200% auto', backgroundPosition: '0% 50%', backgroundRepeat: 'no-repeat',
                }} />
                <span style={{ fontFamily: ZEN_FONT, fontSize: 'clamp(0.75rem, 3.6vw, 0.95rem)', fontWeight: 900, lineHeight: 1.25, textAlign: 'left', color: '#3a1890', ...OUTLINE }}>
                  カードを<br />つくる
                </span>
              </div>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.44, type: 'spring', stiffness: 175 }}
              whileTap={{ scale: 0.95, y: 2 }}
              onClick={() => router.push('/binder')}
              style={{ position: 'relative', width: '100%' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/Logo_Frame.png" alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '0 6px' }}>
                <div style={{
                  flexShrink: 0, width: 32, height: 32,
                  backgroundImage: "url('/img/deco_2.png')",
                  backgroundSize: '200% auto', backgroundPosition: '100% 50%', backgroundRepeat: 'no-repeat',
                }} />
                <span style={{ fontFamily: ZEN_FONT, fontSize: 'clamp(0.75rem, 3.6vw, 0.95rem)', fontWeight: 900, lineHeight: 1.25, textAlign: 'left', color: '#3a1890', ...OUTLINE }}>
                  コレクションを<br />みる
                </span>
              </div>
            </motion.button>

          </div>
        </div>

      </div>
    </div>
  )
}
