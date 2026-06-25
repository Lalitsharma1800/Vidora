import React, { useState } from 'react';
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  MoreVertical,
  Bell,
} from 'lucide-react';

export default function VideoDetails() {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="mt-6 border-b border-zinc-700 pb-6">
      {/* Video Title */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-white">
        How to Build Amazing Responsive Websites in 2026
      </h1>

      {/* Video Stats and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>2.5M views</span>
          <span>•</span>
          <span>2 months ago</span>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 sm:gap-1">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
              liked
                ? 'bg-zinc-700 text-red-600'
                : 'bg-zinc-800 hover:bg-zinc-700 text-gray-300'
            }`}
          >
            <ThumbsUp className="w-5 h-5" />
            <span className="text-sm font-medium">125K</span>
          </button>

          <button
            onClick={() => setDisliked(!disliked)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
              disliked
                ? 'bg-zinc-700 text-gray-600'
                : 'bg-zinc-800 hover:bg-zinc-700 text-gray-300'
            }`}
          >
            <ThumbsDown className="w-5 h-5" />
          </button>

          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors text-gray-300">
            <Share2 className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:inline">Share</span>
          </button>

          <button className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors text-gray-300">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Channel Info */}
      <div className="mt-6 flex items-start justify-between gap-4">
        <div className="flex gap-4 flex-1">
          {/* Channel Avatar */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex-shrink-0 flex items-center justify-center text-white font-bold cursor-pointer">
            WC
          </div>

          {/* Channel Details */}
          <div className="flex-1">
            <h3 className="font-bold text-base md:text-lg text-white">
              Web Creators
            </h3>
            <p className="text-sm text-gray-400">
              1.2M subscribers
            </p>
            <p className="text-sm text-gray-400 mt-2 max-w-2xl">
              Welcome to Web Creators! Here we share tutorials, tips, and tricks about modern web
              development. Subscribe for weekly videos on React, TypeScript, TailwindCSS and more!
            </p>
          </div>
        </div>

        {/* Subscribe Button */}
        <button
          onClick={() => setSubscribed(!subscribed)}
          className={`px-6 py-2 rounded-full font-bold transition-colors whitespace-nowrap flex-shrink-0 ${
            subscribed
              ? 'bg-zinc-700 text-white'
              : 'bg-white text-black hover:bg-gray-200'
          }`}
        >
          {subscribed ? (
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Subscribed
            </div>
          ) : (
            'Subscribe'
          )}
        </button>
      </div>

      {/* Video Description */}
      <div className="mt-6 text-sm text-gray-300 space-y-3">
        <div className="bg-zinc-800 rounded-lg p-4">
          <p className="line-clamp-2">
            In this comprehensive tutorial, we'll build a beautiful, fully responsive YouTube-like
            video watching platform using React, TypeScript, and TailwindCSS. Perfect for developers
            who want to learn modern web development practices!
          </p>
          <button className="text-blue-400 mt-2 font-medium text-sm hover:text-blue-300">
            Show more
          </button>
        </div>

        {/* Video Tags */}
        <div className="flex flex-wrap gap-2">
          <span className="bg-zinc-800 px-3 py-1 rounded-full text-xs hover:bg-zinc-700 cursor-pointer transition">
            #WebDevelopment
          </span>
          <span className="bg-zinc-800 px-3 py-1 rounded-full text-xs hover:bg-zinc-700 cursor-pointer transition">
            #React
          </span>
          <span className="bg-zinc-800 px-3 py-1 rounded-full text-xs hover:bg-zinc-700 cursor-pointer transition">
            #TailwindCSS
          </span>
          <span className="bg-zinc-800 px-3 py-1 rounded-full text-xs hover:bg-zinc-700 cursor-pointer transition">
            #TypeScript
          </span>
        </div>
      </div>
    </div>
  );
}
