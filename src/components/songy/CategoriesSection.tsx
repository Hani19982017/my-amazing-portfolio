import {
  Heart,
  Gift,
  Baby,
  GraduationCap,
  PartyPopper,
  Music2,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { CategoryCard } from "./CategoryCard";
import { useLanguage } from "@/contexts/LanguageContext";

export const CategoriesSection = () => {
  const { t } = useLanguage();

  const categories = [
    {
      titleKey: "category.wedding",
      titleAr: "زفات",
      icon: Heart,
      descriptionKey: "category.wedding.desc",
      href: "/categories/wedding",
      gradient: "from-pink-500/20 to-rose-500/10",
    },
    {
      titleKey: "category.birthday",
      titleAr: "عيد ميلاد",
      icon: Gift,
      descriptionKey: "category.birthday.desc",
      href: "/categories/birthday",
      gradient: "from-primary/20 to-accent/10",
    },
    {
      titleKey: "category.newborn",
      titleAr: "مواليد",
      icon: Baby,
      descriptionKey: "category.newborn.desc",
      href: "/categories/newborn",
      gradient: "from-blue-500/20 to-cyan-500/10",
    },
    {
      titleKey: "category.graduation",
      titleAr: "تخرج",
      icon: GraduationCap,
      descriptionKey: "category.graduation.desc",
      href: "/categories/graduation",
      gradient: "from-purple-500/20 to-violet-500/10",
    },
    {
      titleKey: "category.celebration",
      titleAr: "مناسبات",
      icon: PartyPopper,
      descriptionKey: "category.celebration.desc",
      href: "/categories/celebration",
      gradient: "from-green-500/20 to-emerald-500/10",
    },
    {
      titleKey: "category.shilat",
      titleAr: "شيلات",
      icon: Music2,
      descriptionKey: "category.shilat.desc",
      href: "/categories/shilat",
      gradient: "from-amber-500/20 to-orange-500/10",
    },
  ];

  return (
    <section className="px-4 py-12 bg-gradient-to-b from-background to-card/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              {t("categories.title")}
            </h2>
            <p className="text-muted-foreground mt-1">
              {t("categories.subtitle")}
            </p>
          </div>
          <Link
            to="/categories"
            className="flex items-center gap-1 text-primary font-medium hover:underline"
          >
            {t("categories.viewAll")}
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category) => (
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
      </div>
    </section>
  );
};
