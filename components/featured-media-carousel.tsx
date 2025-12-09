"use client";

import Image from "next/image";
import { ImageLightbox } from "@/components/image-lightbox";
import { useTranslations } from "next-intl";
import { usePostHogTracking } from "@/lib/posthog";
import { useEffect, useRef } from "react";

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

export function FeaturedMediaCarousel() {
  const t = useTranslations("media");
  const { track } = usePostHogTracking();
  const mediaRefs = useRef<Map<string, boolean>>(new Map());
  const mediaItemKeys = [
    "fokvs-web-demo",
    "fokvs-app-demo",
    "churn-reduction",
    "mau-growth",
    "subscribers-growth",
    "unisim-gui",
    "churrosfm-demo",
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
      type: key.includes("demo")
        ? "video"
        : key.includes("chart")
        ? "chart"
        : "image",
      src: getMediaSrc(key),
      project: key.includes("anyfunnel") ? "anyfunnel" : "Fokvs",
      orientation: key === "fokvs-app-demo" ? "portrait" : undefined,
    };
  });

  function getMediaSrc(key: string): string {
    const srcMap: Record<string, string> = {
      "fokvs-web-demo": "/media/videos/demo_fokvs_full.mp4",
      "fokvs-app-demo": "/media/videos/demo_fokvs_app.mp4",
      "churn-reduction": "/media/images/churn_chart.png",
      "mau-growth": "/media/images/mau.png",
      "subscribers-growth": "/media/images/subscribers_chart.png",
      "unisim-gui": "/media/images/unisim.png",
      "churrosfm-demo": "/media/videos/churros.mp4",
    };
    return srcMap[key] || "";
  }

  if (mediaItems.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-foreground">{t("featured")}</h3>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
        {mediaItems.map((item) => (
          <MediaSlide
            key={item.id}
            item={item}
            track={track}
            mediaRefs={mediaRefs}
            t={t}
          />
        ))}
      </div>
      <div className="flex justify-end mt-2">
        <a
          href="#projects-heading"
          className="text-sm text-chart-2 hover:text-chart-2/80 transition-colors"
        >
          {t("backToTop")}
        </a>
      </div>
    </div>
  );
}

function MediaSlide({
  item,
  track,
  mediaRefs,
  t,
}: {
  item: MediaItem;
  track: ReturnType<typeof usePostHogTracking>["track"];
  mediaRefs: React.MutableRefObject<Map<string, boolean>>;
  t: ReturnType<typeof useTranslations<"media">>;
}) {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!itemRef.current || mediaRefs.current.get(item.id)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !mediaRefs.current.get(item.id)) {
            mediaRefs.current.set(item.id, true);
            track("media_item_viewed", {
              media_id: item.id,
              media_type: item.type,
              source: "projects_carousel",
            });
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, [item.id, item.type, track, mediaRefs]);

  return (
    <div
      ref={itemRef}
      className="min-w-[280px] max-w-[320px] snap-start flex flex-col gap-2"
      title={item.title}
    >
      <div className="relative w-full h-[240px] rounded-xl overflow-hidden bg-black border border-border">
        {(item.type === "image" || item.type === "chart") && (
          <ImageLightbox
            src={item.src}
            alt={item.alt}
            title={item.title}
            description={item.description}
            imageId={item.id}
            section="media"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 320px"
              priority
            />
          </ImageLightbox>
        )}
        {item.type === "video" && (
          <video
            src={item.src}
            controls
            className="w-full h-full object-cover bg-black"
            preload="metadata"
            onPlay={() =>
              track("video_played", {
                media_id: item.id,
                section: "projects_carousel",
              })
            }
          >
            {t("videoNotSupported")}
          </video>
        )}
      </div>
      <div className="text-sm font-semibold text-foreground">{item.title}</div>
      {item.description && (
        <p className="text-xs text-muted-foreground leading-snug">{item.description}</p>
      )}
    </div>
  );
}

