'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

const ZEN = 'var(--font-zen-maru-gothic), var(--font-nunito), sans-serif'
const FREDOKA = 'var(--font-fredoka), sans-serif'

const THEMES = [
  { id: 'yumekawa', label: 'ゆめかわ', cardBg: 'linear-gradient(135deg,#ffe4f8,#ffbce8,#ffa0de)', border: 'rgba(255,80,190,0.85)', glow: 'rgba(255,80,190,0.55)' },
  { id: 'gyaru',    label: 'ギャル',   cardBg: 'linear-gradient(135deg,#fff8c0,#ffe060,#ffc020)', border: 'rgba(255,190,0,0.9)',   glow: 'rgba(255,190,0,0.55)' },
  { id: 'chic',     label: 'シック',   cardBg: 'linear-gradient(135deg,#d8e0ff,#b8c8f0,#9ab0e0)', border: 'rgba(100,120,220,0.82)',glow: 'rgba(100,120,220,0.48)' },
]

const CATS = [
  { key: 'tops',    label: 'TOPS', grad: 'linear-gradient(180deg,#ffd0d8,#ff5878 40%,#d01838 80%,#980030 100%)', shadow: 'rgba(210,20,50,0.5)' },
  { key: 'bottoms', label: 'BTMS', grad: 'linear-gradient(180deg,#d0d8ff,#6080f0 40%,#3050c0 80%,#1030a0 100%)', shadow: 'rgba(50,80,200,0.5)' },
  { key: 'shoes',   label: 'SHOE', grad: 'linear-gradient(180deg,#d0ffd8,#40c860 40%,#209040 80%,#106020 100%)', shadow: 'rgba(20,140,60,0.5)' },
  { key: 'cosme',   label: 'CSME', grad: 'linear-gradient(180deg,#ffd0f8,#e060c8 40%,#b020a0 80%,#800080 100%)', shadow: 'rgba(180,20,160,0.5)' },
  { key: 'bag',     label: 'BAG',  grad: 'linear-gradient(180deg,#fff0d0,#f0b040 40%,#c07010 80%,#904000 100%)', shadow: 'rgba(180,100,0,0.5)' },
]

const ALL_TAGS = ['#PINK', '#フリル', '#量産型', '#Y2K', '#ギャル', '#清楚系', '#ラベンダー', '#ホワイト', '#オルチャン', '#盛り', '#ゆめかわ', '#V系']

const CORNER_DEFS: [boolean, boolean][] = [[true, true], [true, false], [false, true], [false, false]]

