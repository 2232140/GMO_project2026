'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Settings } from 'lucide-react'

const ZEN = 'var(--font-zen-maru-gothic), var(--font-nunito), sans-serif'

/* ── ambient glow blobs — 四隅レインボー ── */
const GLOWS = [
  { top: -80,  left:  -80,  size: 360, color: 'rgba(255,140,220,0.60)', blur: 60 },
  { top: -80,  right: -80,  size: 300, color: 'rgba(140,180,255,0.55)', blur: 55 },
  { bottom: -80, left:  -80, size: 300, color: 'rgba(200,140,255,0.50)', blur: 55 },
  { bottom: -80, right: -80, size: 280, color: 'rgba(140,220,255,0.45)', blur: 50 },
]

/* ── floating sparkle particles ── */
const PARTS = [
  { s:'★',  l:'5%',  sz:'1.1rem', dur:4.4, d:0.0, c:'#ffd700' },
  { s:'💗', l:'88%', sz:'0.9rem', dur:3.7, d:0.8, c:'#ffaad4' },
  { s:'✦',  l:'15%', sz:'0.8rem', dur:5.1, d:1.6, c:'#ffffff' },
  { s:'★',  l:'93%', sz:'0.75rem',dur:4.3, d:0.4, c:'#ffd700' },
  { s:'✦',  l:'2%',  sz:'0.9rem', dur:3.9, d:2.2, c:'#ffffff' },
  { s:'💗', l:'77%', sz:'0.8rem', dur:5.0, d:1.0, c:'#ffaad4' },
  { s:'★',  l:'48%', sz:'1.0rem', dur:5.4, d:1.9, c:'#ffd700' },
  { s:'✦',  l:'64%', sz:'0.7rem', dur:3.4, d:3.0, c:'#c8d8ff' },
  { s:'★',  l:'23%', sz:'0.85rem',dur:4.0, d:0.6, c:'#ffd700' },
  { s:'💙', l:'96%', sz:'0.8rem', dur:4.7, d:3.4, c:'#a0c8ff' },
  { s:'✦',  l:'36%', sz:'0.75rem',dur:3.8, d:1.2, c:'#ffffff' },
  { s:'★',  l:'54%', sz:'1.1rem', dur:5.6, d:2.5, c:'#ffd700' },
]

/* ── logo sparkles ── */
const LOGO_S = [
  { top:'-10px', right:'10%', delay:0.0 },
  { top:'-8px',  left:'12%',  delay:0.75 },
  { bottom:'-6px',right:'18%',delay:1.5 },
]

/* ── idol-game style buttons ── */
const MENU_BTNS = [
  {
    label: '今日のデッキを組む',
    sub: 'カードスロットをセットしよう',
    icon: '/img/deck_icon.png',
    route: '/deck',
    panelGrad: 'linear-gradient(135deg, #ff5599 0%, #ff88bb 100%)',
    bodyGrad:  'linear-gradient(135deg, #ffbbdd 0%, #ff99cc 100%)',
    shadow: '#cc0055',
    glow:   'rgba(255,100,160,0.55)',
    star1: '#ffd700', star2: '#ffbbdd',
    delay: 0.30,
  },
  {
    label: 'カードをつくる',
    sub: 'あなただけのカードを',
    icon: '/img/hero-cards.png',
    route: '/create',
    panelGrad: 'linear-gradient(135deg, #3388ff 0%, #88aaff 100%)',
    bodyGrad:  'linear-gradient(135deg, #bbddff 0%, #aaccff 100%)',
    shadow: '#0033cc',
    glow:   'rgba(100,160,255,0.55)',
    star1: '#ffd700', star2: '#bbddff',
    delay: 0.40,
  },
  {
    label: 'コレクションをみる',
    sub: 'アルバムを開こう',
    icon: '/img/icon-binder.png',
    route: '/binder',
    panelGrad: 'linear-gradient(135deg, #aa44ff 0%, #cc88ff 100%)',
    bodyGrad:  'linear-gradient(135deg, #ddbfff 0%, #ccaaff 100%)',
    shadow: '#660099',
    glow:   'rgba(170,100,255,0.55)',
    star1: '#ffd700', star2: '#ddbfff',
    delay: 0.50,
  },
]

/* ── golden frame corner stars ── */
const CORNER_STARS = [
  { top: -12, left: 18 },
  { top: -12, right: 18 },
  { bottom: -12, left: 18 },
  { bottom: -12, right: 18 },
]

