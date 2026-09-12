'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Sparkles, BookOpen, Save, X, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'

/* ━━━ types ━━━ */
type SlotKey = 'tops' | 'bottoms' | 'shoes' | 'cosme' | 'bag'

interface Card {
  id: string
  category: SlotKey
  name: string
  emoji: string
  color: string
  image: string
}

/* ━━━ mock data (各カテゴリ 2〜3枚) ━━━ */
const MOCK_CARDS: Card[] = [
  { id: 't1', category: 'tops',    name: 'フリルブラウス',     emoji: '🌸', color: '#f9a8d4', image: '/img/dress.png'  },
  { id: 't2', category: 'tops',    name: 'ホログラムトップ',   emoji: '⭐', color: '#c084fc', image: '/img/dress.png'  },
  { id: 't3', category: 'tops',    name: 'ニットベスト',       emoji: '☁️', color: '#93c5fd', image: '/img/dress.png'  },
  { id: 'b1', category: 'bottoms', name: 'バルーンミニ',       emoji: '🎀', color: '#fda4af', image: '/img/dress.png'  },
  { id: 'b2', category: 'bottoms', name: 'プリーツスカート',   emoji: '🌺', color: '#fde68a', image: '/img/dress.png'  },
  { id: 'b3', category: 'bottoms', name: 'デニムミニ',         emoji: '👖', color: '#7dd3fc', image: '/img/dress.png'  },
  { id: 's1', category: 'shoes',   name: 'ローヒールパンプス', emoji: '👠', color: '#fca5a5', image: '/img/shoes.png'  },
  { id: 's2', category: 'shoes',   name: 'プラットフォーム',   emoji: '✨', color: '#a78bfa', image: '/img/shoes.png'  },
  { id: 's3', category: 'shoes',   name: 'グリッターサンダル', emoji: '💫', color: '#6ee7b7', image: '/img/shoes.png'  },
  { id: 'c1', category: 'cosme',   name: 'グロッシーリップ',   emoji: '💋', color: '#fb7185', image: '/img/cosme.png'  },
  { id: 'c2', category: 'cosme',   name: 'パールアイシャドウ', emoji: '🌟', color: '#c7d2fe', image: '/img/cosme.png'  },
  { id: 'g1', category: 'bag',     name: 'ミニチェーンバッグ', emoji: '👜', color: '#d8b4fe', image: '/img/cosme.png'  },
  { id: 'g2', category: 'bag',     name: 'キルティングバッグ', emoji: '🛍️', color: '#fef08a', image: '/img/cosme.png'  },
  { id: 'g3', category: 'bag',     name: 'クリアバッグ',       emoji: '💎', color: '#bae6fd', image: '/img/cosme.png'  },
]

/* ━━━ category config ━━━ */
const CATEGORIES: { key: SlotKey; label: string; emoji: string }[] = [
  { key: 'tops',    label: 'TOPS',  emoji: '👕' },
  { key: 'bottoms', label: 'SKIRT', emoji: '👗' },
  { key: 'shoes',   label: 'SHOES', emoji: '👠' },
  { key: 'cosme',   label: 'COSME', emoji: '💄' },
  { key: 'bag',     label: 'BAG',   emoji: '👜' },
]

const ZEN = 'var(--font-zen-maru-gothic), var(--font-nunito), sans-serif'

/* ━━━ sub-components ━━━ */

