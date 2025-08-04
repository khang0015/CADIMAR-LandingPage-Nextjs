"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/use-translations";
import { Calendar, Clock, ArrowLeft, Star } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';

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

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [slug, setSlug] = useState<string>("");
  const { currentLanguage } = useTranslations();

  useEffect(() => {
    params.then(resolvedParams => {
      setSlug(resolvedParams.slug);
    });
  }, [params]);

  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: ["/api/blogs", slug],
    queryFn: async () => {
      const response = await fetch(`/api/blogs/${slug}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Blog post not found");
        }
        throw new Error("Failed to fetch blog post");
      }
      return response.json();
    },
    enabled: !!slug
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLanguage === 'vi' ? 'vi-VN' : 'en-US', {
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
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-800 rounded-lg w-1/4"></div>
            <div className="h-12 bg-gray-800 rounded-lg w-3/4"></div>
            <div className="h-6 bg-gray-800 rounded-lg w-1/2"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 bg-gray-800 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-dark-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            {currentLanguage === 'vi' ? 'Không tìm thấy bài viết' : 'Blog Post Not Found'}
          </h1>
          <p className="text-gray-400 mb-8">
            {currentLanguage === 'vi' 
              ? 'Bài viết bạn đang tìm không tồn tại hoặc đã bị xóa.'
              : 'The blog post you are looking for does not exist or has been removed.'
            }
          </p>
          <Link href="/blogs">
            <Button className="bg-brand-red hover:bg-red-600">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {currentLanguage === 'vi' ? 'Về trang blog' : 'Back to Blog'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-primary">
      {/* Header */}
      <div className="bg-gradient-to-r from-dark-primary via-dark-secondary to-dark-primary border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Back Button */}
            <Link href="/blogs">
              <Button variant="ghost" className="text-gray-400 hover:text-white mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {currentLanguage === 'vi' ? 'Về trang blog' : 'Back to Blog'}
              </Button>
            </Link>

            {/* Post Meta */}
            <div className="flex items-center space-x-4 mb-6">
              {post.featured && (
                <Badge className="bg-brand-red text-white flex items-center space-x-1">
                  <Star className="h-3 w-3" />
                  <span>{currentLanguage === 'vi' ? 'Nổi bật' : 'Featured'}</span>
                </Badge>
              )}
              <Badge variant="outline" className="text-gray-400 border-gray-600">
                {post.lang.toUpperCase()}
              </Badge>
              <div className="flex items-center text-sm text-gray-400 space-x-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{getReadingTime(post.content)} min read</span>
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-300 leading-relaxed">
              {post.excerpt}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-lg prose-invert max-w-none"
        >
          <div className="text-gray-300 leading-relaxed">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold text-white mb-6 mt-8">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold text-white mb-4 mt-8">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-bold text-white mb-3 mt-6">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="text-gray-300">{children}</li>
                ),
                strong: ({ children }) => (
                  <strong className="text-white font-semibold">{children}</strong>
                ),
                a: ({ children, href }) => (
                  <a href={href} className="text-brand-red hover:text-red-400 underline transition-colors">
                    {children}
                  </a>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-brand-red pl-4 italic text-gray-400 my-6">
                    {children}
                  </blockquote>
                ),
                code: ({ children }) => (
                  <code className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-sm">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-gray-800 text-gray-300 p-4 rounded-lg overflow-x-auto mb-4">
                    {children}
                  </pre>
                )
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </motion.article>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 p-8 bg-dark-secondary border border-gray-800 rounded-xl text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            {currentLanguage === 'vi' 
              ? 'Sẵn sàng thúc đẩy thương hiệu của bạn?' 
              : 'Ready to grow your brand?'
            }
          </h3>
          <p className="text-gray-300 mb-6">
            {currentLanguage === 'vi'
              ? 'Liên hệ với chúng tôi để tìm hiểu cách chúng tôi có thể giúp bạn đạt được mục tiêu quảng cáo TikTok.'
              : 'Get in touch to learn how we can help you achieve your TikTok advertising goals.'
            }
          </p>
          <Link href="/#contact">
            <Button className="bg-brand-red hover:bg-red-600 text-white px-8">
              {currentLanguage === 'vi' ? 'Liên hệ ngay' : 'Get In Touch'}
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 