export default function HomeScreen() {
  const router = useRouter()

  return (
    <div style={{
      position: 'fixed', inset: 0, overflow: 'hidden',
      background: 'linear-gradient(160deg, #ffc8ee 0%, #eec8ff 38%, #c8d8ff 68%, #c8f0ff 100%)',
    }}>

      {/* ── dot grid ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.60) 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }} />

      {/* ── ambient glows ── */}
      {GLOWS.map((g, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: g.top, left: g.left, bottom: g.bottom, right: g.right,
          width: g.size, height: g.size, borderRadius: '50%',
          background: `radial-gradient(circle, ${g.color} 0%, transparent 70%)`,
          filter: `blur(${g.blur}px)`, pointerEvents: 'none',
        }} />
      ))}

      {/* ── aurora overlay ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(135deg, rgba(255,220,255,0.25), rgba(220,200,255,0.20), rgba(200,220,255,0.18), rgba(255,220,255,0.15))',
        backgroundSize: '400% 400%',
        animation: 'auroraShift 10s ease-in-out infinite',
      }} />

      {/* ── floating particles ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
        {PARTS.map((p, i) => (
          <motion.span key={i}
            style={{
              position: 'absolute', left: p.l,
              bottom: `${6 + (i * 17) % 38}%`,
              fontSize: p.sz, color: p.c,
              filter: `drop-shadow(0 0 6px ${p.c})`,
              userSelect: 'none', lineHeight: 1,
            }}
            animate={{ y: [0, -300], opacity: [0, 1, 0.8, 0] }}
            transition={{ duration: p.dur, delay: p.d, repeat: Infinity, repeatDelay: p.dur * 0.55, ease: 'easeOut' }}
          >{p.s}</motion.span>
        ))}
      </div>

      {/* ━━━━━━ MAIN LAYOUT ━━━━━━ */}
      <div style={{
        position: 'relative', zIndex: 5,
        height: '100dvh', maxWidth: 430, margin: '0 auto',
        display: 'flex', flexDirection: 'column',
        paddingTop: 'max(12px, var(--safe-top))',
        paddingBottom: 'max(20px, calc(var(--safe-bottom) + 12px))',
        paddingLeft: 18, paddingRight: 18,
        gap: 10, boxSizing: 'border-box',
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
              padding: '8px 16px', borderRadius: 9999,
              background: 'rgba(255,255,255,0.60)',
              backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
              border: '1.5px solid rgba(255,255,255,0.85)',
              color: '#9944bb', cursor: 'pointer',
              fontFamily: ZEN, fontSize: '0.82rem', fontWeight: 900,
              boxShadow: '0 2px 12px rgba(180,120,255,0.28), inset 0 1px 0 rgba(255,255,255,0.95)',
            }}
          >
            <Settings size={14} strokeWidth={2.5} />
            設定
          </motion.button>
        </motion.div>

        {/* ② ロゴ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.82, y: -16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.08, type: 'spring', stiffness: 110, damping: 14 }}
          style={{ flexShrink: 0, display: 'flex', justifyContent: 'center', position: 'relative' }}
        >
          <motion.div
            style={{
              position: 'absolute', inset: '-16px -28px',
              background: 'radial-gradient(ellipse, rgba(255,200,240,0.70) 0%, rgba(200,200,255,0.38) 50%, transparent 72%)',
              filter: 'blur(16px)', pointerEvents: 'none',
            }}
            animate={{ opacity: [0.50, 1.0, 0.50], scale: [0.92, 1.06, 0.92] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/logo.png" alt="MIRROR GRAPH"
            style={{
              maxHeight: '20vh', width: 'auto', maxWidth: '100%', display: 'block', position: 'relative',
              filter: 'drop-shadow(0 0 16px rgba(255,180,240,0.85)) drop-shadow(0 0 32px rgba(200,180,255,0.55))',
            }}
          />
          {LOGO_S.map((s, i) => (
            <motion.span key={i}
              style={{ position: 'absolute', ...s, fontSize: '1.1rem', color: '#ffd700', filter: 'drop-shadow(0 0 6px #ffd700)', pointerEvents: 'none', lineHeight: 1 }}
              animate={{ opacity: [0, 1, 0], scale: [0.3, 1.6, 0.3], rotate: [0, 60, 0] }}
              transition={{ duration: 2.4, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
            >★</motion.span>
          ))}
        </motion.div>

        {/* ③ キャッチコピー */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, type: 'spring', stiffness: 130 }}
          style={{ flexShrink: 0, textAlign: 'center' }}
        >
          <p style={{
            fontFamily: ZEN, margin: 0, lineHeight: 1.1,
            fontSize: 'clamp(1.2rem, 6.5vw, 1.55rem)', fontWeight: 900,
            background: 'linear-gradient(180deg, #fff0ff 0%, #ff99ee 22%, #cc66ff 55%, #88aaff 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.90)) drop-shadow(0 3px 0 rgba(160,80,220,0.50))',
          }}>今日のあなたをプロデュース</p>
        </motion.div>

        {/* ④ アイドルゲーム風 縦3ボタンメニュー */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

          {/* ── ゴールドオーバルフレーム ── */}
          <div style={{
            position: 'relative',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,230,255,0.35) 100%)',
            borderRadius: 32,
            padding: '20px 14px',
            boxShadow: [
              '0 0 0 3px rgba(255,215,0,0.85)',
              '0 0 0 6px rgba(255,215,0,0.22)',
              '0 0 36px rgba(255,200,255,0.55)',
              'inset 0 0 24px rgba(255,255,255,0.45)',
            ].join(', '),
          }}>

            {/* フレーム四隅の星 */}
            {CORNER_STARS.map((pos, i) => (
              <motion.span key={i}
                style={{ position: 'absolute', ...pos, fontSize: '1.25rem', color: '#ffd700', filter: 'drop-shadow(0 0 5px #ffd700)', lineHeight: 1, zIndex: 10 }}
                animate={{ opacity: [0.6, 1, 0.6], scale: [0.85, 1.25, 0.85], rotate: [0, 25, 0] }}
                transition={{ duration: 1.8, delay: i * 0.45, repeat: Infinity, ease: 'easeInOut' }}
              >★</motion.span>
            ))}

            {/* ボタン縦3列 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              {MENU_BTNS.map((btn, i) => (
                <motion.button
                  key={btn.route}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: btn.delay, type: 'spring', stiffness: 160 }}
                  whileTap={{ scale: 0.97, y: 4 }}
                  onClick={() => router.push(btn.route)}
                  style={{
                    position: 'relative',
                    display: 'flex', alignItems: 'center',
                    height: 76, borderRadius: 18,
                    border: 'none', cursor: 'pointer', overflow: 'hidden',
                    background: btn.bodyGrad,
                    boxShadow: [
                      '0 0 0 2.5px rgba(255,215,0,0.88)',
                      '0 0 0 5px rgba(255,215,0,0.22)',
                      `0 5px 0 ${btn.shadow}`,
                      `0 10px 22px ${btn.glow}`,
                      'inset 0 1px 0 rgba(255,255,255,0.65)',
                    ].join(', '),
                    padding: 0,
                  }}
                >
                  {/* 左：アイコンパネル（ブックカバー風） */}
                  <div style={{
                    width: 72, height: '100%', flexShrink: 0,
                    background: btn.panelGrad,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRight: '2.5px solid rgba(255,215,0,0.55)',
                    fontSize: '2.0rem', position: 'relative',
                  }}>
                    {/* パネル内のツヤ */}
                    <div style={{
                      position: 'absolute', top: 4, left: 6, right: 6, height: '40%',
                      background: 'linear-gradient(to bottom, rgba(255,255,255,0.60), transparent)',
                      borderRadius: '50% 50% 50% 50% / 6px 6px 10px 10px',
                      pointerEvents: 'none',
                    }} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={btn.icon} alt={btn.label} style={{ width: 46, height: 46, objectFit: 'contain', filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.20))', position: 'relative', zIndex: 1 }} />
                  </div>

                  {/* 右：テキストエリア */}
                  <div style={{ flex: 1, padding: '0 12px', textAlign: 'left' }}>
                    <p style={{
                      fontFamily: ZEN, margin: 0, fontWeight: 900, color: 'white',
                      fontSize: 'clamp(0.95rem, 5vw, 1.1rem)',
                      textShadow: '0 2px 5px rgba(0,0,0,0.30)',
                    }}>{btn.label}</p>
                    <p style={{
                      fontFamily: ZEN, margin: '3px 0 0', fontWeight: 700,
                      color: 'rgba(255,255,255,0.82)', fontSize: '0.65rem',
                      textShadow: '0 1px 3px rgba(0,0,0,0.25)',
                    }}>{btn.sub}</p>
                  </div>

                  {/* 右端の星装飾 */}
                  <div style={{ paddingRight: 12, display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
                    <motion.span
                      style={{ color: btn.star1, fontSize: '0.9rem', filter: `drop-shadow(0 0 4px ${btn.star1})`, lineHeight: 1 }}
                      animate={{ opacity: [0.6, 1, 0.6], rotate: [0, 22, 0] }}
                      transition={{ duration: 1.6, delay: i * 0.35, repeat: Infinity }}
                    >★</motion.span>
                    <motion.span
                      style={{ color: btn.star2, fontSize: '0.62rem', filter: `drop-shadow(0 0 3px ${btn.star2})`, lineHeight: 1 }}
                      animate={{ opacity: [0.4, 1, 0.4], rotate: [0, -18, 0] }}
                      transition={{ duration: 2.1, delay: i * 0.35 + 0.55, repeat: Infinity }}
                    >★</motion.span>
                  </div>

                  {/* ボタン上部のツヤ光沢 */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '42%', pointerEvents: 'none',
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.45), transparent)',
                    borderRadius: '18px 18px 0 0',
                  }} />

                  {/* シマースウィープ */}
                  <motion.div
                    style={{
                      position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5,
                      background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.48) 50%, transparent 70%)',
                    }}
                    animate={{ x: ['-130%', '230%'] }}
                    transition={{ duration: 0.88, delay: 5 + i * 3, repeat: Infinity, repeatDelay: 9 + i * 2, ease: 'easeOut' }}
                  />
                </motion.button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
