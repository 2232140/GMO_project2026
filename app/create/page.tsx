'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Camera, Upload, Sparkles, Check, Tag } from 'lucide-react'

const CATEGORIES = [
  { key: 'tops', label: 'トップス', emoji: '👚' },
  { key: 'bottoms', label: 'ボトムス', emoji: '👗' },
  { key: 'shoes', label: 'シューズ', emoji: '👠' },
  { key: 'bag', label: 'バッグ', emoji: '👜' },
  { key: 'cosme', label: 'コスメ', emoji: '💄' },
]

const COLOR_TAGS = ['ピンク', 'ラベンダー', 'ホワイト', 'ブラック', 'ベージュ', 'ブルー', 'グリーン', 'イエロー']
const STYLE_TAGS = ['フェミニン', 'カジュアル', 'Y2K', 'ガーリー', 'エッジー', 'ナチュラル', 'ストリート']

const HOLO_FRAMES = [
  { id: 'rainbow', label: 'レインボー', gradient: 'from-pink-400 via-purple-400 to-blue-400' },
  { id: 'gold', label: 'ゴールド', gradient: 'from-yellow-400 via-amber-300 to-yellow-500' },
  { id: 'ice', label: 'アイス', gradient: 'from-sky-300 via-cyan-200 to-blue-400' },
  { id: 'sakura', label: 'サクラ', gradient: 'from-pink-300 via-rose-200 to-fuchsia-400' },
]

