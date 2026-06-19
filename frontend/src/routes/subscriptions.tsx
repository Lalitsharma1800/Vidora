import { createFileRoute } from '@tanstack/react-router'

import { NavPlaceholderPage } from '#/components/pages/nav-placeholder-page.tsx'

export const Route = createFileRoute('/subscriptions')({
  component: SubscriptionsPage,
})

function SubscriptionsPage() {
  return (
    <NavPlaceholderPage
      title="Subscriptions"
      description="Latest uploads from channels you subscribe to."
    />
  )
}
