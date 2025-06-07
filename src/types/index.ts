// 游戏相关类型定义
export interface Game {
  id: string
  title: string
  description: string
  descriptionEn: string
  category: string
  url: string
  thumbnail: string
  screenshots?: string[]
  featured: boolean
  tags: string[]
}

// 游戏分类类型定义
export interface Category {
  id: string
  name: string
  nameEn: string
  icon: string
}

// 游戏数据结构类型定义
export interface GameData {
  categories: Category[]
  games: Game[]
}

// 组件Props类型定义
export interface HeaderProps {
  onSearch: (query: string) => void
  onCategoryFilter: (category: string | null) => void
  categories: Category[]
  searchQuery?: string
  selectedCategory?: string | null
}

export interface GameCardProps {
  game: Game
  onClick?: (game: Game) => void
  size?: 'small' | 'medium' | 'large' | 'compact'
  featured?: boolean
}

export interface FeaturedSectionProps {
  games: Game[]
  onGameClick?: (game: Game) => void
}

// 分析事件类型定义
export interface AnalyticsEvent {
  eventName: string
  properties?: Record<string, any>
}

// 搜索相关类型定义
export interface SearchState {
  query: string
  category: string | null
  results: Game[]
  loading: boolean
  error: string | null
} 