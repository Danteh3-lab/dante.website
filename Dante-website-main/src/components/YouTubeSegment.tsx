'use client';

import { useEffect, useRef } from 'react';

// Lightweight YouTube segment player that forces 2x speed and loops a segment
export default function YouTubeSegment({
  videoId,
  start,
  end,
  autoplay = true,
  muted = true,
  forceRate = 2,
}: {
  videoId: string;
  start?: number;
  end?: number;
  autoplay?: boolean;
  muted?: boolean;
  forceRate?: number;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<any>(null);
  const loopTimerRef = useRef<number | null>(null);

  useEffect(() => {
    // Inject IFrame API if missing
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    }

    const onAPIReady = () => {
      if (!containerRef.current) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const origin = (typeof window !== 'undefined' && window.location?.origin) ? window.location.origin : undefined;
      playerRef.current = new (window as any).YT.Player(containerRef.current, {
        host: 'https://www.youtube-nocookie.com',
        videoId,
        playerVars: {
          start,
          end,
          rel: 0,
          playsinline: 1,
          autoplay: autoplay ? 1 : 0,
          mute: muted ? 1 : 0,
          controls: 0,
          modestbranding: 1,
          showinfo: 0,
          fs: 0,
          cc_load_policy: 0,
          iv_load_policy: 3,
          disablekb: 1,
          enablejsapi: 1,
          origin,
        },
        events: {
          onReady: (e: any) => {
            try {
              e.target.setPlaybackRate(forceRate);
              // Ensure autoplay kicks in reliably
              try { e.target.mute?.(); } catch {}
              try { e.target.playVideo?.(); } catch {}
              // Zoom and center the inner iframe to avoid black bars/letterboxing
              const iframe: HTMLIFrameElement | undefined = e.target.getIframe?.();
              if (iframe) {
                iframe.style.position = 'absolute';
                iframe.style.top = '50%';
                iframe.style.left = '50%';
                iframe.style.transform = 'translate(-50%, -50%) scale(1.12)';
                iframe.style.width = '120%';
                iframe.style.height = '120%';
              }
              if (typeof window !== 'undefined') {
                const startAt = typeof start === 'number' ? start : 0;
                const endAt = typeof end === 'number' ? end : Number.POSITIVE_INFINITY;
                loopTimerRef.current = window.setInterval(() => {
                  try {
                    const t = e.target.getCurrentTime?.();
                    if (typeof t === 'number' && t >= endAt - 0.15) {
                      e.target.seekTo(startAt, true);
                      e.target.playVideo?.();
                    }
                    const rate = e.target.getPlaybackRate?.();
                    if (rate !== forceRate) e.target.setPlaybackRate(forceRate);
                  } catch {}
                }, 250);
              }
            } catch {}
          },
          onStateChange: (e: any) => {
            try {
              const current = e.target.getPlaybackRate?.();
              if (current !== forceRate) e.target.setPlaybackRate(forceRate);
            } catch {}
          },
        },
      });
    };

    const waitForYT = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any).YT?.Player) onAPIReady();
      else setTimeout(waitForYT, 100);
    };
    waitForYT();

    return () => {
      try {
        playerRef.current?.destroy?.();
      } catch {}
      if (loopTimerRef.current) {
        clearInterval(loopTimerRef.current);
        loopTimerRef.current = null;
      }
    };
  }, [videoId, start, end, autoplay, muted, forceRate]);

  return (
    <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-primary via-accent to-primary-light bg-[length:200%_200%] animate-gradient">
      <div className="relative w-full h-full rounded-xl overflow-hidden ring-1 ring-white/10">
        <div
          ref={containerRef}
          className="absolute inset-0 w-full h-full"
          style={{ pointerEvents: 'none' }}
        />
      </div>
    </div>
  );
}
