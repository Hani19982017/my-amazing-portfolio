import { Star, Play, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface SingerCardProps {
  id: string;
  name: string;
  nameAr?: string;
  image: string;
  rating: number;
  reviewCount: number;
  genres: string[];
  genresAr?: string[];
  priceRange: string;
  isFeatured?: boolean;
}

export const SingerCard = ({
  id,
  name,
  nameAr,
  image,
  rating,
  reviewCount,
  genres,
  genresAr,
  priceRange,
  isFeatured = false,
}: SingerCardProps) => {
  const { t, language } = useLanguage();
  const isArabic = language === "ar";
  const displayGenres = isArabic && genresAr ? genresAr : genres;

  return (
    <div
      className={cn(
        "group relative rounded-2xl overflow-hidden card-hover bg-card border border-border",
        isFeatured && "ring-2 ring-primary/50"
      )}
    >
      {/* Featured Badge */}
      {isFeatured && (
        <div className="absolute top-3 start-3 z-10 px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
          {t("singers.featured")}
        </div>
      )}

      {/* Favorite Button */}
      <button className="absolute top-3 end-3 z-10 w-8 h-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-primary/20 transition-colors">
        <Heart className="w-4 h-4 text-foreground" />
      </button>

      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />

        {/* Play Button */}
        <button className="absolute bottom-4 end-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg">
          <Play className="w-5 h-5 ms-0.5" fill="currentColor" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground">
            {isArabic && nameAr ? nameAr : name}
          </h3>
          {!isArabic && nameAr && (
            <p className="text-sm text-primary/80">{nameAr}</p>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            ({reviewCount} {t("singers.reviews")})
          </span>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-1.5">
          {displayGenres.slice(0, 3).map((genre) => (
            <span
              key={genre}
              className="px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">
              {t("singers.startingFrom")}
            </p>
            <p className="text-foreground font-semibold">{priceRange}</p>
          </div>
          <Button
            size="sm"
            className="bg-primary text-white hover:bg-primary/90"
            asChild
          >
            <Link to={`/order?singerId=${id}&singerName=${encodeURIComponent(name)}&singerNameAr=${encodeURIComponent(nameAr || "")}&price=${encodeURIComponent(priceRange)}`}>
              {t("singers.bookNow")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
