import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
  current?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      <Link 
        href="/"
        className="flex items-center text-gray-500 hover:text-blue-600 transition-colors duration-200"
      >
        <Home size={16} />
        <span className="sr-only">首页</span>
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight size={16} className="text-gray-400" />
          
          {item.href && !item.current ? (
            <Link 
              href={item.href}
              className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
            >
              {item.label}
            </Link>
          ) : (
            <span 
              className={`${item.current ? 'text-gray-900 font-medium' : 'text-gray-500'}`}
              aria-current={item.current ? 'page' : undefined}
            >
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
} 