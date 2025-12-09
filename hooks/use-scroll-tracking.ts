'use client';

import { useEffect, useRef } from 'react';
import { usePostHogTracking } from '@/lib/posthog';

export function useScrollTracking() {
  const { track } = usePostHogTracking();
  const trackedDepths = useRef<Set<number>>(new Set());
  const trackedSections = useRef<Map<string, boolean>>(new Map());

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);

      // Track scroll depth milestones
      const milestones = [25, 50, 75, 100];
      milestones.forEach((milestone) => {
        if (scrollPercentage >= milestone && !trackedDepths.current.has(milestone)) {
          trackedDepths.current.add(milestone);
          track('scroll_depth_reached', { depth: milestone });
        }
      });

      // Track section views
      const sections = [
        'hero',
        'metrics',
        'experience',
        'projects',
        'media',
        'journey',
        'education',
        'skills',
        'personal',
      ];

      sections.forEach((sectionId) => {
        const element = document.getElementById(`${sectionId}-heading`);
        if (element && !trackedSections.current.get(sectionId)) {
          const rect = element.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
            trackedSections.current.set(sectionId, true);
            track('section_viewed', {
              section: sectionId,
              method: 'scroll',
            });
          }
        }
      });
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [track]);
}

