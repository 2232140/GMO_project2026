'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

/* ━━━ constants ━━━ */
const ZEN = 'var(--font-zen-maru-gothic), var(--font-nunito), sans-serif'
const FREDOKA = 'var(--font-fredoka), sans-serif'
const TEXT_SHADOW = '0 2px 4px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,0.9)'

/* ━━━ types ━━━ */
type SlotKey = 'tops' | 'bottoms' | 'shoes' | 'cosme' | 'bag'
type MainTab = 'coord' | 'item'
type CategoryFilter = 'ALL' | SlotKey

interface DeckItem { name: string; image: string }

interface CoordSnap {
  id: string
  date: string
  theme: string
  image: string
  aiArt: boolean
  deck: Record<SlotKey, DeckItem | null>
}

interface ItemCard {
  id: string
  category: SlotKey
  name: string
  image: string
  color: string
}

/* ━━━ mock data ━━━ */
const COORD_SNAPS: CoordSnap[] = [
  {
    id: 'cs1', date: '2026.09.15', theme: 'ピンクガール', image: '/img/ai-art-sample.jpeg', aiArt: true,
    deck: { tops: { name: 'フリルブラウス', image: '/img/dress.png' }, bottoms: { name: 'バルーンミニ', image: '/img/bottom.png' }, shoes: { name: 'ローヒールパンプス', image: '/img/shoes.png' }, cosme: { name: 'グロッシーリップ', image: '/img/cosme.png' }, bag: { name: 'ミニチェーンバッグ', image: '/img/bag.png' } },
  },
  {
    id: 'cs2', date: '2026.09.14', theme: 'パープルドリーム', image: '/img/ai-art-sample.jpeg', aiArt: true,
    deck: { tops: { name: 'ホログラムトップ', image: '/img/dress.png' }, bottoms: { name: 'プリーツスカート', image: '/img/bottom.png' }, shoes: { name: 'プラットフォーム', image: '/img/shoes.png' }, cosme: { name: 'パールアイシャドウ', image: '/img/cosme.png' }, bag: { name: 'キルティングバッグ', image: '/img/bag.png' } },
  },
  {
    id: 'cs3', date: '2026.09.13', theme: 'ブルーシック', image: '/img/ai-art-sample.jpeg', aiArt: false,
    deck: { tops: { name: 'ニットベスト', image: '/img/dress.png' }, bottoms: { name: 'デニムミニ', image: '/img/bottom.png' }, shoes: { name: 'グリッターサンダル', image: '/img/shoes.png' }, cosme: null, bag: { name: 'クリアバッグ', image: '/img/bag.png' } },
  },
  {
    id: 'cs4', date: '2026.09.12', theme: 'Y2Kシャイン', image: '/img/ai-art-sample.jpeg', aiArt: true,
    deck: { tops: { name: 'フリルブラウス', image: '/img/dress.png' }, bottoms: { name: 'バルーンミニ', image: '/img/bottom.png' }, shoes: { name: 'グリッターサンダル', image: '/img/shoes.png' }, cosme: { name: 'グロッシーリップ', image: '/img/cosme.png' }, bag: { name: 'ミニチェーンバッグ', image: '/img/bag.png' } },
  },
]

