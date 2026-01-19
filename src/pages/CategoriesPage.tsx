import {
  Heart,
  Gift,
  Baby,
  GraduationCap,
  PartyPopper,
  Music2,
  Mic2,
  Video,
  Radio,
  Headphones,
  Users,
  Star,
} from "lucide-react";
import { AppLayout } from "@/components/songy/AppLayout";
import { CategoryCard } from "@/components/songy/CategoryCard";
import { useLanguage } from "@/contexts/LanguageContext";

const CategoriesPage = () => {
  const { t } = useLanguage();

  const songCategories = [
    {
      titleKey: "category.wedding",
      titleAr: "زفات",
      icon: Heart,
      descriptionKey: "category.wedding.desc",
      href: "/singers?category=wedding",
      gradient: "from-pink-500/20 to-rose-500/10",
    },
    {
      titleKey: "category.birthday",
      titleAr: "عيد ميلاد",
      icon: Gift,
      descriptionKey: "category.birthday.desc",
      href: "/singers?category=birthday",
      gradient: "from-primary/20 to-accent/10",
    },
    {
      titleKey: "category.newborn",
      titleAr: "مواليد",
      icon: Baby,
      descriptionKey: "category.newborn.desc",
      href: "/singers?category=newborn",
      gradient: "from-blue-500/20 to-cyan-500/10",
    },
    {
      titleKey: "category.graduation",
      titleAr: "تخرج",
      icon: GraduationCap,
      descriptionKey: "category.graduation.desc",
      href: "/singers?category=graduation",
      gradient: "from-purple-500/20 to-violet-500/10",
    },
    {
      titleKey: "category.celebration",
      titleAr: "مناسبات",
      icon: PartyPopper,
      descriptionKey: "category.celebration.desc",
      href: "/singers?category=celebration",
      gradient: "from-green-500/20 to-emerald-500/10",
    },
    {
      titleKey: "category.shilat",
      titleAr: "شيلات",
      icon: Music2,
      descriptionKey: "category.shilat.desc",
      href: "/singers?category=shilat",
      gradient: "from-amber-500/20 to-orange-500/10",
    },
    {
      titleKey: "category.love",
      titleAr: "حب",
      icon: Heart,
      descriptionKey: "category.love.desc",
      href: "/singers?category=love",
      gradient: "from-red-500/20 to-pink-500/10",
    },
    {
      titleKey: "category.kids",
      titleAr: "أغاني أطفال",
      icon: Star,
      descriptionKey: "category.kids.desc",
      href: "/singers?category=kids",
      gradient: "from-yellow-500/20 to-orange-500/10",
    },
    {
      titleKey: "category.mothersDay",
      titleAr: "عيد الأم",
      icon: Heart,
      descriptionKey: "category.mothersDay.desc",
      href: "/singers?category=mothers-day",
      gradient: "from-pink-500/20 to-fuchsia-500/10",
    },
    {
      titleKey: "category.fathersDay",
      titleAr: "عيد الأب",
      icon: Users,
      descriptionKey: "category.fathersDay.desc",
      href: "/singers?category=fathers-day",
      gradient: "from-blue-500/20 to-indigo-500/10",
    },
  ];

  const serviceCategories = [
    {
      titleKey: "service.recording",
      titleAr: "تسجيل صوتي",
      icon: Mic2,
      descriptionKey: "service.recording.desc",
      href: "/studios",
      gradient: "from-primary/20 to-accent/10",
    },
    {
      titleKey: "service.video",
      titleAr: "إنتاج فيديو",
      icon: Video,
      descriptionKey: "service.video.desc",
      href: "/studios",
      gradient: "from-violet-500/20 to-purple-500/10",
    },
    {
      titleKey: "service.radio",
      titleAr: "إعلانات إذاعية",
      icon: Radio,
      descriptionKey: "service.radio.desc",
      href: "/studios",
      gradient: "from-green-500/20 to-teal-500/10",
    },
    {
      titleKey: "service.dubbing",
      titleAr: "دوبلاج",
      icon: Headphones,
      descriptionKey: "service.dubbing.desc",
      href: "/studios",
      gradient: "from-cyan-500/20 to-blue-500/10",
    },
  ];

  return (
    <AppLayout>
      <div className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">{t("nav.categories")}</h1>
            <p className="text-muted-foreground mt-2">
              {t("categories.browse")}
            </p>
          </div>

          {/* Song Categories */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-6">{t("categories.title")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {songCategories.map((category) => (
                <CategoryCard
                  key={category.titleKey}
                  title={t(category.titleKey)}
                  titleAr={category.titleAr}
                  icon={category.icon}
                  description={t(category.descriptionKey)}
                  href={category.href}
                  gradient={category.gradient}
                />
              ))}
            </div>
          </section>

          {/* Services */}
          <section>
            <h2 className="text-xl font-semibold mb-6">{t("categories.studioServices")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {serviceCategories.map((category) => (
                <CategoryCard
                  key={category.titleKey}
                  title={t(category.titleKey)}
                  titleAr={category.titleAr}
                  icon={category.icon}
                  description={t(category.descriptionKey)}
                  href={category.href}
                  gradient={category.gradient}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
};

export default CategoriesPage;
