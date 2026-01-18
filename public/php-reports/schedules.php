<?php
require_once 'config.php';
require_once 'functions.php';

$pdo = getDBConnection();
$action = $_GET['action'] ?? 'list';
$id = $_GET['id'] ?? null;
$reportId = $_GET['report_id'] ?? null;

// Handle form submissions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $reportId = (int)($_POST['report_id'] ?? 0);
    $recipientEmail = sanitize($_POST['recipient_email'] ?? '');
    $frequency = sanitize($_POST['frequency'] ?? 'daily');
    $sendTime = sanitize($_POST['send_time'] ?? '09:00');
    $dayOfWeek = isset($_POST['day_of_week']) ? (int)$_POST['day_of_week'] : null;
    $dayOfMonth = isset($_POST['day_of_month']) ? (int)$_POST['day_of_month'] : null;
    $isActive = isset($_POST['is_active']) ? 1 : 0;
    
    if (empty($reportId) || !isValidEmail($recipientEmail)) {
        setFlashMessage('danger', 'Please fill in all required fields with valid data.');
    } else {
        $nextSend = calculateNextSend($frequency, $sendTime, $dayOfWeek, $dayOfMonth);
        
        if (isset($_POST['schedule_id']) && !empty($_POST['schedule_id'])) {
            // Update existing schedule
            $stmt = $pdo->prepare("
                UPDATE schedules 
                SET report_id = ?, recipient_email = ?, frequency = ?, send_time = ?, 
                    day_of_week = ?, day_of_month = ?, is_active = ?, next_send = ?
                WHERE id = ?
            ");
            $stmt->execute([$reportId, $recipientEmail, $frequency, $sendTime, $dayOfWeek, $dayOfMonth, $isActive, $nextSend, $_POST['schedule_id']]);
            setFlashMessage('success', 'Schedule updated successfully!');
        } else {
            // Create new schedule
            $stmt = $pdo->prepare("
                INSERT INTO schedules (report_id, recipient_email, frequency, send_time, day_of_week, day_of_month, is_active, next_send)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ");
            $stmt->execute([$reportId, $recipientEmail, $frequency, $sendTime, $dayOfWeek, $dayOfMonth, $isActive, $nextSend]);
            setFlashMessage('success', 'Schedule created successfully!');
        }
        header('Location: schedules.php');
        exit;
    }
}

// Handle delete
if ($action === 'delete' && $id) {
    $stmt = $pdo->prepare("DELETE FROM schedules WHERE id = ?");
    $stmt->execute([$id]);
    setFlashMessage('success', 'Schedule deleted successfully!');
    header('Location: schedules.php');
    exit;
}

// Handle toggle active
if ($action === 'toggle' && $id) {
    $stmt = $pdo->prepare("UPDATE schedules SET is_active = NOT is_active WHERE id = ?");
    $stmt->execute([$id]);
    setFlashMessage('success', 'Schedule status updated!');
    header('Location: schedules.php');
    exit;
}

// Get schedule for editing
$schedule = null;
if ($action === 'edit' && $id) {
    $stmt = $pdo->prepare("SELECT * FROM schedules WHERE id = ?");
    $stmt->execute([$id]);
    $schedule = $stmt->fetch();
}

// Get all reports for dropdown
$reports = $pdo->query("SELECT id, title FROM reports ORDER BY title")->fetchAll();

// Get all schedules
$schedules = $pdo->query("
    SELECT s.*, r.title as report_title 
    FROM schedules s 
    JOIN reports r ON s.report_id = r.id 
    ORDER BY s.next_send ASC
")->fetchAll();

$daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Schedules - <?php echo APP_NAME; ?></title>
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
                        <a class="nav-link active" href="schedules.php"><i class="bi bi-clock me-1"></i>Schedules</a>
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
                    <i class="bi bi-<?php echo $action === 'edit' ? 'pencil' : 'calendar-plus'; ?> me-2"></i>
                    <?php echo $action === 'edit' ? 'Edit Schedule' : 'Create New Schedule'; ?>
                </h5>
            </div>
            <div class="card-body">
                <form method="POST" action="schedules.php">
                    <?php if ($schedule): ?>
                        <input type="hidden" name="schedule_id" value="<?php echo $schedule['id']; ?>">
                    <?php endif; ?>
                    
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="report_id" class="form-label">Select Report *</label>
                            <select class="form-select" id="report_id" name="report_id" required>
                                <option value="">-- Select Report --</option>
                                <?php foreach ($reports as $r): ?>
                                    <option value="<?php echo $r['id']; ?>" 
                                        <?php echo (($schedule && $schedule['report_id'] == $r['id']) || $reportId == $r['id']) ? 'selected' : ''; ?>>
                                        <?php echo htmlspecialchars($r['title']); ?>
                                    </option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                        
                        <div class="col-md-6 mb-3">
                            <label for="recipient_email" class="form-label">Recipient Email *</label>
                            <input type="email" class="form-control" id="recipient_email" name="recipient_email" required
                                value="<?php echo $schedule ? htmlspecialchars($schedule['recipient_email']) : ''; ?>"
                                placeholder="email@example.com">
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <label for="frequency" class="form-label">Frequency *</label>
                            <select class="form-select" id="frequency" name="frequency" onchange="toggleFrequencyOptions()">
                                <option value="daily" <?php echo ($schedule && $schedule['frequency'] === 'daily') ? 'selected' : ''; ?>>Daily</option>
                                <option value="weekly" <?php echo ($schedule && $schedule['frequency'] === 'weekly') ? 'selected' : ''; ?>>Weekly</option>
                                <option value="monthly" <?php echo ($schedule && $schedule['frequency'] === 'monthly') ? 'selected' : ''; ?>>Monthly</option>
                            </select>
                        </div>
                        
                        <div class="col-md-4 mb-3">
                            <label for="send_time" class="form-label">Send Time *</label>
                            <input type="time" class="form-control" id="send_time" name="send_time" 
                                value="<?php echo $schedule ? substr($schedule['send_time'], 0, 5) : '09:00'; ?>">
                        </div>
                        
                        <div class="col-md-4 mb-3" id="day_of_week_container" style="display: none;">
                            <label for="day_of_week" class="form-label">Day of Week</label>
                            <select class="form-select" id="day_of_week" name="day_of_week">
                                <?php foreach ($daysOfWeek as $index => $day): ?>
                                    <option value="<?php echo $index; ?>" 
                                        <?php echo ($schedule && $schedule['day_of_week'] == $index) ? 'selected' : ''; ?>>
                                        <?php echo $day; ?>
                                    </option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                        
                        <div class="col-md-4 mb-3" id="day_of_month_container" style="display: none;">
                            <label for="day_of_month" class="form-label">Day of Month</label>
                            <select class="form-select" id="day_of_month" name="day_of_month">
                                <?php for ($i = 1; $i <= 28; $i++): ?>
                                    <option value="<?php echo $i; ?>" 
                                        <?php echo ($schedule && $schedule['day_of_month'] == $i) ? 'selected' : ''; ?>>
                                        <?php echo $i; ?>
                                    </option>
                                <?php endfor; ?>
                            </select>
                        </div>
                    </div>
                    
                    <div class="mb-3">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="is_active" name="is_active" 
                                <?php echo (!$schedule || $schedule['is_active']) ? 'checked' : ''; ?>>
                            <label class="form-check-label" for="is_active">Active</label>
                        </div>
                    </div>
                    
                    <div class="d-flex gap-2">
                        <button type="submit" class="btn btn-primary">
                            <i class="bi bi-check-circle me-2"></i>Save Schedule
                        </button>
                        <a href="schedules.php" class="btn btn-secondary">
                            <i class="bi bi-x-circle me-2"></i>Cancel
                        </a>
                    </div>
                </form>
            </div>
        </div>
        
        <script>
            function toggleFrequencyOptions() {
                const frequency = document.getElementById('frequency').value;
                document.getElementById('day_of_week_container').style.display = frequency === 'weekly' ? 'block' : 'none';
                document.getElementById('day_of_month_container').style.display = frequency === 'monthly' ? 'block' : 'none';
            }
            toggleFrequencyOptions();
        </script>
        <?php else: ?>
        <!-- Schedules List -->
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2><i class="bi bi-clock me-2"></i>Schedules</h2>
            <a href="schedules.php?action=create" class="btn btn-primary">
                <i class="bi bi-calendar-plus me-2"></i>New Schedule
            </a>
        </div>

        <div class="card">
            <div class="card-body">
                <?php if (empty($schedules)): ?>
                    <div class="text-center py-5">
                        <i class="bi bi-calendar-x display-1 text-muted"></i>
                        <p class="text-muted mt-3">No schedules found. Create your first schedule!</p>
                        <a href="schedules.php?action=create" class="btn btn-primary">
                            <i class="bi bi-calendar-plus me-2"></i>New Schedule
                        </a>
                    </div>
                <?php else: ?>
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>Report</th>
                                    <th>Recipient</th>
                                    <th>Frequency</th>
                                    <th>Time</th>
                                    <th>Next Send</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($schedules as $s): ?>
                                    <tr>
                                        <td><strong><?php echo htmlspecialchars($s['report_title']); ?></strong></td>
                                        <td><?php echo htmlspecialchars($s['recipient_email']); ?></td>
                                        <td><span class="badge bg-info"><?php echo ucfirst($s['frequency']); ?></span></td>
                                        <td><?php echo date('g:i A', strtotime($s['send_time'])); ?></td>
                                        <td>
                                            <?php if ($s['next_send']): ?>
                                                <?php echo date('M d, Y g:i A', strtotime($s['next_send'])); ?>
                                            <?php else: ?>
                                                <span class="text-muted">Not scheduled</span>
                                            <?php endif; ?>
                                        </td>
                                        <td>
                                            <?php if ($s['is_active']): ?>
                                                <span class="badge bg-success">Active</span>
                                            <?php else: ?>
                                                <span class="badge bg-secondary">Inactive</span>
                                            <?php endif; ?>
                                        </td>
                                        <td>
                                            <div class="btn-group btn-group-sm">
                                                <a href="schedules.php?action=toggle&id=<?php echo $s['id']; ?>" class="btn btn-outline-<?php echo $s['is_active'] ? 'warning' : 'success'; ?>" title="<?php echo $s['is_active'] ? 'Deactivate' : 'Activate'; ?>">
                                                    <i class="bi bi-<?php echo $s['is_active'] ? 'pause' : 'play'; ?>"></i>
                                                </a>
                                                <a href="send_now.php?schedule_id=<?php echo $s['id']; ?>" class="btn btn-outline-info" title="Send Now" onclick="return confirm('Send report email now?')">
                                                    <i class="bi bi-send"></i>
                                                </a>
                                                <a href="schedules.php?action=edit&id=<?php echo $s['id']; ?>" class="btn btn-outline-primary" title="Edit">
                                                    <i class="bi bi-pencil"></i>
                                                </a>
                                                <a href="schedules.php?action=delete&id=<?php echo $s['id']; ?>" class="btn btn-outline-danger" title="Delete" onclick="return confirm('Are you sure?')">
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
