'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Save, ChevronLeft, Wand2, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Deck, CardCategory, ItemCard } from '@/lib/types'
import { SLOT_CONFIG, MOCK_ITEM_CARDS, AI_COORD_THEMES } from '@/lib/mockData'
import CardSlot from './CardSlot'
import CardSelectModal from './CardSelectModal'
import AvatarPreview from './AvatarPreview'

const INITIAL_DECK: Deck = {
  tops: null,
  bottoms: null,
  shoes: null,
  bag: null,
  cosme: null,
}

function calcScore(deck: Deck): number {
  const cards = Object.values(deck).filter(Boolean) as ItemCard[]
  if (cards.length === 0) return 0
  const rarityPts: Record<string, number> = { normal: 10, rare: 20, 'super-rare': 35, legend: 50 }
  const base = cards.reduce((sum, c) => sum + rarityPts[c.rarity], 0)
  const bonus = cards.length === 5 ? 15 : 0
  return Math.min(100, base + bonus)
}

export default function DeckScreen() {
  const router = useRouter()
  const [deck, setDeck] = useState<Deck>(INITIAL_DECK)
  const [activeSlot, setActiveSlot] = useState<CardCategory | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveComplete, setSaveComplete] = useState(false)
  const [isAILoading, setIsAILoading] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<string | null>(null)

  const score = calcScore(deck)

  const handleSlotClick = (cat: CardCategory) => setActiveSlot(cat)

  const handleCardSelect = useCallback((card: ItemCard) => {
    setDeck((prev) => ({ ...prev, [card.category]: card }))
    setActiveSlot(null)
  }, [])

  const handleRemove = (cat: CardCategory) => {
    setDeck((prev) => ({ ...prev, [cat]: null }))
  }

  const handleAIRecommend = async () => {
    setIsAILoading(true)
    await new Promise((r) => setTimeout(r, 1800))

    const theme = AI_COORD_THEMES[Math.floor(Math.random() * AI_COORD_THEMES.length)]
    setCurrentTheme(theme.theme)

    const shuffled = [...MOCK_ITEM_CARDS].sort(() => Math.random() - 0.5)
    const aiDeck: Deck = {
      tops: shuffled.find((c) => c.category === 'tops') ?? null,
      bottoms: shuffled.find((c) => c.category === 'bottoms') ?? null,
      shoes: shuffled.find((c) => c.category === 'shoes') ?? null,
      bag: shuffled.find((c) => c.category === 'bag') ?? null,
      cosme: shuffled.find((c) => c.category === 'cosme') ?? null,
    }
    setDeck(aiDeck)
    setIsAILoading(false)
  }

  const handleSave = async () => {
    const filled = Object.values(deck).filter(Boolean).length
    if (filled === 0) return
    setIsSaving(true)
    await new Promise((r) => setTimeout(r, 1200))
    setIsSaving(false)
    setSaveComplete(true)
    await new Promise((r) => setTimeout(r, 2000))
    router.push('/album')
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-4 pb-2">
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">ホーム</span>
        </button>

        <div className="text-center">
          <h1 className="text-base font-black text-white flex items-center gap-1.5">
            <Star className="w-4 h-4 text-yellow-300" />
            デッキ・フィッティング
            <Star className="w-4 h-4 text-yellow-300" />
          </h1>
          <p className="text-white/40 text-xs">カードをスロットにセット！</p>
        </div>

        <div className="w-16" />
      </header>

      <div className="flex-1 flex flex-col px-4 pb-6 gap-4">
        {/* Avatar Preview */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <AvatarPreview deck={deck} score={score} theme={currentTheme} />
        </motion.div>

        {/* Card Slots */}
        <div className="glass-strong rounded-3xl p-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-40 h-40 bg-pink-500 rounded-full blur-3xl" />
          </div>

          <div className="relative">
            <p className="text-white/50 text-xs font-bold mb-4 text-center tracking-widest uppercase">
              ✦ 5つのスロット ✦
            </p>

            {/* Slots grid - 3 on top, 2 below */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-center gap-3 flex-wrap">
                {SLOT_CONFIG.slice(0, 3).map((slot, i) => (
                  <CardSlot
                    key={slot.key}
                    slot={slot}
                    card={deck[slot.key]}
                    onClick={() => handleSlotClick(slot.key)}
                    onRemove={() => handleRemove(slot.key)}
                    index={i}
                  />
                ))}
              </div>
              <div className="flex justify-center gap-3">
                {SLOT_CONFIG.slice(3).map((slot, i) => (
                  <CardSlot
                    key={slot.key}
                    slot={slot}
                    card={deck[slot.key]}
                    onClick={() => handleSlotClick(slot.key)}
                    onRemove={() => handleRemove(slot.key)}
                    index={i + 3}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleAIRecommend}
            disabled={isAILoading}
            className="w-full py-4 rounded-2xl btn-glow-purple font-black text-white text-base flex items-center justify-center gap-2 relative overflow-hidden"
          >
            {isAILoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
                <span>AIがコーデを考え中…</span>
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                <span>✨ AIおすすめを呼び出す</span>
              </>
            )}

            {/* Animated background */}
            {isAILoading && (
              <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            )}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSave}
            disabled={isSaving || Object.values(deck).filter(Boolean).length === 0}
            className="w-full py-4 rounded-2xl btn-glow-pink font-black text-white text-base flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed relative overflow-hidden"
          >
            {isSaving ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                >
                  <Star className="w-5 h-5 text-yellow-300" />
                </motion.div>
                <span>変身中…！</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>💾 デッキ保存 / 今日の変身完了！</span>
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Card Select Modal */}
      {activeSlot && (
        <CardSelectModal
          category={activeSlot}
          currentCard={deck[activeSlot]}
          onSelect={handleCardSelect}
          onClose={() => setActiveSlot(null)}
        />
      )}

      {/* Save Complete Flash */}
      <AnimatePresence>
        {saveComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(255,20,147,0.15)', backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="text-center"
            >
              <div className="text-8xl mb-4 float-anim">🌟</div>
              <h2 className="text-3xl font-black text-white neon-text-pink mb-2">
                変身完了！
              </h2>
              <p className="text-white/60 text-lg">コーデカードを発行しました✨</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Loading overlay */}
      <AnimatePresence>
        {isAILoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 pointer-events-none flex items-center justify-end pr-6 pb-32"
          >
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="glass-strong px-4 py-2 rounded-2xl flex items-center gap-2"
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="text-xl"
              >
                ✨
              </motion.span>
              <span className="text-white/80 text-sm font-bold">AI解析中…</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
