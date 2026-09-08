'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Settings, Wand2, BookOpen, Camera, Layers } from 'lucide-react'
import SparkleDecor from '@/components/ui/SparkleDecor'

const NAV_ITEMS = [
  {
    id: 'ai',
    emoji: '✨',
    label: 'AIにおまかせでコーデを組む',
    sub: 'AIが最適な5枚を自動セット！',
    href: '/deck',
    gradient: 'linear-gradient(175deg, #c084fc 0%, #9333ea 40%, #7e22ce 100%)',
    shadow: '#4a1080',
    glow: 'rgba(147,51,234,0.55)',
    icon: Wand2,
    delay: 0.10,
    large: true,
  },
  {
    id: 'deck',
    emoji: '👚',
    label: '今日のデッキをセットする',
    sub: 'カードスロットを自分でセット',
    href: '/deck',
    gradient: 'linear-gradient(175deg, #ff8fd8 0%, #ff1493 40%, #c20070 100%)',
    shadow: '#880055',
    glow: 'rgba(255,20,147,0.55)',
    icon: Layers,
    delay: 0.18,
    large: false,
  },
  {
    id: 'create',
    emoji: '📸',
    label: '新しいカードを作る',
    sub: '服・コスメをAIがカード化',
    href: '/create',
    gradient: 'linear-gradient(175deg, #7dd3fc 0%, #0ea5e9 40%, #0369a1 100%)',
    shadow: '#023e6b',
    glow: 'rgba(14,165,233,0.55)',
    icon: Camera,
    delay: 0.26,
    large: false,
  },
  {
    id: 'album',
    emoji: '📖',
    label: 'コレクションアルバムを見る',
    sub: 'カード帳・コーデ履歴',
    href: '/album',
    gradient: 'linear-gradient(175deg, #fde68a 0%, #f59e0b 40%, #b45309 100%)',
    shadow: '#7c3500',
    glow: 'rgba(245,158,11,0.55)',
    icon: BookOpen,
    delay: 0.34,
    large: false,
  },
]

