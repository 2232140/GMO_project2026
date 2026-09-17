'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

const ZEN = 'var(--font-zen-maru-gothic), var(--font-nunito), sans-serif'
const FREDOKA = 'var(--font-fredoka), sans-serif'

const THEMES = [
  {
    id: 'yumekawa', label: 'ゆめかわ',
    cardBg: 'linear-gradient(135deg,#ffe4f8,#ffbce8,#ffa0de)',
    border: '#ff60c0', glow: 'rgba(255,80,190,0.55)',
    btnBg: 'linear-gradient(180deg,#ffe0f5,#ff80c8 45%,#d03090 85%,#a01060 100%)',
    btnShadow: '#801050',
  },
  {
    id: 'gyaru', label: 'ギャル',
    cardBg: 'linear-gradient(135deg,#fff8c0,#ffe060,#ffc020)',
    border: '#e0a000', glow: 'rgba(255,190,0,0.55)',
    btnBg: 'linear-gradient(180deg,#fff8d0,#ffd040 45%,#c08000 85%,#906000 100%)',
    btnShadow: '#705000',
  },
  {
    id: 'chic', label: 'シック',
    cardBg: 'linear-gradient(135deg,#d8e0ff,#b8c8f0,#9ab0e0)',
    border: '#6080e0', glow: 'rgba(100,120,220,0.48)',
    btnBg: 'linear-gradient(180deg,#e0e8ff,#8090e0 45%,#4060b0 85%,#2040a0 100%)',
    btnShadow: '#203090',
  },
  {
    id: 'custom', label: '✨ カスタム',
    cardBg: 'linear-gradient(135deg,#1a0035,#300060,#1a0035)',
    border: '#c060ff', glow: 'rgba(180,80,255,0.6)',
    btnBg: 'linear-gradient(90deg,#ff1493 0%,#d040e0 33%,#7040ff 66%,#ff1493 100%)',
    btnShadow: '#600090',
  },
]

const CATS = [
  { key: 'tops',    label: 'TOPS', grad: 'linear-gradient(180deg,#ffd0d8,#ff5878 40%,#d01838 80%,#980030 100%)', shadow: 'rgba(210,20,50,0.55)' },
  { key: 'bottoms', label: 'BTMS', grad: 'linear-gradient(180deg,#d0d8ff,#6080f0 40%,#3050c0 80%,#1030a0 100%)', shadow: 'rgba(50,80,200,0.55)' },
  { key: 'shoes',   label: 'SHOE', grad: 'linear-gradient(180deg,#d0ffd8,#40c860 40%,#209040 80%,#106020 100%)', shadow: 'rgba(20,140,60,0.55)' },
  { key: 'cosme',   label: 'CSME', grad: 'linear-gradient(180deg,#ffd0f8,#e060c8 40%,#b020a0 80%,#800080 100%)', shadow: 'rgba(180,20,160,0.55)' },
  { key: 'bag',     label: 'BAG',  grad: 'linear-gradient(180deg,#fff0d0,#f0b040 40%,#c07010 80%,#904000 100%)', shadow: 'rgba(180,100,0,0.55)' },
]

const ALL_TAGS = ['#PINK', '#フリル', '#量産型', '#Y2K', '#ギャル', '#清楚系', '#ラベンダー', '#ホワイト', '#オルチャン', '#盛り', '#ゆめかわ', '#V系']

const CORNER_DEFS: [boolean, boolean][] = [[true, true], [true, false], [false, true], [false, false]]

