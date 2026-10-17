import React, { useState } from 'react';
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  Download,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Bell,
  Check,
  ArrowDownWideNarrow
} from 'lucide-react';
import type { Video } from '../types';
import { useYouTube } from '../context/YouTubeContext';
import { VideoPlayer } from './VideoPlayer';
import { VideoCard } from './VideoCard';

interface WatchPageProps {
  video: Video;
  onShare: (video: Video) => void;
}

export const WatchPage: React.FC<WatchPageProps> = ({ video, onShare }) => {
  const {
    videos,
    likedVideoIds,
    toggleLikeVideo,
    dislikedVideoIds,
    toggleDislikeVideo,
    savedVideoIds,
    toggleWatchLater,
    subscribedChannelIds,
    toggleSubscribe,
    comments,
    addComment,
    toggleLikeComment,
    selectVideo
  } = useYouTube();

  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [downloadToast, setDownloadToast] = useState(false);
  const [recommendFilter, setRecommendFilter] = useState('All');

  const isLiked = likedVideoIds.includes(video.id);
  const isDisliked = dislikedVideoIds.includes(video.id);
  const isSaved = savedVideoIds.includes(video.id);
  const isSubscribed = subscribedChannelIds.includes(video.channelId);

  const videoComments = comments[video.id] || [];

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addComment(video.id, commentInput);
    setCommentInput('');
    setIsInputFocused(false);
  };

  const handleDownload = () => {
    setDownloadToast(true);
    setTimeout(() => setDownloadToast(false), 2500);
  };

  // Up Next / Recommended videos (excluding current)
  const relatedVideos = videos
    .filter((v) => v.id !== video.id)
    .filter((v) => {
      if (recommendFilter === 'All') return true;
      if (recommendFilter === 'Related') return v.category === video.category;
      if (recommendFilter === 'Channel') return v.channelId === video.channelId;
      return true;
    });

  const handleVideoEnded = () => {
    // Autoplay next video
    if (relatedVideos.length > 0) {
      selectVideo(relatedVideos[0]);
    }
  };

  return (
    <div className="max-w-[1720px] mx-auto px-4 py-4 flex flex-col lg:flex-row gap-6">
      {/* Toast Notification */}
      {downloadToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-black/90 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-white/10 animate-in slide-in-from-bottom-4">
          <Check className="w-5 h-5 text-green-400" />
          <span className="text-sm font-medium">Download started in 1080p Full HD</span>
        </div>
      )}

      {/* Main Watch Column (Player, Details, Comments) */}
      <div className="flex-1 min-w-0">
        {/* Custom Video Player */}
        <VideoPlayer video={video} onEnded={handleVideoEnded} />

        {/* Video Title */}
        <h1 className="text-lg sm:text-xl font-bold mt-4 text-gray-900 dark:text-white leading-tight">
          {video.title}
        </h1>

        {/* Channel & Video Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-3 pb-3 border-b border-gray-200 dark:border-[#272727]">
          {/* Channel Info & Subscribe Button */}
          <div className="flex items-center gap-3">
            <img
              src={video.channelAvatar}
              alt={video.channelName}
              className="w-10 h-10 rounded-full object-cover shrink-0 cursor-pointer hover:opacity-90"
            />
            <div className="cursor-pointer">
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white flex items-center gap-1 hover:underline">
                {video.channelName}
                {video.isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-gray-500 fill-current" />}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {video.subscribers} subscribers
              </p>
            </div>

            {/* Subscribe / Subscribed Button */}
            <button
              onClick={() => toggleSubscribe(video.channelId)}
              className={`ml-3 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1.5 transition-all ${
                isSubscribed
                  ? 'bg-gray-100 hover:bg-gray-200 dark:bg-[#272727] dark:hover:bg-[#333333] text-gray-800 dark:text-gray-200'
                  : 'bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black shadow-sm'
              }`}
            >
              {isSubscribed ? (
                <>
                  <Bell className="w-4 h-4 text-gray-400" />
                  <span>Subscribed</span>
                </>
              ) : (
                <span>Subscribe</span>
              )}
            </button>
          </div>

          {/* Action Buttons (Like/Dislike, Share, Download, Save) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {/* Like / Dislike pill */}
            <div className="flex items-center bg-gray-100 dark:bg-[#272727] rounded-full overflow-hidden text-sm font-medium">
              <button
                onClick={() => toggleLikeVideo(video.id)}
                className={`flex items-center gap-2 px-3.5 py-2 hover:bg-gray-200 dark:hover:bg-[#383838] transition-colors ${
                  isLiked ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-gray-800 dark:text-gray-200'
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                <span>{isLiked ? (video.likesCount ? (video.likesCount + 1).toLocaleString() : 'Liked') : video.likes}</span>
              </button>

              <div className="w-[1px] h-6 bg-gray-300 dark:bg-[#3f3f3f]" />

              <button
                onClick={() => toggleDislikeVideo(video.id)}
                className={`px-3.5 py-2 hover:bg-gray-200 dark:hover:bg-[#383838] transition-colors ${
                  isDisliked ? 'text-blue-600 dark:text-blue-400' : 'text-gray-800 dark:text-gray-200'
                }`}
                title="I dislike this"
              >
                <ThumbsDown className={`w-4 h-4 ${isDisliked ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Share Button */}
            <button
              onClick={() => onShare(video)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-[#272727] dark:hover:bg-[#383838] text-sm font-medium text-gray-800 dark:text-gray-200 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-[#272727] dark:hover:bg-[#383838] text-sm font-medium text-gray-800 dark:text-gray-200 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>

            {/* Save / Watch Later Button */}
            <button
              onClick={() => toggleWatchLater(video.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full transition-colors text-sm font-medium ${
                isSaved
                  ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'
                  : 'bg-gray-100 hover:bg-gray-200 dark:bg-[#272727] dark:hover:bg-[#383838] text-gray-800 dark:text-gray-200'
              }`}
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        {/* Video Description Card */}
        <div className="mt-4 p-3.5 bg-gray-100/80 dark:bg-[#222222] rounded-2xl text-sm leading-relaxed transition-colors">
          <div className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white mb-1.5 text-xs sm:text-sm">
            <span>{video.views}</span>
            <span>•</span>
            <span>{video.uploadedAt}</span>
            <div className="flex gap-2 ml-2">
              {video.tags?.slice(0, 3).map((tag, i) => (
                <span key={i} className="text-blue-500 hover:underline cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <p
            className={`whitespace-pre-line text-gray-800 dark:text-gray-200 ${
              isDescExpanded ? '' : 'line-clamp-3'
            }`}
          >
            {video.description}
          </p>

          <button
            onClick={() => setIsDescExpanded(!isDescExpanded)}
            className="mt-2 font-semibold text-gray-900 dark:text-white hover:underline focus:outline-none"
          >
            {isDescExpanded ? 'Show less' : '...more'}
          </button>
        </div>

        {/* Comments Section */}
        <div className="mt-6">
          <div className="flex items-center gap-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {videoComments.length + (video.commentsCount || 0)} Comments
            </h3>
            <button className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white">
              <ArrowDownWideNarrow className="w-4 h-4" />
              <span>Sort by</span>
            </button>
          </div>

          {/* Add a Comment Input */}
          <form onSubmit={handleCommentSubmit} className="flex gap-3 items-start mb-8">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
              alt="You"
              className="w-10 h-10 rounded-full object-cover shrink-0"
            />
            <div className="flex-1">
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
                className="w-full bg-transparent border-b border-gray-300 dark:border-[#3f3f3f] focus:border-black dark:focus:border-white outline-none pb-1 text-sm text-gray-900 dark:text-white transition-colors placeholder-gray-500"
              />

              {isInputFocused && (
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCommentInput('');
                      setIsInputFocused(false);
                    }}
                    className="px-3.5 py-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-[#272727] text-xs font-semibold text-gray-700 dark:text-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!commentInput.trim()}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      commentInput.trim()
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-200 dark:bg-[#272727] text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Comment
                  </button>
                </div>
              )}
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {videoComments.map((comment) => (
              <div key={comment.id} className="flex gap-3 group">
                <img
                  src={comment.userAvatar}
                  alt={comment.userName}
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">
                      {comment.userName}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {comment.timeAgo}
                    </span>
                  </div>
                  <p className="text-sm text-gray-800 dark:text-gray-200 mt-1 leading-snug">
                    {comment.text}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-600 dark:text-gray-400">
                    <button
                      onClick={() => toggleLikeComment(video.id, comment.id)}
                      className={`flex items-center gap-1.5 hover:text-black dark:hover:text-white ${
                        comment.isLiked ? 'text-blue-500 font-semibold' : ''
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${comment.isLiked ? 'fill-current' : ''}`} />
                      <span>{comment.likes > 0 ? comment.likes : ''}</span>
                    </button>
                    <button className="hover:text-black dark:hover:text-white">
                      <ThumbsDown className="w-3.5 h-3.5" />
                    </button>
                    <button className="hover:text-black dark:hover:text-white font-medium">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Up Next / Recommendations Column */}
      <div className="w-full lg:w-96 xl:w-[410px] shrink-0 space-y-3">
        {/* Recommendation mini-pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {['All', 'Related', 'Channel'].map((tab) => (
            <button
              key={tab}
              onClick={() => setRecommendFilter(tab)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                recommendFilter === tab
                  ? 'bg-black text-white dark:bg-white dark:text-black font-semibold'
                  : 'bg-gray-100 hover:bg-gray-200 dark:bg-[#272727] dark:hover:bg-[#3f3f3f] text-gray-800 dark:text-gray-200'
              }`}
            >
              {tab === 'Channel' ? `From ${video.channelName}` : tab}
            </button>
          ))}
        </div>

        {/* Horizontal Video Cards */}
        <div className="space-y-3">
          {relatedVideos.map((relVideo) => (
            <VideoCard
              key={relVideo.id}
              video={relVideo}
              layout="horizontal"
              onShare={onShare}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
