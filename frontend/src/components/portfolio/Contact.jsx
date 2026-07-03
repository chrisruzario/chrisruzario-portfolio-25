import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Mail, Linkedin, Github, ArrowRight } from "lucide-react";
import { contact } from "@/data";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Message sent — thanks for reaching out!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full bg-transparent border border-[#E5E5E5] px-4 py-3 text-base focus:border-[#0A0A0A] focus:outline-none transition-colors placeholder:text-[#999]";

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="border-t border-[#E5E5E5] py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5" data-reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-[#666] mb-6">
            05 / Contact
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tighter leading-none">
            Let's talk.
          </h2>
          <div className="mt-10 space-y-4">
            <a href={`mailto:${contact.email}`} data-testid="contact-email-link" className="group flex items-center gap-3 text-lg hover:text-[#666] transition-colors">
              <Mail size={18} strokeWidth={1.5} /> {contact.email}
            </a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer" data-testid="contact-linkedin-link" className="group flex items-center gap-3 text-lg hover:text-[#666] transition-colors">
              <Linkedin size={18} strokeWidth={1.5} /> LinkedIn
            </a>
            <a href={contact.github} target="_blank" rel="noreferrer" data-testid="contact-github-link" className="group flex items-center gap-3 text-lg hover:text-[#666] transition-colors">
              <Github size={18} strokeWidth={1.5} /> GitHub
            </a>
          </div>
        </div>

        <div className="md:col-span-7" data-reveal>
          <form onSubmit={onSubmit} data-testid="contact-form" className="space-y-4">
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
            <button
              type="submit"
              disabled={loading}
              data-testid="contact-submit-btn"
              className="group inline-flex items-center gap-2 bg-[#0A0A0A] text-white px-7 py-3.5 text-sm font-medium border border-[#0A0A0A] hover:bg-white hover:text-[#0A0A0A] transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
              <ArrowRight size={16} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
