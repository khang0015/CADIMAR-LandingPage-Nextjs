"use client";

import { Star, TrendingUp, Users, BarChart3, Play } from "lucide-react";
import { SiTiktok, SiGoogle, SiStripe, SiPaypal } from "react-icons/si";
import { Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "@/hooks/use-translations";
import { AnimatedText, TypewriterText, CountUp } from "./animated-text";
import TikTokPhoneMockup from "./tiktok-phone-mockup";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const { t } = useTranslations();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Enhanced random-looking pattern with vibrant colors
  const createRandomDots = (count: number, area: { minX: number, maxX: number, minY: number, maxY: number }) => {
    const dots = [];
    // Use deterministic positions based on index to avoid hydration mismatch
    for (let i = 0; i < count; i++) {
      const seed1 = Math.sin(i * 12.9898) * 43758.5453123;
      const seed2 = Math.sin(i * 78.233) * 43758.5453123;
      const randomX = (seed1 - Math.floor(seed1)) * (area.maxX - area.minX) + area.minX;
      const randomY = (seed2 - Math.floor(seed2)) * (area.maxY - area.minY) + area.minY;
      
      dots.push({
        left: randomX,
        top: randomY,
        delay: (i % 10) * 0.2,
        size: 1 + (i % 3) * 0.5, // Different sizes: 1, 1.5, 2
        intensity: 0.4 + (i % 4) * 0.2, // Different intensities
      });
    }
    return dots;
  };

  const floatingDots = createRandomDots(40, { minX: 0, maxX: 100, minY: 0, maxY: 100 });
  const accentDots = createRandomDots(15, { minX: 20, maxX: 80, minY: 20, maxY: 80 });
  const edgeDots = createRandomDots(25, { minX: 0, maxX: 100, minY: 0, maxY: 100 });

  return (
    <section className="pt-16 pb-8 h-screen flex items-center bg-gradient-to-br from-white via-green-50 to-emerald-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-green-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-emerald-400 rounded-full blur-3xl"></div>
      </div>

      {/* Enhanced Random Dot Pattern with Vibrant Colors */}
      {mounted && (
        <div className="absolute inset-0">
          {/* Main floating dots with vibrant colors */}
          <div className="absolute inset-0">
            {floatingDots.map((dot, i) => (
              <motion.div
                key={`floating-${i}`}
                className={`absolute rounded-full shadow-lg ${
                  i % 4 === 0 ? 'bg-gradient-to-br from-green-400 to-emerald-500' :
                  i % 4 === 1 ? 'bg-gradient-to-br from-blue-400 to-cyan-500' :
                  i % 4 === 2 ? 'bg-gradient-to-br from-purple-400 to-pink-500' :
                  'bg-gradient-to-br from-orange-400 to-red-500'
                }`}
                style={{
                  left: `${dot.left}%`,
                  top: `${dot.top}%`,
                  width: `${dot.size}px`,
                  height: `${dot.size}px`,
                }}
                initial={{ opacity: 0, scale: 0, rotate: 0 }}
                animate={{ 
                  opacity: [0, dot.intensity * 0.8, dot.intensity * 0.3, dot.intensity * 0.8],
                  scale: [0, 1.2, 0.8, 1.2],
                  rotate: [0, 180, 360],
                  y: [0, -10, 0, 10, 0],
                }}
                transition={{
                  duration: 6 + (i % 3),
                  repeat: Infinity,
                  delay: dot.delay,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Accent dots with glow effect */}
          <div className="absolute inset-0">
            {accentDots.map((dot, i) => (
              <motion.div
                key={`accent-${i}`}
                className={`absolute rounded-full ${
                  i % 3 === 0 ? 'bg-green-500 shadow-green-500/50' :
                  i % 3 === 1 ? 'bg-blue-500 shadow-blue-500/50' :
                  'bg-purple-500 shadow-purple-500/50'
                } shadow-2xl`}
                style={{
                  left: `${dot.left}%`,
                  top: `${dot.top}%`,
                  width: `${dot.size + 1}px`,
                  height: `${dot.size + 1}px`,
                  boxShadow: `0 0 ${dot.size * 4}px currentColor`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 0.9, 0.4, 0.9],
                  scale: [0, 1.5, 1, 1.5],
                  x: [0, 15, -10, 15, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  delay: dot.delay + 1,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Edge sparkle dots */}
          <div className="absolute inset-0">
            {edgeDots.map((dot, i) => (
              <motion.div
                key={`edge-${i}`}
                className="absolute w-1 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                style={{
                  left: `${dot.left}%`,
                  top: `${dot.top}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0, 1, 0],
                  scale: [0, 2, 1, 2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: dot.delay * 1.5,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      )}
      
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
                      priority
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