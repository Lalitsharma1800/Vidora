'use client'

import type { ReactNode } from 'react'

import { TooltipProvider } from '#/components/ui/tooltip.tsx'

import { Navbar } from './navbar/Navbar.tsx'
import { Sidebar, SidebarInset } from './sidebar/Sidebar.tsx';
interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <TooltipProvider delay={300}>
      <div className="min-h-screen bg-background text-white">
        <Navbar />
        <Sidebar/>
        <SidebarInset>{children}</SidebarInset>
      </div>
    </TooltipProvider>
  )
}
