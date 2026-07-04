import { ArrowRight } from "lucide-react";
import { profile } from "@/data";

export const Hero = () => {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative pt-32 md:pt-44 pb-20 md:pb-28 max-w-7xl mx-auto px-6 md:px-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
        <div className="md:col-span-8" data-reveal>
          <p className="font-mono text-xs md:text-sm uppercase tracking-[0.25em] text-[#666] mb-6">
            {profile.tagline}
          </p>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-medium tracking-tighter leading-[0.95]">
            {profile.name}
          </h1>
          <p className="mt-8 max-w-xl text-base sm:text-lg text-[#666] leading-relaxed">
            {profile.intro}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              data-testid="hero-view-projects-btn"
              className="group inline-flex items-center gap-2 bg-[#0A0A0A] text-white px-7 py-3.5 text-sm font-medium border border-[#0A0A0A] hover:bg-white hover:text-[#0A0A0A] transition-colors duration-300"
            >
              View Projects
              <ArrowRight size={16} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              data-testid="hero-contact-btn"
              className="inline-flex items-center gap-2 border border-[#0A0A0A] px-7 py-3.5 text-sm font-medium hover:bg-[#0A0A0A] hover:text-white transition-colors duration-300"
            >
              Contact Me
            </a>
          </div>
        </div>

        <div className="md:col-span-4" data-reveal>
          <div className="aspect-[3/4] w-full overflow-hidden border border-[#E5E5E5]">
            <img
              src="https://customer-assets.emergentagent.com/job_data-insights-pro-59/artifacts/pgfap9n6_Untitled%20design%20%284%29.png"
              alt="Abstract gradient"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
