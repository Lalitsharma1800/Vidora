import type { LucideIcon } from 'lucide-react'
import {
  Clock,
  Flame,
  Gamepad2,
  History,
  Home,
  ListVideo,
  Music,
  Settings,
  ThumbsUp,
  TvMinimalPlay,
  Zap,
} from 'lucide-react'

export interface SidebarNavItemConfig {
  title: string
  to: string
  icon: LucideIcon
  exact?: boolean
}

export interface SidebarNavSectionConfig {
  id: string
  label?: string
  items: SidebarNavItemConfig[]
}

export const SIDEBAR_WIDTH_EXPANDED = 240
export const SIDEBAR_WIDTH_COLLAPSED = 72
export const NAVBAR_HEIGHT = 56

export const SIDEBAR_NAV_SECTIONS: SidebarNavSectionConfig[] = [
  {
    id: 'primary',
    items: [
      { title: 'Home', to: '/', icon: Home, exact: true },
      { title: 'Shorts', to: '/shorts', icon: Zap },
      { title: 'Subscriptions', to: '/subscriptions', icon: TvMinimalPlay },
    ],
  },
  {
    id: 'library',
    label: 'Library',
    items: [
      { title: 'History', to: '/history', icon: History },
      { title: 'Playlists', to: '/playlists', icon: ListVideo },
      { title: 'Liked Videos', to: '/liked', icon: ThumbsUp },
      { title: 'Watch Later', to: '/watch-later', icon: Clock },
    ],
  },
  {
    id: 'explore',
    label: 'Explore',
    items: [
      { title: 'Trending', to: '/trending', icon: Flame },
      { title: 'Gaming', to: '/gaming', icon: Gamepad2 },
      { title: 'Music', to: '/music', icon: Music },
    ],
  },
  {
    id: 'settings',
    items: [{ title: 'Settings', to: '/settings', icon: Settings }],
  },
]

export const SIDEBAR_NAV_ITEMS: SidebarNavItemConfig[] =
  SIDEBAR_NAV_SECTIONS.flatMap((section) => section.items)
