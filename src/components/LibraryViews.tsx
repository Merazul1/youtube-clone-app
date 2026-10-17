import React from 'react';
import {
  History,
  ThumbsUp,
  Clock,
  Trash2,
  Play
} from 'lucide-react';
import { useYouTube } from '../context/YouTubeContext';
import { VideoCard } from './VideoCard';
import { mockChannels } from '../data/mockVideos';
import type { Video } from '../types';

interface ViewProps {
  onShare: (video: Video) => void;
}

export const HistoryView: React.FC<ViewProps> = ({ onShare }) => {
  const { watchHistory, clearHistory } = useYouTube();

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-[#272727] mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-600">
            <History className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Watch History</h1>
            <p className="text-xs text-gray-500">{watchHistory.length} videos watched</p>
          </div>
        </div>

        {watchHistory.length > 0 && (
          <button
            onClick={clearHistory}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 text-xs font-semibold border border-red-200 dark:border-red-900/40 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear all watch history</span>
          </button>
        )}
      </div>

      {watchHistory.length === 0 ? (
        <div className="text-center py-20">
          <History className="w-16 h-16 text-gray-400 mx-auto mb-3 opacity-60" />
          <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300">
            No watch history yet
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Videos you watch will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {watchHistory.map((video) => (
            <VideoCard key={video.id} video={video} onShare={onShare} />
          ))}
        </div>
      )}
    </div>
  );
};

export const LikedVideosView: React.FC<ViewProps> = ({ onShare }) => {
  const { videos, likedVideoIds, selectVideo } = useYouTube();

  const likedVideos = videos.filter((v) => likedVideoIds.includes(v.id));

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-[#272727] mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600">
            <ThumbsUp className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Liked Videos</h1>
            <p className="text-xs text-gray-500">{likedVideos.length} videos</p>
          </div>
        </div>

        {likedVideos.length > 0 && (
          <button
            onClick={() => selectVideo(likedVideos[0])}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-xs shadow-sm hover:opacity-90 self-start"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Play all</span>
          </button>
        )}
      </div>

      {likedVideos.length === 0 ? (
        <div className="text-center py-20">
          <ThumbsUp className="w-16 h-16 text-gray-400 mx-auto mb-3 opacity-60" />
          <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300">
            No liked videos yet
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Give a thumbs up to videos you love to save them here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {likedVideos.map((video) => (
            <VideoCard key={video.id} video={video} onShare={onShare} />
          ))}
        </div>
      )}
    </div>
  );
};

export const WatchLaterView: React.FC<ViewProps> = ({ onShare }) => {
  const { videos, savedVideoIds, selectVideo } = useYouTube();

  const savedVideos = videos.filter((v) => savedVideoIds.includes(v.id));

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-[#272727] mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Watch Later</h1>
            <p className="text-xs text-gray-500">{savedVideos.length} videos saved</p>
          </div>
        </div>

        {savedVideos.length > 0 && (
          <button
            onClick={() => selectVideo(savedVideos[0])}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-xs shadow-sm hover:opacity-90 self-start"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Play all</span>
          </button>
        )}
      </div>

      {savedVideos.length === 0 ? (
        <div className="text-center py-20">
          <Clock className="w-16 h-16 text-gray-400 mx-auto mb-3 opacity-60" />
          <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300">
            Your Watch Later playlist is empty
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Click the clock icon or 'Save' on any video to watch it later.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {savedVideos.map((video) => (
            <VideoCard key={video.id} video={video} onShare={onShare} />
          ))}
        </div>
      )}
    </div>
  );
};

export const SubscriptionsView: React.FC<ViewProps> = ({ onShare }) => {
  const { videos, subscribedChannelIds, toggleSubscribe } = useYouTube();

  const subbedVideos = videos.filter((v) => subscribedChannelIds.includes(v.channelId));

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Channels row */}
      <div className="mb-8">
        <h2 className="text-base font-bold text-gray-900 dark:text-white mb-3">
          Your Subscribed Channels
        </h2>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {mockChannels.map((channel) => {
            const isSubbed = subscribedChannelIds.includes(channel.id);
            return (
              <div
                key={channel.id}
                className="flex flex-col items-center min-w-[100px] p-2 rounded-2xl hover:bg-gray-100 dark:hover:bg-[#272727] transition-colors"
              >
                <div className="relative">
                  <img
                    src={channel.avatar}
                    alt={channel.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-red-500 p-0.5"
                  />
                  {isSubbed && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-blue-500 ring-2 ring-white dark:ring-black" />
                  )}
                </div>
                <span className="text-xs font-semibold text-gray-900 dark:text-white truncate max-w-[90px] mt-2">
                  {channel.name}
                </span>
                <button
                  onClick={() => toggleSubscribe(channel.id)}
                  className={`mt-2 px-2.5 py-1 rounded-full text-[10px] font-semibold transition-colors ${
                    isSubbed
                      ? 'bg-gray-200 dark:bg-[#333333] text-gray-700 dark:text-gray-300'
                      : 'bg-red-600 text-white'
                  }`}
                >
                  {isSubbed ? 'Subscribed' : 'Subscribe'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Latest uploads from subscriptions */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Latest Uploads
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {subbedVideos.map((video) => (
            <VideoCard key={video.id} video={video} onShare={onShare} />
          ))}
        </div>
      </div>
    </div>
  );
};
