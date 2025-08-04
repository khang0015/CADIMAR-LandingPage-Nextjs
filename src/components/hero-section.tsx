"use client";

import { Star, TrendingUp, Users, BarChart3, Play } from "lucide-react";
import { SiTiktok, SiGoogle, SiStripe, SiPaypal } from "react-icons/si";
import { Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "@/hooks/use-translations";
import { AnimatedText, TypewriterText, CountUp } from "./animated-text";
import TikTokPhoneMockup from "./tiktok-phone-mockup";

export default function HeroSection() {
  const { t } = useTranslations();

  return (
    <section className="pt-16 pb-8 h-screen flex items-center bg-gradient-to-br from-white via-green-50 to-green-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-brand-green rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-brand-green-light rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <AnimatedText delay={0.0}>
                <div className="flex items-center space-x-3 mb-4">
                  <img src="/cadimar-logo.jpg" alt="CADIMAR" className="h-12 w-auto" />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{t("brand.name")}</h2>
                    <p className="text-brand-green font-semibold text-xs uppercase tracking-wider">
                      {t("hero.tagline")}
                    </p>
                  </div>
                </div>
              </AnimatedText>
              <AnimatedText delay={0.2}>
                <h1 className="text-3xl md:text-5xl font-bold leading-tight text-gray-900">
                  <span>{t("hero.title_1")}</span><br />
                  <span>{t("hero.title_2")}</span><br />
                  <TypewriterText 
                    text={t("hero.title_highlight")} 
                    className="text-brand-green"
                    delay={1}
                  /><br />
                  <span>{t("hero.title_3")}</span>
                </h1>
              </AnimatedText>
            </div>
            
            <AnimatedText delay={0.4}>
              <p className="text-lg text-gray-700 leading-relaxed max-w-lg">
                {t("hero.description")}
              </p>
            </AnimatedText>

            {/* Trust Indicators */}
            <AnimatedText delay={0.5}>
              <div className="space-y-3">
                <motion.div 
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <div className="flex text-green-400">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 + i * 0.1, duration: 0.3 }}
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </motion.div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{t("hero.trustpilot")}</span>
                </motion.div>
                
                <p className="text-sm font-semibold text-gray-400">{t("hero.trusted_by")}</p>
                
                {/* Partner Logos */}
                <motion.div 
                  className="flex items-center space-x-6 opacity-70"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 0.7, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  {[SiTiktok, SiGoogle, Building2, SiStripe, SiPaypal].map((Icon, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.3 + index * 0.1, duration: 0.3 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      <Icon className="text-xl" />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </AnimatedText>

            {/* Stats */}
            <AnimatedText delay={0.8}>
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="text-center">
                  <CountUp end={500} suffix="+" className="text-xl font-bold text-brand-red" delay={1.5} />
                  <p className="text-xs text-gray-400 mt-1">Campaigns</p>
                </div>
                <div className="text-center">
                  <CountUp end={50} suffix="M+" className="text-xl font-bold text-brand-red" delay={1.7} />
                  <p className="text-xs text-gray-400 mt-1">Views</p>
                </div>
                <div className="text-center">
                  <CountUp end={300} suffix="%" className="text-xl font-bold text-brand-red" delay={1.9} />
                  <p className="text-xs text-gray-400 mt-1">ROI Increase</p>
                </div>
              </div>
            </AnimatedText>
          </div>

          {/* Right Content - TikTok Phone Mockup */}
          <motion.div 
            className="relative flex justify-center items-center h-full max-h-96"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="scale-50 lg:scale-75">
              <TikTokPhoneMockup />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 