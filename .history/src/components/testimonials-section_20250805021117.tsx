"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "@/hooks/use-translations";
import { AnimatedText } from "./animated-text";
import Image from "next/image";
import { SiTiktok, SiGoogle, SiFacebook, SiAmazon, SiShopify, SiStripe, SiApple, SiNetflix, SiSpotify, SiUber, SiAirbnb, SiLinkedin } from "react-icons/si";

export default function TestimonialsSection() {
  const { t } = useTranslations();

  const testimonials = [
    {
      name: "Jakub Wieckowski",
      title: "Shopify Expert",
      review: "Exceptional TikTok advertising results! Our revenue increased by 300% within the first quarter. The team's expertise and strategic approach made all the difference.",
      initial: "J",
      bgColor: "from-purple-500 to-indigo-600",
      image: "/testimonials/OIP.jpg"
    },
    {
      name: "Luca Caporale", 
      title: "Salesforce Business Administrator at AALTO SRL",
      review: "Professional service with outstanding results. They transformed our social media presence and delivered measurable ROI. Highly recommend their TikTok advertising expertise.",
      initial: "L",
      bgColor: "from-indigo-500 to-blue-600",
      image: "/testimonials/OIP2.jpg"
    },
    {
      name: "Sarkawt Shaban",
      title: "CEO at PROTEX Co.",
      review: "The team delivered beyond expectations. Their strategic approach to TikTok advertising helped us reach new audiences and significantly boost our brand awareness.",
      initial: "S",
      bgColor: "from-blue-500 to-cyan-600",
      image: "/testimonials/sarkawt.jpg"
    }
  ];

  const brandsRow1 = [
    { name: "TikTok", icon: SiTiktok, color: "text-black" },
    { name: "Google", icon: SiGoogle, color: "text-blue-600" },
    { name: "Facebook", icon: SiFacebook, color: "text-blue-700" },
    { name: "Amazon", icon: SiAmazon, color: "text-orange-600" },
    { name: "Shopify", icon: SiShopify, color: "text-green-600" },
    { name: "Stripe", icon: SiStripe, color: "text-purple-600" }
  ];

  const brandsRow2 = [
    { name: "Apple", icon: SiApple, color: "text-gray-800" },
    { name: "Netflix", icon: SiNetflix, color: "text-red-600" },
    { name: "Spotify", icon: SiSpotify, color: "text-green-500" },
    { name: "Uber", icon: SiUber, color: "text-black" },
    { name: "Airbnb", icon: SiAirbnb, color: "text-pink-500" },
    { name: "LinkedIn", icon: SiLinkedin, color: "text-blue-600" }
  ];

  // Duplicate brands for seamless infinite scroll
  const duplicatedBrandsRow1 = [...brandsRow1, ...brandsRow1];
  const duplicatedBrandsRow2 = [...brandsRow2, ...brandsRow2];

  return (
    <>
      <section id="testimonials" className="py-20 bg-gradient-to-br from-slate-800 via-purple-900 to-slate-900 text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl"></div>
        </div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <AnimatedText delay={0.1}>
              <p className="text-purple-300 font-semibold text-sm uppercase tracking-wider mb-4">
                {t("testimonials.tagline")}
              </p>
            </AnimatedText>
            <AnimatedText delay={0.2}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {t("testimonials.title")}
              </h2>
            </AnimatedText>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/15 transition-colors border border-white/20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative w-16 h-16">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={64}
                      height={64}
                      className="rounded-full object-cover"
                    />
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${testimonial.bgColor} opacity-0 hover:opacity-30 transition-opacity duration-300`}></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-purple-200 text-sm">{testimonial.title}</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-200 leading-relaxed">"{testimonial.review}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Component - White Background Transition with Sliding Animation */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-green-500/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-emerald-400/10 rounded-full blur-2xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <motion.p 
              className="text-green-600 font-semibold text-sm uppercase tracking-wider mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Trusted by Industry Leaders
            </motion.p>
            <motion.h3 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Partnering with Global Brands
            </motion.h3>
          </div>

          {/* Sliding Brands Container */}
          <div className="relative overflow-hidden">
            {/* First sliding row */}
            <motion.div 
              className="flex items-center space-x-16 mb-8"
              animate={{ 
                x: [0, -50 * brandsRow1.length]
              }}
              transition={{ 
                duration: 30,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {duplicatedBrandsRow1.map((brand, index) => {
                const IconComponent = brand.icon;
                return (
                  <div
                    key={`first-${index}`}
                    className="flex flex-col items-center justify-center p-6 rounded-xl hover:bg-gray-50 transition-all duration-300 group min-w-[120px]"
                  >
                    <div className={`w-16 h-16 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 ${brand.color}`}>
                      <IconComponent className="text-4xl" />
                    </div>
                    <p className="text-sm font-medium text-gray-600 text-center">{brand.name}</p>
                  </div>
                );
              })}
            </motion.div>

            {/* Second sliding row (reverse direction) */}
            <motion.div 
              className="flex items-center space-x-16"
              animate={{ 
                x: [-50 * brandsRow2.length, 0]
              }}
              transition={{ 
                duration: 35,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {duplicatedBrandsRow2.map((brand, index) => {
                const IconComponent = brand.icon;
                return (
                  <div
                    key={`second-${index}`}
                    className="flex flex-col items-center justify-center p-6 rounded-xl hover:bg-gray-50 transition-all duration-300 group min-w-[120px]"
                  >
                    <div className={`w-16 h-16 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 ${brand.color}`}>
                      <IconComponent className="text-4xl" />
                    </div>
                    <p className="text-sm font-medium text-gray-600 text-center">{brand.name}</p>
                  </div>
                );
              })}
            </motion.div>

            {/* Gradient overlays for smooth fade effect */}
            <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
          </div>
        </div>
      </section>
    </>
  );
}
