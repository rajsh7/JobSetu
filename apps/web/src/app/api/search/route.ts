import { NextResponse, type NextRequest } from 'next/server'
import { searchPortal } from '@/lib/data'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const q = searchParams.get('q') || ''

  try {
    const data = await searchPortal(q)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ items: [], exams: [] }, { status: 500 })
  }
}
