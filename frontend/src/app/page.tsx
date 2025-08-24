import Header from "@/components/mainpage/header";
import HeroSection from "@/components/mainpage/hero-section";
import ServicesSection from "@/components/mainpage/services-section";
import PartnersSection from "@/components/mainpage/partners-section";
import TestimonialsSection from "@/components/mainpage/testimonials-section";
import BlogSection from "@/components/mainpage/blog-section";
import InsightsSection from "@/components/mainpage/insights-section";
import ContactSection from "@/components/mainpage/contact-section";
import Footer from "@/components/mainpage/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Structured Data for Homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "CADIMAR",
            "url": "https://cadimar.net",
            "logo": "https://cadimar.net/cadimar_logo.png",
            "description": "Leading digital advertising agency specializing in TikTok, Facebook, Google, and Microsoft advertising with proven 300% ROI increase and 500+ successful campaigns.",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "US"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "url": "https://cadimar.net/#contact",
              "availableLanguage": "English"
            },
            "sameAs": [
              "https://www.facebook.com/cadimar",
              "https://www.linkedin.com/company/cadimar",
              "https://twitter.com/cadimar"
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Digital Advertising Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "TikTok Advertising",
                    "description": "Professional TikTok advertising campaigns with viral content creation and advanced targeting."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Facebook Advertising",
                    "description": "Expert Facebook and Instagram advertising with audience insights and retargeting."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Google Ads",
                    "description": "Precision-targeted Google Ads campaigns including search, display, and YouTube advertising."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Microsoft Advertising",
                    "description": "Professional Microsoft Ads management with B2B targeting and enterprise solutions."
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

      <Header />
      <HeroSection />
      <ServicesSection />
      <PartnersSection />
      <TestimonialsSection />
      <BlogSection />
      <InsightsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
