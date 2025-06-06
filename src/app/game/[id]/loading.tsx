import { ArrowLeft } from 'lucide-react'

export default function GameDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header骨架 */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2 text-gray-400">
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">返回</span>
            </div>
            
            <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              GameHub
            </div>
            
            <div className="hidden md:flex items-center space-x-2">
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容骨架 */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-12 animate-pulse">
            
            {/* 标题区域骨架 */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="flex space-x-2">
                  <div className="h-8 bg-gray-200 rounded-full w-16"></div>
                  <div className="h-8 bg-gray-200 rounded-full w-20"></div>
                </div>
              </div>

              {/* 缩略图骨架 */}
              <div className="h-48 sm:h-56 lg:h-64 bg-gray-200 rounded-lg"></div>

              {/* 描述骨架 */}
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>

              {/* 按钮骨架 */}
              <div className="flex justify-center sm:justify-start">
                <div className="h-14 bg-gray-200 rounded-lg w-48"></div>
              </div>

              {/* 标签骨架 */}
              <div className="space-y-3">
                <div className="h-6 bg-gray-200 rounded w-24"></div>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-6 w-16 bg-gray-200 rounded-md"></div>
                  ))}
                </div>
              </div>

              {/* 游戏信息骨架 */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="h-6 bg-gray-200 rounded w-24 mb-4"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-12"></div>
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-12"></div>
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 推荐游戏骨架 */}
        <div className="mt-12">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 sm:p-8 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="space-y-4">
                    <div className="h-32 bg-gray-200 rounded-lg"></div>
                    <div className="space-y-2">
                      <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded-lg"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 