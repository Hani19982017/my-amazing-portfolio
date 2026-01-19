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

const categories = [
  {
    title: "Wedding Songs",
    titleAr: "زفات",
    icon: Heart,
    description: "Custom wedding songs and zaffeh music",
    href: "/categories/wedding",
    gradient: "from-pink-500/20 to-rose-500/10",
  },
  {
    title: "Birthday Songs",
    titleAr: "عيد ميلاد",
    icon: Gift,
    description: "Personalized birthday celebration songs",
    href: "/categories/birthday",
    gradient: "from-primary/20 to-accent/10",
  },
  {
    title: "Newborn Songs",
    titleAr: "مواليد",
    icon: Baby,
    description: "Welcome songs for new arrivals",
    href: "/categories/newborn",
    gradient: "from-blue-500/20 to-cyan-500/10",
  },
  {
    title: "Graduation Songs",
    titleAr: "تخرج",
    icon: GraduationCap,
    description: "Celebrate academic achievements",
    href: "/categories/graduation",
    gradient: "from-purple-500/20 to-violet-500/10",
  },
  {
    title: "Celebration Songs",
    titleAr: "مناسبات",
    icon: PartyPopper,
    description: "Songs for all special occasions",
    href: "/categories/celebration",
    gradient: "from-green-500/20 to-emerald-500/10",
  },
  {
    title: "Shilat",
    titleAr: "شيلات",
    icon: Music2,
    description: "Traditional Arabian vocal music",
    href: "/categories/shilat",
    gradient: "from-amber-500/20 to-orange-500/10",
  },
];

export const CategoriesSection = () => {
  return (
    <section className="px-4 py-12 bg-gradient-to-b from-background to-card/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Song Categories</h2>
            <p className="text-muted-foreground mt-1">
              Find the perfect song for every occasion
            </p>
          </div>
          <Link
            to="/categories"
            className="flex items-center gap-1 text-primary font-medium hover:underline"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.title} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};
