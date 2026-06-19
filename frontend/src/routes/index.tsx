import { createFileRoute } from '@tanstack/react-router'

import { NavPlaceholderPage } from '#/components/pages/nav-placeholder-page.tsx'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <NavPlaceholderPage
      title="Home"
      description="Discover videos from creators you follow and recommendations tailored for you."
    />
  )
}
