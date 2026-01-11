import { ArrowDown, Github, Linkedin, Mail, Phone } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">Available for work</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
            Hi, I'm{" "}
            <span className="text-gradient">Mohamed Hani</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-primary font-medium mb-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Full-stack WordPress Developer
          </p>

          {/* Description */}
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Building responsive, high-performance websites with WordPress, WooCommerce, 
            and custom theme/plugin development. Based in Cairo, Egypt.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-12 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <a
              href="#projects"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:glow-primary transition-all duration-300"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-3 bg-secondary text-foreground rounded-lg font-semibold border border-border hover:border-primary transition-all duration-300"
            >
              Get In Touch
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-secondary rounded-lg text-muted-foreground hover:text-primary hover:border-primary border border-border transition-all duration-300"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-secondary rounded-lg text-muted-foreground hover:text-primary hover:border-primary border border-border transition-all duration-300"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:m.hanitdm@gmail.com"
              className="p-3 bg-secondary rounded-lg text-muted-foreground hover:text-primary hover:border-primary border border-border transition-all duration-300"
            >
              <Mail size={20} />
            </a>
            <a
              href="tel:+201067770148"
              className="p-3 bg-secondary rounded-lg text-muted-foreground hover:text-primary hover:border-primary border border-border transition-all duration-300"
            >
              <Phone size={20} />
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
            <ArrowDown size={24} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
