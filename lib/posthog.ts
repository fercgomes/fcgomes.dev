'use client';

import posthog from 'posthog-js';
import { useLocale } from 'next-intl';

// Check if PostHog should be initialized
// Note: With the new consent model, using the page implies consent
// This function is kept for backward compatibility but may not be needed
export const shouldInitializePostHog = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check if user has explicitly declined
  const consent = localStorage.getItem('posthog_consent');
  return consent !== 'declined';
};

// Initialize PostHog (only call after consent)
export const initializePostHog = () => {
  if (typeof window === 'undefined') return;
  
  // Check if already initialized
  if ((posthog as any).__loaded) return;

  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  if (!posthogKey || !posthogHost) {
    console.warn('PostHog environment variables not set');
    return;
  }

  posthog.init(posthogKey, {
    api_host: posthogHost,
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('PostHog loaded');
      }
    },
  });
};

// Track event helper
export const trackEvent = (
  eventName: string,
  properties?: Record<string, any>
) => {
  if (typeof window === 'undefined') return;
  if (!shouldInitializePostHog()) return;
  if (!(posthog as any).__loaded) return;

  posthog.capture(eventName, {
    ...properties,
    timestamp: new Date().toISOString(),
  });
};

// Hook to get current locale for events
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

