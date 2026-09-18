'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Settings, Camera, Sparkles, Check } from 'lucide-react'

const BODY_TYPES = ['スリム', 'スタンダード', 'グラマー', 'ペティート', 'トール']

const PERSONAL_COLORS = [
  { key: 'spring', label: 'スプリング', emoji: '🌸', desc: '明るく暖かい',   gradient: 'from-yellow-300 to-orange-400' },
  { key: 'summer', label: 'サマー',     emoji: '🌊', desc: '涼しげソフト',   gradient: 'from-blue-300 to-purple-400' },
  { key: 'autumn', label: 'オータム',   emoji: '🍂', desc: '深みがある暖色', gradient: 'from-orange-400 to-red-500' },
  { key: 'winter', label: 'ウィンター', emoji: '❄️', desc: 'クールでビビッド',gradient: 'from-indigo-400 to-blue-600' },
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

/* ── shared select style ── */
const SELECT_STYLE: React.CSSProperties = {
  background: 'rgba(255,255,255,0.14)',
  border: '1px solid rgba(255,255,255,0.22)',
  borderRadius: 12,
  padding: '10px 12px',
  color: 'white',
  fontSize: '0.875rem',
  outline: 'none',
  colorScheme: 'dark',
  flex: 1,
}

export default function SettingsPage() {
  const router = useRouter()

  const [bodyType,           setBodyType]           = useState('スタンダード')
  const [personalColor,      setPersonalColor]      = useState('spring')
  const [skeletonType,       setSkeletonType]       = useState('ウェーブ')
  const [isSkeletonAnalyzing,setIsSkeletonAnalyzing]= useState(false)
  const [skeletonResult,     setSkeletonResult]     = useState<string | null>(null)
  const [stylePrefs,         setStylePrefs]         = useState<string[]>(['フェミニン', 'Y2K'])
  const [ngStyles,           setNgStyles]           = useState<string[]>([])
  const [roleModel,          setRoleModel]          = useState('')
  const [isAISearching,      setIsAISearching]      = useState(false)
  const [aiResult,           setAiResult]           = useState<string | null>(null)
  const [playerName,         setPlayerName]         = useState('')
  const [birthMonth,         setBirthMonth]         = useState<number | null>(null)
  const [birthDay,           setBirthDay]           = useState<number | null>(null)
  const [saved,              setSaved]              = useState(false)

  const togglePref = (p: string) =>
    setStylePrefs(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])
  const toggleNG = (n: string) =>
    setNgStyles(prev => prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n])

  const handleAISearch = async () => {
    setIsAISearching(true)
    await new Promise(r => setTimeout(r, 2000))
    setIsAISearching(false)
    setAiResult('あなたのパーソナルカラーと体型に合うロールモデルとして、ミニマルシックなスタイルが得意な方をおすすめします！✨')
  }

  const handleSkeletonAnalysis = async () => {
    setIsSkeletonAnalyzing(true)
    await new Promise(r => setTimeout(r, 2000))
    setIsSkeletonAnalyzing(false)
    setSkeletonResult('AIが「ウェーブ」骨格と判定しました！柔らかい素材・ウエストマーク・ふわっとしたシルエットが得意です💗')
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

        {/* ── [NEW] 顔タイプ・骨格 ── */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.13 }}>
          <p className="text-white/60 text-xs font-bold mb-2 uppercase tracking-widest flex items-center gap-1.5">
            <span className="text-sm">✨</span> 顔タイプ・骨格
          </p>
          <div className="flex gap-2 flex-wrap mb-3">
            {SKELETON_TYPES.map(st => (
              <button key={st} onClick={() => setSkeletonType(st)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  skeletonType === st
                    ? 'bg-pink-500/80 text-white shadow-lg shadow-pink-500/30'
                    : 'glass text-white/60 hover:text-white hover:bg-white/10'
                }`}>{st}</button>
            ))}
          </div>

          {/* AI 骨格診断ボタン — puffy pink 3D */}
          <button onClick={handleSkeletonAnalysis} disabled={isSkeletonAnalyzing}
            className="w-full py-3 rounded-2xl btn-glow-pink text-white font-black text-sm flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isSkeletonAnalyzing ? (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                  <Sparkles className="w-4 h-4" />
                </motion.div>
                AI解析中…
              </>
            ) : (
              <><Camera className="w-4 h-4" />📸 自撮りでAI骨格・顔タイプを診断</>
            )}
          </button>

          {skeletonResult && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-3 glass-holo rounded-2xl p-4">
              <div className="flex items-start gap-2">
                <span className="text-2xl flex-shrink-0">🤖</span>
                <p className="text-white/80 text-sm font-medium">{skeletonResult}</p>
              </div>
            </motion.div>
          )}
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

        {/* ── [NEW] NG・避けたいスタイル ── */}
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
          <input type="text" value={roleModel} onChange={e => setRoleModel(e.target.value)}
            placeholder="SNSアカウント名 / インフルエンサー名"
            className="w-full px-4 py-3 rounded-xl glass text-white placeholder-white/30 outline-none border border-white/10 focus:border-pink-500/50 text-sm"
          />

          {/* AI ロールモデル検索ボタン — puffy pink 3D */}
          <button onClick={handleAISearch} disabled={isAISearching}
            className="w-full mt-3 py-3 rounded-2xl btn-glow-pink text-white font-black text-sm flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isAISearching ? (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                  <Sparkles className="w-4 h-4" />
                </motion.div>
                AI解析中…
              </>
            ) : (
              <><Camera className="w-4 h-4" />📸 自撮りで似合うロールモデルをAIが検索</>
            )}
          </button>

          {aiResult && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-3 glass-holo rounded-2xl p-4">
              <div className="flex items-start gap-2">
                <span className="text-2xl flex-shrink-0">🤖</span>
                <p className="text-white/80 text-sm font-medium">{aiResult}</p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* ── [NEW] プレイヤープロフィール ── */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.23 }}>
          <p className="text-white/60 text-xs font-bold mb-3 uppercase tracking-widest flex items-center gap-1.5">
            <span className="text-sm">✨</span> プレイヤープロフィール（カード反映用）
          </p>

          {/* Player name */}
          <div className="mb-3">
            <p className="text-white/45 text-xs font-medium mb-1.5">プレイヤー名</p>
            <input type="text" value={playerName} onChange={e => setPlayerName(e.target.value)}
              placeholder="例: ゆめちゃん"
              className="w-full px-4 py-3 rounded-xl glass text-white placeholder-white/30 outline-none border border-white/10 focus:border-pink-500/50 text-sm"
            />
          </div>

          {/* Birthday */}
          <div>
            <p className="text-white/45 text-xs font-medium mb-1.5">誕生日・星座</p>
            <div className="flex gap-2">
              <select
                value={birthMonth ?? ''}
                onChange={e => setBirthMonth(e.target.value ? Number(e.target.value) : null)}
                style={SELECT_STYLE}
              >
                <option value="">月</option>
                {MONTHS.map(m => <option key={m} value={m} style={{ background: '#1a0035' }}>{m}月</option>)}
              </select>
              <select
                value={birthDay ?? ''}
                onChange={e => setBirthDay(e.target.value ? Number(e.target.value) : null)}
                style={SELECT_STYLE}
              >
                <option value="">日</option>
                {DAYS.map(d => <option key={d} value={d} style={{ background: '#1a0035' }}>{d}日</option>)}
              </select>
            </div>

            {zodiac && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
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
