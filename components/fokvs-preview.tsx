"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

type FokvsPreviewProps = {
  children: React.ReactNode;
};

export function FokvsPreview({ children }: FokvsPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");

  useEffect(() => {
    if (isHovered && containerRef.current) {
      const updatePosition = () => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const scrollY = window.scrollY;
        const scrollX = window.scrollX;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const previewWidth = 320; // w-80 = 320px
        const previewHeight = 220; // Approximate height
        const gap = 12; // Gap between text and preview

        const halfWidth = previewWidth / 2;
        const minLeft = scrollX + halfWidth + 16;
        const maxLeft = scrollX + viewportWidth - halfWidth - 16;

        // Calculate available space in each direction
        const spaceBelow = viewportHeight - (rect.bottom - scrollY);
        const spaceAbove = rect.top - scrollY;
        const spaceRight = viewportWidth - (rect.right - scrollX);
        const spaceLeft = rect.left - scrollX;

        let top: number;
        let left: number;

        // Prefer positioning below, but check if there's enough space
        if (spaceBelow >= previewHeight + gap) {
          // Position below, centered on the text
          top = rect.bottom + scrollY + gap;
          left = rect.left + scrollX + rect.width / 2;
        } else if (spaceAbove >= previewHeight + gap) {
          // Position above if more space there
          top = rect.top + scrollY - previewHeight - gap;
          left = rect.left + scrollX + rect.width / 2;
        } else {
          // Not enough vertical space, position to the side
          if (spaceRight >= previewWidth + gap) {
            // Position to the right
            top = rect.top + scrollY;
            left = rect.right + scrollX + gap + halfWidth;
          } else if (spaceLeft >= previewWidth + gap) {
            // Position to the left
            top = rect.top + scrollY;
            left = rect.left + scrollX - gap - halfWidth;
          } else {
            // Fallback: position below, centered
            top = rect.bottom + scrollY + gap;
            left = rect.left + scrollX + rect.width / 2;
          }
        }

        // Ensure preview stays within viewport bounds
        if (left < minLeft) {
          left = minLeft;
        } else if (left > maxLeft) {
          left = maxLeft;
        }

        // Ensure preview doesn't go below viewport
        const maxTop = scrollY + viewportHeight - previewHeight - 16;
        if (top > maxTop) {
          top = maxTop;
        }

        // Ensure preview doesn't go above viewport
        const minTop = scrollY + 16;
        if (top < minTop) {
          top = minTop;
        }

        setPosition({ top, left });
      };

      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        updatePosition();
      });

      // Update on scroll/resize
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);

      return () => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("resize", updatePosition);
      };
    } else {
      setPosition(null);
    }
  }, [isHovered]);

  return (
    <>
      <span
        ref={containerRef}
        className="relative inline-block cursor-pointer font-semibold text-chart-2 transition-all duration-200 hover:text-chart-2/80"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        role="button"
        tabIndex={0}
        aria-label={`${tCommon("fokvs")} - ${t("fokvsPreview.title")}`}
      >
        {children}
      </span>

      {typeof window !== "undefined" &&
        isHovered &&
        createPortal(
          <div
            ref={previewRef}
            className="fixed z-50 w-80 animate-in fade-in-0 zoom-in-95 duration-200"
            style={
              position
                ? {
                    top: `${position.top}px`,
                    left: `${position.left}px`,
                    transform: "translateX(-50%)",
                  }
                : { visibility: "hidden" }
            }
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Card className="border-chart-2/30 shadow-xl">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg text-chart-2">
                    {tCommon("fokvs")}
                  </CardTitle>
                  <a
                    href="https://fokvs.com.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-chart-2 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={tCommon("visitFokvs")}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div
                  className="text-sm text-muted-foreground leading-relaxed [&_strong]:font-semibold [&_strong]:text-foreground"
                  dangerouslySetInnerHTML={{
                    __html: t.raw("fokvsPreview.description"),
                  }}
                />
              </CardContent>
            </Card>
          </div>,
          document.body
        )}
    </>
  );
}
