import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Mail, Linkedin, Github, ArrowRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { contact } from "@/data";

const BACKEND = process.env.REACT_APP_BACKEND_URL;

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: "success" | "error", text }

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (status) setStatus(null);
  };

  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const onSubmit = async (e) => {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      setStatus({ type: "error", text: "Please fill in all fields." });
      toast.error("Please fill in all fields.");
      return;
    }
    if (!isEmail(email)) {
      setStatus({ type: "error", text: "Please enter a valid email address." });
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!BACKEND) {
      setStatus({ type: "error", text: "Contact service isn't configured. Please email me directly." });
      toast.error("Contact service unavailable.");
      return;
    }

    setLoading(true);
    setStatus(null);
    try {
      await axios.post(
        `${BACKEND}/api/contact`,
        { name, email, message },
        { timeout: 60000, headers: { "Content-Type": "application/json" } }
      );
      setStatus({ type: "success", text: "Message sent — thanks for reaching out! I'll get back to you soon." });
      toast.success("Message sent — thanks for reaching out!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      let text = "Something went wrong. Please try again, or email me directly.";
      if (err.code === "ECONNABORTED") {
        text = "The server took too long to respond. Please try again in a moment.";
      } else if (err.response) {
        text = `Server error (${err.response.status}). Please try again shortly.`;
      } else if (err.request) {
        text = "Couldn't reach the server. Check your connection and try again.";
      }
      setStatus({ type: "error", text });
      toast.error(text);
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full bg-transparent border border-[var(--line)] px-4 py-3 text-base focus:border-[var(--fg)] focus:outline-none transition-colors placeholder:text-[var(--muted)]";

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="border-t border-[var(--line)] py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5" data-reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] mb-6">
            05 / Contact
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tighter leading-none">
            Let's talk.
          </h2>
          <div className="mt-10 space-y-4">
            <a href={`mailto:${contact.email}`} data-testid="contact-email-link" className="group flex items-center gap-3 text-lg hover:text-[var(--muted)] transition-colors">
              <Mail size={18} strokeWidth={1.5} /> {contact.email}
            </a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer" data-testid="contact-linkedin-link" className="group flex items-center gap-3 text-lg hover:text-[var(--muted)] transition-colors">
              <Linkedin size={18} strokeWidth={1.5} /> LinkedIn
            </a>
            <a href={contact.github} target="_blank" rel="noreferrer" data-testid="contact-github-link" className="group flex items-center gap-3 text-lg hover:text-[var(--muted)] transition-colors">
              <Github size={18} strokeWidth={1.5} /> GitHub
            </a>
          </div>
        </div>

        <div className="md:col-span-7" data-reveal>
          <form onSubmit={onSubmit} data-testid="contact-form" className="space-y-4" noValidate>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Your name"
              data-testid="contact-name-input"
              className={inputCls}
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              placeholder="Your email"
              data-testid="contact-email-input"
              className={inputCls}
            />
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              placeholder="Your message"
              rows={6}
              data-testid="contact-message-input"
              className={`${inputCls} resize-none`}
            />

            {status && (
              <div
                data-testid="contact-status"
                className={`flex items-start gap-2 border px-4 py-3 text-sm ${
                  status.type === "success"
                    ? "border-[var(--fg)] text-[var(--fg)]"
                    : "border-[var(--muted)] text-[var(--muted)]"
                }`}
              >
                {status.type === "success" ? (
                  <CheckCircle2 size={16} strokeWidth={1.5} className="mt-0.5 shrink-0" />
                ) : (
                  <AlertCircle size={16} strokeWidth={1.5} className="mt-0.5 shrink-0" />
                )}
                <span>{status.text}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              data-testid="contact-submit-btn"
              className="group inline-flex items-center gap-2 bg-[var(--fg)] text-[var(--bg)] px-7 py-3.5 text-sm font-medium border border-[var(--fg)] hover:bg-[var(--bg)] hover:text-[var(--fg)] transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={16} strokeWidth={1.5} className="animate-spin" /> Sending...
                </>
              ) : (
                <>
                  Send Message
                  <ArrowRight size={16} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
