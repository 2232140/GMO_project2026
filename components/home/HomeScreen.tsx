'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Settings, Wand2, BookOpen, Camera, Layers } from 'lucide-react'
import SparkleDecor from '@/components/ui/SparkleDecor'

const NAV_ITEMS = [
  {
    id: 'ai', emoji: '✨',
    label: 'AIにおまかせでコーデを組む',
    sub: 'AIが最適な5枚を自動セット！',
    href: '/deck',
    gradient: 'linear-gradient(180deg,#f0d8ff 0%,#d0a0ff 18%,#b060ff 45%,#9333ea 72%,#6b21a8 100%)',
    shadow: '#4a1080', glow: 'rgba(147,51,234,0.55)',
    icon: Wand2, delay: 0.10, large: true,
  },
  {
    id: 'deck', emoji: '👚',
    label: '今日のデッキをセットする',
    sub: 'カードスロットを自分でセット',
    href: '/deck',
    gradient: 'linear-gradient(180deg,#ffe0f0 0%,#ffb6d9 18%,#ff69b4 45%,#ff1493 72%,#cc006b 100%)',
    shadow: '#880055', glow: 'rgba(255,20,147,0.55)',
    icon: Layers, delay: 0.18, large: false,
  },
  {
    id: 'create', emoji: '📸',
    label: '新しいカードを作る',
    sub: '服・コスメをAIがカード化',
    href: '/create',
    gradient: 'linear-gradient(180deg,#d0e8ff 0%,#90c8ff 18%,#40a0ff 45%,#0070d0 72%,#004090 100%)',
    shadow: '#002460', glow: 'rgba(40,130,255,0.55)',
    icon: Camera, delay: 0.26, large: false,
  },
  {
    id: 'album', emoji: '📖',
    label: 'コレクションアルバムを見る',
    sub: 'カード帳・コーデ履歴',
    href: '/album',
    gradient: 'linear-gradient(180deg,#fff8d0 0%,#ffe880 18%,#ffc020 45%,#f59e0b 72%,#b45309 100%)',
    shadow: '#7c3500', glow: 'rgba(245,158,11,0.55)',
    icon: BookOpen, delay: 0.34, large: false,
  },
]

/* カードファンのデータ */
const FAN_CARDS = [
  { emoji:'👗', grad:'linear-gradient(160deg,#ffb6d9,#ff1493)', rotate:-22, x:-72, glow:'rgba(255,20,147,0.55)'  },
  { emoji:'👠', grad:'linear-gradient(160deg,#90c8ff,#40a0ff)', rotate:-11, x:-36, glow:'rgba(40,130,255,0.55)'  },
  { emoji:'✨', grad:'linear-gradient(160deg,#d0a0ff,#9333ea)', rotate:  0, x:  0, glow:'rgba(147,51,234,0.55)'  },
  { emoji:'💄', grad:'linear-gradient(160deg,#ffb6d9,#ff1493)', rotate: 11, x: 36, glow:'rgba(255,20,147,0.55)'  },
  { emoji:'👜', grad:'linear-gradient(160deg,#ffe880,#f59e0b)', rotate: 22, x: 72, glow:'rgba(245,158,11,0.55)'  },
]

