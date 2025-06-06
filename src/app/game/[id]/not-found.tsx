import Link from 'next/link'
import { ArrowLeft, Gamepad2, Home } from 'lucide-react'

export default function GameNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-lg mx-auto text-center px-6">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full mb-6">
            <Gamepad2 size={32} className="text-gray-400" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            游戏未找到
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            抱歉，您请求的游戏不存在或已被移除。
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center space-x-2 w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Home size={20} />
            <span>返回首页</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center space-x-2 w-full px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            <span>返回上页</span>
          </button>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            💡 提示：您可以通过首页搜索或浏览分类来发现更多精彩游戏
          </p>
        </div>
      </div>
    </div>
  )
} 