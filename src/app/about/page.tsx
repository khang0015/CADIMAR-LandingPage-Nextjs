"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/hooks/use-translations";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { 
  Users, 
  Target, 
  TrendingUp, 
  Award, 
  Globe, 
  Heart,
  Lightbulb,
  Shield,
  ArrowRight
} from "lucide-react";

export default function AboutPage() {
  const { t, currentLanguage } = useTranslations();

  const stats = [
    { number: "500+", label: currentLanguage === 'vi' ? "Khách hàng hài lòng" : "Happy Clients" },
    { number: "95%", label: currentLanguage === 'vi' ? "Tỷ lệ thành công" : "Success Rate" },
    { number: "10M+", label: currentLanguage === 'vi' ? "Lượt hiển thị quảng cáo" : "Ad Impressions" },
    { number: "24/7", label: currentLanguage === 'vi' ? "Hỗ trợ khách hàng" : "Customer Support" }
  ];

  const values = [
    {
      icon: Heart,
      title: currentLanguage === 'vi' ? "Đam mê" : "Passion",
      description: currentLanguage === 'vi' 
        ? "Chúng tôi đam mê giúp thương hiệu phát triển và đạt được mục tiêu kinh doanh thông qua marketing sáng tạo."
        : "We're passionate about helping brands grow and achieve their business goals through creative marketing."
    },
    {
      icon: Lightbulb,
      title: currentLanguage === 'vi' ? "Sáng tạo" : "Innovation",
      description: currentLanguage === 'vi'
        ? "Luôn đi đầu trong xu hướng marketing mới, áp dụng công nghệ tiên tiến để mang lại kết quả tối ưu."
        : "Always at the forefront of new marketing trends, applying advanced technology for optimal results."
    },
    {
      icon: Shield,
      title: currentLanguage === 'vi' ? "Tin cậy" : "Trust",
      description: currentLanguage === 'vi'
        ? "Xây dựng mối quan hệ lâu dài với khách hàng dựa trên sự minh bạch, chất lượng và kết quả có thể đo lường."
        : "Building long-term relationships with clients based on transparency, quality and measurable results."
    },
    {
      icon: Target,
      title: currentLanguage === 'vi' ? "Tập trung" : "Focus",
      description: currentLanguage === 'vi'
        ? "Tập trung vào việc hiểu rõ mục tiêu kinh doanh của khách hàng để đưa ra các giải pháp marketing phù hợp nhất."
        : "Focused on understanding client business objectives to deliver the most suitable marketing solutions."
    }
  ];

  const team = [
    {
      name: "Minh Nguyen",
      role: currentLanguage === 'vi' ? "Giám đốc chiến lược" : "Strategy Director",
      description: currentLanguage === 'vi'
        ? "10+ năm kinh nghiệm trong marketing số và quảng cáo TikTok"
        : "10+ years experience in digital marketing and TikTok advertising"
    },
    {
      name: "Sarah Chen",
      role: currentLanguage === 'vi' ? "Trưởng phòng sáng tạo" : "Creative Director",
      description: currentLanguage === 'vi'
        ? "Chuyên gia về nội dung viral và tối ưu hóa chiến dịch"
        : "Expert in viral content and campaign optimization"
    },
    {
      name: "David Park",
      role: currentLanguage === 'vi' ? "Chuyên gia dữ liệu" : "Data Analytics Lead",
      description: currentLanguage === 'vi'
        ? "Chuyên phân tích dữ liệu và tối ưu hóa ROI cho khách hàng"
        : "Specializes in data analysis and ROI optimization for clients"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-white via-green-50 to-green-100 pt-20">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-8">
              <Image 
                src="/cadimar-logo-with-text.jpg" 
                alt="CADIMAR Logo" 
                className="h-20 mx-auto mb-6"
                width={80}
                height={80}
              />
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                {currentLanguage === 'vi' ? 'Về CADIMAR' : 'About CADIMAR'}
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                {currentLanguage === 'vi'
                  ? 'Chúng tôi là đội ngũ chuyên gia marketing số hàng đầu, chuyên tạo ra các chiến dịch quảng cáo TikTok và các nền tảng số khác mang lại kết quả vượt trội cho thương hiệu.'
                  : 'We are a leading team of digital marketing experts, specializing in creating TikTok advertising campaigns and other digital platforms that deliver outstanding results for brands.'
                }
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {currentLanguage === 'vi' ? 'Sứ mệnh của chúng tôi' : 'Our Mission'}
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              {currentLanguage === 'vi'
                ? 'Tại CADIMAR, chúng tôi tin rằng mỗi thương hiệu đều có một câu chuyện độc đáo cần được kể. Sứ mệnh của chúng tôi là giúp các doanh nghiệp kết nối với khách hàng mục tiêu thông qua các chiến dịch marketing sáng tạo, hiệu quả và có thể đo lường được.'
                : 'At CADIMAR, we believe every brand has a unique story to tell. Our mission is to help businesses connect with their target audience through creative, effective, and measurable marketing campaigns.'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-white">
                <Globe className="h-12 w-12 mb-6" />
                <h3 className="text-2xl font-bold mb-4">
                  {currentLanguage === 'vi' ? 'Tầm nhìn toàn cầu' : 'Global Vision'}
                </h3>
                <p className="text-green-100 leading-relaxed">
                  {currentLanguage === 'vi'
                    ? 'Chúng tôi hướng tới việc trở thành đối tác marketing số đáng tin cậy nhất trong khu vực, giúp các thương hiệu Việt Nam vươn ra thế giới.'
                    : 'We aim to become the most trusted digital marketing partner in the region, helping Vietnamese brands reach global markets.'
                  }
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-50 rounded-2xl p-8">
                <TrendingUp className="h-12 w-12 text-green-600 mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {currentLanguage === 'vi' ? 'Cam kết chất lượng' : 'Quality Commitment'}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {currentLanguage === 'vi'
                    ? 'Mỗi chiến dịch được thiết kế riêng để đáp ứng mục tiêu cụ thể của khách hàng, với sự theo dõi và tối ưu hóa liên tục để đảm bảo ROI tối đa.'
                    : 'Each campaign is custom-designed to meet specific client objectives, with continuous monitoring and optimization to ensure maximum ROI.'
                  }
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-green-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {currentLanguage === 'vi' ? 'Giá trị cốt lõi' : 'Core Values'}
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              {currentLanguage === 'vi'
                ? 'Những giá trị này định hướng mọi hoạt động của chúng tôi và tạo nên văn hóa doanh nghiệp đặc biệt tại CADIMAR.'
                : 'These values guide all our activities and create the unique corporate culture at CADIMAR.'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <CardContent className="p-8 text-center">
                    <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                      <value.icon className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {currentLanguage === 'vi' ? 'Đội ngũ chuyên gia' : 'Expert Team'}
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              {currentLanguage === 'vi'
                ? 'Gặp gỡ những chuyên gia tài năng đang thúc đẩy sự thành công của CADIMAR và khách hàng.'
                : 'Meet the talented experts driving the success of CADIMAR and our clients.'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-green-50 to-white border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-8 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <Users className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-green-600 font-semibold mb-4">
                      {member.role}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Award className="h-16 w-16 text-green-200 mx-auto mb-8" />
            <h2 className="text-4xl font-bold text-white mb-6">
              {currentLanguage === 'vi' 
                ? 'Sẵn sàng phát triển cùng CADIMAR?' 
                : 'Ready to grow with CADIMAR?'
              }
            </h2>
            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              {currentLanguage === 'vi'
                ? 'Hãy để chúng tôi giúp bạn xây dựng một chiến dịch marketing mạnh mẽ và hiệu quả. Liên hệ ngay để được tư vấn miễn phí!'
                : 'Let us help you build a powerful and effective marketing campaign. Contact us now for a free consultation!'
              }
            </p>
            <Link href="/#contact">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-4">
                {currentLanguage === 'vi' ? 'Liên hệ ngay' : 'Get In Touch'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 