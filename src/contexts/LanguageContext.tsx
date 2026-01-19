import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.categories": "Categories",
    "nav.singers": "Singers",
    "nav.studios": "Studios",
    "nav.profile": "Profile",
    "nav.orders": "My Orders",
    "nav.favorites": "Favorites",
    "nav.settings": "Settings",
    "nav.notifications": "Notifications",
    "nav.payments": "Payment Methods",
    "nav.language": "Language",
    "nav.logout": "Log Out",
    "nav.discover": "Discover",
    "nav.library": "Your Library",

    // Hero Section
    "hero.badge": "Your Personalized Song Platform",
    "hero.title1": "Create Your",
    "hero.title2": "Perfect Song",
    "hero.title3": "for Every Occasion",
    "hero.subtitle": "Connect with talented singers and professional studios to create custom songs for weddings, birthdays, graduations, and special moments.",
    "hero.cta.create": "Start Creating",
    "hero.cta.browse": "Browse Singers",
    "hero.stats.singers": "Singers",
    "hero.stats.songs": "Songs Created",
    "hero.stats.studios": "Studios",
    "hero.stats.rating": "Rating",

    // Categories
    "categories.title": "Song Categories",
    "categories.subtitle": "Find the perfect song for every occasion",
    "categories.viewAll": "View All",
    "categories.browse": "Browse all song types and services available",
    "categories.studioServices": "Studio Services",
    "category.wedding": "Wedding Songs",
    "category.birthday": "Birthday Songs",
    "category.newborn": "Newborn Songs",
    "category.graduation": "Graduation Songs",
    "category.celebration": "Celebration Songs",
    "category.shilat": "Shilat",
    "category.love": "Love Songs",
    "category.kids": "Kids Songs",
    "category.mothersDay": "Mother's Day",
    "category.fathersDay": "Father's Day",
    "category.wedding.desc": "Custom wedding songs and zaffeh music",
    "category.birthday.desc": "Personalized birthday celebration songs",
    "category.newborn.desc": "Welcome songs for new arrivals",
    "category.graduation.desc": "Celebrate academic achievements",
    "category.celebration.desc": "Songs for all special occasions",
    "category.shilat.desc": "Traditional Arabian vocal music",
    "category.love.desc": "Romantic songs for loved ones",
    "category.kids.desc": "Fun and educational songs for children",
    "category.mothersDay.desc": "Songs to celebrate mothers",
    "category.fathersDay.desc": "Songs to honor fathers",
    "category.explore": "Explore",

    // Services
    "service.recording": "Voice Recording",
    "service.recording.desc": "Professional voice recording services",
    "service.video": "Video Production",
    "service.video.desc": "Music videos and visual content",
    "service.radio": "Radio Ads",
    "service.radio.desc": "Commercial audio production",
    "service.dubbing": "Dubbing",
    "service.dubbing.desc": "Voice over and dubbing services",

    // Featured Section
    "featured.title": "Featured Singers",
    "featured.subtitle": "Top-rated artists ready to create your perfect song",

    // How It Works
    "howItWorks.title": "How It Works",
    "howItWorks.subtitle": "Create your personalized song in four simple steps",
    "howItWorks.step1.title": "Choose Category",
    "howItWorks.step1.desc": "Browse song categories and select your occasion type",
    "howItWorks.step2.title": "Select Artist",
    "howItWorks.step2.desc": "Pick your preferred singer or studio from our curated list",
    "howItWorks.step3.title": "Customize Song",
    "howItWorks.step3.desc": "Share details about your occasion and personalize lyrics",
    "howItWorks.step4.title": "Receive & Enjoy",
    "howItWorks.step4.desc": "Get your custom song delivered and share the magic",

    // Singers Page
    "singers.title": "Professional Singers",
    "singers.subtitle": "Find the perfect voice for your special occasion",
    "singers.search": "Search singers...",
    "singers.allGenres": "All Genres",
    "singers.sortBy": "Sort by",
    "singers.sortPopular": "Most Popular",
    "singers.sortRating": "Highest Rated",
    "singers.sortPrice": "Price: Low to High",
    "singers.showing": "Showing",
    "singers.notFound": "No singers found matching your criteria",
    "singers.startingFrom": "Starting from",
    "singers.reviews": "reviews",
    "singers.featured": "Featured",
    "singers.bookNow": "Book Now",

    // Studios Page
    "studios.title": "Professional Studios",
    "studios.subtitle": "Partner with top recording studios for professional quality",
    "studios.search": "Search studios...",
    "studios.allLocations": "All Locations",
    "studios.showing": "Showing",
    "studios.verified": "Verified",
    "studios.viewStudio": "View Studio",
    "studios.notFound": "No studios found matching your criteria",

    // Orders Page
    "orders.title": "My Orders",
    "orders.subtitle": "Track and manage your song orders",
    "orders.orderId": "Order",
    "orders.by": "by",
    "orders.estDelivery": "Est. Delivery",
    "orders.total": "Total",
    "orders.noOrders": "No orders yet",
    "orders.noOrdersDesc": "Start creating your personalized songs today!",
    "orders.status.pending": "Pending",
    "orders.status.inProgress": "In Progress",
    "orders.status.completed": "Completed",
    "orders.status.cancelled": "Cancelled",

    // Favorites Page
    "favorites.title": "Favorites",
    "favorites.subtitle": "Your saved singers and studios",
    "favorites.noFavorites": "No favorites yet",
    "favorites.noFavoritesDesc": "Save your favorite singers and studios for quick access",

    // Profile Page
    "profile.orders": "Orders",
    "profile.favorites": "Favorites",
    "profile.menuOrders": "My Orders",
    "profile.menuOrders.desc": "Track your song orders",
    "profile.menuFavorites": "Favorites",
    "profile.menuFavorites.desc": "Saved singers and studios",
    "profile.menuPayments": "Payment Methods",
    "profile.menuPayments.desc": "Manage your payment options",
    "profile.menuNotifications": "Notifications",
    "profile.menuNotifications.desc": "Notification preferences",
    "profile.menuLanguage": "Language",
    "profile.menuLanguage.desc": "English",
    "profile.menuSettings": "Settings",
    "profile.menuSettings.desc": "App preferences",

    // Settings Page
    "settings.title": "Settings",
    "settings.subtitle": "Manage your app preferences",
    "settings.appearance": "Appearance",
    "settings.darkMode": "Dark Mode",
    "settings.darkMode.desc": "Use dark theme across the app",
    "settings.language": "Language",
    "settings.language.desc": "Choose your preferred language",
    "settings.notifications": "Notifications",
    "settings.pushNotifications": "Push Notifications",
    "settings.pushNotifications.desc": "Receive push notifications",
    "settings.emailNotifications": "Email Notifications",
    "settings.emailNotifications.desc": "Receive email updates",
    "settings.smsNotifications": "SMS Notifications",
    "settings.smsNotifications.desc": "Receive SMS updates",
    "settings.privacy": "Privacy & Security",
    "settings.profileVisibility": "Profile Visibility",
    "settings.profileVisibility.desc": "Make your profile public",
    "settings.twoFactor": "Two-Factor Authentication",
    "settings.twoFactor.desc": "Add extra security to your account",
    "settings.account": "Account",
    "settings.deleteAccount": "Delete Account",
    "settings.deleteAccount.desc": "Permanently delete your account and data",
    "settings.delete": "Delete",

    // Notifications Page
    "notifications.title": "Notifications",
    "notifications.subtitle": "Stay updated with your orders and offers",
    "notifications.markAllRead": "Mark all as read",
    "notifications.today": "Today",
    "notifications.yesterday": "Yesterday",
    "notifications.earlier": "Earlier",
    "notifications.noNotifications": "No notifications",
    "notifications.noNotificationsDesc": "You're all caught up!",

    // Payments Page
    "payments.title": "Payment Methods",
    "payments.subtitle": "Manage your payment options",
    "payments.addNew": "Add Payment Method",
    "payments.default": "Default",
    "payments.setDefault": "Set as Default",
    "payments.remove": "Remove",
    "payments.expires": "Expires",
    "payments.noMethods": "No payment methods",
    "payments.noMethodsDesc": "Add a payment method to start ordering",

    // Common
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.add": "Add",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.sort": "Sort",
    "common.all": "All",
    "common.more": "more",
  },
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.categories": "التصنيفات",
    "nav.singers": "المطربين",
    "nav.studios": "الاستوديوهات",
    "nav.profile": "الملف الشخصي",
    "nav.orders": "طلباتي",
    "nav.favorites": "المفضلة",
    "nav.settings": "الإعدادات",
    "nav.notifications": "الإشعارات",
    "nav.payments": "طرق الدفع",
    "nav.language": "اللغة",
    "nav.logout": "تسجيل الخروج",
    "nav.discover": "اكتشف",
    "nav.library": "مكتبتك",

    // Hero Section
    "hero.badge": "منصتك للأغاني المخصصة",
    "hero.title1": "اصنع",
    "hero.title2": "أغنيتك المثالية",
    "hero.title3": "لكل مناسبة",
    "hero.subtitle": "تواصل مع مطربين موهوبين واستوديوهات احترافية لإنشاء أغاني مخصصة للأعراس وأعياد الميلاد والتخرج واللحظات الخاصة.",
    "hero.cta.create": "ابدأ الآن",
    "hero.cta.browse": "تصفح المطربين",
    "hero.stats.singers": "مطرب",
    "hero.stats.songs": "أغنية تم إنشاؤها",
    "hero.stats.studios": "استوديو",
    "hero.stats.rating": "التقييم",

    // Categories
    "categories.title": "تصنيفات الأغاني",
    "categories.subtitle": "اعثر على الأغنية المثالية لكل مناسبة",
    "categories.viewAll": "عرض الكل",
    "categories.browse": "تصفح جميع أنواع الأغاني والخدمات المتاحة",
    "categories.studioServices": "خدمات الاستوديو",
    "category.wedding": "زفات",
    "category.birthday": "عيد ميلاد",
    "category.newborn": "مواليد",
    "category.graduation": "تخرج",
    "category.celebration": "مناسبات",
    "category.shilat": "شيلات",
    "category.love": "حب",
    "category.kids": "أغاني أطفال",
    "category.mothersDay": "عيد الأم",
    "category.fathersDay": "عيد الأب",
    "category.wedding.desc": "أغاني الأعراس والزفات المخصصة",
    "category.birthday.desc": "أغاني أعياد الميلاد الشخصية",
    "category.newborn.desc": "أغاني ترحيب بالمواليد الجدد",
    "category.graduation.desc": "احتفل بالإنجازات الأكاديمية",
    "category.celebration.desc": "أغاني لجميع المناسبات الخاصة",
    "category.shilat.desc": "الموسيقى العربية التقليدية",
    "category.love.desc": "أغاني رومانسية للأحباء",
    "category.kids.desc": "أغاني ممتعة وتعليمية للأطفال",
    "category.mothersDay.desc": "أغاني للاحتفال بالأمهات",
    "category.fathersDay.desc": "أغاني لتكريم الآباء",
    "category.explore": "استكشف",

    // Services
    "service.recording": "تسجيل صوتي",
    "service.recording.desc": "خدمات تسجيل صوتي احترافية",
    "service.video": "إنتاج فيديو",
    "service.video.desc": "فيديوهات موسيقية ومحتوى مرئي",
    "service.radio": "إعلانات إذاعية",
    "service.radio.desc": "إنتاج صوتي تجاري",
    "service.dubbing": "دوبلاج",
    "service.dubbing.desc": "خدمات التعليق الصوتي والدوبلاج",

    // Featured Section
    "featured.title": "المطربين المميزين",
    "featured.subtitle": "فنانون مميزون جاهزون لإنشاء أغنيتك المثالية",

    // How It Works
    "howItWorks.title": "كيف يعمل",
    "howItWorks.subtitle": "أنشئ أغنيتك المخصصة في أربع خطوات بسيطة",
    "howItWorks.step1.title": "اختر التصنيف",
    "howItWorks.step1.desc": "تصفح تصنيفات الأغاني واختر نوع مناسبتك",
    "howItWorks.step2.title": "اختر الفنان",
    "howItWorks.step2.desc": "اختر المطرب أو الاستوديو المفضل لديك من قائمتنا",
    "howItWorks.step3.title": "خصص أغنيتك",
    "howItWorks.step3.desc": "شارك تفاصيل مناسبتك وخصص الكلمات",
    "howItWorks.step4.title": "استلم واستمتع",
    "howItWorks.step4.desc": "احصل على أغنيتك المخصصة وشاركها مع الجميع",

    // Singers Page
    "singers.title": "المطربين المحترفين",
    "singers.subtitle": "اعثر على الصوت المثالي لمناسبتك الخاصة",
    "singers.search": "ابحث عن مطربين...",
    "singers.allGenres": "جميع الأنواع",
    "singers.sortBy": "ترتيب حسب",
    "singers.sortPopular": "الأكثر شعبية",
    "singers.sortRating": "الأعلى تقييماً",
    "singers.sortPrice": "السعر: من الأقل للأعلى",
    "singers.showing": "عرض",
    "singers.notFound": "لم يتم العثور على مطربين مطابقين",
    "singers.startingFrom": "يبدأ من",
    "singers.reviews": "تقييم",
    "singers.featured": "مميز",
    "singers.bookNow": "احجز الآن",

    // Studios Page
    "studios.title": "الاستوديوهات الاحترافية",
    "studios.subtitle": "تعاون مع أفضل استوديوهات التسجيل للجودة الاحترافية",
    "studios.search": "ابحث عن استوديوهات...",
    "studios.allLocations": "جميع المواقع",
    "studios.showing": "عرض",
    "studios.verified": "موثق",
    "studios.viewStudio": "عرض الاستوديو",
    "studios.notFound": "لم يتم العثور على استوديوهات مطابقة",

    // Orders Page
    "orders.title": "طلباتي",
    "orders.subtitle": "تتبع وإدارة طلبات الأغاني الخاصة بك",
    "orders.orderId": "طلب",
    "orders.by": "بواسطة",
    "orders.estDelivery": "التسليم المتوقع",
    "orders.total": "الإجمالي",
    "orders.noOrders": "لا توجد طلبات بعد",
    "orders.noOrdersDesc": "ابدأ بإنشاء أغانيك المخصصة اليوم!",
    "orders.status.pending": "قيد الانتظار",
    "orders.status.inProgress": "قيد التنفيذ",
    "orders.status.completed": "مكتمل",
    "orders.status.cancelled": "ملغي",

    // Favorites Page
    "favorites.title": "المفضلة",
    "favorites.subtitle": "المطربين والاستوديوهات المحفوظة",
    "favorites.noFavorites": "لا توجد مفضلات بعد",
    "favorites.noFavoritesDesc": "احفظ مطربيك واستوديوهاتك المفضلة للوصول السريع",

    // Profile Page
    "profile.orders": "الطلبات",
    "profile.favorites": "المفضلة",
    "profile.menuOrders": "طلباتي",
    "profile.menuOrders.desc": "تتبع طلبات الأغاني",
    "profile.menuFavorites": "المفضلة",
    "profile.menuFavorites.desc": "المطربين والاستوديوهات المحفوظة",
    "profile.menuPayments": "طرق الدفع",
    "profile.menuPayments.desc": "إدارة خيارات الدفع",
    "profile.menuNotifications": "الإشعارات",
    "profile.menuNotifications.desc": "تفضيلات الإشعارات",
    "profile.menuLanguage": "اللغة",
    "profile.menuLanguage.desc": "العربية",
    "profile.menuSettings": "الإعدادات",
    "profile.menuSettings.desc": "تفضيلات التطبيق",

    // Settings Page
    "settings.title": "الإعدادات",
    "settings.subtitle": "إدارة تفضيلات التطبيق",
    "settings.appearance": "المظهر",
    "settings.darkMode": "الوضع الداكن",
    "settings.darkMode.desc": "استخدم السمة الداكنة في جميع أنحاء التطبيق",
    "settings.language": "اللغة",
    "settings.language.desc": "اختر لغتك المفضلة",
    "settings.notifications": "الإشعارات",
    "settings.pushNotifications": "إشعارات الدفع",
    "settings.pushNotifications.desc": "استقبل إشعارات الدفع",
    "settings.emailNotifications": "إشعارات البريد الإلكتروني",
    "settings.emailNotifications.desc": "استقبل تحديثات البريد الإلكتروني",
    "settings.smsNotifications": "إشعارات الرسائل النصية",
    "settings.smsNotifications.desc": "استقبل تحديثات الرسائل النصية",
    "settings.privacy": "الخصوصية والأمان",
    "settings.profileVisibility": "ظهور الملف الشخصي",
    "settings.profileVisibility.desc": "اجعل ملفك الشخصي عاماً",
    "settings.twoFactor": "المصادقة الثنائية",
    "settings.twoFactor.desc": "أضف أماناً إضافياً لحسابك",
    "settings.account": "الحساب",
    "settings.deleteAccount": "حذف الحساب",
    "settings.deleteAccount.desc": "حذف حسابك وبياناتك بشكل دائم",
    "settings.delete": "حذف",

    // Notifications Page
    "notifications.title": "الإشعارات",
    "notifications.subtitle": "ابق على اطلاع بطلباتك وعروضك",
    "notifications.markAllRead": "تعيين الكل كمقروء",
    "notifications.today": "اليوم",
    "notifications.yesterday": "أمس",
    "notifications.earlier": "سابقاً",
    "notifications.noNotifications": "لا توجد إشعارات",
    "notifications.noNotificationsDesc": "أنت على اطلاع بكل شيء!",

    // Payments Page
    "payments.title": "طرق الدفع",
    "payments.subtitle": "إدارة خيارات الدفع الخاصة بك",
    "payments.addNew": "إضافة طريقة دفع",
    "payments.default": "افتراضي",
    "payments.setDefault": "تعيين كافتراضي",
    "payments.remove": "إزالة",
    "payments.expires": "تنتهي",
    "payments.noMethods": "لا توجد طرق دفع",
    "payments.noMethodsDesc": "أضف طريقة دفع للبدء في الطلب",

    // Common
    "common.save": "حفظ",
    "common.cancel": "إلغاء",
    "common.edit": "تعديل",
    "common.delete": "حذف",
    "common.add": "إضافة",
    "common.search": "بحث",
    "common.filter": "تصفية",
    "common.sort": "ترتيب",
    "common.all": "الكل",
    "common.more": "المزيد",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("songy-language");
    return (saved as Language) || "ar";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("songy-language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === "ar";

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
