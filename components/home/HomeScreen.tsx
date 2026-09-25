'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Settings } from 'lucide-react'

const ZEN = 'var(--font-zen-maru-gothic), var(--font-nunito), sans-serif'
const TS  = { textShadow: '0 2px 8px rgba(120,0,80,0.55), 0 0 18px rgba(255,120,220,0.35)' }

/* ── ambient glow blobs ── */
const GLOWS = [
  { top: -110, left:  -110, size: 380, color: 'rgba(255,140,230,0.55)',  blur: 55 },
  { bottom: -110, right: -110, size: 380, color: 'rgba(200,80,255,0.45)', blur: 55 },
  { top: '38%', left: '50%', transform: 'translate(-50%,-50%)', size: 260, color: 'rgba(255,180,240,0.18)', blur: 45 },
]

/* ── floating sparkle particles ── */
const PARTS = [
  { s:'✦', l:'5%',  sz:'1.0rem', dur:4.4, d:0.0, c:'#ffffff' },
  { s:'★', l:'88%', sz:'0.8rem', dur:3.7, d:0.8, c:'#ffb8e0' },
  { s:'✦', l:'15%', sz:'0.72rem',dur:5.1, d:1.6, c:'#e0c0ff' },
  { s:'💖',l:'93%', sz:'0.9rem', dur:4.3, d:0.4, c:'#ff69b4' },
  { s:'✦', l:'2%',  sz:'0.9rem', dur:3.9, d:2.2, c:'#ffffff' },
  { s:'★', l:'77%', sz:'0.75rem',dur:5.0, d:1.0, c:'#d8b0ff' },
  { s:'💫',l:'48%', sz:'0.95rem',dur:5.4, d:1.9, c:'#ffffff' },
  { s:'✦', l:'64%', sz:'0.7rem', dur:3.4, d:3.0, c:'#ffd0ee' },
  { s:'★', l:'23%', sz:'0.85rem',dur:4.0, d:0.6, c:'#ffb8e0' },
  { s:'✦', l:'96%', sz:'0.75rem',dur:4.7, d:3.4, c:'#c8d8ff' },
  { s:'💖',l:'36%', sz:'0.7rem', dur:3.8, d:1.2, c:'#ff69b4' },
  { s:'✦', l:'54%', sz:'1.1rem', dur:5.6, d:2.5, c:'#ffffff' },
]

/* ── logo sparkles ── */
const LOGO_S = [
  { top:'-10px',  right:'11%', delay:0.0 },
  { top:'-6px',   left:'13%',  delay:0.75 },
  { bottom:'-4px',right:'20%', delay:1.5  },
]

