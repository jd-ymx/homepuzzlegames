# 🎮 GameHub 游戏详情页设计文档

## 📋 页面概述

**页面名称**: 游戏详情页 (Game Detail Page)  
**页面路径**: `/game/[id]` (动态路由)  
**页面类型**: MVP核心页面之一  
**核心目标**: 提供游戏完整信息并引导用户开始游戏

## 🎯 设计原则

### MVP核心理念
- **信息完整** - 提供用户决策所需的所有关键信息
  - 游戏标题、描述、分类一目了然
  - 游戏标签帮助用户理解游戏特征
  - 简洁但足够的信息量，避免信息不足导致的决策困难
  - 优先显示最重要的信息：标题→描述→分类→标签
  
- **转化导向** - 最大化"开始游戏"的转化率
  - "立即游戏"按钮是页面的视觉焦点
  - 使用对比强烈的颜色和足够大的尺寸
  - 按钮位置符合用户视线扫描习惯（F型扫描模式）
  - 减少用户从决策到行动的摩擦
  
- **简洁高效** - 避免信息过载，聚焦核心内容
  - 页面元素不超过7±2原则（人类短期记忆容量）
  - 每个区域有明确的功能划分
  - 使用留白和视觉层次引导用户注意力
  - 移除非必要的装饰元素
  
- **快速返回** - 便于用户返回继续浏览其他游戏
  - 明显的返回按钮，支持浏览器后退
  - 保持用户的浏览状态和搜索结果
  - 快速的页面加载，减少用户等待时间

### 用户体验目标
- **5秒决策** - 用户5秒内决定是否开始游戏
  - 页面首屏包含所有决策要素
  - 信息层次清晰，重要信息优先展示
  - 视觉设计减少认知负担
  - 游戏描述简洁明了，突出核心卖点
  
- **一键启动** - 突出的游戏启动按钮
  - 按钮尺寸和颜色符合UI设计最佳实践
  - 位置显眼，符合用户操作习惯
  - 点击反馈及时，增强用户信心
  - 移动端适配拇指操作区域
  
- **无缝导航** - 流畅的页面切换和返回体验
  - 页面间的过渡动画自然流畅
  - 导航逻辑清晰，用户不会迷失方向
  - 支持多种返回方式（按钮、浏览器后退、快捷键）
  - 保持用户上下文和浏览状态
  
- **相关推荐** - 帮助用户发现更多感兴趣的游戏
  - 推荐算法基于分类相似性
  - 推荐游戏数量适中（3-4个）
  - 推荐区域不干扰主要转化流程
  - 推荐内容质量高，提升用户留存

## 🎨 页面布局设计

### 整体结构
```
┌─────────────────────────────────────┐
│ Header + 返回按钮                   │ <- 导航区域
├─────────────────────────────────────┤
│ 游戏标题 + 分类标签                │ <- 核心信息
├─────────────────────────────────────┤
│ 游戏缩略图 (可选)                  │ <- 视觉展示
├─────────────────────────────────────┤
│ 游戏描述 (简洁明了)               │ <- 详细信息
├─────────────────────────────────────┤
│ 超大"立即游戏"按钮                │ <- 主要CTA
├─────────────────────────────────────┤
│ 游戏标签 + 分类信息                │ <- 次要信息
├─────────────────────────────────────┤
│ 更多同类游戏 (3-4个推荐)          │ <- 相关推荐
├─────────────────────────────────────┤
│ Footer (可选，简化版)              │ <- 页面底部
└─────────────────────────────────────┘
```

## 🧩 功能模块详解

### 1. Header 头部区域
**职责**: 导航和页面标识
- **返回按钮** - 明显的返回首页/上一页按钮
  ```typescript
  // 返回按钮设计规范
  <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
    <ArrowLeft size={20} />
    <span>返回</span>
  </button>
  ```
  - 位置：页面左上角，符合用户期望
  - 样式：蓝色文字+箭头图标，悬停变深
  - 功能：支持router.back()和直接返回首页
  
- **品牌标识** - GameHub Logo (可点击返回首页)
  - 位置：Header中央或左侧（移动端居中）
  - 尺寸：桌面端120px宽，移动端100px宽
  - 交互：点击返回首页根路径
  
- **路径提示** - 简单的面包屑导航 (可选)
  - 格式：`首页 > 游戏详情 > {游戏名称}`
  - 仅在桌面端显示，移动端隐藏节省空间

### 2. 游戏信息区域
**职责**: 核心游戏信息展示
- **游戏标题** - 大号字体，突出显示
  ```css
  /* 标题样式规范 */
  .game-title {
    font-size: 2rem; /* 32px */
    font-weight: 700;
    line-height: 1.2;
    color: #1f2937; /* gray-800 */
  }
  
  @media (max-width: 768px) {
    .game-title {
      font-size: 1.5rem; /* 24px */
    }
  }
  ```
  
