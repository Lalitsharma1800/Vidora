import { History } from 'lucide-react'

interface HistoryEmptyProps {
  title?: string
  description?: string
}

export function HistoryEmpty({
  title = 'No history yet',
  description = 'As you watch videos, they will appear here in your watch history.',
}: HistoryEmptyProps) {
  return (
    <div className="py-10 text-center text-zinc-300">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-white">
        <History className="size-6" />
      </div>
      <h2 className="mt-6 text-2xl font-semibold tracking-tight text-white">{title}</h2>
      <p className="mt-2 text-sm text-zinc-400">{description}</p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-100"
        >
          Explore videos
        </button>
        <button
          type="button"
          className="inline-flex items-center rounded-full border border-zinc-800 bg-transparent px-4 py-1.5 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:text-white"
        >
          Clear history
        </button>
      </div>
    </div>
  )
}
