import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap { const base=process.env.NEXT_PUBLIC_SITE_URL||'https://luxor-pharaoh-day.vercel.app'; return ['','/experiences','/plan','/transport','/before-you-buy','/privacy','/terms'].map(path=>({url:`${base}${path}`,lastModified:new Date()})); }
