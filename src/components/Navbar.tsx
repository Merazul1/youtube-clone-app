import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Mic,
  Video as VideoIcon,
  Bell,
  Sun,
  Moon,
  X,
  User,
  Settings,
  HelpCircle,
  LogOut,
  UploadCloud,
  Check
} from 'lucide-react';
import { useYouTube } from '../context/YouTubeContext';

interface NavbarProps {
  onOpenUpload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenUpload }) => {
  const {
    theme,
    toggleTheme,
    toggleSidebar,
    searchQuery,
    setSearchQuery,
    setCurrentView,
    selectVideo,
  } = useYouTube();

  const [searchInput, setSearchInput] = useState(searchQuery);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Sync internal search input with context query
  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchSuggestions(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setCurrentView('home');
    selectVideo(null);
    setShowSearchSuggestions(false);
  };

  const handleVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setSearchInput('Blender Animation 4K');
      setSearchQuery('Blender Animation 4K');
      setCurrentView('home');
      selectVideo(null);
    }, 2000);
  };

  const searchSuggestions = [
    'Next.js 15 full tutorial',
    'Blender 3D open movies',
    'Cyberpunk 2077 RTX 5090 gameplay',
    'Lo-Fi chill beats for coding',
    'Humanoid robots 2026',
    'React 19 server actions'
  ];

  const notifications = [
    {
      id: 1,
      title: 'DevMastery Pro uploaded: Next.js 15 & React 19 Full-Stack Masterclass',
      time: '2 hours ago',
      unread: true,
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=faces'
    },
    {
      id: 2,
      title: 'Blender Open Movies premiered a new 4K remaster',
      time: '1 day ago',
      unread: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces'
    },
    {
      id: 3,
      title: 'TechWave Dynamics is now live: Testing the new AI humanoid',
      time: '3 days ago',
      unread: false,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces'
    }
  ];

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 h-14 bg-white dark:bg-[#0f0f0f] border-b border-gray-200 dark:border-[#272727] transition-colors duration-150">
      {/* Left: Menu & Brand Logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          aria-label="Toggle navigation menu"
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#272727] text-gray-700 dark:text-gray-200 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <button
          onClick={() => {
            setCurrentView('home');
            selectVideo(null);
            setSearchQuery('');
            setSearchInput('');
          }}
          className="flex items-center gap-1 focus:outline-none group"
        >
          <div className="relative flex items-center">
            {/* YouTube Red Icon */}
            <div className="w-8 h-6 bg-[#FF0000] rounded-lg flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <div className="w-0 h-0 border-y-[4px] border-y-transparent border-l-[8px] border-l-white ml-0.5" />
            </div>
            <span className="ml-1.5 font-bold text-lg tracking-tighter text-gray-900 dark:text-white flex items-center">
              YouTube
              <span className="text-[10px] font-medium text-gray-400 ml-1 self-start">CLONE</span>
            </span>
          </div>
        </button>
      </div>

      {/* Center: Search Bar & Voice Input */}
      <div className="flex items-center flex-1 max-w-2xl mx-4 justify-center" ref={searchRef}>
        <form onSubmit={handleSearch} className="flex items-center w-full max-w-[580px] relative">
          <div className="flex items-center w-full border border-gray-300 dark:border-[#303030] rounded-l-full bg-white dark:bg-[#121212] focus-within:border-blue-500 dark:focus-within:border-blue-500 pl-4 pr-2 py-1.5 shadow-inner">
            <input
              type="text"
              placeholder="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onFocus={() => setShowSearchSuggestions(true)}
              className="w-full bg-transparent border-none outline-none text-sm text-gray-900 dark:text-white placeholder-gray-500"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => {
                  setSearchInput('');
                  setSearchQuery('');
                }}
                className="p-1 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            type="submit"
            aria-label="Search"
            className="flex items-center justify-center px-6 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-[#222222] dark:hover:bg-[#272727] border border-l-0 border-gray-300 dark:border-[#303030] rounded-r-full text-gray-600 dark:text-gray-300 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Search Suggestions Dropdown */}
          {showSearchSuggestions && (
            <div className="absolute top-12 left-0 right-14 bg-white dark:bg-[#212121] rounded-2xl shadow-2xl border border-gray-200 dark:border-[#383838] py-2 z-50">
              <div className="text-[11px] font-semibold text-gray-400 px-4 py-1 uppercase tracking-wider">
                Trending Searches
              </div>
              {searchSuggestions.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setSearchInput(item);
                    setSearchQuery(item);
                    setCurrentView('home');
                    selectVideo(null);
                    setShowSearchSuggestions(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#383838] text-sm text-left text-gray-800 dark:text-gray-200"
                >
                  <Search className="w-4 h-4 text-gray-400 shrink-0" />
                  <span>{item}</span>
                </button>
              ))}
            </div>
          )}
        </form>

        {/* Voice Search Button */}
        <button
          type="button"
          onClick={handleVoiceSearch}
          aria-label="Search with your voice"
          className={`ml-3 p-2.5 rounded-full text-gray-700 dark:text-gray-200 transition-all ${
            isListening
              ? 'bg-red-500 text-white animate-pulse'
              : 'bg-gray-100 hover:bg-gray-200 dark:bg-[#222222] dark:hover:bg-[#272727]'
          }`}
          title={isListening ? 'Listening...' : 'Search with voice'}
        >
          <Mic className="w-5 h-5" />
        </button>
      </div>

      {/* Right: Actions, Theme, Notifications & User Profile */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Create / Upload Video Button */}
        <button
          onClick={onOpenUpload}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-[#272727] dark:hover:bg-[#3f3f3f] text-gray-800 dark:text-gray-100 text-sm font-medium transition-colors"
          title="Create a video"
        >
          <VideoIcon className="w-4 h-4 text-red-600" />
          <span className="hidden sm:inline">Create</span>
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark/light mode"
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#272727] text-gray-700 dark:text-gray-200 transition-colors"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
            className="p-2 relative rounded-full hover:bg-gray-100 dark:hover:bg-[#272727] text-gray-700 dark:text-gray-200 transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full">
              2
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#212121] rounded-2xl shadow-2xl border border-gray-200 dark:border-[#383838] py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between px-4 pb-2 border-b border-gray-200 dark:border-[#383838]">
                <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                <span className="text-xs text-blue-500 cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-[#2e2e2e] max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`flex items-start gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-[#2a2a2a] cursor-pointer ${
                      n.unread ? 'bg-blue-50/40 dark:bg-[#252830]' : ''
                    }`}
                  >
                    <img
                      src={n.avatar}
                      alt="avatar"
                      className="w-10 h-10 rounded-full object-cover shrink-0 mt-0.5"
                    />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-800 dark:text-gray-200 leading-snug">
                        {n.title}
                      </p>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 block">
                        {n.time}
                      </span>
                    </div>
                    {n.unread && (
                      <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar & Menu */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            aria-label="User account"
            className="flex items-center focus:outline-none p-1 rounded-full hover:ring-2 hover:ring-gray-300 dark:hover:ring-gray-600 transition-all"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
              alt="You"
              className="w-8 h-8 rounded-full object-cover border border-gray-300 dark:border-gray-700"
            />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#212121] rounded-2xl shadow-2xl border border-gray-200 dark:border-[#383838] py-2 z-50">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-[#383838]">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
                  alt="You"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-white">Alex Johnson</h4>
                  <p className="text-xs text-gray-500">@alexcreator • Studio Pro</p>
                </div>
              </div>

              <div className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <button
                  onClick={() => {
                    setCurrentView('subscriptions');
                    setShowProfileMenu(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#383838]"
                >
                  <User className="w-4 h-4" />
                  <span>Your Channel</span>
                </button>
                <button
                  onClick={() => {
                    onOpenUpload();
                    setShowProfileMenu(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#383838]"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>YouTube Studio (Upload)</span>
                </button>
                <button
                  onClick={() => {
                    toggleTheme();
                    setShowProfileMenu(false);
                  }}
                  className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#383838]"
                >
                  <span className="flex items-center gap-3">
                    {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                    Appearance: {theme === 'dark' ? 'Dark' : 'Light'}
                  </span>
                  <Check className="w-4 h-4 text-blue-500" />
                </button>
                <div className="my-1 border-t border-gray-200 dark:border-[#383838]" />
                <button className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#383838]">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                <button className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#383838]">
                  <HelpCircle className="w-4 h-4" />
                  <span>Help & Feedback</span>
                </button>
                <div className="my-1 border-t border-gray-200 dark:border-[#383838]" />
                <button className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#383838] text-red-500">
                  <LogOut className="w-4 h-4" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
