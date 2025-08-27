'use client';

import { useState, useRef, useEffect } from 'react';
import { XMarkIcon, PlayIcon } from '@heroicons/react/24/outline';

interface VideoPlayerProps {
  videoId: string;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export default function VideoPlayer({ videoId, isOpen, onClose, title = "Demo Video" }: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      // Reset loading state when modal opens
      const timer = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    // Stop video by reloading iframe
    if (iframeRef.current) {
      const src = iframeRef.current.src;
      iframeRef.current.src = '';
      iframeRef.current.src = src;
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity"
          onClick={handleClose}
        >
          <div className="relative">
            {/* Animated glow ring using theme colors */}
            <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary via-accent to-primary-light bg-[length:200%_200%] blur-2xl opacity-80 animate-gradient"></div>
            <div
              className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl transform transition-transform duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
              >
                <XMarkIcon className="w-6 h-6 text-white" />
              </button>

              {/* Loading State */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-white/70">Loading video...</p>
                  </div>
                </div>
              )}

              {/* YouTube Embed with Custom Styling */}
              <div className="relative w-full h-full overflow-hidden">
                <iframe
                  ref={iframeRef}
                  src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=1&disablekb=1&playsinline=1&loop=1&playlist=${videoId}`}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute border-0 w-[120%] h-[120%] top-1/2 left-1/2"
                  onLoad={() => setIsLoading(false)}
                  style={{
                    pointerEvents: 'none',
                    transform: 'translate(-50%, -50%) scale(1.12)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Clean Video Embed Component (for inline use)
interface CleanVideoEmbedProps {
  videoId: string;
  title?: string;
  autoplay?: boolean;
  className?: string;
}

export function CleanVideoEmbed({ 
  videoId, 
  title = "Video", 
  autoplay = false,
  className = "w-full aspect-video"
}: CleanVideoEmbedProps) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-black ${className}`}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?controls=0&modestbranding=1&rel=0&showinfo=0&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=1&disablekb=1&playsinline=1${autoplay ? '&autoplay=1' : ''}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full border-0"
      />
    </div>
  );
}

// Video Thumbnail Component (for preview before playing)
interface VideoThumbnailProps {
  videoId: string;
  title?: string;
  onClick: () => void;
  className?: string;
}

export function VideoThumbnail({ 
  videoId, 
  title = "Play Video", 
  onClick,
  className = "w-full aspect-video"
}: VideoThumbnailProps) {
  return (
    <div 
      className={`relative cursor-pointer group overflow-hidden rounded-xl ${className}`}
      onClick={onClick}
    >
      {/* YouTube Thumbnail */}
      <img
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt={title}
        className="w-full h-full object-cover transition-transform group-hover:scale-105"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
          <PlayIcon className="w-8 h-8 text-black ml-1" />
        </div>
      </div>
      
      {/* Title Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        <h3 className="text-white font-semibold">{title}</h3>
      </div>
    </div>
  );
}
