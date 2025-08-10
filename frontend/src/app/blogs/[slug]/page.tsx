"use client";

import React, { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  ChevronLeft, 
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Bookmark,
  Star
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ApiClient } from "@/lib/api-client";
import { getImageUrl, formatDate, getFirstTag } from "@/lib/blog-helpers";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  featured: boolean;
  status: string;
  lang: string;
  meta_title: string;
  meta_description: string;
  tags: string;
  author_name: string;
  author_avatar_url: string;
  author_position: string;
  reading_time: number;
  published_at: string;
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: Props) {
  const resolvedParams = use(params);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch blog post by slug
        console.log('Fetching blog with slug:', resolvedParams.slug);
        const postResponse = await ApiClient.getBlogBySlug(resolvedParams.slug);
        console.log('Raw API response:', postResponse);
        
        const foundPost = (postResponse as any).data;
        console.log('Extracted post data:', foundPost);
        
        if (!foundPost) {
          console.log('No post found, calling notFound()');
          notFound();
          return;
        }
        
        console.log('Setting post:', foundPost);
        setPost(foundPost);
        
        // Fetch all blogs for related posts
        console.log('Fetching all blogs for related posts...');
        const blogsResponse = await ApiClient.getBlogs();
        console.log('All blogs response:', blogsResponse);
        const blogs = Array.isArray(blogsResponse) ? blogsResponse : (blogsResponse as any).data || [];
        console.log('Extracted blogs array:', blogs);
        
        // Fetch related posts (same tag or random if no tag match)
        const firstTag = getFirstTag(foundPost.tags);
        const related = blogs
          .filter((blog: BlogPost) => 
            blog.id !== foundPost.id && 
            blog.status === 'published' &&
            (firstTag && blog.tags ? blog.tags.includes(firstTag) : true)
          )
          .slice(0, 3);
        
        console.log('Related posts:', related);
        setRelatedPosts(related);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-pulse space-y-8 max-w-3xl mx-auto p-8">
          <div className="h-8 bg-gray-200 rounded-lg w-3/4"></div>
          <div className="h-60 bg-gray-200 rounded-lg"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Post not found'}
          </h1>
          <Link 
            href="/blogs"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Back to blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header with back button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link 
            href="/blogs" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Blogs
          </Link>
        </div>
      </div>

      {/* Main content */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Article header */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="mb-4">
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
              {getFirstTag(post.tags)}
            </span>
            {post.featured && (
              <span className="inline-block ml-2 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                <Star className="w-3 h-3 mr-1 inline" fill="currentColor" />
                Featured
              </span>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {post.excerpt}
          </p>
          
          {/* Author and meta info */}
          <div className="flex items-center justify-between flex-wrap gap-4 pb-8 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              {post.author_avatar_url ? (
                <Image
                  src={getImageUrl(post.author_avatar_url)}
                  alt={post.author_name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              ) : (
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {post.author_name.charAt(0)}
                </div>
              )}
              <div>
                <p className="font-semibold text-gray-900">{post.author_name}</p>
                {post.author_position && (
                  <p className="text-sm text-gray-600">{post.author_position}</p>
                )}
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(post.published_at)}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.reading_time} min read
                  </span>
                </div>
              </div>
            </div>
            
            {/* Share buttons */}
            <div className="flex items-center space-x-2">
              <button className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
              <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.header>

        {/* Featured image */}
        {post.featured_image && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <Image
              src={getImageUrl(post.featured_image)}
              alt={post.title}
              width={800}
              height={450}
              className="w-full rounded-lg shadow-xl"
            />
          </motion.div>
        )}

        {/* Article content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div 
            className="blog-content prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-a:text-blue-600 prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:p-4 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-img:rounded-lg prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.div>

        {/* Tags */}
        {post.tags && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.split(',').map((tag, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Social sharing */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-b border-gray-200 py-8 mb-12"
        >
          <div className="flex items-center justify-center space-x-4">
            <span className="text-gray-600 font-medium">Share this article:</span>
            <div className="flex space-x-3">
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Facebook className="w-4 h-4 mr-2" />
                Facebook
              </button>
              <button className="flex items-center px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors">
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </button>
              <button className="flex items-center px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </button>
            </div>
          </div>
        </motion.div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.id}
                  href={`/blogs/${relatedPost.slug}`}
                  className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {relatedPost.featured_image && (
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={getImageUrl(relatedPost.featured_image)}
                        alt={relatedPost.title}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block">
                      {getFirstTag(relatedPost.tags)}
                    </span>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </article>

      {/* Newsletter subscription */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated with Our Latest Insights
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and never miss our latest articles on digital innovation, technology trends, and business transformation.
            </p>
            <div className="max-w-md mx-auto space-y-4">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-blue-200 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
              />
              <button className="w-full bg-white text-blue-700 hover:bg-gray-100 py-3 px-6 rounded-lg text-base font-medium transition-colors">
                Subscribe Now
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}