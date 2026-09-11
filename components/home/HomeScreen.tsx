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
        ┌──────────────────────────────────────┐
        │ [設定ボタン absolute 右上]            │
        │                                      │
        │  ロゴ (flex:1 で設定〜heroの間を       │
        │        歪みなく最大サイズに占有)       │
        │                                      │
        │  hero-cards.png                      │
        │  (width:100% = メインボタンと同幅)    │
        │                                      │
        │  ── 固定ギャップ 14px ──              │
        │                                      │
        │  今日のデッキを組む　(↓ 下げた位置)   │
        │  [カードをつくる] [コレクションをみる]  │
        └──────────────────────────────────────┘
      */}
      <div
        style={{
          position: 'relative',
          height: '100dvh',
          maxWidth: 430,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          padding: '12px 16px 24px 16px',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >

        {/* ① 設定ボタン: 右上に absolute 配置 */}
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

        {/* ② ロゴ: flex:1 で設定ボタン下〜ヒーロー画像上を最大サイズで占有
               minHeight:0 は flex child が正しく縮小できるように必須 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, type: 'spring', stiffness: 130 }}
          style={{
            flex: '1 1 0',
            minHeight: 0,
            marginTop: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/logo.png"
            alt="MIRROR GRAPH"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </motion.div>

        {/* ③ hero-cards.png: width=100% でメインボタンと同幅 / 歪みなし contain */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 110 }}
          style={{ flexShrink: 0 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/hero-cards.png"
            alt="カードコレクション"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              display: 'block',
              filter: 'drop-shadow(0 8px 24px rgba(120,40,180,0.55))',
            }}
          />
        </motion.div>

        {/* hero〜メインボタン間の固定ギャップ（ここが「下げた分」の距離） */}
        <div style={{ flexShrink: 0, height: 14 }} />

        {/* ④ メインボタン: 今日のデッキを組む */}
        <motion.button
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, type: 'spring', stiffness: 180 }}
          whileTap={{ scale: 0.97, y: 3 }}
          onClick={() => router.push('/deck')}
          style={{ flexShrink: 0, position: 'relative', width: '100%' }}
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

        {/* ⑤ サブボタン 2列: 位置はそのまま（メインボタンの 8px 下） */}
        <div
          style={{ flexShrink: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}
        >

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
  )
}
