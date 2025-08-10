"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  tags: string;
  author_name: string;
  reading_time: number;
  published_at: string;
}

export default function BlogSection() {
  // Hardcoded featured blog posts with local images
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "The Future of Digital Innovation",
      slug: "the-future-of-digital-innovation",
      excerpt: "Discover how emerging technologies are reshaping the business landscape and creating new opportunities for growth.",
      featured_image: "/blogs/future_of_digital_innovation.png",
      tags: "Innovation",
      author_name: "Alex Johnson",
      reading_time: 5,
      published_at: "2024-12-15T10:00:00Z"
    },
    {
      id: 2,
      title: "Digital Transformation Strategies",
      slug: "digital-transformation-strategies", 
      excerpt: "Learn the key strategies successful companies use to navigate their digital transformation journey.",
      featured_image: "/blogs/digital_transformation.jpg",
      tags: "Strategy",
      author_name: "Sarah Davis",
      reading_time: 7,
      published_at: "2024-12-10T14:30:00Z"
    },
    {
      id: 3,
      title: "AI in Modern Business",
      slug: "ai-in-modern-business",
      excerpt: "Explore how artificial intelligence is revolutionizing business operations and customer experiences.",
      featured_image: "/blogs/AI_in_modern_business.jpg", 
      tags: "Technology",
      author_name: "Michael Chen",
      reading_time: 6,
      published_at: "2024-12-05T09:15:00Z"
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getFirstTag = (tags: string) => {
    if (!tags) return 'Blog';
    return tags.split(',')[0].trim();
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-green-900 to-gray-800 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-64 h-64 bg-green-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl"></div>
      </div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Latest Insights
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Stay updated with the latest trends in digital innovation and business growth
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/15"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="h-48 relative overflow-hidden">
                <Image 
                  src={post.featured_image} 
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                  <span className="bg-green-600/20 text-green-300 px-3 py-1 rounded-full text-xs font-medium border border-green-500/30">
                    {getFirstTag(post.tags)}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.published_at)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.reading_time} min read</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">
                  {post.title}
                </h3>
                
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <Link href={`/blogs/${post.slug}`} className="inline-flex items-center text-green-400 hover:text-green-300 font-medium" aria-label="Read more about AI in Modern Business | The Future of Digital Innovation | Digital Transformation Strategies">
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
            className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
          >
            View All Posts
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 