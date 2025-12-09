"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { ImageLightbox } from "@/components/image-lightbox";
import { useTranslations } from 'next-intl';
import { usePostHogTracking } from "@/lib/posthog";
import { useEffect, useRef } from 'react';

type MediaItem = {
  id: string;
  title: string;
  description?: string;
  type: "image" | "video" | "chart";
  src: string;
  alt: string;
  project?: string;
  orientation?: "portrait" | "landscape";
};

export function MediaShowcase() {
  const t = useTranslations('media');
  const { track } = usePostHogTracking();
  const mediaRefs = useRef<Map<string, boolean>>(new Map());
  const mediaItemKeys = [
    "fokvs-web-demo",
    "fokvs-app-demo",
    "churn-reduction",
    "mau-growth",
    "subscribers-growth",
    "team-photo",
    "anyfunnel-dashboard",
  ];
  
  const mediaItems: MediaItem[] = mediaItemKeys.map((key) => {
    const itemData = t.raw(`items.${key}`) as {
      title: string;
      description: string;
      alt?: string;
    };
    
    return {
      id: key,
      title: itemData.title,
      description: itemData.description,
      alt: itemData.alt || itemData.title,
      type: key.includes('demo') ? 'video' : key.includes('chart') ? 'chart' : 'image',
      src: getMediaSrc(key),
      project: key.includes('anyfunnel') ? 'anyfunnel' : 'Fokvs',
      orientation: key === 'fokvs-app-demo' ? 'portrait' : undefined,
    };
  });
  
  function getMediaSrc(key: string): string {
    const srcMap: Record<string, string> = {
      'fokvs-web-demo': '/media/videos/demo_fokvs_full.mp4',
      'fokvs-app-demo': '/media/videos/demo_fokvs_app.mp4',
      'churn-reduction': '/media/images/churn_chart.png',
      'mau-growth': '/media/images/mau.png',
      'subscribers-growth': '/media/images/subscribers_chart.png',
      'team-photo': '/media/images/team.jpeg',
      'anyfunnel-dashboard': '/media/images/anyfunnel.png',
    };
    return srcMap[key] || '';
  }

  if (mediaItems.length === 0) {
    return null;
  }

  const getColorClasses = (type: string) => {
    return {
      border: "border-l-chart-2",
      text: "text-chart-2",
    };
  };

  return (
    <section className="mb-16 md:mb-32" aria-labelledby="media-heading">
      <h2 id="media-heading" className="mb-8 md:mb-12 bg-gradient-to-r from-foreground to-chart-2 bg-clip-text text-2xl font-bold tracking-tight text-transparent md:text-4xl">
        {t('title')}
      </h2>
      <div className="grid gap-4 md:gap-6 md:grid-cols-2">
        {mediaItems.map((item) => (
          <MediaCard
            key={item.id}
            item={item}
            colors={getColorClasses(item.type)}
            track={track}
            mediaRefs={mediaRefs}
            t={t}
          />
        ))}
      </div>
    </section>
  );
}

function MediaCard({
  item,
  colors,
  track,
  mediaRefs,
  t,
}: {
  item: MediaItem;
  colors: ReturnType<typeof getColorClasses>;
  track: ReturnType<typeof usePostHogTracking>['track'];
  mediaRefs: React.MutableRefObject<Map<string, boolean>>;
  t: ReturnType<typeof useTranslations<'media'>>;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!itemRef.current || mediaRefs.current.get(item.id)) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !mediaRefs.current.get(item.id)) {
            mediaRefs.current.set(item.id, true);
            track('media_item_viewed', {
              media_id: item.id,
              media_type: item.type,
            });
          }
        });
      },
      { threshold: 0.5 }
    );
    
    observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, [item.id, item.type, track, mediaRefs]);
  
  return (
    <Card ref={itemRef} className={`border-l-4 ${colors.border} shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden`}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className={`text-lg ${colors.text}`}>{item.title}</CardTitle>
            {item.project && (
              <p className="text-xs text-muted-foreground mt-1">{item.project}</p>
            )}
          </div>
        </div>
        {item.description && (
          <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
        )}
      </CardHeader>
      <CardContent className="p-0">
        {item.type === "image" && (
          <ImageLightbox
            src={item.src}
            alt={item.alt}
            title={item.title}
            description={item.description}
            imageId={item.id}
            section="media"
          >
            <div className="relative w-full aspect-video bg-muted">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
              />
            </div>
          </ImageLightbox>
        )}
        {item.type === "video" && (
          <div className={`relative w-full ${item.orientation === "portrait" ? "aspect-[9/16] max-w-[280px] sm:max-w-sm mx-auto" : "aspect-video"} bg-muted`}>
            <video
              src={item.src}
              controls
              className="w-full h-full object-contain"
              preload="metadata"
              aria-label={item.alt}
              onPlay={() => track('video_played', { video_id: item.id })}
            >
              {t('videoNotSupported')}
            </video>
          </div>
        )}
        {item.type === "chart" && (
          <ImageLightbox
            src={item.src}
            alt={item.alt}
            title={item.title}
            description={item.description}
            imageId={item.id}
            section="media"
          >
            <div className="relative w-full aspect-video bg-muted">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
              />
            </div>
          </ImageLightbox>
        )}
      </CardContent>
    </Card>
  );
}
