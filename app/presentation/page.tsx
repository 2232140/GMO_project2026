import type { Metadata } from 'next'
import type { CSSProperties } from 'react'

export const metadata: Metadata = {
  title: 'MIRROR GRAPH — GMO DESIGN AWARD 2026',
  description: 'Y2K × AI × トレカ スタイリングWebアプリ',
}

const ZEN     = 'var(--font-zen-maru-gothic), var(--font-nunito), sans-serif'
const FREDOKA = 'var(--font-fredoka), sans-serif'

/* ── data ── */
const FEATURES = [
  {
    icon: '📷', color: '#ff69b4', glow: 'rgba(255,105,180,0.45)',
    title: 'カード作成',
    desc: 'カメラ撮影・アップロード・URLの3方式でアイテムを取り込み。AIが自動背景切り抜き。テーマ・タグ・レアリティを設定してオリジナルトレカを発行する。',
  },
  {
    icon: '🃏', color: '#c084fc', glow: 'rgba(192,132,252,0.45)',
    title: 'デッキ構築',
    desc: 'TOPS / BOTTOMS / SHOES / BAG / COSMEの5スロットにカードを組み合わせてコーデデッキを組む。AIがY2K度などのスタイルスコアをゲージ表示する。',
  },
  {
    icon: '💎', color: '#ffd700', glow: 'rgba(255,215,0,0.45)',
    title: 'コーデアルバム',
    desc: '保存コーデをスコア別グロー（金90pt超 / 紫70pt超）で表示。詳細モーダルでテーマ・スタイルスコアゲージ・使用アイテムを確認できる。',
  },
  {
    icon: '📚', color: '#60c8ff', glow: 'rgba(96,200,255,0.45)',
    title: 'マイバインダー',
    desc: '全コーデ・アイテムカードを管理するコレクション帳。カードフリップでレアリティ・タグ・ブランドを確認。コレクション達成率もカウント。',
  },
  {
    icon: '🤖', color: '#ff9f7f', glow: 'rgba(255,159,127,0.45)',
    title: 'AIパーソナライズ',
    desc: '骨格・パーソナルカラーを写真からAI診断。ロールモデルをAIが学習し、自撮りから似た人物を提案。設定がAIコーデ提案とスコアに反映される。',
  },
]

const DIFFS = [
  {
    num: '01', accent: '#ffd700',
    title: 'ファッション × トレカ収集体験（業界初クラス）',
    desc: '服を「登録する」のではなく「カードを獲得する」体験に変換。レアリティ・カードフレーム・フリップ・コレクション帳まで一貫したTCG世界観で設計した。',
  },
  {
    num: '02', accent: '#ff69b4',
    title: 'Y2Kアイドルゲーム UIを全画面に貫く',
    desc: '競合アプリが全員ミニマルデザインを選ぶ中、Y2Kキラキラ・ギャル・アイドルゲーム風UIを5画面すべてに一貫させた。ターゲット層に「自分のためのアプリ」と即座に感じさせる。',
  },
  {
    num: '03', accent: '#c084fc',
    title: 'コーデ保存がセレモニーになる体験設計',
    desc: '保存時にカードファン展開＋スコア発表演出。TCGのパック開封体験を再現し、ただの「保存」を達成感のあるイベントに変換。継続利用動機を生む。',
  },
  {
    num: '04', accent: '#60c8ff',
    title: 'スコアによるゲーム的フィードバック',
    desc: 'Y2K度など複数軸のゲージでコーデを定量評価。「スコアを上げたい」というゲーマー的モチベーションをファッションアプリに持ち込み、使い続ける理由をつくる。',
  },
]

const TECHS = [
  'Next.js 16 App Router', 'TypeScript', 'Tailwind CSS v4',
  'Framer Motion', 'Claude AI API', 'localStorage',
]

/* ── styles ── */
const glass: CSSProperties = {
  background: 'rgba(22,4,48,0.62)',
  backdropFilter: 'blur(14px)',
  border: '1px solid rgba(255,255,255,0.14)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.09)',
}

