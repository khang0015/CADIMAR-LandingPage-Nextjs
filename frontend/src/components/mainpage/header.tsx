"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import LanguageSelector from "@/components/mainpage/language-selector-simple";
import { useTranslations } from "@/hooks/use-translations";
import { Menu, X, Globe, Sparkles, Zap, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslations();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-2 left-1/4 w-32 h-1 bg-gradient-to-r from-transparent via-brand-green to-transparent"
          animate={{ 
            x: [-100, 100],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-2 right-1/4 w-24 h-1 bg-gradient-to-r from-transparent via-brand-green-light to-transparent"
          animate={{ 
            x: [100, -100],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <nav className="container mx-auto px-5 py-3 relative">
        <div className="flex items-center justify-between">
          {/* Enhanced Logo */}
          <Link href="/">
            <motion.div 
              className="flex items-center space-x-3"
              style={{ alignItems: 'center' }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="relative flex items-center">
                <motion.div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center shadow-md overflow-hidden"
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image 
                    src="/cadimar_logo.png" 
                    alt="CADIMAR Logo" 
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </motion.div>
                {/* Floating particles around logo */}
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-brand-green rounded-full"
                  animate={{ 
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: 0.5
                  }}
                />
              </div>
              <div className="flex flex-col justify-center h-full">
                <span className="flex items-center">
                  <Image 
                    src="/cadimar_text.png" 
                    alt="CADIMAR"
                    width={160}
                    height={82}
                    className="object-contain"
                  />
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/about"
              aria-label="Learn about CADIMAR team, company story, and our journey to becoming a leading digital advertising agency"
              title="About CADIMAR - Our Story & Team"
            >
              <motion.button 
                className="px-4 py-2 rounded-full text-gray-600 hover:text-brand-green hover:bg-green-50 transition-all duration-200 relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="relative z-10"
                  whileHover={{ y: -1 }}
                >
                  {t("nav.about")}
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-brand-green/10 to-green-200/20 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            </Link>
            <Link
              href="/services"
              aria-label="Explore our comprehensive digital advertising services including TikTok, Facebook, Google and Microsoft ads"
              title="Digital Advertising Services - TikTok, Facebook, Google & Microsoft Ads"
            >
              <motion.button
                className="px-4 py-2 rounded-full text-gray-600 hover:text-brand-green hover:bg-green-50 transition-all duration-200 relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                className="relative z-10"
                whileHover={{ y: -1 }}
                >
                {t("nav.services")}
                </motion.span>
                <motion.div
                className="absolute inset-0 bg-gradient-to-r from-brand-green/10 to-green-200/20 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                />
              </motion.button>
            </Link>
            <Link href="/blogs">
              <motion.button 
                className="px-4 py-2 rounded-full text-gray-600 hover:text-brand-green hover:bg-green-50 transition-all duration-200 relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="relative z-10 flex items-center space-x-1"
                  whileHover={{ y: -1 }}
                >
                  <span>Blog</span>
                  <TrendingUp className="w-3 h-3" />
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-brand-green/10 to-green-200/20 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            </Link>
            <motion.button 
              onClick={() => {
              if (window.location.pathname !== '/') {
                window.location.href = '/#testimonials';
              } else {
                scrollToSection("testimonials");
              }
              }} 
              className="px-4 py-2 rounded-full text-gray-600 hover:text-brand-green hover:bg-green-50 transition-all duration-200 relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
              className="relative z-10"
              whileHover={{ y: -1 }}
              >
              {t("nav.testimonials")}
              </motion.span>
              <motion.div
              className="absolute inset-0 bg-gradient-to-r from-brand-green/10 to-green-200/20 opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              />
            </motion.button>
            <motion.button 
              onClick={() => {
              if (window.location.pathname !== '/') {
                window.location.href = '/#contact';
              } else {
                scrollToSection("contact");
              }
              }} 
              className="px-4 py-2 rounded-full text-gray-600 hover:text-brand-green hover:bg-green-50 transition-all duration-200 relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
              className="relative z-10"
              whileHover={{ y: -1 }}
              >
              {t("nav.contact")}
              </motion.span>
              <motion.div
              className="absolute inset-0 bg-gradient-to-r from-brand-green/10 to-green-200/20 opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              />
            </motion.button>
          </div>

          {/* Language Switcher & CTA */}
          <div className="flex items-center space-x-3">
            {/* Language Switcher */}
            {/* Temporarily hidden
            <div className="hidden sm:flex items-center">
              <LanguageSelector
                variant="compact"
              />
            </div>
            */}

            {/* Login Button - Hidden on mobile */}
            <Button
              variant="outline"
              onClick={() => {
                window.open('https://app.cadimar.net/sign-in', '_blank');
              }}
              className="hidden md:flex bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-800 border-[#16a249] hover:border-[#0d7a32] font-medium transition-all duration-200"
              style={{ color: 'rgba(75, 85, 99, var(--tw-text-opacity))' }}
            >
              Login
            </Button>

            {/* Open Account Button */}
            <Button
              onClick={() => {
                window.open('https://app.cadimar.net/sign-up', '_blank');
              }}
              className="bg-brand-green hover:bg-brand-green-dark text-white font-medium"
            >
              Open account
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                href="/about"
                aria-label="Learn about CADIMAR team, company story, and our journey to becoming a leading digital advertising agency"
                title="About CADIMAR - Our Story & Team"
              >
                <button
                  className="text-gray-600 hover:text-brand-green transition-colors text-left"
                >
                  {t("nav.about")}
                </button>
              </Link>
              <Link
                href="/services"
                aria-label="Explore our comprehensive digital advertising services including TikTok, Facebook, Google and Microsoft ads"
                title="Digital Advertising Services - TikTok, Facebook, Google & Microsoft Ads"
              >
                <button
                  className="text-gray-600 hover:text-brand-green transition-colors text-left"
                >
                  {t("nav.services")}
                </button>
              </Link>
              <Link href="/blogs">
                <button
                  className="text-gray-600 hover:text-brand-green transition-colors text-left"
                >
                  Blog
                </button>
              </Link>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-gray-600 hover:text-brand-green transition-colors text-left"
              >
                {t("nav.testimonials")}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-600 hover:text-brand-green transition-colors text-left"
              >
                {t("nav.contact")}
              </button>

              {/* Mobile CTA Buttons */}
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={() => {
                    window.open('https://app.cadimar.net/sign-in', '_blank');
                    setMobileMenuOpen(false);
                  }}
                  className="bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-80 border-[#16a249] hover:border-[#0d7a32] font-medium w-full transition-all duration-200"
                  style={{ color: 'rgba(75, 85, 99, var(--tw-text-opacity))' }}
                >
                  Login
                </Button>
                <Button
                  onClick={() => {
                    window.open('https://app.cadimar.net/sign-up', '_blank');
                    setMobileMenuOpen(false);
                  }}
                  className="bg-brand-green hover:bg-brand-green-dark text-white font-medium w-full"
                >
                  Open account
                </Button>
              </div>

              {/* Mobile Language Switcher - Temporarily hidden
              <div className="flex items-center justify-center pt-4 border-t border-gray-200">
                <LanguageSelector />
              </div>
              */}
            </div>
          </div>
        )}
      </nav>
    </motion.header>
  );
} 