import { NextRequest, NextResponse } from 'next/server'

const Y2K_STYLE = { tops: 't2', bottoms: 'b1', shoes: 's2', cosme: 'c2', bag: 'g1' }
const GIRLY_STYLE = { tops: 't1', bottoms: 'b2', shoes: 's1', cosme: 'c1', bag: 'g2' }

export async function POST(req: NextRequest) {
  const { deck, locks } = await req.json()

  // TODO: Replace with Gemini API call
  // const geminiResponse = await fetch(process.env.GEMINI_API_URL!, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.GEMINI_API_KEY}` },
  //   body: JSON.stringify({ deck, locks, prompt: 'Suggest a Y2K coordinate...' }),
  // })
  // const { suggested } = await geminiResponse.json()

  const chosen = [Y2K_STYLE, GIRLY_STYLE][Math.floor(Math.random() * 2)] as Record<string, string>

  const resultDeck: Record<string, string | null> = {}
  for (const cat of ['tops', 'bottoms', 'shoes', 'cosme', 'bag']) {
    resultDeck[cat] = locks[cat] ? (deck[cat] ?? chosen[cat]) : chosen[cat]
  }

  const scores =
    chosen === Y2K_STYLE
      ? [
          { label: '✨ Y2Kギャル度', pct: 94 },
          { label: '💜 ホロ&パープル感', pct: 88 },
          { label: '👑 コーデ完成度', pct: 100 },
        ]
      : [
          { label: '💗 ガーリー感', pct: 92 },
          { label: '🌸 ピンクコーデ', pct: 87 },
          { label: '👑 コーデ完成度', pct: 100 },
        ]

  return NextResponse.json({ deck: resultDeck, scores })
}
