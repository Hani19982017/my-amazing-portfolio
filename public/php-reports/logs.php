<?php
require_once 'config.php';
require_once 'functions.php';

$pdo = getDBConnection();

// Handle clear logs
if (isset($_GET['clear']) && $_GET['clear'] === 'all') {
    $pdo->exec("DELETE FROM email_logs");
    setFlashMessage('success', 'All logs cleared successfully!');
    header('Location: logs.php');
    exit;
}

// Pagination
$page = max(1, (int)($_GET['page'] ?? 1));
$perPage = 20;
$offset = ($page - 1) * $perPage;

// Get total count
$totalLogs = $pdo->query("SELECT COUNT(*) FROM email_logs")->fetchColumn();
$totalPages = ceil($totalLogs / $perPage);

// Get logs with pagination
$stmt = $pdo->prepare("
    SELECT l.*, s.recipient_email as schedule_email, r.title as report_title
    FROM email_logs l
    LEFT JOIN schedules s ON l.schedule_id = s.id
    LEFT JOIN reports r ON s.report_id = r.id
    ORDER BY l.sent_at DESC
    LIMIT ? OFFSET ?
");
$stmt->execute([$perPage, $offset]);
$logs = $stmt->fetchAll();

// Stats
$stats = $pdo->query("
    SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'sent' THEN 1 ELSE 0 END) as sent,
        SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) as failed
    FROM email_logs
")->fetch();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Logs - <?php echo APP_NAME; ?></title>
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
                        <a class="nav-link active" href="logs.php"><i class="bi bi-journal-text me-1"></i>Email Logs</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container mt-4">
        <?php displayFlashMessage(); ?>

        <!-- Stats -->
        <div class="row mb-4">
            <div class="col-md-4">
                <div class="card bg-primary text-white">
                    <div class="card-body text-center">
                        <h3><?php echo $stats['total'] ?? 0; ?></h3>
                        <p class="mb-0">Total Emails</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card bg-success text-white">
                    <div class="card-body text-center">
                        <h3><?php echo $stats['sent'] ?? 0; ?></h3>
                        <p class="mb-0">Sent Successfully</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card bg-danger text-white">
                    <div class="card-body text-center">
                        <h3><?php echo $stats['failed'] ?? 0; ?></h3>
                        <p class="mb-0">Failed</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Logs -->
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2><i class="bi bi-journal-text me-2"></i>Email Logs</h2>
            <?php if ($totalLogs > 0): ?>
                <a href="logs.php?clear=all" class="btn btn-outline-danger" onclick="return confirm('Clear all logs?')">
                    <i class="bi bi-trash me-2"></i>Clear All Logs
                </a>
            <?php endif; ?>
        </div>

        <div class="card">
            <div class="card-body">
                <?php if (empty($logs)): ?>
                    <div class="text-center py-5">
                        <i class="bi bi-inbox display-1 text-muted"></i>
                        <p class="text-muted mt-3">No email logs yet.</p>
                    </div>
                <?php else: ?>
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>Date/Time</th>
                                    <th>Report</th>
                                    <th>Recipient</th>
                                    <th>Subject</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($logs as $log): ?>
                                    <tr>
                                        <td>
                                            <small><?php echo date('M d, Y', strtotime($log['sent_at'])); ?></small><br>
                                            <small class="text-muted"><?php echo date('g:i A', strtotime($log['sent_at'])); ?></small>
                                        </td>
                                        <td><?php echo htmlspecialchars($log['report_title'] ?? 'N/A'); ?></td>
                                        <td><?php echo htmlspecialchars($log['recipient_email']); ?></td>
                                        <td><?php echo htmlspecialchars(substr($log['subject'], 0, 40)) . (strlen($log['subject']) > 40 ? '...' : ''); ?></td>
                                        <td>
                                            <?php if ($log['status'] === 'sent'): ?>
                                                <span class="badge bg-success"><i class="bi bi-check-circle me-1"></i>Sent</span>
                                            <?php elseif ($log['status'] === 'failed'): ?>
                                                <span class="badge bg-danger" title="<?php echo htmlspecialchars($log['error_message']); ?>">
                                                    <i class="bi bi-x-circle me-1"></i>Failed
                                                </span>
                                            <?php else: ?>
                                                <span class="badge bg-warning"><i class="bi bi-clock me-1"></i>Pending</span>
                                            <?php endif; ?>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    <?php if ($totalPages > 1): ?>
                        <nav aria-label="Page navigation" class="mt-4">
                            <ul class="pagination justify-content-center">
                                <li class="page-item <?php echo $page <= 1 ? 'disabled' : ''; ?>">
                                    <a class="page-link" href="?page=<?php echo $page - 1; ?>">Previous</a>
                                </li>
                                <?php for ($i = 1; $i <= $totalPages; $i++): ?>
                                    <li class="page-item <?php echo $i === $page ? 'active' : ''; ?>">
                                        <a class="page-link" href="?page=<?php echo $i; ?>"><?php echo $i; ?></a>
                                    </li>
                                <?php endfor; ?>
                                <li class="page-item <?php echo $page >= $totalPages ? 'disabled' : ''; ?>">
                                    <a class="page-link" href="?page=<?php echo $page + 1; ?>">Next</a>
                                </li>
                            </ul>
                        </nav>
                    <?php endif; ?>
                <?php endif; ?>
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
