"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BlogSection() {
  const blogPosts = [
    {
      title: "The Future of Digital Innovation",
      excerpt: "Discover how emerging technologies are reshaping the business landscape and creating new opportunities for growth.",
      date: "Dec 15, 2024",
      readTime: "5 min read",
      category: "Innovation"
    },
    {
      title: "Digital Transformation Strategies",
      excerpt: "Learn the key strategies successful companies use to navigate their digital transformation journey.",
      date: "Dec 10, 2024",
      readTime: "7 min read",
      category: "Strategy"
    },
    {
      title: "AI in Modern Business",
      excerpt: "Explore how artificial intelligence is revolutionizing business operations and customer experiences.",
      date: "Dec 5, 2024",
      readTime: "6 min read",
      category: "Technology"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Latest Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest trends in digital innovation and business growth
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={index}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="h-48 bg-gradient-to-br from-brand-green to-brand-green-light"></div>
              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <span className="bg-brand-green/10 text-brand-green px-3 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <Link href="/blogs" className="inline-flex items-center text-brand-green hover:text-brand-green-dark font-medium">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link 
            href="/blogs"
            className="inline-flex items-center px-8 py-3 bg-brand-green text-white font-medium rounded-full hover:bg-brand-green-dark transition-colors"
          >
            View All Posts
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 