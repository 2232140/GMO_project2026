'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useAnimate } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Camera, Upload, Link2, X, Check, ChevronLeft, Loader2 } from 'lucide-react'
import { saveStoredCard, compressImageToDataUrl } from '@/lib/cardStore'

const ZEN = 'var(--font-zen-maru-gothic), var(--font-nunito), sans-serif'
const FREDOKA = 'var(--font-fredoka), sans-serif'

/* ─────────── constants ─────────── */
const THEMES = [
  { id: 'yumekawa', label: 'ゆめかわ',   cardBg: 'linear-gradient(135deg,#ffe4f8,#ffbce8,#ffa0de)', border: '#ff60c0', hex: '#ffa0de', glow: 'rgba(255,80,190,0.55)', btnBg: 'linear-gradient(180deg,#ffe0f5,#ff80c8 45%,#d03090 85%,#a01060 100%)', btnShadow: '#801050' },
  { id: 'gyaru',    label: 'ギャル',      cardBg: 'linear-gradient(135deg,#fff8c0,#ffe060,#ffc020)', border: '#e0a000', hex: '#ffc020', glow: 'rgba(255,190,0,0.55)',  btnBg: 'linear-gradient(180deg,#fff8d0,#ffd040 45%,#c08000 85%,#906000 100%)', btnShadow: '#705000' },
  { id: 'chic',     label: 'シック',      cardBg: 'linear-gradient(135deg,#d8e0ff,#b8c8f0,#9ab0e0)', border: '#6080e0', hex: '#9ab0e0', glow: 'rgba(100,120,220,0.48)', btnBg: 'linear-gradient(180deg,#e0e8ff,#8090e0 45%,#4060b0 85%,#2040a0 100%)', btnShadow: '#203090' },
  { id: 'custom',   label: '✨ カスタム', cardBg: 'linear-gradient(135deg,#1a0035,#300060,#1a0035)', border: '#c060ff', hex: '#c060ff', glow: 'rgba(180,80,255,0.6)',  btnBg: 'linear-gradient(90deg,#ff1493 0%,#d040e0 33%,#7040ff 66%,#ff1493 100%)', btnShadow: '#600090' },
]

const CATS = [
  { key: 'tops',    label: 'TOPS', grad: 'linear-gradient(180deg,#ffd0d8,#ff5878 40%,#d01838 80%,#980030 100%)', shadow: 'rgba(210,20,50,0.55)'   },
  { key: 'bottoms', label: 'BTMS', grad: 'linear-gradient(180deg,#d0d8ff,#6080f0 40%,#3050c0 80%,#1030a0 100%)', shadow: 'rgba(50,80,200,0.55)'   },
  { key: 'shoes',   label: 'SHOE', grad: 'linear-gradient(180deg,#d0ffd8,#40c860 40%,#209040 80%,#106020 100%)', shadow: 'rgba(20,140,60,0.55)'   },
  { key: 'cosme',   label: 'CSME', grad: 'linear-gradient(180deg,#ffd0f8,#e060c8 40%,#b020a0 80%,#800080 100%)', shadow: 'rgba(180,20,160,0.55)'  },
  { key: 'bag',     label: 'BAG',  grad: 'linear-gradient(180deg,#fff0d0,#f0b040 40%,#c07010 80%,#904000 100%)', shadow: 'rgba(180,100,0,0.55)'   },
]

const ALL_TAGS = ['#Y2K', '#ギャル', '#PINK', '#フリル', '#量産型', '#清楚系', '#ラベンダー', '#ホワイト', '#オルチャン', '#盛り', '#ゆめかわ', '#V系', '#ホロ', '#パール']

const CORNER_DEFS: [boolean, boolean][] = [[true, true], [true, false], [false, true], [false, false]]

/* Sparkle burst particles for issuance */
const BURST_SPARKS = [
  { sym: '✨', dx: 148, dy: -68,  sz: 32, d: 0.00 },
  { sym: '💗', dx: -128, dy: -118, sz: 28, d: 0.04 },
  { sym: '⭐', dx: 106, dy: 122,  sz: 24, d: 0.06 },
  { sym: '💫', dx: -22,  dy: 162,  sz: 26, d: 0.08 },
  { sym: '✦',  dx: -152, dy: 88,  sz: 22, d: 0.10 },
  { sym: '★',  dx: -148, dy: -38,  sz: 24, d: 0.12 },
  { sym: '💕', dx: 36,   dy: -168, sz: 28, d: 0.05 },
  { sym: '✨', dx: 152,  dy: -94,  sz: 20, d: 0.02 },
  { sym: '💎', dx: -68,  dy: 162,  sz: 26, d: 0.09 },
  { sym: '⭐', dx: -162, dy: 58,   sz: 22, d: 0.11 },
  { sym: '💫', dx: 88,   dy: 138,  sz: 24, d: 0.14 },
  { sym: '💗', dx: 62,   dy: -158, sz: 28, d: 0.07 },
  { sym: '✨', dx: -82,  dy: -152, sz: 20, d: 0.03 },
  { sym: '💫', dx: 162,  dy: 28,   sz: 22, d: 0.13 },
  { sym: '✦',  dx: -152, dy: -88,  sz: 20, d: 0.01 },
  { sym: '💕', dx: 78,   dy: -148, sz: 24, d: 0.15 },
  { sym: '⭐', dx: -42,  dy: -172, sz: 22, d: 0.16 },
  { sym: '✨', dx: 172,  dy: -48,  sz: 30, d: 0.17 },
]

