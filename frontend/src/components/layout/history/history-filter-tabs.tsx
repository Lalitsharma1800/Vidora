import { ChevronRight } from 'lucide-react'

const tabs = [
  {
    id: 'all',
    label: 'All activity',
    help: 'Show history from all available days.',
  },
  {
    id: 'today',
    label: 'Today',
    help: 'Only show videos watched today.',
  },
  {
    id: 'yesterday',
    label: 'Yesterday',
    help: 'Only show videos watched yesterday.',
  },
  {
    id: 'week',
    label: 'This week',
    help: 'Show videos watched earlier this week.',
  },
]

interface HistoryFilterTabsProps {
  value: string
  onChange: (value: string) => void
}

export function HistoryFilterTabs({ value, onChange }: HistoryFilterTabsProps) {
  const activeHelp = tabs.find((tab) => tab.id === value)?.help

  return (
    <div className="w-full">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`inline-flex items-center whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition ${
              value === tab.id
                ? 'bg-white text-zinc-950'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm text-zinc-400">{activeHelp}</p>

        <button
          type="button"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white"
        >
          Manage history
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  )
}
