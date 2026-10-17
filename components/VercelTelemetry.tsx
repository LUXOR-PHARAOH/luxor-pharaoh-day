'use client';

import {Analytics} from '@vercel/analytics/next';
import {SpeedInsights} from '@vercel/speed-insights/next';

export default function VercelTelemetry(){
  return <><SpeedInsights/><Analytics beforeSend={event=>event.url.includes('/admin')?null:event}/></>;
}
