import { about } from "@/data";

export const About = () => {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="border-t border-[var(--line)] py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-3" data-reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
            01 / About
          </p>
        </div>
        <div className="md:col-span-8" data-reveal>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight leading-snug">
            {about}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
