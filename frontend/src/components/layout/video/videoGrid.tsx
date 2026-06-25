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
      videoId: 'eHTXQW58WhA',
      title: "India's Got Latest",
      channel: 'Rick Astley Official',
      views: 945_312,
      publishedAt: '2009-10-25',
      duration: '3:32',
    },
    {
      videoId: 'D3CU_3z1U-I',
      title: 'Me at the zoo',
      channel: 'jawed',
      views: 945_312,
      publishedAt: '2005-04-23',
      duration: '0:18',
    },
    {
      videoId: 'VPz9NGNmUcw',
      title: 'YouTube Rewind 2019',
      channel: 'YouTube',
      views: 945_312,
      publishedAt: '2019-12-05',
      duration: '15:26',
    },
    {
      videoId: 'ltr53a7H8Do',
      title: 'Justin Bieber - Baby',
      channel: 'Justin Bieber',
      views: 1_945_312,
      publishedAt: '2010-02-19',
      duration: '3:48',
    },
    {
      videoId: 'OAlzBhCQKE8',
      title: 'Never Gonna Give You Up',
      channel: 'Rick Astley Official',
      views: 945_312,
      publishedAt: '2009-10-25',
      duration: '3:32',
    },
    {
      videoId: 'E-F5XJ2jJ1k',
      title: 'Me at the zoo',
      channel: 'jawed',
      views: 945_312,
      publishedAt: '2005-04-23',
      duration: '0:18',
    },
    {
      videoId: 'sxRE2LrMBH0',
      title: 'JanJaal',
      channel: 'Rick Astley Official',
      views: 945_312,
      publishedAt: '2009-10-25',
      duration: '3:32',
    },
    {
      videoId: 'D3CU_3z1U-I',
      title: 'Me at the zoo',
      channel: 'jawed',
      views: 945_312,
      publishedAt: '2005-04-23',
      duration: '0:18',
    },
    {
      videoId: 'VPz9NGNmUcw',
      title: 'YouTube Rewind 2019',
      channel: 'YouTube',
      views: 945_312,
      publishedAt: '2019-12-05',
      duration: '15:26',
    },
    {
      videoId: 'kffacxfA7g4',
      title: 'Justin Bieber - Baby',
      channel: 'Justin Bieber',
      views: 1_945_312,
      publishedAt: '2010-02-19',
      duration: '3:48',
    },
    {
      videoId: 'eHTXQW58WhA',
      title: 'Never Gonna Give You Up',
      channel: 'Rick Astley Official',
      views: 945_312,
      publishedAt: '2009-10-25',
      duration: '3:32',
    },
    {
      videoId: 'D3CU_3z1U-I',
      title: 'Me at the zoo',
      channel: 'jawed',
      views: 945_312,
      publishedAt: '2005-04-23',
      duration: '0:18',
    },
    {
      videoId: 'VPz9NGNmUcw',
      title: 'YouTube Rewind 2019',
      channel: 'YouTube',
      views: 945_312,
      publishedAt: '2019-12-05',
      duration: '15:26',
    },
    {
      videoId: 'kffacxfA7g4',
      title: 'Justin Bieber - Baby',
      channel: 'Justin Bieber',
      views: 1_945_312,
      publishedAt: '2010-02-19',
      duration: '3:48',
    },
    {
      videoId: 'eHTXQW58WhA',
      title: 'Never Gonna Give You Up',
      channel: 'Rick Astley Official',
      views: 945_312,
      publishedAt: '2009-10-25',
      duration: '3:32',
    },
    {
      videoId: 'D3CU_3z1U-I',
      title: 'Me at the zoo',
      channel: 'jawed',
      views: 945_312,
      publishedAt: '2005-04-23',
      duration: '0:18',
    },
    {
      videoId: 'VPz9NGNmUcw',
      title: 'YouTube Rewind 2019',
      channel: 'YouTube',
      views: 945_312,
      publishedAt: '2019-12-05',
      duration: '15:26',
    },
    {
      videoId: 'kffacxfA7g4',
      title: 'Justin Bieber - Baby',
      channel: 'Justin Bieber',
      views: 1_945_312,
      publishedAt: '2010-02-19',
      duration: '3:48',
    },

  ]
  console.log(demoVideos[0].thumbnail)
  return (
    <div className="w-full px-3  mt-4">
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
