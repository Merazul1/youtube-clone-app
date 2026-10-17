import React, { useState } from 'react';
import { YouTubeProvider, useYouTube } from './context/YouTubeContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { CategoryBar } from './components/CategoryBar';
import { VideoCard } from './components/VideoCard';
import { WatchPage } from './components/WatchPage';
import { ShortsView } from './components/ShortsView';
import { ShareModal } from './components/ShareModal';
import { UploadModal } from './components/UploadModal';
import { HistoryView, LikedVideosView, WatchLaterView, SubscriptionsView } from './components/LibraryViews';
import type { Video } from './types';
import { mockShorts } from './data/mockVideos';
import { Flame, VideoOff } from 'lucide-react';

const YouTubeMain: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    selectedVideo,
    videos,
    activeCategory,
    searchQuery,
    setSearchQuery
  } = useYouTube();

  const [shareVideo, setShareVideo] = useState<Video | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Filter videos based on category and search query
  const filteredVideos = videos.filter((video) => {
    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = video.title.toLowerCase().includes(q);
      const matchChannel = video.channelName.toLowerCase().includes(q);
      const matchCategory = video.category.toLowerCase().includes(q);
      const matchTags = video.tags?.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchChannel && !matchCategory && !matchTags) {
        return false;
      }
    }

    // Category filter
    if (activeCategory !== 'All') {
      const catMatch = video.category.toLowerCase() === activeCategory.toLowerCase();
      const tagMatch = video.tags?.some(
        (t) => t.toLowerCase() === activeCategory.toLowerCase()
      );
      if (!catMatch && !tagMatch) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] text-gray-900 dark:text-white transition-colors duration-150">
      {/* Top Navbar */}
      <Navbar onOpenUpload={() => setIsUploadOpen(true)} />

      {/* Share Modal */}
      <ShareModal video={shareVideo} onClose={() => setShareVideo(null)} />

      {/* Upload Video Modal */}
      <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />

      {/* Main Content Area */}
      {currentView === 'watch' && selectedVideo ? (
        <main>
          <WatchPage video={selectedVideo} onShare={(v) => setShareVideo(v)} />
        </main>
      ) : (
        <div className="flex">
          {/* Collapsible Sidebar */}
          <Sidebar />

          {/* Body Content */}
          <main className="flex-1 min-w-0 pb-16">
            {currentView === 'shorts' && (
              <ShortsView onShare={(v) => setShareVideo(v)} />
            )}

            {currentView === 'history' && (
              <HistoryView onShare={(v) => setShareVideo(v)} />
            )}

            {currentView === 'liked' && (
              <LikedVideosView onShare={(v) => setShareVideo(v)} />
            )}

            {currentView === 'watchLater' && (
              <WatchLaterView onShare={(v) => setShareVideo(v)} />
            )}

            {currentView === 'subscriptions' && (
              <SubscriptionsView onShare={(v) => setShareVideo(v)} />
            )}

            {currentView === 'home' && (
              <div>
                {/* Categories Bar */}
                <CategoryBar />

                <div className="px-4 sm:px-6 py-5 max-w-[1920px] mx-auto">
                  {/* Search Query header if searching */}
                  {searchQuery && (
                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Results for <span className="font-semibold text-gray-900 dark:text-white">"{searchQuery}"</span>
                      </p>
                      <button
                        onClick={() => setSearchQuery('')}
                        className="text-xs text-blue-500 hover:underline"
                      >
                        Clear search
                      </button>
                    </div>
                  )}

                  {/* Empty state if no videos found */}
                  {filteredVideos.length === 0 ? (
                    <div className="text-center py-24">
                      <VideoOff className="w-16 h-16 text-gray-400 mx-auto mb-3 opacity-50" />
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        No videos found
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
                        Try searching for something else or pick a different category pill.
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Video Grid - First Section */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-x-4 gap-y-7">
                        {filteredVideos.slice(0, 8).map((video) => (
                          <VideoCard
                            key={video.id}
                            video={video}
                            onShare={(v) => setShareVideo(v)}
                          />
                        ))}
                      </div>

                      {/* YouTube Shorts Shelf in Home Feed */}
                      {!searchQuery && activeCategory === 'All' && (
                        <div className="my-8 pt-6 border-t border-gray-200 dark:border-[#272727]">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded-lg bg-red-600 text-white">
                                <Flame className="w-5 h-5 fill-current" />
                              </div>
                              <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                                Shorts
                              </h2>
                            </div>
                            <button
                              onClick={() => setCurrentView('shorts')}
                              className="text-xs font-semibold text-blue-500 hover:underline"
                            >
                              View all
                            </button>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                            {mockShorts.map((short) => (
                              <div
                                key={short.id}
                                onClick={() => setCurrentView('shorts')}
                                className="group cursor-pointer"
                              >
                                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-gray-900 shadow-sm group-hover:shadow-lg transition-transform group-hover:scale-102">
                                  <img
                                    src={short.thumbnailUrl}
                                    alt={short.title}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                                  <div className="absolute bottom-2.5 inset-x-2.5 text-white">
                                    <p className="text-xs font-semibold line-clamp-2 leading-tight drop-shadow">
                                      {short.title}
                                    </p>
                                    <span className="text-[10px] text-gray-300 mt-1 block">
                                      {short.views} views
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Video Grid - Remaining Videos */}
                      {filteredVideos.length > 8 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-x-4 gap-y-7 mt-6">
                          {filteredVideos.slice(8).map((video) => (
                            <VideoCard
                              key={video.id}
                              video={video}
                              onShare={(v) => setShareVideo(v)}
                            />
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <YouTubeProvider>
      <YouTubeMain />
    </YouTubeProvider>
  );
}
