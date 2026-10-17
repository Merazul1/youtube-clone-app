import React, { useState, useRef, useEffect } from 'react';
import {
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Share2,
  ChevronUp,
  ChevronDown,
  Volume2,
  VolumeX,
  Play,
  Disc3
} from 'lucide-react';
import { mockShorts } from '../data/mockVideos';
import { useYouTube } from '../context/YouTubeContext';
import type { Video } from '../types';

interface ShortsViewProps {
  onShare: (video: Video) => void;
}

export const ShortsView: React.FC<ShortsViewProps> = ({ onShare }) => {
  const {
    likedVideoIds,
    toggleLikeVideo,
    dislikedVideoIds,
    toggleDislikeVideo,
    subscribedChannelIds,
    toggleSubscribe,
  } = useYouTube();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showCommentsDrawer, setShowCommentsDrawer] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentShort = mockShorts[currentIndex];
  const isLiked = likedVideoIds.includes(currentShort.id);
  const isDisliked = dislikedVideoIds.includes(currentShort.id);
  const isSubscribed = subscribedChannelIds.includes(currentShort.channelId);

  const nextShort = () => {
    if (currentIndex < mockShorts.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0); // loop
    }
  };

  const prevShort = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Keyboard navigation (ArrowUp / ArrowDown)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        nextShort();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        prevShort();
      } else if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isPlaying]);

  // Restart video when index changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play();
          setIsPlaying(true);
        }
      });
    }
  }, [currentIndex]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)] py-6 px-4 relative select-none">
      {/* Up / Down Navigation Buttons on Desktop */}
      <div className="hidden md:flex flex-col gap-4 mr-6">
        <button
          onClick={prevShort}
          disabled={currentIndex === 0}
          className={`p-3 rounded-full bg-gray-200 dark:bg-[#272727] hover:bg-gray-300 dark:hover:bg-[#383838] transition-all ${
            currentIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:scale-105'
          }`}
          title="Previous Short"
        >
          <ChevronUp className="w-6 h-6 text-gray-900 dark:text-white" />
        </button>

        <button
          onClick={nextShort}
          className="p-3 rounded-full bg-gray-200 dark:bg-[#272727] hover:bg-gray-300 dark:hover:bg-[#383838] transition-all hover:scale-105"
          title="Next Short"
        >
          <ChevronDown className="w-6 h-6 text-gray-900 dark:text-white" />
        </button>
      </div>

      {/* Main Short Video Card Container */}
      <div className="flex items-end gap-4">
        <div
          onClick={togglePlay}
          className="relative w-[340px] sm:w-[380px] h-[640px] sm:h-[700px] bg-black rounded-3xl overflow-hidden shadow-2xl cursor-pointer group"
        >
          {/* Vertical Video Element */}
          <video
            ref={videoRef}
            src={currentShort.videoUrl}
            poster={currentShort.thumbnailUrl}
            loop
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Pause overlay icon */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
              <div className="w-16 h-16 bg-black/60 rounded-full flex items-center justify-center text-white backdrop-blur-sm">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
            </div>
          )}

          {/* Top Controls: Sound toggle */}
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={toggleMute}
              className="p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-colors"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>

          {/* Bottom Info Overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 text-white pointer-events-none">
            {/* Channel info & subscribe */}
            <div className="flex items-center gap-3 mb-2 pointer-events-auto">
              <img
                src={currentShort.channelAvatar}
                alt={currentShort.channelName}
                className="w-9 h-9 rounded-full object-cover border border-white/30"
              />
              <span className="font-semibold text-sm drop-shadow">
                {currentShort.channelName}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSubscribe(currentShort.channelId);
                }}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                  isSubscribed
                    ? 'bg-white/20 text-white hover:bg-white/30'
                    : 'bg-red-600 hover:bg-red-700 text-white shadow-md'
                }`}
              >
                {isSubscribed ? 'Subscribed' : 'Subscribe'}
              </button>
            </div>

            {/* Video Title */}
            <p className="text-sm font-medium drop-shadow line-clamp-2 mb-2">
              {currentShort.title}
            </p>

            {/* Audio Ticker */}
            <div className="flex items-center gap-2 text-xs text-gray-200">
              <Disc3 className="w-4 h-4 animate-spin text-red-500" />
              <span className="truncate">Original Audio • {currentShort.channelName}</span>
            </div>
          </div>
        </div>

        {/* Right Floating Action Column */}
        <div className="flex flex-col gap-4 items-center mb-6">
          {/* Like */}
          <button
            onClick={() => toggleLikeVideo(currentShort.id)}
            className="flex flex-col items-center group focus:outline-none"
          >
            <div
              className={`p-3 rounded-full transition-transform active:scale-90 ${
                isLiked
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 dark:bg-[#272727] text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-[#383838]'
              }`}
            >
              <ThumbsUp className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
            </div>
            <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 mt-1">
              {isLiked ? '341K' : currentShort.likes}
            </span>
          </button>

          {/* Dislike */}
          <button
            onClick={() => toggleDislikeVideo(currentShort.id)}
            className="flex flex-col items-center group focus:outline-none"
          >
            <div
              className={`p-3 rounded-full transition-transform active:scale-90 ${
                isDisliked
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 dark:bg-[#272727] text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-[#383838]'
              }`}
            >
              <ThumbsDown className={`w-6 h-6 ${isDisliked ? 'fill-current' : ''}`} />
            </div>
            <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 mt-1">
              Dislike
            </span>
          </button>

          {/* Comments */}
          <button
            onClick={() => setShowCommentsDrawer(!showCommentsDrawer)}
            className="flex flex-col items-center group focus:outline-none"
          >
            <div className="p-3 rounded-full bg-gray-100 dark:bg-[#272727] text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-[#383838] transition-transform active:scale-90">
              <MessageSquare className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 mt-1">
              {currentShort.commentsCount}
            </span>
          </button>

          {/* Share */}
          <button
            onClick={() => onShare(currentShort)}
            className="flex flex-col items-center group focus:outline-none"
          >
            <div className="p-3 rounded-full bg-gray-100 dark:bg-[#272727] text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-[#383838] transition-transform active:scale-90">
              <Share2 className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 mt-1">
              Share
            </span>
          </button>

          {/* Sound Cover */}
          <div className="w-10 h-10 rounded-lg overflow-hidden border-2 border-gray-600 animate-pulse mt-2 shadow-lg">
            <img
              src={currentShort.thumbnailUrl}
              alt="cover"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
