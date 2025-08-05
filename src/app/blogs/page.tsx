"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "@/hooks/use-translations";
import { Calendar, Clock, ArrowRight, Star, Search, Filter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
      avatar: "/avatars/alex.jpg"
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
      avatar: "/avatars/michael.jpg"
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

export default function BlogsPage() {
  const { currentLanguage } = useTranslations();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Lọc blog dựa trên ngôn ngữ, tìm kiếm và danh mục
  const filteredBlogs = staticBlogPosts.filter(blog => {
    // Lọc theo ngôn ngữ (giả sử tất cả là tiếng Anh cho bây giờ)
    const matchesLanguage = true; // blog.lang === currentLanguage;
    
    // Lọc theo từ khóa tìm kiếm
    const matchesSearch = searchTerm === "" || 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Lọc theo danh mục
    const matchesCategory = !selectedCategory || blog.category === selectedCategory;
    
    return matchesLanguage && matchesSearch && matchesCategory;
  });

  // Lấy danh sách các danh mục duy nhất
  const categories = Array.from(new Set(staticBlogPosts.map(blog => blog.category)));
  
  // Lấy blog nổi bật
  const featuredBlogs = staticBlogPosts.filter(blog => blog.featured);

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
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-20 right-20 w-64 h-64 bg-green-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 py-20 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Blog & Insights</h1>
            <p className="text-xl text-green-50 mb-10">
              Stay updated with the latest trends in digital marketing, business strategies, and technological innovations.
            </p>
            
            {/* Search Box */}
            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-green-300" />
              </div>
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10 py-6 bg-white/10 border-white/20 text-white placeholder:text-green-200 rounded-full focus:ring-green-400 focus:border-green-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Featured Posts */}
        {featuredBlogs.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Featured Posts</h2>
              <div className="ml-4 h-px bg-gray-300 flex-grow"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredBlogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 h-full flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="relative h-60 overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-0 left-0 mt-4 ml-4">
                      <Badge className="bg-green-600 hover:bg-green-700 text-white px-3 py-1">
                        Featured
                      </Badge>
                    </div>
                    <div className="absolute top-0 right-0 mt-4 mr-4">
                      <Badge className="bg-white/80 text-green-700 backdrop-blur-sm px-3 py-1">
                        {blog.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-grow">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <div className="flex items-center mr-4">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{formatDate(blog.createdAt)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{getReadingTime(blog.content)} min read</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {blog.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">
                      {blog.excerpt}
                    </p>
                  </div>
                  
                  <div className="p-6 pt-0 mt-auto">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative mr-3">
                          <Image
                            src={blog.author.avatar || "https://via.placeholder.com/40"}
                            alt={blog.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{blog.author.name}</span>
                      </div>
                      
                      <Link href={`/blogs/${blog.slug}`}>
                        <Button variant="ghost" className="text-green-600 hover:text-green-700 hover:bg-green-50 p-0">
                          Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        {/* Categories Filter */}
        <div className="mb-10">
          <div className="flex items-center mb-6">
            <Filter className="w-5 h-5 text-gray-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Filter by Category</h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              className={selectedCategory === null ? "bg-green-600 hover:bg-green-700" : ""}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={selectedCategory === category ? "bg-green-600 hover:bg-green-700" : ""}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        {/* All Posts */}
        <div>
          <div className="flex items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">All Articles</h2>
            <div className="ml-4 h-px bg-gray-300 flex-grow"></div>
          </div>
          
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
              <Button 
                className="mt-4 bg-green-600 hover:bg-green-700" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory(null);
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 h-full flex flex-col transition-all duration-300 hover:shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-0 right-0 mt-3 mr-3">
                      <Badge className="bg-white/80 text-green-700 backdrop-blur-sm">
                        {blog.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-5 flex-grow">
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <div className="flex items-center mr-3">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{formatDate(blog.createdAt)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{getReadingTime(blog.content)} min read</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {blog.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>
                  </div>
                  
                  <div className="px-5 pb-5 mt-auto">
                    <Link href={`/blogs/${blog.slug}`}>
                      <Button variant="ghost" className="text-green-600 hover:text-green-700 hover:bg-green-50 p-0 text-sm">
                        Read Article <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
        
        {/* Newsletter Signup */}
        <motion.div 
          className="mt-20 bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 text-white text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h3>
          <p className="text-green-50 mb-6 max-w-2xl mx-auto">
            Get the latest articles, resources, and insights delivered straight to your inbox.
          </p>
          
          <div className="flex flex-col sm:flex-row max-w-lg mx-auto gap-3">
            <Input
              type="email"
              placeholder="Your email address"
              className="bg-white/10 border-white/20 text-white placeholder:text-green-200 rounded-lg flex-grow focus:ring-green-400 focus:border-green-400"
            />
            <Button className="bg-white text-green-700 hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 