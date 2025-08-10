import { mysqlTable, mysqlSchema, AnyMySqlColumn, unique, varchar, text, tinyint, mysqlEnum, longtext, int, timestamp } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const blogPosts = mysqlTable("blog_posts", {
	id: varchar("id", { length: 255 }).notNull(),
	title: varchar("title", { length: 500 }).notNull(),
	slug: varchar("slug", { length: 255 }).notNull(),
	excerpt: text("excerpt").default('NULL'),
	content: text("content").notNull(),
	featuredImage: varchar("featured_image", { length: 500 }).default('NULL'),
	featured: tinyint("featured").default(0),
	status: mysqlEnum("status", ['draft','published','archived']).default(''draft''),
	lang: varchar("lang", { length: 10 }).notNull(),
	metaTitle: varchar("meta_title", { length: 255 }).default('NULL'),
	metaDescription: text("meta_description").default('NULL'),
	tags: longtext("tags").default('NULL'),
	authorId: varchar("author_id", { length: 255 }).default('NULL'),
	authorName: varchar("author_name", { length: 255 }).default('NULL'),
	readingTime: int("reading_time").default('NULL'),
	viewCount: int("view_count").default('NULL'),
	publishedAt: timestamp("published_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
},
(table) => {
	return {
		blogPostsSlugUnique: unique("blog_posts_slug_unique").on(table.slug),
	}
});

export const contacts = mysqlTable("contacts", {
	id: varchar("id", { length: 255 }).notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	phone: varchar("phone", { length: 50 }).default('NULL'),
	company: varchar("company", { length: 255 }).default('NULL'),
	message: text("message").notNull(),
	source: varchar("source", { length: 100 }).default(''website''),
	status: mysqlEnum("status", ['new','in-progress','responded','closed']).default(''new''),
	priority: mysqlEnum("priority", ['low','normal','high']).default(''normal''),
	responded: tinyint("responded").default(0),
	adminNote: text("admin_note").default('NULL'),
	respondedAt: timestamp("responded_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	respondedBy: varchar("responded_by", { length: 255 }).default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
});

export const languages = mysqlTable("languages", {
	id: varchar("id", { length: 255 }).notNull(),
	code: varchar("code", { length: 10 }).notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	nativeName: varchar("native_name", { length: 255 }).notNull(),
	flag: varchar("flag", { length: 255 }).default('NULL'),
	isActive: tinyint("is_active").default(1),
	sortOrder: int("sort_order").default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
},
(table) => {
	return {
		languagesCodeUnique: unique("languages_code_unique").on(table.code),
	}
});

export const translations = mysqlTable("translations", {
	id: varchar("id", { length: 255 }).notNull(),
	lang: varchar("lang", { length: 10 }).notNull(),
	key: varchar("key", { length: 255 }).notNull(),
	value: text("value").notNull(),
	category: varchar("category", { length: 100 }).default(''common''),
	description: text("description").default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
});