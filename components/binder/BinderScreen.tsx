'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

/* ━━━ constants ━━━ */
const ZEN = 'var(--font-zen-maru-gothic), var(--font-nunito), sans-serif'
const FREDOKA = 'var(--font-fredoka), sans-serif'
const TEXT_SHADOW = '0 2px 4px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,0.9)'
const GOLD_BORDER = '1.5px solid rgba(255,215,0,0.55)'
const PINK_GLOW = '0 4px 20px rgba(255,80,200,0.28), 0 1px 6px rgba(0,0,0,0.12)'

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
  { key: 'ALL',     label: 'ALL'  },
  { key: 'tops',    label: 'TOPS' },
  { key: 'bottoms', label: 'BTMS' },
  { key: 'shoes',   label: 'SHOE' },
  { key: 'cosme',   label: 'CSME' },
  { key: 'bag',     label: 'BAG'  },
]

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Coord Snap Card — holographic deco card style
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function CoordCard({ coord, onTap }: { coord: CoordSnap; onTap: () => void }) {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      onClick={onTap}
      style={{
        position: 'relative',
        borderRadius: 16,
        overflow: 'hidden',
        border: GOLD_BORDER,
        boxShadow: `${PINK_GLOW}, inset 0 0 0 1px rgba(255,255,255,0.25)`,
        cursor: 'pointer',
        aspectRatio: '3/4',
      }}
    >
      {/* Full-bleed ai-art image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={coord.image}
        alt={coord.theme}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />

      {/* Holographic shimmer overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(255,200,255,0.14) 0%, rgba(200,240,255,0.10) 30%, rgba(255,255,200,0.10) 60%, rgba(220,200,255,0.14) 100%)',
        mixBlendMode: 'screen',
        pointerEvents: 'none',
      }} />

      {/* AI ART badge */}
      {coord.aiArt && (
        <div style={{
          position: 'absolute', top: 7, left: 7,
          background: 'linear-gradient(135deg, #ff4da6, #ffd700)',
          borderRadius: 10,
          padding: '3px 9px',
          fontSize: '0.5rem', fontWeight: 900, color: 'white', fontFamily: FREDOKA,
          letterSpacing: '0.06em',
          textShadow: '0 1px 3px rgba(0,0,0,0.5)',
          boxShadow: '0 2px 8px rgba(255,60,0,0.4), 0 0 0 1px rgba(255,255,255,0.3)',
          zIndex: 3,
        }}>
          ✨ AI ART
        </div>
      )}

      {/* Bottom gradient + info */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(transparent, rgba(20,0,50,0.85) 50%, rgba(10,0,30,0.95))',
        padding: '28px 8px 8px',
        zIndex: 2,
      }}>
        <p style={{
          fontFamily: ZEN, fontSize: '0.62rem', fontWeight: 900,
          color: 'white', margin: 0,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          textShadow: TEXT_SHADOW,
        }}>
          💎 {coord.theme}
        </p>
        <p style={{ fontFamily: ZEN, fontSize: '0.44rem', color: 'rgba(255,210,235,0.75)', margin: '2px 0 6px' }}>
          {coord.date}
        </p>

        {/* Mini deck stamp dots */}
        <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          {SLOT_CONFIG.map(slot => {
            const has = !!coord.deck[slot.key]
            return (
              <div key={slot.key} style={{
                width: 18, height: 18, borderRadius: '50%',
                background: has ? 'rgba(255,240,248,0.92)' : 'rgba(255,255,255,0.15)',
                border: has ? '1.5px solid rgba(255,215,0,0.7)' : '1.5px solid rgba(255,255,255,0.2)',
                boxShadow: has ? '0 0 6px rgba(255,180,220,0.5)' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slot.mark} alt={slot.label}
                  style={{ width: '78%', height: '78%', objectFit: 'contain', mixBlendMode: 'multiply', opacity: has ? 1 : 0.3 }}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Outer gold glow border frame */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 16,
        boxShadow: 'inset 0 0 0 1.5px rgba(255,215,0,0.35)',
        pointerEvents: 'none', zIndex: 4,
      }} />
    </motion.div>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Item Card Thumb (3-col grid)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ItemCardThumb({ card, onTap }: { card: ItemCard; onTap: () => void }) {
  return (
    <motion.div
      whileTap={{ scale: 0.93 }}
      onClick={onTap}
      style={{
        position: 'relative',
        borderRadius: 12,
        overflow: 'hidden',
        background: card.color,
        border: GOLD_BORDER,
        boxShadow: `0 4px 14px ${card.color}80, 0 1px 4px rgba(0,0,0,0.18)`,
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
        background: 'rgba(20,5,40,0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '24px 28px',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, color: 'rgba(255,255,255,0.75)', lineHeight: 0, cursor: 'pointer' }}>
        <X size={24} />
      </button>

      <p style={{ fontFamily: ZEN, fontSize: '0.68rem', color: 'rgba(255,200,240,0.8)', marginBottom: 18, textShadow: TEXT_SHADOW }}>
        {flipped ? '🃏 タップで表に戻す' : '🃏 タップで裏面を見る'}
      </p>

      {/* 3D flip card */}
      <div
        style={{ width: '100%', maxWidth: 260, aspectRatio: '3/4', perspective: '1000px', cursor: 'pointer' }}
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
            borderRadius: 20, overflow: 'hidden',
            border: GOLD_BORDER,
            boxShadow: '0 16px 50px rgba(0,0,0,0.7), 0 0 0 1.5px rgba(255,215,0,0.3)',
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={coord.image} alt={coord.theme} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            {/* holographic overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,200,255,0.1) 0%, rgba(200,240,255,0.08) 50%, rgba(255,255,200,0.08) 100%)', mixBlendMode: 'screen', pointerEvents: 'none' }} />
            {coord.aiArt && (
              <div style={{ position: 'absolute', top: 13, left: 13, background: 'linear-gradient(135deg, #ff4da6, #ffd700)', borderRadius: 12, padding: '4px 11px', fontSize: '0.58rem', fontWeight: 900, color: 'white', fontFamily: FREDOKA, letterSpacing: '0.06em', textShadow: '0 1px 3px rgba(0,0,0,0.5)', boxShadow: '0 2px 10px rgba(255,60,0,0.55), 0 0 0 1px rgba(255,255,255,0.3)', zIndex: 2 }}>
                ✨ AI ART
              </div>
            )}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 16px 16px', background: 'linear-gradient(transparent, rgba(15,3,40,0.9))' }}>
              <p style={{ fontFamily: ZEN, color: 'rgba(255,210,235,0.8)', fontSize: '0.58rem', margin: 0 }}>{coord.date}</p>
              <p style={{ fontFamily: ZEN, color: 'white', fontSize: '0.95rem', fontWeight: 900, margin: '3px 0 0', textShadow: TEXT_SHADOW }}>💎 {coord.theme}</p>
            </div>
          </div>

          {/* ── Back face ── */}
          <div style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: 20, overflow: 'hidden',
            border: GOLD_BORDER,
            boxShadow: '0 16px 50px rgba(0,0,0,0.7), 0 0 0 1.5px rgba(255,215,0,0.3)',
          }}>
            {/* ard-back.png as full background */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/ard-back.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />

            {/* overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,0,25,0.35)' }} />

            <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', padding: '16px 12px 14px' }}>
              {/* Header */}
              <div style={{ textAlign: 'center', marginBottom: 8 }}>
                <p style={{ fontFamily: FREDOKA, color: '#ffd700', fontSize: '0.6rem', fontWeight: 700, margin: 0, letterSpacing: '0.15em', textShadow: '0 0 12px rgba(255,215,0,0.8)' }}>
                  ✦ COORD RECORD ✦
                </p>
                <p style={{ fontFamily: ZEN, color: 'white', fontSize: '0.92rem', fontWeight: 900, margin: '4px 0 2px', textShadow: TEXT_SHADOW }}>
                  💎 {coord.theme}
                </p>
                <p style={{ fontFamily: ZEN, color: 'rgba(255,210,235,0.8)', fontSize: '0.55rem', margin: 0 }}>{coord.date}</p>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.6), transparent)', margin: '6px 0 10px' }} />

              {/* Deck label */}
              <p style={{ fontFamily: ZEN, color: 'rgba(255,215,0,0.9)', fontSize: '0.5rem', fontWeight: 900, margin: '0 0 8px', letterSpacing: '0.1em', textShadow: '0 1px 4px rgba(0,0,0,0.7)', textAlign: 'center' }}>
                ✦ TODAY&apos;S DECK ✦
              </p>

              {/* 5 mini card thumbnails */}
              <div style={{ display: 'flex', gap: 5, justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                {SLOT_CONFIG.map(slot => {
                  const item = coord.deck[slot.key]
                  return (
                    <div key={slot.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1 }}>
                      {/* Mini card */}
                      <div style={{
                        width: '100%',
                        aspectRatio: '2/3',
                        borderRadius: 7,
                        overflow: 'hidden',
                        border: item ? '1.5px solid rgba(255,215,0,0.6)' : '1.5px solid rgba(255,255,255,0.18)',
                        background: item ? 'rgba(255,240,248,0.92)' : 'rgba(255,255,255,0.08)',
                        boxShadow: item ? '0 3px 10px rgba(255,100,200,0.35)' : 'none',
                        position: 'relative',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {item ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        ) : (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={slot.mark} alt={slot.label} style={{ width: '65%', height: '65%', objectFit: 'contain', opacity: 0.25 }} />
                        )}
                      </div>
                      {/* Slot label */}
                      <p style={{ fontFamily: ZEN, fontSize: '0.36rem', fontWeight: 700, color: item ? 'rgba(255,220,240,0.9)' : 'rgba(255,255,255,0.3)', margin: 0, textAlign: 'center', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                        {slot.label}
                      </p>
                    </div>
                  )
                })}
              </div>

              {/* Bottom gold line */}
              <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.4), transparent)', marginTop: 12 }} />
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
        background: 'rgba(20,5,40,0.85)',
        backdropFilter: 'blur(12px)',
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
        style={{ width: '100%', maxWidth: 220, aspectRatio: '2/3', perspective: '1000px', cursor: 'pointer' }}
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
            borderRadius: 16, overflow: 'hidden',
            background: card.color,
            border: GOLD_BORDER,
            boxShadow: `0 14px 44px ${card.color}99, 0 4px 16px rgba(0,0,0,0.45), 0 0 0 1.5px rgba(255,215,0,0.3)`,
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
            borderRadius: 16, overflow: 'hidden',
            border: GOLD_BORDER,
            boxShadow: '0 14px 44px rgba(0,0,0,0.6), 0 0 0 1.5px rgba(255,215,0,0.3)',
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/ard-back.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,0,25,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 16px', gap: 14 }}>
              {/* Mark on light circle */}
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,245,252,0.92)', border: '2px solid rgba(255,215,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 16px rgba(255,100,200,0.4)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/img/mark-${card.category}.png`} alt={card.category} style={{ width: 42, height: 42, objectFit: 'contain', mixBlendMode: 'multiply' }} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: FREDOKA, color: '#ffd700', fontSize: '0.6rem', fontWeight: 700, margin: '0 0 5px', letterSpacing: '0.12em', textShadow: '0 0 12px rgba(255,215,0,0.7)' }}>
                  {card.category.toUpperCase()}
                </p>
                <p style={{ fontFamily: ZEN, color: 'white', fontSize: '0.88rem', fontWeight: 900, margin: 0, textShadow: TEXT_SHADOW }}>
                  {card.name}
                </p>
                <p style={{ fontFamily: ZEN, color: 'rgba(255,210,235,0.8)', fontSize: '0.62rem', margin: '6px 0 0' }}>
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

  const binderBg = {
    background: [
      'linear-gradient(rgba(255,245,253,0.94) 0%, rgba(250,238,255,0.94) 100%)',
      'repeating-linear-gradient(0deg, transparent, transparent 23px, rgba(255,140,210,0.11) 23px, rgba(255,140,210,0.11) 24px)',
      'repeating-linear-gradient(90deg, transparent, transparent 23px, rgba(255,140,210,0.11) 23px, rgba(255,140,210,0.11) 24px)',
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
          background: 'linear-gradient(135deg, rgba(255,60,175,0.86) 0%, rgba(130,40,220,0.86) 100%)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255,215,0,0.25)',
          boxShadow: '0 4px 20px rgba(180,30,180,0.3)',
        }}>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => router.back()}
            style={{ display: 'flex', alignItems: 'center', gap: 3, color: 'white', fontFamily: ZEN, fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', textShadow: TEXT_SHADOW }}
          >
            <ChevronLeft size={17} />
            戻る
          </motion.button>

          <h1 style={{
            fontFamily: FREDOKA,
            fontWeight: 700,
            fontSize: '1.28rem',
            color: 'white',
            margin: 0,
            letterSpacing: '0.1em',
            textShadow: '0 2px 0 rgba(180,30,140,0.55), 0 0 24px rgba(255,215,0,0.45), 2px 2px 0 rgba(160,20,120,0.4)',
            WebkitTextStroke: '0.5px rgba(255,215,0,0.45)',
          }}>
            MY BINDER
          </h1>

          <div style={{ width: 52 }} />
        </header>

        {/* ━━━ ② タブ ━━━ */}
        <div style={{
          flexShrink: 0,
          display: 'flex',
          gap: 8,
          padding: '10px 12px 0',
        }}>
          {([
            { key: 'coord' as MainTab, icon: '/img/tab-snap.png',    label: '完成コーデ',   emoji: '✨' },
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
                  padding: '9px 6px 11px',
                  borderRadius: '14px 14px 0 0',
                  border: active ? '2px solid #ffd700' : '2px solid rgba(255,255,255,0.2)',
                  borderBottom: active ? '2px solid transparent' : '2px solid rgba(255,255,255,0.2)',
                  background: active
                    ? 'linear-gradient(160deg, rgba(255,248,255,0.98) 0%, rgba(255,252,240,0.98) 100%)'
                    : 'rgba(255,255,255,0.2)',
                  boxShadow: active
                    ? '0 -6px 22px rgba(255,80,200,0.3), 0 -2px 8px rgba(255,215,0,0.15), inset 0 1px 0 rgba(255,255,255,0.85)'
                    : 'none',
                  transform: active ? 'translateY(2px)' : 'translateY(0)',
                  transition: 'all 0.18s ease',
                  cursor: 'pointer',
                  backdropFilter: active ? 'none' : 'blur(8px)',
                  position: 'relative',
                  zIndex: active ? 2 : 1,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tab.icon} alt=""
                  style={{
                    width: 32, height: 32, objectFit: 'contain',
                    mixBlendMode: 'multiply',
                    filter: active
                      ? 'drop-shadow(0 2px 6px rgba(255,60,200,0.65)) drop-shadow(0 0 3px rgba(255,215,0,0.5))'
                      : 'brightness(10)',
                    opacity: active ? 1 : 0.85,
                    transition: 'filter 0.18s',
                  }}
                />
                <span style={{
                  fontFamily: ZEN, fontSize: '0.68rem', fontWeight: 900,
                  color: active ? '#b020d8' : 'rgba(255,255,255,0.92)',
                  textShadow: active ? 'none' : TEXT_SHADOW,
                  whiteSpace: 'nowrap',
                }}>
                  {tab.emoji} {tab.label}
                </span>
              </motion.button>
            )
          })}
        </div>

        {/* ━━━ ③ バインダーグリッドエリア ━━━ */}
        <div style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          ...binderBg,
          borderTop: '2px solid rgba(255,215,0,0.3)',
          boxShadow: 'inset 0 3px 20px rgba(255,130,200,0.07)',
          overflow: 'hidden',
        }}>

          {/* カテゴリフィルター (アイテムタブのみ) */}
          {mainTab === 'item' && (
            <div style={{
              flexShrink: 0,
              display: 'flex',
              gap: 5,
              padding: '10px 12px 8px',
              overflowX: 'auto',
            }}>
              {CATEGORY_FILTERS.map(f => {
                const active = catFilter === f.key
                return (
                  <button
                    key={f.key}
                    onClick={() => setCatFilter(f.key)}
                    style={{
                      flexShrink: 0,
                      padding: '4px 13px',
                      borderRadius: 20,
                      border: active ? '2px solid rgba(200,50,220,0.75)' : '2px solid rgba(200,140,220,0.3)',
                      background: active
                        ? 'linear-gradient(135deg, rgba(255,70,200,0.16), rgba(170,50,240,0.13))'
                        : 'rgba(255,255,255,0.6)',
                      color: active ? '#a020d0' : 'rgba(140,70,160,0.8)',
                      fontFamily: ZEN, fontSize: '0.62rem', fontWeight: 900,
                      cursor: 'pointer',
                      boxShadow: active ? '0 2px 10px rgba(200,50,220,0.2)' : 'none',
                      transition: 'all 0.15s',
                    }}
                  >
                    {f.label}
                  </button>
                )
              })}
            </div>
          )}

          {/* Grid */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px 20px' }}>
            <AnimatePresence mode="wait">
              {mainTab === 'coord' ? (
                <motion.div
                  key="coord"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}
                >
                  {COORD_SNAPS.map(coord => (
                    <CoordCard key={coord.id} coord={coord} onTap={() => setSelectedCoord(coord)} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="item"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 9 }}
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
