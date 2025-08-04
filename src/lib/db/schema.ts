// Database schema types for the application
// Using TypeScript interfaces instead of Drizzle ORM for now

// User interface for admin authentication
export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: "admin" | "editor";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Language interface for supported languages
export interface Language {
  id: string;
  code: string; // en, vi, fr, etc.
  name: string; // English, Vietnamese, French, etc.
  nativeName: string; // English, Tiếng Việt, Français, etc.
  flag: string; // emoji flag or image url
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

// Translation interface for multi-language support
export interface Translation {
  id: string;
  lang: string; // en, vi, etc.
  key: string; // translation key like "hero.title"
  value: string; // translated text
  category?: string; // optional grouping like "hero", "nav", etc.
  createdAt: Date;
  updatedAt: Date;
}

// Contact interface for contact form submissions
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  source: string; // website, landing-page, etc.
  status: "new" | "in-progress" | "responded" | "closed";
  priority: "low" | "normal" | "high";
  responded: boolean;
  adminNote?: string;
  respondedAt?: Date;
  respondedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Blog post interface
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  lang: string;
  status: "draft" | "published" | "archived";
  featured: boolean;
  publishedAt?: Date;
  authorId?: string;
  metaTitle?: string;
  metaDescription?: string;
  tags: string[];
  readingTime?: number; // in minutes
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Insert types (for creating new records)
export type InsertUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
export type InsertLanguage = Omit<Language, 'id' | 'createdAt' | 'updatedAt'>;
export type InsertTranslation = Omit<Translation, 'id' | 'createdAt' | 'updatedAt'>;
export type InsertContact = Omit<Contact, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'priority' | 'responded'>;
export type InsertBlogPost = Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'viewCount'>;

// Basic validation helpers
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateLanguageCode(code: string): boolean {
  return code.length >= 2 && code.length <= 5;
}

export function validateContactData(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!data.name || data.name.trim().length === 0) {
    errors.push('Name is required');
  }
  
  if (!data.email || !validateEmail(data.email)) {
    errors.push('Valid email is required');
  }
  
  if (!data.message || data.message.trim().length === 0) {
    errors.push('Message is required');
  }
  
  if (data.message && data.message.length > 2000) {
    errors.push('Message must be less than 2000 characters');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

export function validateBlogPostData(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!data.title || data.title.trim().length === 0) {
    errors.push('Title is required');
  }
  
  if (!data.slug || data.slug.trim().length === 0) {
    errors.push('Slug is required');
  }
  
  if (!data.content || data.content.trim().length === 0) {
    errors.push('Content is required');
  }
  
  if (!data.lang || !validateLanguageCode(data.lang)) {
    errors.push('Valid language code is required');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}
