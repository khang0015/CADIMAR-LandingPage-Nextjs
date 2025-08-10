"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslations } from "@/hooks/use-translations";
import { Send, Loader2, Check } from "lucide-react";

interface ContactForm {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

export default function ContactSection() {
  const { t } = useTranslations();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    console.log('ContactSection form submitted!', { formData });
    
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          serviceInterested: formData.service,
          message: formData.message,
          source: 'website',
        }),
      });

      console.log('ContactSection response received:', response.status, response.statusText);

      if (response.ok) {
        const contact = await response.json();
        console.log('Contact created successfully:', contact);
        setIsSubmitted(true);
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          company: "",
          service: "",
          message: "",
        });
        
        // Reset success state after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      } else {
        const error = await response.json();
        console.log('ContactSection response error:', error);
        throw new Error(error.error || 'Failed to send message');
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
    } finally {
      console.log('ContactSection form submission completed');
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-12 relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-600 to-green-800"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-green-300"></div>
        <div className="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-green-300"></div>
        <div className="absolute -bottom-24 left-1/4 w-64 h-64 rounded-full bg-green-300"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">{/* Prevent layout shift */}
          <div className="select-fix"></div>
          <div className="text-center">
            <div className="inline-block bg-white/90 px-5 py-1 rounded-full mb-3 shadow-md">
              <p className="text-green-600 font-medium text-xs uppercase tracking-wider">
                Ready to talk growth?
              </p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-md">
              {t("contact.title")}
            </h2>
            <p className="text-base text-white/90 mb-4 max-w-2xl mx-auto">
              Let's discuss how we can help scale your business with effective advertising campaigns.
            </p>
            <p className="text-sm text-white/90 mb-6 max-w-2xl mx-auto bg-black/20 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
              {t("contact.description")}
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl text-left border border-white/20 relative z-10 overflow-hidden">
            {/* Form decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-green-100 to-emerald-50 rounded-full opacity-40 z-0"></div>
            <div className="absolute -bottom-20 -left-10 w-60 h-60 bg-gradient-to-br from-green-100 to-emerald-50 rounded-full opacity-40 z-0"></div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-gray-700 font-semibold block mb-1 flex items-center text-sm">
                  <span className="w-1 h-3 bg-green-600 mr-2 rounded-full"></span>
                  {t("form.name_label")}
                </label>
                <Input
                  type="text"
                  placeholder={t("form.name_placeholder")}
                  className="border-gray-300 focus:ring-green-600 focus:border-green-600 transition-all text-sm"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="text-gray-700 font-semibold block mb-1 flex items-center text-sm">
                  <span className="w-1 h-3 bg-green-600 mr-2 rounded-full"></span>
                  {t("form.email_label")}
                </label>
                <Input
                  type="email"
                  placeholder={t("form.email_placeholder")}
                  className="border-gray-300 focus:ring-green-600 focus:border-green-600 transition-all text-sm"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="text-gray-700 font-semibold block mb-1 flex items-center text-sm">
                <span className="w-1 h-3 bg-green-600 mr-2 rounded-full"></span>
                {t("form.company_label")}
              </label>
              <Input
                type="text"
                placeholder={t("form.company_placeholder")}
                className="border-gray-300 focus:ring-green-600 focus:border-green-600 transition-all text-sm"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
              />
            </div>
            
            <div className="mb-6">
              <label className="text-gray-700 font-semibold block mb-2 flex items-center">
                <span className="w-1 h-4 bg-green-600 mr-2 rounded-full"></span>
                {t("form.service_label")}
              </label>
              <Select onValueChange={(value) => handleInputChange("service", value)} value={formData.service}>
                <SelectTrigger className="border-gray-300 focus:ring-green-600 focus:border-green-600 transition-all">
                  <SelectValue placeholder={t("form.service_placeholder")} />
                </SelectTrigger>
                <SelectContent className="border-green-600/20 bg-white shadow-lg z-[100]" position="popper" sideOffset={5}>
                  <SelectItem value="tiktok-ads" className="hover:bg-green-100 focus:bg-green-200">{t("form.tiktok_ads")}</SelectItem>
                  <SelectItem value="google-ads" className="hover:bg-green-100 focus:bg-green-200">{t("form.google_ads")}</SelectItem>
                  <SelectItem value="microsoft-ads" className="hover:bg-green-100 focus:bg-green-200">{t("form.microsoft_ads")}</SelectItem>
                  <SelectItem value="facebook-ads" className="hover:bg-green-100 focus:bg-green-200">{t("form.facebook_ads")}</SelectItem>
                  <SelectItem value="consultation" className="hover:bg-green-100 focus:bg-green-200">{t("form.consultation")}</SelectItem>
                  <SelectItem value="other" className="hover:bg-green-100 focus:bg-green-200">Other Services</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="mb-4">
              <label className="text-gray-700 font-semibold block mb-1 flex items-center text-sm">
                <span className="w-1 h-3 bg-green-600 mr-2 rounded-full"></span>
                {t("form.message_label")}
              </label>
              <Textarea
                rows={3}
                placeholder={t("form.message_placeholder")}
                className="border-gray-300 focus:ring-green-600 focus:border-green-600 transition-all resize-vertical text-sm"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={isLoading || isSubmitted}
              className={`w-full font-bold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl ${
                isSubmitted 
                  ? "bg-green-500 hover:bg-green-600 hover:scale-[1.02]" 
                  : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 hover:scale-[1.02]"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : isSubmitted ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Message Sent!</span>
                </>
              ) : (
                <>
                  <span>{t("form.submit_button")}</span>
                  <Send className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
            
            <div className="flex items-center justify-center mt-6 mb-2">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-grow"></div>
              <div className="px-4">
                <div className="w-2 h-2 rounded-full bg-green-600"></div>
              </div>
              <div className="h-px bg-gradient-to-r from-gray-300 via-gray-300 to-transparent flex-grow"></div>
            </div>
            
            <p className="text-sm text-gray-500 mt-4 text-center">
              {t("form.privacy_notice")}
            </p>
          </form>
          
          {/* Contact info pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <div className="bg-green-600/90 backdrop-blur-sm px-4 py-2 rounded-full text-white shadow-lg flex items-center space-x-2 hover:bg-green-600 transition-all duration-300 border border-white/20 text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span className="font-medium">support@cadimar.net</span>
            </div>
            <div className="bg-green-600/90 backdrop-blur-sm px-4 py-2 rounded-full text-white shadow-lg flex items-center space-x-2 hover:bg-green-600 transition-all duration-300 border border-white/20 text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="font-medium">+84 868283784</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
