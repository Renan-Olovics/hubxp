import { useState, useEffect, useCallback } from 'react'

import type { News } from '@/types/news'

const FAVORITES_KEY = 'favorite-news'

const isClient = typeof window !== 'undefined'

const getStoredFavorites = (): News[] => {
  if (!isClient) return []

  try {
    const stored = localStorage.getItem(FAVORITES_KEY)
    const parsed = stored ? JSON.parse(stored) : []
    return parsed
  } catch (error) {
    console.error('Erro ao carregar favoritos do localStorage:', error)
    return []
  }
}

const saveFavoritesToStorage = (favorites: News[]): void => {
  if (!isClient) return

  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  } catch (error) {
    console.error('Erro ao salvar favoritos no localStorage:', error)
  }
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<News[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (isClient) {
      const storedFavorites = getStoredFavorites()
      setFavorites(storedFavorites)
      setIsLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (isLoaded && isClient) {
      saveFavoritesToStorage(favorites)
    }
  }, [favorites, isLoaded])

  const toggleFavorite = useCallback((article: News) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.url === article.url)
      if (exists) {
        return prev.filter((item) => item.url !== article.url)
      } else {
        return [...prev, article]
      }
    })
  }, [])

  const isFavorite = useCallback(
    (url: string) => {
      if (!isClient || !url) return false
      return favorites.some((item) => item.url === url)
    },
    [favorites],
  )

  const clearFavorites = useCallback(() => {
    setFavorites([])
    saveFavoritesToStorage([])
  }, [])

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    isLoaded,
  }
}
