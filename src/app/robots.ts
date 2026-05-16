import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/coach/', '/journal/'], // Protect private data pages from crawling
    },
    sitemap: 'https://task-d5ie.vercel.app/sitemap.xml',
  };
}
