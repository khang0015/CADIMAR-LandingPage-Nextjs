"use client";

import React, { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "@/hooks/use-translations";
import { 
  Calendar, 
  Clock, 
  ChevronLeft, 
  Share2, 
  Star,
  Facebook,
  Twitter,
  Linkedin,
  Bookmark 
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from 'react-markdown';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  lang: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

// Dữ liệu blog tĩnh
const staticBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Digital Innovation",
    slug: "future-of-digital-innovation",
    excerpt: "Discover how emerging technologies are reshaping the business landscape and creating new opportunities for growth.",
    content: `
# The Future of Digital Innovation

Digital innovation continues to transform how businesses operate and compete. From artificial intelligence to blockchain, the pace of technological change is accelerating, creating both challenges and opportunities for organizations across all sectors.

## Key Trends to Watch

### 1. Artificial Intelligence and Machine Learning

AI and machine learning are becoming increasingly sophisticated, enabling businesses to automate complex tasks, gain deeper insights from data, and create more personalized customer experiences. As these technologies continue to evolve, they will drive significant productivity gains and enable new business models.

### 2. Internet of Things (IoT)

The proliferation of connected devices is generating vast amounts of data that businesses can leverage to optimize operations, improve product design, and deliver better customer service. The IoT is particularly transformative in manufacturing, healthcare, and smart cities.

### 3. Extended Reality (XR)

Virtual, augmented, and mixed reality technologies are creating new ways for businesses to engage with customers, train employees, and visualize complex data. As XR hardware becomes more affordable and accessible, its adoption will accelerate across industries.

## Implications for Business Strategy

Organizations that want to thrive in this rapidly evolving landscape need to develop a clear digital strategy that aligns with their overall business objectives. This involves:

- Investing in the right technologies and capabilities
- Building a culture of innovation and experimentation
- Acquiring and developing digital talent
- Establishing partnerships and ecosystems

## Conclusion

The future of digital innovation offers tremendous potential for businesses that are prepared to embrace change and invest in the capabilities needed to succeed in an increasingly digital world. By staying attuned to emerging technologies and their potential applications, organizations can position themselves for long-term success.
    `,
    category: "Innovation",
    image: "/blogs/future_of_digital_innovation.png",
    author: {
      name: "Alex Johnson",
      avatar: "/testimonials/OIP2.jpg"
    },
    lang: "en",
    featured: true,
    published: true,
    createdAt: "2024-12-15T10:00:00Z",
    updatedAt: "2024-12-15T10:00:00Z"
  },
  {
    id: "2",
    title: "Digital Transformation Strategies",
    slug: "digital-transformation-strategies",
    excerpt: "Learn the key strategies successful companies use to navigate their digital transformation journey.",
    content: `
# Digital Transformation Strategies

Digital transformation is more than just implementing new technologies—it's about fundamentally changing how a business operates and delivers value to its customers. This article explores the key strategies that successful companies employ to navigate their digital transformation journeys.

## 1. Start with a Clear Vision

Effective digital transformation begins with a clear vision of what the organization wants to achieve. This vision should be aligned with the company's overall business objectives and communicate how digital technologies will enable new ways of working, new business models, or enhanced customer experiences.

## 2. Secure Leadership Commitment

Digital transformation requires commitment from the top. Leaders must not only provide the necessary resources but also champion the change throughout the organization. When leadership demonstrates a genuine commitment to digital transformation, it sends a powerful message to the rest of the organization.

## 3. Focus on Customer Experience

Successful digital transformations place the customer at the center. By understanding customer needs, pain points, and expectations, organizations can identify the most impactful areas for digital innovation. This customer-centric approach ensures that digital investments deliver real value.

## 4. Build Digital Capabilities

Digital transformation requires new skills and capabilities. Organizations need to assess their current capabilities, identify gaps, and develop strategies to build or acquire the necessary skills. This might involve hiring new talent, reskilling existing employees, or forming strategic partnerships.

## 5. Embrace Agile Ways of Working

Traditional waterfall approaches to project management are often too slow and rigid for digital transformation initiatives. Embracing agile methodologies allows organizations to experiment, learn, and adapt quickly. This iterative approach reduces risk and accelerates time to value.

## 6. Foster a Culture of Innovation

Successful digital transformation requires a culture that encourages experimentation, tolerates failure, and rewards innovation. Organizations need to create safe spaces for employees to try new ideas and learn from failures without fear of negative consequences.

## 7. Invest in Data and Analytics

Data is at the heart of digital transformation. Organizations need to invest in the infrastructure, tools, and skills needed to collect, analyze, and act on data. Advanced analytics can provide valuable insights that drive better decision-making and enable personalized customer experiences.

## Conclusion

Digital transformation is a complex, multifaceted journey that requires a thoughtful, strategic approach. By focusing on these key strategies, organizations can increase their chances of success and realize the full potential of digital technologies to drive business growth and innovation.
    `,
    category: "Strategy",
    image: "/blogs/digital_transformation.jpg",
    author: {
      name: "Sarah Kim",
      avatar: "/avatars/sarah.jpg"
    },
    lang: "en",
    featured: false,
    published: true,
    createdAt: "2024-12-10T14:30:00Z",
    updatedAt: "2024-12-10T14:30:00Z"
  },
  {
    id: "3",
    title: "AI in Modern Business",
    slug: "ai-in-modern-business",
    excerpt: "Explore how artificial intelligence is revolutionizing business operations and customer experiences.",
    content: `
# AI in Modern Business

Artificial intelligence (AI) is no longer a futuristic concept—it's a practical tool that businesses across industries are using to streamline operations, enhance customer experiences, and drive growth. This article explores the various ways AI is transforming modern business practices.

## Enhancing Customer Experiences

AI is revolutionizing how businesses interact with their customers. From intelligent chatbots that provide 24/7 support to recommendation engines that personalize shopping experiences, AI technologies are helping businesses meet the growing expectations of today's consumers.

### Personalization at Scale

One of the most powerful applications of AI in business is its ability to deliver personalized experiences at scale. By analyzing vast amounts of customer data, AI systems can identify patterns and preferences, enabling businesses to tailor their offerings to individual customers without the need for manual intervention.

### Predictive Customer Service

AI systems can predict when a customer might encounter an issue and proactively address it before it becomes a problem. This predictive approach to customer service not only improves customer satisfaction but also reduces support costs.

## Optimizing Operations

AI is helping businesses optimize their operations in numerous ways, from automating routine tasks to providing insights that drive better decision-making.

### Process Automation

Robotic Process Automation (RPA) combined with AI can automate complex, rule-based processes that previously required human intervention. This automation frees up employees to focus on higher-value activities that require creativity, empathy, and strategic thinking.

### Supply Chain Optimization

AI can analyze vast amounts of data from across the supply chain to identify inefficiencies, predict disruptions, and optimize inventory levels. This capability is particularly valuable in today's volatile business environment, where supply chain resilience is a critical competitive advantage.

## Driving Innovation

AI is not just helping businesses improve existing processes—it's also enabling entirely new products, services, and business models.

### Product Development

By analyzing customer feedback, market trends, and competitive intelligence, AI can identify opportunities for product innovation and help businesses develop new offerings that meet emerging customer needs.

### New Business Models

AI is enabling new business models that would not have been possible with traditional technologies. From usage-based pricing to AI-as-a-service, these new models are creating opportunities for businesses to differentiate themselves and capture new sources of value.

## Challenges and Considerations

While the potential benefits of AI are significant, businesses must also navigate various challenges as they integrate these technologies into their operations.

### Data Quality and Availability

AI systems are only as good as the data they're trained on. Businesses need to ensure they have access to high-quality, relevant data and that this data is properly prepared for use in AI applications.

### Ethical Considerations

As AI becomes more pervasive, businesses must consider the ethical implications of their AI applications, including issues related to privacy, bias, and transparency. Developing clear ethical guidelines and governance frameworks is essential for responsible AI adoption.

## Conclusion

AI is transforming how businesses operate, compete, and create value. By thoughtfully integrating AI into their strategies and operations, businesses can enhance customer experiences, optimize operations, and drive innovation. However, success with AI requires more than just technology—it demands a strategic approach that addresses organizational, ethical, and technical considerations.
    `,
    category: "Technology",
    image: "/blogs/AI_in_modern_business.jpg",
    author: {
      name: "Michael Chen",
      avatar: "/testimonials/OIP1.jpg"
    },
    lang: "en",
    featured: false,
    published: true,
    createdAt: "2024-12-05T09:15:00Z",
    updatedAt: "2024-12-05T09:15:00Z"
  },
  {
    id: "4",
    title: "The Art of Digital Marketing",
    slug: "art-of-digital-marketing",
    excerpt: "Master the strategies that will elevate your digital marketing campaigns and drive exceptional results.",
    content: `
# The Art of Digital Marketing

Digital marketing has evolved dramatically over the past decade, transforming from a niche specialty into a critical business function. Today, effective digital marketing is both an art and a science, requiring creativity, analytical thinking, and strategic planning. This article explores the key elements of successful digital marketing in today's fast-paced digital landscape.

## Understanding Your Audience

The foundation of effective digital marketing is a deep understanding of your target audience. By developing detailed buyer personas and mapping the customer journey, marketers can create more relevant, engaging content that resonates with their audience at each stage of the decision-making process.

### Data-Driven Insights

Modern digital marketing relies heavily on data to understand audience behavior, preferences, and needs. Analytics tools provide valuable insights into how users interact with your digital properties, which channels drive the most engagement, and which messaging resonates most strongly with your audience.

### Behavioral Segmentation

Going beyond basic demographic segmentation, advanced digital marketers segment their audiences based on behaviors, preferences, and engagement patterns. This more nuanced approach to segmentation enables highly targeted campaigns that deliver the right message to the right person at the right time.

## Content Strategy

Content remains at the heart of digital marketing, serving as the primary vehicle for attracting, engaging, and converting your audience.

### Value-Driven Content

The most effective content provides genuine value to your audience, addressing their questions, challenges, and needs. By focusing on creating content that helps rather than sells, marketers can build trust and establish their brands as authoritative sources of information.

### Format Diversity

Different audience segments consume content in different ways. A comprehensive content strategy incorporates a diverse mix of formats—including blog posts, videos, podcasts, infographics, and interactive tools—to engage audiences across various platforms and preferences.

## Channel Optimization

With so many digital channels available, successful marketers must strategically allocate their resources to maximize impact.

### Channel Selection

Rather than trying to maintain a presence on every platform, effective digital marketers focus on the channels where their target audience is most active and engaged. This focused approach allows for deeper engagement and more efficient resource allocation.

### Cross-Channel Integration

While focusing on key channels is important, the most successful digital marketing strategies integrate across channels to create a cohesive brand experience. This integration ensures consistent messaging and allows marketers to guide users through the customer journey regardless of which channels they use.

## Measurement and Optimization

Digital marketing's measurability is one of its greatest strengths, allowing marketers to continuously optimize their campaigns based on real-time performance data.

### KPI Alignment

Effective measurement begins with selecting the right key performance indicators (KPIs) aligned with your business objectives. Whether you're focused on brand awareness, lead generation, or sales conversion, your KPIs should directly connect to these goals.

### Continuous Testing

The digital landscape is constantly evolving, and what works today may not work tomorrow. Successful digital marketers embrace a culture of continuous testing, experimenting with different approaches to identify what resonates most strongly with their audience.

## Conclusion

Digital marketing is both an art and a science, requiring creativity, analytical thinking, and strategic planning. By developing a deep understanding of your audience, creating valuable content, optimizing your channel strategy, and continuously measuring and refining your approach, you can master the art of digital marketing and drive exceptional results for your business.
    `,
    category: "Marketing",
    image: "/blogs/the_art_of_digital_marketing.jpg",
    author: {
      name: "Emily Wilson",
      avatar: "/avatars/emily.jpg"
    },
    lang: "en",
    featured: true,
    published: true,
    createdAt: "2024-12-01T11:45:00Z",
    updatedAt: "2024-12-01T11:45:00Z"
  }
];