- **分类标签** - 彩色标签，与首页一致的设计
  ```typescript
  // 分类标签组件
  const CategoryBadge = ({ category }: { category: string }) => {
    const colorMap = {
      puzzle: 'bg-blue-100 text-blue-800',
      action: 'bg-red-100 text-red-800',
      strategy: 'bg-green-100 text-green-800',
      casual: 'bg-yellow-100 text-yellow-800'
    }
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${colorMap[category]}`}>
        {category}
      </span>
    )
  }
  ```
  
- **特色标记** - 精选/热门/新游戏等标记
  - 精选游戏：⭐ Featured 金色标记
  - 热门游戏：🔥 Hot 红色标记
  - 新游戏：🆕 New 绿色标记

### 3. 视觉展示区域
**职责**: 游戏视觉预览
- **游戏缩略图** - 较大尺寸展示 (可选功能)
  - 尺寸：桌面端 400x225px，移动端 100%宽度
  - 比例：16:9 标准比例
  - 加载：懒加载with placeholder
  - 降级：无缩略图时显示分类默认图
  
- **游戏图标** - 如果有的话
  - 位置：缩略图左下角或右上角overlay
  - 尺寸：64x64px
  - 样式：圆角边框，白色背景
  
- **视觉元素** - 保持与游戏主题一致
  - 背景：可选择性使用游戏主色调
  - 装饰：简单的几何图案或渐变

### 4. 游戏描述区域
**职责**: 详细游戏信息
- **游戏描述** - 完整的游戏介绍
  ```typescript
  // 描述文本处理
  const GameDescription = ({ description, descriptionEn }: GameDescriptionProps) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const text = descriptionEn || description
    const shouldTruncate = text.length > 200
    
    return (
      <div className="text-gray-700 leading-relaxed">
        <p>
          {shouldTruncate && !isExpanded 
            ? `${text.slice(0, 200)}...` 
            : text
          }
        </p>
        {shouldTruncate && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 hover:text-blue-800 mt-2"
          >
            {isExpanded ? '收起' : '展开更多'}
          </button>
        )}
      </div>
    )
  }
  ```
  
- **玩法说明** - 简要的游戏规则或玩法
  - 格式：简洁的要点列表
  - 长度：每个要点不超过30字符
  - 数量：最多3-5个关键玩法要点
  
- **语言版本** - 根据用户偏好显示中文或英文描述
  - 优先级：英文描述 > 中文描述 > 占位符文本
  - 切换：可提供语言切换按钮（可选功能）

### 5. 行动按钮区域
**职责**: 核心转化功能
- **立即游戏按钮** - 超大、醒目的主要按钮
  ```typescript
  const PlayButton = ({ gameUrl, gameTitle }: PlayButtonProps) => {
    const [isClicked, setIsClicked] = useState(false)
    
    const handleClick = () => {
      setIsClicked(true)
      
      // 埋点追踪
      trackEvent('game_start_click', {
        game_title: gameTitle,
        timestamp: Date.now()
      })
      
      // 延迟跳转确保追踪完成
      setTimeout(() => {
        window.open(gameUrl, '_blank')
        setIsClicked(false)
      }, 150)
    }
    
    return (
      <button
        onClick={handleClick}
        disabled={isClicked}
        className={`
          w-full md:w-auto px-8 py-4 
          bg-gradient-to-r from-blue-600 to-purple-600 
          text-white font-semibold text-lg rounded-lg
          shadow-lg hover:shadow-xl
          transform transition-all duration-200
          ${isClicked ? 'scale-95' : 'hover:scale-105'}
          disabled:opacity-70
        `}
      >
        {isClicked ? (
          <div className="flex items-center space-x-2">
            <LoadingSpinner />
            <span>启动中...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <GamepadIcon size={24} />
            <span>立即游戏</span>
          </div>
        )}
      </button>
    )
  }
  ```
  
- **视觉状态** - 悬停、点击等交互反馈
  - Normal: 蓝紫渐变背景，中等阴影
  - Hover: 轻微放大(105%)，增强阴影
  - Active: 缩小(95%)，深色背景
  - Loading: 禁用状态，显示加载动画
  
- **备用操作** - 收藏、分享等辅助功能 (MVP阶段可选)
  - 位置：主按钮下方或右侧
  - 样式：次要按钮样式，不干扰主流程

### 6. 标签信息区域
**职责**: 辅助分类信息
- **游戏标签** - 详细的游戏特征标签
  ```typescript
  const GameTags = ({ tags }: { tags: string[] }) => {
    const displayTags = tags.slice(0, 8) // 最多显示8个
    const hasMore = tags.length > 8
    
    return (
      <div className="flex flex-wrap gap-2">
        {displayTags.map(tag => (
          <span
            key={tag}
            className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-md"
          >
            #{tag}
          </span>
        ))}
        {hasMore && (
          <span className="px-2 py-1 bg-gray-100 text-gray-500 text-sm rounded-md">
            +{tags.length - 8} 更多
          </span>
        )}
      </div>
    )
  }
  ```
  
- **分类信息** - 所属分类的详细说明
  - 显示：分类图标 + 分类名称 + 分类描述
  - 交互：点击可跳转到该分类页面
  
- **相关属性** - 难度、时长等信息 (如果有)
  - 难度：⭐⭐⭐ (星级表示)
  - 时长：预估游戏时长
  - 平台：支持的设备类型

### 7. 相关推荐区域
**职责**: 用户留存和发现
- **同类游戏** - 相同分类的其他游戏
  ```typescript
  const RelatedGames = ({ currentGame, allGames }: RelatedGamesProps) => {
    const relatedGames = useMemo(() => {
      return allGames
        .filter(game => 
          game.id !== currentGame.id && 
          game.category === currentGame.category
        )
        .sort(() => 0.5 - Math.random()) // 随机排序
        .slice(0, 3)
    }, [currentGame, allGames])
    
    return (
      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-6">你可能还喜欢</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {relatedGames.map(game => (
            <GameCard 
              key={game.id} 
              game={game} 
              size="small"
              onClick={() => router.push(`/game/${game.id}`)}
            />
          ))}
        </div>
      </div>
    )
  }
  ```
  
- **相似标签** - 具有相似标签的游戏
  - 算法：计算标签重叠度，选择相似度最高的游戏
  - 数量：补充到总共3-4个推荐游戏
  
- **精选推荐** - 平台推荐的优质游戏
  - 策略：如果同类游戏不足，用精选游戏补充
  - 标记：推荐游戏显示推荐原因

## 📱 响应式设计

### 断点适配
- **桌面端 (1024px+)** - 宽松布局，充分利用屏幕空间
  ```css
  /* 桌面端布局 */
  .game-detail-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    grid-template-columns: 2fr 1fr; /* 主内容 + 侧边栏 */
    gap: 3rem;
  }
  
  .play-button {
    width: auto;
    min-width: 200px;
    padding: 1rem 2rem;
  }
  
  .related-games {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
  ```
  
- **平板端 (768px-1023px)** - 中等密度布局
  ```css
  /* 平板端布局 */
  .game-detail-container {
    padding: 0 1.5rem;
    grid-template-columns: 1fr; /* 单列布局 */
    gap: 2rem;
  }
  
  .play-button {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }
  
  .related-games {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  ```
  
- **大屏手机 (640px-767px)** - 紧凑布局，适合拇指操作
  ```css
  /* 大屏手机布局 */
  .game-detail-container {
    padding: 0 1rem;
    gap: 1.5rem;
  }
  
  .game-title {
    font-size: 1.5rem;
    line-height: 1.3;
  }
  
  .game-description {
    font-size: 0.875rem;
    line-height: 1.5;
  }
  
  .related-games {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
  ```
  
- **小屏手机 (<640px)** - 垂直优先，单列布局
  ```css
  /* 小屏手机布局 */
  .game-detail-container {
    padding: 0 0.75rem;
    gap: 1rem;
  }
  
  .game-title {
    font-size: 1.25rem;
  }
  
  .related-games {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .game-tags {
    flex-direction: column;
    align-items: flex-start;
  }
  ```

### 移动端优化
- **返回按钮** - 更大的点击区域 (44x44px)
  ```typescript
  const MobileBackButton = () => (
    <button 
      className="flex items-center justify-center w-11 h-11 rounded-full hover:bg-gray-100"
      onClick={() => router.back()}
    >
      <ArrowLeft size={24} className="text-blue-600" />
      <span className="sr-only">返回</span>
    </button>
  )
  ```
  
- **游戏标题** - 自动换行，避免截断
  ```css
  .mobile-game-title {
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
    max-height: 3.6em; /* 限制最大3行 */
    overflow: hidden;
  }
  ```
  
- **描述文本** - 合适的字体大小，易于阅读
  - 字体大小：14px (0.875rem)
  - 行高：1.5倍
  - 颜色对比：至少4.5:1 (WCAG AA标准)
  - 最大宽度：防止行长过长影响阅读
  
- **立即游戏按钮** - 全宽按钮，突出显示
  ```typescript
  const MobilePlayButton = ({ gameUrl, gameTitle }: PlayButtonProps) => (
    <button
      className="
        w-full py-4 px-6
        bg-gradient-to-r from-blue-600 to-purple-600
        text-white font-semibold text-base
        rounded-lg shadow-lg
        active:scale-95 transition-transform
        touch-manipulation
      "
      onClick={() => handleGameStart(gameUrl, gameTitle)}
    >
      <div className="flex items-center justify-center space-x-3">
        <GamepadIcon size={20} />
        <span>立即游戏</span>
      </div>
    </button>
  )
  ```
  
- **推荐游戏** - 横向滚动卡片布局
  ```typescript
  const MobileRelatedGames = ({ games }: { games: Game[] }) => (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">你可能还喜欢</h3>
      <div className="flex space-x-3 overflow-x-auto pb-4 scrollbar-hide">
        {games.map(game => (
          <div key={game.id} className="flex-shrink-0 w-40">
            <GameCard game={game} size="compact" />
          </div>
        ))}
      </div>
    </div>
  )
  ```

### 触摸优化
- **最小点击区域**: 所有可点击元素至少44x44px
- **手势支持**: 
  ```typescript
  // 滑动返回手势
  const useSwipeBack = () => {
    useEffect(() => {
      let startX = 0
      
      const handleTouchStart = (e: TouchEvent) => {
        startX = e.touches[0].clientX
      }
      
      const handleTouchEnd = (e: TouchEvent) => {
        const endX = e.changedTouches[0].clientX
        const diff = endX - startX
        
        // 右滑距离超过100px且起始位置在屏幕左侧20%内
        if (diff > 100 && startX < window.innerWidth * 0.2) {
          router.back()
        }
      }
      
      document.addEventListener('touchstart', handleTouchStart)
      document.addEventListener('touchend', handleTouchEnd)
      
      return () => {
        document.removeEventListener('touchstart', handleTouchStart)
        document.removeEventListener('touchend', handleTouchEnd)
      }
    }, [])
  }
  ```

### 性能优化
- **图片响应式加载**:
  ```typescript
  const ResponsiveGameImage = ({ game }: { game: Game }) => (
    <picture>
      <source 
        media="(min-width: 768px)" 
        srcSet={`${game.thumbnail}?w=400&h=225&q=80`}
      />
      <source 
        media="(max-width: 767px)" 
        srcSet={`${game.thumbnail}?w=320&h=180&q=75`}
      />
      <img
        src={`${game.thumbnail}?w=320&h=180&q=75`}
        alt={game.title}
        className="w-full h-auto rounded-lg"
        loading="lazy"
      />
    </picture>
  )
  ```
  
- **关键CSS内联**: 首屏关键样式内联，非关键样式异步加载
- **字体优化**: 使用font-display: swap确保文本快速显示

## 🎮 游戏信息展示规范

### 游戏标题
- **字体大小**: 桌面端 32px，移动端 24px
  ```css
  .game-title {
    font-size: clamp(1.5rem, 4vw, 2rem); /* 响应式字体大小 */
    font-weight: 700;
    line-height: 1.2;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }
  ```
  
- **字体权重**: font-bold (700)
- **颜色**: 主要文本色 (#1f2937 gray-800)
- **换行**: 支持自动换行，最多2行
  ```css
  .game-title-container {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-word;
  }
  ```

### 游戏描述
- **字体大小**: 桌面端 16px，移动端 14px
  ```typescript
  interface DescriptionStyleProps {
    isExpanded: boolean
    isMobile: boolean
  }
  
  const getDescriptionStyle = ({ isExpanded, isMobile }: DescriptionStyleProps) => `
    text-${isMobile ? 'sm' : 'base'} 
    leading-relaxed 
    text-gray-700
    ${!isExpanded ? 'line-clamp-3' : ''}
  `
  ```
  
- **行高**: 1.6 倍行高 (leading-relaxed)
- **最大长度**: 不限制，但建议控制在300字符内
- **多语言**: 优先显示英文，备选中文
  ```typescript
  const getGameDescription = (game: Game, userLanguage: 'en' | 'zh' = 'en') => {
    if (userLanguage === 'en' && game.descriptionEn) {
      return game.descriptionEn
    }
    return game.description || '暂无游戏描述'
  }
  ```

### 分类和标签
- **分类标签**: 与首页保持一致的设计
  ```typescript
  const CategoryBadge = ({ category }: { category: string }) => {
    const styles = {
      puzzle: 'bg-blue-100 text-blue-800 border-blue-200',
      action: 'bg-red-100 text-red-800 border-red-200',
      strategy: 'bg-green-100 text-green-800 border-green-200',
      casual: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    }
    
    return (
      <span className={`
        inline-flex items-center px-3 py-1 
        rounded-full text-sm font-medium border
        ${styles[category] || 'bg-gray-100 text-gray-800 border-gray-200'}
      `}>
        {getCategoryIcon(category)}
        <span className="ml-1">{getCategoryName(category)}</span>
      </span>
    )
  }
  ```
  
- **游戏标签**: 较小的标签样式，灰色背景
  ```css
  .game-tag {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    background-color: #f3f4f6; /* gray-100 */
    color: #6b7280; /* gray-500 */
    font-size: 0.75rem; /* 12px */
    font-weight: 500;
    border-radius: 0.375rem; /* 6px */
    margin: 0.125rem;
    transition: all 0.2s ease;
  }
  
  .game-tag:hover {
    background-color: #e5e7eb; /* gray-200 */
    color: #4b5563; /* gray-600 */
  }
  ```
  
- **标签数量**: 最多显示8个标签，多余的折叠
  ```typescript
  const GameTagsList = ({ tags, maxVisible = 8 }: GameTagsProps) => {
    const [showAll, setShowAll] = useState(false)
    const visibleTags = showAll ? tags : tags.slice(0, maxVisible)
    const hasMore = tags.length > maxVisible
    
    return (
      <div className="flex flex-wrap gap-2">
        {visibleTags.map(tag => (
          <span key={tag} className="game-tag">#{tag}</span>
        ))}
        {hasMore && !showAll && (
          <button 
            onClick={() => setShowAll(true)}
            className="game-tag bg-blue-50 text-blue-600 hover:bg-blue-100"
          >
            +{tags.length - maxVisible} 更多
          </button>
        )}
        {showAll && hasMore && (
          <button 
            onClick={() => setShowAll(false)}
            className="game-tag bg-gray-50 text-gray-600"
          >
            收起
          </button>
        )}
      </div>
    )
  }
  ```

### 按钮设计
- **立即游戏按钮**: 
  - 尺寸: 桌面端 200x60px，移动端 100%宽度x60px
  - 样式: 蓝色渐变背景，白色文字，圆角
  - 悬停效果: 轻微阴影增强
  - 点击效果: 按钮短暂缩放
  ```css
  .play-button {
    /* 基础样式 */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    
    /* 尺寸 */
    min-width: 200px;
    height: 60px;
    padding: 1rem 2rem;
    
    /* 视觉样式 */
    background: linear-gradient(135deg, #2563eb 0%, #9333ea 100%);
    color: white;
    font-weight: 600;
    font-size: 1.125rem; /* 18px */
    border-radius: 0.5rem; /* 8px */
    border: none;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    
    /* 过渡效果 */
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
  }
  
  .play-button:hover {
    transform: translateY(-1px) scale(1.02);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
  
  .play-button:active {
    transform: translateY(0) scale(0.98);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .play-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
  
  /* 移动端适配 */
  @media (max-width: 768px) {
    .play-button {
      width: 100%;
      font-size: 1rem; /* 16px */
      height: 56px;
    }
  }
  ```

### 辅助信息展示
- **游戏属性列表**:
  ```typescript
  interface GameAttributes {
    difficulty?: 'easy' | 'medium' | 'hard'
    estimatedTime?: string
    players?: string
    platform?: string[]
  }
  
  const GameAttributesList = ({ attributes }: { attributes: GameAttributes }) => (
    <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
      {attributes.difficulty && (
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 text-sm">难度:</span>
          <DifficultyStars level={attributes.difficulty} />
        </div>
      )}
      {attributes.estimatedTime && (
        <div className="flex items-center space-x-2">
          <Clock size={16} className="text-gray-400" />
          <span className="text-sm">{attributes.estimatedTime}</span>
        </div>
      )}
      {attributes.players && (
        <div className="flex items-center space-x-2">
          <Users size={16} className="text-gray-400" />
          <span className="text-sm">{attributes.players}</span>
        </div>
      )}
      {attributes.platform && (
        <div className="flex items-center space-x-2">
          <Monitor size={16} className="text-gray-400" />
          <span className="text-sm">{attributes.platform.join(', ')}</span>
        </div>
      )}
    </div>
  )
  ```

### 加载状态设计
- **骨架屏**:
  ```typescript
  const GameDetailSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
      <div className="space-y-3 mb-6">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
      <div className="h-14 bg-gray-200 rounded w-48 mb-6"></div>
      <div className="flex space-x-2 mb-8">
        {[1,2,3,4].map(i => (
          <div key={i} className="h-6 w-16 bg-gray-200 rounded-full"></div>
        ))}
      </div>
    </div>
  )
  ```

## 🔧 技术实现要点

### 路由设计
```typescript
// 动态路由实现
// 文件: src/app/game/[id]/page.tsx
interface GameDetailPageProps {
  params: {
    id: string
  }
}

export default function GameDetailPage({ params }: GameDetailPageProps) {
  const game = getGameById(params.id)
  if (!game) {
    return <GameNotFound />
  }
  return <GameDetailComponent game={game} />
}
```

### 数据获取
```typescript
// 游戏数据获取
const getGameById = (id: string): Game | null => {
  const gameData = require('@/data/games.json')
  return gameData.games.find(game => game.id === id) || null
}

// 相关游戏推荐
const getRelatedGames = (currentGame: Game, allGames: Game[]): Game[] => {
  return allGames
    .filter(game => 
      game.id !== currentGame.id && 
      game.category === currentGame.category
    )
    .slice(0, 4)
}
```

### SEO优化
```typescript
// 动态元数据生成
export async function generateMetadata(
  { params }: GameDetailPageProps
): Promise<Metadata> {
  const game = getGameById(params.id)
  
  if (!game) {
    return {
      title: 'Game Not Found - GameHub'
    }
  }

  return {
    title: `${game.title} - Play Online | GameHub`,
    description: game.descriptionEn || game.description,
    keywords: [game.category, ...game.tags].join(', '),
    openGraph: {
      title: game.title,
      description: game.descriptionEn || game.description,
      images: game.thumbnail ? [game.thumbnail] : [],
    }
  }
}
```

## 🎨 视觉设计规范

### 色彩应用
- **主标题**: `text-gray-900` (#111827)
  ```css
  .primary-heading {
    color: #111827; /* gray-900 */
    contrast-ratio: 16.95:1; /* 对白色背景 */
  }
  ```
  
- **描述文本**: `text-gray-700` (#374151)
  ```css
  .description-text {
    color: #374151; /* gray-700 */
    contrast-ratio: 7.59:1; /* 符合WCAG AA标准 */
  }
  ```
  
- **分类标签**: 与首页保持一致
  ```typescript
  const categoryColors = {
    puzzle: {
      bg: '#dbeafe', // blue-100
      text: '#1e40af', // blue-800
      border: '#93c5fd' // blue-300
    },
    action: {
      bg: '#fee2e2', // red-100
      text: '#991b1b', // red-800
      border: '#fca5a5' // red-300
    },
    strategy: {
      bg: '#dcfce7', // green-100
      text: '#166534', // green-800
      border: '#86efac' // green-300
    },
    casual: {
      bg: '#fef3c7', // yellow-100
      text: '#92400e', // yellow-800
      border: '#fcd34d' // yellow-300
    }
  }
  ```
  
- **立即游戏按钮**: `bg-gradient-to-r from-blue-600 to-purple-600`
  ```css
  .play-button-gradient {
    background: linear-gradient(135deg, #2563eb 0%, #9333ea 100%);
    /* 渐变角度优化，更自然的过渡 */
  }
  ```
  
- **返回按钮**: `text-blue-600 hover:text-blue-800`
  ```css
  .back-button {
    color: #2563eb; /* blue-600 */
    transition: color 0.2s ease;
  }
  
  .back-button:hover {
    color: #1e40af; /* blue-800 */
  }
  ```

### 间距系统
- **页面边距**: `px-4 md:px-6 lg:px-8`
  ```css
  .page-container {
    padding-left: 1rem; /* 16px */
    padding-right: 1rem;
  }
  
  @media (min-width: 768px) {
    .page-container {
      padding-left: 1.5rem; /* 24px */
      padding-right: 1.5rem;
    }
  }
  
  @media (min-width: 1024px) {
    .page-container {
      padding-left: 2rem; /* 32px */
      padding-right: 2rem;
    }
  }
  ```
  
- **区域间距**: `space-y-8 md:space-y-12`
  ```css
  .section-spacing > * + * {
    margin-top: 2rem; /* 32px */
  }
  
  @media (min-width: 768px) {
    .section-spacing > * + * {
      margin-top: 3rem; /* 48px */
    }
  }
  ```
  
- **组件间距**: `space-y-4 md:space-y-6`
  ```css
  .component-spacing > * + * {
    margin-top: 1rem; /* 16px */
  }
  
  @media (min-width: 768px) {
    .component-spacing > * + * {
      margin-top: 1.5rem; /* 24px */
    }
  }
  ```
  
- **按钮间距**: `mt-8`
  ```css
  .button-margin {
    margin-top: 2rem; /* 32px */
  }
  ```

### 阴影和边框
- **页面容器**: `bg-white rounded-lg shadow-sm`
  ```css
  .page-container {
    background-color: #ffffff;
    border-radius: 0.5rem; /* 8px */
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }
  ```
  
- **游戏按钮**: `shadow-md hover:shadow-lg`
  ```css
  .game-button {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
                0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: box-shadow 0.2s ease;
  }
  
  .game-button:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 
                0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  ```
  
- **推荐卡片**: `shadow-sm hover:shadow-md`
  ```css
  .recommendation-card {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;
  }
  
  .recommendation-card:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
                0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transform: translateY(-1px);
  }
  ```

### 边框和圆角设计
- **基础边框半径**:
  ```css
  .border-radius-system {
    --radius-sm: 0.25rem;   /* 4px - 小元素 */
    --radius-base: 0.375rem; /* 6px - 标签 */
    --radius-md: 0.5rem;     /* 8px - 按钮 */
    --radius-lg: 0.75rem;    /* 12px - 卡片 */
    --radius-xl: 1rem;       /* 16px - 容器 */
    --radius-full: 9999px;   /* 圆形 */
  }
  ```

### 过渡动画
- **统一过渡时间**:
  ```css
  .transition-system {
    --duration-fast: 0.15s;     /* 快速交互 */
    --duration-normal: 0.2s;     /* 标准过渡 */
    --duration-slow: 0.3s;       /* 较慢过渡 */
    --easing-standard: cubic-bezier(0.4, 0, 0.2, 1);
    --easing-enter: cubic-bezier(0, 0, 0.2, 1);
    --easing-exit: cubic-bezier(0.4, 0, 1, 1);
  }
  ```

### Z-index层级
- **层级管理**:
  ```css
  .z-index-system {
    --z-dropdown: 1000;
    --z-sticky: 1020;
    --z-fixed: 1030;
    --z-modal-backdrop: 1040;
    --z-modal: 1050;
    --z-popover: 1060;
    --z-tooltip: 1070;
    --z-toast: 1080;
  }
  ```

## 📊 用户行为追踪

### 关键事件
```typescript
// 页面访问追踪
trackEvent('game_detail_view', {
  game_id: game.id,
  game_title: game.title,
  game_category: game.category,
  referrer: document.referrer
})

// 游戏启动追踪
trackEvent('game_start_click', {
  game_id: game.id,
  game_title: game.title,
  time_on_page: getTimeOnPage(),
  scroll_depth: getScrollDepth()
})

// 相关游戏点击追踪
trackEvent('related_game_click', {
  source_game_id: currentGame.id,
  target_game_id: clickedGame.id,
  position: clickPosition
})
```

### 成功指标
- **页面完成率**: 用户查看完整页面内容的比例
  ```typescript
  // 页面滚动深度追踪
  const trackScrollCompletion = () => {
    const milestones = [25, 50, 75, 90, 100]
    let trackedMilestones: number[] = []
    
    const handleScroll = throttle(() => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const percentage = Math.round((scrolled / scrollHeight) * 100)
      
      milestones.forEach(milestone => {
        if (percentage >= milestone && !trackedMilestones.includes(milestone)) {
          trackedMilestones.push(milestone)
          trackEvent('page_scroll_completion', {
            milestone: milestone,
            game_id: gameId,
            timestamp: Date.now()
          })
        }
      })
    }, 100)
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }
  ```
  
- **游戏启动率**: 用户点击"立即游戏"的转化率
  ```typescript
  // 转化率计算
  interface ConversionMetrics {
    pageViews: number           // 页面浏览量
    gameStarts: number         // 游戏启动数
    conversionRate: number     // 转化率
    avgTimeToConversion: number // 平均转化时间
  }
  
  const calculateConversionRate = (gameId: string): ConversionMetrics => {
    const pageViews = getPageViews(gameId)
    const gameStarts = getGameStarts(gameId)
    const conversionRate = gameStarts / pageViews * 100
    
    return {
      pageViews,
      gameStarts,
      conversionRate,
      avgTimeToConversion: getAverageTimeToConversion(gameId)
    }
  }
  
  // 目标转化率：25%
  const TARGET_CONVERSION_RATE = 25
  ```
  
- **相关游戏点击率**: 推荐游戏的点击率
  ```typescript
  // 推荐效果追踪
  const trackRecommendationClick = (sourceGameId: string, targetGameId: string, position: number) => {
    trackEvent('recommendation_click', {
      source_game_id: sourceGameId,
      target_game_id: targetGameId,
      position: position, // 推荐位置 1,2,3
      section: 'related_games',
      timestamp: Date.now()
    })
  }
  
  // 推荐点击率分析
  const analyzeRecommendationPerformance = (gameId: string) => {
    const totalRecommendationViews = getRecommendationViews(gameId)
    const totalRecommendationClicks = getRecommendationClicks(gameId)
    
    return {
      clickThroughRate: (totalRecommendationClicks / totalRecommendationViews) * 100,
      clicksByPosition: getClicksByPosition(gameId),
      topPerformingRecommendations: getTopRecommendations(gameId)
    }
  }
  ```
  
- **页面停留时间**: 用户在详情页的平均停留时长
  ```typescript
  // 页面停留时间追踪
  class PageTimeTracker {
    private startTime: number = Date.now()
    private isVisible: boolean = true
    private totalTime: number = 0
    private visibilityStartTime: number = Date.now()
    
    constructor(private gameId: string) {
      this.setupVisibilityTracking()
      this.setupBeforeUnloadTracking()
    }
    
    private setupVisibilityTracking() {
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          // 页面隐藏，停止计时
          this.totalTime += Date.now() - this.visibilityStartTime
          this.isVisible = false
        } else {
          // 页面可见，重新开始计时
          this.visibilityStartTime = Date.now()
          this.isVisible = true
        }
      })
    }
    
    private setupBeforeUnloadTracking() {
      window.addEventListener('beforeunload', () => {
        this.sendTimeData()
      })
      
      // 定期发送数据（每30秒）
      setInterval(() => {
        this.sendTimeData()
      }, 30000)
    }
    
    private sendTimeData() {
      const currentTime = this.isVisible 
        ? this.totalTime + (Date.now() - this.visibilityStartTime)
        : this.totalTime
        
      trackEvent('page_time_spent', {
        game_id: this.gameId,
        time_spent: currentTime,
        is_final: false
      })
    }
    
    getTotalTime(): number {
      return this.isVisible 
        ? this.totalTime + (Date.now() - this.visibilityStartTime)
        : this.totalTime
    }
  }
  ```

### 高级分析指标
- **用户行为路径分析**:
  ```typescript
  // 用户行为序列追踪
  interface UserAction {
    action: string
    timestamp: number
    element?: string
    position?: { x: number, y: number }
  }
  
  class UserJourneyTracker {
    private actions: UserAction[] = []
    private sessionId: string = generateSessionId()
    
    trackAction(action: string, metadata?: any) {
      this.actions.push({
        action,
        timestamp: Date.now(),
        ...metadata
      })
      
      // 实时分析关键路径
      this.analyzeJourney()
    }
    
    private analyzeJourney() {
      const recentActions = this.actions.slice(-5) // 最近5个动作
      
      // 检测常见模式
      if (this.isBouncingPattern(recentActions)) {
        trackEvent('user_bouncing_detected', {
          session_id: this.sessionId,
          action_sequence: recentActions.map(a => a.action)
        })
      }
      
      if (this.isEngagedPattern(recentActions)) {
        trackEvent('user_engaged_detected', {
          session_id: this.sessionId,
          engagement_score: this.calculateEngagementScore()
        })
      }
    }
    
    private isBouncingPattern(actions: UserAction[]): boolean {
      // 用户在页面上下滚动，但没有实际交互
      const scrollActions = actions.filter(a => a.action === 'scroll')
      const interactionActions = actions.filter(a => 
        ['click', 'play_button_click', 'recommendation_click'].includes(a.action)
      )
      
      return scrollActions.length > 3 && interactionActions.length === 0
    }
    
    private isEngagedPattern(actions: UserAction[]): boolean {
      // 用户有多种类型的交互行为
      const uniqueActions = new Set(actions.map(a => a.action))
      return uniqueActions.size >= 3
    }
    
    private calculateEngagementScore(): number {
      const timeSpent = Date.now() - this.actions[0]?.timestamp || 0
      const actionCount = this.actions.length
      const uniqueActions = new Set(this.actions.map(a => a.action)).size
      
      // 综合时间、动作数量和动作多样性计算参与度
      return Math.min(100, (timeSpent / 1000) * 0.1 + actionCount * 2 + uniqueActions * 5)
    }
  }
  ```

### 实时监控和警报
- **异常检测**:
  ```typescript
  // 实时性能监控
  const setupPerformanceMonitoring = (gameId: string) => {
    // 页面加载性能
    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      const metrics = {
        loadTime: perfData.loadEventEnd - perfData.navigationStart,
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.navigationStart,
        firstContentfulPaint: getFirstContentfulPaint(),
        largestContentfulPaint: getLargestContentfulPaint()
      }
      
      // 如果加载时间超过3秒，发送警报
      if (metrics.loadTime > 3000) {
        trackEvent('performance_warning', {
          game_id: gameId,
          load_time: metrics.loadTime,
          severity: 'high'
        })
      }
      
      trackEvent('page_performance', {
        game_id: gameId,
        ...metrics
      })
    })
    
    // 错误监控
    window.addEventListener('error', (error) => {
      trackEvent('javascript_error', {
        game_id: gameId,
        error_message: error.message,
        error_source: error.filename,
        error_line: error.lineno,
        user_agent: navigator.userAgent
      })
    })
  }
  ```

## 🚀 开发优先级

### Phase 1: 核心功能 (Day 1-2)
- [ ] 页面路由和基础布局
- [ ] 游戏信息展示组件
- [ ] 立即游戏按钮功能
- [ ] 返回导航功能

### Phase 2: 内容完善 (Day 3-4)
- [ ] 响应式设计适配
- [ ] 相关游戏推荐功能
- [ ] SEO元数据优化
- [ ] 错误页面处理

### Phase 3: 优化提升 (Day 5-7)
- [ ] 页面加载动画
- [ ] 用户行为埋点
- [ ] 性能优化
- [ ] 交互细节完善

## 🔍 特殊场景处理

### 错误状态
- **游戏不存在**: 显示友好的404页面
- **数据加载失败**: 显示重试按钮
- **游戏链接失效**: 提示并建议其他游戏

### 加载状态
- **页面骨架屏**: 快速显示页面结构
- **内容渐进加载**: 重要内容优先显示
- **图片懒加载**: 缩略图按需加载

### 无障碍设计
- **键盘导航**: 支持Tab键导航
- **屏幕阅读器**: 适当的ARIA标签
- **色彩对比**: 确保文字易于阅读
- **焦点指示**: 明显的焦点状态

## 💡 讨论记录

> **注意**: 以下内容将记录我们后续的详细设计讨论

### 讨论主题列表
- [ ] 游戏详情页的具体布局细节
- [ ] 立即游戏按钮的设计和交互
- [ ] 相关游戏推荐的算法
- [ ] 返回导航的用户体验
- [ ] 移动端的特殊优化
- [ ] 页面加载和错误处理
- [ ] SEO和分享功能
- [ ] 用户行为分析策略

---

### 📋 MVP游戏详情页核心要求

#### 🎯 MVP策略重点
**目标**: 最简化但完整的游戏信息展示，确保用户能够做出游戏决策

**核心原则**:
- ✅ **信息充分**: 提供用户决策所需的最少关键信息
- ✅ **转化优先**: 突出"立即游戏"按钮，最大化转化率
- ✅ **快速加载**: 页面加载速度优于复杂功能
- ✅ **简洁设计**: 避免功能膨胀，专注核心体验

#### 🎮 MVP核心功能范围
**必须包含的功能**:
- ✅ 游戏基本信息展示 (标题、描述、分类)
- ✅ 突出的"立即游戏"按钮
- ✅ 返回首页的导航
- ✅ 基础的相关游戏推荐 (2-3个)
- ✅ 响应式设计适配

**暂时不包含的功能**:
- ❌ 用户评分和评论系统
- ❌ 收藏和分享功能
- ❌ 复杂的推荐算法
- ❌ 游戏历史记录
- ❌ 高级SEO功能

#### 📱 MVP页面结构简化
```
桌面端布局:
┌─────────────────────────────────┐
│ [← 返回] GameHub Logo          │
├─────────────────────────────────┤
│ 游戏标题           [分类标签]  │
├─────────────────────────────────┤
│ 游戏描述 (2-3行简介)          │
├─────────────────────────────────┤
│     [🎮 立即游戏] 按钮         │
├─────────────────────────────────┤
│ #标签1 #标签2 #标签3           │
├─────────────────────────────────┤
│ 你可能还喜欢:                  │
│ [游戏1] [游戏2] [游戏3]       │
└─────────────────────────────────┘

