import React from 'react';
import { Clock, Eye } from 'lucide-react';

interface Video {
  id: number;
  title: string;
  channel: string;
  views: string;
  time: string;
  duration: string;
  thumbnail: string;
}

const RECOMMENDED_VIDEOS: Video[] = [
  {
    id: 1,
    title: 'Advanced React Patterns for 2026',
    channel: 'Web Creators',
    views: '450K views',
    time: '3 weeks ago',
    duration: '12:45',
    thumbnail: 'bg-gradient-to-br from-blue-600 to-blue-800',
  },
  {
    id: 2,
    title: 'TypeScript Mastery - Complete Guide',
    channel: 'Code Masters',
    views: '890K views',
    time: '2 months ago',
    duration: '45:30',
    thumbnail: 'bg-gradient-to-br from-purple-600 to-purple-800',
  },
  {
    id: 3,
    title: 'TailwindCSS Animation Tricks',
    channel: 'Web Creators',
    views: '234K views',
    time: '1 week ago',
    duration: '8:15',
    thumbnail: 'bg-gradient-to-br from-green-600 to-green-800',
  },
  {
    id: 4,
    title: 'Building a SaaS Dashboard',
    channel: 'Dev Studio',
    views: '567K views',
    time: '2 weeks ago',
    duration: '38:20',
    thumbnail: 'bg-gradient-to-br from-orange-600 to-orange-800',
  },
  {
    id: 5,
    title: 'React 19 New Features Explained',
    channel: 'JavaScript Weekly',
    views: '1.2M views',
    time: '3 days ago',
    duration: '15:45',
    thumbnail: 'bg-gradient-to-br from-pink-600 to-pink-800',
  },
  {
    id: 6,
    title: 'Web Performance Optimization',
    channel: 'Performance Labs',
    views: '678K views',
    time: '5 days ago',
    duration: '22:10',
    thumbnail: 'bg-gradient-to-br from-yellow-600 to-yellow-800',
  },
];

export default function RecommendedVideos() {
  return (
    <div className="space-y-3">
      {RECOMMENDED_VIDEOS.map((video) => (
        <div
          key={video.id}
          className="flex gap-3 rounded-lg overflow-hidden hover:bg-zinc-800 p-2 cursor-pointer transition group"
        >
          {/* Thumbnail */}
          <div className={`w-28 lg:w-40 h-20 rounded-lg ${video.thumbnail} flex-shrink-0 relative overflow-hidden`}>
            {/* Duration Badge */}
            <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
              {video.duration}
            </div>
          </div>

          {/* Video Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-100 line-clamp-2 group-hover:text-blue-400 transition">
              {video.title}
            </h3>

            <p className="text-xs text-gray-400 mt-1">
              {video.channel}
            </p>

            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>{video.views}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{video.time}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
