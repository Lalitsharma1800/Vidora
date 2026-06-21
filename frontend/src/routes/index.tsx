import { createFileRoute } from '@tanstack/react-router'

import { VideoGrid } from '#/components/layout/video'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <VideoGrid/>
  )
}
