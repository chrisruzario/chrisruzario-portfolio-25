import { Github, ArrowUpRight } from "lucide-react";
import { projects } from "@/data";

export const Projects = () => {
  return (
    <section
      id="projects"
      data-testid="projects-section"
      className="border-t border-[#E5E5E5] py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
          <div className="md:col-span-3" data-reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-[#666]">
              03 / Projects
            </p>
          </div>
          <div className="md:col-span-8" data-reveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight">
              Selected work
            </h2>
          </div>
        </div>

        <div className="space-y-6">
          {projects.map((p, i) => (
            <article
              key={p.title}
              data-testid={`project-card-${i}`}
              data-reveal
              className="group border border-[#E5E5E5] hover:border-[#0A0A0A] transition-colors duration-300"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-8 md:p-12">
                <div className="md:col-span-1 hidden md:block">
                  <span className="font-mono text-sm text-[#666]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="md:col-span-7">
                  <h3 className="text-2xl sm:text-3xl font-medium tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-base sm:text-lg text-[#666] leading-relaxed max-w-xl">
                    {p.summary}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.tools.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-xs uppercase tracking-widest border border-[#E5E5E5] px-3 py-1.5 text-[#0A0A0A]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-4 flex md:flex-col md:items-end justify-end gap-4">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      data-testid={`project-github-${i}`}
                      className="inline-flex items-center gap-2 text-sm font-medium border-b border-transparent hover:border-[#0A0A0A] transition-colors"
                    >
                      <Github size={16} strokeWidth={1.5} /> GitHub
                    </a>
                  )}
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      data-testid={`project-demo-${i}`}
                      className="inline-flex items-center gap-2 text-sm font-medium border-b border-transparent hover:border-[#0A0A0A] transition-colors"
                    >
                      Live Demo <ArrowUpRight size={16} strokeWidth={1.5} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
