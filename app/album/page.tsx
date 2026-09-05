'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ChevronLeft, X, Star, BookOpen } from 'lucide-react'
import { MOCK_ITEM_CARDS, MOCK_COORD_CARDS, SLOT_CONFIG } from '@/lib/mockData'
import { ItemCard, CoordCard } from '@/lib/types'
import HolographicCard from '@/components/ui/HolographicCard'

type Tab = 'coord' | 'items'

export default function AlbumPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('coord')
  const [selectedCard, setSelectedCard] = useState<ItemCard | null>(null)
  const [selectedCoord, setSelectedCoord] = useState<CoordCard | null>(null)

  return (
    <div className="min-h-screen flex flex-col">
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
            <BookOpen className="w-4 h-4 text-amber-300" />
            コレクションアルバム
          </h1>
          <p className="text-white/40 text-xs">あなたのカード帳</p>
        </div>
        <div className="w-16" />
      </header>

      {/* Tabs */}
      <div className="flex gap-2 px-4 mb-4">
        {[
          { key: 'coord' as Tab, label: '完成コーデカード', emoji: '✨' },
          { key: 'items' as Tab, label: 'アイテムカード', emoji: '🎴' },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 py-2.5 rounded-2xl text-sm font-black transition-all flex items-center justify-center gap-1.5 ${
              tab === t.key
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/30'
                : 'glass text-white/50 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>{t.emoji}</span>
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 px-4 pb-6">
        <AnimatePresence mode="wait">
          {tab === 'coord' ? (
            <motion.div
              key="coord"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {MOCK_COORD_CARDS.length === 0 ? (
                <div className="text-center py-16 text-white/30">
                  <div className="text-5xl mb-3">📭</div>
                  <p>まだコーデカードがありません</p>
                  <p className="text-sm mt-1">デッキ画面でコーデを完成させよう！</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {MOCK_COORD_CARDS.map((coord, i) => (
                    <motion.button
                      key={coord.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => setSelectedCoord(coord)}
                      className="glass-strong rounded-2xl p-3 flex flex-col gap-2 hover:bg-white/10 transition-all relative overflow-hidden holo-card"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 pointer-events-none" />

                      {/* Score badge */}
                      <div className="absolute top-2 right-2 flex items-center gap-1 bg-amber-400/90 px-2 py-0.5 rounded-full">
                        <Star className="w-3 h-3 text-white fill-white" />
                        <span className="text-white text-xs font-black">{coord.totalScore}</span>
                      </div>

                      {/* Mini card fan */}
                      <div className="flex justify-center gap-1 py-2 relative h-16">
                        {Object.values(coord.deckCards).filter(Boolean).map((card, ci) => (
                          <div
                            key={ci}
                            className="absolute w-10 h-14 rounded-lg flex items-center justify-center text-xl"
                            style={{
                              background: `linear-gradient(135deg, rgba(30,10,50,0.9), rgba(60,20,80,0.9))`,
                              border: '1px solid rgba(255,255,255,0.2)',
                              transform: `rotate(${(ci - 2) * 8}deg) translateX(${(ci - 2) * 12}px)`,
                              zIndex: ci,
                            }}
                          >
                            {card?.emoji}
                          </div>
                        ))}
                      </div>

                      <div>
                        <p className="text-white font-black text-sm">{coord.name}</p>
                        <p className="text-white/40 text-xs">{coord.date}</p>
                        <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full glass">
                          <span className="text-xs">{coord.theme}</span>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="items"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="grid grid-cols-3 gap-4">
                {MOCK_ITEM_CARDS.map((card, i) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04, type: 'spring', stiffness: 200 }}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <HolographicCard
                      card={card}
                      size="md"
                      onClick={() => setSelectedCard(card)}
                    />
                    <p className="text-white/70 text-xs text-center font-medium leading-tight line-clamp-2">
                      {card.name}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Item Card Detail Modal */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedCard(null)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
            <motion.div
              initial={{ scale: 0.6, rotateY: 90 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.6, rotateY: 90 }}
              transition={{ type: 'spring', stiffness: 250, damping: 25 }}
              className="relative glass-strong rounded-3xl p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full glass hover:bg-white/20"
              >
                <X className="w-4 h-4 text-white/70" />
              </button>

              <div className="flex flex-col items-center gap-4">
                <HolographicCard card={selectedCard} size="lg" />

                <div className="text-center w-full">
                  <h3 className="text-white font-black text-xl">{selectedCard.name}</h3>
                  {selectedCard.brand && (
                    <p className="text-white/50 text-sm">{selectedCard.brand}</p>
                  )}

                  <div className="flex justify-center gap-2 mt-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold glass`}>
                      {SLOT_CONFIG.find((s) => s.key === selectedCard.category)?.label}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        selectedCard.rarity === 'legend'
                          ? 'bg-amber-400/30 text-amber-300'
                          : selectedCard.rarity === 'super-rare'
                          ? 'bg-violet-400/30 text-violet-300'
                          : selectedCard.rarity === 'rare'
                          ? 'bg-sky-400/30 text-sky-300'
                          : 'bg-white/10 text-white/50'
                      }`}
                    >
                      {selectedCard.rarity === 'legend'
                        ? '⭐ Ultra Rare'
                        : selectedCard.rarity === 'super-rare'
                        ? '💜 Super Rare'
                        : selectedCard.rarity === 'rare'
                        ? '💙 Rare'
                        : '⬜ Normal'}
                    </span>
                  </div>

                  <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                    {selectedCard.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-full glass text-white/60 text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coord Detail Modal */}
      <AnimatePresence>
        {selectedCoord && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedCoord(null)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              transition={{ type: 'spring', stiffness: 250, damping: 25 }}
              className="relative glass-strong rounded-3xl p-5 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCoord(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full glass hover:bg-white/20"
              >
                <X className="w-4 h-4 text-white/70" />
              </button>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white font-black text-lg">{selectedCoord.name}</h3>
                  <p className="text-white/40 text-sm">{selectedCoord.date}</p>
                </div>
                <div className="flex items-center gap-1.5 bg-amber-400/20 px-3 py-1.5 rounded-xl">
                  <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span className="text-amber-300 font-black">{selectedCoord.totalScore}pt</span>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2 mb-4">
                {SLOT_CONFIG.map((slot) => {
                  const card = selectedCoord.deckCards[slot.key]
                  return (
                    <div key={slot.key} className="flex flex-col items-center gap-1">
                      <p className="text-white/40 text-xs text-center" style={{ fontSize: '0.5rem' }}>
                        {slot.label}
                      </p>
                      {card ? (
                        <HolographicCard card={card} size="sm" />
                      ) : (
                        <div className="w-14 h-20 rounded-lg glass border border-dashed border-white/10 flex items-center justify-center">
                          <span className="text-white/20 text-xs">{slot.emoji}</span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="glass rounded-xl p-3">
                <p className="text-white/50 text-xs font-bold mb-2">テーマ</p>
                <p className="text-white font-bold">{selectedCoord.theme}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
