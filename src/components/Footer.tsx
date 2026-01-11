import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-muted-foreground text-sm">
            © {currentYear} Mohamed Hani. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            Built with <Heart size={14} className="text-primary mx-1" /> using React & Tailwind
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
