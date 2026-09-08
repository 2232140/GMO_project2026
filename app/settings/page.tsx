'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Settings, Camera, Sparkles, Check } from 'lucide-react'

const BODY_TYPES = ['スリム', 'スタンダード', 'グラマー', 'ペティート', 'トール']
const PERSONAL_COLORS = [
  { key: 'spring', label: 'スプリング', emoji: '🌸', desc: '明るく暖かい', gradient: 'from-yellow-300 to-orange-400' },
  { key: 'summer', label: 'サマー', emoji: '🌊', desc: '涼しげソフト', gradient: 'from-blue-300 to-purple-400' },
  { key: 'autumn', label: 'オータム', emoji: '🍂', desc: '深みがある暖色', gradient: 'from-orange-400 to-red-500' },
  { key: 'winter', label: 'ウィンター', emoji: '❄️', desc: 'クールでビビッド', gradient: 'from-indigo-400 to-blue-600' },
]
const STYLE_PREFS = ['フェミニン', 'Y2K', 'カジュアル', 'ストリート', 'ナチュラル', 'エレガント', 'スポーティ', 'ガーリー']

export default function SettingsPage() {
  const router = useRouter()
  const [bodyType, setBodyType] = useState('スタンダード')
  const [personalColor, setPersonalColor] = useState('spring')
  const [stylePrefs, setStylePrefs] = useState<string[]>(['フェミニン', 'Y2K'])
  const [roleModel, setRoleModel] = useState('')
  const [isAISearching, setIsAISearching] = useState(false)
  const [aiResult, setAiResult] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  const togglePref = (pref: string) => {
    setStylePrefs((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    )
  }

  const handleAISearch = async () => {
    setIsAISearching(true)
    await new Promise((r) => setTimeout(r, 2000))
    setIsAISearching(false)
    setAiResult('あなたのパーソナルカラーと体型に合うロールモデルとして、ミニマルシックなスタイルが得意な方をおすすめします！✨')
  }

  const handleSave = async () => {
    setSaved(true)
    await new Promise((r) => setTimeout(r, 1500))
    router.push('/')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-4 pt-4 pb-2">
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors"
        >
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

      <div className="flex-1 px-4 pb-6 flex flex-col gap-5">
        {/* Body Type */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <p className="text-white/60 text-xs font-bold mb-2 uppercase tracking-widest">体型</p>
          <div className="flex gap-2 flex-wrap">
            {BODY_TYPES.map((bt) => (
              <button
                key={bt}
                onClick={() => setBodyType(bt)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  bodyType === bt
                    ? 'bg-pink-500/80 text-white shadow-lg shadow-pink-500/30'
                    : 'glass text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {bt}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Personal Color */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <p className="text-white/60 text-xs font-bold mb-2 uppercase tracking-widest">パーソナルカラー</p>
          <div className="grid grid-cols-2 gap-2">
            {PERSONAL_COLORS.map((pc) => (
              <button
                key={pc.key}
                onClick={() => setPersonalColor(pc.key)}
                className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${
                  personalColor === pc.key
                    ? 'ring-2 ring-white/50 bg-white/10'
                    : 'glass hover:bg-white/10'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${pc.gradient} flex items-center justify-center text-xl flex-shrink-0`}>
                  {pc.emoji}
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-sm">{pc.label}</p>
                  <p className="text-white/40 text-xs">{pc.desc}</p>
                </div>
                {personalColor === pc.key && (
                  <Check className="w-4 h-4 text-white ml-auto flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Style Preferences */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <p className="text-white/60 text-xs font-bold mb-2 uppercase tracking-widest">好みスタイル（複数選択可）</p>
          <div className="flex flex-wrap gap-2">
            {STYLE_PREFS.map((pref) => (
              <button
                key={pref}
                onClick={() => togglePref(pref)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  stylePrefs.includes(pref)
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                    : 'glass text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {pref}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Role Model */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <p className="text-white/60 text-xs font-bold mb-2 uppercase tracking-widest">ロールモデル</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={roleModel}
              onChange={(e) => setRoleModel(e.target.value)}
              placeholder="SNSアカウント名 / インフルエンサー名"
              className="flex-1 px-4 py-3 rounded-xl glass text-white placeholder-white/30 outline-none border border-white/10 focus:border-pink-500/50 text-sm"
            />
          </div>

          {/* AI Search */}
          <button
            onClick={handleAISearch}
            disabled={isAISearching}
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
              <>
                <Camera className="w-4 h-4" />
                📸 自撮りで似合うロールモデルをAIが検索
              </>
            )}
          </button>

          {aiResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 glass-holo rounded-2xl p-4"
            >
              <div className="flex items-start gap-2">
                <span className="text-2xl flex-shrink-0">🤖</span>
                <div>
                  <p className="text-white/80 text-sm font-medium">{aiResult}</p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Save */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <button
            onClick={handleSave}
            disabled={saved}
            className="w-full py-4 rounded-2xl btn-glow-gold text-white font-black text-base flex items-center justify-center gap-2"
          >
            {saved ? (
              <>
                <Check className="w-5 h-5" />
                保存しました！
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                設定を保存する
              </>
            )}
          </button>
        </motion.div>
      </div>
    </div>
  )
}