export default function HomeScreen() {
  const router = useRouter()

  return (
    <div style={{
      position: 'fixed', inset: 0, overflow: 'hidden',
      background: 'linear-gradient(160deg, #f470cc 0%, #e040cc 28%, #c030d8 56%, #8020b8 100%)',
    }}>

      {/* ── dot grid ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }} />

      {/* ── ambient glows ── */}
      {GLOWS.map((g, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: g.top, left: g.left, bottom: g.bottom, right: g.right,
          transform: g.transform,
          width: g.size, height: g.size,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${g.color} 0%, transparent 68%)`,
          filter: `blur(${g.blur}px)`,
          pointerEvents: 'none',
        }} />
      ))}

      {/* ── aurora overlay ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(135deg, rgba(255,210,245,0.22), rgba(255,100,210,0.16), rgba(210,80,255,0.14), rgba(255,210,245,0.10))',
        backgroundSize: '400% 400%',
        animation: 'auroraShift 10s ease-in-out infinite',
      }} />

      {/* ── floating particles ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
        {PARTS.map((p, i) => (
          <motion.span
            key={i}
            style={{
              position: 'absolute', left: p.l,
              bottom: `${6 + (i * 17) % 38}%`,
              fontSize: p.sz, color: p.c,
              filter: `drop-shadow(0 0 6px ${p.c})`,
              userSelect: 'none', lineHeight: 1,
            }}
            animate={{ y: [0, -300], opacity: [0, 1, 0.75, 0] }}
            transition={{ duration: p.dur, delay: p.d, repeat: Infinity, repeatDelay: p.dur * 0.55, ease: 'easeOut' }}
          >
            {p.s}
          </motion.span>
        ))}
      </div>

      {/* ━━━━━━ MAIN LAYOUT ━━━━━━ */}
      <div style={{
        position: 'relative', zIndex: 5,
        height: '100dvh', maxWidth: 430, margin: '0 auto',
        display: 'flex', flexDirection: 'column',
        paddingTop: 'max(14px, var(--safe-top))',
        paddingBottom: 'max(20px, calc(var(--safe-bottom) + 12px))',
        paddingLeft: 20, paddingRight: 20,
        gap: 16, boxSizing: 'border-box',
      }}>

        {/* ① 設定ボタン */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, type: 'spring', stiffness: 160 }}
          style={{ display: 'flex', justifyContent: 'flex-end', flexShrink: 0 }}
        >
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => router.push('/settings')}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '9px 18px', borderRadius: 9999,
              background: 'rgba(255,220,245,0.28)',
              backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
              border: '1.5px solid rgba(255,255,255,0.55)',
              color: 'rgba(255,255,255,0.95)', cursor: 'pointer',
              fontFamily: ZEN, fontSize: '0.82rem', fontWeight: 700,
              boxShadow: '0 2px 14px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
              ...TS,
            }}
          >
            <Settings size={14} strokeWidth={2.5} />
            設定
          </motion.button>
        </motion.div>

        {/* ② ロゴ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.82, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.08, type: 'spring', stiffness: 110, damping: 14 }}
          style={{ flexShrink: 0, display: 'flex', justifyContent: 'center', position: 'relative' }}
        >
          {/* Breathing glow halo */}
          <motion.div
            style={{
              position: 'absolute', inset: '-20px -32px',
              background: 'radial-gradient(ellipse, rgba(255,160,240,0.75) 0%, rgba(255,80,210,0.38) 45%, transparent 70%)',
              filter: 'blur(18px)', pointerEvents: 'none',
            }}
            animate={{ opacity: [0.38, 0.92, 0.38], scale: [0.91, 1.08, 0.91] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/logo.png" alt="MIRROR GRAPH"
            style={{
              maxHeight: '22vh', width: 'auto', maxWidth: '100%', display: 'block', position: 'relative',
              filter: 'drop-shadow(0 0 14px rgba(255,160,230,0.95)) drop-shadow(0 0 36px rgba(255,80,200,0.60))',
            }}
          />
          {/* Gold sparkles around logo */}
          {LOGO_S.map((s, i) => (
            <motion.span key={i}
              style={{ position: 'absolute', ...s, fontSize: '1.1rem', color: '#ffd700', filter: 'drop-shadow(0 0 6px #ffd700)', pointerEvents: 'none', lineHeight: 1 }}
              animate={{ opacity: [0, 1, 0], scale: [0.3, 1.5, 0.3], rotate: [0, 48, 0] }}
              transition={{ duration: 2.5, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
            >✦</motion.span>
          ))}
        </motion.div>

        {/* ③ キャッチコピー — ゲームタイトル風 */}
        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.93 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.20, type: 'spring', stiffness: 115, damping: 16 }}
          style={{ flexShrink: 0, position: 'relative', textAlign: 'center', padding: '6px 16px', overflow: 'hidden' }}
        >
          {/* Decorative gems & sparkles */}
          {[
            { s: '💎', top: '0px',    left: '4%',   sz: '1.1rem', d: 0.0 },
            { s: '★',  top: '-8px',   left: '22%',  sz: '1.4rem', d: 0.7, c: '#ffffff' },
            { s: '💎', top: '6px',    right: '5%',  sz: '1.0rem', d: 1.3 },
            { s: '★',  top: '-6px',   right: '24%', sz: '1.2rem', d: 0.2, c: '#ffd0f0' },
            { s: '✦',  bottom: '2px', left: '12%',  sz: '1.0rem', d: 1.0, c: '#ffffff' },
            { s: '✦',  bottom: '0px', right: '14%', sz: '0.95rem',d: 1.6, c: '#e0c0ff' },
          ].map((gem, i) => (
            <motion.span key={i}
              style={{
                position: 'absolute',
                top: gem.top, left: gem.left, bottom: gem.bottom, right: gem.right,
                fontSize: gem.sz, lineHeight: 1, pointerEvents: 'none',
                color: gem.c,
                filter: gem.c ? `drop-shadow(0 0 5px ${gem.c})` : undefined,
              }}
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.3, 0.8] }}
              transition={{ duration: 2.0 + i * 0.32, delay: gem.d, repeat: Infinity, ease: 'easeInOut' }}
            >{gem.s}</motion.span>
          ))}

          {/* 今日の */}
          <p style={{
            fontFamily: ZEN, margin: '0 0 -2px', lineHeight: 1.1,
            fontSize: 'clamp(1.0rem, 5vw, 1.2rem)', fontWeight: 900,
            color: '#ffffff',
            WebkitTextStroke: '2px #ff88cc',
            paintOrder: 'stroke fill',
            filter: 'drop-shadow(0 3px 0 #cc0077)',
            letterSpacing: '0.1em',
          }}>今日の</p>

          {/* あなたを */}
          <p style={{
            fontFamily: ZEN, margin: '0 0 -4px', lineHeight: 1.0,
            fontSize: 'clamp(2.15rem, 11vw, 2.8rem)', fontWeight: 900,
            color: '#ff69b4',
            WebkitTextStroke: '3.5px white',
            paintOrder: 'stroke fill',
            filter: 'drop-shadow(0 5px 0 #aa0055) drop-shadow(0 8px 14px rgba(180,0,100,0.55))',
          }}>あなたを</p>

          {/* プロデュース */}
          <p style={{
            fontFamily: ZEN, margin: 0, lineHeight: 1.1,
            fontSize: 'clamp(1.65rem, 8.5vw, 2.15rem)', fontWeight: 900,
            color: '#ee44cc',
            WebkitTextStroke: '3px white',
            paintOrder: 'stroke fill',
            filter: 'drop-shadow(0 4px 0 #880099) drop-shadow(0 7px 14px rgba(150,0,200,0.5))',
            letterSpacing: '0.03em',
          }}>プロデュース</p>

          {/* Shimmer sweep */}
          <motion.div
            style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'linear-gradient(105deg, transparent 33%, rgba(255,255,255,0.42) 50%, transparent 67%)',
            }}
            animate={{ x: ['-130%', '230%'] }}
            transition={{ duration: 0.85, delay: 7, repeat: Infinity, repeatDelay: 9, ease: 'easeOut' }}
          />
        </motion.div>

        {/* ④ メインCTAボタン */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.30, type: 'spring', stiffness: 155 }}
          style={{ flexShrink: 0, position: 'relative' }}
        >
          {/* Rainbow pulsing glow behind button */}
          <motion.div style={{
            position: 'absolute', inset: '-7px -10px', borderRadius: 24,
            background: 'linear-gradient(135deg, #ff1493, #ee44cc, #cc44ff, #9944ff, #ff1493)',
            backgroundSize: '400% 400%', filter: 'blur(14px)', zIndex: 0,
          }}
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'], opacity: [0.45, 0.92, 0.45] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.button
            whileTap={{ scale: 0.97, y: 3 }}
            onClick={() => router.push('/deck')}
            className="btn-puffy-pink"
            style={{
              position: 'relative', zIndex: 1, width: '100%',
              padding: '17px 24px', borderRadius: 16,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              overflow: 'hidden',
            }}
          >
            {/* Shimmer sweep */}
            <motion.div
              style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', background: 'linear-gradient(105deg, transparent 32%, rgba(255,255,255,0.52) 50%, transparent 68%)' }}
              animate={{ x: ['-130%', '230%'] }}
              transition={{ duration: 0.95, delay: 5.5, repeat: Infinity, repeatDelay: 7.5, ease: 'easeOut' }}
            />
            <span style={{ fontFamily: ZEN, fontSize: 'clamp(1.05rem, 5.5vw, 1.28rem)', fontWeight: 900, color: 'white', position: 'relative', zIndex: 4, textShadow: '0 2px 6px rgba(0,0,0,0.5), 0 0 14px rgba(255,100,200,0.4)' }}>
              ✨ 今日のデッキを組む
            </span>
            <span style={{ fontFamily: ZEN, fontSize: '0.7rem', fontWeight: 700, color: 'rgba(255,255,255,0.88)', position: 'relative', zIndex: 4, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
              カードスロットをセットしよう
            </span>
          </motion.button>
        </motion.div>

        {/* ⑤ サブボタン 2列 */}
        <div style={{ flexShrink: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>

          <motion.button
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.40, type: 'spring', stiffness: 155 }}
            whileTap={{ scale: 0.94, y: 2 }}
            onClick={() => router.push('/create')}
            className="btn-puffy-purple"
            style={{
              padding: '15px 12px', borderRadius: 15,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
              fontFamily: ZEN, cursor: 'pointer', overflow: 'hidden',
            }}
          >
            <span style={{ fontSize: '1.5rem', filter: 'drop-shadow(0 0 6px rgba(255,150,255,0.7))' }}>✨</span>
            <span style={{ fontSize: '0.88rem', fontWeight: 900, color: 'white', textShadow: '0 2px 5px rgba(0,0,0,0.55)' }}>
              カードをつくる
            </span>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.46, type: 'spring', stiffness: 155 }}
            whileTap={{ scale: 0.94, y: 2 }}
            onClick={() => router.push('/binder')}
            className="btn-puffy-blue"
            style={{
              padding: '15px 12px', borderRadius: 15,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
              fontFamily: ZEN, cursor: 'pointer', overflow: 'hidden',
            }}
          >
            <span style={{ fontSize: '1.5rem', filter: 'drop-shadow(0 0 6px rgba(255,150,220,0.7))' }}>💖</span>
            <span style={{ fontSize: '0.88rem', fontWeight: 900, color: 'white', textShadow: '0 2px 5px rgba(0,0,0,0.55)' }}>
              コレクションをみる
            </span>
          </motion.button>

        </div>
      </div>
    </div>
  )
}
