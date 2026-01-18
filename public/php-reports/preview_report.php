<?php
require_once 'config.php';
require_once 'functions.php';

$pdo = getDBConnection();
$id = $_GET['id'] ?? null;

if (!$id) {
    header('Location: reports.php');
    exit;
}

$stmt = $pdo->prepare("SELECT * FROM reports WHERE id = ?");
$stmt->execute([$id]);
$report = $stmt->fetch();

if (!$report) {
    setFlashMessage('danger', 'Report not found.');
    header('Location: reports.php');
    exit;
}

// Generate report HTML
echo generateReportHtml($report);
?>
