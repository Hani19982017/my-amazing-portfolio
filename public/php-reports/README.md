# PHP Report Scheduler

A complete PHP application for creating reports and scheduling automatic email delivery.

## Features

- 📊 Create and manage reports
- 📅 Schedule reports (daily, weekly, monthly)
- 📧 Automatic email delivery via cron
- 📝 Email logs and history
- 🎨 Bootstrap 5 responsive UI

## Requirements

- PHP 7.4 or higher
- MySQL 5.7 or higher
- Web server (Apache/Nginx)
- Mail server or SMTP access

## Installation

### 1. Upload Files
Upload all files to your web server.

### 2. Create Database
Run the SQL in `database.sql` to create the required tables:

```bash
mysql -u root -p < database.sql
```

Or import via phpMyAdmin.

### 3. Configure Application
Edit `config.php` with your settings:

```php
// Database
define('DB_HOST', 'localhost');
define('DB_NAME', 'reports_db');
define('DB_USER', 'your_username');
define('DB_PASS', 'your_password');

// Email (SMTP)
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USER', 'your-email@gmail.com');
define('SMTP_PASS', 'your-app-password');
```

### 4. Set Up Cron Job
Add a cron job to run the scheduler every minute:

```bash
# Edit crontab
crontab -e

# Add this line
* * * * * /usr/bin/php /path/to/php-reports/cron.php >> /var/log/report-cron.log 2>&1
```

## Gmail SMTP Setup

1. Enable 2-Factor Authentication on your Google account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Generate a new App Password for "Mail"
4. Use this password in `SMTP_PASS`

## File Structure

```
php-reports/
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
├── config.php          # Configuration
├── database.sql        # Database schema
├── functions.php       # Helper functions
├── index.php          # Dashboard
├── reports.php        # Report management
├── schedules.php      # Schedule management
├── logs.php           # Email logs
├── cron.php           # Cron job script
├── send_now.php       # Send immediately
├── send_test.php      # Test email
├── preview_report.php # Preview report
└── README.md
```

## Usage

### Creating a Report
1. Go to Reports → Create Report
2. Enter title, description, and type
3. Save the report

### Scheduling a Report
1. Go to Schedules → New Schedule
2. Select a report
3. Enter recipient email
4. Choose frequency (daily/weekly/monthly)
5. Set the send time
6. Save the schedule

### Testing Email
1. Go to Dashboard → Send Test Email
2. Enter your email address
3. Click Send Test Email

## Customizing Reports

Edit the `generateReportHtml()` function in `functions.php` to customize:
- Report layout and design
- Data sources and queries
- Charts and visualizations

## Using PHPMailer (Recommended)

For production, install PHPMailer:

```bash
composer require phpmailer/phpmailer
```

Then uncomment the `sendEmailSMTP()` function in `functions.php` and use it instead of `sendEmail()`.

## Troubleshooting

### Emails Not Sending
1. Check SMTP credentials in `config.php`
2. For Gmail, ensure you're using an App Password
3. Check PHP mail logs
4. Run `send_test.php` to diagnose

### Cron Not Running
1. Verify cron job is installed: `crontab -l`
2. Check cron logs: `grep CRON /var/log/syslog`
3. Test manually: `php cron.php`

### Database Errors
1. Verify database credentials
2. Ensure tables are created from `database.sql`
3. Check MySQL is running

## Security Notes

- Change database credentials
- Use HTTPS in production
- Set proper file permissions
- Sanitize all user inputs (already implemented)
- Use prepared statements (already implemented)

## License

MIT License - Free to use and modify.
