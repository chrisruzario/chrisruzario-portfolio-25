import SkillsGraph from "@/components/portfolio/SkillsGraph";

export const Skills = () => {
  return (
    <section
      id="skills"
      data-testid="skills-section"
      className="border-t border-[var(--line)] py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-10">
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
              A connected toolkit spanning data, analysis and communication. Hover to light up the network — or drag any skill to rearrange it.
            </p>
          </div>
        </div>

        <div data-reveal>
          <SkillsGraph />
        </div>
      </div>
    </section>
  );
};

export default Skills;
