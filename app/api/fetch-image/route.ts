import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')
  if (!url) return NextResponse.json({ error: 'No URL provided' }, { status: 400 })

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MirrorGraph/1.0)',
        'Accept': 'image/*,*/*',
        'Referer': new URL(url).origin,
      },
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const contentType = res.headers.get('Content-Type') ?? 'image/jpeg'
    if (!contentType.startsWith('image/')) throw new Error('Not an image')
    const buffer = await res.arrayBuffer()
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