移动端布局:
┌─────────────────┐
│ [←] GameHub     │
├─────────────────┤
│ 游戏标题        │
│ [分类标签]      │
├─────────────────┤
│ 游戏描述        │
│ (简化版本)      │
├─────────────────┤
│ [🎮 立即游戏]   │
│ (全宽按钮)      │
├─────────────────┤
│ #标签1 #标签2   │
├─────────────────┤
│ 推荐游戏:       │
│ [游戏1]         │
│ [游戏2]         │
└─────────────────┘
```

#### 🔧 MVP技术实现简化
**数据获取**:
- 直接从games.json中获取数据
- 无需复杂的数据库查询
- 基于ID的简单查找

**推荐算法**:
- 简单的同分类筛选
- 随机或手动排序
- 固定显示数量 (3-4个)

**SEO支持**:
- 基础的页面标题和描述
- 简单的开放图谱标签
- 无需复杂的结构化数据

#### ⚡ MVP性能目标
- **页面加载时间**: < 2秒
- **首次内容绘制**: < 1秒
- **立即游戏按钮响应**: < 100ms
- **移动端适配**: 完美支持
- **SEO友好**: 基础搜索引擎优化

---

## 📝 总结

游戏详情页作为MVP的核心页面之一，专注于提供清晰的游戏信息和流畅的游戏启动体验。通过简洁的设计和明确的信息层级，帮助用户快速做出游戏决策，同时为后续功能扩展预留空间。

### 🎯 核心成功指标
1. **转化率**: 详情页到游戏启动的转化率 >25%
2. **用户体验**: 页面加载时间 <2秒
3. **内容质量**: 用户在页面停留时间 >30秒
4. **推荐效果**: 相关游戏点击率 >10%

### 📋 下一步开发重点
1. 实现基础页面结构和路由
2. 优化移动端的用户体验
3. 确保立即游戏按钮的转化效果
4. 建立简单但有效的推荐机制

---

**创建时间**: 2024年6月6日  
**最后更新**: 2024年6月6日  
**文档状态**: 初始设计完成，待开发实现 