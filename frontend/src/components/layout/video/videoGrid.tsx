'use client'

import { VideoCard } from './videoCard'

interface VideoGridProps {
  videos?: Array<{
    videoId: string
    title: string
    channel: string
    views: number
    publishedAt: string
    thumbnail?: string
    duration?: string
  }>
}

export function VideoGrid({ videos }: VideoGridProps) {
  // Demo videos if none provided
  const demoVideos = videos || [
    {
      videoId: 'dQw4w9WgXcQ',
      title: 'Never Gonna Give You Up',
      channel: 'Rick Astley Official',
      views: 1_400_000_000,
      publishedAt: '2009-10-25',
      duration: '3:32',
    },
    {
      videoId: 'jNQXAC9IVRw',
      title: 'Me at the zoo',
      channel: 'jawed',
      views: 300_000_000,
      publishedAt: '2005-04-23',
      duration: '0:18',
    },
    {
      videoId: '9bZkp7q19f0',
      title: 'YouTube Rewind 2019',
      channel: 'YouTube',
      views: 220_000_000,
      publishedAt: '2019-12-05',
      duration: '15:26',
    },
    {
      videoId: 'kffacxfA7g4',
      title: 'Justin Bieber - Baby',
      channel: 'Justin Bieber',
      views: 3_100_000_000,
      publishedAt: '2010-02-19',
      duration: '3:48',
    },
  ]

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 mt-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {demoVideos.map((video) => (
          <VideoCard
            key={video.videoId}
            {...video}
          />
        ))}
      </div>
    </div>
  )
}
