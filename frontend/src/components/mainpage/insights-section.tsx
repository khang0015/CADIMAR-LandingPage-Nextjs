"use client";

import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/use-translations";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function InsightsSection() {
  const { t } = useTranslations();

  const articles = [
    {
      title: "The Future of Consumer Trust",
      description: "Explore how brands can build lasting consumer trust by balancing personalization with privacy and embracing authenticity.",
      date: "Aug 24, 2025",
      readTime: "4 min read",
      slug: "future-of-consumer-trust",
      category: "Trust"
    },
    {
      title: "From Clicks to Communities",
      description: "Discover why the most successful brands are shifting from clicks and conversions to building authentic, thriving communities.",
      date: "Jul 14, 2025",
      readTime: "5 min read",
      slug: "from-clicks-to-communities",
      category: "Strategy"
    },
    {
      title: "AI-Driven Creativity in Marketing",
      description: "Learn how AI is transforming digital marketing by accelerating creativity, personalization, and campaign effectiveness.",
      date: "May 20, 2025",
      readTime: "5 min read",
      slug: "ai-driven-creativity-marketing", 
      category: "Technology"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white via-green-50 to-emerald-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-green-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl"></div>
      </div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.p 
            className="text-green-600 font-semibold text-sm uppercase tracking-wider mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t("insights.tagline")}
          </motion.p>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Expert perspectives 
          </motion.h2>
          <motion.p 
            className="text-gray-600 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Strategic insights and proven methodologies from our digital marketing experts
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Link
              key={`insight-${article.slug}-${index}`}
              href={`/blogs/${article.slug}`}
              aria-label={`Read insight article: ${article.title} - ${article.description}`}
              title={`Read more about ${article.title}`}
            >
              <motion.article
                className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden hover:scale-105 hover:-translate-y-2 transition-all duration-500 group cursor-pointer shadow-lg hover:shadow-2xl border border-white/60 hover:border-green-200/80"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
              {/* Image Header */}
              <div className="h-48 relative overflow-hidden">
                <Image
                  src={`/blogs/${article.slug}.jpg`}
                  alt={`Featured image for insight article: ${article.title} - ${article.description.substring(0, 80)}...`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute top-4 left-4 bg-green-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {article.category}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between text-white/90 text-xs">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-3 h-3" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-green-600 transition-colors leading-tight">
                  {article.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {article.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-medium group-hover:text-green-700 transition-colors">
                    Read More →
                  </span>
                </div>
              </div>
            </motion.article>
            </Link>
          ))}
        </div>
        
        {/* View All Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link href="/blogs">
            <Button
              variant="outline"
              className="inline-flex items-center space-x-2 border-green-600 text-green-600 rounded-full px-8 py-3 hover:bg-green-600 hover:text-white hover:border-green-600 transition-colors group"
              aria-label="View all insight articles and expert perspectives on digital marketing, AI, consumer trust, and community building"
              title="Explore all our expert insights and strategic perspectives"
            >
              <span>{t("insights.read_all")}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