const ITEM_CARDS: ItemCard[] = [
  { id: 't1', category: 'tops',    name: 'フリルブラウス',     image: '/img/dress.png',  color: '#f9a8d4' },
  { id: 't2', category: 'tops',    name: 'ホログラムトップ',   image: '/img/dress.png',  color: '#c084fc' },
  { id: 't3', category: 'tops',    name: 'ニットベスト',       image: '/img/dress.png',  color: '#93c5fd' },
  { id: 'b1', category: 'bottoms', name: 'バルーンミニ',       image: '/img/bottom.png', color: '#fda4af' },
  { id: 'b2', category: 'bottoms', name: 'プリーツスカート',   image: '/img/bottom.png', color: '#fde68a' },
  { id: 'b3', category: 'bottoms', name: 'デニムミニ',         image: '/img/bottom.png', color: '#7dd3fc' },
  { id: 's1', category: 'shoes',   name: 'ローヒールパンプス', image: '/img/shoes.png',  color: '#fca5a5' },
  { id: 's2', category: 'shoes',   name: 'プラットフォーム',   image: '/img/shoes.png',  color: '#a78bfa' },
  { id: 's3', category: 'shoes',   name: 'グリッターサンダル', image: '/img/shoes.png',  color: '#6ee7b7' },
  { id: 'c1', category: 'cosme',   name: 'グロッシーリップ',   image: '/img/cosme.png',  color: '#fb7185' },
  { id: 'c2', category: 'cosme',   name: 'パールアイシャドウ', image: '/img/cosme.png',  color: '#c7d2fe' },
  { id: 'g1', category: 'bag',     name: 'ミニチェーンバッグ', image: '/img/bag.png',    color: '#d8b4fe' },
  { id: 'g2', category: 'bag',     name: 'キルティングバッグ', image: '/img/bag.png',    color: '#fef08a' },
  { id: 'g3', category: 'bag',     name: 'クリアバッグ',       image: '/img/bag.png',    color: '#bae6fd' },
]

const SLOT_CONFIG: { key: SlotKey; mark: string; label: string }[] = [
  { key: 'tops',    mark: '/img/mark-tops.png',    label: 'TOPS'  },
  { key: 'bottoms', mark: '/img/mark-bottoms.png', label: 'BTMS'  },
  { key: 'shoes',   mark: '/img/mark-shoes.png',   label: 'SHOES' },
  { key: 'cosme',   mark: '/img/mark-cosme.png',   label: 'COSME' },
  { key: 'bag',     mark: '/img/mark-bag.png',     label: 'BAG'   },
]

