import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import ClientProviders from '@/components/ClientProviders'
import './globals.css'
import GalaxyBackground from '@/components/GalaxyBackground'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

const canonical = new URL('https://novaware.netlify.app')

export const metadata: Metadata = {
  metadataBase: canonical,
  title: {
    default: 'Novaware – Innovative Software Solutions',
    template: '%s | Novaware',
  },
  description:
    'Professional software development platform offering custom applications, web solutions, and automation tools through subscription-based services.',
  applicationName: 'Novaware',
  icons: {
    icon: [
      { url: '/favicon.ico' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
  openGraph: {
    type: 'website',
    url: canonical,
    siteName: 'Novaware',
    title: 'Novaware – Innovative Software Solutions',
    description:
      'Professional software development platform offering custom applications, web solutions, and automation tools through subscription-based services.',
    images: [
      {
        url: '/images/og-cover.png',
        width: 1200,
        height: 630,
        alt: 'Novaware',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@novaware',
    creator: '@novaware',
    title: 'Novaware – Innovative Software Solutions',
    description:
      'Professional software development platform offering custom applications, web solutions, and automation tools through subscription-based services.',
    images: ['/images/og-cover.png'],
  },
  alternates: {
    canonical: '/',
  },
}

export const viewport: Viewport = {
  themeColor: '#0b1020',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Resource hints for YouTube thumbnail and embed domains */}
        <link rel="preconnect" href="https://i.ytimg.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <link rel="preconnect" href="https://www.youtube-nocookie.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.youtube-nocookie.com" />
        <link rel="preconnect" href="https://www.youtube.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://s.ytimg.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://s.ytimg.com" />

        {/* Optional analytics: defaults to Plausible if NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set */}
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ? (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/plausible.js"
          />
        ) : null}

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Novaware',
              url: canonical.toString(),
              logo: new URL('/images/og-cover.png', canonical).toString(),
            }),
          }}
        />
      </head>
      <body className={`${inter.className} relative`}>
        {/* Skip link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 bg-white text-black px-4 py-2 rounded-md shadow"
        >
          Skip to main content
        </a>
        {/* Galaxy / Nebula animated background */}
        <GalaxyBackground />

        <ClientProviders>
          {/* Page content */}
          <div className="min-h-screen animated-bg relative z-10">
            {children}
          </div>
        </ClientProviders>
      </body>
    </html>
  )
}