export default function CreatePage() {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [flash, setFlash] = useState(false)
  const [cardName, setCardName] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('tops')
  const [theme, setTheme] = useState('yumekawa')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [issued, setIssued] = useState(false)

  const currentTheme = THEMES.find(t => t.id === theme)!

  const handleShutter = () => {
    setFlash(true)
    setTimeout(() => {
      setFlash(false)
      setStep(2)
    }, 380)
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      {/* Full-screen white flash */}
      <AnimatePresence>
        {flash && (
          <motion.div
            key="flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.22 } }}
            transition={{ duration: 0.07 }}
            style={{ position: 'absolute', inset: 0, background: 'white', zIndex: 200, pointerEvents: 'none' }}
          />
        )}
      </AnimatePresence>

      {/* Inner container — maxWidth 430, dark arcade bg */}
      <div style={{
        position: 'relative',
        height: '100dvh',
        maxWidth: 430,
        margin: '0 auto',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg,#0a0018 0%,#120028 60%,#0a0018 100%)',
      }}>

        {/* ── STEP 3: Card ejection overlay ── */}
        <AnimatePresence>
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                position: 'absolute', inset: 0, zIndex: 50,
                background: 'rgba(8,0,22,0.96)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              {/* Gold ejection slot */}
              <div style={{
                position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                width: 130, height: 20,
                background: 'linear-gradient(180deg,#ffd700,#b08800)',
                borderRadius: '0 0 14px 14px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(255,215,0,0.55)',
              }}>
                <span style={{ fontFamily: FREDOKA, fontSize: '0.58rem', fontWeight: 700, color: '#3a2000', letterSpacing: 2.5 }}>排 出 口</span>
              </div>

              {/* Ejected card */}
              <motion.div
                initial={{ y: '-70vh', rotateY: 180, scale: 0.4, opacity: 0 }}
                animate={{ y: 0, rotateY: 0, scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 90, damping: 14, delay: 0.25 }}
                onAnimationComplete={() => setIssued(true)}
                style={{
                  width: 190, aspectRatio: '2/3',
                  borderRadius: 18,
                  background: currentTheme.cardBg,
                  border: `3px solid ${currentTheme.border}`,
                  boxShadow: `0 0 36px ${currentTheme.glow}, 0 20px 60px rgba(0,0,0,0.7)`,
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
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent,rgba(0,0,0,0.75))', padding: '20px 10px 10px' }}>
                  <p style={{ margin: 0, fontFamily: ZEN, fontSize: '0.75rem', fontWeight: 900, color: 'white', textAlign: 'center' }}>
                    {cardName || 'マイアイテム'}
                  </p>
                </div>
              </motion.div>

              {/* Sparkles + success modal */}
              <AnimatePresence>
                {issued && (
                  <>
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={`spark-${i}`}
                        initial={{ opacity: 1, x: 0, y: 0, scale: 1.2 }}
                        animate={{
                          opacity: 0,
                          x: Math.cos((i * Math.PI) / 4) * 120,
                          y: Math.sin((i * Math.PI) / 4) * 120,
                          scale: 0,
                        }}
                        transition={{ duration: 0.65, delay: i * 0.035 }}
                        style={{ position: 'absolute', fontSize: 22, color: '#ffd700', userSelect: 'none', pointerEvents: 'none' }}
                      >
                        ✦
                      </motion.div>
                    ))}
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55, type: 'spring', stiffness: 220 }}
                      style={{ marginTop: 28, textAlign: 'center', padding: '0 24px' }}
                    >
                      <p style={{
                        fontFamily: FREDOKA, fontSize: '1.4rem', fontWeight: 700,
                        color: 'white', margin: '0 0 6px',
                        textShadow: '0 0 24px rgba(255,215,0,0.95), 0 0 8px rgba(255,20,147,0.7)',
                      }}>
                        🎴 カード発行完了！
                      </p>
                      <p style={{ fontFamily: ZEN, fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)', margin: '0 0 22px' }}>
                        MY BINDER に保存しました！
                      </p>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push('/binder')}
                        style={{
                          fontFamily: ZEN, fontSize: '1rem', fontWeight: 900, color: 'white',
                          background: 'linear-gradient(180deg,#ff8fd8,#ff1493 50%,#b8004a 100%)',
                          border: 'none', borderRadius: 40, padding: '13px 44px',
                          boxShadow: '0 0 28px rgba(255,20,147,0.75), 0 4px 0 #6a0030',
                          cursor: 'pointer',
                        }}
                      >
                        ✨ バインダーを見る
                      </motion.button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back button + step dots — hidden on step 3 */}
        {step < 3 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px 0', flexShrink: 0 }}>
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={() => step === 1 ? router.push('/') : setStep(1)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
            >
              <span style={{ fontFamily: ZEN, fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)' }}>← 戻る</span>
            </motion.button>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {[1, 2].map(s => (
                <div key={s} style={{
                  width: s === step ? 24 : 8, height: 8, borderRadius: 4,
                  background: s === step ? '#ff1493' : 'rgba(255,255,255,0.2)',
                  transition: 'all 0.3s',
                  boxShadow: s === step ? '0 0 8px rgba(255,20,147,0.7)' : 'none',
                }} />
              ))}
            </div>
            <div style={{ width: 48 }} />
          </div>
        )}

        <AnimatePresence mode="wait">

          {/* ── STEP 1: Camera view ── */}
          {step === 1 && (
            <motion.div
              key="s1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -40 }}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', padding: '10px 20px 20px', gap: 10, overflow: 'hidden',
              }}
            >
              {/* Neon title */}
              <p style={{
                fontFamily: FREDOKA, fontSize: 'clamp(0.9rem,5vw,1.2rem)', fontWeight: 700,
                margin: 0, color: '#ff1493', letterSpacing: 2,
                textShadow: '0 0 14px rgba(255,20,147,0.95), 0 0 30px rgba(255,20,147,0.5)',
              }}>
                ✨ NEW CARD CREATOR
              </p>

              {/* Camera viewfinder */}
              <div style={{
                position: 'relative', width: '78%', aspectRatio: '3/4',
                background: '#050010', borderRadius: 16, overflow: 'hidden',
                border: '1.5px solid rgba(255,215,0,0.35)', flexShrink: 0,
              }}>
                {/* Scan lines */}
                <div style={{
                  position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
                  backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.03) 3px,rgba(255,255,255,0.03) 4px)',
                }} />
                {/* Targeting rings */}
                {[80, 120].map((size, ri) => (
                  <div key={ri} style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%,-50%)',
                    width: size, height: size, borderRadius: '50%',
                    border: `1px solid rgba(255,215,0,${ri === 0 ? 0.35 : 0.15})`,
                    zIndex: 3, pointerEvents: 'none',
                  }} />
                ))}
                {/* Crosshair */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', width: 24, height: 1.5, background: 'rgba(255,215,0,0.55)', transform: 'translate(-50%,-50%)', zIndex: 3 }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', width: 1.5, height: 24, background: 'rgba(255,215,0,0.55)', transform: 'translate(-50%,-50%)', zIndex: 3 }} />
                {/* 4 gold + jewel corner brackets */}
                {CORNER_DEFS.map(([isTop, isLeft], ci) => (
                  <div key={ci} style={{
                    position: 'absolute', zIndex: 4,
                    top: isTop ? 8 : 'auto', bottom: isTop ? 'auto' : 8,
                    left: isLeft ? 8 : 'auto', right: isLeft ? 'auto' : 8,
                    width: 28, height: 28,
                  }}>
                    <div style={{
                      position: 'absolute', inset: 0,
                      borderTop:    isTop    ? '2.5px solid rgba(255,215,0,0.9)' : 'none',
                      borderBottom: isTop    ? 'none' : '2.5px solid rgba(255,215,0,0.9)',
                      borderLeft:   isLeft   ? '2.5px solid rgba(255,215,0,0.9)' : 'none',
                      borderRight:  isLeft   ? 'none' : '2.5px solid rgba(255,215,0,0.9)',
                      borderTopLeftRadius:     isTop  && isLeft  ? 6 : 0,
                      borderTopRightRadius:    isTop  && !isLeft ? 6 : 0,
                      borderBottomLeftRadius:  !isTop && isLeft  ? 6 : 0,
                      borderBottomRightRadius: !isTop && !isLeft ? 6 : 0,
                    }} />
                    <div style={{
                      position: 'absolute',
                      top:    isTop  ? -8 : 'auto', bottom: isTop  ? 'auto' : -8,
                      left:   isLeft ? -8 : 'auto', right:  isLeft ? 'auto' : -8,
                      width: 16, height: 16, borderRadius: '50%',
                      background: 'radial-gradient(circle at 38% 28%,#ff80d0,#ff1493 60%,#7a0040)',
                      boxShadow: '0 0 8px rgba(255,20,147,0.85)',
                    }} />
                  </div>
                ))}
                {/* Demo dress preview */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/img/dress.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', opacity: 0.25, zIndex: 1 }} />
                {/* DEMO label */}
                <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.6)', borderRadius: 20, padding: '3px 14px', zIndex: 5 }}>
                  <span style={{ fontFamily: FREDOKA, fontSize: '0.62rem', color: 'rgba(255,255,255,0.5)', letterSpacing: 1.5 }}>DEMO MODE</span>
                </div>
              </div>

              {/* Shutter button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.2, type: 'spring', stiffness: 200 } }}
                whileTap={{ scale: 0.88 }}
                onClick={handleShutter}
                style={{
                  width: 76, height: 76, borderRadius: '50%', border: 'none', flexShrink: 0,
                  background: 'radial-gradient(circle at 38% 28%,#ff80d0,#ff1493 55%,#8a0050 85%,#4a0028 100%)',
                  boxShadow: '0 0 0 5px rgba(255,20,147,0.25),0 0 0 10px rgba(255,20,147,0.12),0 0 32px rgba(255,20,147,0.75),0 5px 0 #3a0020',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <div style={{
                  width: 54, height: 54, borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.32)',
                  background: 'rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
                </div>
              </motion.button>

              <p style={{ fontFamily: ZEN, fontSize: '0.7rem', color: 'rgba(255,255,255,0.32)', margin: 0 }}>
                タップして撮影 ／ デモモードで体験
              </p>
            </motion.div>
          )}

          {/* ── STEP 2: Edit + Tags ── */}
          {step === 2 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              style={{ flex: 1, overflowY: 'auto', padding: '10px 16px 28px', display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              <p style={{
                fontFamily: FREDOKA, fontSize: '1.05rem', fontWeight: 700,
                color: '#ff8fd8', margin: 0, textAlign: 'center',
                textShadow: '0 0 12px rgba(255,100,200,0.7)', flexShrink: 0,
              }}>
                ✦ カードを編集 ✦
              </p>

              {/* Card preview + theme selector */}
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexShrink: 0 }}>
                <div style={{
                  width: 110, flexShrink: 0, aspectRatio: '2/3',
                  borderRadius: 14, position: 'relative', overflow: 'hidden',
                  background: currentTheme.cardBg,
                  border: `2.5px solid ${currentTheme.border}`,
                  boxShadow: `0 0 22px ${currentTheme.glow}`,
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/img/dress.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/img/Card_Frame.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', top: 6, right: 6, background: 'linear-gradient(135deg,#ff1493,#c040e0)', borderRadius: 20, padding: '2px 6px' }}>
                    <span style={{ fontFamily: FREDOKA, fontSize: '0.5rem', fontWeight: 700, color: 'white' }}>AI CUT ✦</span>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '0 0 6px', fontFamily: ZEN, fontSize: '0.7rem', fontWeight: 900, color: 'rgba(255,255,255,0.55)' }}>テーマ</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {THEMES.map(th => (
                      <motion.button
                        key={th.id}
                        whileTap={{ scale: 0.93 }}
                        onClick={() => setTheme(th.id)}
                        style={{
                          fontFamily: ZEN, fontSize: '0.72rem', fontWeight: 900,
                          border: `1.5px solid ${theme === th.id ? th.border : 'rgba(255,255,255,0.12)'}`,
                          borderRadius: 20, padding: '6px 10px', cursor: 'pointer', textAlign: 'left',
                          background: theme === th.id ? th.cardBg : 'rgba(255,255,255,0.08)',
                          color: theme === th.id ? '#3a0060' : 'rgba(255,255,255,0.55)',
                          boxShadow: theme === th.id ? `0 0 14px ${th.glow},0 2px 0 rgba(0,0,0,0.3)` : 'none',
                          outline: 'none',
                        }}
                      >
                        {th.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Item name input */}
              <div style={{ flexShrink: 0 }}>
                <p style={{ margin: '0 0 4px', fontFamily: ZEN, fontSize: '0.7rem', fontWeight: 900, color: 'rgba(255,255,255,0.55)' }}>アイテム名</p>
                <input
                  type="text"
                  value={cardName}
                  onChange={e => setCardName(e.target.value)}
                  placeholder="例：ピンクのフリルブラウス"
                  style={{
                    width: '100%', padding: '9px 12px', boxSizing: 'border-box',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1.5px solid rgba(255,80,190,0.4)', borderRadius: 10, outline: 'none',
                    fontFamily: ZEN, fontSize: '0.8rem', color: 'white',
                  }}
                />
              </div>

              {/* Brand input */}
              <div style={{ flexShrink: 0 }}>
                <p style={{ margin: '0 0 4px', fontFamily: ZEN, fontSize: '0.7rem', fontWeight: 900, color: 'rgba(255,255,255,0.55)' }}>ブランド</p>
                <input
                  type="text"
                  value={brand}
                  onChange={e => setBrand(e.target.value)}
                  placeholder="例：WEGO / SPINNS"
                  style={{
                    width: '100%', padding: '9px 12px', boxSizing: 'border-box',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1.5px solid rgba(255,80,190,0.4)', borderRadius: 10, outline: 'none',
                    fontFamily: ZEN, fontSize: '0.8rem', color: 'white',
                  }}
                />
              </div>

              {/* Category jewel buttons */}
              <div style={{ flexShrink: 0 }}>
                <p style={{ margin: '0 0 6px', fontFamily: ZEN, fontSize: '0.7rem', fontWeight: 900, color: 'rgba(255,255,255,0.55)' }}>カテゴリ</p>
                <div style={{ display: 'flex', gap: 5 }}>
                  {CATS.map(cat => (
                    <motion.button
                      key={cat.key}
                      whileTap={{ scale: 0.91, y: 2 }}
                      onClick={() => setCategory(cat.key)}
                      style={{
                        flex: 1, padding: '8px 2px', border: 'none', borderRadius: 10, cursor: 'pointer',
                        fontFamily: FREDOKA, fontSize: '0.62rem', fontWeight: 700,
                        background: category === cat.key
                          ? cat.grad
                          : 'linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.06))',
                        color: category === cat.key ? 'white' : 'rgba(255,255,255,0.45)',
                        boxShadow: category === cat.key
                          ? `0 0 14px ${cat.shadow},inset 0 0 0 1.5px rgba(255,255,255,0.22),0 3px 0 rgba(0,0,0,0.45)`
                          : 'inset 0 0 0 1px rgba(255,255,255,0.1)',
                        textShadow: category === cat.key ? '0 1px 2px rgba(0,0,0,0.6)' : 'none',
                        outline: 'none',
                      }}
                    >
                      {cat.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Tag chips */}
              <div style={{ flexShrink: 0 }}>
                <p style={{ margin: '0 0 6px', fontFamily: ZEN, fontSize: '0.7rem', fontWeight: 900, color: 'rgba(255,255,255,0.55)' }}>タグ</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {ALL_TAGS.map(tag => {
                    const active = selectedTags.includes(tag)
                    return (
                      <motion.button
                        key={tag}
                        whileTap={{ scale: 0.91 }}
                        onClick={() => toggleTag(tag)}
                        style={{
                          fontFamily: ZEN, fontSize: '0.7rem', fontWeight: 700,
                          border: 'none', borderRadius: 20, padding: '5px 11px', cursor: 'pointer',
                          background: active ? 'linear-gradient(135deg,#ff8fd8,#ff1493)' : 'rgba(255,255,255,0.1)',
                          color: active ? 'white' : 'rgba(255,255,255,0.5)',
                          boxShadow: active ? '0 0 10px rgba(255,20,147,0.55)' : 'none',
                          outline: 'none',
                        }}
                      >
                        {tag}
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Publish button — rainbow holoShimmer */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setStep(3)}
                style={{
                  flexShrink: 0,
                  width: '100%', padding: '16px', border: 'none', borderRadius: 16, cursor: 'pointer',
                  fontFamily: ZEN, fontSize: '1.05rem', fontWeight: 900, color: 'white',
                  background: 'linear-gradient(90deg,#ff1493 0%,#ff8fd8 14%,#d8a0ff 28%,#7eb6ff 42%,#00e5ff 56%,#00ff99 70%,#ffd700 84%,#ff1493 100%)',
                  backgroundSize: '300% 100%',
                  animation: 'holoShimmer 3s ease-in-out infinite',
                  boxShadow: '0 0 28px rgba(255,20,147,0.65),0 4px 0 rgba(80,0,40,0.8)',
                  textShadow: '0 1px 4px rgba(0,0,0,0.55)',
                  outline: 'none',
                  marginTop: 4,
                }}
              >
                ✨ カードを発行する！
              </motion.button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
