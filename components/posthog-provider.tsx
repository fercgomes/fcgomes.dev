'use client';

import { useEffect, useState } from 'react';
import { initializePostHog } from '@/lib/posthog';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize PostHog automatically - consent is implied by using the page
    // Check if already initialized or if user explicitly declined
    const consent = typeof window !== 'undefined' ? localStorage.getItem('posthog_consent') : null;
    
    if (consent !== 'declined') {
      initializePostHog();
      setIsInitialized(true);
    }

    // Listen for consent changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'posthog_consent' && e.newValue === 'accepted') {
        initializePostHog();
        setIsInitialized(true);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);

      // Also listen for custom consent event
      const handleConsentAccepted = () => {
        initializePostHog();
        setIsInitialized(true);
      };

      window.addEventListener('posthog_consent_accepted', handleConsentAccepted);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('posthog_consent_accepted', handleConsentAccepted);
      };
    }
  }, []);

  return <>{children}</>;
}

