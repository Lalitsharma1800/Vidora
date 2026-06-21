import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import VideoPlayer from './../components/youtube/VideoPlayer.tsx';
import VideoDetails from './../components/youtube/VideoDetails.tsx';
import CommentsSection from './../components/youtube/CommentsSection.tsx';
import RecommendedVideos from './../components/youtube/RecommendedVideos.tsx';

export const Route = createFileRoute('/watch')({
  component: Watch,
})

function Watch() {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="w-full min-h-screen bg-black">
      {/* Video Content Container */}
      <div className="flex gap-4 lg:gap-6 max-w-7xl mx-auto p-3 sm:p-4 md:p-6 pt-20">
        {/* Main Video Section */}
        <div className="flex-1 min-w-0">
          {/* Video Player */}
          <VideoPlayer />

          {/* Video Details */}
          <VideoDetails />

          {/* Comments Section */}
          <div className="mt-6 sm:mt-8">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-white">Comments</h2>
              <button
                onClick={() => setShowComments(!showComments)}
                className="lg:hidden p-2 rounded-full hover:bg-zinc-800 transition"
              >
                {showComments ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <MessageCircle className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
            {showComments && <CommentsSection />}
          </div>
        </div>

        {/* Recommended Videos Sidebar - Desktop Only */}
        <div className="hidden lg:block w-72 xl:w-80 flex-shrink-0">
          <h2 className="text-lg font-bold text-white mb-4">Recommended</h2>
          <RecommendedVideos />
        </div>
      </div>

      {/* Mobile Recommended Videos - Below on mobile/tablet */}
      <div className="lg:hidden p-3 sm:p-4 md:p-6 max-w-7xl mx-auto">
        <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Recommended</h2>
        <RecommendedVideos />
      </div>
    </div>
  );
}
