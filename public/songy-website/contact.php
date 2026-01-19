<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="تواصل مع سونقي - احصل على أغنيتك الخاصة">
    <title>تواصل معنا | سونقي SONGY</title>
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <!-- Navigation -->
    <?php include 'includes/navbar.php'; ?>

    <!-- Page Header -->
    <section class="page-header contact-header">
        <div class="container">
            <div class="page-header-content">
                <h1>تواصل معنا</h1>
                <p>نحن هنا لمساعدتك في الحصول على أغنيتك الخاصة</p>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="index.php">الرئيسية</a></li>
                        <li class="breadcrumb-item active">تواصل معنا</li>
                    </ol>
                </nav>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section py-5">
        <div class="container">
            <div class="row g-5">
                <!-- Contact Info -->
                <div class="col-lg-4">
                    <div class="contact-info-wrapper">
                        <div class="contact-info-header">
                            <h3>معلومات التواصل</h3>
                            <p>تواصل معنا عبر أي من الطرق التالية</p>
                        </div>
                        
                        <div class="contact-info-cards">
                            <div class="contact-info-card">
                                <div class="info-icon">
                                    <i class="fas fa-globe"></i>
                                </div>
                                <div class="info-content">
                                    <h5>الموقع الإلكتروني</h5>
                                    <a href="https://songy.net" target="_blank">www.songy.net</a>
                                </div>
                            </div>
                            
                            <div class="contact-info-card">
                                <div class="info-icon">
                                    <i class="fas fa-envelope"></i>
                                </div>
                                <div class="info-content">
                                    <h5>البريد الإلكتروني</h5>
                                    <a href="mailto:info@songy.net">info@songy.net</a>
                                </div>
                            </div>
                            
                            <div class="contact-info-card">
                                <div class="info-icon">
                                    <i class="fab fa-instagram"></i>
                                </div>
                                <div class="info-content">
                                    <h5>انستغرام</h5>
                                    <a href="https://instagram.com/songy_net" target="_blank">@SONGY_NET</a>
                                </div>
                            </div>
                        </div>

                        <div class="social-links-contact">
                            <h5>تابعنا على</h5>
                            <div class="social-icons">
                                <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
                                <a href="https://instagram.com/songy_net" class="social-icon"><i class="fab fa-instagram"></i></a>
                                <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
                                <a href="#" class="social-icon"><i class="fab fa-snapchat-ghost"></i></a>
                                <a href="#" class="social-icon"><i class="fab fa-tiktok"></i></a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Contact Form -->
                <div class="col-lg-8">
                    <div class="contact-form-wrapper">
                        <div class="form-header">
                            <h3>أرسل لنا رسالة</h3>
                            <p>املأ النموذج أدناه وسنتواصل معك في أقرب وقت</p>
                        </div>

                        <?php
                        $success_message = '';
                        $error_message = '';
                        
                        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                            $name = htmlspecialchars(trim($_POST['name'] ?? ''));
                            $email = htmlspecialchars(trim($_POST['email'] ?? ''));
                            $phone = htmlspecialchars(trim($_POST['phone'] ?? ''));
                            $category = htmlspecialchars(trim($_POST['category'] ?? ''));
                            $message = htmlspecialchars(trim($_POST['message'] ?? ''));
                            
                            if (empty($name) || empty($email) || empty($message)) {
                                $error_message = 'الرجاء ملء جميع الحقول المطلوبة';
                            } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                                $error_message = 'الرجاء إدخال بريد إلكتروني صحيح';
                            } else {
                                // Here you would typically save to database or send email
                                // For now, we'll just show a success message
                                $success_message = 'شكراً لتواصلك معنا! سنرد عليك في أقرب وقت.';
                            }
                        }
                        
                        $selected_category = isset($_GET['category']) ? htmlspecialchars($_GET['category']) : '';
                        ?>

                        <?php if ($success_message): ?>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <i class="fas fa-check-circle me-2"></i>
                            <?php echo $success_message; ?>
                            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                        </div>
                        <?php endif; ?>

                        <?php if ($error_message): ?>
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <i class="fas fa-exclamation-circle me-2"></i>
                            <?php echo $error_message; ?>
                            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                        </div>
                        <?php endif; ?>

                        <form method="POST" action="contact.php" class="contact-form">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="name">الاسم الكامل <span class="required">*</span></label>
                                        <input type="text" class="form-control" id="name" name="name" required>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="email">البريد الإلكتروني <span class="required">*</span></label>
                                        <input type="email" class="form-control" id="email" name="email" required>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="phone">رقم الهاتف</label>
                                        <input type="tel" class="form-control" id="phone" name="phone">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="category">نوع المناسبة</label>
                                        <select class="form-select" id="category" name="category">
                                            <option value="">اختر المناسبة</option>
                                            <option value="zafat" <?php echo $selected_category === 'zafat' ? 'selected' : ''; ?>>زفات</option>
                                            <option value="birthday" <?php echo $selected_category === 'birthday' ? 'selected' : ''; ?>>عيد ميلاد</option>
                                            <option value="newborn" <?php echo $selected_category === 'newborn' ? 'selected' : ''; ?>>مواليد</option>
                                            <option value="graduation" <?php echo $selected_category === 'graduation' ? 'selected' : ''; ?>>تخرج</option>
                                            <option value="love" <?php echo $selected_category === 'love' ? 'selected' : ''; ?>>حب</option>
                                            <option value="children" <?php echo $selected_category === 'children' ? 'selected' : ''; ?>>أطفال</option>
                                            <option value="shilat" <?php echo $selected_category === 'shilat' ? 'selected' : ''; ?>>شيلات</option>
                                            <option value="mothers-day" <?php echo $selected_category === 'mothers-day' ? 'selected' : ''; ?>>عيد الأم</option>
                                            <option value="fathers-day" <?php echo $selected_category === 'fathers-day' ? 'selected' : ''; ?>>عيد الأب</option>
                                            <option value="other">أخرى</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-group">
                                        <label for="message">رسالتك <span class="required">*</span></label>
                                        <textarea class="form-control" id="message" name="message" rows="5" required placeholder="اكتب تفاصيل طلبك هنا... (الأسماء المطلوبة، تفاصيل المناسبة، أي متطلبات خاصة)"></textarea>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <button type="submit" class="btn btn-primary-custom btn-lg w-100">
                                        <i class="fas fa-paper-plane me-2"></i>
                                        إرسال الرسالة
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section py-5 bg-light-custom">
        <div class="container">
            <div class="section-header text-center mb-5">
                <span class="section-badge">الأسئلة الشائعة</span>
                <h2 class="section-title">أسئلة متكررة</h2>
            </div>
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="accordion" id="faqAccordion">
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                                    كم تستغرق صناعة الأغنية؟
                                </button>
                            </h2>
                            <div id="faq1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">
                                    تعتمد المدة على نوع الأغنية ومتطلباتها، عادةً تستغرق من 3 إلى 7 أيام عمل. يمكننا تقديم خدمة سريعة إذا كانت المناسبة قريبة.
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                                    هل يمكنني اختيار المغني الذي أريده؟
                                </button>
                            </h2>
                            <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">
                                    نعم! يمكنك اختيار المغني من قائمة المغنين المتوفرين لدينا، سواء كانوا سعوديين أو خليجيين أو عرب أو غربيين.
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                                    هل الأغنية ملكي الخاص؟
                                </button>
                            </h2>
                            <div id="faq3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">
                                    نعم، نحن نحفظ حقوق الملكية لك كمشتري من خلال عقود واضحة تضمن حقوقك الكاملة على الأغنية.
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                                    كيف أستلم الأغنية؟
                                </button>
                            </h2>
                            <div id="faq4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">
                                    تستلم الأغنية عبر التطبيق أو البريد الإلكتروني بصيغة عالية الجودة، ويمكنك أيضاً طلب فيديو مرفق بالأغنية.
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq5">
                                    ما هي طرق الدفع المتاحة؟
                                </button>
                            </h2>
                            <div id="faq5" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">
                                    نقبل جميع طرق الدفع الإلكترونية بما فيها البطاقات البنكية، أبل باي، مدى، وغيرها من طرق الدفع المتاحة في التطبيق.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <?php include 'includes/footer.php'; ?>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="assets/js/main.js"></script>
</body>
</html>
