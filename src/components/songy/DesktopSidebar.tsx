import { Home, Grid3X3, Mic2, Music, User, Settings, LogOut, Heart, ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const DesktopSidebar = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const mainNavItems = [
    { icon: Home, labelKey: "nav.home", path: "/" },
    { icon: Grid3X3, labelKey: "nav.categories", path: "/categories" },
    { icon: Mic2, labelKey: "nav.singers", path: "/singers" },
    { icon: Music, labelKey: "nav.studios", path: "/studios" },
  ];

  const userNavItems = [
    { icon: ShoppingCart, labelKey: "nav.orders", path: "/orders" },
    { icon: Heart, labelKey: "nav.favorites", path: "/favorites" },
    { icon: User, labelKey: "nav.profile", path: "/profile" },
    { icon: Settings, labelKey: "nav.settings", path: "/settings" },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 min-h-screen bg-card border-e border-border fixed start-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-border flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Music className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-songy-gradient">SONGY</span>
        </Link>
        <LanguageSwitcher />
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-3">
          {t("nav.discover")}
        </p>
        {mainNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 transition-transform group-hover:scale-110",
                  isActive && "text-primary"
                )}
              />
              <span className="font-medium">{t(item.labelKey)}</span>
              {isActive && (
                <div className="ms-auto w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}

        <div className="pt-6">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-3">
            {t("nav.library")}
          </p>
          {userNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 transition-transform group-hover:scale-110",
                    isActive && "text-primary"
                  )}
                />
                <span className="font-medium">{t(item.labelKey)}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">{t("nav.logout")}</span>
        </button>
      </div>
    </aside>
  );
};
