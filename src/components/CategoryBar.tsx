import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useYouTube } from '../context/YouTubeContext';
import { categories } from '../data/mockVideos';

export const CategoryBar: React.FC = () => {
  const { activeCategory, setActiveCategory } = useYouTube();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -250 : 250;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-14 z-30 flex items-center bg-white/95 dark:bg-[#0f0f0f]/95 backdrop-blur-md px-4 py-3 border-b border-gray-100 dark:border-[#272727] transition-colors">
      {/* Scroll Left Button */}
      <button
        onClick={() => scroll('left')}
        aria-label="Scroll left"
        className="hidden md:flex items-center justify-center p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-[#272727] text-gray-700 dark:text-gray-300 mr-2 shrink-0 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Pills Container */}
      <div
        ref={scrollRef}
        className="flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap w-full"
      >
        {categories.map((category) => {
          const isActive = activeCategory.toLowerCase() === category.toLowerCase();
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all shrink-0 ${
                isActive
                  ? 'bg-black text-white dark:bg-white dark:text-black font-semibold shadow-sm'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-[#272727] dark:hover:bg-[#3f3f3f] dark:text-gray-200'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Scroll Right Button */}
      <button
        onClick={() => scroll('right')}
        aria-label="Scroll right"
        className="hidden md:flex items-center justify-center p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-[#272727] text-gray-700 dark:text-gray-300 ml-2 shrink-0 transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};
