'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Settings } from 'lucide-react'

/* ━━━ 3枚のサンプルカード（同一ピボットから扇状） ━━━ */
const SAMPLE_CARDS = [
  { src: '/img/dress.png', label: 'トップス', rotate: -8, z: 1, floatDelay: 0.0  },
  { src: '/img/shoes.png', label: 'シューズ', rotate:  0, z: 3, floatDelay: 0.45 },
  { src: '/img/cosme.png', label: 'コスメ',   rotate:  8, z: 2, floatDelay: 0.22 },
]

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

const CARD_W = 148
const CARD_H = 207

export default function HomeScreen() {
  const router = useRouter()

  return (
    /* position: fixed で viewport を完全に占有 → ボディスクロール完全防止 */
    <div
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        backgroundImage: "url('/img/wall.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* ━━━ スマホ幅コンテナ (max 430px / 中央寄せ / 全高) ━━━ */}
      <div
        className="mx-auto w-full h-full flex flex-col"
        style={{ maxWidth: 430 }}
      >

        {/* ━━━ ヘッダー：設定ボタン ━━━ */}
        <header className="flex-shrink-0 relative z-20 flex justify-end px-4 pt-3 pb-0">
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => router.push('/settings')}
            className="relative"
            style={{ width: 110 }}
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

        {/* ━━━ メインコンテンツ ━━━ */}
        <div className="flex-1 relative z-20 flex flex-col items-center px-3 overflow-hidden">

          {/* ロゴ */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, y: -28, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, type: 'spring', stiffness: 130 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/logo.png"
              alt="MIRROR GRAPH"
              style={{ width: 'min(360px, 84vw)', height: 'auto', display: 'block' }}
            />
          </motion.div>

          {/* ━━━ カードファン（3枚 / 同一底辺ピボットから扇状に回転） ━━━ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.18, type: 'spring', stiffness: 110 }}
            className="flex-1 relative w-full"
            style={{ minHeight: 180 }}
          >
            {SAMPLE_CARDS.map((card, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  left: '50%',
                  bottom: 16,
                  marginLeft: -(CARD_W / 2),
                  /* 全カード同一ピボット点から rotate のみで扇状に展開 */
                  transform: `rotate(${card.rotate}deg)`,
                  transformOrigin: 'bottom center',
                  zIndex: card.z,
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
                {/* 白背景（透過防止） */}
                <div style={{
                  position: 'absolute', inset: 0,
                  borderRadius: 10,
                  background: 'white',
                  zIndex: 0,
                }} />
                {/* イラスト */}
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
          <div className="flex-shrink-0 w-full flex flex-col gap-3 px-1">

            {/* メインボタン: 今日のデッキを組む */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.36, type: 'spring', stiffness: 180 }}
              whileTap={{ scale: 0.97, y: 3 }}
              onClick={() => router.push('/deck')}
              className="relative w-full"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/Logo_Frame.png"
                alt=""
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
                <p className="font-black leading-tight" style={{
                  fontFamily: ZEN_FONT,
                  fontSize: 'clamp(1.1rem, 5.2vw, 1.4rem)',
                  color: '#3a1890',
                  ...OUTLINE,
                }}>
                  今日のデッキを組む
                </p>
                <p className="font-bold" style={{
                  fontFamily: ZEN_FONT,
                  fontSize: 'clamp(0.68rem, 3vw, 0.84rem)',
                  color: '#6848b0',
                  textShadow: '0 1px 3px rgba(255,255,255,0.95)',
                }}>
                  カードスロットを自分でセット ✦
                </p>
              </div>
            </motion.button>

            {/* サブボタン 2列 */}
            <div className="grid grid-cols-2 gap-2">

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
                  <div className="flex-shrink-0" style={{
                    width: 32, height: 32,
                    backgroundImage: "url('/img/deco_2.png')",
                    backgroundSize: '200% auto',
                    backgroundPosition: '0% 50%',
                    backgroundRepeat: 'no-repeat',
                  }} />
                  <span className="font-black leading-tight text-left" style={{
                    fontFamily: ZEN_FONT,
                    fontSize: 'clamp(0.68rem, 3.3vw, 0.88rem)',
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
                  <div className="flex-shrink-0" style={{
                    width: 32, height: 32,
                    backgroundImage: "url('/img/deco_2.png')",
                    backgroundSize: '200% auto',
                    backgroundPosition: '100% 50%',
                    backgroundRepeat: 'no-repeat',
                  }} />
                  <span className="font-black leading-tight text-left" style={{
                    fontFamily: ZEN_FONT,
                    fontSize: 'clamp(0.68rem, 3.3vw, 0.88rem)',
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
            className="flex-shrink-0 text-sm font-black py-3"
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
