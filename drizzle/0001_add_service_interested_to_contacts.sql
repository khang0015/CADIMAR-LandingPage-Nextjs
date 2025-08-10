-- Migration: Add service_interested column to contacts table
-- Created: 2025-08-09

ALTER TABLE `contacts` ADD COLUMN `service_interested` varchar(100);
