"use client";

import { Twitter, Phone, Mail, MapPin, Facebook, Linkedin } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-primary text-white py-16 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-16 h-16 relative flex-shrink-0">
                <Image
                  src="/cadimar_logo.png"
                  alt="CADIMAR Logo"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold">CADIMAR</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Professional digital innovation agency helping brands grow through strategic technology solutions and proven digital transformation.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 hover:bg-brand-red rounded-lg flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 hover:bg-brand-red rounded-lg flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 hover:bg-brand-red rounded-lg flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 hover:bg-brand-red rounded-lg flex items-center justify-center transition-colors"
                aria-label="TikTok"
              >
                <span className="text-lg font-bold">T</span>
              </a>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-6">Services</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Digital Innovation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Technology Consulting</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Digital Transformation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Strategy Development</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Growth Solutions</a></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Work</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6">Contact</h4>
            <div className="space-y-4 text-gray-400">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-brand-red mt-1 flex-shrink-0" />
                <div>
                  <p>Local: (+84)868283784</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-brand-red mt-1 flex-shrink-0" />
                <p>support@cadimar.net</p>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-brand-red mt-1 flex-shrink-0" />
                <div>
                  <p>Innovation Park, San Jose CA 95134</p>
                  <p>789 Future Tech Blvd.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 mb-4 md:mb-0">
            © {currentYear} CADIMAR. All rights reserved.
          </p>
          <div className="flex space-x-6 text-gray-400 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
} 