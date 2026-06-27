import { Bell, ChevronDown, CheckCircle2 } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '#/components/ui/avatar'
import { Button } from '#/components/ui/button'

export type SubscriptionChannel = {
  id: string
  name: string
  handle: string
  avatar: string
  subscribers: number
  description: string
  verified: boolean
  isSubscribed: boolean
}

function formatSubscribers(count: number) {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, '')}M subscribers`
  }

  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1).replace(/\.0$/, '')}K subscribers`
  }

  return `${count.toLocaleString()} subscribers`
}

export function SubscriptionCard({
  name,
  handle,
  avatar,
  subscribers,
  description,
  verified,
  isSubscribed,
}: SubscriptionChannel) {
  return (
    <article className="flex items-center gap-4 border-b border-zinc-800 py-4 last:border-b-0">
      <Avatar className="flex-shrink-0 h-24 w-24 cursor-pointer overflow-hidden rounded-full">
        <AvatarImage
          src={avatar}
          alt={`${name} avatar`}
          className="h-full w-full object-cover object-center"
        />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="truncate text-base font-semibold text-white sm:text-lg cursor-pointer">{name}</h2>
          {verified ? (
            <span className="inline-flex cursor-pointer items-center gap-1 text-[11px] font-medium uppercase tracking-[0.18em] text-sky-400">
              <CheckCircle2 className="size-3 text-sky-400" />
              Verified
            </span>
          ) : null}
        </div>

        <p className="mt-1 text-sm text-zinc-400">
          <span className="text-zinc-300 cursor-pointer">{handle}</span>
          <span className="mx-2 text-zinc-600">•</span>
          <span className="cursor-pointer">{formatSubscribers(subscribers)}</span>
        </p>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-300 cursor-pointer">{description}</p>
      </div>

      <div className="ml-auto flex items-center">
        <Button
          variant="outline"
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-100 shadow-none hover:bg-zinc-800"
          size="sm"
        >
          <Bell className="size-4 cursor-pointer" />
          Subscribed
          <ChevronDown className="size-4 cursor-pointer" />
        </Button>
      </div>
    </article>
  )
}
