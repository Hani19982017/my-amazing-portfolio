import { ExternalLink, ArrowRight } from "lucide-react";

const projects = [
  {
    title: "Forexpress",
    category: "Trading Platform",
    description: "Responsive trading platform using WordPress and Elementor. Trade CFDs with stable conditions & access a wide range of tradable assets.",
    tech: ["WordPress", "Elementor", "JavaScript", "PHP", "REST API"],
    color: "from-primary to-cyan-400",
  },
  {
    title: "Shonize",
    category: "WooCommerce Store",
    description: "Responsive online store using WordPress and WooCommerce to sell premium wigs and haircare bundles.",
    tech: ["WordPress", "WooCommerce", "Bootstrap 5", "jQuery", "Gutenberg"],
    color: "from-pink-500 to-accent",
  },
  {
    title: "Hermoso",
    category: "Shopify Store",
    description: "E-commerce front-end using Shopify Online Store 2.0, Liquid templates, and Theme Customizer with app integrations.",
    tech: ["Shopify", "Liquid", "JavaScript", "GraphQL API"],
    color: "from-green-500 to-emerald-400",
  },
  {
    title: "Qobon",
    category: "Coupon Platform",
    description: "Custom coupon and cashback platform from scratch using WordPress and ACF with tailored backend for managing discount codes.",
    tech: ["WordPress", "ACF", "Custom Development", "PHP"],
    color: "from-orange-500 to-yellow-400",
  },
  {
    title: "Rami Hindi",
    category: "Personal Website",
    description: "Professional personal website from scratch using WordPress to present founder's profile, expertise, and international achievements.",
    tech: ["WordPress", "Custom Theme", "REST API", "Gutenberg"],
    color: "from-blue-500 to-primary",
  },
  {
    title: "Beshor",
    category: "Pharma Company",
    description: "Responsive front-end pages using Divi Builder for a pharma/food supplements/medical devices company.",
    tech: ["WordPress", "Divi", "Bootstrap 5", "jQuery"],
    color: "from-teal-500 to-cyan-400",
  },
  {
    title: "Dwaelan",
    category: "Shopify Perfumes",
    description: "E-commerce project in Dubai for oriental perfumes, modern fragrances, and essential oils.",
    tech: ["Shopify", "Liquid", "JavaScript"],
    color: "from-purple-500 to-accent",
  },
  {
    title: "Lovai",
    category: "Marketing Agency",
    description: "Loavi marketing agency website built with WordPress and Elementor page builder.",
    tech: ["WordPress", "Elementor", "CSS3"],
    color: "from-red-500 to-pink-400",
  },
  {
    title: "Derosa & Falat",
    category: "Flower Shops",
    description: "Responsive front-end pages and WordPress integration for selling flowers.",
    tech: ["WordPress", "WooCommerce", "Bootstrap 5", "PHP"],
    color: "from-rose-400 to-pink-500",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-wider uppercase">Portfolio</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Featured WordPress Projects
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A collection of my best work showcasing custom WordPress development, 
            WooCommerce stores, and Shopify customizations.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-gradient-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-500 shadow-card"
            >
              {/* Gradient Top Bar */}
              <div className={`h-1.5 bg-gradient-to-r ${project.color}`} />
              
              <div className="p-6">
                {/* Category */}
                <span className="text-xs font-mono text-primary uppercase tracking-wider">
                  {project.category}
                </span>
                
                {/* Title */}
                <h3 className="text-xl font-bold mt-2 mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-secondary rounded text-xs text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2 py-1 bg-secondary rounded text-xs text-muted-foreground">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
                
                {/* View Project Link */}
                <div className="flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>View Details</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* More Projects CTA */}
        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-secondary border border-border rounded-lg text-foreground font-medium hover:border-primary hover:text-primary transition-all duration-300"
          >
            <span>Want to see more? Let's talk</span>
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
