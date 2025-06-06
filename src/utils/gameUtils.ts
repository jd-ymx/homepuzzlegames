import { Game, Category } from '@/types'

// 获取分类样式类名
export function getCategoryStyle(categoryId: string): string {
  const styles = {
    puzzle: 'bg-blue-100 text-blue-800 border-blue-200',
    action: 'bg-red-100 text-red-800 border-red-200',
    strategy: 'bg-green-100 text-green-800 border-green-200',
    casual: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  }
  return styles[categoryId as keyof typeof styles] || 'bg-gray-100 text-gray-800 border-gray-200'
}

// 获取分类图标
export function getCategoryIcon(categoryId: string): string {
  const icons = {
    puzzle: '🧩',
    action: '⚡',
    strategy: '🎯',
    casual: '🎮'
  }
  return icons[categoryId as keyof typeof icons] || '🎮'
}

// 获取分类名称
export function getCategoryName(categories: Category[], categoryId: string): string {
  const category = categories.find(cat => cat.id === categoryId)
  return category?.nameEn || category?.name || categoryId
}

// 截断文本
export function truncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text
}

// 获取游戏的显示描述（优先英文）
export function getGameDescription(game: Game): string {
  return game.descriptionEn || game.description || '暂无游戏描述'
}

// 计算阅读时间（简单估算）
export function estimateReadingTime(text: string): number {
  const wordsPerMinute = 200 // 平均阅读速度
  const words = text.split(' ').length
  return Math.ceil(words / wordsPerMinute)
}

// 生成SEO友好的URL slug
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .trim()
}

// 格式化游戏标签
export function formatGameTags(tags: string[], maxTags: number = 8): { visible: string[], extra: number } {
  const visible = tags.slice(0, maxTags)
  const extra = Math.max(0, tags.length - maxTags)
  return { visible, extra }
}

// 检查游戏URL是否有效
export function isValidGameUrl(url: string): boolean {
  try {
    new URL(url)
    return url.startsWith('http://') || url.startsWith('https://')
  } catch {
    return false
  }
}

// 生成社交分享URL
export function generateShareUrls(game: Game, baseUrl: string) {
  const gameUrl = `${baseUrl}/game/${game.id}`
  const title = encodeURIComponent(`${game.title} - GameHub`)
  const description = encodeURIComponent(getGameDescription(game))
  
  return {
    twitter: `https://twitter.com/intent/tweet?text=${title}&url=${gameUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${gameUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${gameUrl}`,
    reddit: `https://reddit.com/submit?url=${gameUrl}&title=${title}`,
    email: `mailto:?subject=${title}&body=${description}%0A%0A${gameUrl}`
  }
}

// 格式化时间戳
export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 计算页面停留时间的可读格式
export function formatTimeSpent(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000)
  if (seconds < 60) {
    return `${seconds}秒`
  }
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}分${remainingSeconds}秒`
}

// 防抖函数
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(null, args), delay)
  }
}

// 节流函数
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0
  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      func.apply(null, args)
    }
  }
}

// 英文增强的游戏描述生成器
export const getEnhancedGameDescriptionEn = (game: Game): string => {
  const enhancedDescriptionsEn: Record<string, string> = {
    '2048': `🎯 Ready for the most addictive number merging challenge? In this classic puzzle game, you'll slide number tiles, merge identical numbers, and work your way up to the magical 2048!

🧠 **Why You'll Love 2048:**
• Simple to learn, but mastering requires strategic thinking
• Every move matters - one mistake could end your streak
• Endless replay value with each game offering new challenges
• Excellent brain training for math and spatial planning skills

🚀 **Game Features:**
- Smooth touch and keyboard controls
- Elegant minimalist design interface
- Real-time scoring and best record tracking
- Perfect for quick gaming sessions anywhere

Can you reach 2048? Better yet, can you push beyond 4096 or 8192? Start your numerical journey now!`,

    'tetris': `🎮 Relive the classic, experience the eternal! Tetris is one of the greatest puzzle games of all time, and now you can play this legendary masterpiece for free in your browser!

🌟 **Classic Charm That Never Gets Old:**
• Seven unique block shapes with infinite combination possibilities
• Rhythmic gameplay that gets faster and more intense
• Perfect line clearing brings unmatched satisfaction
• Simple rules, deep strategy - fun for all ages