export default function CreatePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('tops')
  const [selectedFrame, setSelectedFrame] = useState('rainbow')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [cardName, setCardName] = useState('')
  const [isPublishing, setIsPublishing] = useState(false)
  const [published, setPublished] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const handlePublish = async () => {
    setIsPublishing(true)
    await new Promise((r) => setTimeout(r, 1500))
    setIsPublishing(false)
    setPublished(true)
    await new Promise((r) => setTimeout(r, 2000))
    router.push('/album')
  }

  const frame = HOLO_FRAMES.find((f) => f.id === selectedFrame)

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
            <Camera className="w-4 h-4 text-sky-300" />
            新しいカードを作る
          </h1>
          <div className="flex justify-center gap-1 mt-1">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`w-6 h-1 rounded-full transition-all ${
                  s <= step ? 'bg-gradient-to-r from-pink-500 to-purple-500' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="w-16" />
      </header>

      <div className="flex-1 px-4 pb-6">
        <AnimatePresence mode="wait">
          {/* Step 1: Upload */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-4"
            >
              <p className="text-white/50 text-sm text-center mt-2">写真をアップロードしてね📸</p>

              <button
                onClick={() => inputRef.current?.click()}
                className="glass-strong rounded-3xl aspect-square max-w-xs mx-auto w-full flex flex-col items-center justify-center gap-4 hover:bg-white/10 transition-all border-2 border-dashed border-white/20 hover:border-pink-500/50 group"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="w-7 h-7 text-white" />
                </div>
                <div className="text-center">
                  <p className="text-white font-bold">写真をアップロード</p>
                  <p className="text-white/40 text-sm mt-1">または</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white/70 text-sm">
                  <Camera className="w-4 h-4" />
                  カメラで撮影
                </div>
              </button>
              <input ref={inputRef} type="file" accept="image/*" className="hidden" />

              {/* Demo preview */}
              <div className="glass-strong rounded-2xl p-3 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-2xl flex-shrink-0">
                  👗
                </div>
                <div>
                  <p className="text-white text-sm font-bold">デモモードで試す</p>
                  <p className="text-white/40 text-xs">サンプル画像でカード生成を体験</p>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="ml-auto px-3 py-1.5 rounded-xl btn-glow-pink text-white text-xs font-bold"
                >
                  試す
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Frame selection + AI preview */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-4"
            >
              <p className="text-white/50 text-sm text-center mt-2">ホログラムフレームを選択✨</p>

              {/* Card preview */}
              <div className="flex justify-center">
                <motion.div
                  key={selectedFrame}
                  initial={{ rotateY: 90 }}
                  animate={{ rotateY: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`w-40 h-56 rounded-3xl relative overflow-hidden border-4 border-transparent`}
                  style={{
                    background: `linear-gradient(135deg, rgba(20,10,40,0.9), rgba(40,10,60,0.9))`,
                    boxShadow: `0 0 40px rgba(255,20,147,0.3), 0 0 80px rgba(155,89,182,0.2)`,
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${frame?.gradient} opacity-30`} />
                  <div className="absolute inset-2 rounded-2xl border-2 border-white/20" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <span className="text-5xl">✨</span>
                    <div className="text-center px-3">
                      <p className="text-white font-black text-sm">マイアイテム</p>
                      <p className="text-white/50 text-xs">サンプルカード</p>
                    </div>
                  </div>
                  <div className="absolute top-2 left-2 text-xs font-black text-amber-300">SR</div>
                  <div className="absolute top-2 right-2 star-twinkle text-xs">✦</div>
                </motion.div>
              </div>

              {/* Frame options */}
              <div className="grid grid-cols-4 gap-2">
                {HOLO_FRAMES.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFrame(f.id)}
                    className={`p-2 rounded-xl transition-all flex flex-col items-center gap-1 ${
                      selectedFrame === f.id
                        ? 'ring-2 ring-pink-500 bg-pink-500/20'
                        : 'glass hover:bg-white/10'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${f.gradient}`} />
                    <span className="text-white/70 text-xs font-medium">{f.label}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(3)}
                className="w-full py-3.5 rounded-2xl btn-glow-pink text-white font-black flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                このフレームで次へ
              </button>
            </motion.div>
          )}

          {/* Step 3: Tags */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-4"
            >
              <p className="text-white/50 text-sm text-center mt-2">カード名とタグを設定しよう🏷️</p>

              {/* Category select */}
              <div>
                <p className="text-white/60 text-xs font-bold mb-2">カテゴリ</p>
                <div className="grid grid-cols-5 gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setSelectedCategory(cat.key)}
                      className={`p-2 rounded-xl flex flex-col items-center gap-1 transition-all ${
                        selectedCategory === cat.key
                          ? 'bg-pink-500/30 ring-2 ring-pink-500'
                          : 'glass hover:bg-white/10'
                      }`}
                    >
                      <span className="text-xl">{cat.emoji}</span>
                      <span className="text-white/60 text-xs">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Card name */}
              <div>
                <p className="text-white/60 text-xs font-bold mb-2">カード名</p>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="例：ピンクのフリルブラウス"
                  className="w-full px-4 py-3 rounded-xl glass text-white placeholder-white/30 outline-none border border-white/10 focus:border-pink-500/50 text-sm"
                />
              </div>

              {/* Color tags */}
              <div>
                <p className="text-white/60 text-xs font-bold mb-2 flex items-center gap-1">
                  <Tag className="w-3 h-3" /> カラータグ
                </p>
                <div className="flex flex-wrap gap-2">
                  {COLOR_TAGS.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                        selectedTags.includes(tag)
                          ? 'bg-pink-500/80 text-white'
                          : 'glass text-white/60 hover:text-white'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style tags */}
              <div>
                <p className="text-white/60 text-xs font-bold mb-2 flex items-center gap-1">
                  <Tag className="w-3 h-3" /> スタイルタグ
                </p>
                <div className="flex flex-wrap gap-2">
                  {STYLE_TAGS.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                        selectedTags.includes(tag)
                          ? 'bg-purple-500/80 text-white'
                          : 'glass text-white/60 hover:text-white'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setStep(4)}
                className="w-full py-3.5 rounded-2xl btn-glow-purple text-white font-black flex items-center justify-center gap-2"
              >
                カードを発行する！
              </button>
            </motion.div>
          )}

          {/* Step 4: Publish */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-6 pt-4"
            >
              <div className="text-center">
                <p className="text-white font-black text-xl">カードの確認</p>
                <p className="text-white/40 text-sm mt-1">このカードをライブラリに追加します</p>
              </div>

              {/* Final card preview */}
              <motion.div
                className={`w-44 h-60 rounded-3xl relative overflow-hidden border-4 border-amber-400/60`}
                animate={{ rotateY: [0, 5, 0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  background: 'linear-gradient(135deg, rgba(20,10,40,0.9), rgba(40,10,60,0.9))',
                  boxShadow: '0 0 40px rgba(255,215,0,0.4), 0 0 80px rgba(255,20,147,0.2)',
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${frame?.gradient} opacity-40`} />
                <div className="absolute inset-2 rounded-2xl border border-white/20" />
                <div className="absolute inset-0 flex flex-col items-center justify-between p-4">
                  <div className="flex justify-between w-full">
                    <span className="text-xs font-black text-amber-300">SR</span>
                    <span className="star-twinkle text-xs">✦</span>
                  </div>
                  <span className="text-5xl">{CATEGORIES.find((c) => c.key === selectedCategory)?.emoji}</span>
                  <div className="text-center">
                    <p className="text-white font-black text-sm leading-tight">
                      {cardName || 'マイアイテム'}
                    </p>
                    <div className="flex flex-wrap justify-center gap-0.5 mt-1">
                      {selectedTags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-white/50" style={{ fontSize: '0.45rem' }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              <button
                onClick={handlePublish}
                disabled={isPublishing}
                className="w-full max-w-xs py-4 rounded-2xl btn-glow-gold text-white font-black text-lg flex items-center justify-center gap-2"
              >
                {isPublishing ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity }}>
                      <Sparkles className="w-5 h-5" />
                    </motion.div>
                    発行中…
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    ✨ アイテムカードを発行する！
                  </>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Published overlay */}
      <AnimatePresence>
        {published && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(255,215,0,0.1)', backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="text-center"
            >
              <div className="text-8xl mb-4 float-anim">🎴</div>
              <h2 className="text-3xl font-black text-white" style={{ textShadow: '0 0 20px rgba(255,215,0,0.8)' }}>
                カード発行完了！
              </h2>
              <p className="text-white/60 text-lg mt-2">ライブラリに追加しました✨</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
