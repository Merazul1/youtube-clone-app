import React from 'react';
import {
  Home,
  Flame,
  Tv2,
  History,
  Clock,
  ThumbsUp,
  Compass,
  Music2,
  Gamepad2,
  Trophy,
  Radio,
  Settings,
  HelpCircle,
  Flag,
  MessageSquareWarning,
  ChevronRight
} from 'lucide-react';
import { useYouTube } from '../context/YouTubeContext';
import { mockChannels } from '../data/mockVideos';

export const Sidebar: React.FC = () => {
  const {
    sidebarOpen,
    currentView,
    setCurrentView,
    selectVideo,
    setActiveCategory,
    subscribedChannelIds
  } = useYouTube();

  const handleNav = (view: 'home' | 'shorts' | 'subscriptions' | 'history' | 'liked' | 'watchLater', category?: string) => {
    selectVideo(null);
    setCurrentView(view);
    if (category) {
      setActiveCategory(category);
    }
  };

  // Mini sidebar for collapsed state
  if (!sidebarOpen) {
    return (
      <aside className="hidden md:flex flex-col items-center w-18 py-3 px-1 sticky top-14 h-[calc(100vh-3.5rem)] bg-white dark:bg-[#0f0f0f] border-r border-gray-200 dark:border-[#272727] select-none z-40">
        <button
          onClick={() => handleNav('home', 'All')}
          className={`flex flex-col items-center justify-center w-full py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-[#272727] transition-colors ${
            currentView === 'home' ? 'text-red-600 dark:text-red-500 font-semibold' : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          <Home className="w-5 h-5 mb-1" />
          <span className="text-[10px]">Home</span>
        </button>

        <button
          onClick={() => handleNav('shorts')}
          className={`flex flex-col items-center justify-center w-full py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-[#272727] transition-colors ${
            currentView === 'shorts' ? 'text-red-600 dark:text-red-500 font-semibold' : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          <Flame className="w-5 h-5 mb-1" />
          <span className="text-[10px]">Shorts</span>
        </button>

        <button
          onClick={() => handleNav('subscriptions')}
          className={`flex flex-col items-center justify-center w-full py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-[#272727] transition-colors ${
            currentView === 'subscriptions' ? 'text-red-600 dark:text-red-500 font-semibold' : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          <Tv2 className="w-5 h-5 mb-1" />
          <span className="text-[10px]">Subscriptions</span>
        </button>

        <button
          onClick={() => handleNav('history')}
          className={`flex flex-col items-center justify-center w-full py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-[#272727] transition-colors ${
            currentView === 'history' ? 'text-red-600 dark:text-red-500 font-semibold' : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          <History className="w-5 h-5 mb-1" />
          <span className="text-[10px]">History</span>
        </button>
      </aside>
    );
  }

  return (
    <aside className="w-60 px-3 py-3 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto bg-white dark:bg-[#0f0f0f] border-r border-gray-200 dark:border-[#272727] select-none z-40 transition-all duration-200">
      {/* Primary Section */}
      <div className="space-y-0.5">
        <button
          onClick={() => handleNav('home', 'All')}
          className={`flex items-center gap-6 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
            currentView === 'home'
              ? 'bg-gray-100 dark:bg-[#272727] text-gray-900 dark:text-white font-semibold'
              : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#272727]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => handleNav('shorts')}
          className={`flex items-center gap-6 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
            currentView === 'shorts'
              ? 'bg-gray-100 dark:bg-[#272727] text-gray-900 dark:text-white font-semibold'
              : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#272727]'
          }`}
        >
          <Flame className="w-5 h-5" />
          <span>Shorts</span>
        </button>

        <button
          onClick={() => handleNav('subscriptions')}
          className={`flex items-center gap-6 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
            currentView === 'subscriptions'
              ? 'bg-gray-100 dark:bg-[#272727] text-gray-900 dark:text-white font-semibold'
              : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#272727]'
          }`}
        >
          <Tv2 className="w-5 h-5" />
          <span>Subscriptions</span>
        </button>
      </div>

      <div className="my-3 border-t border-gray-200 dark:border-[#272727]" />

      {/* "You" Section */}
      <div>
        <button
          onClick={() => handleNav('history')}
          className="flex items-center gap-2 w-full px-3 py-1 mb-1 text-sm font-bold text-gray-900 dark:text-white hover:text-red-600 transition-colors"
        >
          <span>You</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="space-y-0.5">
          <button
            onClick={() => handleNav('history')}
            className={`flex items-center gap-6 w-full px-3 py-2 rounded-xl text-sm transition-colors ${
              currentView === 'history'
                ? 'bg-gray-100 dark:bg-[#272727] font-semibold text-gray-900 dark:text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#272727]'
            }`}
          >
            <History className="w-5 h-5" />
            <span>History</span>
          </button>

          <button
            onClick={() => handleNav('watchLater')}
            className={`flex items-center gap-6 w-full px-3 py-2 rounded-xl text-sm transition-colors ${
              currentView === 'watchLater'
                ? 'bg-gray-100 dark:bg-[#272727] font-semibold text-gray-900 dark:text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#272727]'
            }`}
          >
            <Clock className="w-5 h-5" />
            <span>Watch Later</span>
          </button>

          <button
            onClick={() => handleNav('liked')}
            className={`flex items-center gap-6 w-full px-3 py-2 rounded-xl text-sm transition-colors ${
              currentView === 'liked'
                ? 'bg-gray-100 dark:bg-[#272727] font-semibold text-gray-900 dark:text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#272727]'
            }`}
          >
            <ThumbsUp className="w-5 h-5" />
            <span>Liked videos</span>
          </button>
        </div>
      </div>

      <div className="my-3 border-t border-gray-200 dark:border-[#272727]" />

      {/* Subscriptions List */}
      <div>
        <h4 className="px-3 py-1 mb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Subscriptions
        </h4>
        <div className="space-y-0.5">
          {mockChannels.map((channel) => {
            const isSubbed = subscribedChannelIds.includes(channel.id);
            return (
              <div
                key={channel.id}
                className="group flex items-center justify-between w-full px-3 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-[#272727] cursor-pointer transition-colors"
                onClick={() => handleNav('subscriptions')}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <img
                    src={channel.avatar}
                    alt={channel.name}
                    className="w-6 h-6 rounded-full object-cover shrink-0"
                  />
                  <span className="text-sm text-gray-800 dark:text-gray-200 truncate">
                    {channel.name}
                  </span>
                </div>
                {isSubbed && (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="my-3 border-t border-gray-200 dark:border-[#272727]" />

      {/* Explore Section */}
      <div>
        <h4 className="px-3 py-1 mb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Explore
        </h4>
        <div className="space-y-0.5">
          <button
            onClick={() => handleNav('home', 'Animation')}
            className="flex items-center gap-6 w-full px-3 py-2 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#272727]"
          >
            <Compass className="w-5 h-5" />
            <span>Trending</span>
          </button>
          <button
            onClick={() => handleNav('home', 'Music')}
            className="flex items-center gap-6 w-full px-3 py-2 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#272727]"
          >
            <Music2 className="w-5 h-5" />
            <span>Music</span>
          </button>
          <button
            onClick={() => handleNav('home', 'Gaming')}
            className="flex items-center gap-6 w-full px-3 py-2 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#272727]"
          >
            <Gamepad2 className="w-5 h-5" />
            <span>Gaming</span>
          </button>
          <button
            onClick={() => handleNav('home', 'AI')}
            className="flex items-center gap-6 w-full px-3 py-2 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#272727]"
          >
            <Radio className="w-5 h-5" />
            <span>News & Tech</span>
          </button>
          <button
            onClick={() => handleNav('home', 'Nature')}
            className="flex items-center gap-6 w-full px-3 py-2 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#272727]"
          >
            <Trophy className="w-5 h-5" />
            <span>Documentary</span>
          </button>
        </div>
      </div>

      <div className="my-3 border-t border-gray-200 dark:border-[#272727]" />

      {/* Settings & Info */}
      <div className="space-y-0.5">
        <button className="flex items-center gap-6 w-full px-3 py-2 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#272727]">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
        <button className="flex items-center gap-6 w-full px-3 py-2 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#272727]">
          <Flag className="w-5 h-5" />
          <span>Report history</span>
        </button>
        <button className="flex items-center gap-6 w-full px-3 py-2 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#272727]">
          <HelpCircle className="w-5 h-5" />
          <span>Help</span>
        </button>
        <button className="flex items-center gap-6 w-full px-3 py-2 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#272727]">
          <MessageSquareWarning className="w-5 h-5" />
          <span>Send feedback</span>
        </button>
      </div>

      {/* Footer disclaimer */}
      <div className="px-3 pt-6 pb-4 text-[11px] text-gray-400 dark:text-gray-500 leading-relaxed">
        <div className="space-x-1 mb-2">
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Press</a>
          <a href="#" className="hover:underline">Copyright</a>
          <a href="#" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">Creators</a>
        </div>
        <p className="mt-2 text-[10px]">© 2026 YouTube Clone LLC</p>
      </div>
    </aside>
  );
};
