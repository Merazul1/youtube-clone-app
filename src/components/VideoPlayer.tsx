import React, { useRef, useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Volume1,
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw,
  PictureInPicture,
  Settings,
  Check
} from 'lucide-react';
import type { Video } from '../types';

interface VideoPlayerProps {
  video: Video;
  onEnded?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onEnded }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [controlsTimeout, setControlsTimeout] = useState<number | null>(null);

  // Play / Pause toggle
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  // Autoplay on video change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.playbackRate = playbackSpeed;
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay may be blocked if unmuted; start muted
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play();
          setIsPlaying(true);
        }
      });
    }
  }, [video]);

  // Handle time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Handle metadata loaded
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Handle seek bar change
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = Number(e.target.value);
    setCurrentTime(targetTime);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
    }
  };

  // Skip time (+10s or -10s)
  const skipTime = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        Math.max(videoRef.current.currentTime + seconds, 0),
        duration
      );
    }
  };

  // Volume control
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      videoRef.current.muted = newVol === 0;
      setIsMuted(newVol === 0);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current.volume = volume || 0.5;
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  // Playback speed
  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSettings(false);
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  // Picture in picture
  const togglePiP = async () => {
    if (!videoRef.current) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (err) {
      console.warn('PiP not supported or disallowed', err);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.code === 'Space' || e.key === 'k') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'f') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'm') {
        e.preventDefault();
        toggleMute();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        skipTime(5);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        skipTime(-5);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isMuted, duration, volume]);

  // Hide controls on inactivity
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout) clearTimeout(controlsTimeout);
    if (isPlaying) {
      const timeout = window.setTimeout(() => {
        setShowControls(false);
        setShowSettings(false);
      }, 2800);
      setControlsTimeout(timeout);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return '0:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={playerContainerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden group shadow-2xl select-none"
    >
      {/* HTML5 Video Element */}
      <video
        ref={videoRef}
        src={video.videoUrl}
        poster={video.thumbnailUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false);
          if (onEnded) onEnded();
        }}
        onClick={togglePlay}
        className="w-full h-full object-contain cursor-pointer"
        playsInline
      />

      {/* Floating Center Play/Pause indicator on click/pause */}
      {!isPlaying && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/25 backdrop-blur-[2px] transition-all"
        >
          <div className="w-18 h-18 sm:w-20 sm:h-20 bg-red-600/90 hover:bg-red-600 rounded-full flex items-center justify-center text-white shadow-2xl transition-transform hover:scale-110">
            <Play className="w-9 h-9 fill-current ml-1" />
          </div>
        </div>
      )}

      {/* Controls Overlay */}
      <div
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent pt-12 pb-2 px-4 transition-opacity duration-300 ${
          showControls || !isPlaying ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Scrubber Progress Bar */}
        <div className="relative flex items-center mb-2 group/scrub cursor-pointer">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#FF0000] focus:outline-none transition-all group-hover/scrub:h-2"
            style={{
              background: `linear-gradient(to right, #FF0000 ${progressPercent}%, rgba(255,255,255,0.3) ${progressPercent}%)`
            }}
          />
        </div>

        {/* Controls Toolbar */}
        <div className="flex items-center justify-between text-white text-sm">
          {/* Left Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={togglePlay}
              className="p-1 hover:text-red-500 transition-colors focus:outline-none"
              title={isPlaying ? 'Pause (k)' : 'Play (k)'}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
            </button>

            <button
              onClick={() => skipTime(-10)}
              className="p-1 hover:text-red-500 transition-colors focus:outline-none hidden sm:block"
              title="Rewind 10 seconds"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => skipTime(10)}
              className="p-1 hover:text-red-500 transition-colors focus:outline-none hidden sm:block"
              title="Fast forward 10 seconds"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            {/* Volume & Mute */}
            <div className="flex items-center gap-2 group/volume">
              <button
                onClick={toggleMute}
                className="p-1 hover:text-red-500 transition-colors focus:outline-none"
                title={isMuted ? 'Unmute (m)' : 'Mute (m)'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-5 h-5" />
                ) : volume < 0.5 ? (
                  <Volume1 className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-0 group-hover/volume:w-18 transition-all duration-200 h-1 bg-white/40 accent-white rounded-lg cursor-pointer focus:outline-none"
              />
            </div>

            {/* Time Stamp */}
            <div className="text-xs text-gray-300 font-mono tracking-tight ml-1">
              <span>{formatTime(currentTime)}</span>
              <span className="mx-1 text-gray-500">/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3 sm:gap-4 relative">
            {/* Speed / Settings */}
            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-1 hover:text-red-500 transition-colors focus:outline-none"
                title="Playback Settings"
              >
                <Settings className={`w-5 h-5 ${showSettings ? 'rotate-45' : ''} transition-transform`} />
              </button>

              {showSettings && (
                <div className="absolute right-0 bottom-9 w-44 bg-black/90 backdrop-blur-md rounded-xl p-2 shadow-2xl border border-white/10 z-50 text-xs">
                  <div className="font-semibold text-gray-400 px-2 py-1 uppercase text-[10px] tracking-wider border-b border-white/10 mb-1">
                    Playback Speed
                  </div>
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => handleSpeedChange(speed)}
                      className="flex items-center justify-between w-full px-2 py-1.5 hover:bg-white/20 rounded-md transition-colors"
                    >
                      <span>{speed === 1 ? 'Normal' : `${speed}x`}</span>
                      {playbackSpeed === speed && <Check className="w-3.5 h-3.5 text-red-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* PiP */}
            <button
              onClick={togglePiP}
              className="p-1 hover:text-red-500 transition-colors focus:outline-none hidden sm:block"
              title="Miniplayer (PiP)"
            >
              <PictureInPicture className="w-5 h-5" />
            </button>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="p-1 hover:text-red-500 transition-colors focus:outline-none"
              title={isFullscreen ? 'Exit Full Screen (f)' : 'Full Screen (f)'}
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
