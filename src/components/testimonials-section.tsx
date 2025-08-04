"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "@/hooks/use-translations";
import { AnimatedText } from "./animated-text";

export default function TestimonialsSection() {
  const { t } = useTranslations();

  const testimonials = [
    {
      name: "Jakub Wieckowski",
      title: "Shopify Expert",
      review: "Exceptional TikTok advertising results! Our revenue increased by 300% within the first quarter. The team's expertise and strategic approach made all the difference.",
      initial: "J",
      bgColor: "from-yellow-400 to-orange-500"
    },
    {
      name: "Luca Caporale", 
      title: "Salesforce Business Administrator at AALTO SRL",
      review: "Professional service with outstanding results. They transformed our social media presence and delivered measurable ROI. Highly recommend their TikTok advertising expertise.",
      initial: "L",
      bgColor: "from-blue-400 to-blue-600"
    },
    {
      name: "Sarkawt Shaban",
      title: "CEO at PROTEX Co.",
      review: "The team delivered beyond expectations. Their strategic approach to TikTok advertising helped us reach new audiences and significantly boost our brand awareness.",
      initial: "S",
      bgColor: "from-red-500 to-pink-600"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-6">
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
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/15 transition-colors"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${testimonial.bgColor} flex items-center justify-center`}>
                  <span className="text-white font-bold text-xl">{testimonial.initial}</span>
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
  );
}
