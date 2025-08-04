"use client";

import { ArrowRight, Download, Store, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/use-translations";

export default function InsightsSection() {
  const { t } = useTranslations();

  const articles = [
    {
      title: "How To Redownload TikTok After Ban - 2025 Full Guideline",
      date: "JULY 25, 2025",
      category: "How To",
      icon: Download,
      bgGradient: "from-emerald-500 via-teal-600 to-cyan-700"
    },
    {
      title: "How To Become A TikTok Shop Affiliate: A Guide For Creators",
      date: "JULY 18, 2025", 
      category: "Guide",
      icon: Store,
      bgGradient: "from-violet-500 via-purple-600 to-indigo-700"
    },
    {
      title: "TikTok Campaign: The Complete Guide For Advertisers In 2025",
      date: "JULY 10, 2025",
      category: "Campaign",
      icon: TrendingUp,
      bgGradient: "from-orange-500 via-red-500 to-pink-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-16">
          <div>
            <p className="text-brand-red font-semibold text-sm uppercase tracking-wider mb-4">
              {t("insights.tagline")}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              {t("insights.title")}
            </h2>
          </div>
          <Button 
            variant="outline"
            className="hidden md:inline-flex items-center space-x-2 border-gray-300 text-gray-700 rounded-full px-6 py-3 hover:bg-brand-red hover:text-white hover:border-brand-red transition-colors group"
          >
            <span>{t("insights.read_all")}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => {
            const IconComponent = article.icon;
            return (
              <article key={index} className="bg-white rounded-2xl overflow-hidden hover:scale-105 hover:-translate-y-2 transition-all duration-500 group cursor-pointer shadow-lg hover:shadow-2xl border border-gray-100">
                <div className={`h-48 bg-gradient-to-br ${article.bgGradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <IconComponent className="text-white text-4xl mb-2 mx-auto" />
                      <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <IconComponent className="text-white text-xl" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 bg-brand-red text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {article.category}
                  </div>
                </div>
                <div className="p-6 relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red to-pink-500"></div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-brand-red transition-colors leading-tight">
                    {article.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-500 text-sm font-medium">{article.date}</p>
                    <ArrowRight className="text-gray-400 group-hover:text-brand-red group-hover:translate-x-1 transition-all duration-300 w-4 h-4" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
