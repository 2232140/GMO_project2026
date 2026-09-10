'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Settings } from 'lucide-react'
import React from 'react'

/* ━━━ 四隅デコステッカー位置定義 ━━━ */
type DecoPos = {
  top?: number; bottom?: number; left?: number; right?: number
  width: number; rotate: number; opacity: number; scaleX?: number
}

const DECO_POSITIONS: DecoPos[] = [
  { top: -25,  left:  -40, width: 210, rotate: -8,  opacity: 0.90             },
  { top: -20,  right: -45, width: 195, rotate:  11, opacity: 0.88, scaleX: -1 },
  { bottom: 30, left: -35, width: 185, rotate:   6, opacity: 0.82             },
  { bottom: 15, right: -40, width: 195, rotate: -9, opacity: 0.84, scaleX: -1 },
]

/* ━━━ サンプルカードデータ ━━━ */
const SAMPLE_CARDS = [
  { src: '/img/dress.png',  label: 'ワンピース', rotate: -8, x: -54, z: 1, floatDelay: 0.0  },
  { src: '/img/bottom.png', label: 'スカート',   rotate:  0, x:   0, z: 3, floatDelay: 0.45 },
  { src: '/img/cosme.png',  label: 'コスメ',     rotate:  8, x:  54, z: 2, floatDelay: 0.22 },
]

export default function HomeScreen() {
  const router = useRouter()

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-x-hidden"
      style={{
        backgroundImage: "url('/img/wall.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
      }}
    >

      {/* ━━━ 四隅デコステッカー ━━━ */}
      {DECO_POSITIONS.map((d, i) => {
        const style: React.CSSProperties = {
          position: 'absolute',
          width: d.width,
          transform: `rotate(${d.rotate}deg) scaleX(${d.scaleX ?? 1})`,
          opacity: d.opacity,
          zIndex: 5,
          pointerEvents: 'none',
          userSelect: 'none',
        }
        if (d.top    !== undefined) style.top    = d.top
        if (d.bottom !== undefined) style.bottom = d.bottom
        if (d.left   !== undefined) style.left   = d.left
        if (d.right  !== undefined) style.right  = d.right

        return (
          <div key={i} style={style}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/deco_1.png" alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        )
      })}

      {/* ━━━ 設定ボタン ━━━ */}
      <header className="relative z-20 flex justify-end px-4 pt-4">
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => router.push('/settings')}
          className="relative flex items-center gap-1.5 px-5 py-2.5"
          style={{ minWidth: 88 }}
        >
          <div className="absolute inset-0" style={{
            backgroundImage: "url('/img/Logo_Frame.png')",
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
          }} />
          <Settings className="w-4 h-4 relative z-10" style={{ color: '#5030a0' }} />
          <span className="relative z-10 text-sm font-black" style={{
            color: '#5030a0',
            fontFamily: 'var(--font-fredoka), var(--font-nunito), sans-serif',
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
            style={{ width: 'min(310px, 84vw)', height: 'auto', display: 'block' }}
          />
        </motion.div>

        {/* ━━━ カードファン（3枚） ━━━ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.82, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.18, type: 'spring', stiffness: 110 }}
          className="relative mb-5"
          style={{ height: 205, width: 290 }}
        >
          {SAMPLE_CARDS.map((card, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                width: 120,
                height: 168,
                left: '50%',
                top: 0,
                marginLeft: -60,
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
        <div className="w-full max-w-xs flex flex-col gap-3">

          {/* メインボタン：今日のデッキを組む */}
          <motion.button
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.36, type: 'spring', stiffness: 180 }}
            whileTap={{ scale: 0.96, y: 3 }}
            onClick={() => router.push('/deck')}
            className="relative w-full py-5 flex flex-col items-center"
          >
            <div className="absolute inset-0" style={{
              backgroundImage: "url('/img/Logo_Frame.png')",
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
            }} />
            <p className="relative z-10 font-black text-lg leading-tight" style={{
              color: '#3a1890',
              fontFamily: 'var(--font-fredoka), var(--font-nunito), sans-serif',
              textShadow: '0 1px 2px rgba(255,255,255,0.95)',
            }}>
              今日のデッキを組む
            </p>
            <p className="relative z-10 text-xs font-bold mt-0.5" style={{
              color: '#6848b0',
              textShadow: '0 1px 1px rgba(255,255,255,0.8)',
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
              className="relative py-3 px-3 flex items-center justify-center gap-2"
            >
              <div className="absolute inset-0" style={{
                backgroundImage: "url('/img/Logo_Frame.png')",
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
              }} />
              {/* 魔法陣ペン（deco_2 左半分） */}
              <div className="relative z-10 flex-shrink-0" style={{
                width: 40, height: 40,
                backgroundImage: "url('/img/deco_2.png')",
                backgroundSize: '200% auto',
                backgroundPosition: '0% 50%',
                backgroundRepeat: 'no-repeat',
              }} />
              <span className="relative z-10 text-xs font-black leading-tight text-left" style={{
                color: '#3a1890',
                fontFamily: 'var(--font-fredoka), var(--font-nunito), sans-serif',
                textShadow: '0 1px 2px rgba(255,255,255,0.95)',
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
              className="relative py-3 px-3 flex items-center justify-center gap-2"
            >
              <div className="absolute inset-0" style={{
                backgroundImage: "url('/img/Logo_Frame.png')",
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
              }} />
              {/* バインダー（deco_2 右半分） */}
              <div className="relative z-10 flex-shrink-0" style={{
                width: 40, height: 40,
                backgroundImage: "url('/img/deco_2.png')",
                backgroundSize: '200% auto',
                backgroundPosition: '100% 50%',
                backgroundRepeat: 'no-repeat',
              }} />
              <span className="relative z-10 text-xs font-black leading-tight text-left" style={{
                color: '#3a1890',
                fontFamily: 'var(--font-fredoka), var(--font-nunito), sans-serif',
                textShadow: '0 1px 2px rgba(255,255,255,0.95)',
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
            color: '#9060c0',
            fontFamily: 'var(--font-fredoka), var(--font-nunito), sans-serif',
            textShadow: '0 0 10px rgba(255,180,240,0.9)',
          }}
        >
          ✦ GMO DESIGN AWARD 2026 ✦
        </motion.p>

      </div>
    </div>
  )
}
