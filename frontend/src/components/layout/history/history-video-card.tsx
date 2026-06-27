import { Play, MoreHorizontal } from 'lucide-react'
import React, { useState, type ReactNode } from 'react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '#/components/ui/dropdown-menu.tsx'

export interface HistoryVideoMenuItem {
  label: string
  icon?: ReactNode
  onSelect?: () => void
  variant?: 'default' | 'destructive'
}

export interface HistoryVideoCardProps {
  id: string
  videoId: string
  title: string
  channel: string
  views: number
  publishedAt: string
  thumbnail?: string
  duration?: string
  watchedAt?: string
  progressPercent?: number // 0-100
  menuItems?: HistoryVideoMenuItem[]
}

export function HistoryVideoCard({
  videoId,
  title,
  channel,
  views,
  publishedAt,
  thumbnail,
  duration,
  progressPercent = 0,
  menuItems,
}: HistoryVideoCardProps) {
  const [hover, setHover] = useState(false)
  const defaultThumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  const thumb = thumbnail || defaultThumb

  const formatViews = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
    return `${n}`
  }

  return (
    <div
      className="flex items-start gap-4 py-3 hover:bg-zinc-50/4"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Thumbnail column */}
      <div className="relative flex-none w-40 sm:w-56">
        <div className="aspect-video w-full overflow-hidden rounded-sm bg-zinc-900">
          <img src={thumb} alt={title} className="h-full w-full object-cover" loading="lazy" />
        </div>

        {duration && (
          <div className="absolute right-1 bottom-1 rounded bg-black/80 px-2 py-0.5 text-xs font-medium text-white">
            {duration}
          </div>
        )}

        {/* progress bar */}
        <div className="absolute left-0 bottom-0 h-1 w-full bg-zinc-700">
          <div
            className="h-1 bg-red-600"
            style={{ width: `${Math.max(0, Math.min(100, progressPercent))}%` }}
          />
        </div>
      </div>

      {/* Main info */}
      <div className="min-w-0 flex-1">
        <h3 className="line-clamp-2 text-sm font-medium text-white sm:text-base">{title}</h3>
        <div className="mt-1 text-xs text-zinc-400 sm:text-sm">
          <div>{channel}</div>
          <div className="mt-1">{formatViews(views)} views • {publishedAt}</div>
        </div>
      </div>

      {/* Menu */}
      <div className="flex flex-col items-end gap-2">
        {menuItems && menuItems.length > 0 && (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full p-2 text-zinc-300 hover:bg-zinc-900/60">
                <MoreHorizontal className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-zinc-950 border border-zinc-800">
                {menuItems.map((it, i) => (
                  <DropdownMenuItem key={`${it.label}-${i}`} onSelect={() => it.onSelect?.()} variant={it.variant} className="px-3 py-2">
                    {it.icon && <span className="mr-2 inline-block align-middle">{it.icon}</span>}
                    {it.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {false && <div className="text-xs text-zinc-500">{/* placeholder for subtitle */}</div>}
      </div>
    </div>
  )
}

export default HistoryVideoCard
