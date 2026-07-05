import { Linkedin, Github, Mail } from "lucide-react";
import { profile, contact } from "@/data";

export const Footer = () => {
  return (
    <footer data-testid="site-footer" className="border-t border-[var(--line)] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div>
          <p className="text-2xl md:text-3xl font-medium tracking-tight">{profile.name.replace(/\s+/g, "").toLowerCase()}</p>
          <p className="mt-3 font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
            If you don't risk the bad meal, you will never get the magical one.
          </p>
        </div>
        <div className="flex items-center gap-6">
          <a href={`mailto:${contact.email}`} data-testid="footer-email" aria-label="Email" className="hover:text-[var(--muted)] transition-colors">
            <Mail size={20} strokeWidth={1.5} />
          </a>
          <a href={contact.linkedin} target="_blank" rel="noreferrer" data-testid="footer-linkedin" aria-label="LinkedIn" className="hover:text-[var(--muted)] transition-colors">
            <Linkedin size={20} strokeWidth={1.5} />
          </a>
          <a href={contact.github} target="_blank" rel="noreferrer" data-testid="footer-github" aria-label="GitHub" className="hover:text-[var(--muted)] transition-colors">
            <Github size={20} strokeWidth={1.5} />
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12">
        <p className="font-mono text-xs text-[var(--muted)]">© {new Date().getFullYear()} {profile.name.replace(/\s+/g, "").toLowerCase()}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
