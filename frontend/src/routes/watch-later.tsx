import { createFileRoute } from '@tanstack/react-router'

import { NavPlaceholderPage } from '#/components/pages/nav-placeholder-page.tsx'

export const Route = createFileRoute('/watch-later')({
  component: WatchLaterPage,
})

function WatchLaterPage() {
  return (
    <NavPlaceholderPage
      title="Watch Later"
      description="Videos you saved to watch when you are ready."
    />
  )
}
