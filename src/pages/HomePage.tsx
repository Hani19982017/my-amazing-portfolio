import { AppLayout } from "@/components/songy/AppLayout";
import { HeroSection } from "@/components/songy/HeroSection";
import { CategoriesSection } from "@/components/songy/CategoriesSection";
import { FeaturedSection } from "@/components/songy/FeaturedSection";
import { HowItWorks } from "@/components/songy/HowItWorks";

const HomePage = () => {
  return (
    <AppLayout>
      <HeroSection />
      <CategoriesSection />
      <FeaturedSection />
      <HowItWorks />
    </AppLayout>
  );
};

export default HomePage;
