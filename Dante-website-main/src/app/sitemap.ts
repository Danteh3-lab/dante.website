import type { MetadataRoute } from 'next'

const baseUrl = new URL('https://dante-dev.netlify.app')

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['/', '/about', '/portfolio', '/dashboard'].map((path) => ({
    url: new URL(path, baseUrl).toString(),
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '/' ? 1 : 0.6,
  }))

  return routes
}