/* ── sub-components ── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,100,200,0.35))' }} />
      <h2 style={{
        fontFamily: FREDOKA, fontSize: '0.8rem', fontWeight: 700, margin: 0,
        letterSpacing: '0.28em', color: 'rgba(255,190,235,0.65)', textTransform: 'uppercase',
      }}>
        {children}
      </h2>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(255,100,200,0.35),transparent)' }} />
    </div>
  )
}

/* ── page ── */
export default function PresentationPage() {
  return (
    <div style={{ minHeight: '100vh', fontFamily: ZEN, color: 'white', paddingBottom: 80 }}>
      <div style={{ maxWidth: 920, margin: '0 auto', padding: '0 20px' }}>

        {/* ══ HERO ══ */}
        <section style={{ textAlign: 'center', padding: '72px 0 64px', position: 'relative' }}>
          {/* corner brackets */}
          {([
            { top: 16, left:  0, borderTop: '2px solid rgba(255,215,0,0.6)', borderLeft:  '2px solid rgba(255,215,0,0.6)' },
            { top: 16, right: 0, borderTop: '2px solid rgba(255,215,0,0.6)', borderRight: '2px solid rgba(255,215,0,0.6)' },
            { bottom: 0, left:  0, borderBottom: '2px solid rgba(255,215,0,0.4)', borderLeft:  '2px solid rgba(255,215,0,0.4)' },
            { bottom: 0, right: 0, borderBottom: '2px solid rgba(255,215,0,0.4)', borderRight: '2px solid rgba(255,215,0,0.4)' },
          ] as CSSProperties[]).map((s, i) => (
            <div key={i} style={{ position: 'absolute', width: 24, height: 24, ...s }} />
          ))}

          {/* award badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '5px 18px', borderRadius: 50, marginBottom: 24,
            background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.4)',
          }}>
            <span style={{ fontFamily: FREDOKA, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.22em', color: 'rgba(255,215,0,0.85)' }}>
              ✦ GMO DESIGN AWARD 2026
            </span>
          </div>

          {/* main title */}
          <h1 style={{
            fontFamily: FREDOKA,
            fontSize: 'clamp(2.8rem,9vw,5.6rem)',
            fontWeight: 700,
            background: 'linear-gradient(90deg,#ffd700 0%,#ff69b4 45%,#c084fc 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundSize: '200% 100%',
            animation: 'holoShimmer 4s linear infinite',
            letterSpacing: '0.06em',
            margin: '0 0 10px',
            filter: 'drop-shadow(0 0 28px rgba(255,100,200,0.35))',
          }}>
            MIRROR GRAPH
          </h1>

          {/* tagline */}
          <p style={{
            fontFamily: FREDOKA,
            fontSize: 'clamp(1rem,3vw,1.35rem)',
            fontWeight: 600,
            color: 'rgba(255,200,240,0.88)',
            letterSpacing: '0.14em',
            marginBottom: 36,
          }}>
            Y2K × AI × トレカ — ファッションを、ゲームにする。
          </p>

          {/* CTA button */}
          <a href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '13px 36px', borderRadius: 50,
            background: 'linear-gradient(90deg,#ff4da6 0%,#c040e0 45%,#7040ff 100%)',
            backgroundSize: '200% 100%',
            animation: 'holoShimmer 3s linear infinite',
            color: 'white', fontFamily: FREDOKA, fontWeight: 700, fontSize: '0.95rem',
            letterSpacing: '0.08em', textDecoration: 'none',
            boxShadow: '0 0 28px rgba(180,40,220,0.65), 0 4px 0 #380058',
            position: 'relative', overflow: 'hidden',
          }}>
            <span style={{
              position: 'absolute', inset: 0, borderRadius: 50, pointerEvents: 'none',
              background: 'linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.22) 50%,transparent 65%)',
              backgroundSize: '200% 100%', animation: 'shimmerSweep 2s linear infinite',
            }} />
            ✦ アプリを体験する
          </a>
        </section>

        {/* ══ CONCEPT ══ */}
        <section style={{ marginBottom: 56 }}>
          <SectionLabel>作品概要</SectionLabel>
          <div style={{ ...glass, borderRadius: 20, padding: 'clamp(20px,4vw,32px)' }}>
            <p style={{ fontSize: 'clamp(0.85rem,2vw,1rem)', lineHeight: 2.0, color: 'rgba(255,218,243,0.92)', margin: 0 }}>
              MIRROR GRAPHは、<strong style={{ color: '#ffd700' }}>ファッションアイテムをトレーディングカードとして収集・管理</strong>し、
              AIとともにY2Kスタイルのコーデを楽しむWebアプリです。<br />
              服を「登録するツール」ではなく<strong style={{ color: '#ff80c8' }}>「カードを獲得・育成するゲーム」として再定義</strong>しました。
              スコアリング・セレモニー演出・コレクション達成率など、ゲーム的快感をファッション体験に持ち込んでいます。<br />
              ターゲットは<strong style={{ color: '#c084fc' }}>Y2K世代・ギャル好き・アイドルゲームファン</strong>の女性ユーザーです。
            </p>
          </div>
        </section>

        {/* ══ FEATURES ══ */}
        <section style={{ marginBottom: 56 }}>
          <SectionLabel>主要機能</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 14 }}>
            {FEATURES.map(f => (
              <div key={f.title} style={{
                ...glass, borderRadius: 16,
                padding: 'clamp(16px,3vw,22px)',
                borderColor: `${f.color}38`,
                boxShadow: `0 0 18px ${f.glow}18, inset 0 1px 0 rgba(255,255,255,0.08)`,
              }}>
                <div style={{ fontSize: '2rem', marginBottom: 10, lineHeight: 1 }}>{f.icon}</div>
                <h3 style={{
                  fontFamily: FREDOKA, fontSize: '1.05rem', fontWeight: 700,
                  margin: '0 0 8px', color: f.color,
                  textShadow: `0 0 10px ${f.glow}`,
                }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: '0.8rem', lineHeight: 1.8, color: 'rgba(255,210,240,0.8)', margin: 0 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ DIFFERENTIATION ══ */}
        <section style={{ marginBottom: 56 }}>
          <SectionLabel>差別化ポイント</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {DIFFS.map(d => (
              <div key={d.num} style={{
                ...glass, borderRadius: 16,
                padding: 'clamp(14px,3vw,20px) clamp(16px,3vw,24px)',
                display: 'flex', gap: 20, alignItems: 'flex-start',
              }}>
                <span style={{
                  fontFamily: FREDOKA, fontSize: '2.2rem', fontWeight: 700,
                  lineHeight: 1, flexShrink: 0,
                  background: `linear-gradient(180deg,${d.accent},rgba(255,255,255,0.5))`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  {d.num}
                </span>
                <div>
                  <h3 style={{
                    fontFamily: FREDOKA, fontSize: '1rem', fontWeight: 700,
                    margin: '0 0 6px', color: 'rgba(255,232,248,0.95)',
                  }}>
                    {d.title}
                  </h3>
                  <p style={{ fontSize: '0.8rem', lineHeight: 1.8, color: 'rgba(255,210,240,0.75)', margin: 0 }}>
                    {d.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ SCREEN FLOW ══ */}
        <section style={{ marginBottom: 56 }}>
          <SectionLabel>画面構成</SectionLabel>
          <div style={{ ...glass, borderRadius: 20, padding: 'clamp(20px,4vw,28px)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
              {[
                { label: 'ホーム',     sub: 'HOME',     color: '#ffd700' },
                { arrow: true },
                { label: 'カード作成', sub: 'CREATE',   color: '#ff69b4' },
                { arrow: true },
                { label: 'デッキ組む', sub: 'DECK',     color: '#c084fc' },
                { arrow: true },
                { label: 'アルバム',   sub: 'ALBUM',    color: '#60c8ff' },
                { arrow: true },
                { label: 'バインダー', sub: 'BINDER',   color: '#ff9f7f' },
              ].map((item, i) => {
                if ('arrow' in item) {
                  return <span key={i} style={{ color: 'rgba(255,200,240,0.4)', fontSize: '1.2rem' }}>→</span>
                }
                return (
                  <div key={i} style={{
                    textAlign: 'center', padding: '10px 18px', borderRadius: 12,
                    background: `${item.color}18`, border: `1px solid ${item.color}44`,
                    minWidth: 80,
                  }}>
                    <p style={{ fontFamily: FREDOKA, fontSize: '0.88rem', fontWeight: 700, margin: '0 0 2px', color: item.color }}>{item.label}</p>
                    <p style={{ fontFamily: FREDOKA, fontSize: '0.52rem', letterSpacing: '0.18em', color: 'rgba(255,200,240,0.5)', margin: 0 }}>{item.sub}</p>
                  </div>
                )
              })}
            </div>
            <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
              <p style={{ fontSize: '0.78rem', color: 'rgba(255,210,240,0.6)', margin: 0 }}>
                + パーソナライズ設定（SETTINGS） — 骨格・パーソナルカラー・ロールモデルのAI診断
              </p>
            </div>
          </div>
        </section>

        {/* ══ TECH ══ */}
        <section style={{ marginBottom: 56 }}>
          <SectionLabel>技術スタック</SectionLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {TECHS.map(t => (
              <span key={t} style={{
                padding: '8px 20px', borderRadius: 50,
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.18)',
                fontFamily: FREDOKA, fontSize: '0.88rem', fontWeight: 600,
                color: 'rgba(255,220,245,0.88)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
              }}>
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* ══ FOOTER ══ */}
        <footer style={{ textAlign: 'center', paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p style={{
            fontFamily: FREDOKA, fontSize: 'clamp(1.6rem,5vw,2.4rem)', fontWeight: 700,
            background: 'linear-gradient(90deg,#ffd700 0%,#ff69b4 50%,#c084fc 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            margin: '0 0 6px',
          }}>
            MIRROR GRAPH
          </p>
          <p style={{ fontFamily: FREDOKA, fontSize: '0.72rem', letterSpacing: '0.28em', color: 'rgba(255,215,0,0.5)', margin: '0 0 24px' }}>
            GMO DESIGN AWARD 2026
          </p>
          <a href="/" style={{
            fontFamily: FREDOKA, fontSize: '0.82rem', fontWeight: 700,
            color: 'rgba(255,150,220,0.7)', letterSpacing: '0.1em',
            textDecoration: 'none', borderBottom: '1px solid rgba(255,150,220,0.3)',
            paddingBottom: 2,
          }}>
            ✦ アプリを体験する →
          </a>
        </footer>

      </div>
    </div>
  )
}
