import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/mainpage/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CADIMAR Digital Marketing Agency - Leading TikTok & Facebook Ads Experts",
  description: "CADIMAR is Vietnam's premier digital marketing agency. Expert TikTok Ads, Facebook Ads, and content marketing services. CADIMAR delivers 300% ROI growth for businesses. Contact CADIMAR today for free consultation.",
  keywords: "CADIMAR, CADIMAR digital marketing, CADIMAR agency, digital marketing agency vietnam, tiktok ads expert, facebook ads specialist, CADIMAR marketing, content marketing vietnam, social media marketing, online advertising expert",
  authors: [{ name: "CADIMAR Digital Marketing Team" }],
  creator: "CADIMAR",
  publisher: "CADIMAR Digital Marketing Agency",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: {
    canonical: "https://cadimar.net",
  },
  icons: {
    icon: "/cadimar_logo.png",
    apple: "/cadimar_logo.png",
  },
  verification: {
    google: "yS3_d3GYtP5B6hOKY5oliQzXJKx_etfqV9D8gZZA314",
  },
  openGraph: {
    type: "website",
    url: "https://cadimar.net",
    title: "CADIMAR Digital Marketing Agency - Leading TikTok & Facebook Ads Experts",
    description: "CADIMAR is Vietnam's premier digital marketing agency. Expert TikTok Ads, Facebook Ads, and content marketing services. CADIMAR delivers 300% ROI growth for businesses.",
    siteName: "CADIMAR Digital Marketing Agency",
    images: [
      {
        url: "https://cadimar.net/cadimar_logo.png",
        width: 800,
        height: 600,
        alt: "CADIMAR Digital Marketing Agency - Vietnam's Leading TikTok & Facebook Ads Experts",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CADIMAR Digital Marketing Agency - Leading TikTok & Facebook Ads Experts",
    description: "CADIMAR is Vietnam's premier digital marketing agency. Expert TikTok Ads, Facebook Ads, and content marketing services. CADIMAR delivers 300% ROI growth for businesses.",
    images: ["https://cadimar.net/cadimar_logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
