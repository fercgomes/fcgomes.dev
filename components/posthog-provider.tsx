'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const consent = localStorage.getItem('posthog_consent');
    if (consent === 'declined') {
      posthog.opt_out_capturing();
    }

    const handleConsentAccepted = () => {
      posthog.opt_in_capturing();
    };

    window.addEventListener('posthog_consent_accepted', handleConsentAccepted);
    return () => {
      window.removeEventListener('posthog_consent_accepted', handleConsentAccepted);
    };
  }, []);

  return <>{children}</>;
}
