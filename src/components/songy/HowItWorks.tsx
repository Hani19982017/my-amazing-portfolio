import { Search, MessageSquare, Music, Download } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const HowItWorks = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Search,
      titleKey: "howItWorks.step1.title",
      descriptionKey: "howItWorks.step1.desc",
    },
    {
      icon: MessageSquare,
      titleKey: "howItWorks.step2.title",
      descriptionKey: "howItWorks.step2.desc",
    },
    {
      icon: Music,
      titleKey: "howItWorks.step3.title",
      descriptionKey: "howItWorks.step3.desc",
    },
    {
      icon: Download,
      titleKey: "howItWorks.step4.title",
      descriptionKey: "howItWorks.step4.desc",
    },
  ];

  return (
    <section className="px-4 py-16 bg-card/50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">
            {t("howItWorks.title")}
          </h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            {t("howItWorks.subtitle")}
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.titleKey} className="relative text-center">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 start-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent rtl:bg-gradient-to-l" />
              )}

              {/* Icon */}
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-4 relative">
                <step.icon className="w-8 h-8 text-primary" />
                <div className="absolute -top-2 -end-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {index + 1}
                </div>
              </div>

              {/* Content */}
              <h3 className="font-semibold text-lg mb-2">{t(step.titleKey)}</h3>
              <p className="text-sm text-muted-foreground">
                {t(step.descriptionKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
