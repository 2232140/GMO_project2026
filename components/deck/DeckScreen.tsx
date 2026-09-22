'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useAnimate } from 'framer-motion'
import { ChevronLeft, Sparkles, BookOpen, Save, X, Check, Lock, Unlock } from 'lucide-react'
import { useRouter } from 'next/navigation'

/* ━━━ types ━━━ */
type SlotKey = 'tops' | 'bottoms' | 'shoes' | 'cosme' | 'bag'

interface Card {
  id: string
  category: SlotKey
  name: string
  brand: string
  colorName: string
  color: string
  tags: string[]
  emoji: string
  image: string
  rarity: 'N' | 'R' | 'SR'
}

interface StyleScore {
  label: string
  pct: number
}

/* ━━━ mock data ━━━ */
const MOCK_CARDS: Card[] = [
  { id: 't1', category: 'tops',    name: 'フリルブラウス',   brand: 'LOVEBERRY',  colorName: 'ミルクピンク',  color: '#f9a8d4', tags: ['#ガーリー','#フリル','#ピンク'],     emoji: '🌸', image: '/img/dress.png',  rarity: 'R'  },
  { id: 't2', category: 'tops',    name: 'ホログラムトップ', brand: 'Y2K STAR',   colorName: 'ホログラム',    color: '#c084fc', tags: ['#Y2K','#ホロ','#パープル'],         emoji: '⭐', image: '/img/dress.png',  rarity: 'SR' },
  { id: 't3', category: 'tops',    name: 'ニットベスト',     brand: 'KAWAII CO',  colorName: 'スカイブルー',  color: '#93c5fd', tags: ['#ナチュラル','#ブルー'],             emoji: '☁️', image: '/img/dress.png',  rarity: 'N'  },
  { id: 'b1', category: 'bottoms', name: 'バルーンミニ',     brand: 'Y2K STAR',   colorName: 'コーラルピンク',color: '#fda4af', tags: ['#Y2K','#ミニスカ','#ピンク'],       emoji: '🎀', image: '/img/bottom.png', rarity: 'SR' },
  { id: 'b2', category: 'bottoms', name: 'プリーツスカート', brand: 'LOVEBERRY',  colorName: 'バタースコッチ',color: '#fde68a', tags: ['#ガーリー','#イエロー','#フリル'], emoji: '🌺', image: '/img/bottom.png', rarity: 'R'  },
  { id: 'b3', category: 'bottoms', name: 'デニムミニ',       brand: 'DENIM DOLL', colorName: 'ライトブルー',  color: '#7dd3fc', tags: ['#カジュアル','#デニム'],             emoji: '👖', image: '/img/bottom.png', rarity: 'N'  },
  { id: 's1', category: 'shoes',   name: 'ローヒールパンプス',brand: 'LOVEBERRY', colorName: 'ベビーピンク',  color: '#fca5a5', tags: ['#ガーリー','#ピンク','#パンプス'],  emoji: '👠', image: '/img/shoes.png',  rarity: 'R'  },
  { id: 's2', category: 'shoes',   name: 'プラットフォーム', brand: 'Y2K STAR',   colorName: 'ラベンダー',    color: '#a78bfa', tags: ['#Y2K','#厚底','#パープル'],         emoji: '✨', image: '/img/shoes.png',  rarity: 'SR' },
  { id: 's3', category: 'shoes',   name: 'グリッターサンダル',brand: 'GLITTER Q', colorName: 'ミントグリーン',color: '#6ee7b7', tags: ['#グリッター','#グリーン'],           emoji: '💫', image: '/img/shoes.png',  rarity: 'N'  },
  { id: 'c1', category: 'cosme',   name: 'グロッシーリップ', brand: 'PEACH KISS', colorName: 'コーラル',      color: '#fb7185', tags: ['#ガーリー','#リップ','#ピンク'],    emoji: '💋', image: '/img/cosme.png',  rarity: 'R'  },
  { id: 'c2', category: 'cosme',   name: 'パールアイシャドウ',brand: 'Y2K STAR',  colorName: 'ペールラベンダー',color: '#c7d2fe',tags: ['#Y2K','#パール','#パープル'],      emoji: '🌟', image: '/img/cosme.png',  rarity: 'SR' },
  { id: 'g1', category: 'bag',     name: 'ミニチェーンバッグ',brand: 'Y2K STAR',  colorName: 'モーブパープル',color: '#d8b4fe', tags: ['#Y2K','#チェーン','#パープル'],    emoji: '👜', image: '/img/bag.png',    rarity: 'SR' },
  { id: 'g2', category: 'bag',     name: 'キルティングバッグ',brand: 'LOVEBERRY', colorName: 'レモンクリーム',color: '#fef08a', tags: ['#ガーリー','#キルティング'],        emoji: '🛍️', image: '/img/bag.png',    rarity: 'R'  },
  { id: 'g3', category: 'bag',     name: 'クリアバッグ',     brand: 'GLITTER Q',  colorName: 'クリスタル',    color: '#bae6fd', tags: ['#グリッター','#クリア'],             emoji: '💎', image: '/img/bag.png',    rarity: 'N'  },
]

