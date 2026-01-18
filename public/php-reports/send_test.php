<?php
/**
 * Send Test Email
 */

require_once 'config.php';
require_once 'functions.php';

$message = '';
$messageType = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = sanitize($_POST['email'] ?? '');
    
    if (!isValidEmail($email)) {
        $message = 'Please enter a valid email address.';
        $messageType = 'danger';
    } else {
        $subject = 'Test Email from ' . APP_NAME;
        $body = '
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #0d6efd; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
                .success { color: #198754; font-size: 48px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>' . APP_NAME . '</h1>
                </div>
                <div class="content">
                    <p class="success" style="text-align: center;">✓</p>
                    <h2 style="text-align: center;">Test Email Successful!</h2>
                    <p>Congratulations! Your email configuration is working correctly.</p>
                    <p>This test email was sent at: <strong>' . date('F j, Y \a\t g:i A') . '</strong></p>
                    <hr>
                    <p style="color: #6c757d; font-size: 14px;">
                        This is an automated test email from your Report Scheduler application.
                    </p>
                </div>
            </div>
        </body>
        </html>';
        
        $success = sendEmail($email, $subject, $body, true);
        
        if ($success) {
            $message = "Test email sent successfully to $email!";
            $messageType = 'success';
        } else {
            $message = 'Failed to send test email. Please check your email configuration in config.php';
            $messageType = 'danger';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Send Test Email - <?php echo APP_NAME; ?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" rel="stylesheet">
    <link href="assets/css/style.css" rel="stylesheet">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="index.php">
                <i class="bi bi-file-earmark-bar-graph me-2"></i><?php echo APP_NAME; ?>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="index.php"><i class="bi bi-speedometer2 me-1"></i>Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="reports.php"><i class="bi bi-file-text me-1"></i>Reports</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="schedules.php"><i class="bi bi-clock me-1"></i>Schedules</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="logs.php"><i class="bi bi-journal-text me-1"></i>Email Logs</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container mt-4">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0"><i class="bi bi-envelope-check me-2"></i>Send Test Email</h5>
                    </div>
                    <div class="card-body">
                        <?php if ($message): ?>
                            <div class="alert alert-<?php echo $messageType; ?> alert-dismissible fade show">
                                <?php echo htmlspecialchars($message); ?>
                                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                            </div>
                        <?php endif; ?>
                        
                        <p class="text-muted">Use this form to test your email configuration. A test email will be sent to the address you provide.</p>
                        
                        <form method="POST">
                            <div class="mb-3">
                                <label for="email" class="form-label">Email Address</label>
                                <input type="email" class="form-control" id="email" name="email" required
                                    placeholder="Enter your email address">
                            </div>
                            
                            <div class="d-grid gap-2">
                                <button type="submit" class="btn btn-primary">
                                    <i class="bi bi-send me-2"></i>Send Test Email
                                </button>
                                <a href="index.php" class="btn btn-outline-secondary">
                                    <i class="bi bi-arrow-left me-2"></i>Back to Dashboard
                                </a>
                            </div>
                        </form>
                        
                        <hr>
                        
                        <div class="alert alert-info">
                            <h6><i class="bi bi-info-circle me-2"></i>Email Configuration</h6>
                            <p class="mb-0 small">
                                If emails are not being sent, make sure to configure the SMTP settings in <code>config.php</code>. 
                                For Gmail, you'll need to use an App Password instead of your regular password.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <footer class="bg-light mt-5 py-4">
        <div class="container text-center">
            <p class="text-muted mb-0">&copy; <?php echo date('Y'); ?> <?php echo APP_NAME; ?></p>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
