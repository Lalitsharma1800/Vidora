import { createFileRoute } from '@tanstack/react-router'

import { NavPlaceholderPage } from '#/components/pages/nav-placeholder-page.tsx'

export const Route = createFileRoute('/music')({
  component: MusicPage,
})

function MusicPage() {
  return (
    <NavPlaceholderPage
      title="Music"
      description="Official videos, live performances, and music discovery."
    />
  )
}
