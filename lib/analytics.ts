'use client';

import { track } from '@vercel/analytics';

type EventProps = Record<string, string | number | boolean>;

export function trackEvent(name: string, properties?: EventProps) {
  try {
    void track(name, properties);
  } catch {
    // Analytics must never affect the visitor experience.
  }
}
