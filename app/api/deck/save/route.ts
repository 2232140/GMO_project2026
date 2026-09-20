import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { deck, scores } = await req.json()

  // TODO: Replace with database save (Prisma/Supabase etc.)
  // await prisma.deck.create({ data: { deck: JSON.stringify(deck), scores: JSON.stringify(scores), userId: session.user.id } })

  const savedDeck = {
    id: `deck_${Date.now()}`,
    deck,
    scores,
    savedAt: new Date().toISOString(),
  }

  return NextResponse.json({ success: true, savedDeck })
}
