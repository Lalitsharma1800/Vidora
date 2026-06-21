import { useState } from 'react';
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
             {/* pause resume button */}
          <div className="w-20 h-20 rounded-full bg-[#00000099] bg-opacity-80 hover:bg-opacity-100 flex items-center justify-center">
            {isPlaying ? (
              <Pause className="w-10 h-10 fill-white" />
            ) : (
              <Play className="w-10 h-10 fill-white ml-1" />
            )}
          </div>
        </button>
        {/* Video Controls */}
        {/* px-4 pb-3 */}
        <div className='absolute -bottom-2 px-3  w-full h-16 text-white space-y-1'>
            
            {/* Video Controls */}
            <div className="flex items-center gap-2">
                    {/* duration */}
                    {/* red line */}
                <div className="flex-1 h-1 bg-zinc-700 rounded-full cursor-pointer">
                    <div
                        className="h-full bg-red-600 rounded-full relative"
                        style={{ width: `${progress}%` }}
                    >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full opacity-0 hover:opacity-100 -translate-x-1" /></div>
                    </div>
                {/* duration */}
                {/* <span className="text-xs font-medium">6:30</span> */}
            </div>
                        {/* Control Buttons */}
            <div className="flex items-center justify-between">
                        {/* duration, pause, play, next and previous buttons */}
                <div className="flex items-center gap-3">
                    <span className="text-[16px] bg-[#00000099] backdrop-blur-sm p-2 rounded-2xl">2:15 / 6:30</span>
                    <button className="p-2 rounded-full bg-[#00000099] transition">
                        <SkipBack className="w-5 h-5 fill-white" />
                    </button>
                    <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 rounded-full bg-[#00000099] transition"
                    >
                        {isPlaying ? (
                            <Pause className="w-5 h-5 fill-white bg-[#00000099]" />
                        ) : (
                            <Play className="w-5 h-5 fill-white bg-[#00000099]" />
                        )}
                    </button>
                    <button className="p-2 rounded-full bg-[#00000099] transition">
                        <SkipForward className="w-5 h-5 fill-white bg-[#00000099]" />
                    </button>

                    <button className="p-2 rounded-full bg-[#00000099] transition">
                        <Volume2 className="w-5 h-5" />
                    </button>
                </div>
                        {/* setting, full screen, and volume */}
                <div className="flex items-center gap-2">
                    <button className="p-2 rounded-full bg-[#00000099] transition text-sm">
                        <Settings className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-full bg-[#00000099] transition">
                        <Maximize className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

  