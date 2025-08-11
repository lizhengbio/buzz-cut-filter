import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface SitemapURL {
  url: string;
  lastModified?: string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export async function GET() {
  const baseUrl = 'https://www.buzzcutfilter.app';
  
  // Define all static routes with their SEO priorities
  const routes: SitemapURL[] = [
    // Main pages - High priority
    { url: '', changeFrequency: 'daily', priority: 1.0 },
    { url: '/buzz-cut-simulator', changeFrequency: 'daily', priority: 0.9 },
    { url: '/pricing', changeFrequency: 'weekly', priority: 0.8 },
    
    // Simulator sub-pages
    { url: '/buzz-cut-simulator/upload-photo', changeFrequency: 'weekly', priority: 0.7 },
    { url: '/buzz-cut-simulator/live-camera', changeFrequency: 'weekly', priority: 0.7 },
    { url: '/buzz-cut-simulator/results', changeFrequency: 'weekly', priority: 0.6 },
    
    // Guides - High SEO value
    { url: '/buzz-cut-guides', changeFrequency: 'weekly', priority: 0.8 },
    { url: '/buzz-cut-guides/how-to-use-buzz-cut-filter', changeFrequency: 'monthly', priority: 0.7 },
    { url: '/buzz-cut-guides/guard-lengths', changeFrequency: 'monthly', priority: 0.7 },
    
    // Information pages
    { url: '/about-us', changeFrequency: 'monthly', priority: 0.6 },
    { url: '/contact', changeFrequency: 'monthly', priority: 0.5 },
    { url: '/faq', changeFrequency: 'weekly', priority: 0.6 },
    { url: '/blog', changeFrequency: 'weekly', priority: 0.7 },
    { url: '/inspiration', changeFrequency: 'weekly', priority: 0.5 },
    
    // Legal pages
    { url: '/terms', changeFrequency: 'yearly', priority: 0.3 },
    { url: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${routes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${route.lastModified || new Date().toISOString()}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400', // Cache for 1 day
    },
  });
}