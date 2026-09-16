'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

const ZEN = 'var(--font-zen-maru-gothic), var(--font-nunito), sans-serif'
const FREDOKA = 'var(--font-fredoka), sans-serif'
const TEXT_SHADOW = '0 2px 4px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,0.9)'
const TOTAL_COLLECTION = 100

type SlotKey = 'tops' | 'bottoms' | 'shoes' | 'cosme' | 'bag'
type MainTab = 'coord' | 'item'
type CategoryFilter = 'ALL' | SlotKey

interface DeckItem { name: string; image: string; brand?: string }
interface CoordSnap {
  id: string; date: string; theme: string; image: string; aiArt: boolean
  deck: Record<SlotKey, DeckItem | null>
}
interface ItemCard {
  id: string; category: SlotKey; name: string; image: string
  color: string; brand: string; rarity: string
}

const COORD_SNAPS: CoordSnap[] = [
  { id: 'cs1', date: '2026.09.15', theme: 'ピンクガール', image: '/img/ai-art-sample.jpeg', aiArt: true,
    deck: { tops: { name: 'フリルブラウス', image: '/img/dress.png', brand: 'BABY' }, bottoms: { name: 'バルーンミニ', image: '/img/bottom.png', brand: 'AXES' }, shoes: { name: 'ローヒールパンプス', image: '/img/shoes.png', brand: 'YOSUKE' }, cosme: { name: 'グロッシーリップ', image: '/img/cosme.png', brand: 'KATE' }, bag: { name: 'ミニチェーンバッグ', image: '/img/bag.png', brand: 'CELINE' } } },
  { id: 'cs2', date: '2026.09.14', theme: 'パープルドリーム', image: '/img/ai-art-sample.jpeg', aiArt: true,
    deck: { tops: { name: 'ホログラムトップ', image: '/img/dress.png', brand: 'h.NAOTO' }, bottoms: { name: 'プリーツスカート', image: '/img/bottom.png', brand: 'AXES' }, shoes: { name: 'プラットフォーム', image: '/img/shoes.png', brand: 'YOSUKE' }, cosme: { name: 'パールアイシャドウ', image: '/img/cosme.png', brand: 'RMK' }, bag: { name: 'キルティングバッグ', image: '/img/bag.png', brand: 'CHANEL' } } },
  { id: 'cs3', date: '2026.09.13', theme: 'ブルーシック', image: '/img/ai-art-sample.jpeg', aiArt: false,
    deck: { tops: { name: 'ニットベスト', image: '/img/dress.png', brand: 'UNIQLO' }, bottoms: { name: 'デニムミニ', image: '/img/bottom.png', brand: 'MOUSSY' }, shoes: { name: 'グリッターサンダル', image: '/img/shoes.png', brand: 'JIMMY' }, cosme: null, bag: { name: 'クリアバッグ', image: '/img/bag.png', brand: 'PVC' } } },
  { id: 'cs4', date: '2026.09.12', theme: 'Y2Kシャイン', image: '/img/ai-art-sample.jpeg', aiArt: true,
    deck: { tops: { name: 'フリルブラウス', image: '/img/dress.png', brand: 'BABY' }, bottoms: { name: 'バルーンミニ', image: '/img/bottom.png', brand: 'AXES' }, shoes: { name: 'グリッターサンダル', image: '/img/shoes.png', brand: 'JIMMY' }, cosme: { name: 'グロッシーリップ', image: '/img/cosme.png', brand: 'KATE' }, bag: { name: 'ミニチェーンバッグ', image: '/img/bag.png', brand: 'CELINE' } } },
]

