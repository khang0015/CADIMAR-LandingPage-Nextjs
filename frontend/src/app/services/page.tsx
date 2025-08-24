"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Target, 
  Users, 
  BarChart3, 
  Zap, 
  Shield,
  CheckCircle,
  ArrowRight,
  Play,
  Star
} from "lucide-react";
import { SiTiktok, SiGoogle, SiFacebook } from "react-icons/si";
import { Building2 } from "lucide-react";
import Header from "@/components/mainpage/header";
import Footer from "@/components/mainpage/footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ServicesPage() {
  const [activeService, setActiveService] = useState("tiktok");

  // Scroll to service section when URL has hash
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setActiveService(hash);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  const services = [
    {
      id: "tiktok",
      name: "TikTok Ads",
      icon: SiTiktok,
      color: "from-black to-gray-800",
      description: "Dominate the fastest-growing social platform with viral campaigns",
      features: ["Viral Content Creation", "Influencer Partnerships", "Advanced Targeting", "Performance Analytics"],
      stats: { reach: "1B+", conversion: "300%", campaigns: "500+" },
      image: "https://www.searchenginejournal.com/wp-content/uploads/2022/01/tiktok-advertising-61f341558c8ee-sej-1280x720.png"
    },
    {
      id: "facebook",
      name: "Facebook Ads",
      icon: SiFacebook,
      color: "from-blue-600 to-blue-800",
      description: "Connect with your audience through the world's largest social network",
      features: ["Social Media Campaigns", "Instagram Integration", "Audience Insights", "Retargeting"],
      stats: { reach: "3B+", conversion: "220%", campaigns: "600+" },
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop&crop=center"
    },
    {
      id: "google",
      name: "Google Ads",
      icon: SiGoogle,
      color: "from-blue-600 to-green-600",
      description: "Capture high-intent customers with precision-targeted search campaigns",
      features: ["Search Campaigns", "Display Network", "Shopping Ads", "YouTube Advertising"],
      stats: { reach: "4B+", conversion: "250%", campaigns: "800+" },
      image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=600&h=400&fit=crop&crop=center"
    },
    {
      id: "microsoft",
      name: "Microsoft Ads",
      icon: Building2,
      color: "from-blue-500 to-blue-700",
      description: "Reach professional audiences with lower competition and higher ROI",
      features: ["Bing Search Ads", "LinkedIn Integration", "B2B Targeting", "Enterprise Solutions"],
      stats: { reach: "500M+", conversion: "280%", campaigns: "300+" },
      image: "https://about.ads.microsoft.com/content/dam/sites/msa-about/global/common/content-lib/blog/thumbnail/MSA_General_Thumbnail_02_407x229_2x.jpg"
    }
  ];

  const benefits = [
    {
      icon: Target,
      title: "Precision Targeting",
      description: "AI-powered audience segmentation for maximum relevance"
    },
    {
      icon: TrendingUp,
      title: "Proven Results",
      description: "Average 300% ROI increase across all campaigns"
    },
    {
      icon: Shield,
      title: "Brand Safety",
      description: "Advanced fraud protection and brand safety measures"
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Comprehensive reporting and performance insights"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-60 pb-20 bg-gradient-to-br from-gray-900 via-blue-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Our Services</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Comprehensive digital advertising solutions that drive real business growth across all major platforms
            </p>
            
            {/* Service Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <motion.button
                    key={service.id}
                    onClick={() => {
                      setActiveService(service.id);
                      document.getElementById(service.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all duration-300 ${
                      activeService === service.id 
                        ? 'bg-white text-gray-900 border-white' 
                        : 'bg-white/10 text-white border-white/30 hover:bg-white/20'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{service.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Cadimar?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We combine cutting-edge technology with proven strategies to deliver exceptional results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Detail Sections */}
      {services.map((service, index) => {
        const IconComponent = service.icon;
        const isEven = index % 2 === 0;
        
        return (
          <section 
            key={service.id} 
            id={service.id}
            className={`py-20 ${isEven ? 'bg-white' : 'bg-gray-50'}`}
          >
            <div className="container mx-auto px-6">
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Content */}
                <motion.div 
                  className={!isEven ? 'lg:col-start-2' : ''}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900">{service.name}</h2>
                  </div>
                  
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">{service.stats.reach}</div>
                      <div className="text-sm text-gray-500">Monthly Reach</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">{service.stats.conversion}</div>
                      <div className="text-sm text-gray-500">Avg ROI Increase</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">{service.stats.campaigns}</div>
                      <div className="text-sm text-gray-500">Campaigns Run</div>
                    </div>
                  </div>

                  <Button 
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-full"
                    onClick={() => {
                      window.open('https://app.cadimar.net/sign-up', '_blank');
                    }}
                  >
                    Get Started with {service.name}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>

                {/* Image */}
                <motion.div 
                  className={!isEven ? 'lg:col-start-1' : ''}
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={service.image}
                      alt={`${service.name} Service`}
                      width={600}
                      height={400}
                      className="w-full h-96 object-cover"
                      loading={index < 2 ? "eager" : "lazy"}
                      priority={index < 2}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{service.name} Excellence</h3>
                      <p className="text-gray-200">Proven strategies that deliver results</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-blue-600">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join hundreds of successful businesses that trust CADIMAR for their digital advertising needs
            </p>
            <Button 
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold"
              onClick={() => {
                window.open('https://app.cadimar.net/sign-up', '_blank');
              }}
            >
              Start Your Success Story
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
