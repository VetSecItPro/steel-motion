'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface BlogSearchProps {
  className?: string
}

export function BlogSearch({ className }: BlogSearchProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get('search') || ''
  const [searchTerm, setSearchTerm] = useState(initialSearch)

  // Debounce search
  const updateSearch = useCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (term) {
      params.set('search', term)
      params.set('page', '1') // Reset to first page on new search
    } else {
      params.delete('search')
    }

    router.push(`/blog?${params.toString()}`)
  }, [router, searchParams])

  // Debounced effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== initialSearch) {
        updateSearch(searchTerm)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm, initialSearch, updateSearch])

  const handleClear = () => {
    setSearchTerm('')
    const params = new URLSearchParams(searchParams.toString())
    params.delete('search')
    params.set('page', '1')
    router.push(`/blog?${params.toString()}`)
  }

  return (
    <div className={className}>
      <label htmlFor="blog-search" className="block text-sm font-medium text-white mb-2">
        Search Articles
      </label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <Input
          id="blog-search"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search blog posts..."
          className="pl-10 pr-10 bg-[#0a1728]/80 border-[#1a3a5c] text-white placeholder:text-gray-500 focus:border-[#00F2FF] focus:ring-[#00F2FF]/20"
          aria-label="Search blog posts"
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      {searchTerm && (
        <p className="text-sm text-[#B3B3B3] mt-2">
          Searching for: <span className="text-[#00F2FF]">&quot;{searchTerm}&quot;</span>
        </p>
      )}
    </div>
  )
}
