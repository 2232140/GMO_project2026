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
    /* 背景: fixed で全画面 / cover + center でスマホ縦長に最適化 */
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
      {/* ━━━ メインコンテナ ━━━
          100dvh: スマホアドレスバー込みの実表示領域に固定
          space-between: 要素を縦方向に均等分散
          padding bottom 24px: 最下部ボタンが確実に見切れない余白 */}
      <div
        style={{
          position: 'relative',
          height: '100dvh',
          maxWidth: 430,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '12px 16px 24px 16px',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >

        {/* ① 設定ボタン: absolute で右上に浮かせる */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => router.push('/settings')}
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 10,
            width: 110,
          }}
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

        {/* ② ロゴ: 設定ボタンの下に収まるよう marginTop で押し下げ */}
        <motion.div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, type: 'spring', stiffness: 130 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/logo.png"
            alt="MIRROR GRAPH"
            style={{ maxHeight: '12vh', width: 'auto', display: 'block' }}
          />
        </motion.div>

        {/* ③ メインビジュアル: hero-cards.png (max-height 25vh) */}
        <motion.div
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          initial={{ opacity: 0, scale: 0.88, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 110 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/hero-cards.png"
            alt="カードコレクション"
            style={{
              width: '100%',
              maxHeight: '25vh',
              objectFit: 'contain',
              display: 'block',
              filter: 'drop-shadow(0 8px 24px rgba(120,40,180,0.55))',
            }}
          />
        </motion.div>

        {/* ④⑤ ボタン群: メインボタン + サブ2列 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

          {/* ④ メインボタン: 今日のデッキを組む */}
          <motion.button
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, type: 'spring', stiffness: 180 }}
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

          {/* ⑤ サブボタン 2列 (1fr 1fr / gap 8px) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>

            {/* カードをつくる */}
            <motion.button
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.38, type: 'spring', stiffness: 180 }}
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
                  flexShrink: 0, width: 34, height: 34,
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

            {/* コレクションをみる */}
            <motion.button
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.44, type: 'spring', stiffness: 180 }}
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
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '0 6px',
              }}>
                <div style={{
                  flexShrink: 0, width: 34, height: 34,
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
