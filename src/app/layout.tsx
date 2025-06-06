import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GameHub - 精品网页游戏聚合平台',
  description: '发现和畅玩最优质的网页游戏，包含益智、动作、策略等多种类型游戏',
  keywords: '网页游戏,在线游戏,免费游戏,益智游戏,动作游戏,策略游戏',
  authors: [{ name: 'GameHub Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          {children}
        </div>
      </body>
    </html>
  )
} 