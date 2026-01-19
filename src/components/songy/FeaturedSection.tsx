import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SingerCard } from "./SingerCard";
import { useLanguage } from "@/contexts/LanguageContext";

const featuredSingers = [
  {
    id: "1",
    name: "Ahmed Al-Rashid",
    nameAr: "أحمد الراشد",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    rating: 4.9,
    reviewCount: 156,
    genres: ["Arabic", "Khaleeji", "Pop"],
    genresAr: ["عربي", "خليجي", "بوب"],
    priceRange: "SAR 500+",
    isFeatured: true,
  },
  {
    id: "2",
    name: "Sarah Mohammed",
    nameAr: "سارة محمد",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 89,
    genres: ["Pop", "R&B", "Wedding"],
    genresAr: ["بوب", "آر أند بي", "أعراس"],
    priceRange: "SAR 400+",
  },
  {
    id: "3",
    name: "Khalid Omar",
    nameAr: "خالد عمر",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    rating: 4.7,
    reviewCount: 203,
    genres: ["Shilat", "Traditional", "Celebration"],
    genresAr: ["شيلات", "تراثي", "مناسبات"],
    priceRange: "SAR 350+",
  },
  {
    id: "4",
    name: "Layla Hassan",
    nameAr: "ليلى حسن",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    rating: 4.9,
    reviewCount: 178,
    genres: ["Kids Songs", "Birthday", "Pop"],
    genresAr: ["أغاني أطفال", "عيد ميلاد", "بوب"],
    priceRange: "SAR 300+",
    isFeatured: true,
  },
];

export const FeaturedSection = () => {
  const { t } = useLanguage();

  return (
    <section className="px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              {t("featured.title")}
            </h2>
            <p className="text-muted-foreground mt-1">
              {t("featured.subtitle")}
            </p>
          </div>
          <Link
            to="/singers"
            className="flex items-center gap-1 text-primary font-medium hover:underline"
          >
            {t("categories.viewAll")}
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredSingers.map((singer) => (
            <SingerCard key={singer.id} {...singer} />
          ))}
        </div>
      </div>
    </section>
  );
};
