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
    /* 背景: fixed で全画面を覆う */
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: "url('/img/wall.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* ━━━ メインコンテナ: 100dvh / max-width 430px / space-between ━━━ */}
      <div
        style={{
          height: '100dvh',
          maxWidth: 430,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '12px 16px',
          overflow: 'hidden',
        }}
      >

        {/* ① ヘッダー: 設定ボタン（右上） */}
        <header style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => router.push('/settings')}
            style={{ position: 'relative', width: 110 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/Logo_Frame.png"
              alt=""
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
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
        </header>

        {/* ② ロゴ */}
        <motion.div
          style={{ display: 'flex', justifyContent: 'center' }}
          initial={{ opacity: 0, y: -24, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 130 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/logo.png"
            alt="MIRROR GRAPH"
            style={{ width: 'min(360px, 88%)', height: 'auto', display: 'block' }}
          />
        </motion.div>

        {/* ③ メインビジュアル: 横長3枚重ね画像 */}
        <motion.div
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          initial={{ opacity: 0, scale: 0.88, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 110 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/hero-cards.png"
            alt="カードコレクション"
            style={{
              width: '100%',
              maxHeight: '28vh',
              objectFit: 'contain',
              display: 'block',
              filter: 'drop-shadow(0 8px 24px rgba(120,40,180,0.55))',
            }}
          />
        </motion.div>

        {/* ④⑤ ボタン群（メイン + サブ2列） */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

          {/* ④ メインボタン: 今日のデッキを組む */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 180 }}
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
                fontFamily: ZEN_FONT,
                fontSize: 'clamp(1.1rem, 5.2vw, 1.4rem)',
                fontWeight: 900,
                lineHeight: 1.2,
                color: '#3a1890',
                margin: 0,
                ...OUTLINE,
              }}>
                今日のデッキを組む
              </p>
              <p style={{
                fontFamily: ZEN_FONT,
                fontSize: 'clamp(0.68rem, 3vw, 0.84rem)',
                fontWeight: 700,
                color: '#6848b0',
                margin: 0,
                textShadow: '0 1px 3px rgba(255,255,255,0.95)',
              }}>
                カードスロットを自分でセット ✦
              </p>
            </div>
          </motion.button>

          {/* ⑤ サブボタン 2列（1fr 1fr） */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>

            {/* カードをつくる */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 180 }}
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
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '0 6px',
              }}>
                <div style={{
                  flexShrink: 0, width: 36, height: 36,
                  backgroundImage: "url('/img/deco_2.png')",
                  backgroundSize: '200% auto',
                  backgroundPosition: '0% 50%',
                  backgroundRepeat: 'no-repeat',
                }} />
                <span style={{
                  fontFamily: ZEN_FONT,
                  fontSize: 'clamp(0.78rem, 3.8vw, 1rem)',
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

            {/* コレクションをみる */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.46, type: 'spring', stiffness: 180 }}
              whileTap={{ scale: 0.95, y: 2 }}
              onClick={() => router.push('/album')}
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
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '0 6px',
              }}>
                <div style={{
                  flexShrink: 0, width: 36, height: 36,
                  backgroundImage: "url('/img/deco_2.png')",
                  backgroundSize: '200% auto',
                  backgroundPosition: '100% 50%',
                  backgroundRepeat: 'no-repeat',
                }} />
                <span style={{
                  fontFamily: ZEN_FONT,
                  fontSize: 'clamp(0.78rem, 3.8vw, 1rem)',
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
