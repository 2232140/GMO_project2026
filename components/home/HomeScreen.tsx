'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Settings } from 'lucide-react'

const ZEN = 'var(--font-zen-maru-gothic), var(--font-nunito), sans-serif'
const TS  = { textShadow: '0 2px 6px rgba(0,0,0,0.7), 0 0 16px rgba(255,100,200,0.3)' }

/* ── ambient glow blobs ── */
const GLOWS = [
  { top: -110, left:  -110, size: 380, color: 'rgba(255,20,147,0.38)',  blur: 55 },
  { bottom: -110, right: -110, size: 380, color: 'rgba(90,20,255,0.44)', blur: 55 },
  { top: '38%', left: '50%', transform: 'translate(-50%,-50%)', size: 260, color: 'rgba(255,180,0,0.10)', blur: 45 },
]

/* ── floating sparkle particles ── */
const PARTS = [
  { s:'✦', l:'5%',  sz:'1.0rem', dur:4.4, d:0.0, c:'#ffd700' },
  { s:'★', l:'88%', sz:'0.8rem', dur:3.7, d:0.8, c:'#ff69b4' },
  { s:'✦', l:'15%', sz:'0.72rem',dur:5.1, d:1.6, c:'#c0a0ff' },
  { s:'💖',l:'93%', sz:'0.9rem', dur:4.3, d:0.4, c:'#ff69b4' },
  { s:'✦', l:'2%',  sz:'0.9rem', dur:3.9, d:2.2, c:'#ffd700' },
  { s:'★', l:'77%', sz:'0.75rem',dur:5.0, d:1.0, c:'#c0a0ff' },
  { s:'💫',l:'48%', sz:'0.95rem',dur:5.4, d:1.9, c:'#ffffff' },
  { s:'✦', l:'64%', sz:'0.7rem', dur:3.4, d:3.0, c:'#ffd700' },
  { s:'★', l:'23%', sz:'0.85rem',dur:4.0, d:0.6, c:'#ff69b4' },
  { s:'✦', l:'96%', sz:'0.75rem',dur:4.7, d:3.4, c:'#00e5ff' },
  { s:'💖',l:'36%', sz:'0.7rem', dur:3.8, d:1.2, c:'#ff69b4' },
  { s:'✦', l:'54%', sz:'1.1rem', dur:5.6, d:2.5, c:'#ffd700' },
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
      background: 'linear-gradient(160deg, #0e0032 0%, #1e0065 38%, #140040 68%, #060012 100%)',
    }}>

      {/* ── dot grid ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
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
        background: 'linear-gradient(135deg, rgba(255,20,147,0.12), rgba(120,20,255,0.16), rgba(20,80,255,0.10), rgba(255,20,147,0.08))',
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
              background: 'rgba(255,255,255,0.11)',
              backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
              border: '1.5px solid rgba(255,255,255,0.30)',
              color: 'rgba(255,255,255,0.90)', cursor: 'pointer',
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
              background: 'radial-gradient(ellipse, rgba(255,120,220,0.65) 0%, rgba(160,30,255,0.32) 45%, transparent 70%)',
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
              filter: 'drop-shadow(0 0 14px rgba(255,100,210,0.95)) drop-shadow(0 0 34px rgba(180,30,255,0.55))',
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

        {/* ③ キャッチコピーカード */}
        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.93 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.20, type: 'spring', stiffness: 115, damping: 16 }}
          style={{
            flexShrink: 0, position: 'relative',
            borderRadius: 22,
            padding: '20px 24px 18px',
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(22px)', WebkitBackdropFilter: 'blur(22px)',
            boxShadow: [
              '0 0 0 1.5px rgba(255,140,220,0.45)',
              '0 0 24px rgba(200,40,200,0.22)',
              'inset 0 1px 0 rgba(255,255,255,0.18)',
              '0 10px 40px rgba(0,0,0,0.45)',
            ].join(', '),
            overflow: 'hidden',
          }}
        >
          {/* Shine overlay */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: 22, pointerEvents: 'none',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 55%, rgba(255,255,255,0.04) 100%)',
          }} />

          {/* Holo border glow (animating) */}
          <motion.div
            style={{
              position: 'absolute', inset: 0, borderRadius: 22, pointerEvents: 'none',
              boxShadow: '0 0 0 1.5px rgba(255,80,200,0.0)',
            }}
            animate={{ boxShadow: ['0 0 0 1.5px rgba(255,80,200,0.3)', '0 0 0 1.5px rgba(120,80,255,0.55)', '0 0 0 1.5px rgba(255,200,0,0.35)', '0 0 0 1.5px rgba(255,80,200,0.3)'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />

          {/* Corner stars */}
          {[{t:10,l:14},{t:10,r:14},{b:10,l:14},{b:10,r:14}].map((pos, i) => (
            <motion.span key={i}
              style={{ position: 'absolute', top:pos.t, left:pos.l, bottom:pos.b, right:pos.r, fontSize:'0.7rem', color:'#ffd700', filter:'drop-shadow(0 0 4px #ffd700)', lineHeight:1 }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 2.2, delay: i * 0.55, repeat: Infinity, ease: 'easeInOut' }}
            >★</motion.span>
          ))}

          {/* Text content */}
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <p style={{
              fontFamily: ZEN, margin: 0, lineHeight: 1.2,
              fontSize: 'clamp(1.55rem, 8vw, 2.1rem)',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #ffd700 0%, #ff69b4 38%, #c090ff 72%, #60b0ff 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.55))',
            }}>
              今日の私を<br />プロデュース
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: 10 }}>
              <span style={{ color: '#ff69b4', fontSize: '0.6rem', filter: 'drop-shadow(0 0 4px #ff69b4)' }}>✦</span>
              <p style={{
                fontFamily: ZEN, fontSize: '0.72rem', fontWeight: 700, margin: 0,
                color: 'rgba(255,220,245,0.82)', letterSpacing: '0.04em', ...TS,
              }}>
                AIスタイリング × Y2Kトレカコレクション
              </p>
              <span style={{ color: '#ff69b4', fontSize: '0.6rem', filter: 'drop-shadow(0 0 4px #ff69b4)' }}>✦</span>
            </div>
          </div>
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
            background: 'linear-gradient(135deg, #ff1493, #c040e0, #40a0ff, #ffd700, #ff1493)',
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
            className="btn-puffy-gold"
            style={{
              padding: '15px 12px', borderRadius: 15,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
              fontFamily: ZEN, cursor: 'pointer', overflow: 'hidden',
            }}
          >
            <span style={{ fontSize: '1.5rem', filter: 'drop-shadow(0 0 6px rgba(255,220,80,0.7))' }}>💖</span>
            <span style={{ fontSize: '0.88rem', fontWeight: 900, color: 'white', textShadow: '0 2px 5px rgba(0,0,0,0.55)' }}>
              コレクションをみる
            </span>
          </motion.button>

        </div>
      </div>
    </div>
  )
}
