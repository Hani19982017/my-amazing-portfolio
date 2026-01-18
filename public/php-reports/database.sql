-- Database Schema for Report Scheduler
-- Run this SQL to create the necessary tables

CREATE DATABASE IF NOT EXISTS reports_db;
USE reports_db;

-- Reports Table
CREATE TABLE IF NOT EXISTS reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    report_type ENUM('sales', 'inventory', 'users', 'custom') DEFAULT 'custom',
    query_data TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Schedules Table
CREATE TABLE IF NOT EXISTS schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    report_id INT NOT NULL,
    recipient_email VARCHAR(255) NOT NULL,
    frequency ENUM('daily', 'weekly', 'monthly') NOT NULL,
    send_time TIME DEFAULT '09:00:00',
    day_of_week TINYINT DEFAULT NULL, -- 0=Sunday, 1=Monday, etc.
    day_of_month TINYINT DEFAULT NULL, -- 1-31
    is_active BOOLEAN DEFAULT TRUE,
    last_sent TIMESTAMP NULL,
    next_send TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (report_id) REFERENCES reports(id) ON DELETE CASCADE
);

-- Email Logs Table
CREATE TABLE IF NOT EXISTS email_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    schedule_id INT,
    recipient_email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    status ENUM('sent', 'failed', 'pending') DEFAULT 'pending',
    error_message TEXT,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (schedule_id) REFERENCES schedules(id) ON DELETE SET NULL
);

-- Sample Data
INSERT INTO reports (title, description, report_type) VALUES
('Daily Sales Report', 'Summary of daily sales transactions', 'sales'),
('Weekly Inventory Report', 'Stock levels and inventory status', 'inventory'),
('Monthly User Activity', 'User engagement and activity metrics', 'users');
