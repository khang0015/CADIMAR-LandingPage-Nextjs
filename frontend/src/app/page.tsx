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
