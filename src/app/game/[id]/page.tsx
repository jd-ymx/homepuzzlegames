import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import gameData from '@/data/games.json'
import { Game } from '@/types'
import GameDetailClient from '@/components/GameDetailClient'

interface GameDetailPageProps {
  params: Promise<{
    id: string
  }>
}

// 获取游戏数据
function getGameById(id: string): Game | null {
  return gameData.games.find(game => game.id === id) || null
}

// 获取相关游戏推荐
function getRelatedGames(currentGame: Game): Game[] {
  return gameData.games
    .filter(game => 
      game.id !== currentGame.id && 
      game.category === currentGame.category
    )
    .sort(() => 0.5 - Math.random()) // 随机排序
    .slice(0, 3) // 取前3个
}

// 动态生成元数据
export async function generateMetadata(
  { params }: GameDetailPageProps
): Promise<Metadata> {
  const { id } = await params
  const game = getGameById(id)
  
  if (!game) {
    return {
      title: 'Game Not Found - GameHub',
      description: 'The requested game could not be found.'
    }
  }

  const description = game.descriptionEn || game.description
  const truncatedDescription = description.length > 160 
    ? `${description.slice(0, 157)}...` 
    : description

  return {
    title: `${game.title} - Play Online | GameHub`,
    description: truncatedDescription,
    keywords: [game.category, ...game.tags, 'online game', 'browser game', 'free game'].join(', '),
    openGraph: {
      title: `${game.title} - GameHub`,
      description: truncatedDescription,
      images: game.thumbnail ? [
        {
          url: game.thumbnail,
          width: 320,
          height: 180,
          alt: game.title
        }
      ] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${game.title} - GameHub`,
      description: truncatedDescription,
      images: game.thumbnail ? [game.thumbnail] : [],
    },
    alternates: {
      canonical: `/game/${game.id}`
    }
  }
}

// 静态生成路径
export async function generateStaticParams() {
  return gameData.games.map((game) => ({
    id: game.id,
  }))
}

export default async function GameDetailPage({ params }: GameDetailPageProps) {
  const { id } = await params
  const game = getGameById(id)
  
  if (!game) {
    notFound()
  }

  const relatedGames = getRelatedGames(game)
  const categories = gameData.categories

  return (
    <GameDetailClient 
      game={game} 
      relatedGames={relatedGames}
      categories={categories}
    />
  )
} 