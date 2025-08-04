"use client";

import { Star, TrendingUp, Users, BarChart3, Play } from "lucide-react";
import { SiTiktok, SiGoogle, SiStripe, SiPaypal } from "react-icons/si";
import { Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "@/hooks/use-translations";
import { AnimatedText, TypewriterText, CountUp } from "./animated-text";
import TikTokPhoneMockup from "./tiktok-phone-mockup";
import Image from "next/image";

export default function HeroSection() {
  const { t } = useTranslations();

  return (
    <section className="pt-16 pb-8 h-screen flex items-center bg-gradient-to-br from-white via-green-50 to-emerald-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-green-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-emerald-400 rounded-full blur-3xl"></div>
      </div>

      {/* Enhanced Pixelated Dots Pattern - More Prominent */}
      <div className="absolute inset-0">
        {/* Top-right corner dots - More prominent */}
        <div className="absolute top-10 right-10 w-40 h-40">
          {[...Array(35)].map((_, i) => (
            <motion.div
              key={`top-right-${i}`}
              className="absolute w-1.5 h-1.5 bg-green-500 rounded-full shadow-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.4, 1, 0.4],
                scale: [0.6, 1.2, 0.6],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Bottom-left corner dots - More prominent */}
        <div className="absolute bottom-10 left-10 w-50 h-50">
          {[...Array(45)].map((_, i) => (
            <motion.div
              key={`bottom-left-${i}`}
              className="absolute w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [0.7, 1.3, 0.7],
              }}
              transition={{
                duration: 2.5 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Center-right dots - More prominent */}
        <div className="absolute top-1/2 right-20 w-32 h-32">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={`center-right-${i}`}
              className="absolute w-1.5 h-1.5 bg-green-400 rounded-full shadow-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 0.9, 0.3],
                scale: [0.5, 1.1, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        {/* Phone area dots - Much more concentrated and prominent */}
        <div className="absolute top-1/3 right-10 w-96 h-96">
          {[...Array(80)].map((_, i) => (
            <motion.div
              key={`phone-area-${i}`}
              className="absolute w-1.5 h-1.5 bg-green-300 rounded-full shadow-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [0.4, 0.9, 0.4],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Additional phone surrounding dots - More prominent */}
        <div className="absolute top-1/4 right-5 w-80 h-80">
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={`phone-surround-${i}`}
              className="absolute w-1.5 h-1.5 bg-emerald-300 rounded-full shadow-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.7, 0.2],
                scale: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        {/* Left content area dots - New prominent area */}
        <div className="absolute top-1/4 left-10 w-60 h-60">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={`left-content-${i}`}
              className="absolute w-1.5 h-1.5 bg-green-200 rounded-full shadow-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scale: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 2.5 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2.5,
              }}
            />
          ))}
        </div>

        {/* Center area dots - New prominent area */}
        <div className="absolute top-1/3 left-1/3 w-40 h-40">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`center-area-${i}`}
              className="absolute w-1.5 h-1.5 bg-emerald-200 rounded-full shadow-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.1, 0.5, 0.1],
                scale: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 4,
              }}
            />
          ))}
        </div>

        {/* Enhanced scattered dots across the background */}
        <div className="absolute inset-0">
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={`scattered-${i}`}
              className="absolute w-1.5 h-1.5 bg-green-300 rounded-full shadow-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.7, 0.2],
                scale: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 4,
              }}
            />
          ))}
        </div>

        {/* Floating accent dots - Larger and more prominent */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`accent-${i}`}
              className="absolute w-2 h-2 bg-green-500 rounded-full shadow-md"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1.5, 0.5],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Centered and Larger */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-6">
              <AnimatedText delay={0.0}>
                <div className="flex items-center justify-center lg:justify-start space-x-4 mb-6">
                  <div className="relative">
                    <Image 
                      src="/cadimar_logo.png" 
                      alt="CADIMAR Logo" 
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">CADIMAR</h2>
                    <p className="text-green-600 font-semibold text-sm uppercase tracking-wider">
                      TikTok Ads Specialists
                    </p>
                  </div>
                </div>
              </AnimatedText>
              <AnimatedText delay={0.2}>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                  <span>Driving brand growth on</span><br />
                  <span className="text-green-600">meaningful</span><br />
                  <span>platforms</span>
                </h1>
              </AnimatedText>
            </div>
            
            <AnimatedText delay={0.4}>
              <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                We help you design effective sales channels on the world's most influential platforms and drive revenue through organic discovery and paid campaigns.
              </p>
            </AnimatedText>

            {/* Trust Indicators */}
            <AnimatedText delay={0.5}>
              <div className="space-y-4">
                <motion.div 
                  className="flex items-center justify-center lg:justify-start space-x-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <div className="flex text-green-500">
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
                  <span className="text-sm text-gray-600">Review us on Trustpilot</span>
                </motion.div>
                
                <p className="text-sm font-semibold text-gray-500">Trusted by industry leaders</p>
                
                {/* Partner Logos */}
                <motion.div 
                  className="flex items-center justify-center lg:justify-start space-x-8 opacity-70"
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
                      <Icon className="text-xl text-gray-700" />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </AnimatedText>

            {/* Stats */}
            <AnimatedText delay={0.8}>
              <div className="grid grid-cols-3 gap-6 pt-4">
                <div className="text-center">
                  <CountUp end={500} suffix="+" className="text-xl font-bold text-green-600" delay={1.5} />
                  <p className="text-xs text-gray-500 mt-2">Campaigns</p>
                </div>
                <div className="text-center">
                  <CountUp end={50} suffix="M+" className="text-xl font-bold text-green-600" delay={1.7} />
                  <p className="text-xs text-gray-500 mt-2">Views</p>
                </div>
                <div className="text-center">
                  <CountUp end={300} suffix="%" className="text-xl font-bold text-green-600" delay={1.9} />
                  <p className="text-xs text-gray-500 mt-2">ROI Increase</p>
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