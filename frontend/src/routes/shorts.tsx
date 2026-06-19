import { createFileRoute } from '@tanstack/react-router'

import { NavPlaceholderPage } from '#/components/pages/nav-placeholder-page.tsx'

export const Route = createFileRoute('/shorts')({
  component: ShortsPage,
})

function ShortsPage() {
  return (
    <NavPlaceholderPage
      title="Shorts"
      description="Quick vertical videos curated for fast, immersive viewing."
    />
  )
}
