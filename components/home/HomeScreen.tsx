'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Settings } from 'lucide-react'

/* ━━━ サンプルカードデータ ━━━ */
const SAMPLE_CARDS = [
  { src: '/img/dress.png',  label: 'ワンピース', rotate: -8, x: -68, z: 1, floatDelay: 0.0  },
  { src: '/img/bottom.png', label: 'スカート',   rotate:  0, x:   0, z: 3, floatDelay: 0.45 },
  { src: '/img/cosme.png',  label: 'コスメ',     rotate:  8, x:  68, z: 2, floatDelay: 0.22 },
]

/* ━━━ ゲームUI風フチ取り文字 ━━━ */
const ZEN_FONT = 'var(--font-zen-maru-gothic), var(--font-nunito), sans-serif'
const OUTLINE_WHITE: React.CSSProperties = {
  textShadow: [
    '-1.5px -1.5px 0 white',
    ' 1.5px -1.5px 0 white',
    '-1.5px  1.5px 0 white',
    ' 1.5px  1.5px 0 white',
    '0 0 10px rgba(255,255,255,0.7)',
  ].join(', '),
}

/* ━━━ ボタン背景 (アスペクト比を維持して contain 表示) ━━━ */
const BTN_BG: React.CSSProperties = {
  backgroundImage: "url('/img/Logo_Frame.png')",
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}

import React from 'react'

export default function HomeScreen() {
  const router = useRouter()

  return (
    // 全画面背景: wall.jpeg を fixed で敷く
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: "url('/img/wall.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* スマホ幅コンテナ (max 430px / 中央寄せ) */}
      <div
        className="mx-auto w-full min-h-screen flex flex-col"
        style={{ maxWidth: 430 }}
      >

        {/* ━━━ 設定ボタン ━━━ */}
        <header className="relative z-20 flex justify-end px-4 pt-4">
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => router.push('/settings')}
            className="relative flex items-center gap-1.5 px-5 py-2.5"
            style={{ minWidth: 96 }}
          >
            <div className="absolute inset-0" style={BTN_BG} />
            <Settings className="w-4 h-4 relative z-10" style={{ color: '#5030a0' }} />
            <span className="relative z-10 text-sm font-black" style={{
              fontFamily: ZEN_FONT,
              color: '#5030a0',
              ...OUTLINE_WHITE,
            }}>
              設定
            </span>
          </motion.button>
        </header>

        <div className="relative z-20 flex flex-col items-center px-4 pb-10">

          {/* ━━━ ロゴ ━━━ */}
          <motion.div
            initial={{ opacity: 0, y: -28, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, type: 'spring', stiffness: 130 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/logo.png"
              alt="MIRROR GRAPH"
              style={{ width: 'min(370px, 82vw)', height: 'auto', display: 'block' }}
            />
          </motion.div>

          {/* ━━━ カードファン（3枚 / 1.27倍拡大） ━━━ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.18, type: 'spring', stiffness: 110 }}
            className="relative mb-5"
            style={{ height: 265, width: 360 }}
          >
            {SAMPLE_CARDS.map((card, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  width: 152,
                  height: 213,
                  left: '50%',
                  top: 0,
                  marginLeft: -76,
                  transform: `translateX(${card.x}px) rotate(${card.rotate}deg)`,
                  transformOrigin: 'bottom center',
                  zIndex: card.z,
                  filter: 'drop-shadow(0 10px 18px rgba(140,60,200,0.45))',
                }}
                animate={{ y: [0, -(5 + i * 2), 0] }}
                transition={{
                  duration: 2.8 + i * 0.45,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: card.floatDelay,
                }}
              >
                {/* イラスト（フレームの背後） */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.src}
                  alt={card.label}
                  style={{
                    position: 'absolute',
                    top: '14%',
                    left: '9%',
                    width: '82%',
                    objectFit: 'contain',
                    zIndex: 1,
                    pointerEvents: 'none',
                  }}
                />
                {/* カードフレーム（前面） */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/img/Card_Frame.png"
                  alt=""
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'fill',
                    zIndex: 2,
                    pointerEvents: 'none',
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* ━━━ ボタン群 ━━━ */}
          <div className="w-full max-w-xs flex flex-col gap-4">

            {/* メインボタン：今日のデッキを組む */}
            <motion.button
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.36, type: 'spring', stiffness: 180 }}
              whileTap={{ scale: 0.96, y: 3 }}
              onClick={() => router.push('/deck')}
              className="relative w-full flex flex-col items-center justify-center"
              style={{ height: 90 }}
            >
              <div className="absolute inset-0" style={BTN_BG} />
              <p className="relative z-10 font-black text-lg leading-tight" style={{
                fontFamily: ZEN_FONT,
                color: '#3a1890',
                ...OUTLINE_WHITE,
              }}>
                今日のデッキを組む
              </p>
              <p className="relative z-10 text-xs font-bold mt-1" style={{
                fontFamily: ZEN_FONT,
                color: '#6848b0',
                textShadow: '0 1px 3px rgba(255,255,255,0.9)',
              }}>
                カードスロットを自分でセット ✦
              </p>
            </motion.button>

            {/* サブボタン 2列 */}
            <div className="grid grid-cols-2 gap-3">

              {/* カードをつくる */}
              <motion.button
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.46, type: 'spring', stiffness: 180 }}
                whileTap={{ scale: 0.95, y: 2 }}
                onClick={() => router.push('/create')}
                className="relative flex items-center justify-center gap-2 px-3"
                style={{ height: 70 }}
              >
                <div className="absolute inset-0" style={BTN_BG} />
                {/* 魔法陣ペン（deco_2 左半分） */}
                <div className="relative z-10 flex-shrink-0" style={{
                  width: 36, height: 36,
                  backgroundImage: "url('/img/deco_2.png')",
                  backgroundSize: '200% auto',
                  backgroundPosition: '0% 50%',
                  backgroundRepeat: 'no-repeat',
                }} />
                <span className="relative z-10 text-xs font-black leading-snug text-left" style={{
                  fontFamily: ZEN_FONT,
                  color: '#3a1890',
                  ...OUTLINE_WHITE,
                }}>
                  カードを<br />つくる
                </span>
              </motion.button>

              {/* コレクションをみる */}
              <motion.button
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.52, type: 'spring', stiffness: 180 }}
                whileTap={{ scale: 0.95, y: 2 }}
                onClick={() => router.push('/album')}
                className="relative flex items-center justify-center gap-2 px-3"
                style={{ height: 70 }}
              >
                <div className="absolute inset-0" style={BTN_BG} />
                {/* バインダー（deco_2 右半分） */}
                <div className="relative z-10 flex-shrink-0" style={{
                  width: 36, height: 36,
                  backgroundImage: "url('/img/deco_2.png')",
                  backgroundSize: '200% auto',
                  backgroundPosition: '100% 50%',
                  backgroundRepeat: 'no-repeat',
                }} />
                <span className="relative z-10 text-xs font-black leading-snug text-left" style={{
                  fontFamily: ZEN_FONT,
                  color: '#3a1890',
                  ...OUTLINE_WHITE,
                }}>
                  コレクションを<br />みる
                </span>
              </motion.button>

            </div>
          </div>

          {/* ━━━ フッター ━━━ */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-7 text-xs font-black"
            style={{
              fontFamily: ZEN_FONT,
              color: '#9060c0',
              textShadow: '0 0 10px rgba(255,180,240,0.9)',
            }}
          >
            ✦ GMO DESIGN AWARD 2026 ✦
          </motion.p>

        </div>
      </div>
    </div>
  )
}
