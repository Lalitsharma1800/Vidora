import { createFileRoute } from '@tanstack/react-router'
import SubscriptionList from '#/components/layout/subscriptions/subscription-list.tsx'

export const Route = createFileRoute('/subscriptions')({
  component: SubscriptionsPage,
})

export default function SubscriptionsPage() {

  return <SubscriptionList />
}
