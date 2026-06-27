export function SubscriptionSkeleton() {
  return (
    <article className="flex items-center gap-4 border-b border-zinc-800 py-4 last:border-b-0 animate-pulse">
      <div className="h-24 w-24 rounded-full bg-zinc-800" />

      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-4 w-1/2 rounded-full bg-zinc-800" />
        <div className="h-3 w-1/3 rounded-full bg-zinc-800" />
        <div className="h-3 w-3/4 rounded-full bg-zinc-800" />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="h-10 w-28 rounded-full bg-zinc-800" />
      </div>
    </article>
  )
}
