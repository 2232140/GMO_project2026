export type CardCategory = 'tops' | 'bottoms' | 'shoes' | 'bag' | 'cosme'

export type CosmeSubCategory = 'lip' | 'eye' | 'cheek' | 'base' | 'nail' | 'palette'

export interface ItemCard {
  id: string
  name: string
  category: CardCategory
  cosmeSubCategory?: CosmeSubCategory
  brand?: string
  color: string
  gradient: string
  emoji: string
  tags: string[]
  rarity: 'normal' | 'rare' | 'super-rare' | 'legend'
  image?: string
}

export interface CoordCard {
  id: string
  name: string
  date: string
  deckCards: Record<CardCategory, ItemCard | null>
  totalScore: number
  theme: string
}

export type DeckSlot = ItemCard | null

export interface Deck {
  tops: DeckSlot
  bottoms: DeckSlot
  shoes: DeckSlot
  bag: DeckSlot
  cosme: DeckSlot
}

export interface UserProfile {
  name: string
  bodyType: string
  personalColor: string
  stylePreference: string[]
  roleModel?: string
}
