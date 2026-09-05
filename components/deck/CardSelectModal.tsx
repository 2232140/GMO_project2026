'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Search } from 'lucide-react'
import { ItemCard, CardCategory, CosmeSubCategory } from '@/lib/types'
import { MOCK_ITEM_CARDS } from '@/lib/mockData'
import HolographicCard from '@/components/ui/HolographicCard'

const COSME_TABS: { key: CosmeSubCategory | 'all'; label: string; emoji: string }[] = [
  { key: 'all', label: 'すべて', emoji: '💫' },
  { key: 'palette', label: 'パレット', emoji: '🎨' },
  { key: 'lip', label: 'リップ', emoji: '💋' },
  { key: 'eye', label: 'アイ', emoji: '👁️' },
  { key: 'cheek', label: 'チーク', emoji: '🌸' },
  { key: 'base', label: 'ベース', emoji: '✨' },
]

interface Props {
  category: CardCategory
  onSelect: (card: ItemCard) => void
  onClose: () => void
  currentCard?: ItemCard | null
}

export default function CardSelectModal({ category, onSelect, onClose, currentCard }: Props) {
  const [cosmeTab, setCosmeTab] = useState<CosmeSubCategory | 'all'>('all')
  const [search, setSearch] = useState('')
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const filteredCards = MOCK_ITEM_CARDS.filter((card) => {
    if (card.category !== category) return false
    if (category === 'cosme' && cosmeTab !== 'all') {
      if (card.cosmeSubCategory !== cosmeTab) return false
    }
    if (search) {
      const q = search.toLowerCase()
      return (
        card.name.toLowerCase().includes(q) ||
        card.tags.some((t) => t.toLowerCase().includes(q)) ||
        (card.brand?.toLowerCase().includes(q) ?? false)
      )
    }
    return true
  })

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />

        {/* Modal */}
        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative w-full max-w-2xl mx-4 mb-0 sm:mb-4 glass-strong rounded-t-3xl sm:rounded-3xl overflow-hidden"
          style={{ maxHeight: '85vh' }}
        >
          {/* Header */}
          <div className="relative p-4 pb-3 border-b border-white/10">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                カードを選択
              </h2>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full glass hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4 text-white/70" />
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="カード名・タグで検索..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl glass text-white/90 text-sm placeholder-white/30 outline-none focus:border-pink-500/50 border border-white/10 focus:border-opacity-100"
              />
            </div>

            {/* Cosme sub-tabs */}
            {category === 'cosme' && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
                {COSME_TABS.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setCosmeTab(tab.key)}
                    className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      cosmeTab === tab.key
                        ? 'bg-pink-500/80 text-white shadow-lg shadow-pink-500/30'
                        : 'glass text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span>{tab.emoji}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Card Grid */}
          <div className="overflow-y-auto p-4" style={{ maxHeight: '60vh' }}>
            {filteredCards.length === 0 ? (
              <div className="text-center py-12 text-white/40">
                <div className="text-4xl mb-2">🔍</div>
                <p className="text-sm">カードが見つかりません</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {filteredCards.map((card, i) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex flex-col items-center gap-2"
                    onMouseEnter={() => setHoveredCard(card.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <HolographicCard
                      card={card}
                      size="md"
                      selected={currentCard?.id === card.id}
                      onClick={() => {
                        onSelect(card)
                        onClose()
                      }}
                    />
                    <div className="text-center">
                      <p className="text-white/90 text-xs font-bold leading-tight line-clamp-2">
                        {card.name}
                      </p>
                      <div className="flex flex-wrap justify-center gap-1 mt-1">
                        {card.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-white/40 text-xs px-1 py-0.5 rounded glass"
                            style={{ fontSize: '0.5rem' }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer hint */}
          <div className="p-3 border-t border-white/10 text-center text-white/30 text-xs">
            カードをクリックしてセット ✦ ESCで閉じる
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
