import { useRef, useEffect, useState, useMemo } from 'react'

import { useInfiniteQuery } from '@tanstack/react-query'
import type { UseFormReturn } from 'react-hook-form'

import type { NewsFilters, NewsResponse } from '@/types'

const fetchNews = async (filters: NewsFilters, page: number): Promise<NewsResponse> => {
  const params = new URLSearchParams({
    q: filters.q || 'tecnologia',
    pageSize: (filters.pageSize || 20).toString(),
    language: filters.language || 'pt',
    sortBy: filters.sortBy || 'publishedAt',
    page: page.toString(),
    searchIn: filters.searchIn || '',
    sources: filters.sources || '',
    domains: filters.domains || '',
    excludeDomains: filters.excludeDomains || '',
    from: filters.from || '',
    to: filters.to || '',
  })

  const response = await fetch(`/api/news?${params.toString()}`)
  const data = await response.json()

  return data
}

export const useInfiniteNews = (form: UseFormReturn<NewsFilters>) => {
  const filters = form.watch()
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [debouncedFilters, setDebouncedFilters] = useState<NewsFilters>(filters)
  const [isFirstRender, setIsFirstRender] = useState(true)

  const memoizedFilters = useMemo(
    () => ({ ...filters }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      filters.q,
      filters.pageSize,
      filters.language,
      filters.sortBy,
      filters.searchIn,
      filters.sources,
      filters.domains,
      filters.excludeDomains,
      filters.from,
      filters.to,
    ],
  )

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    debounceTimeoutRef.current = setTimeout(() => {
      setDebouncedFilters(memoizedFilters)
      setIsFirstRender(false)
    }, 500)

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
    }
  }, [memoizedFilters])

  return useInfiniteQuery({
    queryKey: ['infinite-news', debouncedFilters],
    queryFn: ({ pageParam = 1 }) => fetchNews(debouncedFilters, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length
      const totalPages = Math.ceil(lastPage.totalResults / (debouncedFilters.pageSize || 20))
      return currentPage < totalPages ? currentPage + 1 : undefined
    },
    initialPageParam: 1,
    staleTime: 60 * 1000, // 1 minute
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: true,
    enabled: !isFirstRender,
  })
}
