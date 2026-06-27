import HistoryVideoCard, {
  type HistoryVideoCardProps,
  type HistoryVideoMenuItem,
} from './history-video-card'

export interface HistoryItem extends HistoryVideoCardProps {
  id: string
}

interface HistoryDayGroupProps {
  label: string
  subtitle?: string
  items: HistoryItem[]
  menuItems?: HistoryVideoMenuItem[]
}

export function HistoryDayGroup({ label, subtitle, items, menuItems }: HistoryDayGroupProps) {
  return (
    <section className="space-y-4">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-400">
            {label}
          </p>
          {subtitle && <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>}
        </div>
        <p className="text-sm text-zinc-400">{items.length} videos</p>
      </div>



      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="px-0 py-2">
            <HistoryVideoCard {...item} menuItems={menuItems} />
          </div>
        ))}
      </div>
    </section>
  )
}
