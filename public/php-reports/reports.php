<?php
require_once 'config.php';
require_once 'functions.php';

$pdo = getDBConnection();
$action = $_GET['action'] ?? 'list';
$id = $_GET['id'] ?? null;

// Handle form submissions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = sanitize($_POST['title'] ?? '');
    $description = sanitize($_POST['description'] ?? '');
    $reportType = sanitize($_POST['report_type'] ?? 'custom');
    
    if (empty($title)) {
        setFlashMessage('danger', 'Report title is required.');
    } else {
        if (isset($_POST['report_id']) && !empty($_POST['report_id'])) {
            // Update existing report
            $stmt = $pdo->prepare("UPDATE reports SET title = ?, description = ?, report_type = ? WHERE id = ?");
            $stmt->execute([$title, $description, $reportType, $_POST['report_id']]);
            setFlashMessage('success', 'Report updated successfully!');
        } else {
            // Create new report
            $stmt = $pdo->prepare("INSERT INTO reports (title, description, report_type) VALUES (?, ?, ?)");
            $stmt->execute([$title, $description, $reportType]);
            setFlashMessage('success', 'Report created successfully!');
        }
        header('Location: reports.php');
        exit;
    }
}

// Handle delete
if ($action === 'delete' && $id) {
    $stmt = $pdo->prepare("DELETE FROM reports WHERE id = ?");
    $stmt->execute([$id]);
    setFlashMessage('success', 'Report deleted successfully!');
    header('Location: reports.php');
    exit;
}

// Get report for editing
$report = null;
if ($action === 'edit' && $id) {
    $stmt = $pdo->prepare("SELECT * FROM reports WHERE id = ?");
    $stmt->execute([$id]);
    $report = $stmt->fetch();
}

// Get all reports
$reports = $pdo->query("SELECT * FROM reports ORDER BY created_at DESC")->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reports - <?php echo APP_NAME; ?></title>
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
                        <a class="nav-link active" href="reports.php"><i class="bi bi-file-text me-1"></i>Reports</a>
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
        <?php displayFlashMessage(); ?>

        <?php if ($action === 'create' || $action === 'edit'): ?>
        <!-- Create/Edit Form -->
        <div class="card">
            <div class="card-header">
                <h5 class="mb-0">
                    <i class="bi bi-<?php echo $action === 'edit' ? 'pencil' : 'plus-circle'; ?> me-2"></i>
                    <?php echo $action === 'edit' ? 'Edit Report' : 'Create New Report'; ?>
                </h5>
            </div>
            <div class="card-body">
                <form method="POST" action="reports.php">
                    <?php if ($report): ?>
                        <input type="hidden" name="report_id" value="<?php echo $report['id']; ?>">
                    <?php endif; ?>
                    
                    <div class="mb-3">
                        <label for="title" class="form-label">Report Title *</label>
                        <input type="text" class="form-control" id="title" name="title" required
                            value="<?php echo $report ? htmlspecialchars($report['title']) : ''; ?>">
                    </div>
                    
                    <div class="mb-3">
                        <label for="description" class="form-label">Description</label>
                        <textarea class="form-control" id="description" name="description" rows="3"><?php echo $report ? htmlspecialchars($report['description']) : ''; ?></textarea>
                    </div>
                    
                    <div class="mb-3">
                        <label for="report_type" class="form-label">Report Type</label>
                        <select class="form-select" id="report_type" name="report_type">
                            <option value="sales" <?php echo ($report && $report['report_type'] === 'sales') ? 'selected' : ''; ?>>Sales Report</option>
                            <option value="inventory" <?php echo ($report && $report['report_type'] === 'inventory') ? 'selected' : ''; ?>>Inventory Report</option>
                            <option value="users" <?php echo ($report && $report['report_type'] === 'users') ? 'selected' : ''; ?>>User Report</option>
                            <option value="custom" <?php echo (!$report || $report['report_type'] === 'custom') ? 'selected' : ''; ?>>Custom Report</option>
                        </select>
                    </div>
                    
                    <div class="d-flex gap-2">
                        <button type="submit" class="btn btn-primary">
                            <i class="bi bi-check-circle me-2"></i>Save Report
                        </button>
                        <a href="reports.php" class="btn btn-secondary">
                            <i class="bi bi-x-circle me-2"></i>Cancel
                        </a>
                    </div>
                </form>
            </div>
        </div>
        <?php else: ?>
        <!-- Reports List -->
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2><i class="bi bi-file-text me-2"></i>Reports</h2>
            <a href="reports.php?action=create" class="btn btn-primary">
                <i class="bi bi-plus-circle me-2"></i>Create Report
            </a>
        </div>

        <div class="card">
            <div class="card-body">
                <?php if (empty($reports)): ?>
                    <div class="text-center py-5">
                        <i class="bi bi-file-earmark-x display-1 text-muted"></i>
                        <p class="text-muted mt-3">No reports found. Create your first report!</p>
                        <a href="reports.php?action=create" class="btn btn-primary">
                            <i class="bi bi-plus-circle me-2"></i>Create Report
                        </a>
                    </div>
                <?php else: ?>
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Type</th>
                                    <th>Description</th>
                                    <th>Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($reports as $r): ?>
                                    <tr>
                                        <td><?php echo $r['id']; ?></td>
                                        <td><strong><?php echo htmlspecialchars($r['title']); ?></strong></td>
                                        <td><span class="badge bg-primary"><?php echo ucfirst($r['report_type']); ?></span></td>
                                        <td><?php echo htmlspecialchars(substr($r['description'], 0, 50)) . (strlen($r['description']) > 50 ? '...' : ''); ?></td>
                                        <td><?php echo date('M d, Y', strtotime($r['created_at'])); ?></td>
                                        <td>
                                            <div class="btn-group btn-group-sm">
                                                <a href="preview_report.php?id=<?php echo $r['id']; ?>" class="btn btn-outline-info" title="Preview">
                                                    <i class="bi bi-eye"></i>
                                                </a>
                                                <a href="schedules.php?action=create&report_id=<?php echo $r['id']; ?>" class="btn btn-outline-success" title="Schedule">
                                                    <i class="bi bi-calendar-plus"></i>
                                                </a>
                                                <a href="reports.php?action=edit&id=<?php echo $r['id']; ?>" class="btn btn-outline-primary" title="Edit">
                                                    <i class="bi bi-pencil"></i>
                                                </a>
                                                <a href="reports.php?action=delete&id=<?php echo $r['id']; ?>" class="btn btn-outline-danger" title="Delete" onclick="return confirm('Are you sure?')">
                                                    <i class="bi bi-trash"></i>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                <?php endif; ?>
            </div>
        </div>
        <?php endif; ?>
    </div>

    <footer class="bg-light mt-5 py-4">
        <div class="container text-center">
            <p class="text-muted mb-0">&copy; <?php echo date('Y'); ?> <?php echo APP_NAME; ?></p>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
