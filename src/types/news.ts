export interface News {
  source: {
    id: string | null
    name: string
  }
  author: string | null
  title: string
  description: string | null
  url: string
  urlToImage: string | null
  publishedAt: string | null
  content: string | null
}

export interface NewsResponse {
  status: string
  totalResults: number
  articles: News[]
  error?: string
}
