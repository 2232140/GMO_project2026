const STORAGE_KEY = 'mirror_graph_user_cards'

export interface StoredCard {
  id: string
  category: string
  name: string
  image: string   // compressed jpeg dataURL
  color: string   // hex for glow (from theme)
  brand: string
  colorName: string
  rarity: string
  tags: string[]
  createdAt: string
}

export function getStoredCards(): StoredCard[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as StoredCard[]) : []
  } catch {
    return []
  }
}

export function saveStoredCard(card: StoredCard): void {
  const cards = getStoredCards()
  const idx = cards.findIndex(c => c.id === card.id)
  if (idx >= 0) {
    cards[idx] = card
  } else {
    cards.unshift(card) // newest first
  }
  // If quota exceeded, drop oldest until it fits
  while (cards.length > 0) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cards))
      break
    } catch {
      cards.pop()
    }
  }
}

/** Resize & compress an image src (dataURL or blob URL) to a compact JPEG dataURL */
export async function compressImageToDataUrl(
  src: string,
  maxW = 380,
  maxH = 570,
  quality = 0.72
): Promise<string> {
  return new Promise(resolve => {
    const img = new Image()
    img.onload = () => {
      const nw = img.naturalWidth  || maxW
      const nh = img.naturalHeight || maxH
      const scale = Math.min(maxW / nw, maxH / nh, 1)
      const w = Math.max(1, Math.round(nw * scale))
      const h = Math.max(1, Math.round(nh * scale))
      const canvas = document.createElement('canvas')
      canvas.width  = w
      canvas.height = h
      const ctx = canvas.getContext('2d')
      if (!ctx) { resolve('/img/dress.png'); return }
      ctx.drawImage(img, 0, 0, w, h)
      resolve(canvas.toDataURL('image/jpeg', quality))
    }
    img.onerror = () => resolve('/img/dress.png')
    img.src = src
  })
}