/** 縦長スロット 1枠 */
function Slot({ cat, card, onTap }: {
  cat: typeof CATEGORIES[0]
  card: Card | null
  onTap: () => void
}) {
  return (
    <div style={{ flex: 1, maxWidth: 68, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <button
        onClick={onTap}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '2/3',
          borderRadius: 8,
          overflow: 'hidden',
          border: card
            ? '2px solid rgba(255,200,255,0.9)'
            : '2px dashed rgba(255,255,255,0.3)',
          background: card ? card.color : 'rgba(255,255,255,0.06)',
          boxShadow: card ? `0 0 14px ${card.color}99` : 'none',
          cursor: 'pointer',
          transition: 'box-shadow 0.2s',
        }}
      >
        {card ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={card.image} alt={card.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', zIndex: 1 }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/Card_Frame.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'fill', zIndex: 2, pointerEvents: 'none' }} />
            {/* タップで解除インジケーター */}
            <div style={{ position: 'absolute', top: 3, right: 3, zIndex: 4, width: 14, height: 14, borderRadius: '50%', background: 'rgba(255,80,120,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <X size={8} color="white" strokeWidth={3} />
            </div>
          </>
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <span style={{ fontSize: '1.3rem', lineHeight: 1 }}>{cat.emoji}</span>
          </div>
        )}
      </button>
      <span style={{ fontFamily: ZEN, fontSize: '0.5rem', fontWeight: 900, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.06em' }}>
        {cat.label}
      </span>
    </div>
  )
}

/** カードサムネイル（横スクロールリスト・バインダー共用） */
function CardThumb({ card, selected, onSelect, size = 'sm' }: {
  card: Card
  selected: boolean
  onSelect: () => void
  size?: 'sm' | 'md'
}) {
  const w = size === 'sm' ? 68 : '100%'
  const h = size === 'sm' ? 90 : undefined
  return (
    <button
      onClick={onSelect}
      style={{
        position: 'relative',
        flexShrink: 0,
        width: w,
        height: h,
        aspectRatio: size === 'md' ? '2/3' : undefined,
        borderRadius: 8,
        overflow: 'hidden',
        background: card.color,
        border: selected ? '2.5px solid #ffd700' : '2px solid rgba(255,255,255,0.2)',
        boxShadow: selected ? `0 0 14px ${card.color}` : '0 3px 10px rgba(0,0,0,0.35)',
        cursor: 'pointer',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={card.image} alt={card.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', zIndex: 1 }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/img/Card_Frame.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'fill', zIndex: 2, pointerEvents: 'none' }} />
      {selected && (
        <div style={{ position: 'absolute', top: 4, right: 4, zIndex: 4, width: 16, height: 16, borderRadius: '50%', background: '#ffd700', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Check size={9} color="#5030a0" strokeWidth={3} />
        </div>
      )}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '3px 4px', background: 'rgba(0,0,0,0.55)', zIndex: 3 }}>
        <p style={{ fontFamily: ZEN, fontSize: '0.48rem', fontWeight: 900, color: 'white', margin: 0, textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {card.emoji} {card.name}
        </p>
      </div>
    </button>
  )
}

/* ━━━ main component ━━━ */
export default function DeckScreen() {
  const router = useRouter()

  const [deck, setDeck] = useState<Record<SlotKey, Card | null>>({
    tops: null, bottoms: null, shoes: null, cosme: null, bag: null,
  })
  const [activeTab, setActiveTab] = useState<SlotKey>('tops')
  const [showBinder, setShowBinder] = useState(false)
  const [showAI, setShowAI] = useState(false)
  const [saved, setSaved]  = useState(false)

  const filteredCards = MOCK_CARDS.filter(c => c.category === activeTab)

  const selectCard = (card: Card) => {
    setDeck(prev => ({ ...prev, [card.category]: card }))
    setShowBinder(false)
  }

  const toggleSlot = (key: SlotKey) => {
    if (deck[key]) {
      // セット済みならタップで解除
      setDeck(prev => ({ ...prev, [key]: null }))
    } else {
      // 空ならそのカテゴリのタブをアクティブに
      setActiveTab(key)
    }
  }

  const handleAI = () => {
    const aiDeck = {} as Record<SlotKey, Card | null>
    CATEGORIES.forEach(({ key }) => {
      const pool = MOCK_CARDS.filter(c => c.category === key)
      aiDeck[key] = pool[Math.floor(Math.random() * pool.length)]
    })
    setDeck(aiDeck)
    setShowAI(true)
    setTimeout(() => setShowAI(false), 2200)
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2200)
  }

  return (
    /* 背景: wall.jpeg cover */
    <div style={{
      position: 'fixed', inset: 0,
      backgroundImage: "url('/img/wall.jpeg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      {/*
        ┌─────────────────────────────┐  100dvh
        │ [← 戻る] デッキ作成 [AI提案] │  header
        │ [TOPS][SKIRT][SHOES][COSME][BAG] │  slots
        │ [👕TOPS][👗SKIRT]…[👜BAG]    │  category tabs  ┐ flex:1
        │  所持カード       [📖全体]   │  section header  │
        │  ─ card ─ card ─ card ─→    │  h-scroll list   ┘
        │  ████  💾 デッキを保存 ████  │  save btn
        └─────────────────────────────┘
      */}
      <div
        style={{
          position: 'relative',
          height: '100dvh',
          maxWidth: 430,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          padding: '12px',
          boxSizing: 'border-box',
          overflow: 'hidden',
          gap: 10,
        }}
      >

        {/* ━━━ ① ヘッダー ━━━ */}
        <header
          style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => router.push('/')}
            style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'rgba(255,255,255,0.8)', fontFamily: ZEN, fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}
          >
            <ChevronLeft size={17} />
            戻る
          </motion.button>

          <h1 style={{ fontFamily: ZEN, fontWeight: 900, fontSize: '1rem', color: 'white', margin: 0, textShadow: '0 0 14px rgba(255,120,220,0.9)' }}>
            デッキ作成
          </h1>

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleAI}
            style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#ffd700', fontFamily: ZEN, fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', textShadow: '0 0 8px rgba(255,215,0,0.7)' }}
          >
            <Sparkles size={14} />
            AI提案
          </motion.button>
        </header>

        {/* ━━━ ② デッキスロット (5枠 横一列) ━━━ */}
        <div
          style={{
            flexShrink: 0,
            display: 'flex',
            gap: 6,
            justifyContent: 'center',
            padding: '6px 4px',
            borderRadius: 14,
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          {CATEGORIES.map(cat => (
            <Slot
              key={cat.key}
              cat={cat}
              card={deck[cat.key]}
              onTap={() => toggleSlot(cat.key)}
            />
          ))}
        </div>

        {/* ━━━ ③④ カテゴリタブ + カードリスト (flex:1) ━━━ */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            overflow: 'hidden',
          }}
        >
          {/* カテゴリタブ */}
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
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 3,
                    padding: '7px 2px',
                    borderRadius: 11,
                    border: active ? '2px solid rgba(255,180,255,0.95)' : '2px solid rgba(255,255,255,0.12)',
                    background: active ? 'rgba(255,80,200,0.28)' : 'rgba(255,255,255,0.06)',
                    boxShadow: active ? '0 0 12px rgba(255,80,200,0.55)' : 'none',
                    transform: active ? 'scale(1.07)' : 'scale(1)',
                    transition: 'all 0.18s ease',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontSize: active ? '1.35rem' : '1.1rem', lineHeight: 1, transition: 'font-size 0.18s' }}>
                    {cat.emoji}
                  </span>
                  <span style={{
                    fontFamily: ZEN, fontSize: '0.5rem', fontWeight: 900, letterSpacing: '0.04em',
                    color: active ? 'white' : 'rgba(255,255,255,0.5)',
                  }}>
                    {cat.label}
                  </span>
                </motion.button>
              )
            })}
          </div>

          {/* 所持カードリスト */}
          <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>

            {/* セクションヘッダー */}
            <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingInline: 2 }}>
              <span style={{ fontFamily: ZEN, fontSize: '0.7rem', fontWeight: 900, color: 'rgba(255,255,255,0.75)' }}>
                ✦ 所持カード ({filteredCards.length})
              </span>
              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={() => setShowBinder(true)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  fontFamily: ZEN, fontSize: '0.68rem', fontWeight: 700,
                  color: '#ffd700',
                  padding: '4px 10px',
                  borderRadius: 8,
                  border: '1.5px solid rgba(255,215,0,0.4)',
                  background: 'rgba(255,215,0,0.1)',
                  cursor: 'pointer',
                }}
              >
                <BookOpen size={11} />
                📖 全体を見る
              </motion.button>
            </div>

            {/* 横スクロールカードリスト */}
            <div
              className="overflow-x-auto"
              style={{
                flexShrink: 0,
                display: 'flex',
                gap: 8,
                paddingBottom: 6,
                paddingInline: 2,
              }}
            >
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
        </div>

        {/* ━━━ ⑤ 保存ボタン ━━━ */}
        <motion.button
          whileTap={{ scale: 0.97, y: 3 }}
          onClick={handleSave}
          style={{
            flexShrink: 0,
            width: '100%',
            padding: '14px',
            borderRadius: 14,
            background: 'linear-gradient(135deg, #ff69b4 0%, #c040e0 100%)',
            border: '2px solid rgba(255,255,255,0.35)',
            color: 'white',
            fontFamily: ZEN,
            fontSize: '1rem',
            fontWeight: 900,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            boxShadow: '0 4px 22px rgba(200,40,160,0.55)',
          }}
        >
          <Save size={18} />
          💾 デッキを保存する
        </motion.button>

      </div>

      {/* ━━━ バインダーモーダル（スライドアップ） ━━━ */}
      <AnimatePresence>
        {showBinder && (
          <>
            {/* オーバーレイ背景 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBinder(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 50 }}
            />

            {/* モーダルシート */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              style={{
                position: 'fixed',
                bottom: 0, left: 0, right: 0,
                maxWidth: 430,
                margin: '0 auto',
                height: '76dvh',
                borderRadius: '20px 20px 0 0',
                background: 'linear-gradient(180deg, rgba(72,14,110,0.98) 0%, rgba(32,8,72,0.99) 100%)',
                border: '1.5px solid rgba(255,140,255,0.28)',
                zIndex: 51,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {/* モーダルヘッダー */}
              <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px 8px' }}>
                <h2 style={{ fontFamily: ZEN, fontWeight: 900, fontSize: '0.95rem', color: 'white', margin: 0 }}>
                  📖 カードバインダー
                </h2>
                <button onClick={() => setShowBinder(false)} style={{ color: 'rgba(255,255,255,0.65)', cursor: 'pointer', lineHeight: 0 }}>
                  <X size={21} />
                </button>
              </div>

              {/* カテゴリタブ (横スクロール) */}
              <div className="overflow-x-auto" style={{ flexShrink: 0, display: 'flex', gap: 6, padding: '0 16px 10px' }}>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.key}
                    onClick={() => setActiveTab(cat.key)}
                    style={{
                      flexShrink: 0,
                      padding: '5px 12px',
                      borderRadius: 20,
                      border: activeTab === cat.key ? '2px solid rgba(255,180,255,0.9)' : '2px solid rgba(255,255,255,0.18)',
                      background: activeTab === cat.key ? 'rgba(255,80,200,0.28)' : 'rgba(255,255,255,0.05)',
                      color: activeTab === cat.key ? 'white' : 'rgba(255,255,255,0.45)',
                      fontFamily: ZEN,
                      fontSize: '0.7rem',
                      fontWeight: 900,
                      cursor: 'pointer',
                    }}
                  >
                    {cat.emoji} {cat.label}
                  </button>
                ))}
              </div>

              {/* グリッド 3列 */}
              <div
                className="overflow-y-auto"
                style={{
                  flex: 1,
                  padding: '0 12px 16px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 10,
                  alignContent: 'start',
                }}
              >
                {filteredCards.map(card => (
                  <CardThumb
                    key={card.id}
                    card={card}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(5px)' }}
          >
            <motion.div
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.75, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              style={{
                background: 'linear-gradient(135deg, rgba(90,20,160,0.97), rgba(160,20,90,0.97))',
                borderRadius: 20,
                padding: '28px 32px',
                textAlign: 'center',
                border: '2px solid rgba(255,180,255,0.5)',
                boxShadow: '0 0 40px rgba(220,40,200,0.45)',
              }}
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 10, -10, 0] }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{ fontSize: '3rem', marginBottom: 12 }}
              >
                ✨
              </motion.div>
              <h3 style={{ fontFamily: ZEN, fontWeight: 900, color: 'white', fontSize: '1.05rem', margin: '0 0 8px' }}>
                AIコーデ提案完了！
              </h3>
              <p style={{ fontFamily: ZEN, color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem', margin: 0 }}>
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
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            style={{
              position: 'fixed',
              bottom: 0, left: 0, right: 0,
              display: 'flex',
              justifyContent: 'center',
              paddingBottom: 90,
              zIndex: 60,
              pointerEvents: 'none',
            }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'linear-gradient(135deg, #ff69b4, #c040e0)',
              borderRadius: 12,
              padding: '11px 22px',
              color: 'white',
              fontFamily: ZEN,
              fontWeight: 900,
              fontSize: '0.9rem',
              boxShadow: '0 4px 20px rgba(200,40,160,0.65)',
            }}>
              <Check size={16} />
              デッキを保存しました！
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