const SPARKS = [
  { sym: '✨', dx: 140, dy: -65, size: 28, delay: 0 },
  { sym: '⭐', dx: 110, dy: 118, size: 22, delay: 0.05 },
  { sym: '💫', dx: -22, dy: 148, size: 24, delay: 0.08 },
  { sym: '✦',  dx: -138, dy: 92, size: 20, delay: 0.10 },
  { sym: '★',  dx: -152, dy: -32, size: 22, delay: 0.12 },
  { sym: '💕', dx: -118, dy: -122, size: 24, delay: 0.04 },
  { sym: '✨', dx: 32,  dy: -158, size: 28, delay: 0.07 },
  { sym: '⭐', dx: 138, dy: -98, size: 20, delay: 0.02 },
  { sym: '💫', dx: 92,  dy: 132, size: 22, delay: 0.14 },
  { sym: '💎', dx: -68, dy: 158, size: 24, delay: 0.09 },
  { sym: '⭐', dx: -158, dy: 62, size: 24, delay: 0.11 },
  { sym: '💗', dx: 62,  dy: -152, size: 26, delay: 0.06 },
  { sym: '✨', dx: -78, dy: -148, size: 20, delay: 0.03 },
  { sym: '💫', dx: 158, dy: 32,  size: 22, delay: 0.13 },
  { sym: '✦',  dx: -148, dy: -82, size: 18, delay: 0.01 },
  { sym: '💕', dx: 82,  dy: -142, size: 20, delay: 0.15 },
]

/* ── input / label shared styles ── */
const INPUT_STYLE: React.CSSProperties = {
  width: '100%', padding: '10px 14px', boxSizing: 'border-box',
  background: 'rgba(10,0,30,0.65)',
  border: '2px solid #ff69b4', borderRadius: 14, outline: 'none',
  fontFamily: ZEN, fontSize: '0.82rem', color: 'white',
  boxShadow: '0 0 12px rgba(255,100,200,0.35),inset 0 1px 0 rgba(255,255,255,0.1),0 3px 0 #88004a',
}
const LABEL_STYLE: React.CSSProperties = {
  margin: '0 0 5px', fontFamily: ZEN, fontSize: '0.72rem', fontWeight: 900,
  color: 'rgba(255,180,230,0.85)',
}

