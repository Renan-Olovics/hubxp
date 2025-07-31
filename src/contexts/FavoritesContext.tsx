'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type PropsWithChildren,
} from 'react'

import type { News } from '@/types/news'

const FAVORITES_KEY = 'favorite-news'

interface FavoritesContextType {
  favorites: News[]
  toggleFavorite: (article: News) => void
  isFavorite: (url: string) => boolean
  clearFavorites: () => void
  isLoaded: boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

const getStoredFavorites = (): News[] => {
  if (typeof window === 'undefined') return []

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
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  } catch (error) {
    console.error('Erro ao salvar favoritos no localStorage:', error)
  }
}

export const FavoritesProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<News[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const storedFavorites = getStoredFavorites()
    setFavorites(storedFavorites)
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
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
      return favorites.some((item) => item.url === url)
    },
    [favorites],
  )

  const clearFavorites = useCallback(() => {
    setFavorites([])
    saveFavoritesToStorage([])
  }, [])

  const value = {
    favorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    isLoaded,
  }

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
