import { createFileRoute } from '@tanstack/react-router'

import { NavPlaceholderPage } from '#/components/pages/nav-placeholder-page.tsx'

export const Route = createFileRoute('/playlists')({
  component: PlaylistsPage,
})

function PlaylistsPage() {
  return (
    <NavPlaceholderPage
      title="Playlists"
      description="Collections of videos you created or saved."
    />
  )
}