const CATEGORY_FILTERS: { key: CategoryFilter; label: string }[] = [
  { key: 'ALL', label: 'ALL' },
  { key: 'tops', label: 'TOPS' },
  { key: 'bottoms', label: 'BTMS' },
  { key: 'shoes', label: 'SHOE' },
  { key: 'cosme', label: 'CSME' },
  { key: 'bag', label: 'BAG' },
]

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Coord Snap Card (2-col grid)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function CoordCard({ coord, onTap }: { coord: CoordSnap; onTap: () => void }) {
  return (
    <motion.div
      whileTap={{ scale: 0.96 }}
      onClick={onTap}
      style={{
        position: 'relative',
        borderRadius: 14,
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.96)',
        border: '2px solid rgba(255,200,230,0.7)',
        boxShadow: '0 4px 18px rgba(200,80,200,0.18), 0 1px 4px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        aspectRatio: '3/4',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image area */}
      <div style={{ position: 'relative', flex: '0 0 66%', overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={coord.image} alt={coord.theme} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        {coord.aiArt && (
          <div style={{
            position: 'absolute', top: 6, left: 6,
            background: 'linear-gradient(135deg, #ff69b4, #ffd700)',
            borderRadius: 8, padding: '2px 8px',
            fontSize: '0.48rem', fontWeight: 900, color: 'white', fontFamily: ZEN,
            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
            boxShadow: '0 2px 6px rgba(255,100,0,0.35)',
          }}>
            ✨ AI ART
          </div>
        )}
        {/* Gradient overlay at bottom of image */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', background: 'linear-gradient(transparent, rgba(255,230,245,0.6))' }} />
      </div>

      {/* Info area */}
      <div style={{ flex: 1, padding: '6px 8px 7px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontFamily: ZEN, fontSize: '0.58rem', fontWeight: 900, color: '#c040e0', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            💎 {coord.theme}
          </p>
          <p style={{ fontFamily: ZEN, fontSize: '0.44rem', color: 'rgba(140,60,140,0.65)', margin: '2px 0 0' }}>
            {coord.date}
          </p>
        </div>
        {/* Mini deck stamp icons */}
        <div style={{ display: 'flex', gap: 2, alignItems: 'center', marginTop: 4 }}>
          {SLOT_CONFIG.map(slot => {
            const has = !!coord.deck[slot.key]
            return (
              <div key={slot.key} style={{
                width: 20, height: 20, borderRadius: '50%',
                background: has ? 'rgba(255,220,240,0.9)' : 'rgba(200,180,210,0.25)',
                border: has ? '1.5px solid rgba(255,180,230,0.8)' : '1.5px solid rgba(200,180,210,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slot.mark} alt={slot.label}
                  style={{ width: '75%', height: '75%', objectFit: 'contain', mixBlendMode: 'multiply', opacity: has ? 0.85 : 0.25 }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Item Card Thumb (3-col grid)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ItemCardThumb({ card, onTap }: { card: ItemCard; onTap: () => void }) {
  return (
    <motion.div
      whileTap={{ scale: 0.94 }}
      onClick={onTap}
      style={{
        position: 'relative',
        borderRadius: 10,
        overflow: 'hidden',
        background: card.color,
        border: '2px solid rgba(255,255,255,0.85)',
        boxShadow: '0 3px 12px rgba(0,0,0,0.18)',
        cursor: 'pointer',
        aspectRatio: '2/3',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={card.image} alt={card.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', zIndex: 1 }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/img/Card_Frame.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'fill', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2px 4px 3px', background: 'rgba(0,0,0,0.62)', zIndex: 3 }}>
        <p style={{ fontFamily: ZEN, fontSize: '0.42rem', fontWeight: 900, color: 'white', margin: 0, textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {card.name}
        </p>
      </div>
    </motion.div>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Coord Flip Modal
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function CoordFlipModal({ coord, onClose }: { coord: CoordSnap; onClose: () => void }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(20,5,40,0.82)',
        backdropFilter: 'blur(10px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '24px 28px',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Close */}
      <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, color: 'rgba(255,255,255,0.75)', lineHeight: 0, cursor: 'pointer' }}>
        <X size={24} />
      </button>

      {/* Hint */}
      <p style={{ fontFamily: ZEN, fontSize: '0.68rem', color: 'rgba(255,200,240,0.8)', marginBottom: 18, textShadow: TEXT_SHADOW }}>
        {flipped ? '🃏 タップで表に戻す' : '🃏 タップで裏面を見る'}
      </p>

      {/* 3D flip card */}
      <div
        style={{ width: '100%', maxWidth: 256, aspectRatio: '3/4', perspective: '900px', cursor: 'pointer' }}
        onClick={() => setFlipped(f => !f)}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d', position: 'relative' }}
        >
          {/* ── Front face ── */}
          <div style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderRadius: 18, overflow: 'hidden',
            boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={coord.image} alt={coord.theme} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            {coord.aiArt && (
              <div style={{ position: 'absolute', top: 12, left: 12, background: 'linear-gradient(135deg, #ff69b4, #ffd700)', borderRadius: 10, padding: '3px 10px', fontSize: '0.55rem', fontWeight: 900, color: 'white', fontFamily: ZEN, textShadow: '0 1px 2px rgba(0,0,0,0.5)', boxShadow: '0 2px 8px rgba(255,100,0,0.5)' }}>
                ✨ AI ART
              </div>
            )}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 14px 14px', background: 'linear-gradient(transparent, rgba(30,5,60,0.85))' }}>
              <p style={{ fontFamily: ZEN, color: 'rgba(255,215,200,0.75)', fontSize: '0.6rem', margin: 0 }}>{coord.date}</p>
              <p style={{ fontFamily: ZEN, color: 'white', fontSize: '0.88rem', fontWeight: 900, margin: '3px 0 0', textShadow: TEXT_SHADOW }}>💎 {coord.theme}</p>
            </div>
          </div>

          {/* ── Back face ── */}
          <div style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: 18, overflow: 'hidden',
            boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/ard-back.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,0,30,0.22)', display: 'flex', flexDirection: 'column', padding: '18px 14px 14px' }}>
              {/* Record header */}
              <div style={{ textAlign: 'center', marginBottom: 10 }}>
                <p style={{ fontFamily: FREDOKA, color: '#ffd700', fontSize: '0.6rem', fontWeight: 700, margin: 0, letterSpacing: '0.12em', textShadow: '0 0 10px rgba(255,215,0,0.7)' }}>✦ COORD RECORD ✦</p>
                <p style={{ fontFamily: ZEN, color: 'white', fontSize: '0.95rem', fontWeight: 900, margin: '4px 0 2px', textShadow: TEXT_SHADOW }}>💎 {coord.theme}</p>
                <p style={{ fontFamily: ZEN, color: 'rgba(255,220,200,0.8)', fontSize: '0.58rem', margin: 0 }}>{coord.date}</p>
              </div>
              {/* Divider */}
              <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.5), transparent)', marginBottom: 10 }} />
              {/* Deck slots */}
              <p style={{ fontFamily: ZEN, color: 'rgba(255,215,0,0.85)', fontSize: '0.52rem', fontWeight: 900, margin: '0 0 7px', letterSpacing: '0.08em', textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}>TODAY&apos;S DECK</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {SLOT_CONFIG.map(slot => {
                  const item = coord.deck[slot.key]
                  return (
                    <div key={slot.key} style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.12)', borderRadius: 8, padding: '4px 8px', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.12)' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={slot.mark} alt={slot.label} style={{ width: 20, height: 20, objectFit: 'contain', mixBlendMode: 'multiply', flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: ZEN, fontSize: '0.42rem', fontWeight: 700, color: 'rgba(255,200,220,0.65)', margin: 0 }}>{slot.label}</p>
                        <p style={{ fontFamily: ZEN, fontSize: '0.6rem', fontWeight: 900, color: 'white', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                          {item ? item.name : '—'}
                        </p>
                      </div>
                      {item && (
                        <div style={{ width: 26, height: 34, borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.3)', flexShrink: 0, background: 'rgba(255,255,255,0.15)' }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Item Flip Modal
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ItemFlipModal({ card, onClose }: { card: ItemCard; onClose: () => void }) {
  const [flipped, setFlipped] = useState(false)
  const rarityMap: Record<SlotKey, string> = {
    tops: 'R ★★★☆', bottoms: 'R ★★★☆', shoes: 'SR ★★★★', cosme: 'R ★★★☆', bag: 'SR ★★★★',
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(20,5,40,0.82)',
        backdropFilter: 'blur(10px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '24px 40px',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, color: 'rgba(255,255,255,0.75)', lineHeight: 0, cursor: 'pointer' }}>
        <X size={24} />
      </button>

      <p style={{ fontFamily: ZEN, fontSize: '0.68rem', color: 'rgba(255,200,240,0.8)', marginBottom: 18, textShadow: TEXT_SHADOW }}>
        {flipped ? '🃏 タップで表に戻す' : '🃏 タップで裏面を見る'}
      </p>

      <div
        style={{ width: '100%', maxWidth: 220, aspectRatio: '2/3', perspective: '900px', cursor: 'pointer' }}
        onClick={() => setFlipped(f => !f)}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d', position: 'relative' }}
        >
          {/* ── Front face ── */}
          <div style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
            borderRadius: 14, overflow: 'hidden',
            background: card.color,
            boxShadow: `0 12px 40px ${card.color}88, 0 4px 16px rgba(0,0,0,0.4)`,
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={card.image} alt={card.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', zIndex: 1 }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/Card_Frame.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'fill', zIndex: 2, pointerEvents: 'none' }} />
          </div>

          {/* ── Back face ── */}
          <div style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: 14, overflow: 'hidden',
            boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/ard-back.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,0,30,0.18)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 16px', gap: 14 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/img/mark-${card.category}.png`} alt={card.category} style={{ width: 56, height: 56, objectFit: 'contain', mixBlendMode: 'multiply', filter: 'drop-shadow(0 0 8px rgba(255,180,220,0.8))' }} />
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: FREDOKA, color: '#ffd700', fontSize: '0.58rem', fontWeight: 700, margin: '0 0 5px', letterSpacing: '0.12em', textShadow: '0 0 10px rgba(255,215,0,0.7)' }}>
                  {card.category.toUpperCase()}
                </p>
                <p style={{ fontFamily: ZEN, color: 'white', fontSize: '0.88rem', fontWeight: 900, margin: 0, textShadow: TEXT_SHADOW }}>
                  {card.name}
                </p>
                <p style={{ fontFamily: ZEN, color: 'rgba(255,215,200,0.75)', fontSize: '0.62rem', margin: '6px 0 0' }}>
                  {rarityMap[card.category]}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Main BinderScreen
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function BinderScreen() {
  const router = useRouter()
  const [mainTab, setMainTab] = useState<MainTab>('coord')
  const [catFilter, setCatFilter] = useState<CategoryFilter>('ALL')
  const [selectedCoord, setSelectedCoord] = useState<CoordSnap | null>(null)
  const [selectedItem, setSelectedItem] = useState<ItemCard | null>(null)

  const filteredItems = catFilter === 'ALL'
    ? ITEM_CARDS
    : ITEM_CARDS.filter(c => c.category === catFilter)

  /* バインダーリフィル風グリッドBG */
  const binderBg = {
    background: [
      'linear-gradient(rgba(255,245,252,0.93) 0%, rgba(250,240,255,0.93) 100%)',
      'repeating-linear-gradient(0deg, transparent, transparent 23px, rgba(255,150,210,0.13) 23px, rgba(255,150,210,0.13) 24px)',
      'repeating-linear-gradient(90deg, transparent, transparent 23px, rgba(255,150,210,0.13) 23px, rgba(255,150,210,0.13) 24px)',
    ].join(', '),
  }

  return (
    <div style={{
      position: 'fixed', inset: 0,
      backgroundImage: "url('/img/wall.jpeg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div style={{
        position: 'relative',
        height: '100dvh',
        maxWidth: 430,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}>

        {/* ━━━ ① ヘッダー ━━━ */}
        <header style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 14px 10px',
          background: 'linear-gradient(135deg, rgba(255,80,180,0.82) 0%, rgba(140,50,220,0.82) 100%)',
          backdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(255,180,255,0.3)',
        }}>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => router.back()}
            style={{ display: 'flex', alignItems: 'center', gap: 3, color: 'white', fontFamily: ZEN, fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', textShadow: TEXT_SHADOW }}
          >
            <ChevronLeft size={17} />
            戻る
          </motion.button>

          {/* MY BINDER タイトル */}
          <h1 style={{
            fontFamily: FREDOKA,
            fontWeight: 700,
            fontSize: '1.25rem',
            color: 'white',
            margin: 0,
            letterSpacing: '0.1em',
            textShadow: '0 2px 0 rgba(200,40,160,0.5), 0 0 20px rgba(255,215,0,0.4), 2px 2px 0 rgba(180,30,140,0.35)',
            WebkitTextStroke: '0.5px rgba(255,215,0,0.4)',
          }}>
            MY BINDER
          </h1>

          <div style={{ width: 52 }} />
        </header>

        {/* ━━━ ② インデックスシール風タブ ━━━ */}
        <div style={{
          flexShrink: 0,
          display: 'flex',
          gap: 8,
          padding: '10px 12px 0',
        }}>
          {([
            { key: 'coord' as MainTab, icon: '/img/tab-snap.png', label: '完成コーデ', emoji: '✨' },
            { key: 'item'  as MainTab, icon: '/img/icon-binder.png', label: 'アイテムカード', emoji: '👗' },
          ]).map(tab => {
            const active = mainTab === tab.key
            return (
              <motion.button
                key={tab.key}
                whileTap={{ scale: 0.97 }}
                onClick={() => setMainTab(tab.key)}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 7,
                  padding: '8px 6px 10px',
                  borderRadius: '12px 12px 0 0',
                  border: active ? '2px solid rgba(255,215,0,0.7)' : '2px solid rgba(255,255,255,0.18)',
                  borderBottom: active ? '2px solid rgba(255,245,252,0)' : '2px solid rgba(255,255,255,0.18)',
                  background: active ? 'rgba(255,250,255,0.95)' : 'rgba(255,255,255,0.22)',
                  boxShadow: active ? '0 -4px 16px rgba(255,80,200,0.25), 0 0 0 1px rgba(255,215,0,0.15)' : 'none',
                  transform: active ? 'scale(1.04) translateY(1px)' : 'scale(1)',
                  transition: 'all 0.18s ease',
                  cursor: 'pointer',
                  backdropFilter: active ? 'none' : 'blur(6px)',
                  position: 'relative',
                  zIndex: active ? 2 : 1,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tab.icon} alt={tab.label}
                  style={{
                    width: 24, height: 24, objectFit: 'contain',
                    mixBlendMode: 'multiply',
                    filter: active ? 'drop-shadow(0 0 4px rgba(255,100,220,0.6))' : undefined,
                    opacity: active ? 1 : 0.7,
                  }}
                />
                <span style={{
                  fontFamily: ZEN, fontSize: '0.7rem', fontWeight: 900,
                  color: active ? '#c040e0' : 'white',
                  textShadow: active ? 'none' : TEXT_SHADOW,
                  whiteSpace: 'nowrap',
                }}>
                  {tab.emoji} {tab.label}
                </span>
              </motion.button>
            )
          })}
        </div>

        {/* ━━━ ③ バインダー・グリッドエリア ━━━ */}
        <div style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '0 0 0 0',
          ...binderBg,
          borderTop: '2px solid rgba(255,215,0,0.35)',
          boxShadow: 'inset 0 2px 20px rgba(255,150,200,0.08)',
          overflow: 'hidden',
        }}>

          {/* ━━ アイテムカード タブ: カテゴリフィルター ━━ */}
          {mainTab === 'item' && (
            <div style={{
              flexShrink: 0,
              display: 'flex',
              gap: 5,
              padding: '10px 12px 8px',
              overflowX: 'auto',
            }}
              className="overflow-x-auto"
            >
              {CATEGORY_FILTERS.map(f => {
                const active = catFilter === f.key
                return (
                  <button
                    key={f.key}
                    onClick={() => setCatFilter(f.key)}
                    style={{
                      flexShrink: 0,
                      padding: '4px 12px',
                      borderRadius: 20,
                      border: active ? '2px solid rgba(200,60,220,0.7)' : '2px solid rgba(200,150,220,0.35)',
                      background: active ? 'linear-gradient(135deg, rgba(255,80,200,0.18), rgba(180,60,240,0.15))' : 'rgba(255,255,255,0.55)',
                      color: active ? '#a020d0' : 'rgba(140,80,160,0.8)',
                      fontFamily: ZEN, fontSize: '0.62rem', fontWeight: 900,
                      cursor: 'pointer',
                      boxShadow: active ? '0 2px 8px rgba(200,60,220,0.22)' : 'none',
                      transition: 'all 0.15s',
                    }}
                  >
                    {f.label}
                  </button>
                )
              })}
            </div>
          )}

          {/* ━━ Grid ━━ */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px 16px' }}>
            <AnimatePresence mode="wait">
              {mainTab === 'coord' ? (
                /* 完成コーデ: 2-col grid */
                <motion.div
                  key="coord"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 10,
                  }}
                >
                  {COORD_SNAPS.map(coord => (
                    <CoordCard key={coord.id} coord={coord} onTap={() => setSelectedCoord(coord)} />
                  ))}
                </motion.div>
              ) : (
                /* アイテムカード: 3-col grid */
                <motion.div
                  key="item"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 8,
                  }}
                >
                  {filteredItems.map(card => (
                    <ItemCardThumb key={card.id} card={card} onTap={() => setSelectedItem(card)} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* ━━━ モーダル ━━━ */}
      <AnimatePresence>
        {selectedCoord && (
          <CoordFlipModal key="coord-modal" coord={selectedCoord} onClose={() => setSelectedCoord(null)} />
        )}
        {selectedItem && (
          <ItemFlipModal key="item-modal" card={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}
