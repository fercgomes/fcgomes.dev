"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { ShareModal, useShareModal } from "@/components/share-modal";

type BlogShareButtonProps = {
  postTitle: string;
  postSlug: string;
  utmContent?: string;
};

export function BlogShareButton({
  postTitle,
  postSlug,
  utmContent,
}: BlogShareButtonProps) {
  const { open, setOpen, openShare } = useShareModal(
    utmContent || `blog-${postSlug}`
  );

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={openShare}
        className="border-chart-2/30 hover:border-chart-2 hover:bg-chart-2/10 transition-all duration-300"
        aria-label={`Share ${postTitle}`}
      >
        <Share2 className="h-4 w-4 sm:mr-2" aria-hidden="true" />
        <span className="hidden sm:inline">Share</span>
      </Button>
      <ShareModal
        open={open}
        onOpenChange={setOpen}
        utmContent={utmContent || `blog-${postSlug}`}
        isBlogPost={true}
        postTitle={postTitle}
      />
    </>
  );
}
