'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

const reportedErrors = new Set<string>();

function shortErrorType(value: unknown): string {
  if (value instanceof Error) return value.name || 'Error';
  return 'UnhandledError';
}

export default function AnalyticsTelemetry() {
  useEffect(() => {
    const path = window.location.pathname;

    const reportError = (type: string) => {
      const key = path + ':' + type;
      if (reportedErrors.has(key)) return;
      reportedErrors.add(key);
      trackEvent('js_error', { route: path, type });
    };

    const onError = (event: ErrorEvent) => reportError(shortErrorType(event.error));
    const onRejection = () => reportError('UnhandledRejection');

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const element = target?.closest<HTMLElement>('[data-analytics-event]');
      if (element) {
        const name = element.dataset.analyticsEvent;
        if (name) {
          const value = element.dataset.analyticsValue;
          trackEvent(name, value ? { value } : undefined);
        }
      }

      const link = target?.closest<HTMLAnchorElement>('a[href]');
      if (!link) return;
      const href = link.getAttribute('href') || '';

      if (href.startsWith('/price-check#')) {
        trackEvent('price_checked', { site: href.slice('/price-check#'.length) });
      } else if (href.startsWith('https://wa.me/')) {
        trackEvent('contact_started', { channel: 'whatsapp' });
      } else if (href.startsWith('mailto:')) {
        trackEvent('contact_started', { channel: 'email' });
      } else if (href === '/vib') {
        trackEvent('service_interest', { service: 'vib' });
      } else if (href === '/contact') {
        trackEvent('service_interest', { service: 'contact' });
      } else if (href === '/report-issue') {
        trackEvent('issue_report_opened');
      } else if (href === '/what-can-i-do-now') {
        trackEvent('planner_started');
      } else if (href === '/smart-day') {
        trackEvent('smart_day_opened');
      } else if (href === '/plan') {
        trackEvent('plan_opened');
      }
    };

    const onPageHide = () => {
      trackEvent('page_exit', { page: path });
    };

    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRejection);
    document.addEventListener('click', onClick, true);
    window.addEventListener('pagehide', onPageHide);

    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onRejection);
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('pagehide', onPageHide);
    };
  }, []);

  return null;
}
