'use client'

import type { ReactNode } from 'react'

import { TooltipProvider } from '#/components/ui/tooltip.tsx'

import { Navbar } from './navbar/Navbar.tsx'
import { Sidebar, SidebarInset } from './sidebar/Sidebar.tsx';
interface AppShellProps {
  children: ReactNode
}
import { useSidebarCollapseStore } from '#/zustand/sidebarStore/useSidebarCollapsedState.ts';

export function AppShell({ children }: AppShellProps) {
  const is_collapsed = useSidebarCollapseStore(state => state.isCollapsed);
  return (
    <TooltipProvider delay={300}>
      <div className="min-h-screen bg-background relative">
        <Navbar/>
        <Sidebar collapsed={is_collapsed}/>
        <SidebarInset collapsed={is_collapsed}>{children}</SidebarInset>
      </div>
    </TooltipProvider>
  )
}
