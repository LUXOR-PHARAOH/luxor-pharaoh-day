import type {MetadataRoute} from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://luxor-pharaoh-day-q3rd.vercel.app';

const paths = [
  '/', '/search', '/visitor-center', '/rescue', '/vib', '/live-now',
  '/smart-day', '/fair-deal', '/family-mode', '/photo-mode', '/night-plan',
  '/tourist-pocket', '/soundtrack', '/visitor-guide', '/emergency',
  '/experiences', '/price-check', '/what-can-i-do-now', '/transport',
  '/before-you-buy', '/plan', '/help', '/trust', '/report-issue', '/faq',
  '/privacy', '/terms', '/advanced', '/contact'
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return paths.map((path) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified,
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : path === '/visitor-center' ? 0.95 : 0.7
  }));
}
