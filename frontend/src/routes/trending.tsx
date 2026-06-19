import { createFileRoute } from '@tanstack/react-router'

import { NavPlaceholderPage } from '#/components/pages/nav-placeholder-page.tsx'

export const Route = createFileRoute('/trending')({
  component: TrendingPage,
})

function TrendingPage() {
  return (
    <NavPlaceholderPage
      title="Trending"
      description="Popular videos gaining momentum across Vidora right now."
    />
  )
}
