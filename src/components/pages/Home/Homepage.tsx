'use client'

import { useRef, useCallback, useState } from 'react'

import { FormProvider, useForm } from 'react-hook-form'

import { Card, InputForm, ErrorBoundary, FavoritesTab } from '@/components/atoms'
import { useFavorites } from '@/hooks'
import { useInfiniteNews } from '@/services'
import type { News, NewsFilters } from '@/types'

type TabType = 'news' | 'favorites'

export const Homepage = () => {
  const form = useForm<NewsFilters>()
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [activeTab, setActiveTab] = useState<TabType>('news')
  const { toggleFavorite, isFavorite, isLoaded, favorites, clearFavorites } = useFavorites()

  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteNews(form)

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return
      if (observerRef.current) observerRef.current.disconnect()
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      })
      if (node) observerRef.current.observe(node)
    },
    [isLoading, hasNextPage, isFetchingNextPage, fetchNextPage],
  )

  const allArticles = data?.pages.flatMap((page) => page.articles) || []
  const totalResults = data?.pages[0]?.totalResults || 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900 transition-all duration-300 hover:scale-105 hover:text-blue-600 sm:text-4xl md:text-5xl">
          📰 Buscador de Notícias 🔍
        </h1>

        <div className="mb-8 flex justify-center">
          <div className="flex rounded-xl bg-white p-2 shadow-lg">
            <button
              onClick={() => setActiveTab('news')}
              className={`rounded-lg px-4 py-2 font-medium transition-all duration-300 hover:scale-105 sm:px-6 sm:py-3 md:px-8 ${
                activeTab === 'news'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                  : 'bg-gray-50 text-gray-600 hover:text-gray-900'
              }`}
            >
              📰 Notícias
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`relative rounded-lg px-4 py-2 font-medium transition-all duration-300 hover:scale-105 sm:px-6 sm:py-3 md:px-8 ${
                activeTab === 'favorites'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                  : 'bg-gray-50 text-gray-600 hover:text-gray-900'
              }`}
            >
              ❤️ Favoritos
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 animate-pulse items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-md sm:h-6 sm:w-6">
                  {favorites.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {activeTab === 'news' && (
          <>
            <div className="mb-8 rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl sm:p-8">
              <h3 className="mb-6 text-lg font-semibold text-gray-800 transition-all duration-300 hover:scale-105 hover:text-blue-600 sm:text-xl">
                🔍 Filtros de Busca
              </h3>
              <FormProvider {...form}>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <InputForm
                      id="q"
                      name="q"
                      label="🔎 Termo de Busca"
                      type="text"
                      placeholder="Ex: tecnologia, política, esportes..."
                      required
                    />

                    <InputForm
                      id="searchIn"
                      name="searchIn"
                      label="📍 Buscar em"
                      type="select"
                      options={[
                        { value: '', label: '🌐 Todos os campos' },
                        { value: 'title', label: '📝 Título' },
                        { value: 'description', label: '📄 Descrição' },
                        { value: 'content', label: '📖 Conteúdo' },
                      ]}
                    />

                    <InputForm
                      id="sources"
                      name="sources"
                      label="📡 Fontes"
                      type="text"
                      placeholder="Ex: bbc-news, cnn, reuters"
                    />

                    <InputForm
                      id="domains"
                      name="domains"
                      label="🌍 Domínios"
                      type="text"
                      placeholder="Ex: bbc.com, cnn.com"
                    />

                    <InputForm
                      id="excludeDomains"
                      name="excludeDomains"
                      label="🚫 Excluir Domínios"
                      type="text"
                      placeholder="Ex: spam.com, fake-news.com"
                    />

                    <InputForm id="from" name="from" label="📅 Data de Início" type="date" />

                    <InputForm id="to" name="to" label="📅 Data de Fim" type="date" />

                    <InputForm
                      id="language"
                      name="language"
                      label="🌐 Idioma"
                      type="select"
                      options={[
                        { value: '', label: '🌍 Todos' },
                        { value: 'ar', label: '🇸🇦 Árabe' },
                        { value: 'de', label: '🇩🇪 Alemão' },
                        { value: 'en', label: '🇺🇸 Inglês' },
                        { value: 'es', label: '🇪🇸 Espanhol' },
                        { value: 'fr', label: '🇫🇷 Francês' },
                        { value: 'he', label: '🇮🇱 Hebraico' },
                        { value: 'it', label: '🇮🇹 Italiano' },
                        { value: 'nl', label: '🇳🇱 Holandês' },
                        { value: 'no', label: '🇳🇴 Norueguês' },
                        { value: 'pt', label: '🇧🇷 Português' },
                        { value: 'ru', label: '🇷🇺 Russo' },
                        { value: 'sv', label: '🇸🇪 Sueco' },
                        { value: 'zh', label: '🇨🇳 Chinês' },
                      ]}
                    />

                    <InputForm
                      id="sortBy"
                      name="sortBy"
                      label="📊 Ordenar por"
                      type="select"
                      defaultValue="publishedAt"
                      options={[
                        { value: 'publishedAt', label: '📅 Data de Publicação' },
                        { value: 'relevancy', label: '🎯 Relevância' },
                        { value: 'popularity', label: '🔥 Popularidade' },
                      ]}
                    />
                  </div>
                </form>
              </FormProvider>
            </div>

            {isLoading && allArticles.length === 0 && (
              <div className="py-12 text-center sm:py-16">
                <div className="mb-6 inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600 sm:h-12 sm:w-12"></div>
                <p className="text-base text-gray-600 transition-all duration-300 hover:scale-105 sm:text-lg">
                  ⏳ Carregando notícias...
                </p>
              </div>
            )}

            {isError && (
              <div className="mb-8 rounded-xl border border-red-400 bg-red-50 px-4 py-3 text-red-700 shadow-lg transition-all duration-300 hover:shadow-xl sm:px-6 sm:py-4">
                <strong className="text-base sm:text-lg">❌ Erro:</strong>{' '}
                {error?.message || 'Erro ao carregar notícias'}
              </div>
            )}

            {allArticles.length > 0 && (
              <div>
                <div className="mb-8 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 transition-all duration-300 hover:scale-105 hover:text-blue-600 sm:text-2xl md:text-3xl">
                    📊 Resultados ({allArticles.length} de {totalResults} notícias carregadas)
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {allArticles.map((article: News, index: number) => (
                    <div
                      key={`${article?.publishedAt}-${index}`}
                      ref={index === allArticles.length - 1 ? lastElementRef : undefined}
                      className="transition-all duration-300 hover:scale-105"
                    >
                      <ErrorBoundary>
                        <Card
                          article={article}
                          toggleFavorite={toggleFavorite}
                          isFavorite={isFavorite(article?.url || '')}
                          isLoaded={isLoaded}
                        />
                      </ErrorBoundary>
                    </div>
                  ))}
                </div>

                {isFetchingNextPage && (
                  <div className="mt-8 py-6 text-center sm:mt-12 sm:py-8">
                    <div className="mb-6 inline-block h-6 w-6 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600 sm:h-8 sm:w-8"></div>
                    <p className="text-base text-gray-600 transition-all duration-300 hover:scale-105 sm:text-lg">
                      ⏳ Carregando mais notícias...
                    </p>
                  </div>
                )}

                {!hasNextPage && allArticles.length > 0 && (
                  <div className="mt-8 py-6 text-center sm:mt-12 sm:py-8">
                    <p className="text-base text-gray-600 transition-all duration-300 hover:scale-105 sm:text-lg">
                      🏁 Você chegou ao final dos resultados.
                    </p>
                  </div>
                )}
              </div>
            )}

            {!isLoading && !isError && allArticles.length === 0 && (
              <div className="py-12 text-center sm:py-16">
                <p className="text-lg text-gray-600 transition-all duration-300 hover:scale-105 sm:text-xl">
                  🔍 Nenhuma notícia encontrada com os filtros aplicados.
                </p>
              </div>
            )}
          </>
        )}

        <FavoritesTab
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
          isActive={activeTab === 'favorites'}
          favorites={favorites}
          clearFavorites={clearFavorites}
        />
      </div>
    </div>
  )
}
