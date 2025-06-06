'use client'

import { useState } from 'react'
import GameCard from '@/components/GameCard'
import gamesData from '@/data/games.json'
import type { Game, Category, GameData } from '@/types'

export default function Home() {
  const games: Game[] = (gamesData as GameData).games
  const categories: Category[] = (gamesData as GameData).categories

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">GameHub</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero区域 */}
        <section className="py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Discover Amazing Web Games
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Play instantly in your browser. No downloads, no installations.
          </p>
        </section>

        {/* 游戏网格 */}
        <section className="py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse All Games</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {games.map((game) => (
              <GameCard 
                key={game.id} 
                game={game}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
} 