/* Rain particles for idle state */
const RAIN_SPARKS = ['✨','💗','⭐','💕','✦','💫','⭐','✨','💎','💗'] as const

/* ─────────── shared styles ─────────── */
const INPUT: React.CSSProperties = {
  width: '100%', padding: '10px 14px', boxSizing: 'border-box',
  background: 'rgba(10,0,30,0.65)', border: '2px solid #ff69b4',
  borderRadius: 14, outline: 'none', fontFamily: ZEN, fontSize: '0.82rem', color: 'white',
  boxShadow: '0 0 12px rgba(255,100,200,0.35),inset 0 1px 0 rgba(255,255,255,0.1),0 3px 0 #88004a',
}
const LBL: React.CSSProperties = { margin: '0 0 5px', fontFamily: ZEN, fontSize: '0.72rem', fontWeight: 900, color: 'rgba(255,180,230,0.85)' }

/* ─────────── IssuanceOverlay ─────────── */
type IssuanceProps = {
  processedImage: string | null
  cardName: string
  brand: string
  colorName: string
  theme: typeof THEMES[0]
  category: string
  selectedTags: string[]
  onClose: () => void
  onSave: () => void
}

function IssuanceOverlay({ processedImage, cardName, brand, colorName, theme, category, selectedTags, onClose, onSave }: IssuanceProps) {
  const router = useRouter()
  const [settled, setSettled] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [cardScope, animateCard] = useAnimate()
  const didSettle = useRef(false)

  const handleSettle = useCallback(() => {
    if (didSettle.current) return
    didSettle.current = true
    animateCard(cardScope.current, { scale: [1, 1.08, 0.97, 1] }, { duration: 0.35, ease: 'easeOut' }).then(() => {
      setSettled(true)
    })
  }, [animateCard, cardScope])

  const handleSave = async () => {
    if (saved || saving) return
    setSaving(true)
    try {
      const imgSrc = processedImage ?? '/img/dress.png'
      const compressed = await compressImageToDataUrl(imgSrc)
      saveStoredCard({
        id: `user_${Date.now()}`,
        category,
        name: cardName || 'MY ITEM',
        image: compressed,
        color: theme.hex,
        brand: brand || '自作',
        colorName,
        rarity: 'SR ★★★★',
        tags: selectedTags,
        createdAt: new Date().toISOString(),
      })
      setSaved(true)
      onSave()
      setTimeout(() => router.push('/binder'), 1200)
    } finally {
      setSaving(false)
    }
  }

  return (
    <motion.div
      key="issue-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'absolute', inset: 0, zIndex: 80,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        background: 'radial-gradient(ellipse at 50% 40%, rgba(180,0,150,0.95) 0%, rgba(75,0,180,0.97) 45%, rgba(5,0,20,0.99) 100%)',
        overflowY: 'auto', padding: '20px 16px 32px', boxSizing: 'border-box',
      }}
    >
      {/* ambient star field */}
      {[...Array(24)].map((_, i) => (
        <div key={`star-${i}`} style={{
          position: 'absolute',
          top: `${(i * 41 + 7) % 100}%`,
          left: `${(i * 67 + 13) % 100}%`,
          width: i % 4 === 0 ? 3 : 2, height: i % 4 === 0 ? 3 : 2,
          borderRadius: '50%',
          background: `rgba(255,255,255,${0.15 + (i % 5) * 0.1})`,
          pointerEvents: 'none',
        }} />
      ))}

      {/* Close button (top-right, appears after settle) */}
      <AnimatePresence>
        {settled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3 }}
            onClick={onClose}
            style={{
              position: 'absolute', top: 16, right: 16, zIndex: 90,
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              border: '2px solid rgba(255,255,255,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={16} color="white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Spin-in card */}
      <div style={{ perspective: 900, position: 'relative', flexShrink: 0 }}>
        {/* Glow beam behind card */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 240, height: 360,
          background: `radial-gradient(ellipse, ${theme.glow} 0%, transparent 70%)`,
          pointerEvents: 'none', zIndex: 0,
        }} />

        <motion.div
          ref={cardScope}
          initial={{ scale: 0.04, rotateY: 1080, rotateZ: 22, opacity: 0 }}
          animate={{ scale: 1, rotateY: 0, rotateZ: 0, opacity: 1 }}
          transition={{
            scale:   { type: 'spring', stiffness: 48, damping: 13, delay: 0.15 },
            rotateY: { duration: 1.5, ease: [0.15, 0.0, 0.2, 1.0], delay: 0.15 },
            rotateZ: { duration: 1.5, ease: [0.15, 0.0, 0.2, 1.0], delay: 0.15 },
            opacity: { duration: 0.2, delay: 0.15 },
          }}
          onAnimationComplete={handleSettle}
          style={{ position: 'relative', zIndex: 1 }}
        >
          {/* Floating idle animation (after settle) */}
          <motion.div
            animate={settled ? { y: [0, -10, 0], rotateY: [0, 6, -6, 0] } : {}}
            transition={settled ? { y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }, rotateY: { duration: 4, repeat: Infinity, ease: 'easeInOut' } } : {}}
          >
            <div style={{
              width: 200, aspectRatio: '2/3', borderRadius: 18,
              background: 'white',
              boxShadow: `0 0 48px ${theme.glow}, 0 24px 64px rgba(0,0,0,0.8), inset 0 1.5px 0 rgba(255,255,255,0.22)`,
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Item image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={processedImage ?? '/img/dress.png'}
                alt={cardName}
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              />
              {/* Card frame overlay */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/Card_Frame2.png" alt="" style={{ position: 'absolute', top: '-5%', left: '-5%', width: '110%', height: '110%', objectFit: 'fill', pointerEvents: 'none' }} />

              {/* SR badge */}
              <div style={{ position: 'absolute', top: 8, right: 8, background: 'linear-gradient(135deg,#ffd700,#ff8c00)', borderRadius: 20, padding: '2px 8px', boxShadow: '0 0 8px rgba(255,215,0,0.7)' }}>
                <span style={{ fontFamily: FREDOKA, fontSize: '0.58rem', fontWeight: 700, color: '#3a1800' }}>SR ✦</span>
              </div>

              {/* AI CUT badge (if bg removed) */}
              {processedImage && (
                <div style={{ position: 'absolute', top: 8, left: 8, background: 'linear-gradient(135deg,#ff1493,#c040e0)', borderRadius: 20, padding: '2px 8px' }}>
                  <span style={{ fontFamily: FREDOKA, fontSize: '0.52rem', fontWeight: 700, color: 'white' }}>AI ✂</span>
                </div>
              )}

              {/* Name overlay */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.82))', padding: '24px 8px 10px' }}>
                <p style={{ margin: 0, fontFamily: ZEN, fontSize: '0.72rem', fontWeight: 900, color: 'white', textAlign: 'center', textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>
                  {cardName || 'MY ITEM'}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Sparkle burst (after settle) */}
      <AnimatePresence>
        {settled && BURST_SPARKS.map((s, i) => (
          <motion.div key={`sp-${i}`}
            initial={{ opacity: 1, x: 0, y: 0, scale: 1.2 }}
            animate={{ opacity: 0, x: s.dx, y: s.dy, scale: 0 }}
            transition={{ duration: 0.9, delay: s.d, ease: 'easeOut' }}
            style={{ position: 'absolute', fontSize: s.sz, userSelect: 'none', pointerEvents: 'none', zIndex: 2 }}
          >{s.sym}</motion.div>
        ))}
      </AnimatePresence>

      {/* Rain sparks idle animation */}
      {settled && RAIN_SPARKS.map((sym, i) => (
        <motion.div key={`rain-${i}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: [0, 0.8, 0], y: ['−5%', '105%'] }}
          transition={{ duration: 2.5 + i * 0.4, delay: 1.2 + i * 0.3, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: 0,
            left: `${(i * 11 + 5) % 100}%`,
            fontSize: 14 + (i % 3) * 4,
            pointerEvents: 'none', userSelect: 'none', zIndex: 1,
          }}
        >{sym}</motion.div>
      ))}

      {/* Success text + info + buttons */}
      <AnimatePresence>
        {settled && (
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 180 }}
            style={{ marginTop: 20, textAlign: 'center', width: '100%', maxWidth: 340, flexShrink: 0 }}
          >
            <motion.p
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ delay: 0.7, duration: 0.4 }}
              style={{
                fontFamily: FREDOKA, fontSize: '1.6rem', fontWeight: 700,
                color: 'white', margin: '0 0 4px',
                textShadow: '0 0 28px rgba(255,150,220,1), 0 0 12px rgba(255,20,147,0.9)',
              }}
            >
              💗 カード発行完了！
            </motion.p>

            {/* Card info */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, marginBottom: 8 }}>
              {brand && (
                <p style={{ fontFamily: ZEN, fontSize: '0.72rem', color: 'rgba(255,200,240,0.8)', margin: 0 }}>
                  {brand}
                </p>
              )}
              {colorName && (
                <p style={{ fontFamily: ZEN, fontSize: '0.68rem', color: 'rgba(255,180,220,0.65)', margin: 0 }}>
                  {colorName}
                </p>
              )}
              {selectedTags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center', marginTop: 4 }}>
                  {selectedTags.map(tag => (
                    <span key={tag} style={{
                      fontFamily: ZEN, fontSize: '0.58rem', fontWeight: 700,
                      padding: '2px 7px', borderRadius: 20,
                      background: 'rgba(255,20,147,0.35)',
                      border: '1px solid rgba(255,100,180,0.5)',
                      color: 'rgba(255,200,230,0.9)',
                    }}>{tag}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, padding: '0 4px' }}>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                disabled={saved || saving}
                style={{
                  width: '100%', padding: '14px', borderRadius: 16, border: 'none',
                  cursor: saved || saving ? 'default' : 'pointer',
                  fontFamily: ZEN, fontSize: '1rem', fontWeight: 900, color: 'white',
                  background: saved
                    ? 'linear-gradient(135deg,#4ca,#2a8)'
                    : saving
                      ? 'linear-gradient(135deg,#9966cc,#cc6699)'
                      : 'linear-gradient(180deg,#ff8fd8,#ff1493 50%,#b8004a 100%)',
                  boxShadow: saved
                    ? '0 0 20px rgba(0,200,120,0.5),0 4px 0 #006040'
                    : '0 0 32px rgba(255,20,147,0.8),0 4px 0 #6a0030',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                  opacity: saving ? 0.8 : 1,
                }}
              >
                {saved
                  ? <><Check size={18} />バインダーに保存済み！</>
                  : saving
                    ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />保存中…</>
                    : <>✨ バインダーに保存する</>
                }
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                style={{
                  width: '100%', padding: '12px', borderRadius: 14,
                  background: 'rgba(255,255,255,0.1)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  fontFamily: ZEN, fontSize: '0.88rem', fontWeight: 900, color: 'rgba(255,220,240,0.9)',
                  cursor: 'pointer', textShadow: '0 1px 3px rgba(0,0,0,0.6)',
                }}
              >
                もう一枚つくる
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─────────── ProcessingOverlay ─────────── */
/* Uses CSS animations only — compositor-driven, not blocked by WASM main-thread load */
function ProcessingOverlay() {
  return (
    <motion.div
      key="processing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'absolute', inset: 0, zIndex: 70,
        background: 'radial-gradient(ellipse at 50% 46%, rgba(140,0,120,0.97) 0%, rgba(60,0,160,0.98) 50%, rgba(5,0,20,0.99) 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28,
      }}
    >
      {/* Double-ring CSS spinner — never freezes */}
      <div style={{ position: 'relative', width: 100, height: 100, flexShrink: 0 }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: '4px solid rgba(255,100,200,0.15)',
          borderTopColor: '#ff1493',
          borderRightColor: 'rgba(255,80,180,0.45)',
          animation: 'spin 1.3s linear infinite',
        }} />
        <div style={{
          position: 'absolute', inset: 12, borderRadius: '50%',
          border: '3px solid rgba(180,80,255,0.15)',
          borderBottomColor: '#c040e0',
          borderLeftColor: 'rgba(160,60,240,0.45)',
          animation: 'spinReverse 0.9s linear infinite',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 30,
        }}>✂️</div>
      </div>

      {/* Pulsing card silhouette (CSS) */}
      <div style={{
        width: 68, aspectRatio: '2/3', borderRadius: 10,
        background: 'linear-gradient(135deg, rgba(255,80,200,0.22), rgba(120,40,220,0.22))',
        border: '1.5px solid rgba(255,150,220,0.38)',
        animation: 'processPulse 2.4s ease-in-out infinite',
        flexShrink: 0,
      }} />

      {/* Static text */}
      <div style={{ textAlign: 'center', padding: '0 36px' }}>
        <p style={{
          fontFamily: FREDOKA, fontSize: '1.1rem', fontWeight: 700,
          color: '#ff8fd8', margin: '0 0 10px',
          textShadow: '0 0 16px rgba(255,100,200,0.9)',
        }}>
          ✨ AIが魔法をかけ中
        </p>
        <p style={{
          fontFamily: ZEN, fontSize: '0.72rem',
          color: 'rgba(255,180,230,0.65)', margin: 0, lineHeight: 1.75,
        }}>
          背景を自動で切り抜いています<br />
          <span style={{ fontSize: '0.6rem', color: 'rgba(255,150,210,0.45)' }}>
            初回はモデル読み込みで少し時間がかかります
          </span>
        </p>
      </div>

      {/* Bouncing dots (CSS) */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexShrink: 0 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 9, height: 9, borderRadius: '50%',
            background: 'linear-gradient(135deg,#ff69b4,#c040e0)',
            animation: `processDot 1.4s ease-in-out ${i * 0.23}s infinite`,
          }} />
        ))}
      </div>
    </motion.div>
  )
}

/* ─────────── main ─────────── */
export default function CreatePage() {
  const router = useRouter()

  /* step state */
  const [step, setStep] = useState<1 | 2>(1)
  const [flash, setFlash] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showIssue, setShowIssue] = useState(false)

  /* image state */
  const [sourceImage, setSourceImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [urlInput, setUrlInput] = useState('')
  const [isFetchingUrl, setIsFetchingUrl] = useState(false)
  const [bgRemovedOk, setBgRemovedOk] = useState(false)

  /* card metadata */
  const [cardName, setCardName] = useState('')
  const [brand, setBrand] = useState('')
  const [colorName, setColorName] = useState('')
  const [category, setCategory] = useState('tops')
  const [theme, setTheme] = useState('yumekawa')
  const [customThemeText, setCustomThemeText] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  /* refs */
  const cameraRef = useRef<HTMLInputElement>(null)
  const uploadRef  = useRef<HTMLInputElement>(null)

  const currentTheme = THEMES.find(t => t.id === theme) ?? THEMES[0]

  /* ── handlers ── */
  const handleImageFile = useCallback((file: File) => {
    const reader = new FileReader()
    reader.onload = e => {
      setSourceImage(e.target?.result as string)
      setProcessedImage(null)
      setBgRemovedOk(false)
    }
    reader.readAsDataURL(file)
  }, [])

  const handleCamera = () => {
    setFlash(true)
    setTimeout(() => setFlash(false), 200)
    cameraRef.current?.click()
  }

  const handleFetchUrl = async () => {
    const trimmed = urlInput.trim()
    if (!trimmed) return
    setIsFetchingUrl(true)
    try {
      const res = await fetch(`/api/fetch-image?url=${encodeURIComponent(trimmed)}`)
      if (!res.ok) throw new Error('Fetch failed')
      const blob = await res.blob()
      const reader = new FileReader()
      reader.onload = e => {
        setSourceImage(e.target?.result as string)
        setProcessedImage(null)
        setBgRemovedOk(false)
      }
      reader.readAsDataURL(blob)
    } catch {
      alert('画像の取得に失敗しました。URLを確認してください。')
    } finally {
      setIsFetchingUrl(false)
    }
  }

  const handleProcess = async () => {
    if (!sourceImage) return
    setIsProcessing(true)
    try {
      // TODO: Replace with server-side remove.bg or Replicate API for better quality
      // const res = await fetch('/api/remove-bg', { method: 'POST', body: formData })
      const { removeBackground } = await import('@imgly/background-removal')
      const srcRes = await fetch(sourceImage)
      const blob = await srcRes.blob()
      const result = await removeBackground(blob)
      const url = URL.createObjectURL(result)
      setProcessedImage(url)
      setBgRemovedOk(true)
    } catch {
      // Fallback: use original image without bg removal
      setProcessedImage(sourceImage)
      setBgRemovedOk(false)
    } finally {
      setIsProcessing(false)
      setStep(2)
    }
  }

  const handleIssue = () => setShowIssue(true)

  const handleIssueClose = () => {
    setShowIssue(false)
    // reset form
    setStep(1)
    setSourceImage(null)
    setProcessedImage(null)
    setBgRemovedOk(false)
    setCardName('')
    setBrand('')
    setColorName('')
    setCategory('tops')
    setTheme('yumekawa')
    setCustomThemeText('')
    setSelectedTags([])
  }

  const toggleTag = (tag: string) =>
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])

  /* card preview image = processedImage ?? sourceImage ?? placeholder */
  const cardImg = processedImage ?? sourceImage ?? '/img/dress.png'

  return (
    <div style={{ position: 'fixed', inset: 0 }}>

      {/* Flash */}
      <AnimatePresence>
        {flash && (
          <motion.div key="flash"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.22 } }}
            transition={{ duration: 0.07 }}
            style={{ position: 'absolute', inset: 0, background: 'white', zIndex: 200, pointerEvents: 'none' }}
          />
        )}
      </AnimatePresence>

      {/* Hidden file inputs */}
      <input ref={cameraRef} type="file" accept="image/*" capture="environment"
        style={{ display: 'none' }}
        onChange={e => { if (e.target.files?.[0]) handleImageFile(e.target.files[0]) }}
      />
      <input ref={uploadRef} type="file" accept="image/*"
        style={{ display: 'none' }}
        onChange={e => { if (e.target.files?.[0]) handleImageFile(e.target.files[0]) }}
      />

      {/* ═══ Inner container ═══ */}
      <div style={{
        position: 'relative', height: '100dvh', maxWidth: 430, margin: '0 auto',
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        background: 'linear-gradient(180deg,#0a0018 0%,#120028 60%,#0a0018 100%)',
      }}>

        {/* Processing overlay */}
        <AnimatePresence>{isProcessing && <ProcessingOverlay />}</AnimatePresence>

        {/* Issuance overlay */}
        <AnimatePresence>
          {showIssue && (
            <IssuanceOverlay
              processedImage={processedImage}
              cardName={cardName}
              brand={brand}
              colorName={colorName}
              theme={currentTheme}
              category={category}
              selectedTags={selectedTags}
              onClose={handleIssueClose}
              onSave={() => {/* localStorage / DB save would go here */}}
            />
          )}
        </AnimatePresence>

        {/* Header */}
        {!showIssue && !isProcessing && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px 0', flexShrink: 0 }}>
            <motion.button whileTap={{ scale: 0.93 }}
              onClick={() => step === 1 ? router.push('/') : setStep(1)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', gap: 4 }}
            >
              <ChevronLeft size={16} color="rgba(255,180,220,0.7)" />
              <span style={{ fontFamily: ZEN, fontSize: '0.8rem', color: 'rgba(255,180,220,0.7)', fontWeight: 700 }}>戻る</span>
            </motion.button>

            {/* Step dots */}
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {[1, 2].map(s => (
                <div key={s} style={{
                  width: s === step ? 24 : 8, height: 8, borderRadius: 4, transition: 'all 0.3s',
                  background: s === step ? '#ff1493' : 'rgba(255,100,180,0.25)',
                  boxShadow: s === step ? '0 0 8px rgba(255,20,147,0.8)' : 'none',
                }} />
              ))}
            </div>
            <div style={{ width: 56 }} />
          </div>
        )}

        <AnimatePresence mode="wait">

          {/* ══ STEP 1: 撮影・選択 ══ */}
          {step === 1 && !isProcessing && (
            <motion.div key="s1"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -40 }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 20px 16px', gap: 10, overflow: 'hidden' }}
            >
              <p style={{
                fontFamily: FREDOKA, fontSize: 'clamp(0.9rem,5vw,1.2rem)', fontWeight: 700,
                margin: 0, color: '#ff1493', letterSpacing: 2,
                textShadow: '0 0 16px rgba(255,20,147,0.95),0 0 32px rgba(255,20,147,0.55)',
              }}>
                ✨ NEW CARD CREATOR
              </p>

              {/* Image preview / camera viewfinder */}
              <div style={{
                position: 'relative', width: '78%', aspectRatio: '3/4', flexShrink: 0,
                background: '#050010', borderRadius: 18, overflow: 'hidden',
                border: '2px solid rgba(255,215,0,0.6)',
                boxShadow: '0 0 24px rgba(255,100,180,0.3)',
              }}>
                {sourceImage ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={sourceImage} alt="selected" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                ) : (
                  /* Viewfinder placeholder — 平成デコガラケー液晶風 */
                  <>
                    {/* ドット感のある液晶背景 */}
                    <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(160deg,#1e003a 0%,#140028 55%,#1a0032 100%)' }} />
                    <div style={{
                      position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
                      backgroundImage: 'radial-gradient(circle,rgba(255,170,255,0.25) 1px,transparent 1px)',
                      backgroundSize: '10px 10px',
                    }} />
                    {/* ラメきらきら装飾 */}
                    {[
                      { top: '11%', left: '13%' }, { top: '17%', left: '83%' },
                      { top: '66%', left: '9%'  }, { top: '70%', left: '87%' },
                      { top: '38%', left: '5%'  }, { top: '43%', left: '93%' },
                      { top: '28%', left: '50%' }, { top: '55%', left: '50%' },
                    ].map((pos, i) => (
                      <div key={i} style={{
                        position: 'absolute', zIndex: 3, pointerEvents: 'none',
                        top: pos.top, left: pos.left,
                        color: `rgba(255,200,255,${0.45 + (i % 3) * 0.12})`,
                        fontSize: i % 2 === 0 ? '0.55rem' : '0.42rem',
                        textShadow: '0 0 5px rgba(255,150,255,0.75)',
                      }}>✦</div>
                    ))}
                    {/* 中央：ぷっくりハート宝石アイコン + ドット絵テキスト */}
                    <div style={{
                      position: 'absolute', top: '22%', left: '50%',
                      zIndex: 4, textAlign: 'center',
                      animation: 'floatBob 2.8s ease-in-out infinite',
                    }}>
                      <div style={{
                        fontSize: '3.4rem', lineHeight: 1,
                        filter: 'drop-shadow(0 0 12px rgba(255,80,200,0.95)) drop-shadow(0 0 6px rgba(255,20,147,1))',
                      }}>
                        💗
                      </div>
                      <p style={{
                        fontFamily: FREDOKA, fontSize: '0.62rem', fontWeight: 700,
                        color: 'rgba(255,205,255,0.95)', letterSpacing: '0.12em',
                        margin: '7px 0 0',
                        textShadow: '0 0 10px rgba(255,100,230,1), 0 0 4px rgba(255,50,180,0.9)',
                      }}>✨ PHO-TO READY ✨</p>
                    </div>
                    {/* 下部バルーン吹き出し */}
                    <div style={{
                      position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
                      zIndex: 5, whiteSpace: 'nowrap',
                    }}>
                      <div style={{
                        background: 'rgba(255,234,250,0.97)',
                        border: '2px solid rgba(255,110,215,0.9)',
                        borderRadius: 22, padding: '5px 14px',
                        position: 'relative',
                        boxShadow: '0 3px 12px rgba(255,60,200,0.38),inset 0 1px 0 rgba(255,255,255,0.9)',
                      }}>
                        <p style={{ fontFamily: ZEN, fontSize: '0.6rem', fontWeight: 900, color: '#c01090', margin: 0 }}>
                          ここに服やコスメをかざしてね！
                        </p>
                        <div style={{
                          position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%)',
                          width: 0, height: 0,
                          borderLeft: '6px solid transparent', borderRight: '6px solid transparent',
                          borderTop: '8px solid rgba(255,110,215,0.9)',
                        }} />
                      </div>
                    </div>
                    {/* コーナーブラケット */}
                    {CORNER_DEFS.map(([isTop, isLeft], ci) => (
                      <div key={ci} style={{ position: 'absolute', zIndex: 4, top: isTop ? 8 : 'auto', bottom: isTop ? 'auto' : 8, left: isLeft ? 8 : 'auto', right: isLeft ? 'auto' : 8, width: 22, height: 22 }}>
                        <div style={{ position: 'absolute', inset: 0, borderTop: isTop ? '2.5px solid rgba(255,170,235,0.85)' : 'none', borderBottom: isTop ? 'none' : '2.5px solid rgba(255,170,235,0.85)', borderLeft: isLeft ? '2.5px solid rgba(255,170,235,0.85)' : 'none', borderRight: isLeft ? 'none' : '2.5px solid rgba(255,170,235,0.85)', borderTopLeftRadius: isTop && isLeft ? 5 : 0, borderTopRightRadius: isTop && !isLeft ? 5 : 0, borderBottomLeftRadius: !isTop && isLeft ? 5 : 0, borderBottomRightRadius: !isTop && !isLeft ? 5 : 0 }} />
                      </div>
                    ))}
                  </>
                )}

                {/* "Selected" check */}
                {sourceImage && (
                  <div style={{ position: 'absolute', top: 8, right: 8, width: 24, height: 24, borderRadius: '50%', background: '#ff1493', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                    <Check size={13} color="white" strokeWidth={3} />
                  </div>
                )}
              </div>

              {/* 3 input buttons row */}
              <div style={{ display: 'flex', gap: 7, width: '100%', flexShrink: 0 }}>
                <motion.button whileTap={{ scale: 0.92, y: 2 }} onClick={handleCamera}
                  style={{
                    flex: 1, padding: '10px 4px', borderRadius: 12, cursor: 'pointer', border: 'none',
                    background: 'linear-gradient(180deg,#ff80c8,#ff1493 50%,#880040 100%)',
                    boxShadow: '0 0 14px rgba(255,20,147,0.5),inset 0 2px 4px rgba(255,255,255,0.3),0 3px 0 #55002a',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                    fontFamily: ZEN, fontWeight: 900, color: 'white', fontSize: '0.7rem',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                  }}
                >
                  <Camera size={18} />
                  カメラ
                </motion.button>
                <motion.button whileTap={{ scale: 0.92, y: 2 }} onClick={() => uploadRef.current?.click()}
                  style={{
                    flex: 1, padding: '10px 4px', borderRadius: 12, cursor: 'pointer', border: 'none',
                    background: 'linear-gradient(180deg,#b080ff,#7040d0 50%,#400090 100%)',
                    boxShadow: '0 0 14px rgba(120,40,220,0.5),inset 0 2px 4px rgba(255,255,255,0.25),0 3px 0 #280060',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                    fontFamily: ZEN, fontWeight: 900, color: 'white', fontSize: '0.7rem',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                  }}
                >
                  <Upload size={18} />
                  アップ
                </motion.button>
                <motion.button whileTap={{ scale: 0.92, y: 2 }} onClick={() => document.getElementById('url-input')?.focus()}
                  style={{
                    flex: 1, padding: '10px 4px', borderRadius: 12, cursor: 'pointer', border: 'none',
                    background: 'linear-gradient(180deg,#60d0ff,#0090e0 50%,#003090 100%)',
                    boxShadow: '0 0 14px rgba(0,140,255,0.45),inset 0 2px 4px rgba(255,255,255,0.25),0 3px 0 #001870',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                    fontFamily: ZEN, fontWeight: 900, color: 'white', fontSize: '0.7rem',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                  }}
                >
                  <Link2 size={18} />
                  URL
                </motion.button>
              </div>

              {/* URL input */}
              <div style={{ width: '100%', flexShrink: 0, display: 'flex', gap: 7, alignItems: 'center' }}>
                <input
                  id="url-input"
                  type="url"
                  value={urlInput}
                  onChange={e => setUrlInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleFetchUrl() }}
                  placeholder="商品ページの画像URLをペースト..."
                  style={{ ...INPUT, flex: 1, borderColor: '#4080ff', boxShadow: '0 0 10px rgba(60,120,255,0.3),0 3px 0 #001870' }}
                />
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={handleFetchUrl}
                  disabled={!urlInput.trim() || isFetchingUrl}
                  style={{
                    flexShrink: 0, width: 48, height: 48, borderRadius: 12,
                    background: 'linear-gradient(180deg,#60d0ff,#0090e0 60%,#003090 100%)',
                    border: 'none', cursor: urlInput.trim() ? 'pointer' : 'default',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 3px 0 #001870',
                    opacity: urlInput.trim() && !isFetchingUrl ? 1 : 0.5,
                  }}
                >
                  {isFetchingUrl
                    ? <Loader2 size={18} color="white" style={{ animation: 'spin 1s linear infinite' }} />
                    : <Link2 size={18} color="white" />
                  }
                </motion.button>
              </div>

              {/* Proceed button */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={sourceImage ? handleProcess : handleCamera}
                style={{
                  flexShrink: 0, width: '100%', padding: '15px',
                  borderRadius: 16, cursor: 'pointer',
                  fontFamily: ZEN, fontSize: '1rem', fontWeight: 900, color: 'white',
                  background: sourceImage
                    ? 'linear-gradient(90deg,#ff4da6 0%,#c040e0 40%,#7040ff 100%)'
                    : 'rgba(255,255,255,0.1)',
                  boxShadow: sourceImage
                    ? '0 0 24px rgba(200,40,200,0.6),inset 0 2px 4px rgba(255,255,255,0.25),0 4px 0 #500060'
                    : 'none',
                  border: sourceImage ? 'none' : '2px solid rgba(255,255,255,0.15)',
                  textShadow: sourceImage ? '0 1px 3px rgba(0,0,0,0.5)' : 'none',
                }}
              >
                {sourceImage ? '✂️ AIで背景を切り抜く' : '📷 写真を選ぶか撮影する'}
              </motion.button>
            </motion.div>
          )}

          {/* ══ STEP 2: 編集 & タグ ══ */}
          {step === 2 && !isProcessing && !showIssue && (
            <motion.div key="s2"
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
              style={{ flex: 1, overflowY: 'auto', padding: '10px 16px 28px', display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              <p style={{
                fontFamily: FREDOKA, fontSize: '1.15rem', fontWeight: 700, letterSpacing: 3,
                color: '#ff8fd8', margin: 0, textAlign: 'center', flexShrink: 0,
                textShadow: '0 0 16px rgba(255,100,200,0.95),0 0 32px rgba(255,20,147,0.65)',
              }}>
                ✨ カードを編集 ✨
              </p>

              {/* Card preview */}
              <div style={{ display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ width: 110, aspectRatio: '2/3', borderRadius: 14, position: 'relative', overflow: 'hidden', background: 'white', boxShadow: `0 0 24px ${currentTheme.glow},0 4px 14px rgba(0,0,0,0.5)` }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cardImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/img/Card_Frame2.png" alt="" style={{ position: 'absolute', top: '-5%', left: '-5%', width: '110%', height: '110%', objectFit: 'fill', pointerEvents: 'none' }} />
                  {bgRemovedOk && (
                    <div style={{ position: 'absolute', top: 5, left: 5, background: 'linear-gradient(135deg,#ff1493,#c040e0)', borderRadius: 20, padding: '1px 6px' }}>
                      <span style={{ fontFamily: FREDOKA, fontSize: '0.48rem', fontWeight: 700, color: 'white' }}>AI ✂</span>
                    </div>
                  )}
                  <div style={{ position: 'absolute', top: 5, right: 5, background: 'linear-gradient(135deg,#ffd700,#ff8c00)', borderRadius: 20, padding: '1px 6px' }}>
                    <span style={{ fontFamily: FREDOKA, fontSize: '0.48rem', fontWeight: 700, color: '#3a1800' }}>SR</span>
                  </div>
                </div>
              </div>

              {/* Theme */}
              <div style={{ flexShrink: 0 }}>
                <p style={LBL}>✦ テーマ</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
                  {THEMES.map(th => {
                    const sel = theme === th.id
                    const isCustom = th.id === 'custom'
                    return (
                      <motion.button key={th.id} whileTap={{ scale: 0.91, y: 2 }} onClick={() => setTheme(th.id)} style={{
                        padding: '10px 6px', borderRadius: 14, cursor: 'pointer', outline: 'none',
                        fontFamily: ZEN, fontSize: '0.78rem', fontWeight: 900,
                        background: sel
                          ? 'linear-gradient(180deg,#fff8c0 0%,#ffd700 28%,#e0a000 55%,#c88000 78%,#ffd700 100%)'
                          : isCustom
                            ? 'linear-gradient(90deg,#ff1493 0%,#d040e0 33%,#7040ff 66%,#ff1493 100%)'
                            : th.btnBg,
                        backgroundSize: !sel && isCustom ? '200% 100%' : '100% 100%',
                        animation: !sel && isCustom ? 'holoShimmer 2s linear infinite' : 'none',
                        color: sel ? '#3a2000' : 'white',
                        border: sel ? '2px solid rgba(255,215,0,0.85)' : '1.5px solid rgba(255,255,255,0.2)',
                        boxShadow: sel
                          ? '0 0 22px rgba(255,215,0,0.9),inset 0 2px 5px rgba(255,255,255,0.65),0 3px 0 rgba(100,60,0,0.6)'
                          : `inset 0 2px 4px rgba(255,255,255,0.35),0 3px 0 ${th.btnShadow}`,
                        textShadow: sel ? '0 1px 2px rgba(255,255,255,0.5)' : '0 1px 2px rgba(0,0,0,0.6)',
                      }}>
                        {th.label}
                      </motion.button>
                    )
                  })}
                </div>
                {theme === 'custom' && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: 8 }}>
                    <input type="text" value={customThemeText} onChange={e => setCustomThemeText(e.target.value)} placeholder="例: 姫ギャル、地雷系…" style={{ ...INPUT, borderColor: '#c060ff', boxShadow: '0 0 12px rgba(180,80,255,0.4),0 3px 0 #600090' }} />
                  </motion.div>
                )}
              </div>

              {/* Name */}
              <div style={{ flexShrink: 0 }}>
                <p style={LBL}>✦ アイテム名</p>
                <input type="text" value={cardName} onChange={e => setCardName(e.target.value)} placeholder="例: ピンクのフリルブラウス" style={INPUT} />
              </div>

              {/* Brand */}
              <div style={{ flexShrink: 0 }}>
                <p style={LBL}>✦ ブランド</p>
                <input type="text" value={brand} onChange={e => setBrand(e.target.value)} placeholder="例: WEGO / SPINNS" style={INPUT} />
              </div>

              {/* Color */}
              <div style={{ flexShrink: 0 }}>
                <p style={LBL}>✦ カラー</p>
                <input type="text" value={colorName} onChange={e => setColorName(e.target.value)} placeholder="例: ミルクピンク、ラベンダー" style={INPUT} />
              </div>

              {/* Category */}
              <div style={{ flexShrink: 0 }}>
                <p style={LBL}>✦ カテゴリ</p>
                <div style={{ display: 'flex', gap: 5 }}>
                  {CATS.map(cat => {
                    const sel = category === cat.key
                    return (
                      <motion.button key={cat.key} whileTap={{ scale: 0.91, y: 2 }} onClick={() => setCategory(cat.key)} style={{
                        flex: 1, padding: '9px 2px', border: 'none', borderRadius: 10, cursor: 'pointer', outline: 'none',
                        fontFamily: FREDOKA, fontSize: '0.62rem', fontWeight: 700,
                        background: sel ? cat.grad : 'rgba(255,255,255,0.07)',
                        color: sel ? 'white' : 'rgba(255,255,255,0.45)',
                        boxShadow: sel ? `0 0 14px ${cat.shadow},inset 0 2px 3px rgba(255,255,255,0.22),0 3px 0 rgba(0,0,0,0.55)` : 'inset 0 0 0 1px rgba(255,255,255,0.1),0 2px 0 rgba(0,0,0,0.3)',
                        textShadow: sel ? '0 1px 2px rgba(0,0,0,0.6)' : 'none',
                      }}>
                        {cat.label}
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Tags */}
              <div style={{ flexShrink: 0 }}>
                <p style={LBL}>✦ タグ</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {ALL_TAGS.map(tag => {
                    const active = selectedTags.includes(tag)
                    return (
                      <motion.button key={tag} whileTap={{ scale: 0.91 }} onClick={() => toggleTag(tag)} style={{
                        fontFamily: ZEN, fontSize: '0.7rem', fontWeight: 700, borderRadius: 20, padding: '5px 11px', cursor: 'pointer', outline: 'none',
                        border: active ? 'none' : '1px solid rgba(255,255,255,0.15)',
                        background: active ? 'linear-gradient(135deg,#ff8fd8,#ff1493)' : 'rgba(255,255,255,0.07)',
                        color: active ? 'white' : 'rgba(255,255,255,0.5)',
                        boxShadow: active ? '0 0 10px rgba(255,20,147,0.55),0 2px 0 #880040' : '0 2px 0 rgba(0,0,0,0.3)',
                      }}>
                        {tag}
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Publish button */}
              <motion.button whileTap={{ scale: 0.97 }} onClick={handleIssue} style={{
                flexShrink: 0, width: '100%', padding: '17px', border: 'none', borderRadius: 16, cursor: 'pointer', outline: 'none', marginTop: 4,
                fontFamily: ZEN, fontSize: '1.08rem', fontWeight: 900, color: 'white',
                background: 'linear-gradient(180deg,#c060f0 0%,#8020c0 50%,#4a0090 100%)',
                boxShadow: '0 0 22px rgba(160,40,220,0.55),inset 0 2px 5px rgba(255,255,255,0.28),0 4px 0 #220050',
                textShadow: '0 1px 3px rgba(0,0,0,0.5)',
              }}>
                ✨ カードを発行する！
              </motion.button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
