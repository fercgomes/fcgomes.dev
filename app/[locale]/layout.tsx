import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { PostHogProvider } from '@/components/posthog-provider';
import { ConsentBanner } from '@/components/consent-banner';
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Fernando Gomes | Founding Engineer & CTO",
    template: "%s | Fernando Gomes",
  },
  description:
    "Founding engineer and CTO who takes products from prototype to scale. Built and operated the entire Fokvs engineering stack while scaling to 100K+ users. Expert in TypeScript, Node.js, AWS, AI/ML, and payments infrastructure.",
  keywords: [
    "CTO",
    "Founding Engineer",
    "Full-Stack Engineer",
    "TypeScript",
    "Node.js",
    "NestJS",
    "AWS",
    "Infrastructure",
    "AI/ML",
    "LLM",
    "Payments",
    "EdTech",
    "Software Engineering",
    "Technical Leadership",
    "Porto Alegre",
    "Brazil",
  ],
  authors: [{ name: "Fernando Gomes" }],
  creator: "Fernando Gomes",
  publisher: "Fernando Gomes",
  metadataBase: new URL("https://fcgomes.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fcgomes.dev",
    title: "Fernando Gomes | Founding Engineer & CTO",
    description:
      "Founding engineer and CTO who takes products from prototype to scale. Built and operated the entire Fokvs engineering stack while scaling to 100K+ users.",
    siteName: "Fernando Gomes",
    images: [
      {
        url: "https://fcgomes.dev/media/images/fernando.jpeg",
        width: 886,
        height: 886,
        alt: "Fernando Gomes - Founding Engineer & CTO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fernando Gomes | Founding Engineer & CTO",
    description:
      "Founding engineer and CTO who takes products from prototype to scale. Built and operated the entire Fokvs engineering stack while scaling to 100K+ users.",
    creator: "@fercgomes",
    images: ["https://fcgomes.dev/media/images/fernando.jpeg"],
  },
  icons: {
    icon: [
      { url: "/media/images/fernando.jpeg", sizes: "32x32", type: "image/jpeg" },
      { url: "/media/images/fernando.jpeg", sizes: "16x16", type: "image/jpeg" },
    ],
    apple: [
      { url: "/media/images/fernando.jpeg", sizes: "180x180", type: "image/jpeg" },
    ],
    shortcut: "/media/images/fernando.jpeg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // In next-intl v4, getMessages() should automatically detect locale from route params
  // But we can also explicitly pass locale to ensure it works correctly
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          <PostHogProvider>
            {children}
            <ConsentBanner />
          </PostHogProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
