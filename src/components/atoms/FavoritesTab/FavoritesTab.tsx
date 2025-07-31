import { memo } from 'react'

import { Card } from '@/components/atoms'
import type { News } from '@/types/news'

interface FavoritesTabProps {
  isActive: boolean
  favorites: News[]
  clearFavorites: () => void
  toggleFavorite: (article: News) => void
  isFavorite: (url: string) => boolean
}

export const FavoritesTab = memo(
  ({ isActive, favorites, clearFavorites, toggleFavorite, isFavorite }: FavoritesTabProps) => {
    if (!isActive) return null

    return (
      <div className="space-y-6 sm:space-y-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-0">
          <h2 className="text-xl font-semibold text-gray-900 transition-all duration-300 hover:scale-105 hover:text-blue-600 sm:text-2xl md:text-3xl">
            ❤️ Favoritos ({favorites.length} notícias)
          </h2>
          {favorites.length > 0 && (
            <button
              onClick={clearFavorites}
              className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-4 py-2 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-red-700 hover:to-red-800 hover:shadow-xl active:scale-95 sm:px-6 sm:py-3"
            >
              <span className="text-sm font-medium sm:text-base">🗑️ Limpar Favoritos</span>
              <svg
                className="h-3 w-3 transition-transform group-hover:rotate-12 sm:h-4 sm:w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}
        </div>

        {favorites.length === 0 ? (
          <div className="py-12 text-center sm:py-16">
            <div className="mb-6 text-gray-400 transition-all duration-300 hover:scale-110">
              <svg
                className="mx-auto h-16 w-16 sm:h-20 sm:w-20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <p className="mb-2 text-lg text-gray-600 transition-all duration-300 hover:scale-105 sm:text-xl">
              💔 Nenhuma notícia favoritada ainda.
            </p>
            <p className="text-sm text-gray-500 transition-all duration-300 hover:scale-105 sm:text-base">
              Clique no coração nas notícias para adicioná-las aos favoritos.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {favorites.map((article, index) => (
              <div
                key={article.url}
                className="transition-all duration-300 hover:scale-105"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <Card
                  article={article}
                  toggleFavorite={toggleFavorite}
                  isFavorite={isFavorite(article.url)}
                  isLoaded={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    )
  },
)

FavoritesTab.displayName = 'FavoritesTab'
