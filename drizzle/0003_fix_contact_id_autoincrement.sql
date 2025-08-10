-- Fix contact ID to be auto-increment integer
ALTER TABLE contacts DROP PRIMARY KEY;
ALTER TABLE contacts MODIFY COLUMN id INT AUTO_INCREMENT PRIMARY KEY;
