<?php
/**
 * Configuration File
 * Database and Email Settings
 */

// Database Configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'reports_db');
define('DB_USER', 'root');
define('DB_PASS', '');

// Email Configuration (SMTP)
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USER', 'your-email@gmail.com');
define('SMTP_PASS', 'your-app-password'); // Use App Password for Gmail
define('SMTP_FROM', 'your-email@gmail.com');
define('SMTP_FROM_NAME', 'Report System');

// Application Settings
define('APP_NAME', 'Report Scheduler');
define('APP_URL', 'http://localhost/php-reports');
define('TIMEZONE', 'UTC');

date_default_timezone_set(TIMEZONE);

// Database Connection
function getDBConnection() {
    try {
        $pdo = new PDO(
            "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
            DB_USER,
            DB_PASS,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ]
        );
        return $pdo;
    } catch (PDOException $e) {
        die("Database connection failed: " . $e->getMessage());
    }
}

// Session start
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
?>
