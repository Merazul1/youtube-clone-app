import React, { useState } from 'react';
import { X, Copy, Check, MessageCircle, Mail, Code, Send, Globe } from 'lucide-react';
import type { Video } from '../types';

interface ShareModalProps {
  video: Video | null;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ video, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [includeTimestamp, setIncludeTimestamp] = useState(false);

  if (!video) return null;

  const shareUrl = `${window.location.origin}/?v=${video.id}${includeTimestamp ? '&t=0' : ''}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const socialPlatforms = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-500 hover:bg-green-600',
      action: () => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(video.title + ' ' + shareUrl)}`, '_blank')
    },
    {
      name: 'X (Twitter)',
      icon: Send,
      color: 'bg-black dark:bg-white dark:text-black hover:opacity-90',
      action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(video.title)}&url=${encodeURIComponent(shareUrl)}`, '_blank')
    },
    {
      name: 'Web',
      icon: Globe,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-red-500 hover:bg-red-600',
      action: () => window.open(`mailto:?subject=${encodeURIComponent(video.title)}&body=${encodeURIComponent(shareUrl)}`, '_blank')
    },
    {
      name: 'Embed',
      icon: Code,
      color: 'bg-gray-700 hover:bg-gray-800',
      action: handleCopy
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#212121] rounded-2xl w-full max-w-lg p-5 shadow-2xl border border-gray-200 dark:border-[#383838] relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-[#333333]">
          <h3 className="font-semibold text-base text-gray-900 dark:text-white">
            Share
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-[#333333] text-gray-500 dark:text-gray-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video preview mini banner */}
        <div className="flex items-center gap-3 my-4 p-2 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl border border-gray-100 dark:border-[#2e2e2e]">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-20 h-12 object-cover rounded-lg shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-semibold line-clamp-1 text-gray-900 dark:text-white">
              {video.title}
            </h4>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">{video.channelName}</p>
          </div>
        </div>

        {/* Social Platforms Row */}
        <div className="flex items-center justify-around gap-2 py-3 overflow-x-auto">
          {socialPlatforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <button
                key={platform.name}
                onClick={platform.action}
                className="flex flex-col items-center gap-1.5 group cursor-pointer focus:outline-none"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-110 shadow-md ${platform.color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white">
                  {platform.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Copy Link input & button */}
        <div className="mt-4 flex items-center gap-2 p-1.5 pl-3 border border-gray-300 dark:border-[#3f3f3f] rounded-xl bg-gray-50 dark:bg-[#121212]">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="bg-transparent text-xs text-gray-800 dark:text-gray-200 outline-none w-full select-all font-mono"
          />
          <button
            onClick={handleCopy}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
              copied
                ? 'bg-green-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Start at timestamp checkbox */}
        <div className="mt-3 flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            id="startAt"
            checked={includeTimestamp}
            onChange={(e) => setIncludeTimestamp(e.target.checked)}
            className="rounded border-gray-300 accent-blue-600"
          />
          <label htmlFor="startAt" className="cursor-pointer select-none">
            Start at current timestamp (0:00)
          </label>
        </div>
      </div>
    </div>
  );
};
