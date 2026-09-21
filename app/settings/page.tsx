'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Settings, Camera, Sparkles, Check, Upload, Search, X, Loader2 } from 'lucide-react'
import { compressImageToDataUrl } from '@/lib/cardStore'

/* ── constants (same as before) ── */
const BODY_TYPES = ['スリム', 'スタンダード', 'グラマー', 'ペティート', 'トール']
const PERSONAL_COLORS = [
  { key: 'spring', label: 'スプリング', emoji: '🌸', desc: '明るく暖かい',    gradient: 'from-yellow-300 to-orange-400' },
  { key: 'summer', label: 'サマー',     emoji: '🌊', desc: '涼しげソフト',    gradient: 'from-blue-300 to-purple-400'  },
  { key: 'autumn', label: 'オータム',   emoji: '🍂', desc: '深みがある暖色',  gradient: 'from-orange-400 to-red-500'   },
  { key: 'winter', label: 'ウィンター', emoji: '❄️', desc: 'クールでビビッド', gradient: 'from-indigo-400 to-blue-600'  },
]
const SKELETON_TYPES = ['ストレート', 'ウェーブ', 'ナチュラル']
const STYLE_PREFS = ['フェミニン', 'Y2K', 'カジュアル', 'ストリート', 'ナチュラル', 'エレガント', 'スポーティ', 'ガーリー']
const NG_STYLES = ['ミニスカNG', 'ノースリーブNG', '露出控えめ', 'ヒールNG', 'デコルテNG', 'ショーツNG']
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1)
const DAYS   = Array.from({ length: 31 }, (_, i) => i + 1)

function getZodiac(month: number, day: number): string {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return '♈ おひつじ座'
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return '♉ おうし座'
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return '♊ ふたご座'
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return '♋ かに座'
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return '♌ しし座'
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return '♍ おとめ座'
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return '♎ てんびん座'
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return '♏ さそり座'
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return '♐ いて座'
  if ((month === 12 && day >= 22) || (month === 1  && day <= 19)) return '♑ やぎ座'
  if ((month === 1  && day >= 20) || (month === 2  && day <= 18)) return '♒ みずがめ座'
  return '♓ うお座'
}

const SELECT_STYLE: React.CSSProperties = {
  background: 'rgba(255,255,255,0.14)',
  border: '1px solid rgba(255,255,255,0.22)',
  borderRadius: 12, padding: '10px 12px',
  color: 'white', fontSize: '0.875rem',
  outline: 'none', colorScheme: 'dark', flex: 1,
}

/* ── types ── */
interface DiagnosisResult {
  skeleton: string
  personalColor: string
  personalColorLabel: string
  description: string
  tips: string[]
}
interface RoleModelSuggestion {
  name: string
  description: string
  styleKeywords: string[]
}

/* ── PhotoArea ── reusable photo picker UI ── */
function PhotoArea({
  photo, onPhoto,
  cameraRef, uploadRef,
  emptyLabel = '写真を追加',
}: {
  photo: string | null
  onPhoto: (src: string) => void
  cameraRef: React.RefObject<HTMLInputElement | null>
  uploadRef: React.RefObject<HTMLInputElement | null>
  emptyLabel?: string
}) {
  const handleFile = useCallback((file: File) => {
    const reader = new FileReader()
    reader.onload = async e => {
      const raw = e.target?.result as string
      const compressed = await compressImageToDataUrl(raw, 600, 600, 0.8)
      onPhoto(compressed)
    }
    reader.readAsDataURL(file)
  }, [onPhoto])

  return (
    <div>
      {/* Hidden inputs */}
      <input ref={cameraRef} type="file" accept="image/*" capture="user"
        style={{ display: 'none' }}
        onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]) }}
      />
      <input ref={uploadRef} type="file" accept="image/*"
        style={{ display: 'none' }}
        onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]) }}
      />

      {/* Photo preview */}
      <div style={{
        position: 'relative', width: '100%', aspectRatio: '16/9',
        maxHeight: 160, borderRadius: 14, overflow: 'hidden',
        background: 'rgba(255,255,255,0.06)',
        border: photo ? '2px solid rgba(255,100,200,0.6)' : '2px dashed rgba(255,255,255,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 8,
      }}>
        {photo ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} alt="selected" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <button
              onClick={() => onPhoto('')}
              style={{
                position: 'absolute', top: 6, right: 6,
                width: 24, height: 24, borderRadius: '50%',
                background: 'rgba(0,0,0,0.6)', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={13} color="white" />
            </button>
          </>
        ) : (
          <div style={{ textAlign: 'center', opacity: 0.5 }}>
            <Camera size={28} color="white" style={{ margin: '0 auto 6px' }} />
            <p style={{ color: 'white', fontSize: '0.72rem', fontWeight: 700 }}>{emptyLabel}</p>
          </div>
        )}
      </div>

      {/* Camera / Upload buttons */}
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={() => cameraRef.current?.click()}
          className="flex-1 py-2.5 rounded-xl glass text-white/80 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-white/10 transition-all"
        >
          <Camera size={14} /> カメラで撮影
        </button>
        <button
          onClick={() => uploadRef.current?.click()}
          className="flex-1 py-2.5 rounded-xl glass text-white/80 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-white/10 transition-all"
        >
          <Upload size={14} /> 画像を選ぶ
        </button>
      </div>
    </div>
  )
}

