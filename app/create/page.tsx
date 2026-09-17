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
]

const CATS = [
  { key: 'tops',    label: 'TOPS', activeGrad: 'linear-gradient(180deg,#ffd0d8,#ff5878 40%,#d01838 80%,#980030 100%)', activeShadow: '#d01030', pastelBorder: '#ff8099', pastelText: '#c01038' },
  { key: 'bottoms', label: 'BTMS', activeGrad: 'linear-gradient(180deg,#d0d8ff,#6080f0 40%,#3050c0 80%,#1030a0 100%)', activeShadow: '#2040b0', pastelBorder: '#8099ff', pastelText: '#2040a0' },
  { key: 'shoes',   label: 'SHOE', activeGrad: 'linear-gradient(180deg,#d0ffd8,#40c860 40%,#209040 80%,#106020 100%)', activeShadow: '#107030', pastelBorder: '#60c878', pastelText: '#107030' },
  { key: 'cosme',   label: 'CSME', activeGrad: 'linear-gradient(180deg,#ffd0f8,#e060c8 40%,#b020a0 80%,#800080 100%)', activeShadow: '#900070', pastelBorder: '#e080c8', pastelText: '#900070' },
  { key: 'bag',     label: 'BAG',  activeGrad: 'linear-gradient(180deg,#fff0d0,#f0b040 40%,#c07010 80%,#904000 100%)', activeShadow: '#804000', pastelBorder: '#e0a040', pastelText: '#804000' },
]

const ALL_TAGS = ['#PINK', '#フリル', '#量産型', '#Y2K', '#ギャル', '#清楚系', '#ラベンダー', '#ホワイト', '#オルチャン', '#盛り', '#ゆめかわ', '#V系']

const CORNER_DEFS: [boolean, boolean][] = [[true, true], [true, false], [false, true], [false, false]]

