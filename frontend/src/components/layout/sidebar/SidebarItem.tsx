import type { SidebarItemData } from './sidebar-data.ts'
import { cn } from '@/lib/utils'

export interface SidebarItemProps {
  item: SidebarItemData
  collapsed?: boolean
}

export function SidebarItem({ item, collapsed = false }: SidebarItemProps) {
  const Icon = item.icon

  return (
    <li>
      <a
        href={item.href}
        aria-label={item.label}
        aria-current={item.isActive ? 'page' : undefined}
        className={cn(
          'group flex min-h-10 items-center rounded-xl text-sm font-normal text-white transition-colors duration-200',
          'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar',
          item.isActive &&
            'bg-sidebar-accent font-medium text-sidebar-accent-foreground',
          collapsed
            ? 'mx-auto size-10 justify-center px-0'
            : 'gap-5 px-3 py-2',
        )}
      >
        <Icon
          className={cn(
            'size-6 shrink-0 transition-transform duration-200 group-hover:scale-105',
            item.isActive && 'text-sidebar-primary',
          )}
          aria-hidden="true"
        />
        <span
          className={cn(
            'truncate transition-opacity duration-200',
            collapsed && 'sr-only',
          )}
        >
          {item.label}
        </span>
      </a>
    </li>
  )
}
