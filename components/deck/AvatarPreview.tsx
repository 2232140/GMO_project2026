'use client'

import { motion } from 'framer-motion'
import { Deck } from '@/lib/types'

interface Props {
  deck: Deck
  score: number
  theme: string | null
}

export default function AvatarPreview({ deck, score, theme }: Props) {
  const filledCount = Object.values(deck).filter(Boolean).length
  const isComplete = filledCount === 5

  const getScoreColor = (s: number) => {
    if (s >= 90) return 'text-amber-300'
    if (s >= 70) return 'text-purple-300'
    if (s >= 50) return 'text-blue-300'
    return 'text-white/60'
  }

  const getScoreLabel = (s: number) => {
    if (s >= 90) return '✨ レジェンドコーデ！'
    if (s >= 70) return '💜 スーパーレアコーデ'
    if (s >= 50) return '💙 レアコーデ'
    if (s > 0) return '⬜ ノーマルコーデ'
    return 'デッキを組んでね！'
  }

  return (
    <div className="glass-holo rounded-3xl p-4 relative overflow-hidden" style={{ borderRadius:'24px' }}>
      {/* Decorative background gradient */}
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <div className="absolute top-0 left-0 w-32 h-32 bg-pink-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-violet-500 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-4 w-16 h-16 bg-sky-400 rounded-full blur-2xl" />
      </div>

      <div className="relative flex items-center gap-6">
        {/* Avatar silhouette */}
        <div className="relative flex-shrink-0">
          <div
            className="w-24 h-32 rounded-2xl flex items-center justify-center relative overflow-hidden"
            style={{
              background: isComplete
                ? 'linear-gradient(135deg, rgba(255,20,147,0.2), rgba(155,89,182,0.2))'
                : 'rgba(255,255,255,0.05)',
              border: isComplete
                ? '2px solid rgba(255,215,0,0.5)'
                : '2px dashed rgba(255,255,255,0.15)',
            }}
          >
            {/* Mini outfit visual */}
            <div className="flex flex-col items-center gap-1">
              {deck.cosme && (
                <span className="text-2xl float-anim">{deck.cosme.emoji}</span>
              )}
              <div className="flex items-center gap-0.5">
                {deck.tops && <span className="text-lg">{deck.tops.emoji}</span>}
              </div>
              <div className="flex items-center gap-0.5">
                {deck.bottoms && <span className="text-lg">{deck.bottoms.emoji}</span>}
              </div>
              <div className="flex items-center gap-0.5">
                {deck.shoes && <span className="text-base">{deck.shoes.emoji}</span>}
                {deck.bag && <span className="text-base">{deck.bag.emoji}</span>}
              </div>
            </div>

            {/* Completion glow */}
            {isComplete && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  background: 'radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%)',
                }}
              />
            )}
          </div>

          {/* Filled indicator */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i < filledCount
                      ? 'bg-gradient-to-br from-pink-400 to-purple-400 shadow-lg shadow-pink-500/50'
                      : 'bg-white/15'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          {theme && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full glass mb-2"
            >
              <span className="text-xs text-white/60">テーマ</span>
              <span className="text-xs font-bold text-white">{theme}</span>
            </motion.div>
          )}

          <motion.div
            key={score}
            initial={{ scale: 1.25 }}
            animate={{ scale: 1 }}
            className={`font-black mb-1 ${getScoreColor(score)}`}
            style={{
              fontSize: '2rem',
              textShadow: score >= 90 ? '0 0 12px rgba(255,215,0,0.7)' : score >= 70 ? '0 0 10px rgba(192,132,252,0.7)' : 'none',
            }}
          >
            {score > 0 ? `${score}pt` : '--'}
          </motion.div>

          <p className={`text-sm font-black ${getScoreColor(score)}`}
            style={{ textShadow: score >= 50 ? '0 0 8px currentColor' : 'none' }}>
            {getScoreLabel(score)}
          </p>

          <p className="text-white/45 text-xs mt-1 font-semibold">
            {filledCount}/5 スロット装填済み
          </p>
        </div>
      </div>
    </div>
  )
}
