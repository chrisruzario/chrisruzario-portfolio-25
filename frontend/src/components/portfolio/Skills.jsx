import { skills } from "@/data";
import ParticleNetwork from "@/components/portfolio/ParticleNetwork";

export const Skills = () => {
  return (
    <section
      id="skills"
      data-testid="skills-section"
      className="relative overflow-hidden border-t border-[var(--line)] py-24 md:py-32"
    >
      {/* Interactive particle-network background — reacts to the cursor */}
      <ParticleNetwork />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pointer-events-none">
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
            <p className="mt-4 max-w-lg text-base text-[var(--muted)]">
              A connected toolkit spanning data, analysis and communication. Move your cursor across the field.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 md:gap-4 pointer-events-auto" data-reveal>
          {skills.map((skill, i) => (
            <div
              key={skill}
              data-testid={`skill-card-${i}`}
              className="group flex items-center gap-3 border border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_70%,transparent)] backdrop-blur-sm px-5 py-3 cursor-default hover:bg-[var(--fg)] hover:text-[var(--bg)] hover:border-[var(--fg)] transition-colors duration-300"
            >
              <span className="font-mono text-xs text-[var(--muted)] group-hover:text-[var(--bg)] transition-colors">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-base md:text-lg font-medium tracking-tight">
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
