import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const NEWS_API_BASE_URL = 'https://newsapi.org/v2'
const API_KEY = process.env.NEWSAPI_KEY

export const GET = async (request: NextRequest) => {
  try {
    if (!API_KEY) {
      return NextResponse.json(
        { error: 'NEWS_API_KEY environment variable is not set' },
        { status: 500 },
      )
    }

    const { searchParams } = new URL(request.url)

    const queryParams = new URLSearchParams()
    queryParams.append('apiKey', API_KEY)

    const allowedParams = [
      'q',
      'searchIn',
      'sources',
      'domains',
      'excludeDomains',
      'from',
      'to',
      'language',
      'sortBy',
      'pageSize',
      'page',
    ]

    // Adicionar parâmetros da requisição à query da NewsAPI
    for (const [key, value] of searchParams.entries()) {
      if (allowedParams.includes(key)) {
        queryParams.append(key, value)
      }
    }

    // Fazer a requisição para a NewsAPI
    const apiUrl = `${NEWS_API_BASE_URL}/everything?${queryParams.toString()}`

    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        { error: errorData.message || 'Failed to fetch news data' },
        { status: response.status },
      )
    }

    const data = await response.json()

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    })
  } catch (error) {
    console.error('News API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