type Props = {
  params: {
    slug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function BlogPostPage({ params }: Props) {
  const { currentLanguage } = useTranslations();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Tìm bài viết theo slug
    const foundPost = staticBlogPosts.find(p => p.slug === params.slug);
    
    if (!foundPost) {
      notFound();
    }
    
    setPost(foundPost);
    
    // Tìm các bài viết liên quan (cùng chuyên mục)
    const related = staticBlogPosts
      .filter(p => p.id !== foundPost.id && p.category === foundPost.category)
      .slice(0, 3);
    
    setRelatedPosts(related);
  }, [params.slug]);

  if (!post) {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Banner with Parallax */}
      <div className="relative bg-gradient-to-r from-green-600 to-emerald-700 h-[50vh] lg:h-[60vh] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={post?.image || ''}
            alt={post?.title || ''}
            fill
            className="object-cover mix-blend-overlay opacity-40"
            priority
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        <div className="container mx-auto px-6 h-full flex flex-col justify-end pb-16 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-2 mb-4"
          >
            {post?.category && (
              <Badge className="bg-white/20 text-white backdrop-blur-sm px-4 py-1.5 text-sm font-medium">
                {post.category}
              </Badge>
            )}
            {post?.featured && (
              <Badge className="bg-green-500 text-white px-3 py-1 flex items-center gap-1">
                <Star className="h-3 w-3" />
                <span>Featured</span>
              </Badge>
            )}
          </motion.div>
          
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 max-w-4xl leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {post?.title}
          </motion.h1>
          
          <motion.div 
            className="flex flex-wrap gap-6 text-white/80 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {post?.author && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden relative border-2 border-white/30">
                  <Image
                    src={post.author.avatar || "https://via.placeholder.com/80"}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                    />
                </div>
                <span>{post.author.name}</span>
              </div>
            )}
            
            {post?.createdAt && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.createdAt)}</span>
              </div>
            )}
            
            {post?.content && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{getReadingTime(post.content)} min read</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Link href="/blogs">
              <Button variant="ghost" className="mb-8 text-green-700 hover:text-green-800 hover:bg-green-50 -ml-2">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to all articles
              </Button>
            </Link>

            {/* Table of Contents */}
            <motion.div
              className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Table of Contents</h2>
              <nav className="space-y-2">
                {post?.content.split('\n').filter(line => line.startsWith('#')).map((heading, index) => (
                  <a
                    key={index}
                    href={`#${heading.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`}
                    className="block text-green-600 hover:text-green-700 transition-colors"
                  >
                    {heading.replace(/#/g, '').trim()}
                  </a>
                ))}
              </nav>
            </motion.div>
            
            <motion.article 
              className="prose prose-lg max-w-none
                prose-headings:text-gray-800 prose-headings:font-bold prose-headings:mb-6
                prose-p:text-gray-600 prose-p:leading-relaxed
                prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-xl prose-img:shadow-lg
                prose-blockquote:border-l-4 prose-blockquote:border-green-500
                prose-blockquote:bg-green-50 prose-blockquote:p-6 prose-blockquote:rounded-r-xl
                prose-code:bg-gray-100 prose-code:px-2 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-gray-900 prose-pre:rounded-xl prose-pre:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <ReactMarkdown>
                {post?.content || ''}
              </ReactMarkdown>
            </motion.article>
            
            {/* Author and Share Section */}
            <div className="mt-12 border-t border-gray-200 pt-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden relative border-2 border-green-100 shadow-lg">
                    <Image
                      src={post?.author.avatar || "https://via.placeholder.com/80"}
                      alt={post?.author.name || 'Author'}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Written by</p>
                    <p className="font-semibold text-lg text-gray-900">{post?.author.name}</p>
                    <p className="text-sm text-gray-600 mt-1">Senior Content Writer</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Button variant="outline" className="flex-1 md:flex-none bg-white hover:bg-gray-50">
                    <Facebook className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" className="flex-1 md:flex-none bg-white hover:bg-gray-50">
                    <Twitter className="h-4 w-4 mr-2" />
                    Tweet
                  </Button>
                  <Button variant="outline" className="flex-1 md:flex-none bg-white hover:bg-gray-50">
                    <Linkedin className="h-4 w-4 mr-2" />
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Related Articles */}
              {relatedPosts.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                >
                  <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      <Bookmark className="h-4 w-4 text-green-600" />
                      Related Articles
                    </h3>
                  </div>
                  
                  <div className="divide-y divide-gray-100">
                    {relatedPosts.map((related) => (
                      <motion.div
                        key={related.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Link href={`/blogs/${related.slug}`}>
                          <div className="p-6 hover:bg-gray-50 transition-colors group">
                            <Badge className="mb-2 bg-gray-100 text-gray-600 group-hover:bg-green-100 group-hover:text-green-700">
                              {related.category}
                            </Badge>
                            <h4 className="font-medium text-gray-900 mb-1 line-clamp-2 group-hover:text-green-600">
                              {related.title}
                            </h4>
                            <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                              {related.excerpt}
                            </p>
                            <div className="flex items-center text-xs text-gray-400">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{formatDate(related.createdAt)}</span>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {/* Subscribe */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl p-8 text-white shadow-lg"
              >
                <h3 className="font-bold text-xl mb-3">Subscribe to Our Newsletter</h3>
                <p className="text-green-50 text-sm mb-6 leading-relaxed">
                  Get the latest articles and insights straight to your inbox.
                </p>
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-green-200 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                  />
                  <Button className="w-full bg-white text-green-700 hover:bg-gray-100 py-6 text-base font-medium">
                    Subscribe Now
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 