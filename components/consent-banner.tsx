'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, BarChart3, Shield } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { initializePostHog } from '@/lib/posthog';

export function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations('consent');

  useEffect(() => {
    // Check if user has already seen the banner
    const consent = localStorage.getItem('posthog_consent');
    if (!consent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    } else if (consent === 'accepted' || consent === 'dismissed') {
      // If already consented or dismissed, initialize PostHog
      initializePostHog();
      window.dispatchEvent(new Event('posthog_consent_accepted'));
    }
  }, []);

  const handleDismiss = () => {
    // By dismissing, user consents to analytics
    localStorage.setItem('posthog_consent', 'accepted');
    setIsVisible(false);
    initializePostHog();
    
    // Dispatch custom event for PostHogProvider
    window.dispatchEvent(new Event('posthog_consent_accepted'));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom duration-300">
      <div className="mx-auto max-w-5xl">
        <div className="bg-background/95 backdrop-blur-sm border border-chart-2/30 rounded-lg shadow-2xl p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          <div className="flex items-start gap-4 flex-1">
            <div className="rounded-full bg-chart-2/10 p-2 shrink-0">
              <BarChart3 className="h-5 w-5 text-chart-2" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm md:text-base mb-1 flex items-center gap-2">
                <Shield className="h-4 w-4 text-chart-2" />
                {t('title')}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                {t('description')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Button
              onClick={handleDismiss}
              variant="ghost"
              size="icon"
              className="shrink-0"
              aria-label={t('dismiss')}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

