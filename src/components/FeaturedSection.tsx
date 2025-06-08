'use client'

import { Star, Sparkles } from 'lucide-react'
import GameCard from './GameCard'
import type { FeaturedSectionProps } from '@/types'

export default function FeaturedSection({ games, onGameClick }: FeaturedSectionProps) {
  if (!games || games.length === 0) {
    return null
  }

  return (
    <section className="mb-16">
      {/* 标题区域 */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl">
              <Star className="w-6 h-6 text-white fill-current" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Games</h2>
            <Sparkles className="w-6 h-6 text-yellow-500" />
          </div>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Hand-picked premium games that offer the best gaming experience
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto mt-4 rounded-full"></div>
      </div>
      
      {/* 游戏网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {games.map((game, index) => (
          <GameCard 
            key={game.id} 
            game={game} 
            onClick={onGameClick || undefined}
            size={index === 0 && games.length > 1 ? 'large' : 'medium'}
            featured={true}
          />
        ))}
      </div>

      {/* 装饰性元素 */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center space-x-2 text-gray-500 text-sm">
          <span>✨</span>
          <span>Curated for quality and fun</span>
          <span>✨</span>
        </div>
      </div>
    </section>
  )
} 