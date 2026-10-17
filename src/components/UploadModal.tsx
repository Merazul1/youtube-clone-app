import React, { useState } from 'react';
import { X, UploadCloud, Film, Image as ImageIcon, Sparkles } from 'lucide-react';
import type { Video } from '../types';
import { useYouTube } from '../context/YouTubeContext';
import { categories } from '../data/mockVideos';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {
  const { addNewVideo, selectVideo } = useYouTube();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Coding');
  const [videoUrl, setVideoUrl] = useState(
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  );
  const [thumbnailUrl, setThumbnailUrl] = useState(
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80'
  );

  if (!isOpen) return null;

  const sampleStreams = [
    { name: 'For Bigger Blazes (Fast Fire Action)', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
    { name: 'Big Buck Bunny (Animation 4K)', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
    { name: 'Sintel Fantasy Quest', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4' },
    { name: 'For Bigger Fun (Celebration)', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' }
  ];

  const sampleThumbs = [
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newVideo: Video = {
      id: 'custom_' + Date.now(),
      title: title.trim(),
      description: description.trim() || 'Uploaded via YouTube Creator Studio.',
      videoUrl: videoUrl.trim(),
      thumbnailUrl: thumbnailUrl.trim(),
      duration: '04:18',
      channelName: 'Alex Johnson',
      channelAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
      channelId: 'you',
      subscribers: '1.2K',
      isVerified: true,
      views: '1 view',
      viewsCount: 1,
      timestamp: 'Just now',
      uploadedAt: 'Oct 16, 2026',
      likes: '0',
      likesCount: 0,
      category,
      tags: [category.toLowerCase(), 'new', 'trending'],
      commentsCount: 0
    };

    addNewVideo(newVideo);
    selectVideo(newVideo);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#212121] rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-gray-200 dark:border-[#383838]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-[#333333]">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-100 dark:bg-red-950/60 text-red-600 rounded-xl">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-gray-900 dark:text-white">
                Upload Video
              </h3>
              <p className="text-xs text-gray-500">YouTube Creator Studio</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#333333] text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Title (required)
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Building an Autonomous AI Agent in 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-[#3f3f3f] bg-transparent text-sm text-gray-900 dark:text-white focus:border-blue-500 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Tell viewers about your video..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-[#3f3f3f] bg-transparent text-sm text-gray-900 dark:text-white focus:border-blue-500 outline-none resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-[#3f3f3f] bg-white dark:bg-[#282828] text-sm text-gray-900 dark:text-white focus:border-blue-500 outline-none"
            >
              {categories.filter((c) => c !== 'All').map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Video Stream URL with quick presets */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1">
                <Film className="w-3.5 h-3.5 text-blue-500" />
                Video MP4 Stream URL
              </label>
            </div>
            <input
              type="url"
              required
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-[#3f3f3f] bg-transparent text-xs text-gray-900 dark:text-white focus:border-blue-500 outline-none font-mono"
            />
            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {sampleStreams.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setVideoUrl(s.url)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors ${
                    videoUrl === s.url
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold'
                      : 'border-gray-300 dark:border-[#3f3f3f] hover:bg-gray-100 dark:hover:bg-[#2e2e2e] text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          {/* Thumbnail URL with presets */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-amber-500" />
                Thumbnail Image URL
              </label>
            </div>
            <input
              type="url"
              required
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-[#3f3f3f] bg-transparent text-xs text-gray-900 dark:text-white focus:border-blue-500 outline-none font-mono"
            />
            {/* Quick Thumbs */}
            <div className="flex gap-2 mt-2">
              {sampleThumbs.map((t, idx) => (
                <img
                  key={idx}
                  src={t}
                  alt={`Preset ${idx}`}
                  onClick={() => setThumbnailUrl(t)}
                  className={`w-16 h-10 object-cover rounded-lg cursor-pointer border-2 transition-transform hover:scale-105 ${
                    thumbnailUrl === t ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-transparent'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex justify-end gap-3 border-t border-gray-200 dark:border-[#333333]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2f2f2f]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-full text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Publish Video</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
