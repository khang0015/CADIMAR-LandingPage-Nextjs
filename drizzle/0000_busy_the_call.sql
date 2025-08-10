CREATE TABLE `blog_posts` (
	`id` varchar(255) NOT NULL,
	`title` varchar(500) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`excerpt` text,
	`content` text NOT NULL,
	`featured_image` varchar(500),
	`featured` boolean DEFAULT false,
	`status` enum('draft','published','archived') DEFAULT 'draft',
	`lang` varchar(10) NOT NULL,
	`meta_title` varchar(255),
	`meta_description` text,
	`tags` json,
	`author_id` varchar(255),
	`author_name` varchar(255),
	`reading_time` int,
	`view_count` int DEFAULT 0,
	`published_at` timestamp,
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blog_posts_id` PRIMARY KEY(`id`),
	CONSTRAINT `blog_posts_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `contacts` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone` varchar(50),
	`company` varchar(255),
	`message` text NOT NULL,
	`source` varchar(100) DEFAULT 'website',
	`status` enum('new','in-progress','responded','closed') DEFAULT 'new',
	`priority` enum('low','normal','high') DEFAULT 'normal',
	`responded` boolean DEFAULT false,
	`admin_note` text,
	`responded_at` timestamp,
	`responded_by` varchar(255),
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contacts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `languages` (
	`id` varchar(255) NOT NULL,
	`code` varchar(10) NOT NULL,
	`name` varchar(255) NOT NULL,
	`native_name` varchar(255) NOT NULL,
	`flag` varchar(255),
	`is_active` boolean DEFAULT true,
	`sort_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `languages_id` PRIMARY KEY(`id`),
	CONSTRAINT `languages_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `translations` (
	`id` varchar(255) NOT NULL,
	`lang` varchar(10) NOT NULL,
	`key` varchar(255) NOT NULL,
	`value` text NOT NULL,
	`category` varchar(100) DEFAULT 'common',
	`description` text,
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `translations_id` PRIMARY KEY(`id`)
);
