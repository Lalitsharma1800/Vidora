import { createFileRoute } from '@tanstack/react-router'

import { NavPlaceholderPage } from '#/components/pages/nav-placeholder-page.tsx'

export const Route = createFileRoute('/settings')({
  component: SettingsPage,
})

function SettingsPage() {
  return (
    <NavPlaceholderPage
      title="Settings"
      description="Manage your account, playback, and notification preferences."
    />
  )
}
