-- Migration: Update blog_posts table structure
-- Created: 2025-08-09

-- First, backup any existing data if needed
-- CREATE TABLE blog_posts_backup AS SELECT * FROM blog_posts;

-- Drop columns that are no longer needed
ALTER TABLE blog_posts DROP COLUMN IF EXISTS view_count;
ALTER TABLE blog_posts DROP COLUMN IF EXISTS author_id;
ALTER TABLE blog_posts DROP COLUMN IF EXISTS created_at;
ALTER TABLE blog_posts DROP COLUMN IF EXISTS updated_at;

-- Modify primary key to AUTO INCREMENT INT
ALTER TABLE blog_posts DROP PRIMARY KEY;
ALTER TABLE blog_posts MODIFY COLUMN id INT AUTO_INCREMENT PRIMARY KEY;

-- Modify existing columns to match new schema
ALTER TABLE blog_posts MODIFY COLUMN title VARCHAR(255) NOT NULL;
ALTER TABLE blog_posts MODIFY COLUMN content LONGTEXT NOT NULL;
ALTER TABLE blog_posts MODIFY COLUMN lang VARCHAR(2) NOT NULL;

-- Rename columns to match new schema
ALTER TABLE blog_posts CHANGE COLUMN featuredImage featured_image TEXT;
ALTER TABLE blog_posts CHANGE COLUMN metaTitle meta_title VARCHAR(255);
ALTER TABLE blog_posts CHANGE COLUMN metaDescription meta_description TEXT;
ALTER TABLE blog_posts CHANGE COLUMN authorName author_name VARCHAR(255);
ALTER TABLE blog_posts CHANGE COLUMN readingTime reading_time INT;
ALTER TABLE blog_posts CHANGE COLUMN publishedAt published_at TIMESTAMP NULL;

-- Add new columns
ALTER TABLE blog_posts ADD COLUMN author_avatar_url TEXT AFTER author_name;
ALTER TABLE blog_posts ADD COLUMN author_position VARCHAR(255) AFTER author_avatar_url;

-- Modify tags column to be TEXT instead of JSON
ALTER TABLE blog_posts MODIFY COLUMN tags TEXT;

-- Update status enum to only include draft/published
ALTER TABLE blog_posts MODIFY COLUMN status ENUM('draft', 'published') DEFAULT 'draft';

-- Show updated table structure
DESCRIBE blog_posts;