⚡ **Game Highlights:**
- Authentic classic gameplay mechanics
- Smooth falling block animations
- Progressive difficulty increases
- Quick drop and rotation controls

Whether you're a nostalgic veteran or a first-time player, Tetris will captivate you! See how many lines you can clear and create your legendary high score!`,

    'snake': `🐍 Classic reborn! Remember that snake game that captivated millions? Now it returns with a fresh look, ready for you to experience pure gaming joy again!

🎯 **Simple Yet Challenging:**
• Control your snake as it glides freely across the screen
• Eat food to make your snake grow longer and longer
• Avoid hitting walls and your own body
• Looks simple, but achieving high scores requires perfect strategy

🏆 **Why Snake Never Goes Out of Style:**
- Pure gaming fun with no complicated controls
- Every game tests your reaction speed
- Progressive difficulty - the longer you get, the harder it becomes
- Perfect quick-play game for any moment

🚀 **Modern Experience:**
- Smooth graphics and responsive controls
- Precise touch operation
- Real-time score display
- Ad-free pure gaming experience

Challenge your limits and see how long you can make your snake! This isn't just a game - it's the ultimate test of focus and strategic thinking!`,

    'pacman': `👻 The arcade king returns! Enter Pac-Man's maze world and experience this legendary masterpiece that influenced an entire generation of gamers!

🎮 **Arcade Memories:**
• Control the adorable yellow Pac-Man through classic mazes
• Collect all the dots to complete level challenges
• Dodge four colorful ghosts: Red, Pink, Blue, and Orange
• Eat power pellets to turn the tables on pursuing ghosts!

⚡ **Game Essence:**
- Perfect risk vs. reward balance
- Requires strategic planning and quick reflexes
- Classic chase and counter-attack mechanics
- Increasingly challenging level designs

🌟 **Why Pac-Man is Timeless:**
- Simple, intuitive controls
- Thrilling chase experiences
- Rich strategic gameplay depth
- Perfect blend of nostalgia and modern gaming

Ready to embark on your adventure in this challenging maze? Collect dots, avoid ghosts, set high score records, and become the new Pac-Man legend!`,

    'chess': `♔ Battle of minds, game of kings! Chess is one of the world's oldest and most profound strategy games. Here, you can engage in thrilling intellectual duels with players worldwide or AI opponents!

🧠 **Why Choose Chess:**
• Develops logical thinking and strategic planning abilities
• Every move affects the entire game, testing your foresight
• Infinite variations offer endless new challenges
• Improves focus and decision-making skills

👑 **Platform Advantages:**
- Battle millions of players online worldwide
- Multiple difficulty AI opponents from beginner to grandmaster
- Real-time game analysis and review features
- Complete ranking system and progress tracking

⚔️ **Game Features:**
- Standard international chess rules
- Multiple time control modes
- Beautiful board and piece designs
- Perfect adaptation for mobile and desktop

Whether you're a chess beginner or seasoned player, there are challenges waiting for you! Come showcase your strategic wisdom and become a true chess master!`,

    'sudoku': `🔢 The ultimate number logic challenge! Sudoku isn't just about filling in numbers - it's a comprehensive test of logical thinking, patience, and concentration!

🧩 **The Magic of Sudoku:**
• Fill numbers 1-9 in a 9×9 grid
• Each row, column, and 3×3 box must contain no repeats
• Simple rules with infinite variations
• From beginner to expert levels for every skill level

💡 **Why Sudoku is Captivating:**
- Pure logical deduction, no guessing needed
- Unmatched sense of achievement when completed
- Effective brain exercise that prevents aging
- Perfect personal challenge and meditation method

🎯 **Game Highlights:**
- Multiple difficulty levels: Easy, Medium, Hard, Expert
- Smart hint system to help you break through barriers
- Error detection to avoid unnecessary frustration
- Timing feature to challenge your solving speed

Ready for this dual test of logic and patience? Every successfully solved Sudoku is the best proof of your intelligence!`,

    'wordle': `📝 The word guessing game that took the world by storm! Wordle isn't just a game - it's become a social phenomenon with millions participating in this daily battle of word wisdom!

🌟 **The Wordle Phenomenon:**
• One word per day, synchronized global challenge
• Six attempts to guess a five-letter English word
• Smart color-coded hint system guides you to the answer
• Share results without spoiling the solution

🎯 **Why Wordle is So Popular:**
- Simple to understand but requires vocabulary and strategy
- Daily limit creates anticipation and excitement
- Social sharing creates friendly competition among friends
- Perfect brain training and English learning tool

⚡ **Game Features:**
- Elegant minimalist interface design
- Smart word verification system
- Detailed statistics tracking
- Ad-free pure gaming experience

Is your vocabulary strong enough? Can your logical reasoning help you find the answer quickly? Join this global word game and prove your linguistic talent!`,

    'agar-io': `🦠 Cellular warfare! In this highly competitive microscopic world, you'll control a tiny cell, growing by consuming others, ultimately becoming the ruler of the petri dish!

⚔️ **Survival of the Fittest:**
• Start your journey as a microscopic cell
• Consume smaller cells to increase your size
• Beware of being eaten by larger cells
• Survive and thrive in this eat-or-be-eaten world

🌍 **Multiplayer Online Experience:**
- Battle real players from around the globe in real-time
- Hundreds of players competing simultaneously each match
- Dynamic game environment that changes instantly
- Simple controls but requires high-level strategic thinking

🏆 **Growth and Strategy:**
- Larger size means slower movement - balance the risks
- Split your cell for advanced tactical maneuvers
- Use map boundaries and obstacles to your advantage
- Form alliances with other players or betray them

This isn't just a game - it's a social experiment about survival, growth, and strategy! Can you survive and dominate in this dangerous microscopic world?`,

    'slither-io': `🐍 Super Snake Battle Royale! This isn't your typical classic snake game - it's a multiplayer online competitive game where you compete with players worldwide!

🎮 **New Multiplayer Experience:**
• Compete with hundreds of real players on the same map
• Eat glowing orbs to grow your snake longer
• When other snakes hit you, they explode into orbs you can collect
• The goal is to become the longest snake on the server

🌟 **Strategic Gameplay:**
- Use boost to escape danger or catch prey (but it costs length)
- Circle smaller snakes to trap them
- Cut off other players' paths strategically
- Size matters, but so does smart maneuvering

🏆 **Competitive Features:**
- Real-time leaderboard showing top players
- Smooth multiplayer gameplay with players worldwide
- Simple controls but deep strategic possibilities
- Endless matches with constantly changing dynamics

Can you slither your way to the top of the leaderboard? Master the art of snake warfare and become the ultimate slither champion!`,

    'candy-crush': `🍭 Sweet and addictive match-3 magic! Dive into the colorful world of Candy Crush Saga, where matching candies creates explosive fun and endless entertainment!

🎨 **Colorful Sweet Adventure:**
• Match three or more candies of the same color
• Create special candies with powerful explosive effects
• Navigate through hundreds of uniquely designed levels
• Sweet graphics and satisfying matching animations

✨ **Special Candy Magic:**
- Striped candies clear entire rows or columns
- Wrapped candies explode in powerful bursts
- Color bombs clear all candies of one color
- Combine special candies for mega explosions

🎯 **Engaging Challenges:**
- Various level types: Clear jelly, collect ingredients, reach scores
- Limited moves add strategic thinking to each level
- Boosters and power-ups help overcome tough challenges
- Social features to compete with friends

Ready to satisfy your sweet tooth? Match, crush, and strategize your way through this candy-filled adventure that has captivated millions worldwide!`,

    'crossword': `📝 Daily word puzzle mastery! Challenge your vocabulary and knowledge with crossword puzzles that combine wordplay, trivia, and logical thinking into one engaging experience!

🧩 **The Art of Crosswords:**
• Fill in white squares with letters to form words
• Use intersecting clues to help solve challenging entries
• Themes and wordplay add layers of complexity
• Daily puzzles with varying difficulty levels

💡 **Mental Benefits:**
- Expands vocabulary and general knowledge
- Improves memory and cognitive function
- Develops pattern recognition skills
- Perfect way to unwind while staying mentally active

🎯 **Puzzle Features:**
- Professional-quality crossword construction
- Hints and checking features for when you're stuck
- Timer to track your solving speed
- Archive of past puzzles for unlimited practice

Whether you're a crossword novice or expert solver, daily crosswords offer the perfect blend of challenge and satisfaction. Sharpen your mind one clue at a time!`,

    'geometry-dash': `🎵 Rhythm-based platforming madness! Geometry Dash combines precision jumping, electronic music, and geometric obstacles into one intensely challenging and addictive experience!

⚡ **Rhythm Action Gameplay:**
• Jump and fly through dangerous obstacle courses
• Every move must sync perfectly with the pumping soundtrack
• One mistake sends you back to the beginning
• Practice mode helps you master the toughest sections

🎮 **Challenging Features:**
- Multiple game modes: cube, ship, ball, UFO, and more
- User-generated levels provide infinite content
- Customizable icons and colors for your character
- Achievement system rewards skilled players

🌟 **Why It's Addictive:**
- Perfect synchronization of music and gameplay
- "Just one more try" mentality keeps you hooked
- Incredible satisfaction when finally beating a level
- Community-created content ensures fresh challenges

Prepare for the ultimate test of timing, reflexes, and patience! Can you navigate through the geometric chaos and prove you have what it takes to dash through danger?`
  }

  return enhancedDescriptionsEn[game.id] || game.descriptionEn || game.description || 'An exciting game waiting to be discovered!'
}