export default function HomeScreen() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* 設定ボタン */}
      <header className="flex justify-end px-4 pt-4">
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          onClick={() => router.push('/settings')}
          className="glass rounded-2xl px-3 py-2 flex items-center gap-2 hover:scale-105 transition-transform group"
        >
          <Settings className="w-4 h-4 text-white/80 group-hover:rotate-45 transition-transform duration-300" />
          <span className="text-white/80 text-sm font-black hidden sm:block"
            style={{ textShadow:'0 1px 3px rgba(0,0,0,0.3)' }}>マイ設定</span>
        </motion.button>
      </header>

      <div className="flex flex-col items-center px-5 pt-2 pb-8">

        {/* ━━━ ロゴ ━━━ */}
        <motion.div
          initial={{ opacity:0, y:-36, scale:0.85 }}
          animate={{ opacity:1, y:0, scale:1 }}
          transition={{ duration:0.7, type:'spring', stiffness:130 }}
          className="mb-1 relative"
        >
          <div className="relative inline-flex flex-col items-center">

            {/* MIRROR — ピンクメタリック袋文字 */}
            <h1
              className="leading-none select-none"
              style={{
                fontFamily: 'var(--font-fredoka), var(--font-nunito), sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(2.6rem,10vw,3.8rem)',
                color: '#ff1493',
                WebkitTextStroke: '5px white',
                paintOrder: 'stroke fill',
                filter: [
                  'drop-shadow(0px 4px 0px #aa0060)',
                  'drop-shadow(0px 7px 0px rgba(180,0,80,0.45))',
                  'drop-shadow(0px 0px 18px rgba(255,50,150,0.55))',
                ].join(' '),
              }}
            >
              MIRROR
            </h1>

            {/* GRAPH — シルバーメタリック */}
            <h1
              className="leading-none select-none -mt-1"
              style={{
                fontFamily: 'var(--font-fredoka), var(--font-nunito), sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(2.6rem,10vw,3.8rem)',
                background: 'linear-gradient(180deg,#ffffff 0%,#e0d0ff 30%,#b0a0e0 60%,#d8d0ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                WebkitTextStroke: '4px rgba(255,255,255,0.95)',
                paintOrder: 'stroke fill',
                filter: [
                  'drop-shadow(0px 3px 0px #7070a0)',
                  'drop-shadow(0px 6px 8px rgba(100,100,180,0.40))',
                ].join(' '),
              }}
            >
              GRAPH
            </h1>

            {/* スパークル装飾 */}
            <SparkleDecor variant="full" />
          </div>
        </motion.div>

        {/* タグライン */}
        <motion.div
          initial={{ opacity:0, y:10 }}
          animate={{ opacity:1, y:0 }}
          transition={{ delay:0.3 }}
          className="text-center mb-3 mt-3"
        >
          <p
            className="font-black text-lg"
            style={{
              fontFamily: 'var(--font-fredoka), var(--font-nunito), sans-serif',
              color: 'white',
              WebkitTextStroke: '2px rgba(255,100,180,0.6)',
              paintOrder: 'stroke fill',
              textShadow: '0 2px 0 rgba(200,0,100,0.40), 0 0 12px rgba(255,100,180,0.50)',
            }}
          >
            今日のあなたをプロデュース！
          </p>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="star-twinkle text-yellow-200" style={{ fontSize:'0.75rem' }}>💎</span>
            <p className="text-white/80 text-sm font-bold"
              style={{ textShadow:'0 1px 4px rgba(0,0,0,0.3)' }}>
              AI × トレカで輝く毎日のコーデ
            </p>
            <span className="star-twinkle text-pink-200" style={{ fontSize:'0.75rem', animationDelay:'0.6s' }}>💎</span>
          </div>
        </motion.div>

        {/* ━━━ カードファン ━━━ */}
        <motion.div
          initial={{ opacity:0, scale:0.8, y:20 }}
          animate={{ opacity:1, scale:1, y:0 }}
          transition={{ delay:0.22, type:'spring', stiffness:110 }}
          className="relative h-36 w-full flex items-center justify-center mb-5"
        >
          {FAN_CARDS.map((c, i) => (
            <motion.div
              key={i}
              className="absolute rounded-2xl flex flex-col items-center justify-center"
              style={{
                width: 56, height: 80,
                background: c.grad,
                border: '3px solid rgba(255,255,255,0.70)',
                boxShadow: [
                  `0 0 0 1.5px rgba(255,255,255,0.40)`,
                  `0 6px 0 rgba(0,0,0,0.25)`,
                  `0 8px 20px ${c.glow}`,
                  `inset 0 2px 5px rgba(255,255,255,0.65)`,
                ].join(', '),
                rotate: c.rotate, x: c.x,
              }}
              animate={{ y: [0, -(4 + i), 0] }}
              transition={{ duration: 2.6 + i * 0.3, repeat: Infinity, ease:'easeInOut', delay: i * 0.18 }}
            >
              {/* カードグロス */}
              <div className="absolute rounded-xl pointer-events-none"
                style={{ top:4, left:5, right:5, height:'40%', background:'linear-gradient(to bottom,rgba(255,255,255,0.65) 0%,transparent 100%)', borderRadius:'10px 10px 50% 50% / 6px 6px 14px 14px' }} />
              {/* ミニレースドット */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-40"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='8' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='4' cy='4' r='0.8' fill='rgba(255,255,255,0.5)'/%3E%3C/svg%3E")`, backgroundSize:'8px 8px' }} />
              <span className="text-xl relative z-10" style={{ filter:'drop-shadow(0 2px 3px rgba(0,0,0,0.3))' }}>{c.emoji}</span>
              <div className="flex gap-0.5 mt-1 relative z-10">
                {Array.from({ length: 3 - i % 2 }).map((_, si) => (
                  <span key={si} style={{ fontSize:'0.3rem', color:'rgba(255,255,255,0.9)' }}>★</span>
                ))}
              </div>
            </motion.div>
          ))}

          {/* 床の光 */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            animate={{ scaleX:[1,1.5,1], opacity:[0.25,0.55,0.25] }}
            transition={{ duration:2.8, repeat:Infinity, ease:'easeInOut' }}
            style={{ width:90, height:8, background:'radial-gradient(ellipse,rgba(255,150,220,0.7) 0%,transparent 70%)', filter:'blur(4px)' }}
          />
        </motion.div>

        {/* ━━━ ナビゲーションボタン ━━━ */}
        <div className="w-full max-w-md flex flex-col gap-3">
          {NAV_ITEMS.map((item) => (
            <motion.button
              key={item.id}
              initial={{ opacity:0, x:-26 }}
              animate={{ opacity:1, x:0 }}
              transition={{ delay:item.delay, type:'spring', stiffness:200, damping:22 }}
              whileTap={{ scale:0.97, y:4 }}
              onClick={() => router.push(item.href)}
              className={`relative w-full rounded-2xl nav-btn overflow-visible ${item.large ? 'py-5' : 'py-3.5'}`}
              style={{
                background: item.gradient,
                boxShadow: [
                  '0 0 0 2.5px rgba(255,255,255,0.88)',
                  '0 0 0 4.5px rgba(200,180,220,0.55)',
                  `0 6px 0 ${item.shadow}`,
                  `0 10px 26px ${item.glow}`,
                  'inset 0 2px 5px rgba(255,255,255,0.50)',
                ].join(', '),
              }}
            >
              <SparkleDecor variant="button" />
              <div className="relative flex items-center px-5 gap-4 z-10">
                <span
                  className={item.large ? 'text-3xl' : 'text-2xl'}
                  style={{ filter:'drop-shadow(0 2px 4px rgba(0,0,0,0.35))' }}
                >
                  {item.emoji}
                </span>
                <div className="text-left flex-1">
                  <p
                    className={`font-black leading-tight drop-shadow-sm ${item.large ? 'text-lg' : 'text-base'}`}
                    style={{
                      color: 'white',
                      textShadow: '0 1px 4px rgba(0,0,0,0.40)',
                      WebkitTextStroke: '0.5px rgba(255,255,255,0.4)',
                      paintOrder: 'stroke fill',
                    }}
                  >
                    {item.label}
                  </p>
                  <p className="text-white/80 text-xs mt-0.5 font-bold"
                    style={{ textShadow:'0 1px 2px rgba(0,0,0,0.30)' }}>
                    {item.sub}
                  </p>
                </div>
                <item.icon className="w-5 h-5 text-white/70 flex-shrink-0" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* フッター */}
        <motion.div
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ delay:0.9 }}
          className="mt-6 flex items-center gap-2"
        >
          <span className="star-twinkle text-yellow-200" style={{ fontSize:'0.7rem' }}>💎</span>
          <p className="text-xs font-black text-white/60"
            style={{ textShadow:'0 0 8px rgba(255,200,240,0.5)' }}>
            GMO DESIGN AWARD 2026
          </p>
          <span className="star-twinkle text-pink-200" style={{ fontSize:'0.7rem', animationDelay:'0.5s' }}>💎</span>
        </motion.div>
      </div>
    </div>
  )
}
