'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'

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

  if (active) return <YouTubeSegment {...props} />

  return (
    <button
      type="button"
      aria-label="Play video"
      onClick={() => setActive(true)}
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
        <span className="bg-black/50 rounded-full px-4 py-2 text-sm">Play segment</span>
      </span>
    </button>
  )
}
