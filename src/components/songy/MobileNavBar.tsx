import { Home, Grid3X3, Mic2, Music, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

export const MobileNavBar = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { icon: Home, labelKey: "nav.home", path: "/" },
    { icon: Grid3X3, labelKey: "nav.categories", path: "/categories" },
    { icon: Mic2, labelKey: "nav.singers", path: "/singers" },
    { icon: Music, labelKey: "nav.studios", path: "/studios" },
    { icon: User, labelKey: "nav.profile", path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-border safe-area-pb md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 transition-transform",
                  isActive && "scale-110"
                )}
              />
              <span className="text-[10px] font-medium">{t(item.labelKey)}</span>
              {isActive && (
                <div className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
