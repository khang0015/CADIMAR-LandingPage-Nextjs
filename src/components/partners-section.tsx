"use client";

import { SiTiktok, SiGoogle } from "react-icons/si";
import { Building2 } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";

export default function PartnersSection() {
  const { t } = useTranslations();

  const partners = [
    {
      name: "TikTok Marketing Partners",
      description: "Recognized as a TikTok Marketing Partner, we provide valuable insights to our clients, helping them effectively grow their business and presence on TikTok Ads.",
      icon: SiTiktok,
      bgColor: "bg-black"
    },
    {
      name: "Google Premier Partner",
      description: "Ranked among the top 10 Google Agencies in APAC and recognized as a Google Premier Partner, highlighting our exceptional services and remarkable performance.",
      icon: SiGoogle,
      bgColor: "bg-gradient-to-br from-blue-500 to-green-500"
    },
    {
      name: "Microsoft Partner",
      description: "Trusted by Microsoft as a top solution partner, Mega Digital delivered an effective and efficient performance strategy for our global clients.",
      icon: Building2,
      bgColor: "bg-gradient-to-br from-blue-400 to-blue-600"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-white via-green-50 to-emerald-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-green-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-emerald-400 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-green-600 font-semibold text-sm uppercase tracking-wider mb-4">
            {t("partners.tagline")}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("partners.title")}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {partners.map((partner, index) => {
            const IconComponent = partner.icon;
            return (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-white/50 hover:border-green-200">
                <div className={`w-20 h-20 mx-auto mb-6 ${partner.bgColor} rounded-2xl flex items-center justify-center shadow-md`}>
                  <IconComponent className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{partner.name}</h3>
                <p className="text-gray-600 leading-relaxed">{partner.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
