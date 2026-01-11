import { Code, Palette, Rocket, Users } from "lucide-react";

const highlights = [
  {
    icon: Code,
    title: "Clean Code",
    description: "Writing maintainable, scalable, and well-documented code",
  },
  {
    icon: Palette,
    title: "UI/UX Focus",
    description: "Creating beautiful, intuitive user experiences",
  },
  {
    icon: Rocket,
    title: "Performance",
    description: "Optimizing for speed, SEO, and Core Web Vitals",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working effectively in team environments",
  },
];

const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-wider uppercase">About Me</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Passionate WordPress Developer
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div className="space-y-6">
            <p className="text-muted-foreground text-lg leading-relaxed">
              I am a passionate and motivated WordPress Developer with a strong desire to 
              continuously learn and grow in the field of web development. My goal is to 
              apply my knowledge and skills in building responsive, user-friendly, and 
              high-performance websites.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              I specialize in <span className="text-primary">WordPress</span>, 
              <span className="text-primary"> WooCommerce</span>, and 
              <span className="text-primary"> custom theme/plugin development</span>. 
              With expertise in front-end technologies like HTML, CSS, JavaScript, and Bootstrap, 
              I deliver SEO-friendly, mobile-optimized, and scalable solutions.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              I hold a <span className="text-foreground font-medium">Bachelor of Computer Science</span> from 
              Ain Shams University (Grade: Good), with an Excellent graduation project on 
              facial expression analysis using deep learning.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border">
              <div>
                <div className="text-3xl font-bold text-gradient">2+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient">15+</div>
                <div className="text-sm text-muted-foreground">Projects Done</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient">5+</div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </div>
            </div>
          </div>

          {/* Right Column - Highlights */}
          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="p-6 bg-gradient-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 group shadow-card"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:glow-primary transition-all duration-300">
                  <item.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
