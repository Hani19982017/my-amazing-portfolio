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

const songCategories = [
  {
    title: "Wedding Songs",
    titleAr: "زفات",
    icon: Heart,
    description: "Custom wedding songs, zaffeh, and entrance music",
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
  {
    title: "Love Songs",
    titleAr: "حب",
    icon: Heart,
    description: "Romantic songs for loved ones",
    href: "/categories/love",
    gradient: "from-red-500/20 to-pink-500/10",
  },
  {
    title: "Kids Songs",
    titleAr: "أغاني أطفال",
    icon: Star,
    description: "Fun and educational songs for children",
    href: "/categories/kids",
    gradient: "from-yellow-500/20 to-orange-500/10",
  },
  {
    title: "Mother's Day",
    titleAr: "عيد الأم",
    icon: Heart,
    description: "Songs to celebrate mothers",
    href: "/categories/mothers-day",
    gradient: "from-pink-500/20 to-fuchsia-500/10",
  },
  {
    title: "Father's Day",
    titleAr: "عيد الأب",
    icon: Users,
    description: "Songs to honor fathers",
    href: "/categories/fathers-day",
    gradient: "from-blue-500/20 to-indigo-500/10",
  },
];

const serviceCategories = [
  {
    title: "Voice Recording",
    titleAr: "تسجيل صوتي",
    icon: Mic2,
    description: "Professional voice recording services",
    href: "/services/recording",
    gradient: "from-primary/20 to-accent/10",
  },
  {
    title: "Video Production",
    titleAr: "صناعة فيديو",
    icon: Video,
    description: "Music videos and visual content",
    href: "/services/video",
    gradient: "from-violet-500/20 to-purple-500/10",
  },
  {
    title: "Radio Ads",
    titleAr: "إعلانات إذاعية",
    icon: Radio,
    description: "Commercial audio production",
    href: "/services/radio",
    gradient: "from-green-500/20 to-teal-500/10",
  },
  {
    title: "Dubbing",
    titleAr: "دوبلاج",
    icon: Headphones,
    description: "Voice over and dubbing services",
    href: "/services/dubbing",
    gradient: "from-cyan-500/20 to-blue-500/10",
  },
];

const CategoriesPage = () => {
  return (
    <AppLayout>
      <div className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">Categories</h1>
            <p className="text-muted-foreground mt-2">
              Browse all song types and services available
            </p>
          </div>

          {/* Song Categories */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-6">Song Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {songCategories.map((category) => (
                <CategoryCard key={category.title} {...category} />
              ))}
            </div>
          </section>

          {/* Services */}
          <section>
            <h2 className="text-xl font-semibold mb-6">Studio Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {serviceCategories.map((category) => (
                <CategoryCard key={category.title} {...category} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
};

export default CategoriesPage;
