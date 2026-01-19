import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface CategoryCardProps {
  title: string;
  titleAr?: string;
  icon: LucideIcon;
  description: string;
  href: string;
  gradient?: string;
}

export const CategoryCard = ({
  title,
  titleAr,
  icon: Icon,
  description,
  href,
  gradient = "from-primary/20 to-accent/10",
}: CategoryCardProps) => {
  const { t, language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <Link
      to={href}
      className={cn(
        "group relative block p-6 rounded-2xl card-hover overflow-hidden",
        "bg-gradient-to-br border border-border",
        gradient
      )}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative space-y-4">
        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-7 h-7 text-foreground" />
        </div>

        {/* Content */}
        <div>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-foreground/80 transition-colors">
            {isArabic && titleAr ? titleAr : title}
          </h3>
          {!isArabic && titleAr && (
            <p className="text-sm text-foreground/80 font-medium">{titleAr}</p>
          )}
          <p className="text-sm text-foreground/70 mt-1">{description}</p>
        </div>

        {/* Arrow indicator */}
        <div className="flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          {t("category.explore")}
          <svg
            className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};
