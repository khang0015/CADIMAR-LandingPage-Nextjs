import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Advertising Services - TikTok, Facebook, Google & Microsoft Ads | CADIMAR",
  description: "Professional digital advertising services across TikTok, Facebook, Google, and Microsoft platforms. Proven 300% ROI increase with 500+ successful campaigns. Expert team delivering measurable growth for your business.",
  keywords: [
    "TikTok advertising services",
    "Facebook ads management", 
    "Google ads services",
    "Microsoft advertising",
    "digital marketing services",
    "social media advertising",
    "PPC management",
    "performance marketing",
    "ROI optimization",
    "campaign management",
    "advertising agency services",
    "digital advertising solutions",
    "CADIMAR services"
  ],
  authors: [{ name: "CADIMAR Team" }],
  creator: "CADIMAR",
  publisher: "CADIMAR",
  metadataBase: new URL("https://cadimar.net"),
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Digital Advertising Services - TikTok, Facebook, Google & Microsoft Ads",
    description: "Professional digital advertising services with proven 300% ROI increase. Expert management across all major platforms including TikTok, Facebook, Google, and Microsoft advertising.",
    url: "/services",
    siteName: "CADIMAR",
    images: [
      {
        url: "/og-services.jpg",
        width: 1200,
        height: 630,
        alt: "CADIMAR digital advertising services - TikTok, Facebook, Google, Microsoft ads",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Advertising Services - TikTok, Facebook, Google & Microsoft Ads",
    description: "Professional digital advertising services with proven 300% ROI increase. Expert management across all major platforms.",
    images: ["/og-services.jpg"],
    creator: "@cadimar",
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
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Structured Data for Services */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "CADIMAR Digital Advertising Services",
            "url": "https://cadimar.net/services",
            "description": "Professional digital advertising services across TikTok, Facebook, Google, and Microsoft platforms with proven 300% ROI increase.",
            "provider": {
              "@type": "Organization",
              "name": "CADIMAR",
              "url": "https://cadimar.net"
            },
            "areaServed": "Worldwide",
            "serviceType": "Digital Advertising Agency",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Digital Advertising Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "TikTok Advertising",
                    "description": "Professional TikTok advertising campaigns with viral content creation, influencer partnerships, and advanced targeting for maximum reach and engagement."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service", 
                    "name": "Facebook Advertising",
                    "description": "Expert Facebook and Instagram advertising with social media campaigns, audience insights, and retargeting strategies."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Google Ads",
                    "description": "Precision-targeted Google Ads campaigns including search campaigns, display network, shopping ads, and YouTube advertising."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Microsoft Advertising",
                    "description": "Professional Microsoft Ads management with Bing search ads, LinkedIn integration, B2B targeting, and enterprise solutions."
                  }
                }
              ]
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "500",
              "bestRating": "5"
            }
          }),
        }}
      />
      {children}
    </>
  );
}
