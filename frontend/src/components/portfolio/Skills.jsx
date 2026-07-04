import { skills } from "@/data";

export const Skills = () => {
  return (
    <section
      id="skills"
      data-testid="skills-section"
      className="border-t border-[var(--line)] py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
          <div className="md:col-span-3" data-reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
              02 / Skills
            </p>
          </div>
          <div className="md:col-span-8" data-reveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight">
              Tools & capabilities
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-[var(--line)]" data-reveal>
          {skills.map((skill, i) => (
            <div
              key={skill}
              data-testid={`skill-card-${i}`}
              className="group border-b border-r border-[var(--line)] p-8 flex items-baseline gap-4 hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors duration-300"
            >
              <span className="font-mono text-xs text-[var(--muted)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-lg md:text-xl font-medium tracking-tight">
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
