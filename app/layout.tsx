import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  },
  twitter: {
    card: "summary_large_image",
    title: "Fernando Gomes | Founding Engineer & CTO",
    description:
      "Founding engineer and CTO who takes products from prototype to scale. Built and operated the entire Fokvs engineering stack while scaling to 100K+ users.",
    creator: "@fercgomes",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
        {children}
      </body>
    </html>
  );
}
