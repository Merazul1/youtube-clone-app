import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Video, Comment } from '../types';
import { mockVideos, initialComments } from '../data/mockVideos';

interface YouTubeContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentView: 'home' | 'watch' | 'shorts' | 'subscriptions' | 'history' | 'liked' | 'watchLater';
  setCurrentView: (view: 'home' | 'watch' | 'shorts' | 'subscriptions' | 'history' | 'liked' | 'watchLater') => void;
  selectedVideo: Video | null;
  selectVideo: (video: Video | null) => void;
  videos: Video[];
  addNewVideo: (video: Video) => void;
  likedVideoIds: string[];
  toggleLikeVideo: (id: string) => void;
  dislikedVideoIds: string[];
  toggleDislikeVideo: (id: string) => void;
  savedVideoIds: string[];
  toggleWatchLater: (id: string) => void;
  subscribedChannelIds: string[];
  toggleSubscribe: (channelId: string) => void;
  watchHistory: Video[];
  clearHistory: () => void;
  comments: Record<string, Comment[]>;
  addComment: (videoId: string, text: string) => void;
  toggleLikeComment: (videoId: string, commentId: string) => void;
}

const YouTubeContext = createContext<YouTubeContextType | undefined>(undefined);

export const YouTubeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('yt_theme') as 'dark' | 'light') || 'dark';
  });

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState<'home' | 'watch' | 'shorts' | 'subscriptions' | 'history' | 'liked' | 'watchLater'>('home');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const [videos, setVideos] = useState<Video[]>(() => {
    const saved = localStorage.getItem('yt_custom_videos');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return [...parsed, ...mockVideos];
      } catch {
        return mockVideos;
      }
    }
    return mockVideos;
  });

  const [likedVideoIds, setLikedVideoIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('yt_liked');
    return saved ? JSON.parse(saved) : ['v1'];
  });

  const [dislikedVideoIds, setDislikedVideoIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('yt_disliked');
    return saved ? JSON.parse(saved) : [];
  });

  const [savedVideoIds, setSavedVideoIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('yt_watch_later');
    return saved ? JSON.parse(saved) : ['v2'];
  });

  const [subscribedChannelIds, setSubscribedChannelIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('yt_subscriptions');
    return saved ? JSON.parse(saved) : ['ch1', 'ch3'];
  });

  const [watchHistory, setWatchHistory] = useState<Video[]>(() => {
    const saved = localStorage.getItem('yt_history');
    return saved ? JSON.parse(saved) : [mockVideos[0]];
  });

  const [comments, setComments] = useState<Record<string, Comment[]>>(() => {
    const saved = localStorage.getItem('yt_comments');
    return saved ? JSON.parse(saved) : initialComments;
  });

  useEffect(() => {
    localStorage.setItem('yt_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.className = 'bg-[#0f0f0f] text-white';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.className = 'bg-[#ffffff] text-[#0f0f0f]';
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('yt_liked', JSON.stringify(likedVideoIds));
  }, [likedVideoIds]);

  useEffect(() => {
    localStorage.setItem('yt_disliked', JSON.stringify(dislikedVideoIds));
  }, [dislikedVideoIds]);

  useEffect(() => {
    localStorage.setItem('yt_watch_later', JSON.stringify(savedVideoIds));
  }, [savedVideoIds]);

  useEffect(() => {
    localStorage.setItem('yt_subscriptions', JSON.stringify(subscribedChannelIds));
  }, [subscribedChannelIds]);

  useEffect(() => {
    localStorage.setItem('yt_history', JSON.stringify(watchHistory));
  }, [watchHistory]);

  useEffect(() => {
    localStorage.setItem('yt_comments', JSON.stringify(comments));
  }, [comments]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const selectVideo = (video: Video | null) => {
    setSelectedVideo(video);
    if (video) {
      setCurrentView('watch');
      setWatchHistory(prev => {
        const filtered = prev.filter(v => v.id !== video.id);
        return [video, ...filtered];
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const addNewVideo = (newVideo: Video) => {
    setVideos(prev => [newVideo, ...prev]);
    const custom = JSON.parse(localStorage.getItem('yt_custom_videos') || '[]');
    localStorage.setItem('yt_custom_videos', JSON.stringify([newVideo, ...custom]));
  };

  const toggleLikeVideo = (id: string) => {
    setLikedVideoIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(vId => vId !== id);
      } else {
        setDislikedVideoIds(d => d.filter(vId => vId !== id));
        return [...prev, id];
      }
    });
  };

  const toggleDislikeVideo = (id: string) => {
    setDislikedVideoIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(vId => vId !== id);
      } else {
        setLikedVideoIds(l => l.filter(vId => vId !== id));
        return [...prev, id];
      }
    });
  };

  const toggleWatchLater = (id: string) => {
    setSavedVideoIds(prev =>
      prev.includes(id) ? prev.filter(vId => vId !== id) : [...prev, id]
    );
  };

  const toggleSubscribe = (channelId: string) => {
    setSubscribedChannelIds(prev =>
      prev.includes(channelId)
        ? prev.filter(cId => cId !== channelId)
        : [...prev, channelId]
    );
  };

  const clearHistory = () => {
    setWatchHistory([]);
  };

  const addComment = (videoId: string, text: string) => {
    if (!text.trim()) return;
    const newComment: Comment = {
      id: 'c_' + Date.now(),
      videoId,
      userName: 'You (Creator)',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
      timeAgo: 'Just now',
      text: text.trim(),
      likes: 0,
      isLiked: false
    };

    setComments(prev => ({
      ...prev,
      [videoId]: [newComment, ...(prev[videoId] || [])]
    }));
  };

  const toggleLikeComment = (videoId: string, commentId: string) => {
    setComments(prev => {
      const list = prev[videoId] || [];
      const updated = list.map(c => {
        if (c.id === commentId) {
          const isLiked = !c.isLiked;
          return {
            ...c,
            isLiked,
            likes: isLiked ? c.likes + 1 : Math.max(0, c.likes - 1)
          };
        }
        return c;
      });
      return { ...prev, [videoId]: updated };
    });
  };

  return (
    <YouTubeContext.Provider
      value={{
        theme,
        toggleTheme,
        sidebarOpen,
        toggleSidebar,
        setSidebarOpen,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        currentView,
        setCurrentView,
        selectedVideo,
        selectVideo,
        videos,
        addNewVideo,
        likedVideoIds,
        toggleLikeVideo,
        dislikedVideoIds,
        toggleDislikeVideo,
        savedVideoIds,
        toggleWatchLater,
        subscribedChannelIds,
        toggleSubscribe,
        watchHistory,
        clearHistory,
        comments,
        addComment,
        toggleLikeComment
      }}
    >
      {children}
    </YouTubeContext.Provider>
  );
};

export const useYouTube = () => {
  const context = useContext(YouTubeContext);
  if (!context) {
    throw new Error('useYouTube must be used within a YouTubeProvider');
  }
  return context;
};