export default function CreatePage() {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [flash, setFlash] = useState(false)
  const [cardName, setCardName] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('tops')
  const [theme, setTheme] = useState('yumekawa')
  const [customThemeText, setCustomThemeText] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [issued, setIssued] = useState(false)

  const currentTheme = THEMES.find(t => t.id === theme)!

  const handleShutter = () => {
    setFlash(true)
    setTimeout(() => { setFlash(false); setStep(2) }, 380)
  }

  const toggleTag = (tag: string) =>
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])

  return (
    <div style={{ position: 'fixed', inset: 0 }}>

      {/* White flash */}
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

      {/* ═══ Inner container — dark neon arcade bg ═══ */}
      <div style={{
        position: 'relative', height: '100dvh', maxWidth: 430, margin: '0 auto',
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        background: 'linear-gradient(180deg,#0a0018 0%,#120028 60%,#0a0018 100%)',
      }}>

        {/* ── STEP 3: Card ejection overlay ── */}
        <AnimatePresence>
          {step === 3 && (
            <motion.div key="step3"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{
                position: 'absolute', inset: 0, zIndex: 50,
                background: 'radial-gradient(ellipse at 50% 38%,rgba(150,0,120,0.92) 0%,rgba(70,0,150,0.96) 42%,rgba(8,0,24,0.99) 100%)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {/* Ambient star field */}
              {[...Array(20)].map((_, i) => (
                <div key={`star-${i}`} style={{
                  position: 'absolute',
                  top: `${(i * 37 + 11) % 100}%`,
                  left: `${(i * 53 + 7) % 100}%`,
                  width: i % 3 === 0 ? 3 : 2,
                  height: i % 3 === 0 ? 3 : 2,
                  borderRadius: '50%',
                  background: `rgba(255,255,255,${0.2 + (i % 4) * 0.15})`,
                  pointerEvents: 'none',
                }} />
              ))}

              {/* 3D card — scale+spin entrance from depth */}
              <div style={{ perspective: 600 }}>
                <motion.div
                  initial={{ scale: 0.04, opacity: 0, rotateY: -720, rotateZ: 18 }}
                  animate={{ scale: 1, opacity: 1, rotateY: 0, rotateZ: 0 }}
                  transition={{
                    scale:   { type: 'spring', stiffness: 55, damping: 16, delay: 0.1 },
                    rotateY: { type: 'spring', stiffness: 65, damping: 18, delay: 0.1 },
                    rotateZ: { type: 'spring', stiffness: 75, damping: 20, delay: 0.1 },
                    opacity: { duration: 0.25, delay: 0.1 },
                  }}
                  onAnimationComplete={() => setIssued(true)}
                  style={{
                    width: 190, aspectRatio: '2/3', borderRadius: 18,
                    background: currentTheme.cardBg,
                    border: `3px solid ${currentTheme.border}`,
                    boxShadow: `0 0 40px ${currentTheme.glow},0 24px 64px rgba(0,0,0,0.8),inset 0 1px 0 rgba(255,255,255,0.2)`,
                    position: 'relative', overflow: 'hidden',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/img/dress.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/img/Card_Frame.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', top: 8, right: 8, background: 'linear-gradient(135deg,#ff1493,#c040e0)', borderRadius: 20, padding: '2px 8px' }}>
                    <span style={{ fontFamily: FREDOKA, fontSize: '0.58rem', fontWeight: 700, color: 'white' }}>AI CUT ✦</span>
                  </div>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent,rgba(0,0,0,0.78))', padding: '22px 10px 10px' }}>
                    <p style={{ margin: 0, fontFamily: ZEN, fontSize: '0.75rem', fontWeight: 900, color: 'white', textAlign: 'center' }}>
                      {cardName || 'マイアイテム'}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Sparkle burst + success modal */}
              <AnimatePresence>
                {issued && (
                  <>
                    {SPARKS.map((s, i) => (
                      <motion.div key={`sp-${i}`}
                        initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                        animate={{ opacity: 0, x: s.dx, y: s.dy, scale: 0 }}
                        transition={{ duration: 0.8, delay: s.delay, ease: 'easeOut' }}
                        style={{ position: 'absolute', fontSize: s.size, userSelect: 'none', pointerEvents: 'none' }}
                      >{s.sym}</motion.div>
                    ))}
                    <motion.div
                      initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.65, type: 'spring', stiffness: 200 }}
                      style={{ marginTop: 30, textAlign: 'center', padding: '0 24px' }}
                    >
                      <p style={{
                        fontFamily: FREDOKA, fontSize: '1.55rem', fontWeight: 700, color: 'white', margin: '0 0 6px',
                        textShadow: '0 0 28px rgba(255,150,220,1),0 0 12px rgba(255,20,147,0.9)',
                      }}>
                        💗 カード発行完了！
                      </p>
                      <p style={{ fontFamily: ZEN, fontSize: '0.82rem', color: 'rgba(255,200,240,0.75)', margin: '0 0 24px' }}>
                        MY BINDER に保存しました！
                      </p>
                      <motion.button whileTap={{ scale: 0.95 }} onClick={() => router.push('/binder')} style={{
                        fontFamily: ZEN, fontSize: '1rem', fontWeight: 900, color: 'white',
                        background: 'linear-gradient(180deg,#ff8fd8,#ff1493 50%,#b8004a 100%)',
                        border: 'none', borderRadius: 40, padding: '13px 44px',
                        boxShadow: '0 0 32px rgba(255,20,147,0.8),0 4px 0 #6a0030', cursor: 'pointer',
                      }}>
                        ✨ バインダーを見る
                      </motion.button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back + step dots */}
        {step < 3 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px 0', flexShrink: 0 }}>
            <motion.button whileTap={{ scale: 0.93 }}
              onClick={() => step === 1 ? router.push('/') : setStep(1)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
            >
              <span style={{ fontFamily: ZEN, fontSize: '0.8rem', color: 'rgba(255,180,220,0.7)', fontWeight: 700 }}>← 戻る</span>
            </motion.button>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {[1, 2].map(s => (
                <div key={s} style={{
                  width: s === step ? 24 : 8, height: 8, borderRadius: 4, transition: 'all 0.3s',
                  background: s === step ? '#ff1493' : 'rgba(255,100,180,0.25)',
                  boxShadow: s === step ? '0 0 8px rgba(255,20,147,0.8)' : 'none',
                }} />
              ))}
            </div>
            <div style={{ width: 48 }} />
          </div>
        )}

        <AnimatePresence mode="wait">

          {/* ══ STEP 1: Camera ══ */}
          {step === 1 && (
            <motion.div key="s1"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -40 }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 20px 16px', gap: 10, overflow: 'hidden' }}
            >
              {/* Neon glow title */}
              <p style={{
                fontFamily: FREDOKA, fontSize: 'clamp(0.9rem,5vw,1.2rem)', fontWeight: 700,
                margin: 0, color: '#ff1493', letterSpacing: 2,
                textShadow: '0 0 16px rgba(255,20,147,0.95),0 0 32px rgba(255,20,147,0.55),0 2px 4px rgba(0,0,0,0.9)',
              }}>
                ✨ NEW CARD CREATOR
              </p>

              {/* Camera viewfinder — dark with pink corner jewels */}
              <div style={{
                position: 'relative', width: '78%', aspectRatio: '3/4', flexShrink: 0,
                background: '#050010', borderRadius: 18, overflow: 'hidden',
                border: '2px solid rgba(255,215,0,0.6)',
                boxShadow: '0 0 24px rgba(255,100,180,0.3),inset 0 0 20px rgba(255,20,147,0.06)',
              }}>
                <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.025) 3px,rgba(255,255,255,0.025) 4px)' }} />
                {[80, 120].map((sz, ri) => (
                  <div key={ri} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: sz, height: sz, borderRadius: '50%', border: `1px solid rgba(255,215,0,${ri === 0 ? 0.4 : 0.2})`, zIndex: 3, pointerEvents: 'none' }} />
                ))}
                <div style={{ position: 'absolute', top: '50%', left: '50%', width: 26, height: 2, background: 'rgba(255,215,0,0.65)', transform: 'translate(-50%,-50%)', zIndex: 3 }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', width: 2, height: 26, background: 'rgba(255,215,0,0.65)', transform: 'translate(-50%,-50%)', zIndex: 3 }} />
                {CORNER_DEFS.map(([isTop, isLeft], ci) => (
                  <div key={ci} style={{ position: 'absolute', zIndex: 4, top: isTop ? 10 : 'auto', bottom: isTop ? 'auto' : 10, left: isLeft ? 10 : 'auto', right: isLeft ? 'auto' : 10, width: 30, height: 30 }}>
                    <div style={{ position: 'absolute', inset: 0, borderTop: isTop ? '3px solid rgba(255,215,0,0.9)' : 'none', borderBottom: isTop ? 'none' : '3px solid rgba(255,215,0,0.9)', borderLeft: isLeft ? '3px solid rgba(255,215,0,0.9)' : 'none', borderRight: isLeft ? 'none' : '3px solid rgba(255,215,0,0.9)', borderTopLeftRadius: isTop && isLeft ? 7 : 0, borderTopRightRadius: isTop && !isLeft ? 7 : 0, borderBottomLeftRadius: !isTop && isLeft ? 7 : 0, borderBottomRightRadius: !isTop && !isLeft ? 7 : 0 }} />
                    <div style={{ position: 'absolute', top: isTop ? -9 : 'auto', bottom: isTop ? 'auto' : -9, left: isLeft ? -9 : 'auto', right: isLeft ? 'auto' : -9, width: 18, height: 18, borderRadius: '50%', background: 'radial-gradient(circle at 38% 28%,#ff80d0,#ff1493 60%,#7a0040)', boxShadow: '0 0 8px rgba(255,20,147,0.85),0 0 0 2px rgba(255,255,255,0.3)' }} />
                  </div>
                ))}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/img/dress.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', opacity: 0.25, zIndex: 1 }} />
                <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.7)', borderRadius: 20, padding: '3px 14px', zIndex: 5 }}>
                  <span style={{ fontFamily: FREDOKA, fontSize: '0.62rem', color: 'rgba(255,255,255,0.5)', letterSpacing: 1.5 }}>DEMO MODE</span>
                </div>
              </div>

              {/* Shutter + floating deco */}
              <div style={{ position: 'relative', flexShrink: 0, width: 120, height: 96, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.span animate={{ rotate: [0,15,-10,5,0], scale: [1,1.25,0.9,1.1,1] }} transition={{ duration: 2.4, repeat: Infinity }} style={{ position: 'absolute', top: 0, left: 4, fontSize: 18, userSelect: 'none', pointerEvents: 'none' }}>⭐</motion.span>
                <motion.span animate={{ rotate: [0,-12,8,0], y: [0,-5,2,0] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: 'absolute', top: 2, right: 2, fontSize: 16, userSelect: 'none', pointerEvents: 'none' }}>💗</motion.span>
                <motion.span animate={{ scale: [1,1.35,0.85,1.1,1], opacity: [0.8,1,0.6,1,0.8] }} transition={{ duration: 2.8, repeat: Infinity }} style={{ position: 'absolute', bottom: 4, left: 2, fontSize: 14, userSelect: 'none', pointerEvents: 'none' }}>✨</motion.span>
                <motion.span animate={{ rotate: [0,20,-15,5,0] }} transition={{ duration: 3, repeat: Infinity }} style={{ position: 'absolute', bottom: 2, right: 4, fontSize: 16, userSelect: 'none', pointerEvents: 'none' }}>💕</motion.span>
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1, transition: { delay: 0.2, type: 'spring', stiffness: 200 } }}
                  whileTap={{ scale: 0.88 }} onClick={handleShutter}
                  style={{ width: 76, height: 76, borderRadius: '50%', border: 'none', cursor: 'pointer', background: 'radial-gradient(circle at 38% 28%,#ff80d0,#ff1493 55%,#8a0050 85%,#4a0028 100%)', boxShadow: '0 0 0 5px rgba(255,255,255,0.2),0 0 0 9px rgba(255,20,147,0.2),0 0 30px rgba(255,20,147,0.65),0 5px 0 #3a0020', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <div style={{ width: 54, height: 54, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
                  </div>
                </motion.button>
              </div>

              <p style={{ fontFamily: ZEN, fontSize: '0.72rem', color: 'rgba(255,150,200,0.55)', margin: 0, fontWeight: 700 }}>
                タップして撮影 ／ デモモードで体験
              </p>
            </motion.div>
          )}

          {/* ══ STEP 2: Edit + Tags ══ */}
          {step === 2 && (
            <motion.div key="s2"
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
              style={{ flex: 1, overflowY: 'auto', padding: '10px 16px 28px', display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              {/* Title — clean neon glow, no WebkitTextStroke */}
              <p style={{
                fontFamily: FREDOKA, fontSize: '1.15rem', fontWeight: 700, letterSpacing: 3,
                color: '#ff8fd8', margin: 0, textAlign: 'center', flexShrink: 0,
                textShadow: '0 0 16px rgba(255,100,200,0.95),0 0 32px rgba(255,20,147,0.65),0 2px 4px rgba(0,0,0,0.8)',
              }}>
                ✨ カードを編集 ✨
              </p>

              {/* Card preview */}
              <div style={{ display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ width: 100, aspectRatio: '2/3', borderRadius: 14, position: 'relative', overflow: 'hidden', background: currentTheme.cardBg, border: `3px solid ${currentTheme.border}`, boxShadow: `0 0 24px ${currentTheme.glow},0 4px 14px rgba(0,0,0,0.5)` }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/img/dress.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/img/Card_Frame.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', top: 6, right: 6, background: 'linear-gradient(135deg,#ff1493,#c040e0)', borderRadius: 20, padding: '2px 6px' }}>
                    <span style={{ fontFamily: FREDOKA, fontSize: '0.5rem', fontWeight: 700, color: 'white' }}>AI CUT ✦</span>
                  </div>
                </div>
              </div>

              {/* Theme — 2×2 grid, 4th = ✨ カスタム with gold-glow when selected */}
              <div style={{ flexShrink: 0 }}>
                <p style={LABEL_STYLE}>✦ テーマ</p>
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

                {/* Custom theme text input — visible only when custom is selected */}
                {theme === 'custom' && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginTop: 8 }}
                  >
                    <input
                      type="text" value={customThemeText}
                      onChange={e => setCustomThemeText(e.target.value)}
                      placeholder="例: 姫ギャル、地雷系..."
                      style={{
                        ...INPUT_STYLE,
                        border: '2px solid #c060ff',
                        boxShadow: '0 0 12px rgba(180,80,255,0.4),inset 0 1px 0 rgba(255,255,255,0.1),0 3px 0 #600090',
                      }}
                    />
                  </motion.div>
                )}
              </div>

              {/* Item name */}
              <div style={{ flexShrink: 0 }}>
                <p style={LABEL_STYLE}>✦ アイテム名</p>
                <input type="text" value={cardName} onChange={e => setCardName(e.target.value)} placeholder="例：ピンクのフリルブラウス" style={INPUT_STYLE} />
              </div>

              {/* Brand */}
              <div style={{ flexShrink: 0 }}>
                <p style={LABEL_STYLE}>✦ ブランド</p>
                <input type="text" value={brand} onChange={e => setBrand(e.target.value)} placeholder="例：WEGO / SPINNS" style={INPUT_STYLE} />
              </div>

              {/* Category — jewel 3D on dark */}
              <div style={{ flexShrink: 0 }}>
                <p style={LABEL_STYLE}>✦ カテゴリ</p>
                <div style={{ display: 'flex', gap: 5 }}>
                  {CATS.map(cat => {
                    const sel = category === cat.key
                    return (
                      <motion.button key={cat.key} whileTap={{ scale: 0.91, y: 2 }} onClick={() => setCategory(cat.key)} style={{
                        flex: 1, padding: '9px 2px', border: 'none', borderRadius: 10, cursor: 'pointer', outline: 'none',
                        fontFamily: FREDOKA, fontSize: '0.62rem', fontWeight: 700,
                        background: sel ? cat.grad : 'rgba(255,255,255,0.07)',
                        color: sel ? 'white' : 'rgba(255,255,255,0.45)',
                        boxShadow: sel
                          ? `0 0 14px ${cat.shadow},inset 0 2px 3px rgba(255,255,255,0.22),0 3px 0 rgba(0,0,0,0.55)`
                          : 'inset 0 0 0 1px rgba(255,255,255,0.1),0 2px 0 rgba(0,0,0,0.3)',
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
                <p style={LABEL_STYLE}>✦ タグ</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {ALL_TAGS.map(tag => {
                    const active = selectedTags.includes(tag)
                    return (
                      <motion.button key={tag} whileTap={{ scale: 0.91 }} onClick={() => toggleTag(tag)} style={{
                        fontFamily: ZEN, fontSize: '0.7rem', fontWeight: 700,
                        border: active ? 'none' : '1px solid rgba(255,255,255,0.15)',
                        borderRadius: 20, padding: '5px 11px', cursor: 'pointer', outline: 'none',
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

              {/* Publish — rainbow holoShimmer */}
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => setStep(3)} style={{
                flexShrink: 0, width: '100%', padding: '17px', border: 'none', borderRadius: 16, cursor: 'pointer', outline: 'none', marginTop: 4,
                fontFamily: ZEN, fontSize: '1.08rem', fontWeight: 900, color: 'white',
                background: 'linear-gradient(90deg,#ffb3d9 0%,#ffd6f0 14%,#e8c8ff 28%,#c0d8ff 42%,#c0f0ff 56%,#c0ffe8 70%,#fff0c0 84%,#ffb3d9 100%)',
                backgroundSize: '300% 100%',
                animation: 'holoShimmer 3s ease-in-out infinite',
                boxShadow: '0 0 22px rgba(255,160,220,0.55),inset 0 2px 6px rgba(255,255,255,0.55),0 4px 0 rgba(160,80,140,0.6)',
                textShadow: '0 1px 3px rgba(120,0,80,0.4)',
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