/* ━━━ category config ━━━ */
const CATEGORIES: { key: SlotKey; label: string; mark: string }[] = [
  { key: 'tops',    label: 'TOPS',    mark: '/img/mark-tops.png'    },
  { key: 'bottoms', label: 'BOTTOMS', mark: '/img/mark-bottoms.png' },
  { key: 'shoes',   label: 'SHOES',   mark: '/img/mark-shoes.png'   },
  { key: 'cosme',   label: 'COSME',   mark: '/img/mark-cosme.png'   },
  { key: 'bag',     label: 'BAG',     mark: '/img/mark-bag.png'     },
]

const ZEN = 'var(--font-zen-maru-gothic), var(--font-nunito), sans-serif'
const TEXT_SHADOW = '0 2px 4px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,0.9)'

const RARITY_COLOR: Record<Card['rarity'], string> = {
  N: 'rgba(180,180,200,0.9)',
  R: 'rgba(120,180,255,0.95)',
  SR: 'rgba(255,215,0,0.95)',
}

/* ━━━ computeScores ━━━ */
function computeScores(deck: Record<SlotKey, Card | null>): StyleScore[] {
  const filled = Object.values(deck).filter(Boolean) as Card[]
  if (filled.length < 2) return []
  const allTags = filled.flatMap(c => c.tags)
  const scores: StyleScore[] = []

  const y2kCount = allTags.filter(t => t === '#Y2K').length
  if (y2kCount >= 2) scores.push({ label: '✨ Y2Kギャル度', pct: Math.min(60 + y2kCount * 10, 98) })

  const pinkCount = allTags.filter(t => t === '#ピンク').length
  if (pinkCount >= 2) scores.push({ label: '💗 ピンクコーデ度', pct: Math.min(55 + pinkCount * 12, 97) })

  const girlyCount = allTags.filter(t => t === '#ガーリー').length
  if (girlyCount >= 2) scores.push({ label: '🎀 ガーリー感', pct: Math.min(58 + girlyCount * 10, 96) })

  const purpleCount = allTags.filter(t => t === '#パープル').length
  if (purpleCount >= 2) scores.push({ label: '💜 パープルオーラ', pct: Math.min(62 + purpleCount * 9, 95) })

  if (filled.length === 5) scores.push({ label: '👑 コーデ完成度', pct: 100 })

  return scores.slice(0, 4)
}

