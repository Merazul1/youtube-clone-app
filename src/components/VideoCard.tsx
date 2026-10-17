import React, { useState } from 'react';
import {
  CheckCircle2,
  MoreVertical,
  Clock,
  Share2,
  BookmarkCheck
} from 'lucide-react';
import type { Video } from '../types';
import { useYouTube } from '../context/YouTubeContext';

interface VideoCardProps {
  video: Video;
  layout?: 'grid' | 'horizontal';
  onShare?: (video: Video) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, layout = 'grid', onShare }) => {
  const { selectVideo, savedVideoIds, toggleWatchLater } = useYouTube();
  const [showMenu, setShowMenu] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isSaved = savedVideoIds.includes(video.id);

  const handleCardClick = () => {
    selectVideo(video);
  };

  const handleWatchLaterClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWatchLater(video.id);
    setShowMenu(false);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onShare) onShare(video);
    setShowMenu(false);
  };

  if (layout === 'horizontal') {
    return (
      <div
        onClick={handleCardClick}
        className="flex gap-3 group cursor-pointer relative rounded-xl p-1.5 hover:bg-gray-100 dark:hover:bg-[#272727]/60 transition-colors"
      >
        {/* Thumbnail */}
        <div className="relative w-40 h-24 sm:w-44 sm:h-26 rounded-lg overflow-hidden shrink-0 bg-gray-800">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
            {video.duration}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 pr-6">
          <h4 className="text-xs sm:text-sm font-semibold line-clamp-2 text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
            {video.title}
          </h4>
          <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1 hover:text-gray-900 dark:hover:text-white">
            {video.channelName}
            {video.isVerified && <CheckCircle2 className="w-3 h-3 text-gray-400 fill-current" />}
          </p>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
            {video.views} • {video.timestamp}
          </p>
        </div>

        {/* 3-dots Menu Button */}
        <div className="absolute top-2 right-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            aria-label="Action menu"
            className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-[#383838] transition-opacity"
          >
            <MoreVertical className="w-4 h-4 text-gray-500 dark:text-gray-300" />
          </button>

          {showMenu && (
            <div
              className="absolute right-0 mt-1 w-48 bg-white dark:bg-[#212121] rounded-xl shadow-xl border border-gray-200 dark:border-[#383838] py-1.5 z-30"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleWatchLaterClick}
                className="flex items-center gap-2.5 w-full px-3 py-2 text-xs hover:bg-gray-100 dark:hover:bg-[#333333] text-gray-800 dark:text-gray-200 text-left"
              >
                {isSaved ? <BookmarkCheck className="w-4 h-4 text-blue-500" /> : <Clock className="w-4 h-4" />}
                <span>{isSaved ? 'Remove from Watch later' : 'Save to Watch later'}</span>
              </button>
              <button
                onClick={handleShareClick}
                className="flex items-center gap-2.5 w-full px-3 py-2 text-xs hover:bg-gray-100 dark:hover:bg-[#333333] text-gray-800 dark:text-gray-200 text-left"
              >
                <Share2 className="w-4 h-4" />
                <span>Share video</span>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowMenu(false);
      }}
      className="flex flex-col group cursor-pointer relative"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-gray-900 shadow-sm group-hover:shadow-md transition-all duration-300">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black/85 text-white text-xs font-semibold px-2 py-0.5 rounded-md backdrop-blur-sm">
          {video.duration}
        </div>

        {/* Quick action overlay buttons on hover */}
        {isHovered && (
          <div className="absolute top-2 right-2 flex flex-col gap-1.5 animate-in fade-in duration-150">
            <button
              onClick={handleWatchLaterClick}
              title={isSaved ? 'Remove from Watch Later' : 'Watch Later'}
              className="p-1.5 rounded-md bg-black/70 hover:bg-black text-white backdrop-blur-sm transition-colors shadow-md"
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4 text-blue-400" /> : <Clock className="w-4 h-4" />}
            </button>
            <button
              onClick={handleShareClick}
              title="Share"
              className="p-1.5 rounded-md bg-black/70 hover:bg-black text-white backdrop-blur-sm transition-colors shadow-md"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Meta Content */}
      <div className="flex gap-3 mt-3 items-start px-0.5">
        {/* Channel Avatar */}
        <img
          src={video.channelAvatar}
          alt={video.channelName}
          className="w-9 h-9 rounded-full object-cover shrink-0 mt-0.5 border border-transparent hover:opacity-80 transition-opacity"
        />

        {/* Title, Channel & Stats */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 leading-snug group-hover:text-blue-500 transition-colors">
            {video.title}
          </h3>

          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-1 hover:text-gray-900 dark:hover:text-white transition-colors">
            <span>{video.channelName}</span>
            {video.isVerified && (
              <CheckCircle2 className="w-3.5 h-3.5 text-gray-500 fill-current" />
            )}
          </p>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {video.views} • {video.timestamp}
          </p>
        </div>

        {/* Context Menu Button */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            aria-label="More options"
            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-[#272727] text-gray-600 dark:text-gray-300 transition-opacity"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {showMenu && (
            <div
              className="absolute right-0 mt-1 w-48 bg-white dark:bg-[#212121] rounded-2xl shadow-2xl border border-gray-200 dark:border-[#383838] py-2 z-40"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleWatchLaterClick}
                className="flex items-center gap-3 w-full px-4 py-2 text-xs hover:bg-gray-100 dark:hover:bg-[#333333] text-gray-800 dark:text-gray-200 text-left"
              >
                {isSaved ? <BookmarkCheck className="w-4 h-4 text-blue-500" /> : <Clock className="w-4 h-4" />}
                <span>{isSaved ? 'Remove from Watch Later' : 'Save to Watch Later'}</span>
              </button>
              <button
                onClick={handleShareClick}
                className="flex items-center gap-3 w-full px-4 py-2 text-xs hover:bg-gray-100 dark:hover:bg-[#333333] text-gray-800 dark:text-gray-200 text-left"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