export default function HomeScreen() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* 設定ボタン */}
      <header className="flex justify-end px-4 pt-4">
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          onClick={() => router.push('/settings')}
          className="glass-holo rounded-2xl p-2.5 flex items-center gap-2 hover:scale-105 transition-transform group"
          style={{ borderRadius: '14px' }}
        >
          <Settings className="w-5 h-5 text-white/70 group-hover:rotate-45 transition-transform duration-300" />
          <span className="text-white/70 text-sm font-bold hidden sm:block">マイ設定</span>
        </motion.button>
      </header>

      <div className="flex flex-col items-center px-5 pt-3 pb-8">
        {/* ロゴ */}
        <motion.div
          initial={{ opacity: 0, y: -32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 140 }}
          className="mb-1 relative"
        >
          <div className="relative inline-block">
            <h1
              className="text-5xl sm:text-6xl font-black tracking-tight holo-shimmer select-none"
              style={{ letterSpacing: '-0.02em' }}
            >
              MIRROR
            </h1>
            <h1
              className="text-5xl sm:text-6xl font-black tracking-tight text-center select-none"
              style={{
                background:   'linear-gradient(135deg,#ffd700 0%,#ff69b4 40%,#c084fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.02em',
                filter: 'drop-shadow(0 0 18px rgba(255,215,0,0.55))',
              }}
            >
              GRAPH
            </h1>

            {/* スパークル装飾 */}
            <SparkleDecor variant="full" />
          </div>
        </motion.div>

        {/* タグライン */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className="text-center mb-4 mt-3"
        >
          <p className="font-black text-lg" style={{
            background: 'linear-gradient(90deg,#ff69b4,#c084fc,#7dd3fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 8px rgba(255,105,180,0.5))',
          }}>
            今日のあなたをプロデュース！
          </p>
          <p className="text-white/50 text-sm mt-0.5 font-semibold">
            AI × トレカで輝く毎日のコーデ ✨
          </p>
        </motion.div>

        {/* カードファン */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.22, type: 'spring', stiffness: 120 }}
          className="relative h-32 w-full flex items-center justify-center mb-5"
        >
          {[
            { emoji:'👗', grad:'linear-gradient(135deg,#ff8fd8,#ff1493)', rotate:-22, x:-72, glow:'rgba(255,20,147,0.5)' },
            { emoji:'👠', grad:'linear-gradient(135deg,#7dd3fc,#0ea5e9)', rotate:-11, x:-36, glow:'rgba(14,165,233,0.5)' },
            { emoji:'✨', grad:'linear-gradient(135deg,#c084fc,#7c3aed)', rotate:  0, x:  0, glow:'rgba(124,58,237,0.5)' },
            { emoji:'💄', grad:'linear-gradient(135deg,#fca5a5,#ef4444)', rotate: 11, x: 36, glow:'rgba(239,68,68,0.5)'  },
            { emoji:'👜', grad:'linear-gradient(135deg,#fde68a,#f59e0b)', rotate: 22, x: 72, glow:'rgba(245,158,11,0.5)' },
          ].map((card, i) => (
            <motion.div
              key={i}
              className="absolute w-16 rounded-2xl flex items-center justify-center shadow-2xl"
              style={{
                height: '6rem',
                background: card.grad,
                border: '2.5px solid rgba(255,255,255,0.45)',
                boxShadow: `0 6px 20px ${card.glow}, inset 0 1px 3px rgba(255,255,255,0.5)`,
                rotate: card.rotate,
                x: card.x,
              }}
              animate={{ y: [0, -(4 + i), 0] }}
              transition={{ duration: 2.6 + i * 0.28, repeat: Infinity, ease: 'easeInOut', delay: i * 0.18 }}
            >
              {/* カードのツヤハイライト */}
              <div className="absolute top-1.5 left-2 right-2 h-[38%] rounded-xl pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.50) 0%, transparent 100%)' }} />
              <span className="text-2xl relative z-10" style={{ filter:'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
                {card.emoji}
              </span>
            </motion.div>
          ))}

          {/* カードファン下のキラキラ */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            animate={{ opacity:[0.3,1,0.3], scaleX:[1,1.4,1] }}
            transition={{ duration:2.5, repeat:Infinity, ease:'easeInOut' }}
            style={{ width:'80px', height:'6px', background:'radial-gradient(ellipse, rgba(255,20,147,0.6) 0%, transparent 70%)', filter:'blur(3px)' }}
          />
        </motion.div>

        {/* ナビゲーションボタン */}
        <div className="w-full max-w-md flex flex-col gap-3">
          {NAV_ITEMS.map((item) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: item.delay, type: 'spring', stiffness: 200, damping: 22 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push(item.href)}
              className={`relative w-full rounded-2xl nav-btn overflow-visible ${item.large ? 'py-5' : 'py-3.5'}`}
              style={{
                background: item.gradient,
                boxShadow: `0 5px 0 ${item.shadow}, 0 10px 28px ${item.glow}, inset 0 1px 3px rgba(255,255,255,0.45)`,
              }}
            >
              {/* スパークル装飾 */}
              <SparkleDecor variant="button" />

              <div className="relative flex items-center px-5 gap-4 z-10">
                <span
                  className={item.large ? 'text-3xl' : 'text-2xl'}
                  style={{ filter:'drop-shadow(0 2px 5px rgba(0,0,0,0.35))' }}
                >
                  {item.emoji}
                </span>
                <div className="text-left flex-1">
                  <p className={`text-white font-black leading-tight drop-shadow ${item.large ? 'text-lg' : 'text-base'}`}
                    style={{ textShadow:'0 1px 4px rgba(0,0,0,0.4)' }}>
                    {item.label}
                  </p>
                  <p className="text-white/75 text-xs mt-0.5 font-semibold">{item.sub}</p>
                </div>
                <item.icon className="w-5 h-5 text-white/65 flex-shrink-0" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* フッター */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-6 text-xs text-center font-bold"
          style={{ color:'rgba(255,150,220,0.50)', textShadow:'0 0 8px rgba(255,20,147,0.3)' }}
        >
          ✦ GMO DESIGN AWARD 2026 ✦
        </motion.p>
      </div>
    </div>
  )
}
