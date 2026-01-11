const frontendSkills = [
  { name: "HTML5", level: 95 },
  { name: "CSS3", level: 90 },
  { name: "JavaScript (ES6)", level: 85 },
  { name: "Bootstrap", level: 90 },
  { name: "TypeScript", level: 75 },
  { name: "React", level: 70 },
  { name: "Angular", level: 70 },
];

const backendSkills = [
  { name: "WordPress", level: 95 },
  { name: "WooCommerce", level: 90 },
  { name: "PHP", level: 85 },
  { name: "WordPress REST API", level: 85 },
  { name: "Custom Plugins", level: 80 },
  { name: "Shopify / Liquid", level: 75 },
  { name: "Laravel", level: 65 },
];

const tools = [
  "VS Code",
  "Elementor",
  "WPBakery",
  "Gutenberg",
  "Git/GitHub",
  "Figma",
  "Photoshop",
  "After Effects",
];

const SkillBar = ({ name, level }: { name: string; level: number }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-2">
      <span className="text-foreground font-medium">{name}</span>
      <span className="text-primary font-mono text-sm">{level}%</span>
    </div>
    <div className="h-2 bg-secondary rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000"
        style={{ width: `${level}%` }}
      />
    </div>
  </div>
);

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-wider uppercase">My Skills</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Technical Expertise
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Frontend Skills */}
          <div className="p-8 bg-gradient-card rounded-2xl border border-border shadow-card">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="w-3 h-3 bg-primary rounded-full" />
              Frontend Development
            </h3>
            {frontendSkills.map((skill) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} />
            ))}
          </div>

          {/* Backend Skills */}
          <div className="p-8 bg-gradient-card rounded-2xl border border-border shadow-card">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="w-3 h-3 bg-accent rounded-full" />
              Backend & CMS
            </h3>
            {backendSkills.map((skill) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} />
            ))}
          </div>
        </div>

        {/* Tools & Technologies */}
        <div className="text-center">
          <h3 className="text-xl font-bold mb-8">Tools & Technologies</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((tool) => (
              <span
                key={tool}
                className="px-5 py-2 bg-secondary border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 text-sm font-medium"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
