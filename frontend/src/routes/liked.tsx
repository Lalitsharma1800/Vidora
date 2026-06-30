import { createFileRoute } from '@tanstack/react-router'

import { NavPlaceholderPage } from '#/components/pages/nav-placeholder-page.tsx'

export const Route = createFileRoute('/liked')({
  component: LikedPage,
})

function LikedPage() {
  return (
    <NavPlaceholderPage
      title="Liked Videos"
      description="Every video you have liked in one place."
    />
  )
}