/* ── main ── */
export default function SettingsPage() {
  const router = useRouter()

  /* existing state */
  const [bodyType,      setBodyType]      = useState('スタンダード')
  const [personalColor, setPersonalColor] = useState('spring')
  const [skeletonType,  setSkeletonType]  = useState('ウェーブ')
  const [stylePrefs,    setStylePrefs]    = useState<string[]>(['フェミニン', 'Y2K'])
  const [ngStyles,      setNgStyles]      = useState<string[]>([])
  const [roleModel,     setRoleModel]     = useState('')
  const [playerName,    setPlayerName]    = useState('')
  const [birthMonth,    setBirthMonth]    = useState<number | null>(null)
  const [birthDay,      setBirthDay]      = useState<number | null>(null)
  const [saved,         setSaved]         = useState(false)

  /* diagnosis state */
  const [diagPhoto,    setDiagPhoto]    = useState<string | null>(null)
  const [isAnalyzing,  setIsAnalyzing]  = useState(false)
  const [diagResult,   setDiagResult]   = useState<DiagnosisResult | null>(null)

  /* role model state */
  const [rmPhoto,         setRmPhoto]         = useState<string | null>(null)
  const [isSuggesting,    setIsSuggesting]    = useState(false)
  const [suggestions,     setSuggestions]     = useState<RoleModelSuggestion[]>([])
  const [isLearning,      setIsLearning]      = useState(false)
  const [roleModelInfo,   setRoleModelInfo]   = useState<RoleModelSuggestion | null>(null)

  /* refs */
  const diagCamRef    = useRef<HTMLInputElement>(null)
  const diagUpRef     = useRef<HTMLInputElement>(null)
  const rmCamRef      = useRef<HTMLInputElement>(null)
  const rmUpRef       = useRef<HTMLInputElement>(null)

  const togglePref = (p: string) =>
    setStylePrefs(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])
  const toggleNG = (n: string) =>
    setNgStyles(prev => prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n])

  /* ── handlers ── */
  const handleAnalyze = async () => {
    if (!diagPhoto || isAnalyzing) return
    setIsAnalyzing(true)
    setDiagResult(null)
    try {
      const res = await fetch('/api/analyze-body', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: diagPhoto }),
      })
      const data = await res.json() as DiagnosisResult
      setDiagResult(data)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const applyDiagResult = () => {
    if (!diagResult) return
    setSkeletonType(diagResult.skeleton)
    setPersonalColor(diagResult.personalColor)
  }

  const handleLearnRoleModel = async () => {
    if (!roleModel.trim() || isLearning) return
    setIsLearning(true)
    setRoleModelInfo(null)
    try {
      const res = await fetch('/api/search-role-model', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: roleModel }),
      })
      const data = await res.json() as RoleModelSuggestion
      setRoleModelInfo(data)
    } finally {
      setIsLearning(false)
    }
  }

  const handleSuggestRoleModel = async () => {
    if (!rmPhoto || isSuggesting) return
    setIsSuggesting(true)
    setSuggestions([])
    try {
      const res = await fetch('/api/suggest-role-model', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: rmPhoto }),
      })
      const data = await res.json() as { suggestions: RoleModelSuggestion[] }
      setSuggestions(data.suggestions)
    } finally {
      setIsSuggesting(false)
    }
  }

  const setAsRoleModel = (s: RoleModelSuggestion) => {
    setRoleModel(s.name)
    setRoleModelInfo(s)
    setSuggestions([])
  }

  const handleSave = async () => {
    setSaved(true)
    await new Promise(r => setTimeout(r, 1500))
    router.push('/')
  }

  const zodiac = birthMonth && birthDay ? getZodiac(birthMonth, birthDay) : null

  return (
    <div className="min-h-screen flex flex-col">

      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-4 pb-2">
        <button onClick={() => router.push('/')} className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">ホーム</span>
        </button>
        <div className="text-center">
          <h1 className="text-base font-black text-white flex items-center gap-1.5">
            <Settings className="w-4 h-4 text-white/70" />
            マイパーソナライズ設定
          </h1>
        </div>
        <div className="w-16" />
      </header>

      <div className="flex-1 px-4 pb-8 flex flex-col gap-5">

        {/* ── 体型 ── */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <p className="text-white/60 text-xs font-bold mb-2 uppercase tracking-widest flex items-center gap-1.5">
            <span className="text-sm">💎</span> 体型
          </p>
          <div className="flex gap-2 flex-wrap">
            {BODY_TYPES.map(bt => (
              <button key={bt} onClick={() => setBodyType(bt)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  bodyType === bt
                    ? 'bg-pink-500/80 text-white shadow-lg shadow-pink-500/30'
                    : 'glass text-white/60 hover:text-white hover:bg-white/10'
                }`}>{bt}</button>
            ))}
          </div>
        </motion.div>

        {/* ── パーソナルカラー ── */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.10 }}>
          <p className="text-white/60 text-xs font-bold mb-2 uppercase tracking-widest flex items-center gap-1.5">
            <span className="text-sm">💎</span> パーソナルカラー
          </p>
          <div className="grid grid-cols-2 gap-2">
            {PERSONAL_COLORS.map(pc => (
              <button key={pc.key} onClick={() => setPersonalColor(pc.key)}
                className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${
                  personalColor === pc.key ? 'ring-2 ring-white/50 bg-white/10' : 'glass hover:bg-white/10'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${pc.gradient} flex items-center justify-center text-xl flex-shrink-0`}>{pc.emoji}</div>
                <div className="text-left">
                  <p className="text-white font-bold text-sm">{pc.label}</p>
                  <p className="text-white/40 text-xs">{pc.desc}</p>
                </div>
                {personalColor === pc.key && <Check className="w-4 h-4 text-white ml-auto flex-shrink-0" />}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── 顔タイプ・骨格 + AI診断 ── */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.13 }}>
          <p className="text-white/60 text-xs font-bold mb-2 uppercase tracking-widest flex items-center gap-1.5">
            <span className="text-sm">✨</span> 顔タイプ・骨格
          </p>

          {/* Manual selector */}
          <div className="flex gap-2 flex-wrap mb-4">
            {SKELETON_TYPES.map(st => (
              <button key={st} onClick={() => setSkeletonType(st)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  skeletonType === st
                    ? 'bg-pink-500/80 text-white shadow-lg shadow-pink-500/30'
                    : 'glass text-white/60 hover:text-white hover:bg-white/10'
                }`}>{st}</button>
            ))}
          </div>

          {/* AI diagnosis card */}
          <div className="glass rounded-2xl p-4 flex flex-col gap-3">
            <p className="text-white/70 text-xs font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              AI骨格・パーソナルカラー診断
            </p>

            <PhotoArea
              photo={diagPhoto}
              onPhoto={v => { setDiagPhoto(v || null); setDiagResult(null) }}
              cameraRef={diagCamRef}
              uploadRef={diagUpRef}
              emptyLabel="自撮り・全身写真を追加"
            />

            <button
              onClick={handleAnalyze}
              disabled={!diagPhoto || isAnalyzing}
              className="w-full py-3 rounded-2xl btn-glow-pink text-white font-black text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <><Loader2 className="w-4 h-4 animate-spin" />解析中…</>
              ) : (
                <><Sparkles className="w-4 h-4" />AIで骨格・パーソナルカラーを診断する</>
              )}
            </button>

            <AnimatePresence>
              {diagResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                  className="glass-holo rounded-2xl p-4 flex flex-col gap-3"
                >
                  <div className="flex items-start gap-2">
                    <span className="text-2xl flex-shrink-0">🤖</span>
                    <p className="text-white/85 text-sm font-medium leading-relaxed">{diagResult.description}</p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {diagResult.tips.map(tip => (
                      <span key={tip} className="text-xs px-2.5 py-1 rounded-full glass text-white/70">{tip}</span>
                    ))}
                  </div>
                  <button
                    onClick={applyDiagResult}
                    className="w-full py-2.5 rounded-xl btn-glow-purple text-white font-black text-sm flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />この診断結果を設定に反映する
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── 好みスタイル ── */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <p className="text-white/60 text-xs font-bold mb-2 uppercase tracking-widest flex items-center gap-1.5">
            <span className="text-sm">💎</span> 好みスタイル（複数選択可）
          </p>
          <div className="flex flex-wrap gap-2">
            {STYLE_PREFS.map(pref => (
              <button key={pref} onClick={() => togglePref(pref)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  stylePrefs.includes(pref)
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                    : 'glass text-white/60 hover:text-white hover:bg-white/10'
                }`}>{pref}</button>
            ))}
          </div>
        </motion.div>

        {/* ── NG・避けたいスタイル ── */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
          <p className="text-white/60 text-xs font-bold mb-2 uppercase tracking-widest flex items-center gap-1.5">
            <span className="text-sm">✨</span> NG・避けたいスタイル（複数選択可）
          </p>
          <div className="flex flex-wrap gap-2">
            {NG_STYLES.map(ng => (
              <button key={ng} onClick={() => toggleNG(ng)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  ngStyles.includes(ng)
                    ? 'bg-gradient-to-r from-rose-600/75 to-pink-600/75 text-white shadow-md ring-1 ring-rose-400/50'
                    : 'glass text-white/60 hover:text-white hover:bg-white/10'
                }`}>{ng}</button>
            ))}
          </div>
        </motion.div>

        {/* ── ロールモデル ── */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.20 }}>
          <p className="text-white/60 text-xs font-bold mb-2 uppercase tracking-widest flex items-center gap-1.5">
            <span className="text-sm">💎</span> ロールモデル
          </p>

          {/* Text input + Learn button */}
          <div className="flex gap-2 mb-2">
            <input
              type="text" value={roleModel} onChange={e => setRoleModel(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleLearnRoleModel() }}
              placeholder="芸能人・インフルエンサー名を入力"
              className="flex-1 px-4 py-3 rounded-xl glass text-white placeholder-white/30 outline-none border border-white/10 focus:border-pink-500/50 text-sm"
            />
            <button
              onClick={handleLearnRoleModel}
              disabled={!roleModel.trim() || isLearning}
              className="px-4 py-3 rounded-xl btn-glow-pink text-white font-black text-sm flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isLearning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              学習
            </button>
          </div>

          {/* Role model info card (after learning) */}
          <AnimatePresence>
            {roleModelInfo && (
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                className="mb-4 glass-holo rounded-2xl p-4"
              >
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-xl flex-shrink-0">🤖</span>
                  <div>
                    <p className="text-white font-black text-sm mb-1">「{roleModelInfo.name}」を学習しました</p>
                    <p className="text-white/75 text-xs leading-relaxed">{roleModelInfo.description}</p>
                  </div>
                </div>
                <div className="flex gap-1.5 flex-wrap mt-2">
                  {roleModelInfo.styleKeywords.map(kw => (
                    <span key={kw} className="text-xs px-2 py-0.5 rounded-full bg-pink-500/25 text-pink-200 border border-pink-400/30">{kw}</span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Photo lookalike search */}
          <div className="glass rounded-2xl p-4 flex flex-col gap-3">
            <p className="text-white/70 text-xs font-bold flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-pink-400" />
              写真から似ているロールモデルをAIが提案
            </p>
            <p className="text-white/40 text-xs -mt-1">自撮り写真を送ると、雰囲気が似ている芸能人・インフルエンサーを提案します</p>

            <PhotoArea
              photo={rmPhoto}
              onPhoto={v => { setRmPhoto(v || null); setSuggestions([]) }}
              cameraRef={rmCamRef}
              uploadRef={rmUpRef}
              emptyLabel="自撮り写真を追加"
            />

            <button
              onClick={handleSuggestRoleModel}
              disabled={!rmPhoto || isSuggesting}
              className="w-full py-3 rounded-2xl btn-glow-pink text-white font-black text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isSuggesting ? (
                <><Loader2 className="w-4 h-4 animate-spin" />提案を生成中…</>
              ) : (
                <><Sparkles className="w-4 h-4" />似ているロールモデルを提案してもらう</>
              )}
            </button>

            {/* Suggestion cards */}
            <AnimatePresence>
              {suggestions.length > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-3">
                  <p className="text-white/60 text-xs font-bold text-center">✨ あなたに似ているかも！</p>
                  {suggestions.map((s, i) => (
                    <motion.div
                      key={s.name}
                      initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="glass rounded-2xl p-3 flex flex-col gap-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                            {s.name[0]}
                          </div>
                          <div className="min-w-0">
                            <p className="text-white font-black text-sm truncate">{s.name}</p>
                            <p className="text-white/55 text-xs leading-snug">{s.description}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setAsRoleModel(s)}
                          className="flex-shrink-0 px-3 py-1.5 rounded-xl btn-glow-pink text-white font-black text-xs"
                        >
                          セット
                        </button>
                      </div>
                      <div className="flex gap-1.5 flex-wrap">
                        {s.styleKeywords.map(kw => (
                          <span key={kw} className="text-xs px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-200 border border-pink-400/25">{kw}</span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── プレイヤープロフィール ── */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.23 }}>
          <p className="text-white/60 text-xs font-bold mb-3 uppercase tracking-widest flex items-center gap-1.5">
            <span className="text-sm">✨</span> プレイヤープロフィール（カード反映用）
          </p>
          <div className="mb-3">
            <p className="text-white/45 text-xs font-medium mb-1.5">プレイヤー名</p>
            <input type="text" value={playerName} onChange={e => setPlayerName(e.target.value)}
              placeholder="例: ゆめちゃん"
              className="w-full px-4 py-3 rounded-xl glass text-white placeholder-white/30 outline-none border border-white/10 focus:border-pink-500/50 text-sm"
            />
          </div>
          <div>
            <p className="text-white/45 text-xs font-medium mb-1.5">誕生日・星座</p>
            <div className="flex gap-2">
              <select value={birthMonth ?? ''} onChange={e => setBirthMonth(e.target.value ? Number(e.target.value) : null)} style={SELECT_STYLE}>
                <option value="">月</option>
                {MONTHS.map(m => <option key={m} value={m} style={{ background: '#1a0035' }}>{m}月</option>)}
              </select>
              <select value={birthDay ?? ''} onChange={e => setBirthDay(e.target.value ? Number(e.target.value) : null)} style={SELECT_STYLE}>
                <option value="">日</option>
                {DAYS.map(d => <option key={d} value={d} style={{ background: '#1a0035' }}>{d}日</option>)}
              </select>
            </div>
            {zodiac && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="mt-2 glass rounded-2xl py-2.5 px-4 flex items-center justify-center gap-2"
              >
                <span className="text-lg">⭐</span>
                <p className="text-white font-black text-sm">{zodiac}</p>
              </motion.div>
            )}
            <p className="text-white/30 text-xs mt-2 pl-0.5">
              ※ カード発行時やバインダーのステータスに反映されます
            </p>
          </div>
        </motion.div>

        {/* ── 保存 ── */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}>
          <button onClick={handleSave} disabled={saved}
            className="w-full py-4 rounded-2xl btn-glow-gold text-white font-black text-base flex items-center justify-center gap-2"
          >
            {saved
              ? <><Check className="w-5 h-5" /> 保存しました！</>
              : <><Sparkles className="w-5 h-5" /> 設定を保存する</>
            }
          </button>
        </motion.div>

      </div>
    </div>
  )
}
