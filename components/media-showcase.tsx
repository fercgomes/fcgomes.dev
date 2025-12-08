import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { ImageLightbox } from "@/components/image-lightbox";

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
  const mediaItems: MediaItem[] = [
    {
      id: "fokvs-web-demo",
      title: "Fokvs Web Platform Demo",
      description: "Complete walkthrough of the Fokvs web application showcasing key features and functionality",
      type: "video",
      src: "/media/videos/demo_fokvs_full.mp4",
      alt: "Video demonstration of Fokvs web platform features and user interface",
      project: "Fokvs",
    },
    {
      id: "fokvs-app-demo",
      title: "Fokvs Mobile App Demo",
      description: "Demonstration of the Fokvs mobile application features and user experience",
      type: "video",
      src: "/media/videos/demo_fokvs_app.mp4",
      alt: "Video demonstration of Fokvs mobile app features and functionality",
      project: "Fokvs",
      orientation: "portrait",
    },
    {
      id: "churn-reduction",
      title: "Churn Reduction",
      description: "Churn rate declined from 50% to 10% over the course of 2025",
      type: "chart",
      src: "/media/images/churn_chart.png",
      alt: "Line chart showing churn rate decline from 50% in January 2025 to 10% by end of year",
      project: "Fokvs",
    },
    {
      id: "mau-growth",
      title: "Monthly Active Users Growth",
      description: "MAU and WAU evolution showing significant growth starting in March 2025",
      type: "chart",
      src: "/media/images/mau.png",
      alt: "Line chart showing Monthly Active Users and Weekly Active Users growth from 2024 to 2025",
      project: "Fokvs",
    },
    {
      id: "subscribers-growth",
      title: "Active Subscriptions Growth",
      description: "Subscriptions grew from 0 to 300+ active subscribers",
      type: "chart",
      src: "/media/images/subscribers_chart.png",
      alt: "Line chart showing active subscriptions growth from December 2023 to July 2025, reaching over 300 subscribers",
      project: "Fokvs",
    },
    {
      id: "team-photo",
      title: "Fokvs Team",
      description: "Our team at the Tecnopuc office in Porto Alegre",
      type: "image",
      src: "/media/images/team.jpeg",
      alt: "Fokvs team members at Tecnopuc office",
      project: "Fokvs",
    },
    {
      id: "anyfunnel-dashboard",
      title: "AnyFunnel Analytics Dashboard",
      description: "Data lake project with AI chat interface for querying sales funnel data and generating visualizations",
      type: "image",
      src: "/media/images/anyfunnel.png",
      alt: "AnyFunnel analytics dashboard showing sales funnel visualizations and data querying interface",
      project: "anyfunnel",
    },
  ];

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
    <section className="mb-32" aria-labelledby="media-heading">
      <h2 id="media-heading" className="mb-12 bg-gradient-to-r from-foreground to-chart-2 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
        Featured Work
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {mediaItems.map((item) => {
          const colors = getColorClasses(item.type);
          return (
            <Card key={item.id} className={`border-l-4 ${colors.border} shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden`}>
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
                  >
                    <div className="relative w-full aspect-video bg-muted">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading="lazy"
                      />
                    </div>
                  </ImageLightbox>
                )}
                {item.type === "video" && (
                  <div className={`relative w-full ${item.orientation === "portrait" ? "aspect-[9/16] max-w-sm mx-auto" : "aspect-video"} bg-muted`}>
                    <video
                      src={item.src}
                      controls
                      className="w-full h-full object-contain"
                      preload="metadata"
                      aria-label={item.alt}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
                {item.type === "chart" && (
                  <ImageLightbox
                    src={item.src}
                    alt={item.alt}
                    title={item.title}
                    description={item.description}
                  >
                    <div className="relative w-full aspect-video bg-muted">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-contain p-4"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading="lazy"
                      />
                    </div>
                  </ImageLightbox>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

