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
      bgGradient: "from-green-800 to-green-900",
      hoverColor: "hover:bg-white hover:text-green-800"
    },
    {
      name: t("platforms.microsoft.name"),
      description: t("platforms.microsoft.description"),
      cta: t("platforms.microsoft.cta"),
      icon: Building2,
      bgGradient: "from-blue-600 to-blue-800",
      hoverColor: "hover:bg-white hover:text-blue-800"
    },
    {
      name: t("platforms.facebook.name"),
      description: t("platforms.facebook.description"),
      cta: t("platforms.facebook.cta"),
      icon: SiFacebook,
      bgGradient: "from-blue-900 to-indigo-900",
      hoverColor: "hover:bg-white hover:text-indigo-900"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50 text-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <AnimatedText delay={0.1}>
            <p className="text-brand-red font-semibold text-sm uppercase tracking-wider mb-4">
              {t("services.tagline")}
            </p>
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
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
                className={`bg-gradient-to-br ${platform.bgGradient} text-white rounded-2xl p-8 group hover:scale-105 transition-transform duration-300`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <IconComponent className="text-3xl" />
                  <h3 className="text-2xl font-bold">{platform.name}</h3>
                </div>
                <p className="text-gray-200 mb-6 leading-relaxed">
                  {platform.description}
                </p>
                <Button 
                  variant="outline"
                  className={`inline-flex items-center space-x-2 border-white rounded-full px-6 py-3 ${platform.hoverColor} transition-colors group`}
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
