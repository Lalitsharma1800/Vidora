import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { SidebarSection } from './SidebarSection.tsx'
import { sidebarSections } from './sidebar-data.ts'

export interface SidebarProps {
  /** Visual-only collapsed layout. No toggle behavior is implemented. */
  collapsed?: boolean
  className?: string
}

export function Sidebar({ collapsed = false, className }: SidebarProps) {
  return (
    <aside
      aria-label="Primary navigation"
      data-collapsed={collapsed ? 'true' : 'false'}
      className={cn(
        ' bg-zinc-900 fixed left-0 top-14 z-40 h-[calc(100vh-3.5rem)] flex-col overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:hidden border-r text-white transition-[width] duration-300 ease-in-out md:flex',
        collapsed ? 'w-0 md:w-18' : 'w-60',
        className,
      )}
    >
      <nav className="flex flex-1 flex-col pb-4 pt-2">
        {sidebarSections.map((section, index) => (
          <SidebarSection
            key={section.id}
            section={section}
            collapsed={collapsed}
            showDivider={index < sidebarSections.length - 1}
          />
        ))}
      </nav>
    </aside>
  )
}

export interface SidebarInsetProps {
  children: ReactNode
  /** Visual-only collapsed layout offset. No toggle behavior is implemented. */
  collapsed?: boolean
  className?: string
}

export function SidebarInset({
  children,
  collapsed = false,
  className,
}: SidebarInsetProps) {
  return (
    <main
      className={cn(
        'pt-14 min-h-screen transition-[margin] duration-300 ease-in-out text-white',
        `${collapsed ? 'md:ml-18' : 'md:ml-60'}`,
        className,
      )}
    >
      {children}
    </main>
  )
}
