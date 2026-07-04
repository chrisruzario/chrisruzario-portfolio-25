import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { profile } from "@/data";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch (e) {}
  };

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 inset-x-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "surface-blur backdrop-blur-md border-[var(--line)]" : "bg-transparent border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
        <a
          href="#top"
          data-testid="nav-logo"
          className="font-medium tracking-tight text-lg hover:opacity-70 transition-opacity"
        >
          {profile.name.replace(/\s+/g, "").toLowerCase()}
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className="font-mono text-xs uppercase tracking-widest text-[var(--fg)] hover:text-[var(--muted)] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            data-testid="theme-toggle"
            aria-label="Toggle dark mode"
            className="p-2 border border-[var(--line)] hover:border-[var(--fg)] transition-colors"
          >
            {dark ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            data-testid="theme-toggle-mobile"
            aria-label="Toggle dark mode"
            className="p-2"
          >
            {dark ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />}
          </button>
          <button
            data-testid="nav-menu-toggle"
            className="p-2 -mr-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden bg-[var(--bg)] border-t border-[var(--line)]" data-testid="mobile-menu">
          <div className="px-6 py-4 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                data-testid={`mobile-link-${l.label.toLowerCase()}`}
                className="font-mono text-sm uppercase tracking-widest py-1"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
