'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Settings } from 'lucide-react'

const ZEN = 'var(--font-zen-maru-gothic), var(--font-nunito), sans-serif'

/* ── ambient glow blobs ── */
const GLOWS = [
  { top: -80,  left:  -80,  size: 360, color: 'rgba(255,140,220,0.60)', blur: 60 },
  { top: -80,  right: -80,  size: 300, color: 'rgba(140,180,255,0.55)', blur: 55 },
  { bottom: -80, left:  -80, size: 300, color: 'rgba(200,140,255,0.50)', blur: 55 },
  { bottom: -80, right: -80, size: 280, color: 'rgba(140,220,255,0.45)', blur: 50 },
]

/* ── floating particles ── */
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

/* ── 3 menu buttons ── */
const MENU_BTNS = [
  {
    label: '今日のデッキを組む',
    sub: 'コーデカードをセットしよう',
    icon: '/img/deck_icon.png',
    route: '/deck',
    grad: 'linear-gradient(135deg, #ff6aaa 0%, #ffb3d4 100%)',
    shadow: '#c4005a',
    glow: 'rgba(255,100,160,0.50)',
    delay: 0.28,
  },
  {
    label: 'カードをつくる',
    sub: 'あなただけのカードを生み出そう',
    icon: '/img/hero-cards.png',
    route: '/create',
    grad: 'linear-gradient(135deg, #4fa3ff 0%, #b3d8ff 100%)',
    shadow: '#0048c4',
    glow: 'rgba(80,160,255,0.50)',
    delay: 0.38,
  },
  {
    label: 'コレクションをみる',
    sub: 'アルバムを開いてみよう',
    icon: '/img/icon-binder.png',
    route: '/binder',
    grad: 'linear-gradient(135deg, #b06aff 0%, #ddb8ff 100%)',
    shadow: '#6200cc',
    glow: 'rgba(160,80,255,0.50)',
    delay: 0.48,
  },
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

      {/* ── deco_1: Y2K小物をサイドに float ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/img/deco_1.png" alt="" aria-hidden="true" style={{
        position: 'absolute', right: -28, top: '22%',
        width: 180, height: 'auto', opacity: 0.40,
        mixBlendMode: 'multiply', pointerEvents: 'none', zIndex: 1,
        transform: 'rotate(8deg)',
      }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/img/deco_2.png" alt="" aria-hidden="true" style={{
        position: 'absolute', left: -24, bottom: '18%',
        width: 150, height: 'auto', opacity: 0.35,
        mixBlendMode: 'multiply', pointerEvents: 'none', zIndex: 1,
        transform: 'rotate(-10deg)',
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
        paddingLeft: 20, paddingRight: 20,
        gap: 10, boxSizing: 'border-box',
      }}>

        {/* ① 設定ボタン */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, type: 'spring', stiffness: 160 }}
          style={{ display: 'flex', justifyContent: 'flex-end', flexShrink: 0 }}
        >
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => router.push('/settings')}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '7px 15px', borderRadius: 9999,
              background: 'rgba(255,255,255,0.62)',
              backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
              border: '1.5px solid rgba(255,255,255,0.88)',
              color: '#9944bb', cursor: 'pointer',
              fontFamily: ZEN, fontSize: '0.80rem', fontWeight: 900,
              boxShadow: '0 2px 10px rgba(180,120,255,0.25), inset 0 1px 0 rgba(255,255,255,0.95)',
            }}
          >
            <Settings size={13} strokeWidth={2.5} />
            設定
          </motion.button>
        </motion.div>

        {/* ② ロゴ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.84, y: -14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.08, type: 'spring', stiffness: 110, damping: 14 }}
          style={{ flexShrink: 0, display: 'flex', justifyContent: 'center', position: 'relative' }}
        >
          <motion.div style={{
            position: 'absolute', inset: '-14px -24px',
            background: 'radial-gradient(ellipse, rgba(255,200,240,0.68) 0%, rgba(200,200,255,0.36) 50%, transparent 72%)',
            filter: 'blur(16px)', pointerEvents: 'none',
          }}
            animate={{ opacity: [0.50, 1.0, 0.50], scale: [0.92, 1.06, 0.92] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/logo.png" alt="MIRROR GRAPH"
            style={{
              maxHeight: '18vh', width: 'auto', maxWidth: '100%',
              display: 'block', position: 'relative',
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
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, type: 'spring', stiffness: 130 }}
          style={{ flexShrink: 0, textAlign: 'center' }}
        >
          <p style={{
            fontFamily: ZEN, margin: 0, lineHeight: 1.1,
            fontSize: 'clamp(1.15rem, 6vw, 1.45rem)', fontWeight: 900,
            background: 'linear-gradient(180deg, #fff0ff 0%, #ff99ee 22%, #cc66ff 55%, #88aaff 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.90)) drop-shadow(0 3px 0 rgba(160,80,220,0.48))',
          }}>今日のあなたをプロデュース</p>
        </motion.div>

        {/* ④ ヒーロービジュアル — ファッションカードプレビュー */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.22, type: 'spring', stiffness: 120 }}
          style={{ flexShrink: 0, display: 'flex', justifyContent: 'center' }}
        >
          <div style={{
            background: 'rgba(255,255,255,0.78)',
            borderRadius: 18,
            padding: '6px 10px',
            boxShadow: '0 0 0 2.5px rgba(255,215,0,0.72), 0 4px 18px rgba(200,100,255,0.28), inset 0 1px 0 rgba(255,255,255,0.95)',
            width: '80%', maxWidth: 260,
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              src="/img/hero-cards.png" alt="fashion cards preview"
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 10 }}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>

        {/* ⑤ メニューボタン — 縦3列 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* ガラスパネル + ゴールドフレーム */}
          <div style={{
            position: 'relative',
            background: 'rgba(255,255,255,0.42)',
            backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
            borderRadius: 26,
            padding: '14px 12px',
            boxShadow: [
              '0 0 0 2.5px rgba(255,215,0,0.80)',
              '0 0 0 5px rgba(255,215,0,0.18)',
              '0 0 30px rgba(255,200,255,0.45)',
              'inset 0 0 20px rgba(255,255,255,0.40)',
            ].join(', '),
          }}>

            {/* フレーム四隅の★ */}
            {([
              { top: -11, left: 16 }, { top: -11, right: 16 },
              { bottom: -11, left: 16 }, { bottom: -11, right: 16 },
            ] as const).map((pos, i) => (
              <motion.span key={i}
                style={{ position: 'absolute', ...pos, fontSize: '1.2rem', color: '#ffd700', filter: 'drop-shadow(0 0 5px #ffd700)', lineHeight: 1, zIndex: 10 }}
                animate={{ opacity: [0.6, 1, 0.6], scale: [0.85, 1.22, 0.85] }}
                transition={{ duration: 1.8, delay: i * 0.44, repeat: Infinity, ease: 'easeInOut' }}
              >★</motion.span>
            ))}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {MENU_BTNS.map((btn, i) => (
                <motion.button
                  key={btn.route}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: btn.delay, type: 'spring', stiffness: 160 }}
                  whileTap={{ scale: 0.97, y: 3 }}
                  onClick={() => router.push(btn.route)}
                  style={{
                    position: 'relative',
                    display: 'flex', alignItems: 'center',
                    height: 70, width: '100%',
                    borderRadius: 18, border: 'none',
                    cursor: 'pointer', overflow: 'hidden',
                    background: btn.grad,
                    boxShadow: [
                      '0 0 0 2.5px #ffd700',
                      '0 0 0 4.5px rgba(255,215,0,0.22)',
                      `0 5px 0 ${btn.shadow}`,
                      `0 9px 20px ${btn.glow}`,
                      'inset 0 1px 0 rgba(255,255,255,0.60)',
                    ].join(', '),
                  }}
                >
                  {/* ─ 上部ツヤ光沢 ─ */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '46%',
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.46), transparent)',
                    borderRadius: '18px 18px 0 0', pointerEvents: 'none',
                  }} />

                  {/* ─ アイコン（白ガラス枠） ─ */}
                  <div style={{
                    width: 50, height: 50, borderRadius: 13,
                    marginLeft: 12, flexShrink: 0,
                    background: 'rgba(255,255,255,0.42)',
                    border: '1.5px solid rgba(255,255,255,0.70)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.90)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative', zIndex: 2,
                  }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={btn.icon} alt="" style={{ width: 36, height: 36, objectFit: 'contain' }} />
                  </div>

                  {/* ─ テキスト ─ */}
                  <div style={{ flex: 1, padding: '0 10px 0 12px', position: 'relative', zIndex: 2 }}>
                    <p style={{
                      fontFamily: ZEN, margin: 0, fontWeight: 900, color: 'white',
                      fontSize: 'clamp(0.90rem, 4.6vw, 1.05rem)',
                      textShadow: '0 2px 5px rgba(0,0,0,0.28)',
                    }}>{btn.label}</p>
                    <p style={{
                      fontFamily: ZEN, margin: '3px 0 0', fontWeight: 700,
                      color: 'rgba(255,255,255,0.78)', fontSize: '0.60rem',
                      textShadow: '0 1px 3px rgba(0,0,0,0.22)',
                    }}>{btn.sub}</p>
                  </div>

                  {/* ─ ☆ 3個 ─ */}
                  <div style={{ paddingRight: 10, display: 'flex', gap: 2, alignItems: 'center', position: 'relative', zIndex: 2 }}>
                    {([0.88, 0.66, 0.78] as const).map((sz, j) => (
                      <motion.span key={j}
                        style={{ fontSize: `${sz}rem`, color: '#ffd700', filter: 'drop-shadow(0 0 3px rgba(255,215,0,0.80))', lineHeight: 1 }}
                        animate={{ opacity: [0.50, 1, 0.50] }}
                        transition={{ duration: 1.5, delay: j * 0.32 + i * 0.16, repeat: Infinity }}
                      >☆</motion.span>
                    ))}
                  </div>

                  {/* ─ シマースウィープ ─ */}
                  <motion.div
                    style={{
                      position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3,
                      background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.50) 50%, transparent 70%)',
                    }}
                    animate={{ x: ['-130%', '230%'] }}
                    transition={{ duration: 0.86, delay: 5 + i * 3, repeat: Infinity, repeatDelay: 9 + i * 2, ease: 'easeOut' }}
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