/* ━━━ FlipModal ━━━ */
function FlipModal({ card, onClose }: { card: Card; onClose: () => void }) {
  const [showBack, setShowBack] = useState(false)
  const [cardScope, animateCard] = useAnimate()
  const animating = useRef(false)

  const handleFlip = async () => {
    if (animating.current) return
    animating.current = true
    await animateCard(cardScope.current, { rotateY: 90 }, { duration: 0.2, ease: 'easeIn' })
    setShowBack(v => !v)
    await animateCard(cardScope.current, { rotateY: -90 }, { duration: 0 })
    await animateCard(cardScope.current, { rotateY: 0 }, { duration: 0.2, ease: 'easeOut' })
    animating.current = false
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 80,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
      }}
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        onClick={e => e.stopPropagation()}
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
          padding: '24px 20px',
          borderRadius: 20,
          background: 'linear-gradient(160deg, rgba(72,14,110,0.97) 0%, rgba(32,8,72,0.99) 100%)',
          border: '2px solid rgba(255,180,255,0.45)',
          boxShadow: '0 0 60px rgba(220,40,200,0.45)',
          maxWidth: 280, width: '90vw',
        }}
      >
        {/* カード本体 (タップで反転) */}
        <div style={{ perspective: 600, width: 160, flexShrink: 0 }}>
          <div
            ref={cardScope}
            onClick={handleFlip}
            style={{ position: 'relative', width: 160, aspectRatio: '373 / 669', cursor: 'pointer', willChange: 'transform' }}
          >
            {!showBack ? (
              /* 表面 */
              <>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("/img/white000.png")', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat', borderRadius: 12 }} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={card.image} alt={card.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', zIndex: 1 }} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/img/Card_Frame2.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'fill', pointerEvents: 'none', zIndex: 2 }} />
                <div style={{
                  position: 'absolute', top: 6, left: 6, zIndex: 3,
                  padding: '2px 6px', borderRadius: 4,
                  background: RARITY_COLOR[card.rarity],
                  fontFamily: ZEN, fontSize: '0.52rem', fontWeight: 900, color: '#3a1890',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.5)',
                }}>
                  {card.rarity}
                </div>
              </>
            ) : (
              /* 裏面 */
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/img/card-back.png" alt="card back" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12, zIndex: 1 }} />
                <div style={{
                  position: 'absolute', inset: 0, zIndex: 2,
                  borderRadius: 12,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.82) 100%)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                  padding: '10px 10px 12px',
                  gap: 4,
                }}>
                  <p style={{ fontFamily: ZEN, fontWeight: 900, fontSize: '0.75rem', color: 'white', margin: 0, textShadow: TEXT_SHADOW }}>{card.name}</p>
                  <p style={{ fontFamily: ZEN, fontSize: '0.6rem', color: 'rgba(255,220,255,0.9)', margin: 0 }}>{card.brand}</p>
                  <p style={{ fontFamily: ZEN, fontSize: '0.58rem', color: 'rgba(255,255,255,0.75)', margin: 0 }}>{card.colorName}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 2 }}>
                    {card.tags.map(tag => (
                      <span key={tag} style={{
                        fontFamily: ZEN, fontSize: '0.48rem', fontWeight: 700,
                        padding: '1px 5px', borderRadius: 4,
                        background: 'rgba(255,100,200,0.4)', color: 'white',
                        border: '1px solid rgba(255,150,220,0.5)',
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <p style={{ fontFamily: ZEN, fontSize: '0.65rem', color: 'rgba(255,200,255,0.8)', margin: 0, textShadow: TEXT_SHADOW }}>
          タップでカードを裏返す ✦
        </p>

        <button
          onClick={onClose}
          style={{
            fontFamily: ZEN, fontWeight: 900, fontSize: '0.82rem',
            padding: '9px 28px', borderRadius: 9999,
            background: 'rgba(255,255,255,0.12)',
            border: '2px solid rgba(255,255,255,0.35)',
            color: 'white', cursor: 'pointer',
            textShadow: TEXT_SHADOW,
          }}
        >
          とじる
        </button>
      </motion.div>
    </motion.div>
  )
}

/* ━━━ Slot ━━━ */
function Slot({ cat, card, locked, isShuffling, onTap, onRemove, onLock, onFlip }: {
  cat: typeof CATEGORIES[0]
  card: Card | null
  locked: boolean
  isShuffling: boolean
  onTap: () => void
  onRemove: () => void
  onLock: () => void
  onFlip: () => void
}) {
  return (
    <div style={{ flex: 1, maxWidth: 68, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{ position: 'relative', width: '100%' }}>
        {/* シャッフルアニメーション */}
        <motion.div
          animate={isShuffling && !locked ? { scale: [1, 0.88, 1.06, 0.93, 1], rotate: [-5, 5, -3, 3, 0] } : { scale: 1, rotate: 0 }}
          transition={isShuffling && !locked ? { duration: 0.45, repeat: Infinity } : {}}
          style={{ width: '100%' }}
        >
          <button
            onClick={card ? onFlip : onTap}
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '2/3',
              borderRadius: 8,
              overflow: 'hidden',
              border: locked ? '2.5px solid rgba(255,215,0,0.92)' : 'none',
              background: 'transparent',
              boxShadow: locked
                ? `0 0 16px rgba(255,215,0,0.6), 0 2px 10px rgba(0,0,0,0.5)`
                : card
                  ? `0 0 14px ${card.color}99, 0 2px 10px rgba(0,0,0,0.5)`
                  : '0 2px 10px rgba(0,0,0,0.35)',
              cursor: 'pointer',
              filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.35))',
            }}
          >
            {card ? (
              <>
                <div style={{ position: 'absolute', inset: 0, background: 'white', zIndex: 0 }} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.image} alt={card.name}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', zIndex: 1 }}
                />
              </>
            ) : (
              <>
                <div style={{
                  position: 'absolute',
                  top: '16%', bottom: '14%', left: '9%', right: '9%',
                  background: 'rgba(255,240,248,0.95)', borderRadius: 4, zIndex: 1,
                }} />
                <div style={{
                  position: 'absolute',
                  top: '16%', bottom: '14%', left: '9%', right: '9%',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
                  zIndex: 2,
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cat.mark} alt={cat.label} style={{ width: '65%', height: 'auto', objectFit: 'contain', mixBlendMode: 'multiply', opacity: 0.6 }} />
                  <span style={{ fontFamily: ZEN, fontSize: '0.36rem', fontWeight: 900, color: 'rgba(180,60,120,0.75)', letterSpacing: '0.06em' }}>
                    {cat.label}
                  </span>
                </div>
              </>
            )}

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/slot-frame.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'fill', zIndex: 3, pointerEvents: 'none' }} />
          </button>
        </motion.div>

        {/* 🔒 ロックボタン (左上) — カードがある時のみ */}
        {card && (
          <button
            onClick={e => { e.stopPropagation(); onLock() }}
            style={{
              position: 'absolute', top: 3, left: 3, zIndex: 10,
              width: 18, height: 18, borderRadius: '50%',
              background: locked ? 'rgba(255,215,0,0.95)' : 'rgba(30,10,60,0.85)',
              border: locked ? '1.5px solid rgba(255,255,255,0.9)' : '1.5px solid rgba(255,255,255,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: locked ? '0 0 8px rgba(255,215,0,0.7)' : '0 1px 4px rgba(0,0,0,0.6)',
            }}
          >
            {locked
              ? <Lock size={9} color="#5030a0" strokeWidth={2.5} />
              : <Unlock size={9} color="rgba(255,255,255,0.7)" strokeWidth={2} />
            }
          </button>
        )}

        {/* ✕ 解除ボタン (右上) — カードがある時のみ */}
        {card && (
          <button
            onClick={e => { e.stopPropagation(); onRemove() }}
            style={{
              position: 'absolute', top: 3, right: 3, zIndex: 10,
              width: 14, height: 14, borderRadius: '50%',
              background: 'rgba(255,60,100,0.92)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={8} color="white" strokeWidth={3} />
          </button>
        )}
      </div>

      <span style={{ fontFamily: ZEN, fontSize: '0.5rem', fontWeight: 900, color: 'white', letterSpacing: '0.06em', textShadow: TEXT_SHADOW }}>
        {cat.label}
      </span>
    </div>
  )
}

