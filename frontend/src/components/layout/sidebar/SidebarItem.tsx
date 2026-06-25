import type { SidebarItemData } from './sidebar-data.ts';
import { Link } from '@tanstack/react-router';
import { cn } from '@/lib/utils';
import { useSidebarStore } from '#/zustand/sidebarStore/useSidebar.ts';

export interface SidebarItemProps {
  item: SidebarItemData
  collapsed?: boolean
}

export function SidebarItem({ item, collapsed = false }: SidebarItemProps) {
  const Icon = item.icon
  const activeSidebar = useSidebarStore((state) => state.activeSidebar);
  const setActiveSidebar = useSidebarStore((state) => state.setActiveSidebar);
  const onClickHandler = (sidebar : String) => {
          setActiveSidebar(sidebar);    
  };
  return (
    <li onClick={() => onClickHandler(item.id)}>
          <Link
            to={item.href}
            aria-label={item.label}
            aria-current={item.isActive ? 'page' : undefined}
              className={cn(
                'group flex min-h-10 items-center rounded-xl text-sm font-normal  transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar',
                `${(item.id !== activeSidebar) && 'hover:bg-sidebar-accent hover:text-neutral-500' }`,
                item.id === activeSidebar &&
                'bg-neutral-800 font-medium',
                collapsed
                  ? 'mx-auto size-10 justify-center px-0 text-white'
                  : 'gap-5 px-3 py-2 text-white',
              )}
            >
              <Icon
                className={cn(
                  'size-5 shrink-0 transition-transform duration-200 group-hover:scale-105 text-white'
                )}
                aria-hidden="true"
              />
              <span
                className={cn(
                  'truncate  ', item.id === activeSidebar && 'font-bold',
                  collapsed && 'sr-only',
                )}
              >
                {item.label}
              </span>
          </Link>
    </li>
  )
}
