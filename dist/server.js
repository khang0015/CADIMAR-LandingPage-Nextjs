var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// backend/server.ts
import express6 from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import dotenv2 from "dotenv";
import path3 from "path";
import { fileURLToPath as fileURLToPath3 } from "url";

// backend/routes/blogRoutes.ts
import express from "express";

// backend/database/connection.ts
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "..", "..", ".env.local") });
var dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "cadimar_db",
  charset: "utf8mb4",
  // Connection pool settings
  connectionLimit: 10,
  acquireTimeout: 6e4,
  timeout: 6e4,
  reconnect: true,
  // Keep connection alive
  keepAliveInitialDelay: 0,
  enableKeepAlive: true
};
console.log("\u{1F527} Database config:", {
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  database: dbConfig.database
});
var pool = mysql.createPool(dbConfig);
var db = drizzle(pool);
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.log("\u2705 Database connected successfully");
  } catch (error) {
    console.error("\u274C Database connection failed:", error);
    setTimeout(testConnection, 5e3);
  }
}
testConnection();
pool.on("connection", (connection) => {
  console.log("\u{1F4E1} New database connection established as id " + connection.threadId);
});
pool.on("error", (err) => {
  console.error("\u274C Database pool error:", err);
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    console.log("\u{1F504} Attempting to reconnect to database...");
    testConnection();
  }
});