// 中文增强的游戏描述生成器
export const getEnhancedGameDescription = (game: Game): string => {
  const enhancedDescriptions: Record<string, string> = {
    '2048': `🎯 准备好迎接最令人上瘾的数字合并挑战了吗？在这个经典的益智游戏中，你需要滑动数字方块，将相同的数字合并，最终达到神奇的2048！

🧠 **为什么你会爱上2048：**
• 简单易学，但要精通却需要策略思维
• 每一步都至关重要，一个错误可能前功尽弃
• 无穷无尽的重玩价值，每局都是新的挑战
• 锻炼你的数学思维和空间规划能力

🚀 **游戏特色：**
- 流畅的触控和键盘操作
- 优雅的极简设计界面
- 实时分数统计和最佳记录
- 适合碎片时间，随时随地畅玩

你能达到2048吗？更进一步，你能突破4096、8192的极限吗？现在就开始这场数字的征程吧！`,

    'tetris': `🎮 重温经典，体验永恒！俄罗斯方块是有史以来最伟大的益智游戏之一，现在你可以在浏览器中免费畅玩这款传奇作品！

🌟 **经典魅力，永不过时：**
• 七种独特的方块形状，无限组合可能
• 节奏感十足的游戏体验，越玩越快
• 完美的行消除带来无与伦比的满足感
• 简单规则，深度策略，老少皆宜

⚡ **游戏亮点：**
- 原汁原味的经典玩法
- 平滑的方块下降动画
- 渐进式难度提升
- 支持快速下降和旋转操作

无论你是怀旧的老玩家，还是第一次接触的新手，俄罗斯方块都会让你沉迷其中！来看看你能坚持多少行，创造属于你的传奇分数！`,

    'snake': `🐍 经典重现！还记得那个让无数人沉迷的贪吃蛇游戏吗？现在它以全新的面貌回归，准备好重新体验这份纯粹的游戏乐趣！

🎯 **简单却不简单：**
• 控制你的小蛇在屏幕上自由穿梭
• 吃掉食物让蛇身变得越来越长
• 避免撞到墙壁和自己的身体
• 看似简单，但要获得高分需要完美的策略

🏆 **为什么贪吃蛇永不过时：**
- 纯粹的游戏乐趣，无需复杂操作
- 每一次游戏都是对反应速度的考验
- 渐进式的难度提升，越长越困难
- 完美的碎片时间游戏

🚀 **现代化体验：**
- 流畅的画面和响应
- 精确的触控操作
- 实时分数显示
- 无广告纯净体验

挑战你的极限，看看你能让小蛇长到多长！这不仅是游戏，更是对专注力和策略思维的终极考验！`,

    'pacman': `👻 经典街机之王归来！进入吃豆人的迷宫世界，体验这款影响了整整一代游戏玩家的传奇作品！

🎮 **街机厅的回忆：**
• 控制可爱的黄色吃豆人穿梭在经典迷宫中
• 收集所有的小豆子完成关卡挑战
• 躲避四只色彩缤纷的幽灵：红、粉、蓝、橙
• 吃下能量豆，反击追击你的幽灵！

⚡ **游戏精髓：**
- 完美的风险与回报平衡
- 需要策略规划和快速反应
- 经典的追逐与反击机制
- 越来越具挑战性的关卡设计

🌟 **为什么吃豆人是永恒经典：**
- 简单直观的操作方式
- 紧张刺激的追逐体验
- 富有策略性的游戏深度
- 怀旧与现代的完美结合

准备好在这个充满挑战的迷宫中展开你的冒险了吗？收集豆子、躲避幽灵、创造高分记录，成为新的吃豆人传奇！`,

    'chess': `♔ 智慧的较量，王者的游戏！国际象棋是世界上最古老、最深奥的策略游戏之一。在这里，你可以与全球玩家或AI对手展开一场场激动人心的智力对决！

🧠 **为什么选择国际象棋：**
• 锻炼逻辑思维和战略规划能力
• 每一步都关乎全局，考验你的预判能力
• 无穷无尽的变化，永远有新的挑战
• 提升专注力和决策能力

👑 **平台优势：**
- 与全球数百万玩家在线对战
- 多种难度的AI对手，从新手到大师级
- 实时游戏分析和复盘功能
- 完整的排名系统和进步追踪

⚔️ **游戏特色：**
- 标准的国际象棋规则
- 多种时间控制模式
- 精美的棋盘和棋子设计
- 移动端和桌面端完美适配

无论你是象棋新手还是资深玩家，这里都有适合你的挑战等着！来展示你的战略智慧，成为真正的国际象棋大师！`,

    'sudoku': `🔢 数字逻辑的终极挑战！数独不仅仅是填数字游戏，它是一场对逻辑思维、耐心和专注力的全面考验！

🧩 **数独的魅力：**
• 在9×9的网格中填入1-9的数字
• 每行、每列、每个3×3小格都不能重复
• 看似简单的规则，却有无穷的变化
• 从入门到专家级，总有适合你的难度

💡 **为什么数独让人着迷：**
- 纯粹的逻辑推理，无需猜测
- 完成时的成就感无与伦比
- 有效锻炼大脑，预防老化
- 安静的个人挑战，完美的冥想方式

🎯 **游戏亮点：**
- 多种难度等级：简单、中等、困难、专家
- 智能提示系统，助你突破瓶颈
- 错误检测功能，避免不必要的困扰
- 计时功能，挑战你的解题速度

准备好接受这场逻辑与耐心的双重考验了吗？每一个成功解出的数独，都是对你智慧的最好证明！`,

    'wordle': `📝 风靡全球的单词猜谜游戏！Wordle不仅仅是游戏，它已经成为了一种社交现象，每天都有数百万人参与这场文字智慧的较量！

🌟 **Wordle现象：**
• 每天只有一个单词，全球玩家同步挑战
• 六次机会猜出五个字母的英文单词
• 智能的颜色提示系统指引你找到答案
• 可以分享结果，但不会剧透答案

🎯 **为什么Wordle如此受欢迎：**
- 简单易懂，但需要词汇量和策略
- 每天一次的限制增加了期待感
- 社交分享功能让朋友间产生良性竞争
- 完美的大脑训练和英语学习工具

⚡ **游戏特色：**
- 优雅的极简界面设计
- 智能的单词验证系统
- 详细的统计数据追踪
- 无广告的纯净游戏体验

你的词汇量够强吗？你的逻辑推理能力能帮你快速找到答案吗？加入这场全球性的文字游戏，证明你的语言天赋！`,

    'agar-io': `🦠 细胞大作战！在这个充满竞争的微观世界中，你将控制一个小细胞，通过吞噬其他细胞来成长，最终成为培养皿中的霸主！

⚔️ **生存竞争法则：**
• 从一个微小的细胞开始你的征程
• 吞噬比你小的细胞来增大体积
• 小心被更大的细胞捕食
• 在这个弱肉强食的世界中生存壮大

🌍 **多人在线体验：**
- 与全球真实玩家实时对战
- 每局都有数百个玩家同时竞技
- 动态的游戏环境，瞬息万变
- 简单操作，但需要高度的策略思维

🏆 **成长与策略：**
- 体积越大移动越慢，需要平衡风险
- 可以分裂细胞进行高级战术
- 利用地图边界和障碍物
- 与其他玩家结盟或背叛

这不仅是一个游戏，更是一场关于生存、成长和策略的社会实验！你能在这个充满危险的微观世界中存活并称霸吗？`,

    'slither-io': `🐍 超级贪吃蛇大作战！这不是你印象中的经典贪吃蛇，而是一场与全球玩家同台竞技的多人在线竞技游戏！

🎮 **多人竞技新体验：**
• 与数百名真实玩家在同一地图中竞争
• 通过吃掉彩色光点让你的蛇变得更长更强
• 当其他蛇撞到你的身体时，它们会变成光点
• 目标：成为地图上最长的蛇！

⚡ **策略与技巧：**
- 围困其他玩家，迫使他们撞到你
- 利用加速功能进行关键时刻的逃脱
- 观察地图，寻找最佳的成长路线
- 长度越长，获得的分数越高

🏆 **竞技亮点：**
- 实时排行榜显示最长的蛇
- 流畅的操作体验，支持触屏和键盘
- 丰富的视觉效果和音效
- 无需注册，即点即玩

准备好在这场蛇类大战中证明自己了吗？成为最长的蛇，统治整个游戏世界！每一次游戏都是新的挑战，每一次胜利都是实力的证明！`,

    'candy-crush': `🍭 甜蜜的三消大冒险！进入这个充满甜蜜诱惑的彩色世界，体验最令人着迷的益智游戏！消除糖果从未如此有趣！

🌈 **糖果世界的魅力：**
• 数百种精心设计的关卡等你挑战
• 五彩缤纷的糖果和特效让人目不暇接
• 简单的三消玩法，但策略深度惊人
• 每一关都有独特的目标和挑战

💎 **游戏特色：**
- 多种特殊糖果和组合效果
- 丰富的道具帮助你突破困难关卡
- 精美的动画和音效设计
- 社交功能让你与朋友比拼进度

🎯 **为什么让人欲罢不能：**
- 满足感十足的消除体验
- 渐进式的难度设计
- 完美的休闲娱乐游戏
- 适合所有年龄段的玩家

🚀 **挑战等级：**
- 从简单的入门关卡开始
- 逐步解锁更复杂的挑战
- 特殊关卡模式增加游戏变化
- 无限的重玩价值

准备好沉浸在这个甜蜜的世界中了吗？每一次三连消除都会带来满足感，每一关的通过都是智慧的体现！`,

    'crossword': `📰 每日填字挑战！锻炼你的词汇量、常识和逻辑推理能力，在这个经典的文字游戏中展现你的博学！

🧠 **智力挑战的精髓：**
• 每日更新的新鲜填字谜题
• 横向和纵向线索的巧妙交织
• 从简单到困难的多种难度等级
• 涵盖文化、历史、科学等各个领域

📚 **为什么填字游戏永不过时：**
- 有效提升词汇量和语言能力
- 锻炼联想思维和逻辑推理
- 增长知识面，了解各种趣味常识
- 完美的大脑训练和娱乐结合

⭐ **游戏亮点：**
- 专业编辑精心制作的高质量谜题
- 智能提示系统帮助你突破难题
- 进度保存，随时继续未完成的挑战
- 详细的解释让你学到新知识

🎯 **适合人群：**
- 喜欢文字游戏的玩家
- 想要提升英语水平的学习者
- 寻求智力挑战的益智游戏爱好者
- 所有热爱学习和思考的人

每天一个填字游戏，让你的大脑保持活跃！你准备好接受这场词汇与智慧的双重考验了吗？`,

    'geometry-dash': `🎵 节奏与反应的极限挑战！在音乐的节拍中跳跃、飞翔、闪避，体验这款让无数玩家又爱又恨的节奏动作游戏！

⚡ **音乐与动作的完美融合：**
• 跟随激动人心的电子音乐节拍
• 通过点击来控制方块跳跃和飞行
• 避开各种致命的障碍物和陷阱
• 一次失误就要重新开始的极限挑战

🎮 **为什么它如此上瘾：**
- 简单的操作方式，但需要完美的时机把握
- 音乐与游戏的同步带来沉浸式体验
- 每一次失败都让你更接近成功
- 通关后的成就感无与伦比

🌟 **游戏特色：**
- 精心设计的关卡和视觉效果
- 多种游戏模式和角色形态
- 渐进式的难度提升
- 社区制作的海量自定义关卡

🏆 **挑战你的极限：**
- 测试你的反应速度和节奏感
- 培养专注力和耐心
- 每个关卡都是独特的艺术作品
- 与朋友分享你的成就和挫败

准备好接受这场节奏与技巧的终极考验了吗？在音乐的世界中跳跃，在困难中成长，证明你就是几何冲刺的王者！`
  }

  return enhancedDescriptions[game.id] || getGameDescription(game)
} 