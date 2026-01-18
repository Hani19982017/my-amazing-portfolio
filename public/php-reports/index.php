<?php
require_once 'config.php';
require_once 'functions.php';

$pdo = getDBConnection();

// Get statistics
$totalReports = $pdo->query("SELECT COUNT(*) FROM reports")->fetchColumn();
$activeSchedules = $pdo->query("SELECT COUNT(*) FROM schedules WHERE is_active = 1")->fetchColumn();
$emailsSent = $pdo->query("SELECT COUNT(*) FROM email_logs WHERE status = 'sent'")->fetchColumn();

// Get recent reports
$recentReports = $pdo->query("SELECT * FROM reports ORDER BY created_at DESC LIMIT 5")->fetchAll();

// Get upcoming schedules
$upcomingSchedules = $pdo->query("
    SELECT s.*, r.title as report_title 
    FROM schedules s 
    JOIN reports r ON s.report_id = r.id 
    WHERE s.is_active = 1 
    ORDER BY s.next_send ASC 
    LIMIT 5
")->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo APP_NAME; ?> - Dashboard</title>
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
                        <a class="nav-link active" href="index.php"><i class="bi bi-speedometer2 me-1"></i>Dashboard</a>
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

    <!-- Main Content -->
    <div class="container mt-4">
        <!-- Statistics Cards -->
        <div class="row mb-4">
            <div class="col-md-4">
                <div class="card bg-primary text-white">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="card-subtitle mb-2">Total Reports</h6>
                                <h2 class="card-title mb-0"><?php echo $totalReports; ?></h2>
                            </div>
                            <i class="bi bi-file-earmark-text display-4 opacity-50"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card bg-success text-white">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="card-subtitle mb-2">Active Schedules</h6>
                                <h2 class="card-title mb-0"><?php echo $activeSchedules; ?></h2>
                            </div>
                            <i class="bi bi-calendar-check display-4 opacity-50"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card bg-info text-white">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="card-subtitle mb-2">Emails Sent</h6>
                                <h2 class="card-title mb-0"><?php echo $emailsSent; ?></h2>
                            </div>
                            <i class="bi bi-envelope-check display-4 opacity-50"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <!-- Recent Reports -->
            <div class="col-md-6 mb-4">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="mb-0"><i class="bi bi-file-text me-2"></i>Recent Reports</h5>
                        <a href="reports.php" class="btn btn-sm btn-outline-primary">View All</a>
                    </div>
                    <div class="card-body">
                        <?php if (empty($recentReports)): ?>
                            <p class="text-muted text-center">No reports yet</p>
                        <?php else: ?>
                            <ul class="list-group list-group-flush">
                                <?php foreach ($recentReports as $report): ?>
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong><?php echo htmlspecialchars($report['title']); ?></strong>
                                            <br><small class="text-muted"><?php echo ucfirst($report['report_type']); ?></small>
                                        </div>
                                        <span class="badge bg-secondary"><?php echo date('M d', strtotime($report['created_at'])); ?></span>
                                    </li>
                                <?php endforeach; ?>
                            </ul>
                        <?php endif; ?>
                    </div>
                </div>
            </div>

            <!-- Upcoming Schedules -->
            <div class="col-md-6 mb-4">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="mb-0"><i class="bi bi-clock me-2"></i>Upcoming Schedules</h5>
                        <a href="schedules.php" class="btn btn-sm btn-outline-primary">View All</a>
                    </div>
                    <div class="card-body">
                        <?php if (empty($upcomingSchedules)): ?>
                            <p class="text-muted text-center">No active schedules</p>
                        <?php else: ?>
                            <ul class="list-group list-group-flush">
                                <?php foreach ($upcomingSchedules as $schedule): ?>
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong><?php echo htmlspecialchars($schedule['report_title']); ?></strong>
                                            <br><small class="text-muted"><?php echo $schedule['recipient_email']; ?></small>
                                        </div>
                                        <span class="badge bg-primary"><?php echo ucfirst($schedule['frequency']); ?></span>
                                    </li>
                                <?php endforeach; ?>
                            </ul>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0"><i class="bi bi-lightning me-2"></i>Quick Actions</h5>
                    </div>
                    <div class="card-body">
                        <div class="d-flex gap-3 flex-wrap">
                            <a href="reports.php?action=create" class="btn btn-primary">
                                <i class="bi bi-plus-circle me-2"></i>Create Report
                            </a>
                            <a href="schedules.php?action=create" class="btn btn-success">
                                <i class="bi bi-calendar-plus me-2"></i>New Schedule
                            </a>
                            <a href="send_test.php" class="btn btn-info">
                                <i class="bi bi-envelope me-2"></i>Send Test Email
                            </a>
                            <a href="cron.php" class="btn btn-warning" onclick="return confirm('Run scheduled emails now?')">
                                <i class="bi bi-play-circle me-2"></i>Run Cron Manually
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-light mt-5 py-4">
        <div class="container text-center">
            <p class="text-muted mb-0">&copy; <?php echo date('Y'); ?> <?php echo APP_NAME; ?>. All rights reserved.</p>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="assets/js/script.js"></script>
</body>
</html>
