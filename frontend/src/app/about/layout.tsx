import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About CADIMAR - Leading Digital Advertising Agency | Our Story & Team",
  description: "Discover CADIMAR's journey from startup to leading digital advertising agency. Meet our expert team and learn how we've helped 500+ businesses achieve 300% ROI growth through innovative TikTok, Facebook, Google, and Microsoft advertising strategies.",
  keywords: [
    "about CADIMAR",
    "digital advertising agency",
    "marketing team",
    "company story",
    "TikTok advertising experts",
    "Facebook ads specialists", 
    "Google ads agency",
    "Microsoft ads professionals",
    "digital marketing team",
    "advertising agency history",
    "ROI growth experts",
    "performance marketing team",
    "CADIMAR story",
    "digital agency team"
  ],
  authors: [{ name: "CADIMAR Team" }],
  creator: "CADIMAR",
  publisher: "CADIMAR",
  metadataBase: new URL("https://cadimar.net"),
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About CADIMAR - Leading Digital Advertising Agency",
    description: "Meet the team behind 500+ successful campaigns and 300% average ROI growth. Discover our story, values, and expertise in TikTok, Facebook, Google, and Microsoft advertising.",
    url: "/about",
    siteName: "CADIMAR",
    images: [
      {
        url: "/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "CADIMAR team - Digital advertising experts and company story",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About CADIMAR - Leading Digital Advertising Agency",
    description: "Meet the team behind 500+ successful campaigns and 300% average ROI growth. Discover our story and expertise.",
    images: ["/og-about.jpg"],
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

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Structured Data for About Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "CADIMAR",
            "url": "https://cadimar.net",
            "logo": "https://cadimar.net/logo.png",
            "description": "Leading digital advertising agency specializing in TikTok, Facebook, Google, and Microsoft advertising with proven 300% ROI increase and 500+ successful campaigns.",
            "foundingDate": "2019",
            "numberOfEmployees": "25+",
            "slogan": "Growth architects building bridges between brands and audiences through innovative advertising strategies",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "US"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "url": "https://cadimar.net/contact",
              "availableLanguage": "English"
            },
            "sameAs": [
              "https://www.facebook.com/cadimar",
              "https://www.linkedin.com/company/cadimar",
              "https://twitter.com/cadimar"
            ],
            "award": [
              "Top Digital Agency 2022",
              "Best ROI Performance 2023",
              "Industry Excellence Award 2024"
            ],
            "knowsAbout": [
              "Digital Advertising",
              "TikTok Marketing",
              "Facebook Advertising",
              "Google Ads",
              "Microsoft Advertising", 
              "Performance Marketing",
              "ROI Optimization",
              "Social Media Marketing",
              "PPC Management",
              "Campaign Optimization"
            ],
            "hasCredential": [
              {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "Google Ads Certified",
                "recognizedBy": {
                  "@type": "Organization",
                  "name": "Google"
                }
              },
              {
                "@type": "EducationalOccupationalCredential", 
                "credentialCategory": "Facebook Marketing Partner",
                "recognizedBy": {
                  "@type": "Organization",
                  "name": "Meta"
                }
              }
            ],
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
