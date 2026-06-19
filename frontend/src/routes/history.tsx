import { createFileRoute } from '@tanstack/react-router'

import { NavPlaceholderPage } from '#/components/pages/nav-placeholder-page.tsx'

export const Route = createFileRoute('/history')({
  component: HistoryPage,
})

function HistoryPage() {
  return (
    <NavPlaceholderPage
      title="History"
      description="Videos you have watched recently across Vidora."
    />
  )
}
