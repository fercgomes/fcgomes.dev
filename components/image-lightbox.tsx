"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ZoomIn } from "lucide-react";
import { usePostHogTracking } from "@/lib/posthog";

type ImageLightboxProps = {
  src: string;
  alt: string;
  children: React.ReactNode;
  title?: string;
  description?: string;
  imageId?: string;
  section?: 'projects' | 'media';
  projectName?: string;
};

export function ImageLightbox({
  src,
  alt,
  children,
  title,
  description,
  imageId,
  section,
  projectName,
}: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { track } = usePostHogTracking();

  return (
    <>
      <div
        className="relative group cursor-pointer"
        onClick={() => {
          setIsOpen(true);
          track('image_lightbox_opened', {
            image_id: imageId || src,
            section: section || 'unknown',
            project_name: projectName,
          });
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(true);
            track('image_lightbox_opened', {
              image_id: imageId || src,
              section: section || 'unknown',
              project_name: projectName,
            });
          }
        }}
        aria-label={`Click to expand ${alt}`}
      >
        {children}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-md">
          <div className="bg-background/90 backdrop-blur-sm rounded-full p-3 transform scale-90 group-hover:scale-100 transition-all duration-300 shadow-lg">
            <ZoomIn className="h-5 w-5 text-chart-2" />
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          showCloseButton={false}
          className="max-w-7xl w-full p-0 gap-0 bg-black/95 backdrop-blur-sm border-none data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95"
        >
          <div className="relative w-full h-[90vh] flex items-center justify-center p-4 md:p-8">
            {(title || description) && (
              <div className="absolute top-4 left-4 z-50 bg-background/90 backdrop-blur-sm rounded-lg p-4 max-w-md shadow-xl">
                {title && (
                  <DialogTitle className="text-lg font-semibold mb-1">
                    {title}
                  </DialogTitle>
                )}
                {description && (
                  <DialogDescription className="text-sm text-muted-foreground">
                    {description}
                  </DialogDescription>
                )}
              </div>
            )}

            <div className="relative w-full h-full">
              <Image
                src={src}
                alt={alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
                quality={95}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

