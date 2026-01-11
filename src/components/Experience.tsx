import { Briefcase, MapPin, Calendar } from "lucide-react";

const experiences = [
  {
    title: "WordPress Developer",
    company: "Loavi Information Technology",
    type: "Full-time",
    location: "Dubai, UAE – Remote",
    period: "Jan 2024 – Present",
    description: [
      "Built responsive, high-performance websites tailored to business goals",
      "Specialized in custom theme and plugin development, WooCommerce integration",
      "Delivered SEO-friendly, mobile-optimized, and scalable solutions",
    ],
    skills: ["WordPress", "WooCommerce", "PHP", "JavaScript", "Elementor"],
    current: true,
  },
  {
    title: "WordPress Developer",
    company: "TiknoSoft",
    type: "Part-time",
    location: "Saudi Arabia – Remote",
    period: "Aug 2024 – Jan 2025",
    description: [
      "Developed and customized WordPress themes and plugins",
      "Optimized website performance, security, and SEO",
      "Ensured cross-browser compatible web solutions",
    ],
    skills: ["WordPress", "Custom Themes", "SEO", "Performance"],
    current: false,
  },
  {
    title: "Frontend Web Developer",
    company: "TiknoSoft",
    type: "Full-time",
    location: "Saudi Arabia – Remote",
    period: "Jan 2023 – Aug 2024",
    description: [
      "Designed responsive front-end pages using HTML5, CSS3, JavaScript",
      "Delivered pixel-perfect UI aligned with client needs",
      "Collaborated with backend developers for API integration",
    ],
    skills: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "API Integration"],
    current: false,
  },
  {
    title: "Motion Graphic Designer",
    company: "Kiloh Design",
    type: "Contract",
    location: "Cairo, Egypt – Remote",
    period: "Oct 2022 – Apr 2023",
    description: [
      "Created engaging motion graphics and animations for marketing",
      "Enhanced brand communication with visually appealing designs",
    ],
    skills: ["After Effects", "Motion Graphics", "Animation"],
    current: false,
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-wider uppercase">Career</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Work Experience
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-8 pb-12 last:pb-0">
              {/* Timeline Line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
              
              {/* Timeline Dot */}
              <div className={`absolute left-0 top-0 w-3 h-3 rounded-full -translate-x-1/2 ${exp.current ? 'bg-primary animate-pulse-glow' : 'bg-muted-foreground'}`} />

              {/* Experience Card */}
              <div className="bg-gradient-card rounded-2xl border border-border p-6 ml-4 hover:border-primary/50 transition-all duration-300 shadow-card">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {exp.current && (
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">
                          Current
                        </span>
                      )}
                      <span className="px-2 py-0.5 bg-secondary text-muted-foreground text-xs rounded-full">
                        {exp.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <div className="flex items-center gap-1 justify-end">
                      <Calendar size={14} />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1 justify-end mt-1">
                      <MapPin size={14} />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <ul className="space-y-2 mb-4">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-secondary rounded-full text-xs text-foreground font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
