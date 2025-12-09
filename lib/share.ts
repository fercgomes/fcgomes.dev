export type ShareChannel = "copy" | "email" | "linkedin" | "x";

export type UTMParams = {
  source: ShareChannel;
  medium?: string;
  campaign?: string;
  content?: string;
};

export function buildShareUrl(
  baseUrl: string,
  utm: UTMParams
): string {
  const url = new URL(baseUrl);
  url.searchParams.set("utm_source", utm.source);
  url.searchParams.set("utm_medium", utm.medium ?? "referral");
  url.searchParams.set("utm_campaign", utm.campaign ?? "share-profile");
  if (utm.content) {
    url.searchParams.set("utm_content", utm.content);
  }
  return url.toString();
}

export function getShareUrlForChannel(
  baseUrl: string,
  channel: ShareChannel,
  utmContent?: string
): string {
  return buildShareUrl(baseUrl, {
    source: channel,
    content: utmContent,
  });
}

export function getLinkedInShareUrl(shareUrl: string): string {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
}

export function getXShareUrl(shareUrl: string, text?: string): string {
  const params = new URLSearchParams({ url: shareUrl });
  if (text) params.set("text", text);
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

export function getEmailShareUrl(
  shareUrl: string,
  subject: string,
  body: string
): string {
  const fullBody = `${body}\n\n${shareUrl}`;
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fullBody)}`;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function canUseWebShare(): boolean {
  return typeof navigator !== "undefined" && !!navigator.share;
}

export async function triggerWebShare(
  shareUrl: string,
  title: string,
  text?: string
): Promise<boolean> {
  if (!canUseWebShare()) return false;
  try {
    await navigator.share({
      title,
      text,
      url: shareUrl,
    });
    return true;
  } catch {
    return false;
  }
}