const ITEM_CARDS: ItemCard[] = [
  { id: 't1', category: 'tops',    name: 'フリルブラウス',     image: '/img/dress.png',  color: '#f9a8d4', brand: 'BABY',    rarity: 'R ★★★☆' },
  { id: 't2', category: 'tops',    name: 'ホログラムトップ',   image: '/img/dress.png',  color: '#c084fc', brand: 'h.NAOTO', rarity: 'SR ★★★★' },
  { id: 't3', category: 'tops',    name: 'ニットベスト',       image: '/img/dress.png',  color: '#93c5fd', brand: 'UNIQLO',  rarity: 'N ★★☆☆' },
  { id: 'b1', category: 'bottoms', name: 'バルーンミニ',       image: '/img/bottom.png', color: '#fda4af', brand: 'AXES',    rarity: 'R ★★★☆' },
  { id: 'b2', category: 'bottoms', name: 'プリーツスカート',   image: '/img/bottom.png', color: '#fde68a', brand: 'AXES',    rarity: 'R ★★★☆' },
  { id: 'b3', category: 'bottoms', name: 'デニムミニ',         image: '/img/bottom.png', color: '#7dd3fc', brand: 'MOUSSY',  rarity: 'N ★★☆☆' },
  { id: 's1', category: 'shoes',   name: 'ローヒールパンプス', image: '/img/shoes.png',  color: '#fca5a5', brand: 'YOSUKE',  rarity: 'R ★★★☆' },
  { id: 's2', category: 'shoes',   name: 'プラットフォーム',   image: '/img/shoes.png',  color: '#a78bfa', brand: 'YOSUKE',  rarity: 'SR ★★★★' },
  { id: 's3', category: 'shoes',   name: 'グリッターサンダル', image: '/img/shoes.png',  color: '#6ee7b7', brand: 'JIMMY',   rarity: 'SR ★★★★' },
  { id: 'c1', category: 'cosme',   name: 'グロッシーリップ',   image: '/img/cosme.png',  color: '#fb7185', brand: 'KATE',    rarity: 'R ★★★☆' },
  { id: 'c2', category: 'cosme',   name: 'パールアイシャドウ', image: '/img/cosme.png',  color: '#c7d2fe', brand: 'RMK',     rarity: 'R ★★★☆' },
  { id: 'g1', category: 'bag',     name: 'ミニチェーンバッグ', image: '/img/bag.png',    color: '#d8b4fe', brand: 'CELINE',  rarity: 'SR ★★★★' },
  { id: 'g2', category: 'bag',     name: 'キルティングバッグ', image: '/img/bag.png',    color: '#fef08a', brand: 'CHANEL',  rarity: 'SR ★★★★' },
  { id: 'g3', category: 'bag',     name: 'クリアバッグ',       image: '/img/bag.png',    color: '#bae6fd', brand: 'PVC',     rarity: 'N ★★☆☆' },
]

const SLOT_CONFIG: { key: SlotKey; mark: string; label: string; color: string }[] = [
  { key: 'tops',    mark: '/img/mark-tops.png',    label: 'TOPS', color: '#fda4af' },
  { key: 'bottoms', mark: '/img/mark-bottoms.png', label: 'BTMS', color: '#fde68a' },
  { key: 'shoes',   mark: '/img/mark-shoes.png',   label: 'SHOE', color: '#a78bfa' },
  { key: 'cosme',   mark: '/img/mark-cosme.png',   label: 'CSME', color: '#fb7185' },
  { key: 'bag',     mark: '/img/mark-bag.png',     label: 'BAG',  color: '#d8b4fe' },
]

const CATEGORY_FILTERS: { key: CategoryFilter; label: string }[] = [
  { key: 'ALL', label: 'ALL' }, { key: 'tops', label: 'TOPS' }, { key: 'bottoms', label: 'BTMS' },
  { key: 'shoes', label: 'SHOE' }, { key: 'cosme', label: 'CSME' }, { key: 'bag', label: 'BAG' },
]

