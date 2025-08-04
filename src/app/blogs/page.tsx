"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/use-translations";
import { Calendar, Clock, ArrowRight, Star } from "lucide-react";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  lang: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function BlogsPage() {
  const { currentLang } = useTranslations();
  const [selectedLang, setSelectedLang] = useState(currentLang);

  const { data: blogPosts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blogs", selectedLang],
    queryFn: async () => {
      const response = await fetch(`/api/blogs?lang=${selectedLang}`);
      if (!response.ok) throw new Error("Failed to fetch blog posts");
      return response.json();
    }
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLang === 'vi' ? 'vi-VN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const readingTime = Math.ceil(words / wordsPerMinute);
    return readingTime;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-primary">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-gray-800 rounded-lg w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 bg-gray-800 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-primary">
      {/* Header */}
      <div className="bg-gradient-to-r from-dark-primary via-dark-secondary to-dark-primary border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {currentLang === 'vi' ? 'Blog & Thông Tin' : 'Blog & Insights'}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {currentLang === 'vi' 
                ? 'Khám phá những thông tin mới nhất về quảng cáo TikTok, xu hướng marketing và chiến lược phát triển thương hiệu.'
                : 'Discover the latest insights on TikTok advertising, marketing trends, and brand growth strategies.'
              }
            </p>
          </motion.div>
        </div>
      </div>

      {/* Language Filter */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-center space-x-4">
          <Button
            variant={selectedLang === 'en' ? 'default' : 'outline'}
            onClick={() => setSelectedLang('en')}
            className={selectedLang === 'en' ? 'bg-brand-red hover:bg-red-600' : ''}
          >
            English
          </Button>
          <Button
            variant={selectedLang === 'vi' ? 'default' : 'outline'}
            onClick={() => setSelectedLang('vi')}
            className={selectedLang === 'vi' ? 'bg-brand-red hover:bg-red-600' : ''}
          >
            Tiếng Việt
          </Button>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        {blogPosts.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
          >
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-dark-secondary border-gray-800 hover:border-brand-red/50 transition-all duration-300 h-full group">
                  <CardHeader className="space-y-3">
                    <div className="flex items-center justify-between">
                      {post.featured && (
                        <Badge className="bg-brand-red text-white flex items-center space-x-1">
                          <Star className="h-3 w-3" />
                          <span>{currentLang === 'vi' ? 'Nổi bật' : 'Featured'}</span>
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-gray-400 border-gray-600">
                        {post.lang.toUpperCase()}
                      </Badge>
                    </div>
                    <CardTitle className="text-white group-hover:text-brand-red transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1 flex flex-col">
                    <p className="text-gray-300 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(post.createdAt)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{getReadingTime(post.excerpt)} min read</span>
                        </div>
                      </div>
                    </div>

                    <Link href={`/blogs/${post.slug}`}>
                      <Button 
                        className="w-full bg-brand-red hover:bg-red-600 text-white group-hover:bg-red-600 transition-all duration-300"
                      >
                        <span>{currentLang === 'vi' ? 'Đọc thêm' : 'Read More'}</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-gray-400 text-lg">
              {currentLang === 'vi' 
                ? 'Chưa có bài viết nào cho ngôn ngữ này.'
                : 'No blog posts available for this language.'
              }
            </div>
          </motion.div>
        )}
      </div>

      {/* Back to Home */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="text-center">
          <Link href="/">
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
              {currentLang === 'vi' ? '← Về trang chủ' : '← Back to Home'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 