import { ChevronDown } from 'lucide-react'
import { SubscriptionCard, type SubscriptionChannel } from './subscription-card'
import { SubscriptionSkeleton } from './subscription-skeleton'
import { EmptySubscriptions } from './empty-subscriptions'

const mockSubscriptions: SubscriptionChannel[] = [
  {
    id: '1',
    name: 'Nerdy Dev',
    handle: '@nerdydev',
    avatar: 'https://images.pexels.com/photos/28336275/pexels-photo-28336275.jpeg?_gl=1*kj4bie*_ga*MTgyNzMzNjM0Ni4xNzgyNTU5Nzc0*_ga_8JE65Q40S6*czE3ODI1NTk3NzMkbzEkZzEkdDE3ODI1NTk3ODEkajUyJGwwJGgw',
    subscribers: 18300000,
    description: 'Daily videos on React, JavaScript, and modern front-end practices.',
    verified: true,
    isSubscribed: true,
  },
  {
    id: '2',
    name: 'Pixel Pulse',
    handle: '@pixelpulse',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    subscribers: 107000,
    description: 'Design tutorials, UI kits, and product design walkthroughs.',
    verified: false,
    isSubscribed: true,
  },
  {
    id: '3',
    name: 'Code Craft',
    handle: '@codecraft',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    subscribers: 2400,
    description: 'Small team building tutorials for clean architecture and testing.',
    verified: false,
    isSubscribed: true,
  },
  {
    id: '4',
    name: 'Product Playbook',
    handle: '@productplaybook',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    subscribers: 875,
    description: 'Product strategy, growth tactics, and launch post-mortems.',
    verified: false,
    isSubscribed: true,
  },
  {
    id: '5',
    name: 'React Radar',
    handle: '@reactradar',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
    subscribers: 1200000,
    description: 'React ecosystem deep dives, hooks patterns, and real app builds.',
    verified: true,
    isSubscribed: true,
  },
  {
    id: '6',
    name: 'Design Den',
    handle: '@designden',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    subscribers: 183000,
    description: 'Branding, motion, and design systems for product teams.',
    verified: false,
    isSubscribed: true,
  },
  {
    id: '7',
    name: 'Backend Breakdown',
    handle: '@backendbreakdown',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    subscribers: 1830000,
    description: 'API design, database performance, and server-side best practices.',
    verified: true,
    isSubscribed: true,
  },
  {
    id: '8',
    name: 'Startup Stories',
    handle: '@startupstories',
    avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a2c9f9?auto=format&fit=crop&w=200&q=80',
    subscribers: 183000,
    description: 'Interviews with founders, product lessons, and launch stories.',
    verified: false,
    isSubscribed: true,
  },
  {
    id: '9',
    name: 'UI Utilities',
    handle: '@uiutilities',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    subscribers: 430000,
    description: 'Component patterns, animation tricks, and layout workflows.',
    verified: false,
    isSubscribed: true,
  },
  {
    id: '10',
    name: 'Waveform',
    handle: '@waveform',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    subscribers: 3230000,
    description: 'Creative coding, audio visuals, and interactive web experiences.',
    verified: true,
    isSubscribed: true,
  },
]

export default function SubscriptionList() {
  const isLoading = false
  const subscriptions = mockSubscriptions

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            All subscriptions
          </h1>
          <p className="text-sm text-zinc-400">
            New activity from channels you follow appears here.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:border-zinc-700 hover:bg-zinc-900"
        >
          New activity
          <ChevronDown className="size-4" />
        </button>
      </div>

      <div className="divide-y divide-zinc-800">
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <SubscriptionSkeleton key={index} />
            ))
          : subscriptions.length === 0
          ? <EmptySubscriptions />
          : subscriptions.map((subscription) => (
              <SubscriptionCard key={subscription.id} {...subscription} />
            ))}
      </div>
    </section>
  )
}