/* ━━━ CardThumb ━━━ */
function CardThumb({ card, selected, onSelect, size = 'sm' }: {
  card: Card
  selected: boolean
  onSelect: () => void
  size?: 'sm' | 'md'
}) {
  const w = size === 'sm' ? 68 : '100%'
  return (
    <button
      onClick={onSelect}
      style={{
        position: 'relative',
        flexShrink: 0,
        width: w,
        aspectRatio: '373 / 669',
        borderRadius: 8,
        overflow: 'hidden',
        backgroundImage: 'url("/img/white000.png")',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        border: selected ? '2.5px solid #ffd700' : '2px solid rgba(255,255,255,0.8)',
        boxShadow: selected
          ? `0 0 14px ${card.color}, 0 3px 12px rgba(0,0,0,0.45)`
          : '0 3px 12px rgba(0,0,0,0.45)',
        cursor: 'pointer',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.35))',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={card.image} alt={card.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', zIndex: 1 }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/img/Card_Frame2.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'fill', pointerEvents: 'none', zIndex: 2 }} />
      {selected && (
        <div style={{ position: 'absolute', top: 4, right: 4, zIndex: 4, width: 16, height: 16, borderRadius: '50%', background: '#ffd700', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Check size={9} color="#5030a0" strokeWidth={3} />
        </div>
      )}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '3px 4px', background: 'rgba(0,0,0,0.65)', zIndex: 3 }}>
        <p style={{ fontFamily: ZEN, fontSize: '0.48rem', fontWeight: 900, color: 'white', margin: 0, textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textShadow: TEXT_SHADOW }}>
          {card.name}
        </p>
      </div>
    </button>
  )
}

