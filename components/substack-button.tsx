"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { usePostHogTracking } from "@/lib/posthog";
import { getSubstackUrl } from "@/lib/substack";
import { useTranslations } from "next-intl";

type SubstackButtonProps = {
  source: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
};

export function SubstackButton({
  source,
  size = "lg",
  variant = "default",
  className,
}: SubstackButtonProps) {
  const t = useTranslations("blog");
  const { track } = usePostHogTracking();
  const substackUrl = getSubstackUrl(source);

  const handleClick = () => {
    track("navigation_clicked", {
      destination: substackUrl,
      source,
    });
    track("external_link_clicked", {
      platform: "substack",
      destination: substackUrl,
      source,
    });
  };

  return (
    <Button
      size={size}
      variant={variant}
      className={className}
      asChild
    >
      <a
        href={substackUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
      >
        <ExternalLink className="mr-2 h-4 w-4" />
        {t("visitSubstack")}
      </a>
    </Button>
  );
}
