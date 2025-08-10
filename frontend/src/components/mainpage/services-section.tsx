"use client";

import { ArrowRight } from "lucide-react";
import { SiTiktok, SiGoogle, SiFacebook } from "react-icons/si";
import { Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/use-translations";
import { AnimatedText } from "./animated-text";

export default function ServicesSection() {
  const { t } = useTranslations();

  const platforms = [
    {
      name: t("platforms.tiktok.name"),
      description: t("platforms.tiktok.description"),
      cta: t("platforms.tiktok.cta"),
      icon: SiTiktok,
      bgGradient: "from-gray-900 to-black",
      hoverColor: "hover:bg-white hover:text-black"
    },
    {
      name: t("platforms.google.name"),
      description: t("platforms.google.description"),
      cta: t("platforms.google.cta"),
      icon: SiGoogle,
      bgGradient: "from-green-700 to-green-900",
      hoverColor: "hover:bg-white hover:text-green-700"
    },
    {
      name: t("platforms.microsoft.name"),
      description: t("platforms.microsoft.description"),
      cta: t("platforms.microsoft.cta"),
      icon: Building2,
      bgGradient: "from-emerald-700 to-emerald-900",
      hoverColor: "hover:bg-white hover:text-emerald-700"
    },
    {
      name: t("platforms.facebook.name"),
      description: t("platforms.facebook.description"),
      cta: t("platforms.facebook.cta"),
      icon: SiFacebook,
      bgGradient: "from-teal-700 to-teal-900",
      hoverColor: "hover:bg-white hover:text-teal-700"
    }
  ];

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Mystical dark background with gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      
      {/* Animated gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-purple-500/10 to-blue-500/10 animate-pulse"></div>
      
      {/* Floating geometric shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-green-400/20 to-purple-500/20 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-green-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-blue-500/20 rounded-full blur-xl animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-gradient-to-br from-green-400/20 to-purple-500/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <AnimatedText delay={0.1}>
            <p className="text-green-400 font-semibold text-sm uppercase tracking-wider mb-4 drop-shadow-lg">
              {t("services.tagline")}
            </p>
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
              {t("services.title")}
            </h2>
          </AnimatedText>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {platforms.map((platform, index) => {
            const IconComponent = platform.icon;
            return (
              <motion.div 
                key={index}
                className={`bg-gradient-to-br ${platform.bgGradient} text-white rounded-2xl p-8 group hover:scale-105 transition-all duration-300 shadow-2xl border border-white/10 hover:border-green-400/30 backdrop-blur-sm`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <IconComponent className="text-3xl drop-shadow-md" />
                  <h3 className="text-2xl font-bold drop-shadow-md">{platform.name}</h3>
                </div>
                <p className="text-gray-200 mb-6 leading-relaxed">
                  {platform.description}
                </p>
                <Button 
                  variant="outline"
                  className={`inline-flex items-center space-x-2 border-white/40 rounded-full px-6 py-3 ${platform.hoverColor} transition-colors group backdrop-blur-sm hover:border-green-300/60`}
                >
                  <span>{platform.cta}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