/* ━━━ main ━━━ */
export default function DeckScreen() {
  const router = useRouter()

  const [deck, setDeck] = useState<Record<SlotKey, Card | null>>({
    tops: null, bottoms: null, shoes: null, cosme: null, bag: null,
  })
  const [locks, setLocks] = useState<Record<SlotKey, boolean>>({
    tops: false, bottoms: false, shoes: false, cosme: false, bag: false,
  })
  const [activeTab, setActiveTab] = useState<SlotKey>('tops')
  const [showBinder, setShowBinder] = useState(false)
  const [showAI, setShowAI] = useState(false)
  const [isAILoading, setIsAILoading] = useState(false)
  const [styleScores, setStyleScores] = useState<StyleScore[]>([])
  const [flipCard, setFlipCard] = useState<Card | null>(null)
  const [saveLoading, setSaveLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const displayScores = styleScores.length > 0 ? styleScores : computeScores(deck)

  const filteredCards = MOCK_CARDS.filter(c => c.category === activeTab)

  const selectCard = (card: Card) => {
    setDeck(prev => ({ ...prev, [card.category]: card }))
    setStyleScores([])
    setShowBinder(false)
  }

  const toggleLock = (key: SlotKey) => {
    if (!deck[key]) return
    setLocks(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const removeCard = (key: SlotKey) => {
    setDeck(prev => ({ ...prev, [key]: null }))
    setLocks(prev => ({ ...prev, [key]: false }))
    setStyleScores([])
  }

  const toggleSlot = (key: SlotKey) => {
    setActiveTab(key)
  }

  const handleAI = async () => {
    if (isAILoading) return
    setIsAILoading(true)
    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deck: Object.fromEntries(Object.entries(deck).map(([k, v]) => [k, (v as Card | null)?.id ?? null])),
          locks,
        }),
      })
      const data = await res.json()
      await new Promise(r => setTimeout(r, 600))
      const newDeck = { ...deck }
      for (const key of Object.keys(data.deck) as SlotKey[]) {
        if (!locks[key]) {
          newDeck[key] = MOCK_CARDS.find(c => c.id === data.deck[key]) ?? null
        }
      }
      setDeck(newDeck)
      setStyleScores(data.scores ?? [])
      setShowAI(true)
      setTimeout(() => setShowAI(false), 2500)
    } catch {
      // API失敗時はクライアント側フォールバック
      const newDeck = { ...deck }
      CATEGORIES.forEach(({ key }) => {
        if (!locks[key]) {
          const pool = MOCK_CARDS.filter(c => c.category === key)
          newDeck[key] = pool[Math.floor(Math.random() * pool.length)]
        }
      })
      setDeck(newDeck)
      setStyleScores([])
    } finally {
      setIsAILoading(false)
    }
  }

  const handleSave = async () => {
    if (saveLoading) return
    setSaveLoading(true)
    try {
      await fetch('/api/deck/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deck: Object.fromEntries(Object.entries(deck).map(([k, v]) => [k, (v as Card | null)?.id ?? null])),
          scores: displayScores,
        }),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch {
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } finally {
      setSaveLoading(false)
    }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundImage: "url('/img/wall.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div style={{
        position: 'relative',
        height: '100dvh',
        maxWidth: 430,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '16px 12px 24px',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}>

        {/* ━━━ ① ヘッダー ━━━ */}
        <header style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => router.push('/')}
            style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'white', fontFamily: ZEN, fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', textShadow: TEXT_SHADOW }}
          >
            <ChevronLeft size={17} />
            戻る
          </motion.button>

          <h1 style={{ fontFamily: ZEN, fontWeight: 900, fontSize: '1rem', color: 'white', margin: 0, textShadow: `0 0 14px rgba(255,120,220,0.9), ${TEXT_SHADOW}` }}>
            デッキ作成
          </h1>

          {/* AI提案ボタン */}
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={handleAI}
            disabled={isAILoading}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '9px 14px',
              borderRadius: 9999,
              background: isAILoading
                ? 'linear-gradient(135deg, #9966cc 0%, #cc6699 100%)'
                : 'linear-gradient(135deg, #ff4da6 0%, #ff9d00 60%, #ffe066 100%)',
              border: '2.5px solid #fef08a',
              color: 'white',
              fontFamily: ZEN, fontWeight: 900, fontSize: '0.88rem', cursor: isAILoading ? 'default' : 'pointer',
              textShadow: TEXT_SHADOW,
              boxShadow: '0 6px 20px rgba(255,140,0,0.6), 0 2px 8px rgba(0,0,0,0.4), inset 0 1.5px 0 rgba(255,255,255,0.45)',
              opacity: isAILoading ? 0.8 : 1,
            }}
          >
            <motion.div
              animate={isAILoading ? { rotate: 360 } : { rotate: 0 }}
              transition={isAILoading ? { duration: 1, repeat: Infinity, ease: 'linear' } : {}}
            >
              <Sparkles size={15} />
            </motion.div>
            {isAILoading ? '提案中…' : 'AI提案'}
          </motion.button>
        </header>

        {/* ━━━ ② デッキスロット (5枠) ━━━ */}
        <div style={{
          flexShrink: 0,
          display: 'flex',
          gap: 6,
          justifyContent: 'center',
          padding: '8px 4px',
          borderRadius: 14,
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.18)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
        }}>
          {CATEGORIES.map(cat => (
            <Slot
              key={cat.key}
              cat={cat}
              card={deck[cat.key]}
              locked={locks[cat.key]}
              isShuffling={isAILoading}
              onTap={() => toggleSlot(cat.key)}
              onRemove={() => removeCard(cat.key)}
              onLock={() => toggleLock(cat.key)}
              onFlip={() => setFlipCard(deck[cat.key])}
            />
          ))}
        </div>

        {/* ━━━ ③ スタイルスコアバッジ ━━━ */}
        <AnimatePresence>
          {displayScores.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ flexShrink: 0, overflow: 'hidden' }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingInline: 2 }}>
                {displayScores.map((score, i) => (
                  <motion.div
                    key={score.label}
                    initial={{ opacity: 0, scale: 0.8, y: 6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      padding: '5px 10px',
                      borderRadius: 9999,
                      background: 'linear-gradient(135deg, rgba(200,40,180,0.5) 0%, rgba(120,20,200,0.5) 100%)',
                      border: '1.5px solid rgba(255,180,255,0.55)',
                      boxShadow: '0 2px 10px rgba(200,40,180,0.35)',
                    }}
                  >
                    <span style={{ fontFamily: ZEN, fontSize: '0.65rem', fontWeight: 900, color: 'white', textShadow: TEXT_SHADOW }}>
                      {score.label}
                    </span>
                    <span style={{ fontFamily: ZEN, fontSize: '0.7rem', fontWeight: 900, color: '#ffd700', textShadow: '0 0 6px rgba(255,215,0,0.7)' }}>
                      {score.pct}%
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ━━━ ④ カテゴリタブ ━━━ */}
        <div style={{ flexShrink: 0, display: 'flex', gap: 5 }}>
          {CATEGORIES.map(cat => {
            const active = activeTab === cat.key
            return (
              <motion.button
                key={cat.key}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(cat.key)}
                style={{
                  flex: 1,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  padding: '8px 2px',
                  borderRadius: 11,
                  border: active ? '2px solid rgba(255,180,255,0.95)' : '2px solid rgba(255,255,255,0.15)',
                  background: active ? 'rgba(255,80,200,0.28)' : 'rgba(255,255,255,0.07)',
                  boxShadow: active ? '0 0 14px rgba(255,100,220,0.7), 0 0 6px rgba(255,215,0,0.4)' : '0 2px 6px rgba(0,0,0,0.25)',
                  transform: active ? 'scale(1.08)' : 'scale(1)',
                  transition: 'all 0.18s ease',
                  cursor: 'pointer',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.mark} alt={cat.label}
                  style={{
                    width: active ? 30 : 24, height: active ? 30 : 24,
                    objectFit: 'contain', transition: 'width 0.18s ease, height 0.18s ease',
                    mixBlendMode: 'multiply',
                    filter: active
                      ? 'drop-shadow(0 0 8px rgba(255,100,220,0.9)) drop-shadow(0 0 3px rgba(255,215,0,0.7))'
                      : 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))',
                    opacity: active ? 1 : 0.85,
                  }}
                />
                <span style={{ fontFamily: ZEN, fontSize: '0.48rem', fontWeight: 900, letterSpacing: '0.04em', color: 'white', textShadow: TEXT_SHADOW }}>
                  {cat.label}
                </span>
              </motion.button>
            )
          })}
        </div>

        {/* ━━━ ⑤ 所持カードリスト ━━━ */}
        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingInline: 2 }}>
            <span style={{ fontFamily: ZEN, fontSize: '0.72rem', fontWeight: 900, color: 'white', textShadow: TEXT_SHADOW }}>
              ✦ 所持カード ({filteredCards.length})
            </span>
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => setShowBinder(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                fontFamily: ZEN, fontSize: '0.68rem', fontWeight: 700, color: '#ffd700',
                padding: '5px 10px', borderRadius: 8,
                border: '2px solid rgba(255,215,0,0.5)', background: 'rgba(255,215,0,0.12)',
                cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                textShadow: '0 1px 3px rgba(0,0,0,0.8)',
              }}
            >
              <BookOpen size={11} />
              全体を見る
            </motion.button>
          </div>

          <div className="overflow-x-auto" style={{ display: 'flex', gap: 8, paddingBottom: 4, paddingInline: 2 }}>
            {filteredCards.map(card => (
              <CardThumb
                key={card.id}
                card={card}
                selected={deck[card.category]?.id === card.id}
                onSelect={() => selectCard(card)}
                size="sm"
              />
            ))}
          </div>
        </div>

        {/* ━━━ ⑥ 保存ボタン ━━━ */}
        <motion.button
          whileTap={{ scale: 0.97, y: 3 }}
          onClick={handleSave}
          disabled={saveLoading}
          style={{
            flexShrink: 0, width: '100%', padding: '14px', borderRadius: 14,
            background: 'linear-gradient(135deg, #ff69b4 0%, #c040e0 100%)',
            border: '2px solid rgba(255,255,255,0.8)', color: 'white',
            fontFamily: ZEN, fontSize: '1rem', fontWeight: 900, cursor: saveLoading ? 'default' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: '0 4px 22px rgba(200,40,160,0.55), 0 2px 8px rgba(0,0,0,0.4)',
            textShadow: TEXT_SHADOW,
            opacity: saveLoading ? 0.75 : 1,
          }}
        >
          <Save size={18} />
          {saveLoading ? '保存中…' : 'デッキを保存する'}
        </motion.button>

      </div>

      {/* ━━━ バインダーモーダル ━━━ */}
      <AnimatePresence>
        {showBinder && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowBinder(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 50 }}
            />
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              style={{
                position: 'fixed', bottom: 0, left: 0, right: 0,
                maxWidth: 430, margin: '0 auto', height: '76dvh',
                borderRadius: '20px 20px 0 0',
                background: 'linear-gradient(180deg, rgba(72,14,110,0.98) 0%, rgba(32,8,72,0.99) 100%)',
                border: '1.5px solid rgba(255,140,255,0.28)',
                zIndex: 51, display: 'flex', flexDirection: 'column', overflow: 'hidden',
              }}
            >
              <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px 8px' }}>
                <h2 style={{ fontFamily: ZEN, fontWeight: 900, fontSize: '0.95rem', color: 'white', margin: 0, textShadow: TEXT_SHADOW }}>
                  📖 カードバインダー
                </h2>
                <button onClick={() => setShowBinder(false)} style={{ color: 'rgba(255,255,255,0.65)', cursor: 'pointer', lineHeight: 0 }}>
                  <X size={21} />
                </button>
              </div>

              <div className="overflow-x-auto" style={{ flexShrink: 0, display: 'flex', gap: 6, padding: '0 16px 10px' }}>
                {CATEGORIES.map(cat => {
                  const active = activeTab === cat.key
                  return (
                    <button
                      key={cat.key}
                      onClick={() => setActiveTab(cat.key)}
                      style={{
                        flexShrink: 0, display: 'flex', alignItems: 'center', gap: 5,
                        padding: '5px 12px', borderRadius: 20,
                        border: active ? '2px solid rgba(255,180,255,0.9)' : '2px solid rgba(255,255,255,0.18)',
                        background: active ? 'rgba(255,80,200,0.28)' : 'rgba(255,255,255,0.05)',
                        color: 'white', fontFamily: ZEN, fontSize: '0.7rem', fontWeight: 900,
                        cursor: 'pointer', textShadow: TEXT_SHADOW,
                        boxShadow: active ? '0 0 10px rgba(255,100,220,0.55)' : 'none',
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={cat.mark} alt={cat.label}
                        style={{ width: 18, height: 18, objectFit: 'contain', mixBlendMode: 'multiply', opacity: active ? 1 : 0.75 }}
                      />
                      {cat.label}
                    </button>
                  )
                })}
              </div>

              <div
                className="overflow-y-auto"
                style={{ flex: 1, padding: '0 12px 16px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, alignContent: 'start' }}
              >
                {filteredCards.map(card => (
                  <CardThumb
                    key={card.id} card={card}
                    selected={deck[card.category]?.id === card.id}
                    onSelect={() => selectCard(card)}
                    size="md"
                  />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ━━━ AI提案完了ダイアログ ━━━ */}
      <AnimatePresence>
        {showAI && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(5px)' }}
          >
            <motion.div
              initial={{ scale: 0.75, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.75, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              style={{ background: 'linear-gradient(135deg, rgba(90,20,160,0.97), rgba(160,20,90,0.97))', borderRadius: 20, padding: '28px 32px', textAlign: 'center', border: '2px solid rgba(255,180,255,0.5)', boxShadow: '0 0 40px rgba(220,40,200,0.45)' }}
            >
              <motion.div animate={{ rotate: [0, 15, -15, 10, -10, 0] }} transition={{ duration: 0.6, delay: 0.1 }} style={{ fontSize: '3rem', marginBottom: 12 }}>
                ✨
              </motion.div>
              <h3 style={{ fontFamily: ZEN, fontWeight: 900, color: 'white', fontSize: '1.05rem', margin: '0 0 8px', textShadow: TEXT_SHADOW }}>
                AIコーデ提案完了！
              </h3>
              <p style={{ fontFamily: ZEN, color: 'rgba(255,255,255,0.85)', fontSize: '0.78rem', margin: 0, textShadow: TEXT_SHADOW }}>
                今日のベストコーデをセットしました 💖
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━ 保存完了トースト ━━━ */}
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}
            style={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center', paddingBottom: 90, zIndex: 60, pointerEvents: 'none' }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'linear-gradient(135deg, #ff69b4, #c040e0)',
              borderRadius: 12, padding: '11px 22px',
              color: 'white', fontFamily: ZEN, fontWeight: 900, fontSize: '0.9rem',
              boxShadow: '0 4px 20px rgba(200,40,160,0.65)',
              border: '2px solid rgba(255,255,255,0.8)', textShadow: TEXT_SHADOW,
            }}>
              <Check size={16} />
              ✦ デッキを保存しました！
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━ カードフリップモーダル ━━━ */}
      <AnimatePresence>
        {flipCard && (
          <FlipModal card={flipCard} onClose={() => setFlipCard(null)} />
        )}
      </AnimatePresence>

    </div>
  )
}
