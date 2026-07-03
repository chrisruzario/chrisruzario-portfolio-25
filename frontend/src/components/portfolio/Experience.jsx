import { experience } from "@/data";

export const Experience = () => {
  return (
    <section
      id="experience"
      data-testid="experience-section"
      className="border-t border-[#E5E5E5] py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
          <div className="md:col-span-3" data-reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-[#666]">
              04 / Experience
            </p>
          </div>
          <div className="md:col-span-8" data-reveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight">
              Where I've been
            </h2>
          </div>
        </div>

        <div className="border-l border-[#E5E5E5] ml-1" data-reveal>
          {experience.map((item, i) => (
            <div
              key={i}
              data-testid={`experience-item-${i}`}
              className="relative pl-8 md:pl-12 pb-12 last:pb-0"
            >
              <span className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] bg-[#0A0A0A] rounded-full" />
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8">
                <p className="md:col-span-3 font-mono text-xs uppercase tracking-widest text-[#666] pt-1">
                  {item.period}
                </p>
                <div className="md:col-span-9">
                  <h3 className="text-xl sm:text-2xl font-medium tracking-tight">
                    {item.role}
                    <span className="text-[#666] font-normal"> · {item.company}</span>
                  </h3>
                  <p className="mt-2 text-base text-[#666] leading-relaxed max-w-2xl">
                    {item.detail}
                  </p>
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
