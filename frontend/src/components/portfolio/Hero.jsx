import { ArrowRight } from "lucide-react";
import { profile } from "@/data";

export const Hero = () => {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative min-h-[85vh] flex flex-col justify-center pt-32 md:pt-40 pb-20 md:pb-28 max-w-7xl mx-auto px-6 md:px-12"
    >
      <div data-reveal>
        <p className="font-mono text-xs md:text-sm uppercase tracking-[0.25em] text-[#666] mb-8">
          {profile.tagline}
        </p>
        <h1 className="text-6xl sm:text-8xl lg:text-9xl font-medium tracking-tighter leading-[0.9] max-w-5xl">
          {profile.name}
        </h1>
        <p className="mt-10 max-w-2xl text-lg sm:text-xl text-[#666] leading-relaxed">
          {profile.intro}
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            data-testid="hero-view-projects-btn"
            className="group inline-flex items-center gap-2 bg-[#0A0A0A] text-white px-8 py-4 text-sm font-medium border border-[#0A0A0A] hover:bg-white hover:text-[#0A0A0A] transition-colors duration-300"
          >
            View Projects
            <ArrowRight size={16} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            data-testid="hero-contact-btn"
            className="inline-flex items-center gap-2 border border-[#0A0A0A] px-8 py-4 text-sm font-medium hover:bg-[#0A0A0A] hover:text-white transition-colors duration-300"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
