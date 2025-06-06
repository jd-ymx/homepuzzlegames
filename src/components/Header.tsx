'use client'

import { useState, useEffect } from 'react'
import { Search, Menu, X, Gamepad2, ChevronDown } from 'lucide-react'
import type { HeaderProps } from '@/types'

export default function Header({ 
  onSearch, 
  onCategoryFilter, 
  categories, 
  searchQuery, 
  selectedCategory 
}: HeaderProps) {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || '')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)

  // 同步外部搜索状态
  useEffect(() => {
    setLocalSearchQuery(searchQuery || '')
  }, [searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(localSearchQuery)
  }

  const handleCategoryClick = (categoryId: string | null) => {
    onCategoryFilter(categoryId)
    setIsMobileMenuOpen(false)
  }

  const clearSearch = () => {
    setLocalSearchQuery('')
    onSearch('')
  }

  const toggleSearchExpanded = () => {
    setIsSearchExpanded(!isSearchExpanded)
  }

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
              <Gamepad2 className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              GameHub
            </h1>
          </div>

          {/* Desktop Search Bar */}
          <form 
            onSubmit={handleSearch} 
            className="hidden lg:flex items-center flex-1 max-w-lg mx-8"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search games..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              {localSearchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-3 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 flex-shrink-0">
            <button
              onClick={() => handleCategoryClick(null)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedCategory === null
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-1 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <span>{category.icon}</span>
                <span className="hidden xl:inline">{category.nameEn}</span>
              </button>
            ))}
          </nav>

          {/* Mobile/Tablet Search and Menu */}
          <div className="flex items-center space-x-2 lg:hidden">
            {/* Mobile Search Toggle */}
            <button
              onClick={toggleSearchExpanded}
              className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Expanded */}
        {isSearchExpanded && (
          <div className="lg:hidden py-4 border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search games..."
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  autoFocus
                />
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                {localSearchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-3 top-3 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
            {/* Mobile Navigation */}
            <nav className="space-y-2">
              <button
                onClick={() => handleCategoryClick(null)}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === null
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                🎮 All Games
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-3 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <span className="text-xl">{category.icon}</span>
                  <span>{category.nameEn}</span>
                </button>
              ))}
            </nav>

            {/* Mobile Footer Links */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="space-y-2">
                <a 
                  href="mailto:feedback@gamehub.com"
                  className="block px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  📧 Send Feedback
                </a>
                <a 
                  href="#"
                  className="block px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  🚀 Submit Your Game
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 