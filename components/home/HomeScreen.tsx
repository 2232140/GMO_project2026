'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Settings, Wand2, BookOpen, Camera, Layers } from 'lucide-react'

const NAV_ITEMS = [
  {
    id: 'ai',
    emoji: '✨',
    label: 'AIにおまかせでコーデを組む',
    sub: 'AIが最適な5枚を自動セット！',
    href: '/deck',
    color: 'from-violet-500 via-fuchsia-500 to-pink-500',
    shadowColor: 'rgba(168, 85, 247, 0.5)',
    icon: Wand2,
    delay: 0.1,
    size: 'large',
  },
  {
    id: 'deck',
    emoji: '👚',
    label: '今日のデッキをセットする',
    sub: 'カードスロットを自分でセット',
    href: '/deck',
    color: 'from-pink-500 via-rose-500 to-fuchsia-600',
    shadowColor: 'rgba(236, 72, 153, 0.5)',
    icon: Layers,
    delay: 0.2,
    size: 'normal',
  },
  {
    id: 'create',
    emoji: '📸',
    label: '新しいカードを作る',
    sub: '服・コスメをAIがカード化',
    href: '/create',
    color: 'from-sky-500 via-blue-500 to-indigo-600',
    shadowColor: 'rgba(59, 130, 246, 0.5)',
    icon: Camera,
    delay: 0.3,
    size: 'normal',
  },
  {
    id: 'album',
    emoji: '📖',
    label: 'コレクションアルバムを見る',
    sub: 'カード帳・コーデ履歴',
    href: '/album',
    color: 'from-amber-500 via-orange-500 to-yellow-500',
    shadowColor: 'rgba(245, 158, 11, 0.5)',
    icon: BookOpen,
    delay: 0.4,
    size: 'normal',
  },
]

export default function HomeScreen() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Settings button */}
      <header className="flex justify-end px-4 pt-4">
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          onClick={() => router.push('/settings')}
          className="glass p-2.5 rounded-2xl flex items-center gap-2 hover:bg-white/10 transition-all group"
        >
          <Settings className="w-5 h-5 text-white/60 group-hover:rotate-45 transition-transform duration-300" />
          <span className="text-white/60 text-sm font-medium hidden sm:block">マイ設定</span>
        </motion.button>
      </header>

      {/* Hero */}
      <div className="flex flex-col items-center px-6 pt-4 pb-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 150 }}
          className="mb-2"
        >
          <div className="relative">
            <h1
              className="text-5xl sm:text-6xl font-black tracking-tight holo-shimmer select-none"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              MIRROR
            </h1>
            <h1
              className="text-5xl sm:text-6xl font-black tracking-tight text-center"
              style={{
                background: 'linear-gradient(135deg, #ffd700, #ff1493, #9b59b6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontFamily: 'var(--font-nunito)',
                filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.5))',
              }}
            >
              GRAPH
            </h1>

            {/* Decorative stars */}
            <div className="absolute -top-4 -right-6 text-2xl star-twinkle">✦</div>
            <div className="absolute -bottom-2 -left-4 text-xl star-twinkle" style={{ animationDelay: '0.7s' }}>✦</div>
            <div className="absolute top-2 -left-8 text-sm star-twinkle" style={{ animationDelay: '1.3s' }}>⭐</div>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-4"
        >
          <p className="text-white/80 font-bold text-lg">今日のあなたをプロデュース！</p>
          <p className="text-white/40 text-sm mt-0.5">AI × トレカで輝く毎日のコーデ</p>
        </motion.div>

        {/* Main visual - card fan */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, type: 'spring', stiffness: 120 }}
          className="relative h-28 w-full flex items-center justify-center mb-6"
        >
          {[
            { emoji: '👗', grad: 'from-pink-400 to-fuchsia-500', rotate: -20, x: -70 },
            { emoji: '👠', grad: 'from-sky-400 to-blue-500', rotate: -10, x: -35 },
            { emoji: '✨', grad: 'from-violet-400 to-purple-500', rotate: 0, x: 0 },
            { emoji: '💄', grad: 'from-rose-400 to-pink-500', rotate: 10, x: 35 },
            { emoji: '👜', grad: 'from-amber-400 to-yellow-500', rotate: 20, x: 70 },
          ].map((card, i) => (
            <motion.div
              key={i}
              className={`absolute w-16 h-22 rounded-xl bg-gradient-to-br ${card.grad} flex items-center justify-center shadow-2xl`}
              style={{
                rotate: card.rotate,
                x: card.x,
                height: '5.5rem',
                boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                border: '2px solid rgba(255,255,255,0.2)',
              }}
              animate={{
                y: [0, -4 + i * 1, 0],
              }}
              transition={{
                duration: 2.5 + i * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
            >
              <span className="text-2xl">{card.emoji}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Nav buttons */}
        <div className="w-full max-w-md flex flex-col gap-3">
          {NAV_ITEMS.map((item) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: item.delay, type: 'spring', stiffness: 200, damping: 20 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push(item.href)}
              className={`relative w-full rounded-2xl overflow-hidden group ${
                item.size === 'large' ? 'py-5' : 'py-3.5'
              }`}
              style={{
                background: `linear-gradient(135deg, ${item.color.includes('violet') ? '#7c3aed, #a21caf, #db2777' : 'transparent'})`,
              }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-90 group-hover:opacity-100 transition-opacity`}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity"
                style={{
                  background:
                    'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)',
                }}
              />
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ boxShadow: `0 0 30px ${item.shadowColor}` }}
              />

              <div className="relative flex items-center px-5 gap-4">
                <span className={item.size === 'large' ? 'text-3xl' : 'text-2xl'}>
                  {item.emoji}
                </span>
                <div className="text-left flex-1">
                  <p
                    className={`text-white font-black leading-tight ${
                      item.size === 'large' ? 'text-lg' : 'text-base'
                    }`}
                  >
                    {item.label}
                  </p>
                  <p className="text-white/70 text-xs mt-0.5 font-medium">{item.sub}</p>
                </div>
                <item.icon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors flex-shrink-0" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-white/20 text-xs text-center"
        >
          ✦ GMO DESIGN AWARD 2026 ✦
        </motion.p>
      </div>
    </div>
  )
}
