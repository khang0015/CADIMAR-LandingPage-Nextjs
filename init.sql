-- Initialize CADIMAR database
CREATE DATABASE IF NOT EXISTS cadimar_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE cadimar_db;

-- Create languages table
CREATE TABLE IF NOT EXISTS `languages` (
  `id` varchar(255) NOT NULL,
  `code` varchar(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `native_name` varchar(255) NOT NULL,
  `flag` varchar(255) DEFAULT NULL,
  `is_active` boolean DEFAULT true,
  `sort_order` int DEFAULT 0,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create translations table
CREATE TABLE IF NOT EXISTS `translations` (
  `id` varchar(255) NOT NULL,
  `lang` varchar(10) NOT NULL,
  `key` varchar(255) NOT NULL,
  `value` text NOT NULL,
  `category` varchar(100) DEFAULT 'common',
  `description` text,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS `blog_posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `excerpt` text,
  `content` text NOT NULL,
  `featured_image` text,
  `featured` boolean DEFAULT false,
  `status` enum('draft','published') DEFAULT 'draft',
  `lang` varchar(2) NOT NULL,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_description` text,
  `tags` text,
  `author_name` varchar(255) DEFAULT NULL,
  `author_avatar_url` text,
  `author_position` varchar(255) DEFAULT NULL,
  `reading_time` int DEFAULT NULL,
  `published_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create contacts table
CREATE TABLE IF NOT EXISTS `contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `service_interested` varchar(100) DEFAULT NULL,
  `message` text NOT NULL,
  `source` varchar(100) DEFAULT 'website',
  `status` enum('new','in-progress','responded','closed') DEFAULT 'new',
  `priority` enum('low','normal','high') DEFAULT 'normal',
  `responded` boolean DEFAULT false,
  `notes` text,
  `assigned_to` varchar(255) DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default languages
INSERT IGNORE INTO `languages` (`id`, `code`, `name`, `native_name`, `flag`, `is_active`, `sort_order`) VALUES
('en', 'en', 'English', 'English', '🇺🇸', true, 1),
('vi', 'vi', 'Vietnamese', 'Tiếng Việt', '🇻🇳', true, 2);

-- Insert sample blog posts
INSERT IGNORE INTO `blog_posts` (`id`, `title`, `slug`, `excerpt`, `content`, `featured_image`, `featured`, `status`, `lang`, `meta_title`, `meta_description`, `tags`, `author_name`, `author_avatar_url`, `author_position`, `reading_time`, `published_at`) VALUES
(1, 'The Future of Digital Innovation', 'future-digital-innovation', 'Discover how emerging technologies are reshaping the digital landscape and what it means for businesses in 2024.', 'Digital innovation continues to evolve at an unprecedented pace...', '/blogs/future-digital-innovation.jpg', true, 'published', 'en', 'The Future of Digital Innovation | CADIMAR Blog', 'Explore emerging technologies and digital trends shaping business innovation in 2024. Expert insights from CADIMAR digital marketing team.', 'digital innovation, technology trends, business growth', 'Sarah Chen', '/team/sarah-chen.jpg', 'Head of Strategy', 5, NOW()),
(2, 'AI in Modern Business', 'ai-modern-business', 'How artificial intelligence is transforming business operations and customer experiences across industries.', 'Artificial intelligence has moved from science fiction to business reality...', '/blogs/ai-modern-business.jpg', true, 'published', 'en', 'AI in Modern Business | CADIMAR Insights', 'Learn how AI is revolutionizing business operations and customer experiences. Expert analysis from digital marketing professionals.', 'artificial intelligence, business automation, customer experience', 'Alex Johnson', '/team/alex-johnson.jpg', 'CEO & Founder', 7, NOW()),
(3, 'Digital Transformation Strategies', 'digital-transformation-strategies', 'Essential strategies for successful digital transformation in the modern business landscape.', 'Digital transformation is no longer optional for businesses...', '/blogs/digital-transformation.jpg', false, 'published', 'en', 'Digital Transformation Strategies | CADIMAR', 'Discover proven digital transformation strategies for modern businesses. Expert guidance from CADIMAR digital marketing agency.', 'digital transformation, business strategy, technology adoption', 'Michael Rodriguez', '/team/michael-rodriguez.jpg', 'Creative Director', 6, NOW());

COMMIT;
