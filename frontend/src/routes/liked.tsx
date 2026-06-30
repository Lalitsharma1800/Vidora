import { createFileRoute } from '@tanstack/react-router'

import { NavPlaceholderPage } from '#/components/pages/nav-placeholder-page.tsx'
import { useSidebarStore } from '#/zustand/sidebarStore/useSidebar'

export const Route = createFileRoute('/liked')({
  component: LikedPage,
})

function LikedPage() {
  const setActiveSidebar = useSidebarStore((state) => state.setActiveSidebar);
  setActiveSidebar('liked');
  return (
    <NavPlaceholderPage
      title="Liked Videos"
      description="Every video you have liked in one place."
    />
  )
}
