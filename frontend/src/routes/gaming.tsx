import { createFileRoute } from '@tanstack/react-router'

import { NavPlaceholderPage } from '#/components/pages/nav-placeholder-page.tsx'

export const Route = createFileRoute('/gaming')({
  component: GamingPage,
})

function GamingPage() {
  return (
    <NavPlaceholderPage
      title="Gaming"
      description="Live streams, walkthroughs, and highlights from the gaming world."
    />
  )
}
