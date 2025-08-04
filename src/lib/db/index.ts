// For now, we'll use in-memory storage that can be easily replaced with real database later
// This is a simple implementation that will work without external dependencies

interface Language {
  id: string;
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Translation {
  id: string;
  lang: string;
  key: string;
  value: string;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  source: string;
  status: "new" | "in-progress" | "responded" | "closed";
  priority: "low" | "normal" | "high";
  responded: boolean;
  adminNote?: string;
  respondedAt?: Date;
  respondedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface BlogPost {
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
  readingTime?: number;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// In-memory storage
class MemoryStorage {
  private languages: Map<string, Language> = new Map();
  private translations: Map<string, Translation> = new Map();
  private contacts: Map<string, Contact> = new Map();
  private blogPosts: Map<string, BlogPost> = new Map();

  constructor() {
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Initialize default languages
    const defaultLanguages: Language[] = [
      {
        id: "lang-en",
        code: "en",
        name: "English",
        nativeName: "English",
        flag: "🇺🇸",
        isActive: true,
        sortOrder: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "lang-vi",
        code: "vi",
        name: "Vietnamese",
        nativeName: "Tiếng Việt",
        flag: "🇻🇳",
        isActive: true,
        sortOrder: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    defaultLanguages.forEach(lang => {
      this.languages.set(lang.id, lang);
    });

    // Initialize default translations (copy from your existing translations)
    const defaultTranslations = [
      // English translations
      { lang: "en", key: "brand.name", value: "CADIMAR", category: "brand" },
      { lang: "en", key: "hero.tagline", value: "Digital Marketing Excellence", category: "hero" },
      { lang: "en", key: "hero.title_1", value: "Transform Your Business", category: "hero" },
      { lang: "en", key: "hero.title_2", value: "With Powerful", category: "hero" },
      { lang: "en", key: "hero.title_highlight", value: "Digital Marketing", category: "hero" },
      { lang: "en", key: "hero.title_3", value: "Solutions", category: "hero" },
      { lang: "en", key: "nav.about", value: "About", category: "nav" },
      { lang: "en", key: "nav.services", value: "Services", category: "nav" },
      { lang: "en", key: "nav.testimonials", value: "Testimonials", category: "nav" },
      { lang: "en", key: "nav.contact", value: "Contact", category: "nav" },
      { lang: "en", key: "testimonials.title", value: "Client Success Stories", category: "testimonials" },
      { lang: "en", key: "testimonials.subtitle", value: "Real results from real clients", category: "testimonials" },
      
      // Vietnamese translations
      { lang: "vi", key: "brand.name", value: "CADIMAR", category: "brand" },
      { lang: "vi", key: "hero.tagline", value: "Xuất sắc Marketing Kỹ thuật số", category: "hero" },
      { lang: "vi", key: "hero.title_1", value: "Chuyển đổi Doanh nghiệp", category: "hero" },
      { lang: "vi", key: "hero.title_2", value: "Với Sức mạnh", category: "hero" },
      { lang: "vi", key: "hero.title_highlight", value: "Marketing Kỹ thuật số", category: "hero" },
      { lang: "vi", key: "hero.title_3", value: "Giải pháp", category: "hero" },
      { lang: "vi", key: "nav.about", value: "Giới thiệu", category: "nav" },
      { lang: "vi", key: "nav.services", value: "Dịch vụ", category: "nav" },
      { lang: "vi", key: "nav.testimonials", value: "Đánh giá", category: "nav" },
      { lang: "vi", key: "nav.contact", value: "Liên hệ", category: "nav" },
      { lang: "vi", key: "testimonials.title", value: "Câu chuyện Thành công", category: "testimonials" },
      { lang: "vi", key: "testimonials.subtitle", value: "Kết quả thực tế từ khách hàng thực tế", category: "testimonials" },
    ];

    defaultTranslations.forEach((trans, index) => {
      const translation: Translation = {
        id: `trans-${index}`,
        ...trans,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.translations.set(translation.id, translation);
    });
  }

  // Language methods
  async getAllLanguages(): Promise<Language[]> {
    return Array.from(this.languages.values()).sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async getActiveLanguages(): Promise<Language[]> {
    return Array.from(this.languages.values())
      .filter(lang => lang.isActive)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async createLanguage(data: Omit<Language, 'id' | 'createdAt' | 'updatedAt'>): Promise<Language> {
    const id = `lang-${Date.now()}`;
    const language: Language = {
      ...data,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.languages.set(id, language);
    return language;
  }

  // Translation methods
  async getTranslationsByLang(lang: string): Promise<Translation[]> {
    return Array.from(this.translations.values())
      .filter(trans => trans.lang === lang)
      .sort((a, b) => a.key.localeCompare(b.key));
  }

  async getAllTranslations(): Promise<Translation[]> {
    return Array.from(this.translations.values())
      .sort((a, b) => a.lang.localeCompare(b.lang) || a.key.localeCompare(b.key));
  }

  async createTranslation(data: Omit<Translation, 'id' | 'createdAt' | 'updatedAt'>): Promise<Translation> {
    const id = `trans-${Date.now()}`;
    const translation: Translation = {
      ...data,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.translations.set(id, translation);
    return translation;
  }

  async updateTranslation(id: string, data: Partial<Translation>): Promise<Translation | null> {
    const existing = this.translations.get(id);
    if (!existing) return null;
    
    const updated = {
      ...existing,
      ...data,
      updatedAt: new Date(),
    };
    this.translations.set(id, updated);
    return updated;
  }

  async deleteTranslation(id: string): Promise<boolean> {
    return this.translations.delete(id);
  }

  // Contact methods
  async createContact(data: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>): Promise<Contact> {
    const id = `contact-${Date.now()}`;
    const contact: Contact = {
      ...data,
      id,
      status: data.status || "new",
      priority: data.priority || "normal",
      responded: false,
      source: data.source || "website",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getContactById(id: string): Promise<Contact | null> {
    return this.contacts.get(id) || null;
  }

  async updateContactStatus(id: string, updates: Partial<Contact>): Promise<Contact | null> {
    const existing = this.contacts.get(id);
    if (!existing) return null;
    
    const updated = {
      ...existing,
      ...updates,
      updatedAt: new Date(),
    };
    this.contacts.set(id, updated);
    return updated;
  }

  async getContactStats(): Promise<{ total: number; new: number; responded: number; closed: number }> {
    const contacts = Array.from(this.contacts.values());
    return {
      total: contacts.length,
      new: contacts.filter(c => c.status === "new").length,
      responded: contacts.filter(c => c.responded).length,
      closed: contacts.filter(c => c.status === "closed").length,
    };
  }

  // Blog methods
  async getAllBlogPosts(lang?: string, status?: string): Promise<BlogPost[]> {
    let posts = Array.from(this.blogPosts.values());
    
    if (lang) {
      posts = posts.filter(p => p.lang === lang);
    }
    if (status) {
      posts = posts.filter(p => p.status === status);
    }
    
    return posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    return Array.from(this.blogPosts.values()).find(p => p.slug === slug) || null;
  }

  async createBlogPost(data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
    const id = `blog-${Date.now()}`;
    const post: BlogPost = {
      ...data,
      id,
      status: data.status || "draft",
      featured: data.featured || false,
      tags: data.tags || [],
      viewCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async updateBlogPost(id: string, data: Partial<BlogPost>): Promise<BlogPost | null> {
    const existing = this.blogPosts.get(id);
    if (!existing) return null;
    
    const updated = {
      ...existing,
      ...data,
      updatedAt: new Date(),
    };
    this.blogPosts.set(id, updated);
    return updated;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    return this.blogPosts.delete(id);
  }
}

// Export singleton instance
export const db = new MemoryStorage();

// Export types
export type {
  Language,
  Translation,
  Contact,
  BlogPost,
};
