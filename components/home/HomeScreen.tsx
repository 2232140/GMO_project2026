'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Settings } from 'lucide-react'

const ZEN_FONT = 'var(--font-zen-maru-gothic), var(--font-nunito), sans-serif'

const OUTLINE = {
  textShadow: [
    '-2px -2px 0 white',
    ' 2px -2px 0 white',
    '-2px  2px 0 white',
    ' 2px  2px 0 white',
    '0 0 12px rgba(255,255,255,0.75)',
  ].join(', '),
}

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
      }}
    >
      {/*
        ┌─────────────────────────────┐  ← 100dvh 固定
        │              [設定]  ← abs  │  top:12 right:12
        │                             │
        │  ████████████████████████   │  ← ロゴ (maxHeight:18vh / 前回 12vh の 1.5×)
        │                             │
        │  ─── space-between gap ──   │
        │                             │
        │        ┌──────────┐         │  ← hero-cards (width:70% / 中央)
        │        │ hero-cards│         │    opacity:1 / mixBlendMode:normal
        │        └──────────┘         │
        │                             │
        │  ─── space-between gap ──   │
        │                             │
        │  ██████████████████████████ │  ← 今日のデッキを組む
        │  ████████████ ████████████  │  ← 2列サブボタン  gap:4px
        └─────────────────────────────┘  bottom padding:20px
      */}
      <div
        style={{
          position: 'relative',
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
          overflow: 'hidden',
        }}
      >

        {/* ① 設定ボタン: absolute 右上 */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => router.push('/settings')}
          style={{ position: 'absolute', top: 'max(12px, var(--safe-top))', right: 12, zIndex: 10, width: 110 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/Logo_Frame.png" alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <Settings style={{ width: 16, height: 16, flexShrink: 0, color: '#5030a0' }} />
            <span style={{ fontFamily: ZEN_FONT, fontSize: '0.875rem', fontWeight: 900, color: '#5030a0', ...OUTLINE }}>
              設定
            </span>
          </div>
        </motion.button>

        {/* ② ロゴ: maxHeight 18vh = 前回 12vh の 1.5×
               marginTop:40 で absolute 設定ボタンの下に収まる
               width:auto + maxWidth:100% で歪みなし自然サイズ */}
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, type: 'spring', stiffness: 130 }}
          style={{
            flexShrink: 0,
            marginTop: 40,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/logo.png"
            alt="MIRROR GRAPH"
            style={{
              maxHeight: '18vh',
              width: 'auto',
              maxWidth: '100%',
              display: 'block',
            }}
          />
        </motion.div>

        {/* ③ hero-cards: 70% 幅で左右中央 / opacity:1 で透過なし */}
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.93 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.13, type: 'spring', stiffness: 110 }}
          style={{
            flexShrink: 0,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/hero-cards.png"
            alt="カードコレクション"
            style={{
              width: '70%',
              height: 'auto',
              display: 'block',
              opacity: 1,
              mixBlendMode: 'normal',
              filter: 'drop-shadow(0 8px 24px rgba(120,40,180,0.5))',
            }}
          />
        </motion.div>

        {/* ④⑤ ボタン群: gap 4px でギュッと近接 */}
        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>

          {/* ④ メインボタン */}
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, type: 'spring', stiffness: 180 }}
            whileTap={{ scale: 0.97, y: 3 }}
            onClick={() => router.push('/deck')}
            style={{ position: 'relative', width: '100%' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/Logo_Frame.png"
              alt=""
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
            }}>
              <p style={{
                margin: 0,
                fontFamily: ZEN_FONT,
                fontSize: 'clamp(1.05rem, 5vw, 1.35rem)',
                fontWeight: 900,
                lineHeight: 1.2,
                color: '#3a1890',
                ...OUTLINE,
              }}>
                今日のデッキを組む
              </p>
              <p style={{
                margin: 0,
                fontFamily: ZEN_FONT,
                fontSize: 'clamp(0.65rem, 2.8vw, 0.82rem)',
                fontWeight: 700,
                color: '#6848b0',
                textShadow: '0 1px 3px rgba(255,255,255,0.95)',
              }}>
                カードスロットを自分でセット ✦
              </p>
            </div>
          </motion.button>

          {/* ⑤ サブボタン 2列 / gap: 4px */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>

            <motion.button
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.33, type: 'spring', stiffness: 180 }}
              whileTap={{ scale: 0.95, y: 2 }}
              onClick={() => router.push('/create')}
              style={{ position: 'relative', width: '100%' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/Logo_Frame.png"
                alt=""
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '0 6px',
              }}>
                <div style={{
                  flexShrink: 0, width: 32, height: 32,
                  backgroundImage: "url('/img/deco_2.png')",
                  backgroundSize: '200% auto',
                  backgroundPosition: '0% 50%',
                  backgroundRepeat: 'no-repeat',
                }} />
                <span style={{
                  fontFamily: ZEN_FONT,
                  fontSize: 'clamp(0.75rem, 3.6vw, 0.95rem)',
                  fontWeight: 900,
                  lineHeight: 1.25,
                  textAlign: 'left',
                  color: '#3a1890',
                  ...OUTLINE,
                }}>
                  カードを<br />つくる
                </span>
              </div>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.39, type: 'spring', stiffness: 180 }}
              whileTap={{ scale: 0.95, y: 2 }}
              onClick={() => router.push('/binder')}
              style={{ position: 'relative', width: '100%' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/Logo_Frame.png"
                alt=""
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '0 6px',
              }}>
                <div style={{
                  flexShrink: 0, width: 32, height: 32,
                  backgroundImage: "url('/img/deco_2.png')",
                  backgroundSize: '200% auto',
                  backgroundPosition: '100% 50%',
                  backgroundRepeat: 'no-repeat',
                }} />
                <span style={{
                  fontFamily: ZEN_FONT,
                  fontSize: 'clamp(0.75rem, 3.6vw, 0.95rem)',
                  fontWeight: 900,
                  lineHeight: 1.25,
                  textAlign: 'left',
                  color: '#3a1890',
                  ...OUTLINE,
                }}>
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
