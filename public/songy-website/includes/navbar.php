<?php
$current_page = basename($_SERVER['PHP_SELF']);
?>
<nav class="navbar navbar-expand-lg navbar-dark fixed-top">
    <div class="container">
        <a class="navbar-brand" href="index.php">
            <span class="brand-text">SONGY</span>
            <span class="brand-arabic">سونقي</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
                <li class="nav-item">
                    <a class="nav-link <?php echo $current_page === 'index.php' ? 'active' : ''; ?>" href="index.php">الرئيسية</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?php echo $current_page === 'about.php' ? 'active' : ''; ?>" href="about.php">من نحن</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?php echo $current_page === 'services.php' ? 'active' : ''; ?>" href="services.php">الخدمات</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?php echo $current_page === 'categories.php' ? 'active' : ''; ?>" href="categories.php">التصنيفات</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?php echo $current_page === 'contact.php' ? 'active' : ''; ?>" href="contact.php">تواصل معنا</a>
                </li>
            </ul>
            <div class="nav-cta">
                <a href="contact.php" class="btn btn-primary-custom">احصل على أغنيتك</a>
            </div>
        </div>
    </div>
</nav>
