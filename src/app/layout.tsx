import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://webpuzzlegames.pages.dev'),
  title: 'GameHub - 精品网页游戏聚合平台',
  description: '发现和畅玩最优质的网页游戏，包含益智、动作、策略等多种类型游戏',
  keywords: '网页游戏,在线游戏,免费游戏,益智游戏,动作游戏,策略游戏',
  authors: [{ name: 'GameHub Team' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JF8E2DW2P3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JF8E2DW2P3');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          {children}
        </div>
      </body>
    </html>
  )
} 