import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { name } = await req.json() as { name: string }

  // TODO: Replace with Gemini / GPT API call
  // const result = await model.generateContent(
  //   `「${name}」のファッション・スタイルの特徴を短く教えてください。` +
  //   'JSONで { description: string, styleKeywords: string[] } で返してください。'
  // )

  const styles: Record<string, { description: string; styleKeywords: string[] }> = {
    '浜崎あゆみ':         { description: 'Y2Kの象徴。ブリンブリンのアクセ・ホログラムコーデが代名詞', styleKeywords: ['#Y2K', '#ガーリー', '#ブリンブリン'] },
    'きゃりーぱみゅぱみゅ': { description: '原宿ゆめかわポップの先駆者。奇抜×可愛いスタイルの開拓者', styleKeywords: ['#ゆめかわ', '#原宿系', '#ポップ'] },
    '益若つばさ':          { description: '2000年代ギャルのアイコン。盛りヘアとデコスタイルが特徴',  styleKeywords: ['#ギャル', '#盛り', '#Y2K'] },
  }

  const found = styles[name.trim()]
  return NextResponse.json({
    name: name.trim(),
    description: found?.description ?? `「${name}」のスタイルをAIが学習しました。AI提案時にこの方のファッション傾向を参考にします✨`,
    styleKeywords: found?.styleKeywords ?? ['#トレンド', '#フェミニン', '#オリジナル'],
  })
}
