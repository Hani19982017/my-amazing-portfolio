import { ReactNode } from "react";
import { MobileNavBar } from "./MobileNavBar";
import { DesktopSidebar } from "./DesktopSidebar";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <DesktopSidebar />
      
      {/* Mobile Header with Language Switcher */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-end p-3 md:hidden">
        <LanguageSwitcher />
      </header>
      
      <main className="md:ms-64 pb-20 md:pb-0 min-h-screen">
        {children}
      </main>
      <MobileNavBar />
    </div>
  );
};
