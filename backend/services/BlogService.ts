import { db } from '../database/connection.js';
import { blogPosts, type BlogPost, type NewBlogPost, type CreateBlogPostData } from '../database/schema.js';
import { eq, desc, and, like, or, sql } from 'drizzle-orm';

export class BlogService {
  /**
   * Get all blog posts with filters
   */
  static async getAll(filters?: {
    status?: 'draft' | 'published';
    lang?: string;
    featured?: boolean;
    limit?: number;
    offset?: number;
  }) {
    const conditions: any[] = [];
    if (filters?.status) conditions.push(eq(blogPosts.status, filters.status));
    if (filters?.lang) conditions.push(eq(blogPosts.lang, filters.lang));
    if (filters?.featured !== undefined) conditions.push(eq(blogPosts.featured, filters.featured));
    
    // Build query without chaining to avoid TypeScript issues
    if (conditions.length > 0) {
      if (filters?.limit) {
        return await db
          .select()
          .from(blogPosts)
          .where(and(...conditions))
          .orderBy(desc(blogPosts.published_at))
          .limit(filters.limit)
          .offset(filters?.offset || 0);
      } else {
        return await db
          .select()
          .from(blogPosts)
          .where(and(...conditions))
          .orderBy(desc(blogPosts.published_at));
      }
    } else {
      if (filters?.limit) {
        return await db
          .select()
          .from(blogPosts)
          .orderBy(desc(blogPosts.published_at))
          .limit(filters.limit)
          .offset(filters?.offset || 0);
      } else {
        return await db
          .select()
          .from(blogPosts)
          .orderBy(desc(blogPosts.published_at));
      }
    }
  }

  /**
   * Get blog post by slug
   */
  static async getBySlug(slug: string) {
    const result = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);
    
    return result[0] || null;
  }

  /**
   * Get blog post by ID
   */
  static async getById(id: number) {
    const result = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.id, id))
      .limit(1);
    
    return result[0] || null;
  }

  /**
   * Create new blog post
   */
  static async create(data: CreateBlogPostData) {
    // Generate slug from title if not provided
    const slug = data.slug || this.generateSlug(data.title);
    
    // Calculate reading time (rough estimate: 200 words per minute)
    const wordCount = data.content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    const newPost = {
      title: data.title,
      slug,
      excerpt: data.excerpt,
      content: data.content,
      featured_image: data.featured_image,
      featured: data.featured || false,
      status: data.status || 'draft',
      lang: data.lang,
      meta_title: data.meta_title,
      meta_description: data.meta_description,
      tags: data.tags,
      author_name: data.author_name,
      author_avatar_url: data.author_avatar_url,
      author_position: data.author_position,
      reading_time: data.reading_time || readingTime,
      published_at: data.published_at || (data.status === 'published' ? new Date() : null),
    };

    const result = await db.insert(blogPosts).values(newPost);
    const blogs = await db.select().from(blogPosts).orderBy(desc(blogPosts.id)).limit(1);
    return blogs[0] || null;
  }

  /**
   * Update blog post
   */
  static async update(id: number, data: Partial<CreateBlogPostData>) {
    const updateData: any = { ...data };
    
    // Generate slug from title if title is updated and slug is not provided
    if (data.title && !data.slug) {
      updateData.slug = this.generateSlug(data.title);
    }
    
    // Recalculate reading time if content is updated
    if (data.content) {
      const wordCount = data.content.split(/\s+/).length;
      updateData.reading_time = Math.ceil(wordCount / 200);
    }
    
    // Set published_at if status changed to published
    if (data.status === 'published' && !data.published_at) {
      updateData.published_at = new Date();
    }

    await db
      .update(blogPosts)
      .set(updateData)
      .where(eq(blogPosts.id, id));
    
    return this.getById(id);
  }

  /**
   * Delete blog post
   */
  static async delete(id: number) {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return true;
  }

  /**
   * Search blog posts
   */
  static async search(query: string, lang?: string) {
    const conditions: any[] = [
      or(
        like(blogPosts.title, `%${query}%`),
        like(blogPosts.excerpt, `%${query}%`),
        like(blogPosts.content, `%${query}%`),
        like(blogPosts.tags, `%${query}%`)
      )
    ];
    
    if (lang) {
      conditions.push(eq(blogPosts.lang, lang));
    }
    
    return await db
      .select()
      .from(blogPosts)
      .where(and(...conditions))
      .orderBy(desc(blogPosts.published_at));
  }

  /**
   * Get featured blog posts
   */
  static async getFeatured(lang?: string, limit = 3) {
    const conditions: any[] = [eq(blogPosts.featured, true)];
    if (lang) {
      conditions.push(eq(blogPosts.lang, lang));
    }
    
    return await db
      .select()
      .from(blogPosts)
      .where(and(...conditions))
      .orderBy(desc(blogPosts.published_at))
      .limit(limit);
  }

  /**
   * Get related blog posts
   */
  static async getRelated(currentId: number, lang?: string, limit = 3) {
    const conditions: any[] = [];
    if (lang) {
      conditions.push(eq(blogPosts.lang, lang));
    }
    
    const query = db
      .select()
      .from(blogPosts)
      .where(and(...conditions))
      .orderBy(desc(blogPosts.published_at))
      .limit(limit);
      
    return await query;
  }

  /**
   * Generate slug from title
   */
  private static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }

  /**
   * Check if slug exists
   */
  static async slugExists(slug: string, excludeId?: number): Promise<boolean> {
    const conditions: any[] = [eq(blogPosts.slug, slug)];
    if (excludeId) {
      conditions.push(sql`${blogPosts.id} != ${excludeId}`);
    }
    
    const result = await db
      .select({ id: blogPosts.id })
      .from(blogPosts)
      .where(and(...conditions))
      .limit(1);
      
    return result.length > 0;
  }
}
