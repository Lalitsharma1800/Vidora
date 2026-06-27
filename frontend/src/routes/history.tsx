import { useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Search, Plus, Clock, ListPlus, Download, Share2, Trash2 } from 'lucide-react'
import { HistoryDayGroup } from '#/components/layout/history/history-day-group.tsx'
import { HistoryEmpty } from '#/components/layout/history/history-empty.tsx'
import { HistoryFilterTabs } from '#/components/layout/history/history-filter-tabs.tsx'
import type { HistoryItem } from '#/components/layout/history/history-day-group.tsx'

const historyMenuItems = [
  { label: 'Add to queue', icon: <Plus className="size-4" /> },
  { label: 'Save to Watch later', icon: <Clock className="size-4" /> },
  { label: 'Save to playlist', icon: <ListPlus className="size-4" /> },
  { label: 'Download', icon: <Download className="size-4" /> },
  { label: 'Share', icon: <Share2 className="size-4" /> },
  { label: 'Remove from watch history', icon: <Trash2 className="size-4" />, variant: 'destructive' as const },
]

const mockHistory: HistoryItem[] = [
  {
    id: '1',
    videoId: 'w7ejDZ8SWv8',
    title: 'Building a YouTube-style layout with Tailwind',
    channel: 'Frontend Hours',
    thumbnail:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    duration: '12:34',
    views: 42000,
    publishedAt: '2026-06-26',
    watchedAt: '2 hours ago',
  },
  {
    id: '2',
    videoId: 'tgbNymZ7vqY',
    title: 'A practical guide to CSS Grid and responsive layouts',
    channel: 'Design Den',
    thumbnail:
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
    duration: '14:05',
    views: 19000,
    publishedAt: '2026-06-26',
    watchedAt: '4 hours ago',
  },
  {
    id: '3',
    videoId: 'oHg5SJYRHA0',
    title: 'Modern React patterns for large apps',
    channel: 'Nerdy Dev',
    thumbnail:
      'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
    duration: '18:12',
    views: 170000,
    publishedAt: '2026-06-25',
    watchedAt: 'Yesterday',
  },
  {
    id: '4',
    videoId: 'J---aiyznGQ',
    title: 'Async state management with React Query',
    channel: 'Backend Breakdown',
    thumbnail:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    duration: '10:52',
    views: 68000,
    publishedAt: '2026-06-25',
    watchedAt: 'Yesterday',
  },
  {
    id: '5',
    videoId: 'M3r2XDceM6A',
    title: 'How to optimize React rendering',
    channel: 'React Radar',
    thumbnail:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    duration: '9:21',
    views: 81000,
    publishedAt: '2026-06-24',
    watchedAt: '2 days ago',
  },
]

export const Route = createFileRoute('/history')({
  component: HistoryPage,
})

function HistoryPage() {
  const [filter, setFilter] = useState('all')

  const groupedHistory = useMemo(() => {
    if (filter === 'today') {
      return [
        {
          label: 'Today',
          subtitle: 'Videos watched in the last 24 hours',
          items: [mockHistory[0], mockHistory[1]],
        },
      ]
    }

    if (filter === 'yesterday') {
      return [
        {
          label: 'Yesterday',
          subtitle: 'Videos watched yesterday',
          items: [mockHistory[2], mockHistory[3]],
        },
      ]
    }

    if (filter === 'week') {
      return [
        {
          label: 'Earlier this week',
          subtitle: 'Videos watched earlier this week',
          items: [mockHistory[4]],
        },
      ]
    }

    return [
      {
        label: 'Today',
        subtitle: 'Videos watched in the last 24 hours',
        items: [mockHistory[0], mockHistory[1]],
      },
      {
        label: 'Yesterday',
        subtitle: 'Videos watched yesterday',
        items: [mockHistory[2], mockHistory[3]],
      },
      {
        label: 'Earlier this week',
        subtitle: 'Videos watched earlier this week',
        items: [mockHistory[4]],
      },
    ]
  }, [filter])

  return (
    <main className="page-wrap px-3 py-6 sm:px-4 lg:px-6 xl:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
        <div className="min-w-0 flex-1">
          <div className="mb-4">
            <h1 className="text-2xl font-semibold tracking-tight text-white">Watch history</h1>
            <p className="mt-1 text-sm text-zinc-400">Videos you watched recently across Vidora.</p>
          </div>

          <HistoryFilterTabs value={filter} onChange={setFilter} />

          {groupedHistory.length === 0 || groupedHistory.every((group) => group.items.length === 0) ? (
            <HistoryEmpty />
          ) : (
            <div className="space-y-8">
              {groupedHistory.map((group) => (
                <HistoryDayGroup key={group.label} label={group.label} subtitle={group.subtitle} items={group.items} menuItems={historyMenuItems} />
              ))}
            </div>
          )}
        </div>

        <aside className="order-first lg:order-last lg:w-108 xl:w-120 shrink-0">
          <div className="sticky top-20 space-y-4">
            <div>
              <label className="flex items-center gap-2 rounded-md bg-zinc-900 px-3 py-2 text-sm text-zinc-400">
                <Search className="size-4 text-zinc-400" />
                <input
                  type="search"
                  placeholder="Search watch history"
                  aria-label="Search watch history"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
                />
              </label>
            </div>

            <div className="text-sm text-white">
              <div className="py-2">Clear all watch history</div>
              <div className="py-2">Pause watch history</div>
              <div className="py-2">Manage all history</div>
            </div>

            <div className="text-sm text-zinc-400">
              <div className="py-2">Comments</div>
              <div className="py-2">Posts</div>
              <div className="py-2">Live chat</div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
