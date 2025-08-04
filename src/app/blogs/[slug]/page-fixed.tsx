"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/use-translations";
import { Calendar, Clock, ArrowLeft, Star } from "lucide-react";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  lang: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { currentLang } = useTranslations();

  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: ["/api/blogs", params.slug],
    queryFn: async () => {
      const response = await fetch(`/api/blogs/${params.slug}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Blog post not found");
        }
        throw new Error("Failed to fetch blog post");
      }
      return response.json();
    },
    enabled: !!params.slug
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
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {currentLang === 'vi' ? 'Không tìm thấy bài viết' : 'Blog post not found'}
          </h1>
          <p className="text-gray-600 mb-8">
            {currentLang === 'vi' 
              ? 'Bài viết bạn đang tìm không tồn tại hoặc đã bị xóa.'
              : 'The blog post you are looking for does not exist or has been removed.'
            }
          </p>
          <Link href="/blogs">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {currentLang === 'vi' ? 'Quay lại blog' : 'Back to Blog'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-green-100">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/blogs">
              <Button variant="ghost" className="mb-8 hover:bg-green-100">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {currentLang === 'vi' ? 'Quay lại blog' : 'Back to Blog'}
              </Button>
            </Link>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                {post.featured && (
                  <Badge className="bg-yellow-100 text-yellow-800">
                    <Star className="h-3 w-3 mr-1" />
                    {currentLang === 'vi' ? 'Nổi bật' : 'Featured'}
                  </Badge>
                )}
                <Badge variant="outline">
                  {post.lang === 'vi' ? 'Tiếng Việt' : 'English'}
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                {post.title}
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex items-center space-x-6 text-gray-500">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{getReadingTime(post.content)} min read</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          <div 
            className="text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.article>

        {/* Related Posts or CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 p-8 bg-green-50 rounded-2xl"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {currentLang === 'vi' 
              ? 'Bạn thích bài viết này?' 
              : 'Did you enjoy this article?'
            }
          </h3>
          <p className="text-gray-600 mb-6">
            {currentLang === 'vi'
              ? 'Khám phá thêm nhiều bài viết khác về marketing TikTok và chiến lược số.'
              : 'Explore more articles about TikTok marketing and digital strategies.'
            }
          </p>
          <div className="flex space-x-4">
            <Link href="/blogs">
              <Button className="bg-green-600 hover:bg-green-700">
                {currentLang === 'vi' ? 'Xem thêm bài viết' : 'More Articles'}
              </Button>
            </Link>
            <Link href="/#contact">
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                {currentLang === 'vi' ? 'Liên hệ tư vấn' : 'Get Consultation'}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
