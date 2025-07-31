import Image from 'next/image'

import type { News } from '@/types/news'

interface CardProps {
  article: News
  toggleFavorite: (article: News) => void
  isFavorite: boolean
  isLoaded: boolean
}

export const Card = ({ article, toggleFavorite, isFavorite, isLoaded }: CardProps) => {
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(article)
  }

  if (!isLoaded) {
    return (
      <div className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        {article?.urlToImage && (
          <div className="relative h-40 w-full overflow-hidden sm:h-48">
            <Image
              src={article?.urlToImage}
              alt={article.title || 'Notícia'}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="p-4 sm:p-6">
          <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900 transition-all duration-300 group-hover:text-blue-600 sm:mb-3 sm:text-xl">
            {article.title}
          </h3>
          <p className="mb-3 line-clamp-3 text-sm text-gray-600 transition-all duration-300 group-hover:text-gray-700 sm:mb-4 sm:text-base">
            {article.description}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500 sm:text-sm">
            <span className="transition-all duration-300 group-hover:text-blue-500">
              📰 {article.source.name}
            </span>
            <span className="transition-all duration-300 group-hover:text-blue-500">
              📅{' '}
              {article.publishedAt
                ? new Date(article.publishedAt).toLocaleDateString('pt-BR')
                : 'Data não disponível'}
            </span>
          </div>
          <div className="mt-4 sm:mt-6">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl active:scale-95 sm:px-6 sm:py-3"
            >
              <span className="text-sm font-medium sm:text-base">📖 Ler mais</span>
              <svg
                className="h-3 w-3 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      {article?.urlToImage && (
        <div className="relative h-40 w-full overflow-hidden sm:h-48">
          <Image
            src={article?.urlToImage}
            alt={article?.title || 'Notícia'}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <button
            onClick={handleToggleFavorite}
            className="absolute top-2 right-2 rounded-full bg-white/90 p-1.5 transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-lg sm:top-3 sm:right-3 sm:p-2"
            aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <svg
              className={`h-4 w-4 transition-all duration-300 sm:h-5 sm:w-5 ${
                isFavorite
                  ? 'scale-110 fill-red-500 text-red-500'
                  : 'text-gray-600 hover:scale-110 hover:text-red-500'
              }`}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill={isFavorite ? 'currentColor' : 'none'}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      )}
      <div className="p-4 sm:p-6">
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900 transition-all duration-300 group-hover:text-blue-600 sm:mb-3 sm:text-xl">
          {article.title}
        </h3>
        <p className="mb-3 line-clamp-3 text-sm text-gray-600 transition-all duration-300 group-hover:text-gray-700 sm:mb-4 sm:text-base">
          {article.description}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500 sm:text-sm">
          <span className="transition-all duration-300 group-hover:text-blue-500">
            📰 {article.source.name}
          </span>
          <span className="transition-all duration-300 group-hover:text-blue-500">
            📅{' '}
            {article.publishedAt
              ? new Date(article.publishedAt).toLocaleDateString('pt-BR')
              : 'Data não disponível'}
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between sm:mt-6">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl active:scale-95 sm:px-6 sm:py-3"
          >
            <span className="text-sm font-medium sm:text-base">📖 Ler mais</span>
            <svg
              className="h-3 w-3 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