/* ── CoordCard ── */
function CoordCard({ coord, onTap }: { coord: CoordSnap; onTap: () => void }) {
  return (
    <motion.div
      whileTap={{ scale: 0.94 }}
      onClick={onTap}
      style={{
        position: 'relative', borderRadius: 14, overflow: 'hidden', cursor: 'pointer', aspectRatio: '3/4',
        border: coord.aiArt ? '2px solid rgba(255,215,0,0.7)' : '2px solid rgba(255,190,225,0.85)',
        boxShadow: coord.aiArt
          ? '0 6px 22px rgba(255,80,200,0.38), 0 1px 6px rgba(0,0,0,0.2)'
          : '0 4px 16px rgba(255,150,200,0.28), 0 1px 5px rgba(0,0,0,0.12)',
      }}
    >
      {coord.aiArt ? (
        /* AI ART: ホログラム全面カード */
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={coord.image} alt={coord.theme} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,180,255,0.16) 0%, rgba(180,240,255,0.10) 35%, rgba(255,255,180,0.10) 65%, rgba(220,180,255,0.16) 100%)', mixBlendMode: 'screen', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: 7, left: 7, zIndex: 3, background: 'linear-gradient(135deg, #ff4da6, #ff9800, #ffd700)', borderRadius: 20, padding: '3px 9px', fontSize: '0.46rem', fontWeight: 900, color: 'white', fontFamily: FREDOKA, letterSpacing: '0.07em', textShadow: '0 1px 3px rgba(0,0,0,0.5)', boxShadow: '0 2px 8px rgba(255,60,0,0.45)' }}>
            ✨ AI ART
          </div>
        </>
      ) : (
        /* 写真: プリクラ風 */
        <>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #fff0f8, #f8f0ff, #fff5f8)' }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={coord.image} alt={coord.theme} style={{ position: 'absolute', top: '10%', left: '8%', width: '84%', height: '62%', objectFit: 'cover', borderRadius: 6, border: '2px solid rgba(255,190,225,0.9)', boxShadow: '0 2px 8px rgba(200,80,200,0.2)' }} />
          <div style={{ position: 'absolute', top: 4, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #ff69b4, #ff9ede)', borderRadius: 20, padding: '1px 8px', whiteSpace: 'nowrap', zIndex: 3 }}>
            <span style={{ fontFamily: FREDOKA, fontSize: '0.4rem', fontWeight: 700, color: 'white', letterSpacing: '0.07em' }}>📷 MY SNAP</span>
          </div>
          <div style={{ position: 'absolute', top: 4, left: 4, fontSize: '0.52rem', color: '#ffd700', textShadow: '0 0 4px rgba(255,215,0,0.6)', zIndex: 2 }}>✦</div>
          <div style={{ position: 'absolute', top: 4, right: 4, fontSize: '0.52rem', color: '#ffd700', textShadow: '0 0 4px rgba(255,215,0,0.6)', zIndex: 2 }}>✦</div>
        </>
      )}

      {/* 下部情報バー */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2,
        background: coord.aiArt
          ? 'linear-gradient(transparent, rgba(12,0,35,0.9) 42%, rgba(6,0,20,0.97))'
          : 'linear-gradient(transparent, rgba(255,220,242,0.92) 38%, rgba(255,205,235,0.98))',
        padding: '20px 8px 7px',
      }}>
        <p style={{ fontFamily: ZEN, fontSize: '0.57rem', fontWeight: 900, color: coord.aiArt ? 'white' : '#b020d8', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textShadow: coord.aiArt ? TEXT_SHADOW : 'none' }}>
          💎 {coord.theme}
        </p>
        <p style={{ fontFamily: ZEN, fontSize: '0.41rem', color: coord.aiArt ? 'rgba(255,210,240,0.75)' : 'rgba(160,80,155,0.7)', margin: '1px 0 5px' }}>
          {coord.date}
        </p>
        {/* ジュエルスタンプ */}
        <div style={{ display: 'flex', gap: 3 }}>
          {SLOT_CONFIG.map(slot => {
            const has = !!coord.deck[slot.key]
            return (
              <div key={slot.key} style={{ width: 17, height: 17, borderRadius: '50%', background: has ? 'rgba(255,245,252,0.95)' : 'rgba(255,255,255,0.12)', border: has ? '1.5px solid rgba(255,215,0,0.65)' : '1.5px solid rgba(255,255,255,0.18)', boxShadow: has ? `0 0 5px ${slot.color}70` : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={slot.mark} alt={slot.label} style={{ width: '75%', height: '75%', objectFit: 'contain', mixBlendMode: 'multiply', opacity: has ? 1 : 0.2 }} />
              </div>
            )
          })}
        </div>
      </div>

      {/* 内側シャイン枠 */}
      <div style={{ position: 'absolute', inset: 0, borderRadius: 14, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.28)', pointerEvents: 'none', zIndex: 5 }} />
    </motion.div>
  )
}

/* ── ItemCardThumb ── */
function ItemCardThumb({ card, onTap }: { card: ItemCard; onTap: () => void }) {
  return (
    <motion.div whileTap={{ scale: 0.92 }} onClick={onTap} style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', background: card.color, border: '1.5px solid rgba(255,215,0,0.5)', boxShadow: `0 4px 14px ${card.color}80, 0 1px 4px rgba(0,0,0,0.16)`, cursor: 'pointer', aspectRatio: '2/3' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={card.image} alt={card.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', zIndex: 1 }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/img/Card_Frame.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'fill', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2px 3px 3px', background: 'rgba(0,0,0,0.62)', zIndex: 3 }}>
        <p style={{ fontFamily: ZEN, fontSize: '0.38rem', fontWeight: 900, color: 'white', margin: 0, textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{card.name}</p>
      </div>
    </motion.div>
  )
}

/* ── CoordFlipModal ── */
function CoordFlipModal({ coord, onClose }: { coord: CoordSnap; onClose: () => void }) {
  const [flipped, setFlipped] = useState(false)
  const [activeSlot, setActiveSlot] = useState<SlotKey | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(18,4,38,0.9)', backdropFilter: 'blur(14px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 28px' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, color: 'rgba(255,255,255,0.75)', lineHeight: 0, cursor: 'pointer' }}><X size={24} /></button>
      <p style={{ fontFamily: ZEN, fontSize: '0.68rem', color: 'rgba(255,200,240,0.8)', marginBottom: 16, textShadow: TEXT_SHADOW }}>
        {flipped ? '🃏 タップで表に戻す' : '🃏 タップで裏面を見る'}
      </p>

      <div style={{ width: '100%', maxWidth: 264, aspectRatio: '3/4', perspective: '1000px', cursor: 'pointer' }} onClick={() => setFlipped(f => !f)}>
        <motion.div animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.6, ease: 'easeInOut' }} style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d', position: 'relative' }}>

          {/* 表面 */}
          <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', borderRadius: 20, overflow: 'hidden', border: '2px solid rgba(255,215,0,0.65)', boxShadow: '0 16px 50px rgba(0,0,0,0.72)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={coord.image} alt={coord.theme} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,180,255,0.1) 0%, rgba(180,240,255,0.07) 50%, rgba(255,255,180,0.07) 100%)', mixBlendMode: 'screen', pointerEvents: 'none' }} />
            {coord.aiArt && (
              <div style={{ position: 'absolute', top: 14, left: 14, background: 'linear-gradient(135deg, #ff4da6, #ff9800, #ffd700)', borderRadius: 12, padding: '4px 12px', fontSize: '0.58rem', fontWeight: 900, color: 'white', fontFamily: FREDOKA, textShadow: '0 1px 3px rgba(0,0,0,0.5)', boxShadow: '0 3px 12px rgba(255,60,0,0.5)', zIndex: 2 }}>✨ AI ART</div>
            )}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 16px 18px', background: 'linear-gradient(transparent, rgba(12,2,36,0.92))' }}>
              <p style={{ fontFamily: ZEN, color: 'rgba(255,210,240,0.8)', fontSize: '0.56rem', margin: 0 }}>{coord.date}</p>
              <p style={{ fontFamily: ZEN, color: 'white', fontSize: '0.95rem', fontWeight: 900, margin: '4px 0 0', textShadow: TEXT_SHADOW }}>💎 {coord.theme}</p>
            </div>
          </div>

          {/* 裏面 */}
          <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)', borderRadius: 20, overflow: 'hidden', border: '2px solid rgba(255,215,0,0.65)', boxShadow: '0 16px 50px rgba(0,0,0,0.72)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/ard-back.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(6,0,20,0.45)' }} />

            <div
              style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', padding: '14px 11px 12px' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ゴールドラベルスタンプ */}
              <div style={{ background: 'rgba(255,215,0,0.1)', border: '1.5px solid rgba(255,215,0,0.48)', borderRadius: 10, padding: '7px 10px', textAlign: 'center', marginBottom: 8, backdropFilter: 'blur(6px)' }}>
                <p style={{ fontFamily: FREDOKA, color: '#ffd700', fontSize: '0.5rem', fontWeight: 700, margin: '0 0 2px', letterSpacing: '0.14em', textShadow: '0 0 12px rgba(255,215,0,0.7)' }}>✦ COORD RECORD ✦</p>
                <p style={{ fontFamily: ZEN, color: 'white', fontSize: '0.78rem', fontWeight: 900, margin: '0 0 1px', textShadow: TEXT_SHADOW }}>💎 {coord.theme}</p>
                <p style={{ fontFamily: ZEN, color: 'rgba(255,210,240,0.82)', fontSize: '0.46rem', margin: 0 }}>{coord.date}</p>
              </div>

              <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.55), transparent)', marginBottom: 8 }} />
              <p style={{ fontFamily: ZEN, color: 'rgba(255,215,0,0.88)', fontSize: '0.46rem', fontWeight: 900, margin: '0 0 7px', textAlign: 'center', letterSpacing: '0.1em' }}>✦ TODAY&apos;S DECK ✦</p>

              {/* 5枚ミニスロットカード（タップで詳細） */}
              <div style={{ display: 'flex', gap: 4, flex: 1, alignItems: 'flex-start' }}>
                {SLOT_CONFIG.map(slot => {
                  const item = coord.deck[slot.key]
                  const isActive = activeSlot === slot.key
                  return (
                    <motion.div
                      key={slot.key}
                      whileTap={item ? { scale: 0.92 } : {}}
                      onClick={(e) => { e.stopPropagation(); if (item) setActiveSlot(p => p === slot.key ? null : slot.key) }}
                      style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: item ? 'pointer' : 'default' }}
                    >
                      <div style={{ width: '100%', aspectRatio: '2/3', borderRadius: 6, overflow: 'hidden', border: isActive ? '2px solid #ffd700' : item ? '1.5px solid rgba(255,215,0,0.55)' : '1.5px solid rgba(255,255,255,0.14)', background: item ? 'rgba(255,242,252,0.92)' : 'rgba(255,255,255,0.06)', boxShadow: isActive ? `0 0 14px rgba(255,215,0,0.6), 0 3px 10px ${slot.color}60` : item ? `0 3px 8px ${slot.color}50` : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}>
                        {item
                          ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                          : /* eslint-disable-next-line @next/next/no-img-element */ <img src={slot.mark} alt={slot.label} style={{ width: '60%', height: '60%', objectFit: 'contain', opacity: 0.2 }} />
                        }
                      </div>
                      <p style={{ fontFamily: FREDOKA, fontSize: '0.33rem', fontWeight: 700, color: isActive ? '#ffd700' : item ? 'rgba(255,225,245,0.85)' : 'rgba(255,255,255,0.25)', margin: 0, textAlign: 'center', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                        {slot.label}
                      </p>
                    </motion.div>
                  )
                })}
              </div>

              {/* スロット詳細ポップアップ */}
              <AnimatePresence>
                {activeSlot && coord.deck[activeSlot] && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.18 }}
                    style={{ marginTop: 8, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: 9, padding: '7px 11px', border: '1px solid rgba(255,215,0,0.38)' }}
                  >
                    <p style={{ fontFamily: FREDOKA, color: '#ffd700', fontSize: '0.42rem', fontWeight: 700, margin: '0 0 2px', letterSpacing: '0.08em' }}>
                      {SLOT_CONFIG.find(s => s.key === activeSlot)?.label}
                    </p>
                    <p style={{ fontFamily: ZEN, color: 'white', fontSize: '0.68rem', fontWeight: 900, margin: 0, textShadow: TEXT_SHADOW }}>
                      {coord.deck[activeSlot]!.name}
                    </p>
                    {coord.deck[activeSlot]!.brand && (
                      <p style={{ fontFamily: ZEN, color: 'rgba(255,210,240,0.75)', fontSize: '0.48rem', margin: '2px 0 0' }}>
                        {coord.deck[activeSlot]!.brand}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.38), transparent)', marginTop: 8 }} />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

