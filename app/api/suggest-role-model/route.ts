import { NextRequest, NextResponse } from 'next/server'

const POOL = [
  { name: '浜崎あゆみ',         description: 'Y2Kの象徴。煌びやかでパワフルなガーリースタイルのアイコン', styleKeywords: ['#Y2K', '#ガーリー', '#ブリンブリン', '#平成ギャル'] },
  { name: 'きゃりーぱみゅぱみゅ',description: 'ゆめかわいいポップカルチャーの先駆者。原宿ファッションの代名詞',  styleKeywords: ['#ゆめかわ', '#原宿系', '#ポップ', '#カラフル'] },
  { name: '益若つばさ',          description: '2000年代ギャルカルチャーの顔。盛りヘアとデコスタイルが特徴',    styleKeywords: ['#ギャル', '#盛り', '#Y2K', '#フェミニン'] },
  { name: '西野七瀬',            description: 'ナチュラルガーリーの代表格。シンプルで上品なコーデが得意',      styleKeywords: ['#ナチュラル', '#ガーリー', '#清楚系', '#フェミニン'] },
  { name: '桐谷美玲',            description: 'クールエレガントスタイル。高身長を活かした縦長シルエットが映える', styleKeywords: ['#エレガント', '#シック', '#モード', '#清楚系'] },
  { name: '水原希子',            description: 'ストリート×フェミニンを融合させたユニークなスタイル',          styleKeywords: ['#ストリート', '#フェミニン', '#ミックス', '#モード'] },
  { name: 'にこるん（Nicole）',  description: 'ガーリー＆Y2Kスタイルを現代にアップデート。キラキラ系の旗手',  styleKeywords: ['#ガーリー', '#Y2K', '#量産型', '#ピンク'] },
  { name: '藤田ニコル',          description: 'ポップでキャッチーなカジュアルスタイル。トレンドへの感度が高い',  styleKeywords: ['#カジュアル', '#ポップ', '#トレンド', '#ガーリー'] },
]

export async function POST(req: NextRequest) {
  const { image } = await req.json()
  void image // used by real API

  // TODO: Replace with celebrity face recognition + style matching
  // Options:
  //   AWS Rekognition Celebrity Recognition API
  //   Microsoft Azure Face API (similar face detection)
  //   Google Cloud Vision API (celebrity identification)
  //   Gemini 1.5 Pro Vision: "この写真の人に雰囲気が似ている日本の芸能人・インフルエンサーを3名挙げてください"
  //
  // Example Gemini call:
  // const result = await model.generateContent([
  //   { inlineData: { mimeType: 'image/jpeg', data: image.replace(/^data:image\/\w+;base64,/, '') } },
  //   '写真の人物の雰囲気・顔の印象・ファッションセンスに最も近い日本の芸能人・インフルエンサーを3名、' +
  //   'JSON配列で { name, description, styleKeywords[] } として返してください。'
  // ])

  // Mock: shuffle and return 3
  const shuffled = [...POOL].sort(() => Math.random() - 0.5)
  return NextResponse.json({ suggestions: shuffled.slice(0, 3) })
}
