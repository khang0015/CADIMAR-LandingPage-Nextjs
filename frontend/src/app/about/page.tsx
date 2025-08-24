"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/hooks/use-translations";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/mainpage/header";
import Footer from "@/components/mainpage/footer";
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
  // English only version

  const stats = [
    { number: "500+", label: "Happy Clients" },
    { number: "95%", label: "Success Rate" },
    { number: "10M+", label: "Ad Impressions" },
    { number: "24/7", label: "Customer Support" }
  ];

  const values = [
    {
      icon: Heart,
      title: "Passion",
      description: "We're passionate about helping brands grow and achieve their business goals through creative marketing."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Always at the forefront of new marketing trends, applying advanced technology for optimal results."
    },
    {
      icon: Shield,
      title: "Trust",
      description: "Building long-term relationships with clients based on transparency, quality and measurable results."
    },
    {
      icon: Target,
      title: "Focus",
      description: "Focused on understanding client business objectives to deliver the most suitable marketing solutions."
    }
  ];

  const team = [
    {
      name: "Minh Nguyen",
      role: "Strategy Director",
      description: "10+ years experience in digital marketing and TikTok advertising"
    },
    {
      name: "Sarah Chen",
      role: "Creative Director",
      description: "Expert in viral content and campaign optimization"
    },
    {
      name: "David Park",
      role: "Data Analytics Lead",
      description: "Specializes in data analysis and ROI optimization for clients"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      
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
              <div className="flex justify-center mb-6">
                <Image 
                  src="/cadimar_logo.png" 
                  alt="CADIMAR Logo" 
                  width={140}
                  height={140}
                  className="object-contain"
                  style={{ aspectRatio: '1/1', maxWidth: '180px', height: 'auto' }}
                  priority
                />
              </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 flex items-center justify-center">
                  About Cadimar
                  {/* <Image 
                    src="/cadimar_text.png" 
                    width={200} 
                    height={90} 
                    alt="CADIMAR" 
                    className="ml-2 filter brightness-0" 
                  /> */}
                </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                We are a leading team of digital marketing experts, specializing in creating TikTok advertising campaigns and other digital platforms that deliver outstanding results for brands.
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
              Our Mission
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              At our company, we believe every brand has a unique story to tell. Our mission is to help businesses connect with their target audience through creative, effective, and measurable marketing campaigns.
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
                  Global Vision
                </h3>
                <p className="text-green-100 leading-relaxed">
                  We aim to become the most trusted digital marketing partner in the region, helping Vietnamese brands reach global markets.
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
                  Quality Commitment
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Each campaign is custom-designed to meet specific client objectives, with continuous monitoring and optimization to ensure maximum ROI.
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
              Core Values
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              These values guide all our activities and create the unique corporate culture at our company.
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
              Expert Team
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Meet the talented experts driving the success of our company and our clients.
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
            <h2 className="text-4xl font-bold text-white mb-6 flex items-center justify-center">
              Ready to grow with
              <Image src="/cadimar_text.png" width={180} height={45} alt="CADIMAR" className="inline-block ml-3 align-middle" />?
            </h2>
            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              Let us help you build a powerful and effective marketing campaign. Contact us now for a free consultation!
            </p>
            <Link href="https://app.cadimar.net/sign-up" target="_blank" rel="noopener">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-4">
                Get started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 