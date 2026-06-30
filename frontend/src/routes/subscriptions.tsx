import { createFileRoute } from '@tanstack/react-router'
import SubscriptionList from '#/components/layout/subscriptions/subscription-list.tsx'
import { useSidebarStore } from '#/zustand/sidebarStore/useSidebar';
export const Route = createFileRoute('/subscriptions')({
  component: SubscriptionsPage,
})

export default function SubscriptionsPage() {
  const setActiveSidebar = useSidebarStore((state) => state.setActiveSidebar);
  setActiveSidebar('subscriptions');
  return <SubscriptionList />
}
