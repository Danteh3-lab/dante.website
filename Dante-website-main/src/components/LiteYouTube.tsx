'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react'

// Dynamic import of the heavy YouTubeSegment so it only loads when needed
const YouTubeSegment = dynamic(() => import('./YouTubeSegment'), { ssr: false })

type Props = {
  videoId: string
  start?: number
  end?: number
  autoplay?: boolean
  muted?: boolean
  forceRate?: number
}

export default function LiteYouTube(props: Props) {
  const [active, setActive] = useState(false)
  const [forceActive, setForceActive] = useState(false)
  const containerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Check if mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    
    // For autoplay videos on desktop, activate immediately
    if (props.autoplay && !active && !isMobile) {
      setActive(true)
      return
    }

    // For mobile or non-autoplay videos, use intersection observer to show thumbnail
    if (!active && (isMobile || !props.autoplay)) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // On mobile with autoplay, still show thumbnail for user to click
            // On desktop without autoplay, show thumbnail for user to click
            // Don't auto-activate on mobile even with autoplay prop
            if (!props.autoplay || isMobile) {
              // Keep showing thumbnail - user must click
              observer.disconnect()
            } else {
              // Desktop autoplay
              setTimeout(() => {
                setActive(true)
                observer.disconnect()
              }, 100)
            }
          }
        },
        { threshold: 0.3 }
      )

      if (containerRef.current) {
        observer.observe(containerRef.current)
      }

      return () => observer.disconnect()
    }
  }, [props.autoplay, active])

  if (active || forceActive) return <YouTubeSegment {...props} />

  return (
    <button
      ref={containerRef}
      type="button"
      aria-label="Play video"
      onClick={() => {
        setActive(true)
        setForceActive(true) // Prevent reverting back to thumbnail
      }}
      className="relative aspect-video w-full rounded-xl overflow-hidden ring-1 ring-white/10"
    >
      <img
        src={`https://i.ytimg.com/vi/${props.videoId}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        decoding="async"
        width={1280}
        height={720}
        className="w-full h-full object-cover"
      />
      <span className="absolute inset-0 grid place-items-center text-white/90">
        <div className="bg-red-600 hover:bg-red-700 rounded-full w-16 h-16 flex items-center justify-center transition-colors">
          <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </span>
    </button>
  )
}