const SPARKS = [
  { sym: '✨', dx: 130, dy: -15, size: 24, delay: 0 },
  { sym: '⭐', dx: 100, dy: 105, size: 20, delay: 0.04 },
  { sym: '💫', dx: -15, dy: 135, size: 22, delay: 0.07 },
  { sym: '✦',  dx: -125, dy: 85, size: 18, delay: 0.10 },
  { sym: '★',  dx: -140, dy: -20, size: 20, delay: 0.12 },
  { sym: '💕', dx: -105, dy: -110, size: 22, delay: 0.05 },
  { sym: '✨', dx: 25, dy: -145, size: 26, delay: 0.08 },
  { sym: '⭐', dx: 125, dy: -85, size: 18, delay: 0.02 },
  { sym: '💫', dx: 85, dy: 125, size: 20, delay: 0.14 },
  { sym: '✦',  dx: -55, dy: 145, size: 16, delay: 0.09 },
  { sym: '★',  dx: -140, dy: 55, size: 22, delay: 0.11 },
  { sym: '💗', dx: 55, dy: -135, size: 24, delay: 0.06 },
]

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

      {/* ═══ Inner container — yumekawa fancy bg ═══ */}
      <div style={{
        position: 'relative', height: '100dvh', maxWidth: 430, margin: '0 auto',
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        backgroundColor: '#fce8f8',
        backgroundImage: [
          'radial-gradient(circle,rgba(255,140,210,0.28) 1.5px,transparent 1.5px)',
          'radial-gradient(ellipse at 25% 15%,rgba(255,210,240,0.65) 0%,transparent 42%)',
          'radial-gradient(ellipse at 78% 88%,rgba(208,178,255,0.6) 0%,transparent 42%)',
          'linear-gradient(135deg,#fde4f8 0%,#f0e4ff 48%,#ffe8f8 100%)',
        ].join(','),
        backgroundSize: '20px 20px,100% 100%,100% 100%,100% 100%',
      }}>

        {/* ── STEP 3: Card ejection overlay ── */}
        <AnimatePresence>
          {step === 3 && (
            <motion.div key="step3"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{
                position: 'absolute', inset: 0, zIndex: 50,
                background: 'rgba(6,0,18,0.97)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {/* 排出口 — toy plastic gold */}
              <div style={{
                position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                width: 170, height: 32,
                background: 'linear-gradient(180deg,#fff8c0 0%,#ffd700 26%,#e0a000 52%,#c88000 76%,#ffd700 100%)',
                borderRadius: '0 0 20px 20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 6px 22px rgba(255,215,0,0.8),inset 0 2px 5px rgba(255,255,255,0.7),inset 0 -2px 4px rgba(0,0,0,0.2)',
              }}>
                <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 9, height: 9, borderRadius: '50%', background: 'radial-gradient(circle at 33% 28%,#fff8c0,#b08000)', boxShadow: '0 1px 3px rgba(0,0,0,0.35)' }} />
                <div style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', width: 9, height: 9, borderRadius: '50%', background: 'radial-gradient(circle at 33% 28%,#fff8c0,#b08000)', boxShadow: '0 1px 3px rgba(0,0,0,0.35)' }} />
                <div style={{ position: 'absolute', bottom: 6, left: 30, right: 30, height: 3, background: 'rgba(0,0,0,0.22)', borderRadius: 2 }} />
                <span style={{ fontFamily: FREDOKA, fontSize: '0.68rem', fontWeight: 700, color: '#3a2000', letterSpacing: 3, textShadow: '0 1px 1px rgba(255,255,255,0.7)' }}>排 出 口</span>
              </div>

              {/* Ejected card */}
              <motion.div
                initial={{ y: '-70vh', rotateY: 180, scale: 0.4, opacity: 0 }}
                animate={{ y: 0, rotateY: 0, scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 90, damping: 14, delay: 0.25 }}
                onAnimationComplete={() => setIssued(true)}
                style={{
                  width: 190, aspectRatio: '2/3', borderRadius: 18,
                  background: currentTheme.cardBg,
                  border: `3px solid ${currentTheme.border}`,
                  boxShadow: `0 0 36px ${currentTheme.glow},0 20px 60px rgba(0,0,0,0.7)`,
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

              {/* Sparkle burst + success */}
              <AnimatePresence>
                {issued && (
                  <>
                    {SPARKS.map((s, i) => (
                      <motion.div key={`sp-${i}`}
                        initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                        animate={{ opacity: 0, x: s.dx, y: s.dy, scale: 0 }}
                        transition={{ duration: 0.75, delay: s.delay, ease: 'easeOut' }}
                        style={{ position: 'absolute', fontSize: s.size, userSelect: 'none', pointerEvents: 'none' }}
                      >{s.sym}</motion.div>
                    ))}
                    <motion.div
                      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, type: 'spring', stiffness: 220 }}
                      style={{ marginTop: 28, textAlign: 'center', padding: '0 24px' }}
                    >
                      <p style={{ fontFamily: FREDOKA, fontSize: '1.45rem', fontWeight: 700, color: 'white', margin: '0 0 6px', textShadow: '0 0 24px rgba(255,150,200,0.95),0 0 8px rgba(255,20,147,0.8)' }}>
                        💗 カード発行完了！
                      </p>
                      <p style={{ fontFamily: ZEN, fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)', margin: '0 0 22px' }}>
                        MY BINDER に保存しました！
                      </p>
                      <motion.button whileTap={{ scale: 0.95 }} onClick={() => router.push('/binder')} style={{
                        fontFamily: ZEN, fontSize: '1rem', fontWeight: 900, color: 'white',
                        background: 'linear-gradient(180deg,#ff8fd8,#ff1493 50%,#b8004a 100%)',
                        border: 'none', borderRadius: 40, padding: '13px 44px',
                        boxShadow: '0 0 28px rgba(255,20,147,0.75),0 4px 0 #6a0030', cursor: 'pointer',
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
              <span style={{ fontFamily: ZEN, fontSize: '0.8rem', color: 'rgba(180,60,120,0.8)', fontWeight: 700 }}>← 戻る</span>
            </motion.button>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {[1, 2].map(s => (
                <div key={s} style={{
                  width: s === step ? 24 : 8, height: 8, borderRadius: 4, transition: 'all 0.3s',
                  background: s === step ? '#ff1493' : 'rgba(255,100,180,0.3)',
                  boxShadow: s === step ? '0 0 8px rgba(255,20,147,0.7)' : 'none',
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
              {/* Puffy balloon title */}
              <p style={{
                fontFamily: FREDOKA, fontSize: 'clamp(0.9rem,5vw,1.2rem)', fontWeight: 700,
                margin: 0, color: '#ff1493', letterSpacing: 2,
                WebkitTextStroke: '2.5px white', paintOrder: 'stroke fill',
                filter: 'drop-shadow(0 2.5px 0 #cc0066) drop-shadow(0 0 10px rgba(255,20,147,0.35))',
              } as React.CSSProperties}>
                ✨ NEW CARD CREATOR
              </p>

              {/* Camera viewfinder — bright pink */}
              <div style={{
                position: 'relative', width: '78%', aspectRatio: '3/4', flexShrink: 0,
                background: 'linear-gradient(135deg,#ffe0f5,#ffb8e8,#ffd0f0)',
                borderRadius: 18, overflow: 'hidden',
                border: '3px solid rgba(255,215,0,0.92)',
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.65),0 6px 20px rgba(255,100,180,0.35)',
              }}>
                {/* Subtle white scan lines */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 4px,rgba(255,255,255,0.22) 4px,rgba(255,255,255,0.22) 5px)' }} />
                {/* Targeting rings */}
                {[80, 120].map((sz, ri) => (
                  <div key={ri} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: sz, height: sz, borderRadius: '50%', border: `1.5px solid rgba(255,215,0,${ri === 0 ? 0.75 : 0.4})`, zIndex: 3, pointerEvents: 'none' }} />
                ))}
                {/* Crosshair */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', width: 26, height: 2, background: 'rgba(255,215,0,0.82)', transform: 'translate(-50%,-50%)', zIndex: 3 }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', width: 2, height: 26, background: 'rgba(255,215,0,0.82)', transform: 'translate(-50%,-50%)', zIndex: 3 }} />
                {/* Corner jewel brackets */}
                {CORNER_DEFS.map(([isTop, isLeft], ci) => (
                  <div key={ci} style={{ position: 'absolute', zIndex: 4, top: isTop ? 10 : 'auto', bottom: isTop ? 'auto' : 10, left: isLeft ? 10 : 'auto', right: isLeft ? 'auto' : 10, width: 30, height: 30 }}>
                    <div style={{
                      position: 'absolute', inset: 0,
                      borderTop:    isTop    ? '3px solid rgba(255,215,0,0.95)' : 'none',
                      borderBottom: isTop    ? 'none' : '3px solid rgba(255,215,0,0.95)',
                      borderLeft:   isLeft   ? '3px solid rgba(255,215,0,0.95)' : 'none',
                      borderRight:  isLeft   ? 'none' : '3px solid rgba(255,215,0,0.95)',
                      borderTopLeftRadius:     isTop  && isLeft  ? 7 : 0,
                      borderTopRightRadius:    isTop  && !isLeft ? 7 : 0,
                      borderBottomLeftRadius:  !isTop && isLeft  ? 7 : 0,
                      borderBottomRightRadius: !isTop && !isLeft ? 7 : 0,
                    }} />
                    <div style={{
                      position: 'absolute',
                      top: isTop ? -9 : 'auto', bottom: isTop ? 'auto' : -9,
                      left: isLeft ? -9 : 'auto', right: isLeft ? 'auto' : -9,
                      width: 18, height: 18, borderRadius: '50%',
                      background: 'radial-gradient(circle at 38% 28%,#ff80d0,#ff1493 60%,#7a0040)',
                      boxShadow: '0 0 8px rgba(255,20,147,0.85),0 0 0 2px rgba(255,255,255,0.55)',
                    }} />
                  </div>
                ))}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/img/dress.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', opacity: 0.5, zIndex: 1 }} />
                <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', background: 'rgba(255,255,255,0.78)', borderRadius: 20, padding: '3px 14px', zIndex: 5 }}>
                  <span style={{ fontFamily: FREDOKA, fontSize: '0.62rem', color: '#cc3388', letterSpacing: 1.5 }}>DEMO MODE</span>
                </div>
              </div>

              {/* Shutter + floating decorations */}
              <div style={{ position: 'relative', flexShrink: 0, width: 120, height: 96, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.span animate={{ rotate: [0,15,-10,5,0], scale: [1,1.25,0.9,1.1,1] }} transition={{ duration: 2.4, repeat: Infinity }}
                  style={{ position: 'absolute', top: 0, left: 4, fontSize: 18, userSelect: 'none', pointerEvents: 'none' }}>⭐</motion.span>
                <motion.span animate={{ rotate: [0,-12,8,0], y: [0,-5,2,0] }} transition={{ duration: 2, repeat: Infinity }}
                  style={{ position: 'absolute', top: 2, right: 2, fontSize: 16, userSelect: 'none', pointerEvents: 'none' }}>💗</motion.span>
                <motion.span animate={{ scale: [1,1.35,0.85,1.1,1], opacity: [0.8,1,0.6,1,0.8] }} transition={{ duration: 2.8, repeat: Infinity }}
                  style={{ position: 'absolute', bottom: 4, left: 2, fontSize: 14, userSelect: 'none', pointerEvents: 'none' }}>✨</motion.span>
                <motion.span animate={{ rotate: [0,20,-15,5,0] }} transition={{ duration: 3, repeat: Infinity }}
                  style={{ position: 'absolute', bottom: 2, right: 4, fontSize: 16, userSelect: 'none', pointerEvents: 'none' }}>💕</motion.span>
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1, transition: { delay: 0.2, type: 'spring', stiffness: 200 } }}
                  whileTap={{ scale: 0.88 }}
                  onClick={handleShutter}
                  style={{
                    width: 76, height: 76, borderRadius: '50%', border: 'none', cursor: 'pointer',
                    background: 'radial-gradient(circle at 38% 28%,#ff80d0,#ff1493 55%,#8a0050 85%,#4a0028 100%)',
                    boxShadow: '0 0 0 5px rgba(255,255,255,0.65),0 0 0 9px rgba(255,20,147,0.22),0 0 30px rgba(255,20,147,0.6),0 5px 0 #3a0020',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <div style={{ width: 54, height: 54, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.45)', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
                  </div>
                </motion.button>
              </div>

              <p style={{ fontFamily: ZEN, fontSize: '0.72rem', color: 'rgba(180,60,120,0.7)', margin: 0, fontWeight: 700 }}>
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
              <p style={{
                fontFamily: FREDOKA, fontSize: '1.05rem', fontWeight: 700, color: '#d0208a', margin: 0, textAlign: 'center', flexShrink: 0,
                WebkitTextStroke: '1.5px white', paintOrder: 'stroke fill',
                filter: 'drop-shadow(0 2px 0 #a00060)',
              } as React.CSSProperties}>
                ✦ カードを編集 ✦
              </p>

              {/* Card preview — centered */}
              <div style={{ display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{
                  width: 100, aspectRatio: '2/3', borderRadius: 14, position: 'relative', overflow: 'hidden',
                  background: currentTheme.cardBg,
                  border: `3px solid ${currentTheme.border}`,
                  boxShadow: `0 0 22px ${currentTheme.glow},0 4px 12px rgba(0,0,0,0.15)`,
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/img/dress.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/img/Card_Frame.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', top: 6, right: 6, background: 'linear-gradient(135deg,#ff1493,#c040e0)', borderRadius: 20, padding: '2px 6px' }}>
                    <span style={{ fontFamily: FREDOKA, fontSize: '0.5rem', fontWeight: 700, color: 'white' }}>AI CUT ✦</span>
                  </div>
                </div>
              </div>

              {/* Theme — horizontal jewel buttons, selected = gold glow */}
              <div style={{ flexShrink: 0 }}>
                <p style={{ margin: '0 0 6px', fontFamily: ZEN, fontSize: '0.72rem', fontWeight: 900, color: '#b040a0' }}>✦ テーマ</p>
                <div style={{ display: 'flex', gap: 7 }}>
                  {THEMES.map(th => {
                    const sel = theme === th.id
                    return (
                      <motion.button key={th.id} whileTap={{ scale: 0.91, y: 2 }} onClick={() => setTheme(th.id)} style={{
                        flex: 1, padding: '10px 4px', borderRadius: 14, cursor: 'pointer', outline: 'none',
                        fontFamily: ZEN, fontSize: '0.72rem', fontWeight: 900,
                        background: sel
                          ? 'linear-gradient(180deg,#fff8c0 0%,#ffd700 28%,#e0a000 55%,#c88000 78%,#ffd700 100%)'
                          : th.btnBg,
                        color: sel ? '#3a2000' : 'white',
                        border: sel ? '2px solid rgba(255,215,0,0.85)' : '1.5px solid rgba(255,255,255,0.2)',
                        boxShadow: sel
                          ? '0 0 20px rgba(255,215,0,0.9),inset 0 2px 5px rgba(255,255,255,0.65),0 3px 0 rgba(100,60,0,0.6)'
                          : `inset 0 2px 4px rgba(255,255,255,0.4),0 3px 0 ${th.btnShadow}`,
                        textShadow: sel ? '0 1px 2px rgba(255,255,255,0.5)' : '0 1px 2px rgba(0,0,0,0.5)',
                      }}>
                        {th.label}
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Item name input — white bg + pink border */}
              <div style={{ flexShrink: 0 }}>
                <p style={{ margin: '0 0 4px', fontFamily: ZEN, fontSize: '0.72rem', fontWeight: 900, color: '#b040a0' }}>✦ アイテム名</p>
                <input type="text" value={cardName} onChange={e => setCardName(e.target.value)} placeholder="例：ピンクのフリルブラウス"
                  style={{ width: '100%', padding: '10px 14px', boxSizing: 'border-box', background: 'white', border: '3px solid #ff69b4', borderRadius: 14, outline: 'none', fontFamily: ZEN, fontSize: '0.82rem', color: '#3a0060', boxShadow: '0 3px 0 #cc3377,0 5px 16px rgba(255,100,180,0.18)' }}
                />
              </div>

              {/* Brand input */}
              <div style={{ flexShrink: 0 }}>
                <p style={{ margin: '0 0 4px', fontFamily: ZEN, fontSize: '0.72rem', fontWeight: 900, color: '#b040a0' }}>✦ ブランド</p>
                <input type="text" value={brand} onChange={e => setBrand(e.target.value)} placeholder="例：WEGO / SPINNS"
                  style={{ width: '100%', padding: '10px 14px', boxSizing: 'border-box', background: 'white', border: '3px solid #ff69b4', borderRadius: 14, outline: 'none', fontFamily: ZEN, fontSize: '0.82rem', color: '#3a0060', boxShadow: '0 3px 0 #cc3377,0 5px 16px rgba(255,100,180,0.18)' }}
                />
              </div>

              {/* Category — white + pastel puffy capsule */}
              <div style={{ flexShrink: 0 }}>
                <p style={{ margin: '0 0 6px', fontFamily: ZEN, fontSize: '0.72rem', fontWeight: 900, color: '#b040a0' }}>✦ カテゴリ</p>
                <div style={{ display: 'flex', gap: 5 }}>
                  {CATS.map(cat => {
                    const sel = category === cat.key
                    return (
                      <motion.button key={cat.key} whileTap={{ scale: 0.91, y: 2 }} onClick={() => setCategory(cat.key)} style={{
                        flex: 1, padding: '9px 2px', borderRadius: 10, cursor: 'pointer', outline: 'none',
                        fontFamily: FREDOKA, fontSize: '0.62rem', fontWeight: 700,
                        background: sel ? cat.activeGrad : 'white',
                        color: sel ? 'white' : cat.pastelText,
                        border: sel ? 'none' : `2px solid ${cat.pastelBorder}`,
                        boxShadow: sel
                          ? `0 0 12px ${cat.activeShadow}80,inset 0 2px 3px rgba(255,255,255,0.3),0 3px 0 ${cat.activeShadow}`
                          : `0 3px 0 ${cat.pastelBorder},inset 0 2px 3px rgba(255,255,255,0.8)`,
                        textShadow: sel ? '0 1px 2px rgba(0,0,0,0.5)' : 'none',
                      }}>
                        {cat.label}
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Tags — white + pastel capsule */}
              <div style={{ flexShrink: 0 }}>
                <p style={{ margin: '0 0 6px', fontFamily: ZEN, fontSize: '0.72rem', fontWeight: 900, color: '#b040a0' }}>✦ タグ</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {ALL_TAGS.map(tag => {
                    const active = selectedTags.includes(tag)
                    return (
                      <motion.button key={tag} whileTap={{ scale: 0.91 }} onClick={() => toggleTag(tag)} style={{
                        fontFamily: ZEN, fontSize: '0.7rem', fontWeight: 700, borderRadius: 20, padding: '5px 11px', cursor: 'pointer', outline: 'none',
                        background: active ? 'linear-gradient(135deg,#ff8fd8,#ff1493)' : 'white',
                        color: active ? 'white' : '#b040a0',
                        border: active ? 'none' : '2px solid rgba(255,150,220,0.55)',
                        boxShadow: active ? '0 0 10px rgba(255,20,147,0.55),0 2px 0 #cc006b' : '0 2px 0 rgba(220,140,200,0.4)',
                      }}>
                        {tag}
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Publish — rainbow holoShimmer */}
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => setStep(3)} style={{
                flexShrink: 0, width: '100%', padding: '16px', border: 'none', borderRadius: 16, cursor: 'pointer', outline: 'none', marginTop: 4,
                fontFamily: ZEN, fontSize: '1.05rem', fontWeight: 900, color: 'white',
                background: 'linear-gradient(90deg,#ff1493 0%,#ff8fd8 14%,#d8a0ff 28%,#7eb6ff 42%,#00e5ff 56%,#00ff99 70%,#ffd700 84%,#ff1493 100%)',
                backgroundSize: '300% 100%',
                animation: 'holoShimmer 3s ease-in-out infinite',
                boxShadow: '0 0 28px rgba(255,20,147,0.5),0 4px 0 rgba(180,0,80,0.65)',
                textShadow: '0 1px 4px rgba(0,0,0,0.4)',
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