/* ── ItemFlipModal ── */
function ItemFlipModal({ card, onClose }: { card: ItemCard; onClose: () => void }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(18,4,38,0.9)', backdropFilter: 'blur(14px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 40px' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, color: 'rgba(255,255,255,0.75)', lineHeight: 0, cursor: 'pointer' }}><X size={24} /></button>
      <p style={{ fontFamily: ZEN, fontSize: '0.68rem', color: 'rgba(255,200,240,0.8)', marginBottom: 18, textShadow: TEXT_SHADOW }}>
        {flipped ? '🃏 タップで表に戻す' : '🃏 タップで裏面を見る'}
      </p>

      <div style={{ width: '100%', maxWidth: 220, aspectRatio: '2/3', perspective: '1000px', cursor: 'pointer' }} onClick={() => setFlipped(f => !f)}>
        <motion.div animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.6, ease: 'easeInOut' }} style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d', position: 'relative' }}>
          {/* 表面 */}
          <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', borderRadius: 16, overflow: 'hidden', background: card.color, border: '2px solid rgba(255,215,0,0.6)', boxShadow: `0 14px 44px ${card.color}99, 0 4px 16px rgba(0,0,0,0.45)` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={card.image} alt={card.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', zIndex: 1 }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/Card_Frame.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'fill', zIndex: 2, pointerEvents: 'none' }} />
          </div>
          {/* 裏面 */}
          <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)', borderRadius: 16, overflow: 'hidden', border: '2px solid rgba(255,215,0,0.6)', boxShadow: '0 14px 44px rgba(0,0,0,0.6)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/ard-back.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(6,0,20,0.35)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 16px', gap: 12 }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,245,252,0.94)', border: '2px solid rgba(255,215,0,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 18px rgba(255,100,200,0.45)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/img/mark-${card.category}.png`} alt={card.category} style={{ width: 42, height: 42, objectFit: 'contain', mixBlendMode: 'multiply' }} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: FREDOKA, color: '#ffd700', fontSize: '0.58rem', fontWeight: 700, margin: '0 0 4px', letterSpacing: '0.12em', textShadow: '0 0 12px rgba(255,215,0,0.7)' }}>{card.category.toUpperCase()}</p>
                <p style={{ fontFamily: ZEN, color: 'white', fontSize: '0.86rem', fontWeight: 900, margin: 0, textShadow: TEXT_SHADOW }}>{card.name}</p>
                <p style={{ fontFamily: FREDOKA, color: 'rgba(255,220,180,0.85)', fontSize: '0.58rem', margin: '3px 0 0' }}>{card.brand}</p>
                <p style={{ fontFamily: ZEN, color: 'rgba(255,210,240,0.75)', fontSize: '0.6rem', margin: '5px 0 0' }}>{card.rarity}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

