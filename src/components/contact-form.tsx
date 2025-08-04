'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'website',
        }),
      });

      if (response.ok) {
        const contact = await response.json();
        toast({
          title: 'Message Sent!',
          description: 'Thank you for your message. We\'ll get back to you soon.',
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
        });
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl border-0 overflow-hidden bg-pink-50">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red via-rose-500 to-orange-500"></div>
      <CardHeader className="bg-pink-100 border-b border-pink-200">
        <CardTitle className="text-gray-800">Get in Touch</CardTitle>
        <CardDescription className="text-gray-600">
          Send us a message and we'll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 bg-pink-50">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 font-medium flex items-center">
                <span className="w-1 h-4 bg-brand-red mr-2 rounded-full"></span>
                Name <span className="text-brand-red ml-1">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                placeholder="Your full name"
                className="border-pink-200 bg-white/80 focus:border-brand-red focus:ring-brand-red"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium flex items-center">
                <span className="w-1 h-4 bg-brand-red mr-2 rounded-full"></span>
                Email <span className="text-brand-red ml-1">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                placeholder="your.email@example.com"
                className="border-pink-200 bg-white/80 focus:border-brand-red focus:ring-brand-red"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-700 font-medium flex items-center">
                <span className="w-1 h-4 bg-gray-300 mr-2 rounded-full"></span>
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={isSubmitting}
                placeholder="+1 (555) 123-4567"
                className="border-pink-200 bg-white/80 focus:border-brand-red focus:ring-brand-red"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company" className="text-gray-700 font-medium flex items-center">
                <span className="w-1 h-4 bg-gray-300 mr-2 rounded-full"></span>
                Company
              </Label>
              <Input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleInputChange}
                disabled={isSubmitting}
                placeholder="Your company name"
                className="border-pink-200 bg-white/80 focus:border-brand-red focus:ring-brand-red"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-gray-700 font-medium flex items-center">
              <span className="w-1 h-4 bg-brand-red mr-2 rounded-full"></span>
              Message <span className="text-brand-red ml-1">*</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              placeholder="Tell us about your project or how we can help you..."
              rows={5}
              className="border-pink-200 bg-white/80 focus:border-brand-red focus:ring-brand-red"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-brand-red to-rose-600 hover:from-brand-red hover:to-rose-700 text-white transition-all duration-300 font-medium shadow-md hover:shadow-lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
