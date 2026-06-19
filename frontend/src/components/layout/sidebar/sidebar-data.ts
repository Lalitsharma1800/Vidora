import type { LucideIcon } from 'lucide-react'
import {
  CircleHelp,
  Clock,
  Flame,
  Gamepad2,
  History,
  Home,
  ListVideo,
  MessageSquare,
  Music,
  Newspaper,
  Settings,
  ThumbsUp,
  Trophy,
  TvMinimalPlay,
  Zap,
} from 'lucide-react'

export interface SidebarItemData {
  id: string
  label: string
  href: string
  icon: LucideIcon
  /** Static UI-only active state for demo styling */
  isActive?: boolean
}

export interface SidebarSectionData {
  id: string
  items: SidebarItemData[]
}

export const SIDEBAR_WIDTH_EXPANDED = 240
export const SIDEBAR_WIDTH_COLLAPSED = 72
export const NAVBAR_HEIGHT = 56

export const sidebarSections: SidebarSectionData[] = [
  {
    id: 'primary',
    items: [
      { id: 'home', label: 'Home', href: '/', icon: Home, isActive: true },
      { id: 'shorts', label: 'Shorts', href: '/shorts', icon: Zap },
      {
        id: 'subscriptions',
        label: 'Subscriptions',
        href: '/subscriptions',
        icon: TvMinimalPlay,
      },
    ],
  },
  {
    id: 'library',
    items: [
      { id: 'history', label: 'History', href: '/history', icon: History },
      { id: 'playlists', label: 'Playlists', href: '/playlists', icon: ListVideo },
      {
        id: 'watch-later',
        label: 'Watch Later',
        href: '/watch-later',
        icon: Clock,
      },
      { id: 'liked', label: 'Liked Videos', href: '/liked', icon: ThumbsUp },
    ],
  },
  {
    id: 'explore',
    items: [
      { id: 'trending', label: 'Trending', href: '/trending', icon: Flame },
      { id: 'music', label: 'Music', href: '/music', icon: Music },
      { id: 'gaming', label: 'Gaming', href: '/gaming', icon: Gamepad2 },
      { id: 'news', label: 'News', href: '/news', icon: Newspaper },
      { id: 'sports', label: 'Sports', href: '/sports', icon: Trophy },
    ],
  },
  {
    id: 'support',
    items: [
      { id: 'settings', label: 'Settings', href: '/settings', icon: Settings },
      { id: 'help', label: 'Help', href: '/help', icon: CircleHelp },
      { id: 'feedback', label: 'Feedback', href: '/feedback', icon: MessageSquare },
    ],
  },
]
