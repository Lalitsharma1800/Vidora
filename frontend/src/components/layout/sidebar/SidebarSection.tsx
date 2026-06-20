import type { SidebarSectionData } from './sidebar-data.ts'
import { SidebarItem } from './SidebarItem.tsx'

export interface SidebarSectionProps {
  section: SidebarSectionData
  collapsed?: boolean
  showDivider?: boolean
}

export function SidebarSection({
  section,
  collapsed = false,
  showDivider = false,
}: SidebarSectionProps) {
  return (
    <>
      <div role="group" aria-label={section.id}>
        <ul className="flex flex-col gap-0.5 px-3 py-2 ">
          {section.items.map((item) => (
            <SidebarItem key={item.id} item={item} collapsed={collapsed} />
          ))}
        </ul>
      </div>
      {showDivider ? (
        <div
          role="separator"
          aria-hidden="true"
          className="mx-3 my-1 border-t border-sidebar-border"
        />
      ) : null}
    </>
  )
}
