import { useState } from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { AppLayout } from "@/components/songy/AppLayout";
import { SingerCard } from "@/components/songy/SingerCard";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const allSingers = [
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
  {
    id: "5",
    name: "Mohammed Faisal",
    nameAr: "محمد فيصل",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    rating: 4.6,
    reviewCount: 92,
    genres: ["Wedding", "Khaleeji", "Traditional"],
    genresAr: ["أعراس", "خليجي", "تراثي"],
    priceRange: "SAR 450+",
  },
  {
    id: "6",
    name: "Nora Abdullah",
    nameAr: "نورة عبدالله",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 134,
    genres: ["Pop", "Romantic", "Birthday"],
    genresAr: ["بوب", "رومانسي", "عيد ميلاد"],
    priceRange: "SAR 380+",
  },
  {
    id: "7",
    name: "Sultan Ali",
    nameAr: "سلطان علي",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    rating: 4.5,
    reviewCount: 67,
    genres: ["Shilat", "Celebration", "Traditional"],
    genresAr: ["شيلات", "مناسبات", "تراثي"],
    priceRange: "SAR 320+",
  },
  {
    id: "8",
    name: "Reem Saad",
    nameAr: "ريم سعد",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    rating: 4.9,
    reviewCount: 211,
    genres: ["Kids Songs", "Newborn", "Lullaby"],
    genresAr: ["أغاني أطفال", "مواليد", "تهويدة"],
    priceRange: "SAR 350+",
  },
];

const SingersPage = () => {
  const { t, language } = useLanguage();
  const isArabic = language === "ar";
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const filteredSingers = allSingers.filter((singer) => {
    const searchField = isArabic ? singer.nameAr : singer.name;
    const matchesSearch = searchField?.toLowerCase().includes(search.toLowerCase()) ||
      singer.name.toLowerCase().includes(search.toLowerCase());
    const genresToCheck = isArabic && singer.genresAr ? singer.genresAr : singer.genres;
    const matchesGenre =
      genre === "all" ||
      genresToCheck.some((g) => g.toLowerCase() === genre.toLowerCase());
    return matchesSearch && matchesGenre;
  });

  const sortedSingers = [...filteredSingers].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "price") {
      const priceA = parseInt(a.priceRange.replace(/\D/g, ""));
      const priceB = parseInt(b.priceRange.replace(/\D/g, ""));
      return priceA - priceB;
    }
    return b.reviewCount - a.reviewCount;
  });

  return (
    <AppLayout>
      <div className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">
              {t("singers.title")}
            </h1>
            <p className="text-muted-foreground mt-2">
              {t("singers.subtitle")}
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder={t("singers.search")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="ps-10 bg-card border-border"
              />
            </div>

            <Select value={genre} onValueChange={setGenre}>
              <SelectTrigger className="w-full md:w-48 bg-card border-border">
                <Filter className="w-4 h-4 me-2" />
                <SelectValue placeholder={t("singers.allGenres")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("singers.allGenres")}</SelectItem>
                <SelectItem value="arabic">{isArabic ? "عربي" : "Arabic"}</SelectItem>
                <SelectItem value="khaleeji">{isArabic ? "خليجي" : "Khaleeji"}</SelectItem>
                <SelectItem value="pop">{isArabic ? "بوب" : "Pop"}</SelectItem>
                <SelectItem value="shilat">{isArabic ? "شيلات" : "Shilat"}</SelectItem>
                <SelectItem value="wedding">{isArabic ? "أعراس" : "Wedding"}</SelectItem>
                <SelectItem value="kids songs">{isArabic ? "أغاني أطفال" : "Kids Songs"}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48 bg-card border-border">
                <SlidersHorizontal className="w-4 h-4 me-2" />
                <SelectValue placeholder={t("singers.sortBy")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">{t("singers.sortPopular")}</SelectItem>
                <SelectItem value="rating">{t("singers.sortRating")}</SelectItem>
                <SelectItem value="price">{t("singers.sortPrice")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-6">
            {t("singers.showing")} {sortedSingers.length} {t("nav.singers").toLowerCase()}
          </p>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedSingers.map((singer) => (
              <SingerCard key={singer.id} {...singer} />
            ))}
          </div>

          {sortedSingers.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">{t("singers.notFound")}</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default SingersPage;
