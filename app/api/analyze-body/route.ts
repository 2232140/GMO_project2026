import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  // Accept: { image: string } — base64 dataURL (compressed JPEG)
  const { image } = await req.json()
  void image // used by real API

  // TODO: Replace with Gemini Vision API
  // import { GoogleGenerativeAI } from '@google/generative-ai'
  // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
  // const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })
  // const result = await model.generateContent([
  //   { inlineData: { mimeType: 'image/jpeg', data: image.replace(/^data:image\/\w+;base64,/, '') } },
  //   'この写真の人物の骨格タイプ（ストレート/ウェーブ/ナチュラル）と' +
  //   'パーソナルカラー（spring/summer/autumn/winter）を診断し、' +
  //   'JSONで { skeleton, personalColor, personalColorLabel, description, tips } を返してください。'
  // ])

  // Mock response — rotate through results so it feels varied
  const skeletons: { key: string; label: string; tip: string }[] = [
    { key: 'ストレート', label: 'ストレート', tip: 'シャープなラインと上質素材で洗練感が出ます' },
    { key: 'ウェーブ',   label: 'ウェーブ',   tip: 'ウエストマークとふわっとシルエットが得意です' },
    { key: 'ナチュラル', label: 'ナチュラル', tip: 'ルーズなシルエットとナチュラル素材が似合います' },
  ]
  const colors = [
    { key: 'spring', label: 'スプリング', desc: '明るくクリアな暖色（コーラル・ピーチ・アイボリー）が似合います' },
    { key: 'summer', label: 'サマー',     desc: 'ソフトで涼しげなブルーベース（ラベンダー・ロイヤルブルー）が似合います' },
    { key: 'autumn', label: 'オータム',   desc: '深みのある暖色（テラコッタ・カーキ・ブラウン）が似合います' },
    { key: 'winter', label: 'ウィンター', desc: 'クールでビビッドなカラー（ロイヤルパープル・ネイビー・ホワイト）が似合います' },
  ]

  const s = skeletons[Math.floor(Math.random() * skeletons.length)]
  const c = colors[Math.floor(Math.random() * colors.length)]

  return NextResponse.json({
    skeleton: s.key,
    personalColor: c.key,
    personalColorLabel: c.label,
    description: `骨格タイプ「${s.label}」・パーソナルカラー「${c.label}」と診断しました！${s.tip}。また、${c.desc}💗`,
    tips: [s.tip, `${c.label}カラーのアイテムを取り入れて`, 'コーデ全体のまとまりがアップします'],
  })
}
