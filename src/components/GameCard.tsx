'use client'

import { ExternalLink, Star, Play, Info } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { GameCardProps } from '@/types'

export default function GameCard({ 
  game, 
  onClick, 
  size = 'medium',
  featured = false 
}: GameCardProps) {
  const router = useRouter()

  // 详情按钮处理 - 总是跳转到详情页
  const handleDetailClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/game/${game.id}`)
  }

  // 游戏按钮处理 - 直接启动游戏
  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(game.url, '_blank', 'noopener,noreferrer')
  }

  // 卡片点击处理 - 执行传入的onClick回调或默认跳转到详情页
  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onClick) {
      onClick(game)
    } else {
      router.push(`/game/${game.id}`)
    }
  }

  // 根据尺寸设置样式
  const sizeClasses = {
    small: {
      container: 'min-h-[288px]', // h-72 equivalent
      image: 'h-32',
      title: 'text-base',
      description: 'text-xs',
      padding: 'p-3'
    },
    medium: {
      container: 'min-h-[320px]', // h-80 equivalent  
      image: 'h-40',
      title: 'text-lg',
      description: 'text-sm',
      padding: 'p-4'
    },
    large: {
      container: 'min-h-[384px]', // h-96 equivalent
      image: 'h-48',
      title: 'text-xl',
      description: 'text-base',
      padding: 'p-6'
    },
    compact: {
      container: 'min-h-[256px]', // h-64 equivalent
      image: 'h-28',
      title: 'text-sm',
      description: 'text-xs',
      padding: 'p-3'
    }
  }

  const currentSize = sizeClasses[size]
  const isFeatured = game.featured || featured

  return (
    <div 
      className={`game-card bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-100 overflow-hidden cursor-pointer group transition-all duration-300 hover:-translate-y-1 ${currentSize.container} ${isFeatured ? 'ring-2 ring-yellow-400 ring-opacity-50' : ''} flex flex-col`}
      onClick={handleCardClick}
    >
      {/* 游戏缩略图 */}
      <div className={`relative ${currentSize.image} bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 flex items-center justify-center flex-shrink-0`}>
        {game.thumbnail ? (
          <div className="relative w-full h-full">
            <Image
              src={game.thumbnail}
              alt={game.title}
              width={320}
              height={180}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                // 显示默认图标
                const parent = target.parentElement
                if (parent) {
                  parent.innerHTML = '<div class="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center"><span class="text-3xl">🎮</span></div>'
                }
              }}
            />
          </div>
        ) : (
          <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-3xl">🎮</span>
          </div>
        )}
        
        {/* 精选标签 */}
        {isFeatured && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 shadow-sm">
            <Star className="w-3 h-3 fill-current" />
            <span>Featured</span>
          </div>
        )}

        {/* 悬停时的播放按钮 */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <div className="bg-white rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg">
            <Play className="w-6 h-6 text-blue-600 fill-current" />
          </div>
        </div>

        {/* 分类标签 */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
          {game.category === 'puzzle' && '🧩'}
          {game.category === 'action' && '⚡'}
          {game.category === 'strategy' && '🎯'}
          {game.category === 'casual' && '🎮'}
          {game.category === 'roleplay' && '🎭'}
          <span className="ml-1 capitalize">{game.category}</span>
        </div>
      </div>

      {/* 游戏信息 - 使用flex-1确保填充剩余空间 */}
      <div className={`${currentSize.padding} flex-1 flex flex-col`}>
        <h3 className={`font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1 ${currentSize.title}`}>
          {game.title}
        </h3>
        
        {size !== 'small' && (
          <p className={`text-gray-600 mb-3 line-clamp-2 ${currentSize.description} flex-shrink-0`}>
            {game.descriptionEn || game.description}
          </p>
        )}
        
        {/* 标签 */}
        {size !== 'small' && game.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3 flex-shrink-0">
            {game.tags.slice(0, size === 'large' ? 4 : 2).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* 占位符，推送按钮到底部 */}
        <div className="flex-1"></div>

        {/* 操作按钮区域 - 固定在底部 */}
        <div className="flex space-x-2 mt-auto">
          <button 
            onClick={handleDetailClick}
            className={`flex-1 bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-lg transition-all duration-200 font-medium flex items-center justify-center space-x-2 ${size === 'small' ? 'py-2 text-sm' : 'py-3'}`}
          >
            <Info className="w-4 h-4" />
            <span>详情</span>
          </button>
          
          <button 
            onClick={handlePlayClick}
            className={`flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 font-medium flex items-center justify-center space-x-2 transform group-hover:scale-105 ${size === 'small' ? 'py-2 text-sm' : 'py-3'}`}
          >
            <span>游戏</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
} 