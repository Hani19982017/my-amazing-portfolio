<?php
/**
 * Helper Functions
 */

require_once 'config.php';

/**
 * Send Email using PHPMailer or mail()
 */
function sendEmail($to, $subject, $body, $isHtml = true) {
    // Using PHP mail() function
    // For production, use PHPMailer with SMTP
    
    $headers = [];
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = $isHtml ? 'Content-type: text/html; charset=UTF-8' : 'Content-type: text/plain; charset=UTF-8';
    $headers[] = 'From: ' . SMTP_FROM_NAME . ' <' . SMTP_FROM . '>';
    $headers[] = 'Reply-To: ' . SMTP_FROM;
    $headers[] = 'X-Mailer: PHP/' . phpversion();
    
    $success = mail($to, $subject, $body, implode("\r\n", $headers));
    
    return $success;
}

/**
 * Send Email with PHPMailer (Recommended for Production)
 * Uncomment and use this function if you have PHPMailer installed
 */
/*
function sendEmailSMTP($to, $subject, $body, $isHtml = true) {
    require 'vendor/autoload.php';
    
    $mail = new PHPMailer\PHPMailer\PHPMailer(true);
    
    try {
        $mail->isSMTP();
        $mail->Host = SMTP_HOST;
        $mail->SMTPAuth = true;
        $mail->Username = SMTP_USER;
        $mail->Password = SMTP_PASS;
        $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = SMTP_PORT;
        
        $mail->setFrom(SMTP_FROM, SMTP_FROM_NAME);
        $mail->addAddress($to);
        
        $mail->isHTML($isHtml);
        $mail->Subject = $subject;
        $mail->Body = $body;
        
        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("Email error: " . $mail->ErrorInfo);
        return false;
    }
}
*/

/**
 * Generate Report HTML
 */
function generateReportHtml($report, $data = []) {
    $html = '
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: #0d6efd; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background: #f8f9fa; }
            .footer { background: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>' . htmlspecialchars($report['title']) . '</h1>
            <p>Generated on ' . date('F j, Y \a\t g:i A') . '</p>
        </div>
        <div class="content">
            <p>' . htmlspecialchars($report['description']) . '</p>
            <h3>Report Data</h3>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Item</th>
                        <th>Value</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>';
    
    // Sample data - replace with actual data from your database
    $sampleData = [
        ['Item A', '$1,234.56', date('Y-m-d')],
        ['Item B', '$2,345.67', date('Y-m-d')],
        ['Item C', '$3,456.78', date('Y-m-d')],
        ['Item D', '$4,567.89', date('Y-m-d')],
        ['Item E', '$5,678.90', date('Y-m-d')],
    ];
    
    $i = 1;
    foreach ($sampleData as $row) {
        $html .= '<tr>
            <td>' . $i++ . '</td>
            <td>' . $row[0] . '</td>
            <td>' . $row[1] . '</td>
            <td>' . $row[2] . '</td>
        </tr>';
    }
    
    $html .= '
                </tbody>
            </table>
            <p><strong>Total Items:</strong> ' . count($sampleData) . '</p>
        </div>
        <div class="footer">
            <p>This is an automated report from ' . APP_NAME . '</p>
            <p>If you have questions, please contact support.</p>
        </div>
    </body>
    </html>';
    
    return $html;
}

/**
 * Calculate Next Send Time
 */
function calculateNextSend($frequency, $sendTime, $dayOfWeek = null, $dayOfMonth = null) {
    $now = new DateTime();
    $next = new DateTime();
    
    list($hour, $minute) = explode(':', $sendTime);
    $next->setTime((int)$hour, (int)$minute, 0);
    
    switch ($frequency) {
        case 'daily':
            if ($next <= $now) {
                $next->modify('+1 day');
            }
            break;
            
        case 'weekly':
            $currentDayOfWeek = (int)$now->format('w');
            $targetDay = $dayOfWeek ?? 1; // Default Monday
            $daysToAdd = ($targetDay - $currentDayOfWeek + 7) % 7;
            if ($daysToAdd === 0 && $next <= $now) {
                $daysToAdd = 7;
            }
            $next->modify("+{$daysToAdd} days");
            break;
            
        case 'monthly':
            $targetDay = $dayOfMonth ?? 1;
            $next->setDate((int)$next->format('Y'), (int)$next->format('m'), $targetDay);
            if ($next <= $now) {
                $next->modify('+1 month');
            }
            break;
    }
    
    return $next->format('Y-m-d H:i:s');
}

/**
 * Log Email
 */
function logEmail($pdo, $scheduleId, $email, $subject, $status, $errorMessage = null) {
    $stmt = $pdo->prepare("
        INSERT INTO email_logs (schedule_id, recipient_email, subject, status, error_message)
        VALUES (?, ?, ?, ?, ?)
    ");
    $stmt->execute([$scheduleId, $email, $subject, $status, $errorMessage]);
}

/**
 * Flash Message
 */
function setFlashMessage($type, $message) {
    $_SESSION['flash'] = ['type' => $type, 'message' => $message];
}

function getFlashMessage() {
    if (isset($_SESSION['flash'])) {
        $flash = $_SESSION['flash'];
        unset($_SESSION['flash']);
        return $flash;
    }
    return null;
}

/**
 * Display Flash Message
 */
function displayFlashMessage() {
    $flash = getFlashMessage();
    if ($flash) {
        $type = $flash['type'];
        $message = htmlspecialchars($flash['message']);
        echo "<div class='alert alert-{$type} alert-dismissible fade show' role='alert'>
            {$message}
            <button type='button' class='btn-close' data-bs-dismiss='alert'></button>
        </div>";
    }
}

/**
 * Sanitize Input
 */
function sanitize($input) {
    return htmlspecialchars(strip_tags(trim($input)));
}

/**
 * Validate Email
 */
function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}
?>
