'use client'

import { useState } from 'react'
import Link from 'next/link'
import GameCard from '@/components/GameCard'
import Header from '@/components/Header'
import gamesData from '@/data/games.json'
import type { Game, Category, GameData } from '@/types'

export default function GamesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  
  const games: Game[] = (gamesData as GameData).games
  const categories: Category[] = (gamesData as GameData).categories

  // 过滤游戏
  const filteredGames = selectedCategory 
    ? games.filter(game => game.category === selectedCategory)
    : games

  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header 
        onSearch={() => {}} // 简化版，不包含搜索功能
        onCategoryFilter={handleCategoryFilter}
        categories={categories}
        searchQuery=""
        selectedCategory={selectedCategory}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            所有游戏
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            浏览我们收集的 {games.length} 款精彩网页游戏
          </p>
        </div>

        {/* 面包屑导航 */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                首页
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">游戏列表</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* 分类过滤器 */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap justify-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
            <button
              onClick={() => handleCategoryFilter(null)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                selectedCategory === null
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              全部游戏
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryFilter(category.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.nameEn}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 游戏统计 */}
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600">
            {selectedCategory ? (
              <>显示 <span className="font-semibold text-blue-600">{filteredGames.length}</span> 款 {categories.find(c => c.id === selectedCategory)?.nameEn} 游戏</>
            ) : (
              <>共有 <span className="font-semibold text-blue-600">{filteredGames.length}</span> 款游戏</>
            )}
          </p>
        </div>

        {/* 游戏网格 */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {filteredGames.map((game) => (
              <GameCard 
                key={game.id} 
                game={game}
                // 移除onClick回调，让详情按钮正确跳转到详情页
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-8xl mb-6">🎮</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              暂无游戏
            </h3>
            <p className="text-gray-600 mb-6">
              该分类下暂时没有游戏，请选择其他分类。
            </p>
            <button
              onClick={() => handleCategoryFilter(null)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              查看全部游戏
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="text-3xl">🎮</span>
              <h3 className="text-2xl font-bold">GameHub</h3>
            </div>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              发现并立即游玩精彩的网页游戏，无需下载。
            </p>
            <div className="border-t border-gray-800 pt-6">
              <p className="text-gray-500 text-sm">
                © 2024 GameHub. 保留所有权利。游戏版权归各自所有者。
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 