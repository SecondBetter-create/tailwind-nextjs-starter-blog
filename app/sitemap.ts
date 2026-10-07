import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { lessen } from '@/lib/pensioen/leerroute'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
    }))

  const routes = [
    '',
    'modules',
    'leren/belasting-basis',
    'oefenen',
    'pensioen',
    'blog',
    'tags',
  ].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  const lessonRoutes = lessen.map((les) => ({
    url: `${siteUrl}/leren/${les.id}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...lessonRoutes, ...blogRoutes]
}
