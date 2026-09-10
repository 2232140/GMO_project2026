'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Settings } from 'lucide-react'

/* ━━━ 3枚のサンプルカード ━━━ */
const SAMPLE_CARDS = [
  { src: '/img/dress.png',  label: 'トップス', rotate: -10, x: -76, z: 1, floatDelay: 0.0  },
  { src: '/img/shoes.png',  label: 'シューズ', rotate:   0, x:   0, z: 3, floatDelay: 0.45 },
  { src: '/img/cosme.png',  label: 'コスメ',   rotate:  10, x:  76, z: 2, floatDelay: 0.22 },
]

/* ━━━ 共通スタイル定数 ━━━ */
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
      className="min-h-screen relative"
      style={{
        backgroundImage: "url('/img/wall.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* ━━━ スマホ幅コンテナ (max 430px / 中央寄せ) ━━━ */}
      <div className="mx-auto w-full min-h-screen flex flex-col" style={{ maxWidth: 430 }}>

        {/* ━━━ 設定ボタン ━━━ */}
        <header className="relative z-20 flex justify-end px-4 pt-4">
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => router.push('/settings')}
            className="relative"
            style={{ width: 120 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/Logo_Frame.png" alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
            <div className="absolute inset-0 flex items-center justify-center gap-1.5">
              <Settings className="w-4 h-4 flex-shrink-0" style={{ color: '#5030a0' }} />
              <span className="text-sm font-black" style={{ fontFamily: ZEN_FONT, color: '#5030a0', ...OUTLINE }}>
                設定
              </span>
            </div>
          </motion.button>
        </header>

        <div className="relative z-20 flex flex-col items-center px-3 pb-10">

          {/* ━━━ ロゴ (88% 幅) ━━━ */}
          <motion.div
            initial={{ opacity: 0, y: -28, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, type: 'spring', stiffness: 130 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/logo.png"
              alt="MIRROR GRAPH"
              style={{ width: 'min(400px, 88vw)', height: 'auto', display: 'block' }}
            />
          </motion.div>

          {/* ━━━ カードファン（3枚 / -10・0・+10deg) ━━━ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.18, type: 'spring', stiffness: 110 }}
            className="relative w-full mb-7"
            style={{ height: 268 }}
          >
            {SAMPLE_CARDS.map((card, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  width: 160,
                  height: 224,
                  left: '50%',
                  top: 0,
                  marginLeft: -80,
                  transform: `translateX(${card.x}px) rotate(${card.rotate}deg)`,
                  transformOrigin: 'bottom center',
                  zIndex: card.z,
                  opacity: 1,
                  filter: 'drop-shadow(0 12px 22px rgba(120,40,180,0.55))',
                }}
                animate={{ y: [0, -(5 + i * 2), 0] }}
                transition={{
                  duration: 2.8 + i * 0.45,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: card.floatDelay,
                }}
              >
                {/* 白背景（透過完全防止） */}
                <div style={{
                  position: 'absolute', inset: 0,
                  borderRadius: 10,
                  background: 'white',
                  zIndex: 0,
                }} />
                {/* イラスト（フレームの背後） */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.src}
                  alt={card.label}
                  style={{
                    position: 'absolute',
                    top: '12%',
                    left: '7%',
                    width: '86%',
                    objectFit: 'contain',
                    zIndex: 1,
                    pointerEvents: 'none',
                  }}
                />
                {/* カードフレーム（前面）*/}
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
          <div className="w-full flex flex-col gap-4 px-1">

            {/* メインボタン: 今日のデッキを組む */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.36, type: 'spring', stiffness: 180 }}
              whileTap={{ scale: 0.97, y: 3 }}
              onClick={() => router.push('/deck')}
              className="relative w-full"
            >
              {/* Logo_Frame を自然なアスペクト比で表示（引き伸ばしなし） */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/Logo_Frame.png"
                alt=""
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
                <p className="font-black leading-tight" style={{
                  fontFamily: ZEN_FONT,
                  fontSize: 'clamp(1.15rem, 5.5vw, 1.45rem)',
                  color: '#3a1890',
                  ...OUTLINE,
                }}>
                  今日のデッキを組む
                </p>
                <p className="font-bold" style={{
                  fontFamily: ZEN_FONT,
                  fontSize: 'clamp(0.72rem, 3.2vw, 0.88rem)',
                  color: '#6848b0',
                  textShadow: '0 1px 3px rgba(255,255,255,0.95)',
                }}>
                  カードスロットを自分でセット ✦
                </p>
              </div>
            </motion.button>

            {/* サブボタン 2列 */}
            <div className="grid grid-cols-2 gap-3">

              {/* カードをつくる */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.46, type: 'spring', stiffness: 180 }}
                whileTap={{ scale: 0.95, y: 2 }}
                onClick={() => router.push('/create')}
                className="relative w-full"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/img/Logo_Frame.png"
                  alt=""
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
                <div className="absolute inset-0 flex items-center justify-center gap-2 px-2">
                  {/* 魔法陣ペン (deco_2 左半分) */}
                  <div className="flex-shrink-0" style={{
                    width: 36, height: 36,
                    backgroundImage: "url('/img/deco_2.png')",
                    backgroundSize: '200% auto',
                    backgroundPosition: '0% 50%',
                    backgroundRepeat: 'no-repeat',
                  }} />
                  <span className="font-black leading-tight text-left" style={{
                    fontFamily: ZEN_FONT,
                    fontSize: 'clamp(0.72rem, 3.5vw, 0.9rem)',
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
                transition={{ delay: 0.52, type: 'spring', stiffness: 180 }}
                whileTap={{ scale: 0.95, y: 2 }}
                onClick={() => router.push('/album')}
                className="relative w-full"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/img/Logo_Frame.png"
                  alt=""
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
                <div className="absolute inset-0 flex items-center justify-center gap-2 px-2">
                  {/* バインダー (deco_2 右半分) */}
                  <div className="flex-shrink-0" style={{
                    width: 36, height: 36,
                    backgroundImage: "url('/img/deco_2.png')",
                    backgroundSize: '200% auto',
                    backgroundPosition: '100% 50%',
                    backgroundRepeat: 'no-repeat',
                  }} />
                  <span className="font-black leading-tight text-left" style={{
                    fontFamily: ZEN_FONT,
                    fontSize: 'clamp(0.72rem, 3.5vw, 0.9rem)',
                    color: '#3a1890',
                    ...OUTLINE,
                  }}>
                    コレクションを<br />みる
                  </span>
                </div>
              </motion.button>

            </div>
          </div>

          {/* ━━━ フッター ━━━ */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 text-sm font-black"
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
