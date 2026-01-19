import { Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export const HeroSection = () => {
  const { t } = useLanguage();

  const stats = [
    { value: "500+", labelKey: "hero.stats.singers" },
    { value: "1000+", labelKey: "hero.stats.songs" },
    { value: "50+", labelKey: "hero.stats.studios" },
    { value: "4.9", labelKey: "hero.stats.rating" },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-0 end-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 start-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative px-4 py-12 md:py-20 lg:py-28">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">{t("hero.badge")}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            {t("hero.title1")}
            <span className="text-gradient"> {t("hero.title2")} </span>
            {t("hero.title3")}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("hero.subtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              asChild
              size="lg"
              className="btn-glow bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold px-8 hover:opacity-90"
            >
              <Link to="/categories">
                <Sparkles className="w-5 h-5 me-2" />
                {t("hero.cta.create")}
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-border hover:bg-muted/50"
            >
              <Link to="/singers">
                <Play className="w-5 h-5 me-2" />
                {t("hero.cta.browse")}
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 pt-8">
            {stats.map((stat) => (
              <div key={stat.labelKey} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gradient">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t(stat.labelKey)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
