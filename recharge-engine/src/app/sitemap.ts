import type { MetadataRoute } from 'next'
import { operators } from '@/lib/data/operators'
import { plans } from '@/lib/data/plans'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rechargecompare.in'
  const now = new Date().toISOString()

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/plans`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/compare`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/find`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/operators`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: 'monthly', priority: 0.2 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'monthly', priority: 0.2 },
  ]

  const operatorPages: MetadataRoute.Sitemap = operators.map((op) => ({
    url: `${baseUrl}/plans/${op.slug}`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  const planPages: MetadataRoute.Sitemap = plans
    .filter((p) => p.status === 'ACTIVE' || p.status === 'SAMPLE')
    .map((p) => ({
      url: `${baseUrl}/plan/${p.operatorId}/${p.price}`,
      lastModified: p.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

  return [...staticPages, ...operatorPages, ...planPages]
}
