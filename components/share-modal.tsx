"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link2, Mail, Linkedin, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { usePostHogTracking } from "@/lib/posthog";
import {
  getShareUrlForChannel,
  getLinkedInShareUrl,
  getXShareUrl,
  getEmailShareUrl,
  copyToClipboard,
  canUseWebShare,
  triggerWebShare,
  type ShareChannel,
} from "@/lib/share";

// X icon (formerly Twitter)
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

type ShareModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  utmContent?: string;
  isBlogPost?: boolean;
  postTitle?: string;
};

export function ShareModal({
  open,
  onOpenChange,
  utmContent,
  isBlogPost = false,
  postTitle,
}: ShareModalProps) {
  const t = useTranslations("share");
  const pathname = usePathname();
  const { track } = usePostHogTracking();
  const [copied, setCopied] = useState(false);

  const handleDialogChange = useCallback(
    (nextOpen: boolean) => {
      if (open && !nextOpen) {
        track("share_closed", { utm_content: utmContent });
      }
      onOpenChange(nextOpen);
    },
    [open, onOpenChange, track, utmContent]
  );

  const getBaseUrl = useCallback(() => {
    if (typeof window === "undefined") return "";
    // Remove locale prefix from pathname for cleaner URLs
    const cleanPath = pathname.replace(/^\/(en|pt-BR|sv)/, "") || "/";
    return `${window.location.origin}${cleanPath}`;
  }, [pathname]);

  const handleShare = useCallback(
    async (channel: ShareChannel) => {
      const baseUrl = getBaseUrl();
      const shareUrl = getShareUrlForChannel(baseUrl, channel, utmContent);

      track("share_clicked", {
        channel,
        utm_content: utmContent,
        url: shareUrl,
      });

      switch (channel) {
        case "copy":
          const success = await copyToClipboard(shareUrl);
          if (success) {
            track("share_copy_succeeded", {
              utm_content: utmContent,
              url: shareUrl,
            });
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } else {
            track("share_copy_failed", {
              utm_content: utmContent,
              url: shareUrl,
            });
          }
          break;
        case "email":
          track("share_channel_opened", {
            channel,
            utm_content: utmContent,
            url: shareUrl,
          });
          const emailSubject = isBlogPost
            ? t("blogPost.email.subject")
            : t("email.subject");
          const emailBody = isBlogPost
            ? `${t("blogPost.email.body")} ${postTitle || ""}`
            : t("email.body");
          window.location.href = getEmailShareUrl(
            shareUrl,
            emailSubject,
            emailBody
          );
          break;
        case "linkedin":
          track("share_channel_opened", {
            channel,
            utm_content: utmContent,
            url: shareUrl,
          });
          window.open(
            getLinkedInShareUrl(shareUrl),
            "_blank",
            "noopener,noreferrer"
          );
          break;
        case "x":
          track("share_channel_opened", {
            channel,
            utm_content: utmContent,
            url: shareUrl,
          });
          const xText = isBlogPost
            ? `${t("blogPost.x.text")}: ${postTitle || ""}`
            : t("x.text");
          window.open(
            getXShareUrl(shareUrl, xText),
            "_blank",
            "noopener,noreferrer"
          );
          break;
      }
    },
    [getBaseUrl, utmContent, track, t]
  );

  const handleWebShare = useCallback(async () => {
    const baseUrl = getBaseUrl();
    const shareUrl = getShareUrlForChannel(baseUrl, "copy", utmContent);

    track("share_clicked", {
      channel: "native",
      utm_content: utmContent,
      url: shareUrl,
    });

    const shareTitle = isBlogPost && postTitle ? postTitle : t("title");
    const shareText = isBlogPost && postTitle ? postTitle : t("description");
    const shared = await triggerWebShare(shareUrl, shareTitle, shareText);
    if (shared) {
      track("share_native_succeeded", {
        utm_content: utmContent,
        url: shareUrl,
      });
      onOpenChange(false);
    } else {
      track("share_native_failed", { utm_content: utmContent, url: shareUrl });
    }
  }, [getBaseUrl, utmContent, track, t, onOpenChange]);

  useEffect(() => {
    if (open) {
      track("share_opened", { utm_content: utmContent });
    }
  }, [open, track, utmContent]);

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-4">
          {canUseWebShare() && (
            <Button
              variant="default"
              className="w-full justify-start gap-3 bg-chart-2 hover:bg-chart-2/90 text-white"
              onClick={handleWebShare}
            >
              <Link2 className="h-4 w-4" />
              {t("channels.native")}
            </Button>
          )}
          <Button
            variant="outline"
            className="w-full justify-start gap-3"
            onClick={() => handleShare("copy")}
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Link2 className="h-4 w-4" />
            )}
            {copied ? t("channels.copied") : t("channels.copy")}
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start gap-3"
            onClick={() => handleShare("email")}
          >
            <Mail className="h-4 w-4" />
            {t("channels.email")}
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start gap-3"
            onClick={() => handleShare("linkedin")}
          >
            <Linkedin className="h-4 w-4" />
            {t("channels.linkedin")}
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start gap-3"
            onClick={() => handleShare("x")}
          >
            <XIcon className="h-4 w-4" />
            {t("channels.x")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Convenience hook for share modal state
export function useShareModal(utmContent?: string) {
  const [open, setOpen] = useState(false);
  const { track } = usePostHogTracking();

  const openShare = useCallback(() => {
    // Try native share first on supported devices
    if (canUseWebShare() && typeof window !== "undefined") {
      const pathname = window.location.pathname;
      const baseUrl = `${window.location.origin}${pathname}`;
      const shareUrl = getShareUrlForChannel(baseUrl, "copy", utmContent);

      track("share_clicked", {
        channel: "native",
        utm_content: utmContent,
        url: shareUrl,
      });

      const title =
        typeof window !== "undefined"
          ? document.title || "Fernando Gomes | Founding Engineer & CTO"
          : "Fernando Gomes | Founding Engineer & CTO";

      triggerWebShare(shareUrl, title).then((shared) => {
        if (!shared) {
          setOpen(true);
        }
      });
    } else {
      setOpen(true);
    }
  }, [utmContent, track]);

  return { open, setOpen, openShare };
}
