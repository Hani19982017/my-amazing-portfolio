<?php
/**
 * Send Report Immediately
 */

require_once 'config.php';
require_once 'functions.php';

$pdo = getDBConnection();
$scheduleId = $_GET['schedule_id'] ?? null;

if (!$scheduleId) {
    setFlashMessage('danger', 'Invalid schedule ID.');
    header('Location: schedules.php');
    exit;
}

// Get schedule with report info
$stmt = $pdo->prepare("
    SELECT s.*, r.title as report_title, r.description as report_description, r.report_type
    FROM schedules s
    JOIN reports r ON s.report_id = r.id
    WHERE s.id = ?
");
$stmt->execute([$scheduleId]);
$schedule = $stmt->fetch();

if (!$schedule) {
    setFlashMessage('danger', 'Schedule not found.');
    header('Location: schedules.php');
    exit;
}

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
    // Log success
    logEmail($pdo, $schedule['id'], $schedule['recipient_email'], $subject, 'sent');
    
    // Update last_sent
    $updateStmt = $pdo->prepare("UPDATE schedules SET last_sent = NOW() WHERE id = ?");
    $updateStmt->execute([$scheduleId]);
    
    setFlashMessage('success', "Report sent successfully to {$schedule['recipient_email']}!");
} else {
    // Log failure
    logEmail($pdo, $schedule['id'], $schedule['recipient_email'], $subject, 'failed', 'Mail function returned false');
    
    setFlashMessage('danger', 'Failed to send email. Please check your email configuration.');
}

header('Location: schedules.php');
exit;
?>