// backend/database/schema.ts
import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  boolean,
  int,
  mysqlEnum
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
var languages = mysqlTable("languages", {
  id: varchar("id", { length: 255 }).primaryKey(),
  code: varchar("code", { length: 10 }).notNull().unique(),
  // 'en', 'vi'
  name: varchar("name", { length: 255 }).notNull(),
  // 'English', 'Vietnamese'
  nativeName: varchar("native_name", { length: 255 }).notNull(),
  // 'English', 'Tiếng Việt'
  flag: varchar("flag", { length: 255 }),
  // Flag emoji or image URL
  isActive: boolean("is_active").default(true),
  sortOrder: int("sort_order").default(0),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`)
});
var translations = mysqlTable("translations", {
  id: varchar("id", { length: 255 }).primaryKey(),
  lang: varchar("lang", { length: 10 }).notNull(),
  // Reference to languages.code
  key: varchar("key", { length: 255 }).notNull(),
  // 'nav.home', 'hero.title'
  value: text("value").notNull(),
  // Translation text
  category: varchar("category", { length: 100 }).default("common"),
  // 'nav', 'hero', 'footer'
  description: text("description"),
  // Description for translators
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`)
});
var blogPosts = mysqlTable("blog_posts", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  featured_image: text("featured_image"),
  featured: boolean("featured").default(false),
  status: mysqlEnum("status", ["draft", "published"]).default("draft"),
  lang: varchar("lang", { length: 2 }).notNull(),
  meta_title: varchar("meta_title", { length: 255 }),
  meta_description: text("meta_description"),
  tags: text("tags"),
  // hoặc json('tags') nếu muốn lưu dạng JSON
  author_name: varchar("author_name", { length: 255 }),
  author_avatar_url: text("author_avatar_url"),
  author_position: varchar("author_position", { length: 255 }),
  reading_time: int("reading_time"),
  published_at: timestamp("published_at")
});
var contacts = mysqlTable("contacts", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  company: varchar("company", { length: 255 }),
  serviceInterested: varchar("service_interested", { length: 100 }),
  // 'tiktok-ads', 'google-ads', etc.
  message: text("message").notNull(),
  source: varchar("source", { length: 100 }).default("website"),
  // 'website', 'facebook', 'direct'
  status: mysqlEnum("status", ["new", "in-progress", "responded", "closed"]).default("new"),
  priority: mysqlEnum("priority", ["low", "normal", "high"]).default("normal"),
  responded: boolean("responded").default(false),
  adminNote: text("admin_note"),
  respondedAt: timestamp("responded_at"),
  respondedBy: varchar("responded_by", { length: 255 }),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`)
});

// backend/services/BlogService.ts
import { eq, desc, and, like, or, sql as sql2 } from "drizzle-orm";
var BlogService = class {
  /**
   * Get all blog posts with filters
   */
  static async getAll(filters) {
    const conditions = [];
    if (filters?.status)
      conditions.push(eq(blogPosts.status, filters.status));
    if (filters?.lang)
      conditions.push(eq(blogPosts.lang, filters.lang));
    if (filters?.featured !== void 0)
      conditions.push(eq(blogPosts.featured, filters.featured));
    if (conditions.length > 0) {
      if (filters?.limit) {
        return await db.select().from(blogPosts).where(and(...conditions)).orderBy(desc(blogPosts.published_at)).limit(filters.limit).offset(filters?.offset || 0);
      } else {
        return await db.select().from(blogPosts).where(and(...conditions)).orderBy(desc(blogPosts.published_at));
      }
    } else {
      if (filters?.limit) {
        return await db.select().from(blogPosts).orderBy(desc(blogPosts.published_at)).limit(filters.limit).offset(filters?.offset || 0);
      } else {
        return await db.select().from(blogPosts).orderBy(desc(blogPosts.published_at));
      }
    }
  }
  /**
   * Get blog post by slug
   */
  static async getBySlug(slug) {
    const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
    return result[0] || null;
  }
  /**
   * Get blog post by ID
   */
  static async getById(id) {
    const result = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
    return result[0] || null;
  }
  /**
   * Create new blog post
   */
  static async create(data) {
    const slug = data.slug || this.generateSlug(data.title);
    const wordCount = data.content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);
    const newPost = {
      title: data.title,
      slug,
      excerpt: data.excerpt,
      content: data.content,
      featured_image: data.featured_image,
      featured: data.featured || false,
      status: data.status || "draft",
      lang: data.lang,
      meta_title: data.meta_title,
      meta_description: data.meta_description,
      tags: data.tags,
      author_name: data.author_name,
      author_avatar_url: data.author_avatar_url,
      author_position: data.author_position,
      reading_time: data.reading_time || readingTime,
      published_at: data.published_at || (data.status === "published" ? /* @__PURE__ */ new Date() : null)
    };
    const result = await db.insert(blogPosts).values(newPost);
    const blogs = await db.select().from(blogPosts).orderBy(desc(blogPosts.id)).limit(1);
    return blogs[0] || null;
  }
  /**
   * Update blog post
   */
  static async update(id, data) {
    const updateData = { ...data };
    if (data.title && !data.slug) {
      updateData.slug = this.generateSlug(data.title);
    }
    if (data.content) {
      const wordCount = data.content.split(/\s+/).length;
      updateData.reading_time = Math.ceil(wordCount / 200);
    }
    if (data.status === "published" && !data.published_at) {
      updateData.published_at = /* @__PURE__ */ new Date();
    }
    await db.update(blogPosts).set(updateData).where(eq(blogPosts.id, id));
    return this.getById(id);
  }
  /**
   * Delete blog post
   */
  static async delete(id) {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return true;
  }
  /**
   * Search blog posts
   */
  static async search(query, lang) {
    const conditions = [
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
    return await db.select().from(blogPosts).where(and(...conditions)).orderBy(desc(blogPosts.published_at));
  }
  /**
   * Get featured blog posts
   */
  static async getFeatured(lang, limit = 3) {
    const conditions = [eq(blogPosts.featured, true)];
    if (lang) {
      conditions.push(eq(blogPosts.lang, lang));
    }
    return await db.select().from(blogPosts).where(and(...conditions)).orderBy(desc(blogPosts.published_at)).limit(limit);
  }
  /**
   * Get related blog posts
   */
  static async getRelated(currentId, lang, limit = 3) {
    const conditions = [];
    if (lang) {
      conditions.push(eq(blogPosts.lang, lang));
    }
    const query = db.select().from(blogPosts).where(and(...conditions)).orderBy(desc(blogPosts.published_at)).limit(limit);
    return await query;
  }
  /**
   * Generate slug from title
   */
  static generateSlug(title) {
    return title.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-");
  }
  /**
   * Check if slug exists
   */
  static async slugExists(slug, excludeId) {
    const conditions = [eq(blogPosts.slug, slug)];
    if (excludeId) {
      conditions.push(sql2`${blogPosts.id} != ${excludeId}`);
    }
    const result = await db.select({ id: blogPosts.id }).from(blogPosts).where(and(...conditions)).limit(1);
    return result.length > 0;
  }
};

// backend/middleware/validation.ts
import { z } from "zod";
var blogSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title too long"),
  slug: z.string().optional().refine((val) => {
    if (!val || val === "")
      return true;
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(val);
  }, "Invalid slug format"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  featured_image: z.string().optional(),
  featured: z.boolean().optional(),
  status: z.enum(["draft", "published"]).optional(),
  lang: z.string().min(1, "Language is required").max(2, "Language code too long"),
  meta_title: z.string().max(255, "Meta title too long").optional(),
  meta_description: z.string().optional(),
  tags: z.string().optional(),
  author_name: z.string().max(255, "Author name too long").optional(),
  author_avatar_url: z.string().optional(),
  author_position: z.string().max(255, "Author position too long").optional(),
  reading_time: z.number().int().min(1).optional(),
  published_at: z.string().optional().refine((val) => {
    if (!val || val === "")
      return true;
    return !isNaN(Date.parse(val));
  }, "Invalid date format")
});
var contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name too long"),
  email: z.string().email("Invalid email format").max(255, "Email too long"),
  phone: z.string().max(50, "Phone too long").optional(),
  company: z.string().max(255, "Company name too long").optional(),
  serviceInterested: z.string().max(100, "Service interested too long").optional(),
  message: z.string().min(1, "Message is required").max(5e3, "Message too long"),
  source: z.string().max(100, "Source too long").optional()
});
var translationSchema = z.object({
  lang: z.string().min(1, "Language is required").max(10, "Language code too long"),
  key: z.string().min(1, "Key is required").max(255, "Key too long"),
  value: z.string().min(1, "Value is required"),
  category: z.string().max(100, "Category too long").optional(),
  description: z.string().optional()
});
var languageSchema = z.object({
  code: z.string().min(1, "Code is required").max(10, "Code too long").regex(/^[a-z]{2,3}(-[A-Z]{2})?$/, "Invalid language code format"),
  name: z.string().min(1, "Name is required").max(255, "Name too long"),
  nativeName: z.string().min(1, "Native name is required").max(255, "Native name too long"),
  flag: z.string().max(255, "Flag too long").optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().min(0).optional()
});
function createValidationMiddleware(schema) {
  return (req, res, next) => {
    try {
      const result = schema.safeParse(req.body);
      if (!result.success) {
        const errors = result.error.errors.map((error) => ({
          field: error.path.join("."),
          message: error.message
        }));
        return res.status(400).json({
          success: false,
          error: "Validation failed",
          details: errors
        });
      }
      req.body = result.data;
      next();
    } catch (error) {
      console.error("Validation middleware error:", error);
      res.status(500).json({
        success: false,
        error: "Internal validation error"
      });
    }
  };
}
var validateBlogData = createValidationMiddleware(blogSchema);
var validateContactData = createValidationMiddleware(contactSchema);
var validateTranslationData = createValidationMiddleware(translationSchema);
var validateLanguageData = createValidationMiddleware(languageSchema);
var validateBlogDataPartial = createValidationMiddleware(blogSchema.partial());
var validateContactDataPartial = createValidationMiddleware(contactSchema.partial());
var validateTranslationDataPartial = createValidationMiddleware(translationSchema.partial());
var validateLanguageDataPartial = createValidationMiddleware(languageSchema.partial());

// backend/routes/blogRoutes.ts
var router = express.Router();
router.get("/", async (req, res) => {
  try {
    const { status, lang, featured, limit, offset } = req.query;
    const filters = {};
    if (status)
      filters.status = status;
    if (lang)
      filters.lang = lang;
    if (featured !== void 0)
      filters.featured = featured === "true";
    if (limit)
      filters.limit = parseInt(limit);
    if (offset)
      filters.offset = parseInt(offset);
    console.log("Filters:", filters);
    const blogs = await BlogService.getAll(filters);
    console.log("Found blogs:", blogs.length);
    res.json({
      success: true,
      data: blogs,
      total: blogs.length
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch blogs"
    });
  }
});
router.get("/search", async (req, res) => {
  try {
    const { q, lang } = req.query;
    if (!q) {
      return res.status(400).json({
        success: false,
        error: "Search query is required"
      });
    }
    const results = await BlogService.search(q, lang);
    res.json({
      success: true,
      data: results,
      total: results.length
    });
  } catch (error) {
    console.error("Error searching blogs:", error);
    res.status(500).json({
      success: false,
      error: "Search failed"
    });
  }
});
router.get("/featured", async (req, res) => {
  try {
    const { lang, limit } = req.query;
    const blogs = await BlogService.getFeatured(
      lang,
      limit ? parseInt(limit) : void 0
    );
    res.json({
      success: true,
      data: blogs
    });
  } catch (error) {
    console.error("Error fetching featured blogs:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch featured blogs"
    });
  }
});
router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await BlogService.getBySlug(slug);
    if (!blog) {
      return res.status(404).json({
        success: false,
        error: "Blog not found"
      });
    }
    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch blog"
    });
  }
});
router.get("/:id/related", async (req, res) => {
  try {
    const { id } = req.params;
    const { limit } = req.query;
    const blogs = await BlogService.getRelated(
      parseInt(id),
      void 0,
      limit ? parseInt(limit) : void 0
    );
    res.json({
      success: true,
      data: blogs
    });
  } catch (error) {
    console.error("Error fetching related blogs:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch related blogs"
    });
  }
});
router.post("/", validateBlogData, async (req, res) => {
  try {
    const slugExists = await BlogService.slugExists(req.body.slug);
    if (slugExists) {
      return res.status(400).json({
        success: false,
        error: "Slug already exists"
      });
    }
    const blog = await BlogService.create(req.body);
    res.status(201).json({
      success: true,
      data: blog,
      message: "Blog created successfully"
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create blog"
    });
  }
});
router.put("/:id", validateBlogData, async (req, res) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id);
    if (req.body.slug) {
      const slugExists = await BlogService.slugExists(req.body.slug, numericId);
      if (slugExists) {
        return res.status(400).json({
          success: false,
          error: "Slug already exists"
        });
      }
    }
    const blog = await BlogService.update(numericId, req.body);
    if (!blog) {
      return res.status(404).json({
        success: false,
        error: "Blog not found"
      });
    }
    res.json({
      success: true,
      data: blog,
      message: "Blog updated successfully"
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update blog"
    });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id);
    const blog = await BlogService.getById(numericId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        error: "Blog not found"
      });
    }
    await BlogService.delete(numericId);
    res.json({
      success: true,
      message: "Blog deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete blog"
    });
  }
});
var blogRoutes_default = router;

// backend/routes/contactRoutes.ts
import express2 from "express";

// backend/services/ContactService.ts
import { eq as eq2, desc as desc2, and as and2, like as like2, or as or2, sql as sql3 } from "drizzle-orm";
var ContactService = class {
  /**
   * Get all contacts with filters
   */
  static async getAll(filters) {
    const conditions = [];
    if (filters?.status)
      conditions.push(eq2(contacts.status, filters.status));
    if (filters?.priority)
      conditions.push(eq2(contacts.priority, filters.priority));
    if (filters?.responded !== void 0)
      conditions.push(eq2(contacts.responded, filters.responded));
    const result = await db.select().from(contacts).where(conditions.length > 0 ? and2(...conditions) : void 0).orderBy(desc2(contacts.createdAt)).limit(filters?.limit || 100).offset(filters?.offset || 0);
    return result;
  }
  /**
   * Get contact by ID
   */
  static async getById(id) {
    const result = await db.select().from(contacts).where(eq2(contacts.id, id)).limit(1);
    return result[0] || null;
  }
  /**
   * Create new contact
   */
  static async create(data) {
    const newContact = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      serviceInterested: data.serviceInterested,
      message: data.message,
      source: data.source || "website",
      status: "new",
      priority: "normal",
      responded: false
    };
    const result = await db.insert(contacts).values(newContact);
    return result;
  }
  /**
   * Update contact
   */
  static async update(id, data) {
    const updateData = { ...data };
    if (data.responded === true) {
      updateData.respondedAt = /* @__PURE__ */ new Date();
    }
    await db.update(contacts).set(updateData).where(eq2(contacts.id, id));
    return await this.getById(id);
  }
  /**
   * Delete contact
   */
  static async delete(id) {
    await db.delete(contacts).where(eq2(contacts.id, id));
    return true;
  }
  /**
   * Search contacts
   */
  static async search(query) {
    const searchConditions = [
      like2(contacts.name, `%${query}%`),
      like2(contacts.email, `%${query}%`),
      like2(contacts.company, `%${query}%`),
      like2(contacts.message, `%${query}%`)
    ];
    return await db.select().from(contacts).where(or2(...searchConditions)).orderBy(desc2(contacts.createdAt));
  }
  /**
   * Mark contact as responded
   */
  static async markAsResponded(id, respondedBy, adminNote) {
    return await this.update(id, {
      status: "responded",
      responded: true,
      respondedBy,
      adminNote
    });
  }
  /**
   * Get contact statistics
   */
  static async getStats() {
    const [
      totalResult,
      newResult,
      inProgressResult,
      respondedResult,
      closedResult
    ] = await Promise.all([
      db.select({ count: sql3`count(*)` }).from(contacts),
      db.select({ count: sql3`count(*)` }).from(contacts).where(eq2(contacts.status, "new")),
      db.select({ count: sql3`count(*)` }).from(contacts).where(eq2(contacts.status, "in-progress")),
      db.select({ count: sql3`count(*)` }).from(contacts).where(eq2(contacts.status, "responded")),
      db.select({ count: sql3`count(*)` }).from(contacts).where(eq2(contacts.status, "closed"))
    ]);
    return {
      total: totalResult[0]?.count || 0,
      new: newResult[0]?.count || 0,
      inProgress: inProgressResult[0]?.count || 0,
      responded: respondedResult[0]?.count || 0,
      closed: closedResult[0]?.count || 0
    };
  }
};

// backend/routes/contactRoutes.ts
var router2 = express2.Router();
router2.get("/", async (req, res) => {
  try {
    const { status, priority, responded, limit, offset } = req.query;
    const filters = {
      status,
      priority,
      responded: responded === "true",
      limit: limit ? parseInt(limit) : void 0,
      offset: offset ? parseInt(offset) : void 0
    };
    const contacts2 = await ContactService.getAll(filters);
    res.json({
      success: true,
      data: contacts2,
      total: contacts2.length
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch contacts"
    });
  }
});
router2.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({
        success: false,
        error: "Search query is required"
      });
    }
    const results = await ContactService.search(q);
    res.json({
      success: true,
      data: results,
      total: results.length
    });
  } catch (error) {
    console.error("Error searching contacts:", error);
    res.status(500).json({
      success: false,
      error: "Search failed"
    });
  }
});
router2.get("/stats", async (req, res) => {
  try {
    const stats = await ContactService.getStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error("Error fetching contact stats:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch statistics"
    });
  }
});
router2.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await ContactService.getById(id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: "Contact not found"
      });
    }
    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error("Error fetching contact:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch contact"
    });
  }
});
router2.post("/", validateContactData, async (req, res) => {
  try {
    const contact = await ContactService.create(req.body);
    res.status(201).json({
      success: true,
      data: contact,
      message: "Contact message sent successfully"
    });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({
      success: false,
      error: "Failed to send contact message"
    });
  }
});
router2.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await ContactService.update(id, req.body);
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: "Contact not found"
      });
    }
    res.json({
      success: true,
      data: contact,
      message: "Contact updated successfully"
    });
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update contact"
    });
  }
});
router2.put("/:id/respond", async (req, res) => {
  try {
    const { id } = req.params;
    const { respondedBy, adminNote } = req.body;
    if (!respondedBy) {
      return res.status(400).json({
        success: false,
        error: "respondedBy is required"
      });
    }
    const contact = await ContactService.markAsResponded(id, respondedBy, adminNote);
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: "Contact not found"
      });
    }
    res.json({
      success: true,
      data: contact,
      message: "Contact marked as responded"
    });
  } catch (error) {
    console.error("Error marking contact as responded:", error);
    res.status(500).json({
      success: false,
      error: "Failed to mark contact as responded"
    });
  }
});
router2.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await ContactService.getById(id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: "Contact not found"
      });
    }
    await ContactService.delete(id);
    res.json({
      success: true,
      message: "Contact deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete contact"
    });
  }
});
var contactRoutes_default = router2;

// backend/routes/translationRoutes.ts
import express3 from "express";

// backend/services/TranslationService.ts
import { eq as eq3, and as and3, like as like3, or as or3, sql as sql4 } from "drizzle-orm";
import { nanoid } from "nanoid";
var TranslationService = class {
  /**
   * Get all translations
   */
  static async getAll(filters) {
    const conditions = [];
    if (filters?.lang)
      conditions.push(eq3(translations.lang, filters.lang));
    if (filters?.category)
      conditions.push(eq3(translations.category, filters.category));
    if (conditions.length > 0) {
      return await db.select().from(translations).where(and3(...conditions)).orderBy(translations.key, translations.lang).limit(filters?.limit || 1e3).offset(filters?.offset || 0);
    } else {
      return await db.select().from(translations).orderBy(translations.key, translations.lang).limit(filters?.limit || 1e3).offset(filters?.offset || 0);
    }
  }
  /**
   * Get translations by language code
   */
  static async getByLang(lang) {
    return await db.select().from(translations).where(eq3(translations.lang, lang)).orderBy(translations.key);
  }
  /**
   * Get translations as key-value object for a language
   */
  static async getTranslationMap(lang, category) {
    const conditions = [eq3(translations.lang, lang)];
    if (category)
      conditions.push(eq3(translations.category, category));
    const result = await db.select().from(translations).where(and3(...conditions));
    const translationMap = {};
    result.forEach((t) => {
      translationMap[t.key] = t.value;
    });
    return translationMap;
  }
  /**
   * Get translation by key and language
   */
  static async getByKeyAndLang(key, lang) {
    const result = await db.select().from(translations).where(and3(eq3(translations.key, key), eq3(translations.lang, lang))).limit(1);
    return result[0] || null;
  }
  /**
   * Create or update translation
   */
  static async upsert(data) {
    const existing = await this.getByKeyAndLang(data.key, data.lang);
    if (existing) {
      await db.update(translations).set({
        value: data.value,
        category: data.category,
        description: data.description
      }).where(eq3(translations.id, existing.id));
      return await this.getById(existing.id);
    } else {
      const id = nanoid();
      const newTranslation = {
        id,
        lang: data.lang,
        key: data.key,
        value: data.value,
        category: data.category || "common",
        description: data.description
      };
      await db.insert(translations).values(newTranslation);
      return await this.getById(id);
    }
  }
  /**
   * Update translation
   */
  static async update(id, data) {
    await db.update(translations).set(data).where(eq3(translations.id, id));
    return await this.getById(id);
  }
  /**
   * Delete translation
   */
  static async delete(id) {
    await db.delete(translations).where(eq3(translations.id, id));
    return true;
  }
  /**
   * Search translations
   */
  static async search(query, lang) {
    const searchConditions = [
      like3(translations.key, `%${query}%`),
      like3(translations.value, `%${query}%`)
    ];
    let conditions = or3(...searchConditions);
    if (lang) {
      conditions = and3(conditions, eq3(translations.lang, lang));
    }
    return await db.select().from(translations).where(conditions).orderBy(translations.key);
  }
  /**
   * Get translation by ID
   */
  static async getById(id) {
    const result = await db.select().from(translations).where(eq3(translations.id, id)).limit(1);
    return result[0] || null;
  }
  /**
   * Get all translation categories
   */
  static async getCategories() {
    const result = await db.selectDistinct({ category: translations.category }).from(translations).where(sql4`${translations.category} IS NOT NULL`);
    return result.map((r) => r.category).filter(Boolean);
  }
  /**
   * Bulk import translations
   */
  static async bulkImport(translationsData) {
    const results = [];
    for (const data of translationsData) {
      const result = await this.upsert(data);
      results.push(result);
    }
    return results;
  }
};
var LanguageService = class {
  /**
   * Get all languages
   */
  static async getAll(activeOnly = false) {
    if (activeOnly) {
      return await db.select().from(languages).where(eq3(languages.isActive, true)).orderBy(languages.sortOrder, languages.name);
    } else {
      return await db.select().from(languages).orderBy(languages.sortOrder, languages.name);
    }
  }
  /**
   * Get language by code
   */
  static async getByCode(code) {
    const result = await db.select().from(languages).where(eq3(languages.code, code)).limit(1);
    return result[0] || null;
  }
  /**
   * Create language
   */
  static async create(data) {
    const id = nanoid();
    const newLanguage = {
      id,
      code: data.code,
      name: data.name,
      nativeName: data.nativeName,
      flag: data.flag,
      isActive: data.isActive !== void 0 ? data.isActive : true,
      sortOrder: data.sortOrder || 0
    };
    await db.insert(languages).values(newLanguage);
    return await this.getById(id);
  }
  /**
   * Update language
   */
  static async update(id, data) {
    await db.update(languages).set(data).where(eq3(languages.id, id));
    return await this.getById(id);
  }
  /**
   * Delete language
   */
  static async delete(id) {
    const language = await this.getById(id);
    if (language) {
      await db.delete(translations).where(eq3(translations.lang, language.code));
    }
    await db.delete(languages).where(eq3(languages.id, id));
    return true;
  }
  /**
   * Get language by ID
   */
  static async getById(id) {
    const result = await db.select().from(languages).where(eq3(languages.id, id)).limit(1);
    return result[0] || null;
  }
  /**
   * Check if language code exists
   */
  static async codeExists(code, excludeId) {
    if (excludeId) {
      const result = await db.select({ id: languages.id }).from(languages).where(and3(
        eq3(languages.code, code),
        sql4`${languages.id} != ${excludeId}`
      )).limit(1);
      return result.length > 0;
    } else {
      const result = await db.select({ id: languages.id }).from(languages).where(eq3(languages.code, code)).limit(1);
      return result.length > 0;
    }
  }
};

// backend/routes/translationRoutes.ts
var router3 = express3.Router();
router3.get("/", async (req, res) => {
  try {
    const { lang, category, limit, offset } = req.query;
    const filters = {
      lang,
      category,
      limit: limit ? parseInt(limit) : void 0,
      offset: offset ? parseInt(offset) : void 0
    };
    const translations2 = await TranslationService.getAll(filters);
    res.json({
      success: true,
      data: translations2,
      total: translations2.length
    });
  } catch (error) {
    console.error("Error fetching translations:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch translations"
    });
  }
});
router3.get("/:lang", async (req, res) => {
  try {
    const { lang } = req.params;
    const { category } = req.query;
    const translationMap = await TranslationService.getTranslationMap(
      lang,
      category
    );
    res.json({
      success: true,
      data: translationMap
    });
  } catch (error) {
    console.error("Error fetching translation map:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch translation map"
    });
  }
});
router3.get("/search", async (req, res) => {
  try {
    const { q, lang } = req.query;
    if (!q) {
      return res.status(400).json({
        success: false,
        error: "Search query is required"
      });
    }
    const results = await TranslationService.search(q, lang);
    res.json({
      success: true,
      data: results,
      total: results.length
    });
  } catch (error) {
    console.error("Error searching translations:", error);
    res.status(500).json({
      success: false,
      error: "Search failed"
    });
  }
});
router3.get("/categories", async (req, res) => {
  try {
    const categories = await TranslationService.getCategories();
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error("Error fetching translation categories:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch categories"
    });
  }
});
router3.post("/", async (req, res) => {
  try {
    const { lang, key, value, category, description } = req.body;
    if (!lang || !key || !value) {
      return res.status(400).json({
        success: false,
        error: "lang, key, and value are required"
      });
    }
    const translation = await TranslationService.upsert({
      lang,
      key,
      value,
      category,
      description
    });
    res.status(201).json({
      success: true,
      data: translation,
      message: "Translation saved successfully"
    });
  } catch (error) {
    console.error("Error saving translation:", error);
    res.status(500).json({
      success: false,
      error: "Failed to save translation"
    });
  }
});
router3.post("/bulk", async (req, res) => {
  try {
    const { translations: translations2 } = req.body;
    if (!Array.isArray(translations2)) {
      return res.status(400).json({
        success: false,
        error: "translations must be an array"
      });
    }
    const results = await TranslationService.bulkImport(translations2);
    res.json({
      success: true,
      data: results,
      message: `${results.length} translations imported successfully`
    });
  } catch (error) {
    console.error("Error bulk importing translations:", error);
    res.status(500).json({
      success: false,
      error: "Failed to import translations"
    });
  }
});
router3.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const translation = await TranslationService.update(id, req.body);
    if (!translation) {
      return res.status(404).json({
        success: false,
        error: "Translation not found"
      });
    }
    res.json({
      success: true,
      data: translation,
      message: "Translation updated successfully"
    });
  } catch (error) {
    console.error("Error updating translation:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update translation"
    });
  }
});
router3.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await TranslationService.delete(id);
    res.json({
      success: true,
      message: "Translation deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting translation:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete translation"
    });
  }
});
var translationRoutes_default = router3;

// backend/routes/languageRoutes.ts
import express4 from "express";
var router4 = express4.Router();
router4.get("/", async (req, res) => {
  try {
    const { active } = req.query;
    const languages2 = await LanguageService.getAll(active === "true");
    res.json({
      success: true,
      data: languages2
    });
  } catch (error) {
    console.error("Error fetching languages:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch languages"
    });
  }
});
router4.get("/:code", async (req, res) => {
  try {
    const { code } = req.params;
    const language = await LanguageService.getByCode(code);
    if (!language) {
      return res.status(404).json({
        success: false,
        error: "Language not found"
      });
    }
    res.json({
      success: true,
      data: language
    });
  } catch (error) {
    console.error("Error fetching language:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch language"
    });
  }
});
router4.post("/", async (req, res) => {
  try {
    const { code, name, nativeName, flag, isActive, sortOrder } = req.body;
    if (!code || !name || !nativeName) {
      return res.status(400).json({
        success: false,
        error: "code, name, and nativeName are required"
      });
    }
    const exists = await LanguageService.codeExists(code);
    if (exists) {
      return res.status(400).json({
        success: false,
        error: "Language code already exists"
      });
    }
    const language = await LanguageService.create({
      code,
      name,
      nativeName,
      flag,
      isActive,
      sortOrder
    });
    res.status(201).json({
      success: true,
      data: language,
      message: "Language created successfully"
    });
  } catch (error) {
    console.error("Error creating language:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create language"
    });
  }
});
router4.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { code } = req.body;
    if (code) {
      const exists = await LanguageService.codeExists(code, id);
      if (exists) {
        return res.status(400).json({
          success: false,
          error: "Language code already exists"
        });
      }
    }
    const language = await LanguageService.update(id, req.body);
    if (!language) {
      return res.status(404).json({
        success: false,
        error: "Language not found"
      });
    }
    res.json({
      success: true,
      data: language,
      message: "Language updated successfully"
    });
  } catch (error) {
    console.error("Error updating language:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update language"
    });
  }
});
router4.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await LanguageService.delete(id);
    res.json({
      success: true,
      message: "Language deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting language:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete language"
    });
  }
});
var languageRoutes_default = router4;

// backend/routes/uploadRoutes.ts
import express5 from "express";
import multer from "multer";
import path2 from "path";
import fs from "fs";
import { fileURLToPath as fileURLToPath2 } from "url";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = path2.dirname(__filename2);
var router5 = express5.Router();
var UPLOADS_BASE_PATH = process.env.UPLOADS_PATH || path2.join(process.cwd(), "uploads");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadDir;
    console.log("Upload request - type:", req.body.type, "customPath:", req.body.customPath);
    if (req.body.customPath) {
      uploadDir = path2.join(UPLOADS_BASE_PATH, req.body.customPath);
    } else {
      if (req.body.type === "avatar") {
        uploadDir = path2.join(UPLOADS_BASE_PATH, "avatars");
      } else {
        uploadDir = path2.join(UPLOADS_BASE_PATH, "blog");
      }
    }
    console.log("Upload destination:", uploadDir);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
      console.log("Created directory:", uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path2.extname(file.originalname);
    const filename = file.fieldname + "-" + uniqueSuffix + ext;
    cb(null, filename);
  }
});
var upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024
    // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path2.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  }
});
router5.post("/", (req, res) => {
  const dynamicUpload = multer({
    storage: multer.diskStorage({
      destination: (req2, file, cb) => {
        const type = req2.body.type || "blog";
        const customPath = req2.body.customPath;
        console.log("Dynamic upload - type:", type, "customPath:", customPath);
        let uploadDir;
        if (customPath) {
          uploadDir = path2.join(UPLOADS_BASE_PATH, customPath);
        } else {
          if (type === "avatar") {
            uploadDir = path2.join(UPLOADS_BASE_PATH, "avatars");
          } else {
            uploadDir = path2.join(UPLOADS_BASE_PATH, "blog");
          }
        }
        console.log("Dynamic upload destination:", uploadDir);
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
      },
      filename: (req2, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path2.extname(file.originalname);
        const filename = file.fieldname + "-" + uniqueSuffix + ext;
        cb(null, filename);
      }
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req2, file, cb) => {
      const allowedTypes = /jpeg|jpg|png|gif|webp/;
      const extname = allowedTypes.test(path2.extname(file.originalname).toLowerCase());
      const mimetype = allowedTypes.test(file.mimetype);
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(new Error("Only image files are allowed"));
      }
    }
  }).single("image");
  dynamicUpload(req, res, (err) => {
    if (err) {
      console.error("Multer error:", err);
      return res.status(400).json({
        success: false,
        error: err.message
      });
    }
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: "No file uploaded"
        });
      }
      console.log("=== UPLOAD DEBUG ===");
      console.log("req.body:", req.body);
      console.log("req.body.type:", req.body.type);
      console.log("req.body.customPath:", req.body.customPath);
      console.log("typeof req.body.type:", typeof req.body.type);
      const type = req.body.type || "blog";
      const customPath = req.body.customPath;
      console.log("Final type after default:", type);
      let relativePath;
      if (customPath) {
        relativePath = `uploads/${customPath}/${req.file.filename}`;
      } else {
        if (type === "avatar") {
          relativePath = `uploads/avatars/${req.file.filename}`;
        } else {
          relativePath = `uploads/blog/${req.file.filename}`;
        }
      }
      console.log("Upload completed - type:", type, "path:", relativePath);
      res.json({
        success: true,
        data: {
          filename: req.file.filename,
          originalName: req.file.originalname,
          path: relativePath,
          size: req.file.size,
          mimetype: req.file.mimetype
        }
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to upload file"
      });
    }
  });
});
router5.get("/files", (req, res) => {
  try {
    const { type = "blog" } = req.query;
    let folderName = type;
    if (type === "avatar") {
      folderName = "avatars";
    }
    const uploadDir = path2.join(UPLOADS_BASE_PATH, folderName);
    console.log(`=== API called with type: ${type} ===`);
    console.log(`Folder name: ${folderName}`);
    console.log(`Looking for files in: ${uploadDir}`);
    console.log(`Directory exists: ${fs.existsSync(uploadDir)}`);
    if (!fs.existsSync(uploadDir)) {
      console.log("Directory not found, returning empty array");
      return res.json({ success: true, data: [] });
    }
    const allFiles = fs.readdirSync(uploadDir);
    console.log(`All files in directory: ${allFiles}`);
    const imageFiles = allFiles.filter((file) => {
      const ext = path2.extname(file).toLowerCase();
      const isImage = [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(ext);
      console.log(`File: ${file}, Extension: ${ext}, Is Image: ${isImage}`);
      return isImage;
    });
    console.log(`Image files: ${imageFiles}`);
    const files = imageFiles.map((file) => {
      const stats = fs.statSync(path2.join(uploadDir, file));
      const fileData = {
        filename: file,
        originalName: file,
        path: `uploads/${folderName}/${file}`,
        size: stats.size,
        mimetype: getMimeType(file),
        createdAt: stats.birthtime,
        modifiedAt: stats.mtime,
        type
        // Keep original type (avatar or blog)
      };
      console.log(`Processed file:`, fileData);
      return fileData;
    });
    console.log(`=== Final result: ${files.length} files ===`);
    console.log("Files:", files);
    res.json({
      success: true,
      data: files,
      total: files.length
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to list files"
    });
  }
});
router5.put("/files/:filename/rename", async (req, res) => {
  try {
    const { filename } = req.params;
    const { newFilename, type } = req.body;
    if (!newFilename) {
      return res.status(400).json({
        success: false,
        error: "New filename is required"
      });
    }
    const uploadDir = type === "avatar" ? path2.join(UPLOADS_BASE_PATH, "avatars") : path2.join(UPLOADS_BASE_PATH, "blog");
    const oldPath = path2.join(uploadDir, filename);
    const newPath = path2.join(uploadDir, newFilename);
    const fs2 = __require("fs");
    if (!fs2.existsSync(oldPath)) {
      return res.status(404).json({
        success: false,
        error: "File not found"
      });
    }
    if (fs2.existsSync(newPath)) {
      return res.status(409).json({
        success: false,
        error: "A file with that name already exists"
      });
    }
    fs2.renameSync(oldPath, newPath);
    res.json({
      success: true,
      message: "File renamed successfully",
      data: {
        oldFilename: filename,
        newFilename,
        path: `uploads/${type}/${newFilename}`
      }
    });
  } catch (error) {
    console.error("Error renaming file:", error);
    res.status(500).json({
      success: false,
      error: "Failed to rename file"
    });
  }
});
router5.delete("/files/:filename", async (req, res) => {
  try {
    const { filename } = req.params;
    const { type } = req.body;
    const uploadDir = type === "avatar" ? path2.join(UPLOADS_BASE_PATH, "avatars") : path2.join(UPLOADS_BASE_PATH, "blog");
    const filePath = path2.join(uploadDir, filename);
    const fs2 = __require("fs");
    if (!fs2.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        error: "File not found"
      });
    }
    fs2.unlinkSync(filePath);
    res.json({
      success: true,
      message: "File deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete file"
    });
  }
});
function getMimeType(filename) {
  const ext = path2.extname(filename).toLowerCase();
  const mimeTypes = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp"
  };
  return mimeTypes[ext] || "application/octet-stream";
}
router5.get("/debug", (req, res) => {
  const debugInfo = {
    cwd: process.cwd(),
    __dirname: __dirname2,
    paths: {
      uploadsFromCwd: path2.join(process.cwd(), "uploads"),
      uploadsFromDirname: path2.join(__dirname2, "../uploads"),
      absolutePath: "D:\\Code\\Cadimar-nextjs\\cadimar-landingpage-next\\uploads"
    },
    exists: {},
    contents: {}
  };
  Object.entries(debugInfo.paths).forEach(([key, testPath]) => {
    debugInfo.exists[key] = fs.existsSync(testPath);
    if (fs.existsSync(testPath)) {
      try {
        debugInfo.contents[key] = fs.readdirSync(testPath);
      } catch (error) {
        debugInfo.contents[key] = `Error reading: ${error.message}`;
      }
    }
  });
  res.json(debugInfo);
});
router5.get("/test-files", (req, res) => {
  const testPaths = [
    "D:\\Code\\Cadimar-nextjs\\cadimar-landingpage-next\\uploads\\blog",
    "D:\\Code\\Cadimar-nextjs\\cadimar-landingpage-next\\uploads\\avatars",
    path2.join(process.cwd(), "uploads", "blog"),
    path2.join(process.cwd(), "uploads", "avatars"),
    path2.join(__dirname2, "..", "uploads", "blog"),
    path2.join(__dirname2, "..", "uploads", "avatars")
  ];
  const results = {};
  testPaths.forEach((testPath) => {
    try {
      if (fs.existsSync(testPath)) {
        const files = fs.readdirSync(testPath);
        results[testPath] = {
          exists: true,
          files,
          count: files.length
        };
      } else {
        results[testPath] = {
          exists: false,
          files: [],
          count: 0
        };
      }
    } catch (error) {
      results[testPath] = {
        exists: false,
        error: error.message,
        files: [],
        count: 0
      };
    }
  });
  res.json({
    success: true,
    cwd: process.cwd(),
    __dirname: __dirname2,
    results
  });
});
router5.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Upload endpoint is working",
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
});
var uploadRoutes_default = router5;

// backend/server.ts
var __filename3 = fileURLToPath3(import.meta.url);
var __dirname3 = path3.dirname(__filename3);
dotenv2.config({ path: path3.join(__dirname3, "..", ".env.local") });
var app = express6();
var PORT = Number(process.env.BACKEND_PORT) || 3001;
var FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
console.log("\u{1F527} Environment:", {
  NODE_ENV: process.env.NODE_ENV,
  PORT,
  FRONTEND_URL,
  DB_NAME: process.env.DB_NAME
});
app.use(helmet({
  crossOriginEmbedderPolicy: false
}));
app.use(compression());
app.use(morgan("combined"));
app.use(cors({
  origin: [
    FRONTEND_URL,
    "http://localhost:3000",
    "http://localhost:3001",
    "http://172.31.16.1:3000",
    "http://172.31.16.1:3001",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001"
  ],
  credentials: true
}));
app.use(express6.json({ limit: "10mb" }));
app.use(express6.urlencoded({ extended: true, limit: "10mb" }));
var uploadsPath = process.env.UPLOADS_PATH || path3.join(__dirname3, "../uploads");
console.log("\u{1F4C1} Uploads path:", uploadsPath);
app.use("/uploads", express6.static(uploadsPath));
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    port: PORT,
    env: process.env.NODE_ENV,
    database: process.env.DB_NAME
  });
});
app.use("/api", (req, res, next) => {
  console.log(`[API] ${req.method} ${req.path}`);
  next();
});
app.use("/api/blogs", blogRoutes_default);
app.use("/api/contacts", contactRoutes_default);
app.use("/api/translations", translationRoutes_default);
app.use("/api/languages", languageRoutes_default);
app.use("/api/upload", uploadRoutes_default);
app.get("/api/test", (req, res) => {
  res.json({
    message: "Backend API is working!",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    environment: process.env.NODE_ENV
  });
});
var server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`\u{1F680} Backend server running on http://localhost:${PORT}`);
  console.log(`\u{1F4DD} Health check: http://localhost:${PORT}/health`);
  console.log(`\u{1F517} API test: http://localhost:${PORT}/api/test`);
});
var server_default = app;
export {
  server_default as default
};
