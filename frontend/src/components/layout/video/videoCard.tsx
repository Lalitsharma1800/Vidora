'use client'

import { Play,   User } from 'lucide-react'
import { useState } from 'react'

export interface VideoCardProps {
  videoId: string
  title: string
  channel: string
  views: number
  publishedAt: string
  thumbnail?: string
  duration?: string
  onClick?: () => void
}

export function VideoCard({
  videoId,
  title,
  channel,
  views,
  publishedAt,
  thumbnail,
  duration,
  onClick,
}: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const defaultThumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  const thumbnailUrl = thumbnail || defaultThumbnail

  const formatViews = (viewCount: number): string => {
    if (viewCount >= 1_000_000) {
      return `${(viewCount / 1_000_000).toFixed(1)}M`
    }
    if (viewCount >= 1_000) {
      return `${(viewCount / 1_000).toFixed(1)}K`
    }
    return viewCount.toString()
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    const diffWeeks = Math.floor(diffDays / 7)
    const diffMonths = Math.floor(diffDays / 30)
    const diffYears = Math.floor(diffDays / 365)

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays}d ago`
    if (diffWeeks < 4) return `${diffWeeks}w ago`
    if (diffMonths < 12) return `${diffMonths}mo ago`
    return `${diffYears}y ago`
  }

  const handleCardClick = () => {
    if (onClick) {
      onClick()
    } else {
      
    }
  }

  return (
    <div
      className="group flex flex-col cursor-pointer"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCardClick()
        }
      }}
      aria-label={`Watch ${title} by ${channel}`}
    >
      {/* Thumbnail Container */}
      <div className="relative w-full overflow-hidden rounded-lg bg-slate-900">
        {/* Aspect Ratio Container */}
        <div className="relative w-full pb-[56.25%]">
          {/* Thumbnail Image */}
          <img
            src={thumbnailUrl}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300"
            loading="lazy"
          />

          {/* Overlay on Hover */}
          <div
            className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex items-center justify-center rounded-full bg-olive-600 p-2 transition-transform duration-300 group-hover:scale-110">
              <Play className="h-6 w-6 fill-blue-800 text-blue-800" />
            </div>
          </div>

          {/* Duration Badge */}
          {duration && (
            <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs font-semibold text-white">
              {duration}
            </div>
          )}
        </div>
      </div>

      {/* Content Container */}
      <div className="mt-3 flex gap-3 px-1 sm:mt-4">
        {/* Channel Avatar */}
        <div className="h-9 w-9 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 sm:h-10 sm:w-10" />

        {/* Video Info */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className="line-clamp-2 text-sm font-semibold text-slate-900 transition-colors group-hover:text-slate-700 dark:text-slate-100 dark:group-hover:text-slate-300 sm:text-base">
            {title}
          </h3>

          {/* Channel Name */}
          <p className="mt-1 text-xs text-slate-600 transition-colors group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-300 sm:text-sm">
            {channel}
          </p>

          {/* Views and Date */}
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
            {formatViews(views)} views • {formatDate(publishedAt)}
          </p>
        </div>
      </div>
    </div>
  )
}
