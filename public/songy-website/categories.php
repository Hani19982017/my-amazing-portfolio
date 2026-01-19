<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="تصنيفات أغاني سونقي - زفات، أعياد ميلاد، مواليد، تخرج، وأكثر">
    <title>التصنيفات | سونقي SONGY</title>
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <!-- Navigation -->
    <?php include 'includes/navbar.php'; ?>

    <!-- Page Header -->
    <section class="page-header categories-header">
        <div class="container">
            <div class="page-header-content">
                <h1>التصنيفات</h1>
                <p>اختر المناسبة واحصل على أغنيتك الخاصة</p>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="index.php">الرئيسية</a></li>
                        <li class="breadcrumb-item active">التصنيفات</li>
                    </ol>
                </nav>
            </div>
        </div>
    </section>

    <!-- Categories Grid -->
    <section class="categories-section py-5">
        <div class="container">
            <div class="section-header text-center mb-5">
                <span class="section-badge">المناسبات</span>
                <h2 class="section-title">اختر مناسبتك</h2>
                <p class="section-subtitle">نقدم أغاني مخصصة لجميع المناسبات السعيدة</p>
            </div>
            
            <div class="row g-4">
                <!-- Zafat (Wedding Songs) -->
                <div class="col-lg-4 col-md-6">
                    <div class="category-card" data-category="zafat">
                        <div class="category-image">
                            <div class="category-overlay">
                                <i class="fas fa-ring"></i>
                            </div>
                        </div>
                        <div class="category-content">
                            <h3>زفات</h3>
                            <p>أغاني زفاف مميزة لأجمل ليلة في حياتك، بأصوات أفضل المغنين وألحان تبقى في الذاكرة</p>
                            <div class="category-features">
                                <span><i class="fas fa-check"></i> زفات عرس</span>
                                <span><i class="fas fa-check"></i> أغاني استقبال</span>
                                <span><i class="fas fa-check"></i> موسيقى حفلات</span>
                            </div>
                            <a href="contact.php?category=zafat" class="btn btn-primary-custom">اطلب الآن</a>
                        </div>
                    </div>
                </div>

                <!-- Birthday Songs -->
                <div class="col-lg-4 col-md-6">
                    <div class="category-card" data-category="birthday">
                        <div class="category-image birthday">
                            <div class="category-overlay">
                                <i class="fas fa-birthday-cake"></i>
                            </div>
                        </div>
                        <div class="category-content">
                            <h3>عيد ميلاد</h3>
                            <p>اجعل يوم ميلادهم أكثر تميزاً بأغنية خاصة تحمل أسماءهم ومشاعرك</p>
                            <div class="category-features">
                                <span><i class="fas fa-check"></i> أغاني مخصصة</span>
                                <span><i class="fas fa-check"></i> موسيقى احتفالية</span>
                                <span><i class="fas fa-check"></i> فيديو مميز</span>
                            </div>
                            <a href="contact.php?category=birthday" class="btn btn-primary-custom">اطلب الآن</a>
                        </div>
                    </div>
                </div>

                <!-- Newborn Songs -->
                <div class="col-lg-4 col-md-6">
                    <div class="category-card" data-category="newborn">
                        <div class="category-image newborn">
                            <div class="category-overlay">
                                <i class="fas fa-baby"></i>
                            </div>
                        </div>
                        <div class="category-content">
                            <h3>مواليد</h3>
                            <p>رحب بمولودك الجديد بأغنية تحمل اسمه وتعبر عن فرحتك بقدومه</p>
                            <div class="category-features">
                                <span><i class="fas fa-check"></i> أغاني ترحيب</span>
                                <span><i class="fas fa-check"></i> موسيقى هادئة</span>
                                <span><i class="fas fa-check"></i> ذكرى للأبد</span>
                            </div>
                            <a href="contact.php?category=newborn" class="btn btn-primary-custom">اطلب الآن</a>
                        </div>
                    </div>
                </div>

                <!-- Graduation Songs -->
                <div class="col-lg-4 col-md-6">
                    <div class="category-card" data-category="graduation">
                        <div class="category-image graduation">
                            <div class="category-overlay">
                                <i class="fas fa-graduation-cap"></i>
                            </div>
                        </div>
                        <div class="category-content">
                            <h3>تخرج</h3>
                            <p>احتفل بإنجازهم الأكاديمي بأغنية تخرج تليق بهذه اللحظة الفخورة</p>
                            <div class="category-features">
                                <span><i class="fas fa-check"></i> أغاني تخرج</span>
                                <span><i class="fas fa-check"></i> موسيقى احتفالية</span>
                                <span><i class="fas fa-check"></i> رسائل تهنئة</span>
                            </div>
                            <a href="contact.php?category=graduation" class="btn btn-primary-custom">اطلب الآن</a>
                        </div>
                    </div>
                </div>

                <!-- Love Songs -->
                <div class="col-lg-4 col-md-6">
                    <div class="category-card" data-category="love">
                        <div class="category-image love">
                            <div class="category-overlay">
                                <i class="fas fa-heart"></i>
                            </div>
                        </div>
                        <div class="category-content">
                            <h3>حب</h3>
                            <p>عبّر عن مشاعرك بأغنية رومانسية مخصصة لمن تحب</p>
                            <div class="category-features">
                                <span><i class="fas fa-check"></i> أغاني رومانسية</span>
                                <span><i class="fas fa-check"></i> كلمات مؤثرة</span>
                                <span><i class="fas fa-check"></i> ألحان عاطفية</span>
                            </div>
                            <a href="contact.php?category=love" class="btn btn-primary-custom">اطلب الآن</a>
                        </div>
                    </div>
                </div>

                <!-- Children Songs -->
                <div class="col-lg-4 col-md-6">
                    <div class="category-card" data-category="children">
                        <div class="category-image children">
                            <div class="category-overlay">
                                <i class="fas fa-child"></i>
                            </div>
                        </div>
                        <div class="category-content">
                            <h3>أطفال</h3>
                            <p>أغاني مرحة ومسلية للأطفال بأسمائهم وشخصياتهم المفضلة</p>
                            <div class="category-features">
                                <span><i class="fas fa-check"></i> أغاني مرحة</span>
                                <span><i class="fas fa-check"></i> موسيقى للأطفال</span>
                                <span><i class="fas fa-check"></i> محتوى آمن</span>
                            </div>
                            <a href="contact.php?category=children" class="btn btn-primary-custom">اطلب الآن</a>
                        </div>
                    </div>
                </div>

                <!-- Shilat -->
                <div class="col-lg-4 col-md-6">
                    <div class="category-card" data-category="shilat">
                        <div class="category-image shilat">
                            <div class="category-overlay">
                                <i class="fas fa-drum"></i>
                            </div>
                        </div>
                        <div class="category-content">
                            <h3>شيلات</h3>
                            <p>شيلات خليجية أصيلة بأصوات أفضل المنشدين والشعراء</p>
                            <div class="category-features">
                                <span><i class="fas fa-check"></i> شيلات وطنية</span>
                                <span><i class="fas fa-check"></i> شيلات مناسبات</span>
                                <span><i class="fas fa-check"></i> إيقاعات تراثية</span>
                            </div>
                            <a href="contact.php?category=shilat" class="btn btn-primary-custom">اطلب الآن</a>
                        </div>
                    </div>
                </div>

                <!-- Mother's Day -->
                <div class="col-lg-4 col-md-6">
                    <div class="category-card" data-category="mothers-day">
                        <div class="category-image mothers">
                            <div class="category-overlay">
                                <i class="fas fa-female"></i>
                            </div>
                        </div>
                        <div class="category-content">
                            <h3>عيد الأم</h3>
                            <p>أغنية مؤثرة تعبر عن حبك وامتنانك لأمك في يومها الخاص</p>
                            <div class="category-features">
                                <span><i class="fas fa-check"></i> كلمات مؤثرة</span>
                                <span><i class="fas fa-check"></i> ألحان دافئة</span>
                                <span><i class="fas fa-check"></i> هدية مميزة</span>
                            </div>
                            <a href="contact.php?category=mothers-day" class="btn btn-primary-custom">اطلب الآن</a>
                        </div>
                    </div>
                </div>

                <!-- Father's Day -->
                <div class="col-lg-4 col-md-6">
                    <div class="category-card" data-category="fathers-day">
                        <div class="category-image fathers">
                            <div class="category-overlay">
                                <i class="fas fa-male"></i>
                            </div>
                        </div>
                        <div class="category-content">
                            <h3>عيد الأب</h3>
                            <p>كرّم والدك بأغنية تحمل مشاعرك وتقديرك لكل ما قدمه لك</p>
                            <div class="category-features">
                                <span><i class="fas fa-check"></i> تقدير واحترام</span>
                                <span><i class="fas fa-check"></i> ذكريات جميلة</span>
                                <span><i class="fas fa-check"></i> هدية فريدة</span>
                            </div>
                            <a href="contact.php?category=fathers-day" class="btn btn-primary-custom">اطلب الآن</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- How It Works -->
    <section class="how-it-works py-5 bg-light-custom">
        <div class="container">
            <div class="section-header text-center mb-5">
                <span class="section-badge">كيف نعمل</span>
                <h2 class="section-title">خطوات الحصول على أغنيتك</h2>
            </div>
            <div class="row g-4">
                <div class="col-lg-3 col-md-6">
                    <div class="step-card">
                        <div class="step-number">1</div>
                        <div class="step-icon">
                            <i class="fas fa-list-alt"></i>
                        </div>
                        <h4>اختر المناسبة</h4>
                        <p>حدد نوع المناسبة التي تريد أغنية لها</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="step-card">
                        <div class="step-number">2</div>
                        <div class="step-icon">
                            <i class="fas fa-user-check"></i>
                        </div>
                        <h4>اختر المغني</h4>
                        <p>اختر المغني أو الاستوديو المناسب لك</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="step-card">
                        <div class="step-number">3</div>
                        <div class="step-icon">
                            <i class="fas fa-edit"></i>
                        </div>
                        <h4>أرسل التفاصيل</h4>
                        <p>قدم تفاصيل الأغنية والأسماء المطلوبة</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="step-card">
                        <div class="step-number">4</div>
                        <div class="step-icon">
                            <i class="fas fa-music"></i>
                        </div>
                        <h4>استلم أغنيتك</h4>
                        <p>احصل على أغنيتك الخاصة جاهزة للاستماع</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
        <div class="container">
            <div class="cta-content text-center">
                <h2>لم تجد المناسبة التي تبحث عنها؟</h2>
                <p>تواصل معنا ونحن نصنع لك أغنية مخصصة لأي مناسبة</p>
                <a href="contact.php" class="btn btn-light btn-lg">
                    <i class="fas fa-envelope me-2"></i>
                    تواصل معنا
                </a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <?php include 'includes/footer.php'; ?>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="assets/js/main.js"></script>
</body>
</html>
