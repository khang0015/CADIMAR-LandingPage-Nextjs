import { 
  mysqlTable, 
  varchar, 
  text, 
  timestamp, 
  boolean, 
  int, 
  json,
  mysqlEnum,
  decimal
} from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

// Languages table
export const languages = mysqlTable('languages', {
  id: varchar('id', { length: 255 }).primaryKey(),
  code: varchar('code', { length: 10 }).notNull().unique(), // 'en', 'vi'
  name: varchar('name', { length: 255 }).notNull(), // 'English', 'Vietnamese'
  nativeName: varchar('native_name', { length: 255 }).notNull(), // 'English', 'Tiếng Việt'
  flag: varchar('flag', { length: 255 }), // Flag emoji or image URL
  isActive: boolean('is_active').default(true),
  sortOrder: int('sort_order').default(0),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});

// Translations table
export const translations = mysqlTable('translations', {
  id: varchar('id', { length: 255 }).primaryKey(),
  lang: varchar('lang', { length: 10 }).notNull(), // Reference to languages.code
  key: varchar('key', { length: 255 }).notNull(), // 'nav.home', 'hero.title'
  value: text('value').notNull(), // Translation text
  category: varchar('category', { length: 100 }).default('common'), // 'nav', 'hero', 'footer'
  description: text('description'), // Description for translators
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});

// Blog posts table
export const blogPosts = mysqlTable('blog_posts', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),
  featured_image: text('featured_image'),
  featured: boolean('featured').default(false),
  status: mysqlEnum('status', ['draft', 'published']).default('draft'),
  lang: varchar('lang', { length: 2 }).notNull(),
  meta_title: varchar('meta_title', { length: 255 }),
  meta_description: text('meta_description'),
  tags: text('tags'), // hoặc json('tags') nếu muốn lưu dạng JSON
  author_name: varchar('author_name', { length: 255 }),
  author_avatar_url: text('author_avatar_url'),
  author_position: varchar('author_position', { length: 255 }),
  reading_time: int('reading_time'),
  published_at: timestamp('published_at'),
});

// Contact messages table
export const contacts = mysqlTable('contacts', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  company: varchar('company', { length: 255 }),
  serviceInterested: varchar('service_interested', { length: 100 }), // 'tiktok-ads', 'google-ads', etc.
  message: text('message').notNull(),
  source: varchar('source', { length: 100 }).default('website'), // 'website', 'facebook', 'direct'
  status: mysqlEnum('status', ['new', 'in-progress', 'responded', 'closed']).default('new'),
  priority: mysqlEnum('priority', ['low', 'normal', 'high']).default('normal'),
  responded: boolean('responded').default(false),
  adminNote: text('admin_note'),
  respondedAt: timestamp('responded_at'),
  respondedBy: varchar('responded_by', { length: 255 }),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});

// Export types for TypeScript
export type Language = typeof languages.$inferSelect;
export type NewLanguage = typeof languages.$inferInsert;

export type Translation = typeof translations.$inferSelect;
export type NewTranslation = typeof translations.$inferInsert;

export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;

export type Contact = typeof contacts.$inferSelect;
export type NewContact = typeof contacts.$inferInsert;

// Validation schemas
export interface CreateBlogPostData {
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  featured_image?: string;
  featured?: boolean;
  status?: 'draft' | 'published';
  lang: string;
  meta_title?: string;
  meta_description?: string;
  tags?: string;
  author_name?: string;
  author_avatar_url?: string;
  author_position?: string;
  reading_time?: number;
  published_at?: Date;
}

export interface CreateContactData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceInterested?: string;
  message: string;
  source?: string;
}

export interface CreateTranslationData {
  lang: string;
  key: string;
  value: string;
  category?: string;
  description?: string;
}

export interface CreateLanguageData {
  code: string;
  name: string;
  nativeName: string;
  flag?: string;
  isActive?: boolean;
  sortOrder?: number;
}
