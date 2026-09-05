'use client'

import { motion } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import { ItemCard, CardCategory } from '@/lib/types'
import HolographicCard from '@/components/ui/HolographicCard'

interface SlotConfig {
  key: CardCategory
  label: string
  emoji: string
  color: string
}

interface Props {
  slot: SlotConfig
  card: ItemCard | null
  onClick: () => void
  onRemove: () => void
  index: number
}

export default function CardSlot({ slot, card, onClick, onRemove, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 200, damping: 20 }}
      className="flex flex-col items-center gap-2"
    >
      {/* Slot label */}
      <div className="flex items-center gap-1.5">
        <span className="text-base">{slot.emoji}</span>
        <span className="text-xs font-bold text-white/70">{slot.label}</span>
      </div>

      {/* Card area */}
      <div className="relative group">
        {card ? (
          <>
            <motion.div
              key={card.id}
              initial={{ scale: 0.7, opacity: 0, rotateY: 90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative"
            >
              <HolographicCard
                card={card}
                size="lg"
                onClick={onClick}
                className="cursor-pointer"
              />

              {/* Remove button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onRemove()
                }}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500/80 flex items-center justify-center
                  opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            </motion.div>

            {/* Glow underneath */}
            <div
              className={`absolute inset-0 rounded-2xl -z-10 blur-xl opacity-40 bg-gradient-to-br ${slot.color}`}
              style={{ transform: 'translateY(8px) scale(0.9)' }}
            />
          </>
        ) : (
          <button
            onClick={onClick}
            className="slot-empty w-36 h-52 rounded-2xl flex flex-col items-center justify-center gap-3 group/btn"
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${slot.color} opacity-30 group-hover/btn:opacity-60 transition-opacity`}
            >
              <span className="text-2xl">{slot.emoji}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Plus className="w-5 h-5 text-white/30 group-hover/btn:text-white/60 transition-colors" />
              <span className="text-white/30 text-xs group-hover/btn:text-white/60 transition-colors font-medium">
                タップして選択
              </span>
            </div>

            {/* Corner sparkles */}
            <div className="absolute top-2 right-2 text-white/20 text-xs star-twinkle">✦</div>
            <div className="absolute bottom-2 left-2 text-white/20 text-xs star-twinkle" style={{ animationDelay: '1s' }}>✦</div>
          </button>
        )}
      </div>
    </motion.div>
  )
}