/* ── BinderScreen (main) ── */
export default function BinderScreen() {
  const router = useRouter()
  const [mainTab, setMainTab] = useState<MainTab>('coord')
  const [catFilter, setCatFilter] = useState<CategoryFilter>('ALL')
  const [selectedCoord, setSelectedCoord] = useState<CoordSnap | null>(null)
  const [selectedItem, setSelectedItem] = useState<ItemCard | null>(null)

  const filteredItems = catFilter === 'ALL' ? ITEM_CARDS : ITEM_CARDS.filter(c => c.category === catFilter)

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundImage: "url('/img/wall.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* ラメプラスチックカバー感 */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,150,220,0.14) 0%, rgba(200,120,255,0.10) 50%, rgba(255,180,240,0.13) 100%)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1, height: '100dvh', maxWidth: 430, margin: '0 auto', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* ヘッダー */}
        <header style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 14px 10px', background: 'linear-gradient(135deg, rgba(255,55,170,0.9) 0%, rgba(125,35,215,0.9) 100%)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,215,0,0.22)', boxShadow: '0 4px 22px rgba(170,20,170,0.32)' }}>
          <motion.button whileTap={{ scale: 0.92 }} onClick={() => router.back()} style={{ display: 'flex', alignItems: 'center', gap: 3, color: 'white', fontFamily: ZEN, fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', textShadow: TEXT_SHADOW }}>
            <ChevronLeft size={17} />戻る
          </motion.button>
          <h1 style={{ fontFamily: FREDOKA, fontWeight: 700, fontSize: '1.28rem', color: 'white', margin: 0, letterSpacing: '0.1em', textShadow: '0 2px 0 rgba(170,20,130,0.55), 0 0 24px rgba(255,215,0,0.4)', WebkitTextStroke: '0.5px rgba(255,215,0,0.4)' }}>
            MY BINDER
          </h1>
          <div style={{ width: 52 }} />
        </header>

        {/* ぷっくりタブ */}
        <div style={{ flexShrink: 0, display: 'flex', gap: 8, padding: '10px 12px 0' }}>
          {([
            { key: 'coord' as MainTab, icon: '/img/tab-snap.png',    label: '完成コーデ',    emoji: '✨' },
            { key: 'item'  as MainTab, icon: '/img/icon-binder.png', label: 'アイテムカード', emoji: '👗' },
          ]).map(tab => {
            const active = mainTab === tab.key
            return (
              <motion.button
                key={tab.key} whileTap={{ scale: 0.97 }} onClick={() => setMainTab(tab.key)}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  padding: '9px 6px 11px', borderRadius: '14px 14px 0 0',
                  border: active ? '2px solid #ffd700' : '2px solid rgba(255,255,255,0.25)',
                  borderBottom: 'none',
                  background: active
                    ? 'linear-gradient(175deg, rgba(255,248,255,0.98) 0%, rgba(255,250,240,0.98) 100%)'
                    : 'linear-gradient(175deg, rgba(255,175,238,0.72) 0%, rgba(216,155,255,0.62) 100%)',
                  boxShadow: active
                    ? '0 -6px 22px rgba(255,80,200,0.28), inset 0 1px 0 rgba(255,255,255,0.8)'
                    : '0 4px 0 rgba(160,25,150,0.38), inset 0 1px 0 rgba(255,255,255,0.35)',
                  transform: active ? 'translateY(2px)' : 'translateY(0)',
                  transition: 'all 0.18s ease',
                  cursor: 'pointer', position: 'relative', zIndex: active ? 2 : 1,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={tab.icon} alt=""
                  style={{
                    width: 32, height: 32, objectFit: 'contain',
                    mixBlendMode: active ? 'multiply' : 'normal',
                    filter: active
                      ? 'drop-shadow(0 2px 6px rgba(255,60,200,0.6))'
                      : 'brightness(10) drop-shadow(0 1px 3px rgba(0,0,0,0.25))',
                    opacity: active ? 1 : 0.92,
                    transition: 'all 0.18s',
                  }}
                />
                <span style={{ fontFamily: ZEN, fontSize: '0.67rem', fontWeight: 900, color: active ? '#b020d8' : 'rgba(255,255,255,0.95)', textShadow: active ? 'none' : TEXT_SHADOW, whiteSpace: 'nowrap' }}>
                  {tab.emoji} {tab.label}
                </span>
              </motion.button>
            )
          })}
        </div>

        {/* バインダー本体エリア */}
        <div style={{
          flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden',
          background: [
            'linear-gradient(rgba(255,242,253,0.95) 0%, rgba(248,235,255,0.95) 100%)',
            'repeating-linear-gradient(0deg, transparent, transparent 23px, rgba(255,130,210,0.09) 23px, rgba(255,130,210,0.09) 24px)',
            'repeating-linear-gradient(90deg, transparent, transparent 23px, rgba(255,130,210,0.09) 23px, rgba(255,130,210,0.09) 24px)',
          ].join(', '),
          borderTop: '2px solid rgba(255,215,0,0.28)',
        }}>

          {/* アイテムタブ: コレクションバッジ + フィルター */}
          {mainTab === 'item' && (
            <div style={{ flexShrink: 0, padding: '8px 12px 6px' }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 6 }}>
                <div style={{ background: 'linear-gradient(135deg, rgba(255,80,200,0.14), rgba(180,60,240,0.11))', border: '1.5px solid rgba(255,215,0,0.5)', borderRadius: 20, padding: '3px 12px' }}>
                  <span style={{ fontFamily: FREDOKA, fontSize: '0.56rem', fontWeight: 700, color: '#b020d8', letterSpacing: '0.06em' }}>
                    ✦ COLLECTION: {ITEM_CARDS.length}/{TOTAL_COLLECTION}
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 5, overflowX: 'auto' }}>
                {CATEGORY_FILTERS.map(f => {
                  const active = catFilter === f.key
                  return (
                    <button key={f.key} onClick={() => setCatFilter(f.key)} style={{ flexShrink: 0, padding: '4px 13px', borderRadius: 20, border: active ? '2px solid rgba(200,50,220,0.75)' : '2px solid rgba(200,140,220,0.3)', background: active ? 'linear-gradient(135deg, rgba(255,70,200,0.18), rgba(170,50,240,0.14))' : 'rgba(255,255,255,0.65)', color: active ? '#a020d0' : 'rgba(140,70,160,0.82)', fontFamily: ZEN, fontSize: '0.62rem', fontWeight: 900, cursor: 'pointer', boxShadow: active ? '0 2px 10px rgba(200,50,220,0.22)' : 'none', transition: 'all 0.15s' }}>
                      {f.label}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* グリッド */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px 24px' }}>
            <AnimatePresence mode="wait">
              {mainTab === 'coord' ? (
                <motion.div key="coord" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                  {COORD_SNAPS.map(coord => (
                    <CoordCard key={coord.id} coord={coord} onTap={() => setSelectedCoord(coord)} />
                  ))}
                </motion.div>
              ) : (
                <motion.div key="item" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 9 }}>
                  {filteredItems.map(card => (
                    <ItemCardThumb key={card.id} card={card} onTap={() => setSelectedItem(card)} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

      <AnimatePresence>
        {selectedCoord && <CoordFlipModal key="coord-modal" coord={selectedCoord} onClose={() => setSelectedCoord(null)} />}
        {selectedItem && <ItemFlipModal key="item-modal" card={selectedItem} onClose={() => setSelectedItem(null)} />}
      </AnimatePresence>
    </div>
  )
}
