'use client';

import posthog from 'posthog-js';
import { useLocale } from 'next-intl';

export const trackEvent = (
  eventName: string,
  properties?: Record<string, any>
) => {
  if (typeof window === 'undefined') return;
  posthog.capture(eventName, properties);
};

export const usePostHogTracking = () => {
  const locale = useLocale();

  const track = (eventName: string, properties?: Record<string, any>) => {
    trackEvent(eventName, {
      ...properties,
      locale,
    });
  };

  return { track, locale };
};
