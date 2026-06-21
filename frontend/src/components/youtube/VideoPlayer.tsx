import React, { useState } from 'react';
import {
  Play,
  Volume2,
  Maximize,
  Settings,
  SkipBack,
  SkipForward,
  Pause,
} from 'lucide-react';

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);

  return (
    <div className="w-full bg-black rounded-lg overflow-hidden group">
      <div className="aspect-video bg-zinc-900 flex items-center justify-center relative">
        {/* Video Background */}
        <div className="absolute inset-0 bg-blue-800 from-zinc-800 to-black" />

        {/* Play Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute z-10 text-white transition-opacity opacity-0 group-hover:opacity-100"
        >
          <div className="w-20 h-20 rounded-full bg-black bg-opacity-80 hover:bg-opacity-100 flex items-center justify-center">
            {isPlaying ? (
              <Pause className="w-10 h-10 fill-white" />
            ) : (
              <Play className="w-10 h-10 fill-white ml-1" />
            )}
          </div>
        </button>

        {/* Video Timeline - Hover Preview */}
        {/* <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600 group-hover:h-2 cursor-pointer transition-all">
          <div
            className="h-full bg-red-800 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div> */}
      </div>

      {/* Video Controls */}
      <div className="bg-zinc-800 px-4 py-3 text-white space-y-3">
        {/* Progress bar with time */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium">2:15</span>
          <div className="flex-1 h-1 bg-zinc-700 rounded-full cursor-pointer">
            <div
              className="h-full bg-red-600 rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full opacity-0 hover:opacity-100 -translate-x-1" />
            </div>
          </div>
          <span className="text-xs font-medium">6:30</span>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full hover:bg-zinc-700 transition">
              <SkipBack className="w-5 h-5 fill-white" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full hover:bg-zinc-700 transition"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-white" />
              ) : (
                <Play className="w-5 h-5 fill-white" />
              )}
            </button>
            <button className="p-2 rounded-full hover:bg-zinc-700 transition">
              <SkipForward className="w-5 h-5 fill-white" />
            </button>

            <button className="p-2 rounded-full hover:bg-zinc-700 transition">
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-zinc-700 transition text-sm">
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-zinc-700 transition">
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
