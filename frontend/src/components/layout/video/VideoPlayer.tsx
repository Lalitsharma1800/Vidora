import { useState, useRef } from 'react';
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  const videoUrl = 'https://www.youtube.com/watch?v=E-F5XJ2jJ1k';

  // Play/Pause handler
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Progress bar update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const percent = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(percent);
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Duration load
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Progress bar click
  const handleProgressClick = (e: React.MouseEvent) => {
    if (videoRef.current) {
      const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = percent * videoRef.current.duration;
    }
  };

  // Format time (2:15 format)
  const formatTime = (seconds: number) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full bg-black rounded-lg overflow-hidden group">
      <div className="aspect-video bg-zinc-900 flex items-center justify-center relative">
        {/* ACTUAL VIDEO ELEMENT */}
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Play Button - Hover par dikhega */}
        <button
          onClick={handlePlayPause}
          className="absolute z-10 text-white transition-opacity opacity-0 group-hover:opacity-100"
        >
          <div className="w-20 h-20 rounded-full bg-[#00000099] bg-opacity-80 hover:bg-opacity-100 flex items-center justify-center">
            {isPlaying ? (
              <Pause className="w-10 h-10 fill-white" />
            ) : (
              <Play className="w-10 h-10 fill-white ml-1" />
            )}
          </div>
        </button>

        {/* Video Controls - Bottom par */}
        <div className='absolute -bottom-2 px-3 w-full h-16 text-white space-y-1'>
          
          {/* Progress Bar */}
          <div className="flex items-center gap-2">
            <div 
              className="flex-1 h-1 bg-zinc-700 rounded-full cursor-pointer hover:h-2 transition"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-[#f80909] rounded-full relative transition-all"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full opacity-0 hover:opacity-100 -translate-x-1" />
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Current time / Duration */}
              <span className="text-[16px] bg-[#00000099] backdrop-blur-sm p-2 rounded-4xl whitespace-nowrap">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

              {/* Previous button */}
              <button 
                className="p-2 rounded-full bg-[#00000099] transition hover:bg-[#000000cc]"
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.currentTime -= 10;
                  }
                }}
              >
                <SkipBack className="w-5 h-5 fill-white" />
              </button>

              {/* Play/Pause button */}
              <button
                onClick={handlePlayPause}
                className="p-2 rounded-full bg-[#00000099] transition hover:bg-[#000000cc]"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-white" />
                ) : (
                  <Play className="w-5 h-5 fill-white" />
                )}
              </button>

              {/* Next button */}
              <button 
                className="p-2 rounded-full bg-[#00000099] transition hover:bg-[#000000cc]"
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.currentTime += 10;
                  }
                }}
              >
                <SkipForward className="w-5 h-5 fill-white" />
              </button>

              {/* Volume button */}
              <button className="p-2 rounded-full bg-[#00000099] transition hover:bg-[#000000cc]">
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Right side - Settings & Fullscreen */}
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full bg-[#00000099] transition hover:bg-[#000000cc]">
                <Settings className="w-5 h-5" />
              </button>
              <button 
                className="p-2 rounded-full bg-[#00000099] transition hover:bg-[#000000cc]"
                onClick={() => {
                  const playerDiv = document.querySelector('.video-player-container');
                  if (playerDiv) {
                    playerDiv.requestFullscreen();
                  }
                }}
              >
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

