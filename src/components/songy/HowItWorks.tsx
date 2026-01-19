import { Search, MessageSquare, Music, Download } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Choose Category",
    description: "Browse song categories and select your occasion type",
  },
  {
    icon: MessageSquare,
    title: "Select Artist",
    description: "Pick your preferred singer or studio from our curated list",
  },
  {
    icon: Music,
    title: "Customize Song",
    description: "Share details about your occasion and personalize lyrics",
  },
  {
    icon: Download,
    title: "Receive & Enjoy",
    description: "Get your custom song delivered and share the magic",
  },
];

export const HowItWorks = () => {
  return (
    <section className="px-4 py-16 bg-card/50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">How It Works</h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Create your personalized song in four simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative text-center">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
              )}

              {/* Icon */}
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-4 relative">
                <step.icon className="w-8 h-8 text-primary" />
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {index + 1}
                </div>
              </div>

              {/* Content */}
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
