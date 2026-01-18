<?php
/**
 * Cron Job Script
 * Run this file via cron every minute: * * * * * php /path/to/cron.php
 * 
 * Example crontab entry:
 * * * * * * /usr/bin/php /var/www/html/php-reports/cron.php >> /var/log/report-cron.log 2>&1
 */

require_once 'config.php';
require_once 'functions.php';

// Prevent browser access in production
if (php_sapi_name() !== 'cli' && !isset($_GET['run'])) {
    // Allow manual run from browser with ?run parameter for testing
    if (!isset($_GET['run'])) {
        echo "This script should be run from command line or with ?run parameter for testing.";
        exit;
    }
}

$pdo = getDBConnection();
$now = date('Y-m-d H:i:s');

echo "=== Report Scheduler Cron Job ===\n";
echo "Running at: $now\n\n";

// Get all schedules that need to be sent
$stmt = $pdo->prepare("
    SELECT s.*, r.title as report_title, r.description as report_description, r.report_type
    FROM schedules s
    JOIN reports r ON s.report_id = r.id
    WHERE s.is_active = 1 
    AND s.next_send <= ?
");
$stmt->execute([$now]);
$dueSchedules = $stmt->fetchAll();

if (empty($dueSchedules)) {
    echo "No scheduled reports due at this time.\n";
    exit;
}

echo "Found " . count($dueSchedules) . " schedule(s) to process.\n\n";

foreach ($dueSchedules as $schedule) {
    echo "Processing: {$schedule['report_title']} -> {$schedule['recipient_email']}\n";
    
    // Generate report
    $report = [
        'id' => $schedule['report_id'],
        'title' => $schedule['report_title'],
        'description' => $schedule['report_description'],
        'report_type' => $schedule['report_type']
    ];
    
    $reportHtml = generateReportHtml($report);
    $subject = "[Report] {$schedule['report_title']} - " . date('M d, Y');
    
    // Send email
    $success = sendEmail($schedule['recipient_email'], $subject, $reportHtml, true);
    
    if ($success) {
        echo "  ✓ Email sent successfully!\n";
        
        // Log success
        logEmail($pdo, $schedule['id'], $schedule['recipient_email'], $subject, 'sent');
        
        // Calculate next send time
        $nextSend = calculateNextSend(
            $schedule['frequency'],
            $schedule['send_time'],
            $schedule['day_of_week'],
            $schedule['day_of_month']
        );
        
        // Update schedule
        $updateStmt = $pdo->prepare("
            UPDATE schedules 
            SET last_sent = ?, next_send = ?
            WHERE id = ?
        ");
        $updateStmt->execute([$now, $nextSend, $schedule['id']]);
        
        echo "  Next send: $nextSend\n";
    } else {
        echo "  ✗ Failed to send email.\n";
        
        // Log failure
        logEmail($pdo, $schedule['id'], $schedule['recipient_email'], $subject, 'failed', 'Mail function returned false');
    }
    
    echo "\n";
}

echo "=== Cron Job Complete ===\n";
?>
